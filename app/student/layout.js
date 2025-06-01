"use client";

import RouteGuard from "@/components/RouteGuard";

export default function StudentAppLayout({ children }) {
  return (
    <RouteGuard requiredRole="student">
      {children}
    </RouteGuard>
  );
}
