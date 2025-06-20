"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setUser(res.data.user || null);
      } catch (err) {
        setUser(null);
        router.push('/logout');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
    const handler = () => fetchUser();
    window.addEventListener("student-updated", handler);

    return () => {
      window.removeEventListener("student-updated", handler);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
