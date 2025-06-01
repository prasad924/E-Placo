"use client";

import RouteGuard from "@/components/RouteGuard";

export default function RecruiterAppLayout({ children }) {
  return (
    <RouteGuard requiredRole="recruiter">
      {children}
    </RouteGuard>
  );
}
