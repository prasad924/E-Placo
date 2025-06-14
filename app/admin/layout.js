"use client";

import RouteGuard from "@/components/RouteGuard";
import { AdminLayout } from "@/components/admin-layout";

export default function AdminAppLayout({ children }) {
  return (
    <RouteGuard requiredRole="admin">
      <AdminLayout>{children}</AdminLayout>
    </RouteGuard>
  );
}
