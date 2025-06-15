"use client";

import RouteGuard from "@/components/RouteGuard";
import { RecruiterLayout } from "@/components/recruiter-layout";

export default function RecruiterAppLayout({ children }) {
  return (
    <RouteGuard requiredRole="recruiter">
      <RecruiterLayout>
      {children}
      </RecruiterLayout>
    </RouteGuard>
  );
}
