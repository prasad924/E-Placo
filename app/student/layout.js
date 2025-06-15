"use client";

import RouteGuard from "@/components/RouteGuard";
import { StudentLayout } from "./student-layout";

export default function StudentAppLayout({ children }) {
  return (
    <RouteGuard requiredRole="student">
      <StudentLayout>
      {children}
      </StudentLayout>
    </RouteGuard>
  );
}
