"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const tone = formData.get("tone") as string;
  const topics = formData.get("topics") as string;

  const { error } = await supabase
    .from("profiles")
    .update({ brand_voice_tone: tone, brand_voice_topics: topics })
    .eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/settings");
  redirect("/dashboard");
}
