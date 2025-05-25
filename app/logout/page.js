"use client";
import { useEffect } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await api.post("/auth/logout", { method: "POST" });
      localStorage.removeItem('role')
      router.replace("/");
    }
    logout();
  }, [router]);

  return <p>Logging out...</p>;
}
