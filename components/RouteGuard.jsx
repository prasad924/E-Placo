"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Eloading from "./loading";

export default function RouteGuard({ requiredRole, children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/");
      } else if (requiredRole && user.role !== requiredRole) {
        router.replace("/unauthorized");
      }
    }
  }, [user, loading, requiredRole, router]);

  if (loading) return <Eloading/>;
  if (!user || (requiredRole && user.role !== requiredRole)) return null;

  return <>{children}</>;
}
