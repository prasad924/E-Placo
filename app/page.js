import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>E-Placo (Under development)</AlertTitle>
        <AlertDescription>
          A dedicated platform designed to support KMIT students by simplifying
          and reducing the need for manual, document-based placement processes.
        </AlertDescription>
      </Alert>
    </div>
  );
}
