"use client";

import RouteGuard from "@/components/RouteGuard";
import { RecruiterLayout } from "./recruiter-layout";
import { PlatformSettingsProvider } from "@/context/PlatformSettingContext";

export default function RecruiterAppLayout({ children }) {
  return (
    <RouteGuard requiredRole="recruiter">
      <PlatformSettingsProvider>
        <RecruiterLayout>{children}</RecruiterLayout>
      </PlatformSettingsProvider>
    </RouteGuard>
  );
}
