"use client";

import RouteGuard from "@/components/RouteGuard";

export default function AdminAppLayout({ children }) {
  return (
    <RouteGuard requiredRole="admin">
      {children}
    </RouteGuard>
  );
}
