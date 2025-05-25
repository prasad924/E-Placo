"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import React from "react";

export default function AdminDashboard() {
  const router = useRouter();
  return (
    <>
      <div>I am Admin Dashboard</div>
      <Button onClick={() => router.push("/logout")}>Logout</Button>
    </>
  );
}
