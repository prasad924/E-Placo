import { GraduationCap } from "lucide-react";
export default function Eloading () {
    return (
        <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 mx-auto mb-4 animate-pulse" />
          <p>Loading...</p>
        </div>
      </div>
    )
}