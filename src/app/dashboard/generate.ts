"use server";

import { createClient } from "@/utils/supabase/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { mistral } from "@ai-sdk/mistral";
import { z } from "zod";

export async function generatePostsAction(input: string, platforms: { linkedin: boolean; twitter: boolean; threads: boolean }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Fetch user profile for brand voice and credits
  const { data: profile } = await supabase
    .from("profiles")
    .select("brand_voice_tone, brand_voice_topics, generations_count, is_pro")
    .eq("id", user.id)
    .single();

  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const { count: dailyCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", startOfDay.toISOString());

  if (!profile?.is_pro && (dailyCount || 0) >= 3) {
    throw new Error("PAYWALL_LIMIT_REACHED");
  }

  const tone = profile?.brand_voice_tone || "Professional yet conversational";
  const topics = profile?.brand_voice_topics || "General tech and business";

  const prompt = `
    You are an expert personal PR assistant and ghostwriter.
    Your task is to turn the user's raw input into highly engaging social media posts.
    
    Brand Voice Tone: ${tone}
    Common Topics: ${topics}
    
    User's raw input:
    """
    ${input}
    """
    
    Instructions for platforms:
    ${platforms.linkedin ? "- LinkedIn: Professional, storytelling format, clear spacing, engaging hook." : ""}
    ${platforms.twitter ? "- X (Twitter): Short, punchy, conversational, 280 characters max." : ""}
    ${platforms.threads ? "- Threads: Casual, authentic, slightly conversational, open-ended question at the end." : ""}
    
    Generate the requested posts. If a platform was not requested, you can leave it empty.
  `;

  const schema = z.object({
    linkedin: z.string().optional().describe("The generated LinkedIn post"),
    twitter: z.string().optional().describe("The generated X (Twitter) post"),
    threads: z.string().optional().describe("The generated Threads post"),
  });

  let generatedObject;

  try {
    // Primary Provider: Gemini
    const result = await generateObject({
      model: google("gemini-3.5-flash"),
      schema,
      prompt: prompt,
    });
    generatedObject = result.object;
  } catch (geminiError: any) {
    console.error("Primary AI (Gemini) failed, falling back to Mistral:", geminiError);
    
    try {
      // Fallback Provider: Mistral
      const fallbackResult = await generateObject({
        model: mistral("mistral-small-latest"),
        schema,
        prompt: prompt,
      });
      generatedObject = fallbackResult.object;
    } catch (mistralError: any) {
      console.error("Fallback AI (Mistral) also failed:", mistralError);
      throw new Error("AI Generation failed across all available models.");
    }
  }

  // Save history to database
  const { error } = await supabase.from("posts").insert({
    user_id: user.id,
    original_input: input,
    linkedin_post: generatedObject.linkedin,
    twitter_post: generatedObject.twitter,
    threads_post: generatedObject.threads,
  });

  if (error) {
    console.error("Error saving post history:", error);
  } else {
    // Increment generation count
    await supabase.from("profiles").update({
      generations_count: (profile?.generations_count || 0) + 1
    }).eq("id", user.id);
  }

  return generatedObject;
}
