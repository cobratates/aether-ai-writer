import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Settings, LogOut, Sparkles } from "lucide-react";
import { signOut } from "./actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-neutral-200">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
        <div className="container max-w-5xl mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-neutral-100 rounded-md shadow-sm">
              <Image src="/logo.jpg" alt="Aether Logo" width={24} height={24} className="rounded-sm" />
            </div>
            <span className="font-heading text-xl tracking-tight text-foreground">AETHER</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex text-sm text-muted-foreground mr-4">
              {user.email}
            </div>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="icon" title="Settings">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <form action={signOut}>
              <Button variant="ghost" size="icon" title="Sign Out">
                <LogOut className="w-5 h-5 text-destructive" />
              </Button>
            </form>
          </div>
        </div>
      </header>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
