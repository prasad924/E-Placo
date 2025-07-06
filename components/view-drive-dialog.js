"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  DollarSign,
  GraduationCap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ViewDriveDialog({ drive, onClose, onEdit }) {
  return (
    <Dialog open={!!drive} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={drive.logo || "/default.png"} alt={drive.companyName} />
              <AvatarFallback>{drive.companyName?.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div>
                {drive.companyName} - {drive.title}({drive.id})
              </div>
              <div className="text-sm text-muted-foreground">{drive.location}</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription/>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Package: {drive.salary || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span>Drive Date: {drive.jobDrive.driveDate ? new Date(drive.jobDrive.driveDate).toLocaleDateString() : "TBD"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span>
                    Deadline:{" "}
                    {drive.deadline ? new Date(drive.deadline).toLocaleDateString() : "TBD"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                  <span>Min CGPA: {drive.cgpaCriteria || "N/A"}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Eligible Departments</h4>
                  <div className="flex flex-wrap gap-2">
                    {drive.jobDrive.eligibleStudents ?
                      <Badge key={drive.jobDrive.eligibleStudents} variant="secondary">
                        {drive.jobDrive.eligibleStudents}
                      </Badge>
                     :<span className="text-muted-foreground">All Departments</span>}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Selection Process</h4>
                  <div className="flex flex-wrap gap-2">
                    {drive.jobDrive.selectionProcess.split(',').map((round, index) => (
                      <Badge key={index} variant="outline">
                        {round}
                      </Badge>
                    )) || <span className="text-muted-foreground">Not specified</span>}
                  </div>
                </div>
              </div>
            </div>
            {drive.description && (
              <div>
                <h4 className="font-medium mb-2">Job Description</h4>
                <p className="text-sm text-muted-foreground">{drive.description}</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="applications">
            <div className="space-y-4">
              <div className="grid grid-cols-1 text-center gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">{drive.applications?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">Total Applications</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit}>Edit Drive</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
