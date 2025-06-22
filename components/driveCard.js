"use client"

import {
  Clock,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function DriveCard({ id, company, role, deadline, status, logo, applicants, totalPositions }) {
  const statusColors = {
    active: "bg-green-500/10 text-green-500",
    upcoming: "bg-orange-500/10 text-orange-500",
    completed: "bg-blue-500/10 text-blue-500",
  }

  const statusText = {
    active: "Active",
    upcoming: "Upcoming",
    completed: "Completed",
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={logo || "/default.png"} alt={company} />
        <AvatarFallback>{company.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{company}</h4>
          <Badge className={statusColors[status]}>{statusText[status]}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{role}({id})</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {deadline}
          </span>
          <span className="flex items-center">
            <Users className="mr-1 h-3 w-3" />
            {applicants} / {totalPositions} positions
          </span>
        </div>
      </div>
    </div>
  )
}