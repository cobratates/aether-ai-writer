"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, History, PenTool, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-background relative overflow-hidden selection:bg-neutral-200">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, white, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, white, transparent 80%)"
        }}
      />

      {/* Aurora Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <motion.div 
          animate={{ 
            x: [0, 30, -20, 0], 
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-amber-200/20 rounded-full blur-[100px] mix-blend-multiply"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 30, 0], 
            y: [0, 30, -30, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-[20%] right-[15%] w-[35vw] h-[35vw] bg-slate-300/30 rounded-full blur-[120px] mix-blend-multiply"
        />
        <motion.div 
          animate={{ 
            x: [0, 20, -40, 0], 
            y: [0, 50, -20, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute bottom-[20%] left-[35%] w-[45vw] h-[45vw] bg-indigo-200/20 rounded-full blur-[120px] mix-blend-multiply"
        />
      </div>

      {/* Editorial clean header/nav placeholder if needed */}
      <div className="absolute top-8 left-8 z-10">
        <span className="font-heading text-xl font-bold tracking-tight text-foreground">AETHER</span>
      </div>

      <div className="z-10 text-center max-w-4xl mt-32 space-y-10 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-neutral-500 text-sm tracking-[0.15em] mb-6"
        >
          &mdash; The Editorial Ghostwriter &mdash;
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-heading tracking-tight text-foreground leading-[1.1]"
        >
          Modern writing, <br />
          <span className="italic text-neutral-500">elevated.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground md:px-12 leading-relaxed max-w-3xl mx-auto font-light"
        >
          Transform your raw thoughts into highly engaging, beautifully formatted prose for your personal brand. We learn your unique voice so you never sound like an algorithm.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10"
        >
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" className="bg-foreground hover:bg-neutral-800 text-background rounded-full px-10 h-14 text-lg w-full transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              Start Writing <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg w-full bg-transparent border-neutral-300 text-foreground hover:bg-neutral-100 hover:text-foreground">
              Learn More
            </Button>
          </Link>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm text-neutral-400 mt-6 flex items-center justify-center gap-2 font-medium"
        >
          <CheckCircle2 className="w-4 h-4 text-neutral-300" />
          No credit card required. 3 free generations.
        </motion.p>
      </div>

      {/* Feature Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="z-10 mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl w-full px-4 mb-32"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-2">
            <Zap className="w-6 h-6 text-neutral-600" />
          </div>
          <h3 className="text-2xl font-heading text-foreground">Intelligent Formatting</h3>
          <p className="text-muted-foreground font-light leading-relaxed">One prompt automatically generates three unique, beautifully formatted drafts tailored for LinkedIn, X, and Threads.</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-2">
            <PenTool className="w-6 h-6 text-neutral-600" />
          </div>
          <h3 className="text-2xl font-heading text-foreground">Voice Replication</h3>
          <p className="text-muted-foreground font-light leading-relaxed">Define your specific tone and topic areas once. Every draft generated will sound exactly like your authentic self.</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-2">
            <History className="w-6 h-6 text-neutral-600" />
          </div>
          <h3 className="text-2xl font-heading text-foreground">Draft Vault</h3>
          <p className="text-muted-foreground font-light leading-relaxed">Never lose a fleeting idea. All generated drafts are securely saved to your private dashboard vault for future review.</p>
        </div>
      </motion.div>
    </main>
  );
}
