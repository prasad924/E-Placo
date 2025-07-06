"use client";

import RouteGuard from "@/components/RouteGuard";
import { StudentLayout } from "./student-layout";
import { PlatformSettingsProvider } from "@/context/PlatformSettingContext";

export default function StudentAppLayout({ children }) {
  return (
    <RouteGuard requiredRole="student">
      <PlatformSettingsProvider>
        <StudentLayout>{children}</StudentLayout>
      </PlatformSettingsProvider>
    </RouteGuard>
  );
}
