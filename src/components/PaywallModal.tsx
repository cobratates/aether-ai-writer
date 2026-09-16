"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaywallModal({ open, onOpenChange }: PaywallModalProps) {
  // Grab the checkout link from environment variables or fallback
  const whopLink = process.env.NEXT_PUBLIC_WHOP_CHECKOUT_LINK || "#";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 p-3 bg-violet-600/10 rounded-full w-fit">
            <Sparkles className="w-8 h-8 text-violet-600" />
          </div>
          <DialogTitle className="text-center text-2xl">Unlock Unlimited Power</DialogTitle>
          <DialogDescription className="text-center text-base">
            You've used all 3 of your free generations. Upgrade to Pro to keep crushing your personal brand.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Unlimited AI Post Generations</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Access to all 3 platform formats</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span>Priority access to new features</span>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Link href={whopLink} className="w-full">
            <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium" size="lg">
              Upgrade to Pro — $15/mo
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
