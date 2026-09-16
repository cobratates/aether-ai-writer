import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <Card className="w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-neutral-200 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="space-y-4 text-center pt-8">
          <div className="flex justify-center">
            <div className="p-2 bg-neutral-100 rounded-xl shadow-sm border border-neutral-200/50">
              <Image src="/logo.jpg" alt="Aether Logo" width={32} height={32} className="rounded-lg" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-heading tracking-tight">Welcome Back</CardTitle>
            <CardDescription className="text-base font-light">
              Log in or sign up to access your private draft vault.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="bg-background"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            <div className="flex flex-col space-y-4 pt-2">
              <Button type="submit" formAction={login} className="w-full bg-black hover:bg-neutral-800 text-white h-12 rounded-xl text-base shadow-sm">
                Log In
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-neutral-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
                  <span className="bg-white px-3 text-neutral-400">Or</span>
                </div>
              </div>
              <Button type="submit" formAction={signup} variant="outline" className="w-full h-12 rounded-xl text-base bg-transparent border-neutral-300 hover:bg-neutral-50 text-foreground">
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
