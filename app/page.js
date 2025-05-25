"use client";
import api from '@/lib/api'
import { useEffect, useState } from "react";
import { useRouter, notFound } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const role = localStorage.getItem("role");
      if (!role) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get(`/auth/me?role=${role}`, {
          withCredentials: true,
        });

        if (res.data) {
          setIsAuthenticated(true);
          setUser(res.data.user);
          redirectToDashboard(role);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("User not authenticated");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoggedInUser();
  }, []);

  const redirectToDashboard = (role) => {
    console.log(role)
    if (role === "admin") router.replace("/admin/dashboard");
    else if (role === "student") router.replace("/student/dashboard");
    else if (role === "recruiter") router.replace("/recruiter/dashboard");
    else notFound();
  };

  const handleLoginSuccess = (user) => {
    setUser(user)
    setIsAuthenticated(true);
    redirectToDashboard(user.role);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 mx-auto mb-4 animate-pulse" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
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
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
        <div className="fixed bottom-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} E-Placo. All rights reserved.</p>
        </div>
      </div>
    );
  }

  return null;
}
