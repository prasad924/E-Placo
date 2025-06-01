"use client";
import { useEffect } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogoutPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    async function logout() {
      try {
        await api.post("/auth/logout");
        setUser(null);
        router.replace("/");
      } catch (err) {
        console.error("Logout failed:", err);
        router.replace("/");
      }
    }

    logout();
  }, [router, setUser]);

  return null;
}
