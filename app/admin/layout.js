"use client";

import RouteGuard from "@/components/RouteGuard";
import { AdminLayout } from "./admin-layout";
import { PlatformSettingsProvider } from "@/context/PlatformSettingContext";

export default function AdminAppLayout({ children }) {
  return (
    <RouteGuard requiredRole="admin">
      <PlatformSettingsProvider>
        <AdminLayout>{children}</AdminLayout>
      </PlatformSettingsProvider>
    </RouteGuard>
  );
}
