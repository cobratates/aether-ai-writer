"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, MessageCircle, Loader2, PenTool } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { generatePostsAction } from "./generate";
import { PaywallModal } from "@/components/PaywallModal";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [input, setInput] = useState("");
  const [platforms, setPlatforms] = useState({ linkedin: true, twitter: true, threads: true });
  const [results, setResults] = useState<{ linkedin?: string; twitter?: string; threads?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const generated = await generatePostsAction(input, platforms);
      setResults({
        linkedin: generated.linkedin || "",
        twitter: generated.twitter || "",
        threads: generated.threads || "",
      });
    } catch (err: any) {
      if (err.message === "PAYWALL_LIMIT_REACHED") {
        setShowPaywall(true);
      } else {
        setError(err.message || "Failed to generate posts. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="container max-w-5xl mx-auto py-16 px-4 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <div className="mx-auto w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
          <PenTool className="w-5 h-5 text-neutral-600" />
        </div>
        <h1 className="text-5xl font-heading tracking-tight text-foreground">The AI Editor</h1>
        <p className="text-muted-foreground text-lg font-light">
          Transform your raw thoughts into polished, authoritative posts.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-12 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-5 space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-heading text-foreground">Draft</h2>
            <p className="text-sm text-muted-foreground">Paste a link, write a thought, or dump raw notes.</p>
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. I just realized that most successful founders spend 80% of their time planning..." 
              className="min-h-[200px] resize-none bg-white border-neutral-200 focus-visible:ring-neutral-400 rounded-xl shadow-sm text-base p-5 leading-relaxed"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground tracking-wide uppercase">Distribution</h3>
            <div className="flex flex-col space-y-3 bg-neutral-50/50 p-5 rounded-xl border border-neutral-100">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="linkedin" 
                  checked={platforms.linkedin} 
                  onCheckedChange={(c) => setPlatforms({ ...platforms, linkedin: !!c })}
                  className="rounded-sm border-neutral-300"
                />
                <Label htmlFor="linkedin" className="flex items-center gap-2 cursor-pointer font-normal"><FaLinkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="twitter" 
                  checked={platforms.twitter} 
                  onCheckedChange={(c) => setPlatforms({ ...platforms, twitter: !!c })}
                  className="rounded-sm border-neutral-300"
                />
                <Label htmlFor="twitter" className="flex items-center gap-2 cursor-pointer font-normal"><FaTwitter className="w-4 h-4 text-black" /> X (Twitter)</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="threads" 
                  checked={platforms.threads} 
                  onCheckedChange={(c) => setPlatforms({ ...platforms, threads: !!c })}
                  className="rounded-sm border-neutral-300"
                />
                <Label htmlFor="threads" className="flex items-center gap-2 cursor-pointer font-normal"><MessageCircle className="w-4 h-4 text-neutral-900" /> Threads</Label>
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <Button 
            onClick={handleGenerate}
            disabled={isGenerating || !input.trim() || (!platforms.linkedin && !platforms.twitter && !platforms.threads)}
            className="w-full bg-black hover:bg-neutral-800 text-white font-medium rounded-xl h-12 shadow-sm transition-all" 
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {isGenerating ? "Drafting..." : "Generate Drafts"}
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-7"
        >
          <div className="h-full bg-white rounded-2xl border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-neutral-100 bg-neutral-50/30">
              <h2 className="text-2xl font-heading text-foreground">Review</h2>
              <p className="text-sm text-muted-foreground mt-1">Your polished content, ready to publish.</p>
            </div>
            
            <div className="p-6 flex-1">
              <Tabs defaultValue="linkedin" className="w-full h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-3 bg-neutral-100 p-1 rounded-lg">
                  <TabsTrigger value="linkedin" disabled={!platforms.linkedin} className="rounded-md data-[state=active]:shadow-sm">LinkedIn</TabsTrigger>
                  <TabsTrigger value="twitter" disabled={!platforms.twitter} className="rounded-md data-[state=active]:shadow-sm">X</TabsTrigger>
                  <TabsTrigger value="threads" disabled={!platforms.threads} className="rounded-md data-[state=active]:shadow-sm">Threads</TabsTrigger>
                </TabsList>
                
                {results ? (
                  <div className="mt-6 flex-1">
                    <TabsContent value="linkedin" className="h-full mt-0 outline-none">
                      <Textarea value={results.linkedin || "Not generated"} readOnly className="h-full min-h-[350px] font-sans bg-transparent border-0 focus-visible:ring-0 p-0 text-base leading-relaxed resize-none" />
                    </TabsContent>
                    <TabsContent value="twitter" className="h-full mt-0 outline-none">
                      <Textarea value={results.twitter || "Not generated"} readOnly className="h-full min-h-[350px] font-sans bg-transparent border-0 focus-visible:ring-0 p-0 text-base leading-relaxed resize-none" />
                    </TabsContent>
                    <TabsContent value="threads" className="h-full mt-0 outline-none">
                      <Textarea value={results.threads || "Not generated"} readOnly className="h-full min-h-[350px] font-sans bg-transparent border-0 focus-visible:ring-0 p-0 text-base leading-relaxed resize-none" />
                    </TabsContent>
                  </div>
                ) : (
                  <div className="mt-6 flex-1 min-h-[350px] flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100">
                      <Sparkles className="w-6 h-6 text-neutral-300" />
                    </div>
                    <p className="text-sm text-muted-foreground max-w-[200px]">
                      The editor is waiting for your input.
                    </p>
                  </div>
                )}
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
      <PaywallModal open={showPaywall} onOpenChange={setShowPaywall} />
    </main>
  );
}
