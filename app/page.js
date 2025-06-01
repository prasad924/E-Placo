"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import Eloading from "@/components/loading";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(`/${user.role}/dashboard`);
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <Eloading/>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-10 w-10" />
            <h1 className="text-3xl font-bold">E-Placo</h1>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h2>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to access the placement portal
          </p>
        </div>
        <LoginForm />
      </div>
      <div className="fixed bottom-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} E-Placo. All rights reserved.</p>
      </div>
    </div>
  );
}
