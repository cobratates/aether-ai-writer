import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProfile } from "./actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <main className="container max-w-2xl mx-auto py-16 px-4 space-y-8">
      <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Editor
      </Link>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-heading text-foreground tracking-tight">Brand Voice</h1>
        <p className="text-lg text-muted-foreground font-light">Configure how the AI should sound when drafting your posts.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <form action={updateProfile} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="tone" className="text-base font-medium">Voice Tone</Label>
            <Input 
              id="tone" 
              name="tone" 
              defaultValue={profile?.brand_voice_tone || "Professional yet conversational"} 
              placeholder="e.g. Witty, direct, and slightly sarcastic"
              className="bg-neutral-50/50 border-neutral-200 h-12 text-base rounded-xl focus-visible:ring-neutral-400"
            />
            <p className="text-sm text-muted-foreground">Describe your personality in a few words.</p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="topics" className="text-base font-medium">Common Topics <span className="text-muted-foreground font-normal">(Optional)</span></Label>
            <Textarea 
              id="topics" 
              name="topics" 
              defaultValue={profile?.brand_voice_topics || ""} 
              placeholder="e.g. Bootstrapping, Next.js, indie hacking, design"
              className="bg-neutral-50/50 border-neutral-200 min-h-[120px] text-base rounded-xl focus-visible:ring-neutral-400 p-4"
            />
            <p className="text-sm text-muted-foreground">What do you usually write about?</p>
          </div>
          
          <Button type="submit" className="w-full bg-black hover:bg-neutral-800 text-white rounded-xl h-12 text-base shadow-sm">
            Save Preferences
          </Button>
        </form>
      </div>
    </main>
  );
}
