"use client"

import React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Building,
  Award,
  MessageSquare,
  Phone,
  Video,
  FileText,
} from "lucide-react"


export function ApplicationStatusDialog({
  job,
  applicationStatus,
  appliedDate,
  applicationId,
  feedback,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "applied":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "application sent":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "shortlisted":
        return <CheckCircle className="h-5 w-5 text-purple-500" />
      case "interview":
        return <Users className="h-5 w-5 text-orange-500" />
      case "hired":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "applied":
        return "bg-blue-500/10 text-blue-700 border-blue-200"
      case "application sent":
        return "bg-green-500/10 text-green-700 border-green-200"
      case "shortlisted":
        return "bg-purple-500/10 text-purple-700 border-purple-200"
      case "interview":
        return "bg-orange-500/10 text-orange-700 border-orange-200"
      case "hired":
        return "bg-green-600/10 text-green-800 border-green-300"
      case "rejected":
        return "bg-red-500/10 text-red-700 border-red-200"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200"
    }
  }

  const getApplicationSteps = () => {
    const steps = [
      { name: "Applied", status: "applied", completed: true },
      { name: "Application Sent", status: "application sent", completed: false },
      { name: "Shortlisted", status: "shortlisted", completed: false },
      { name: "Interview", status: "interview", completed: false },
      { name: "Final Result", status: "hired", completed: false },
    ]

    const currentStatusIndex = steps.findIndex((step) => step.status === applicationStatus.toLowerCase())

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentStatusIndex,
      current: index === currentStatusIndex,
    }))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getNextSteps = () => {
    switch (applicationStatus.toLowerCase()) {
      case "applied":
        return "Your application has been submitted. The recruiter will review it shortly."
      case "application sent":
        return "Your application is under review. You'll be notified about the next steps soon."
      case "shortlisted":
        return "Congratulations! You've been shortlisted. Prepare for the upcoming interview rounds."
      case "interview":
        return "Interview scheduled. Check your email for details and prepare accordingly."
      case "hired":
        return "Congratulations! You've been selected. HR will contact you with offer details."
      case "rejected":
        return "Unfortunately, you weren't selected this time. Keep applying to other opportunities!"
      default:
        return "Application status will be updated soon."
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt={job.companyName} />
              <AvatarFallback>{job.companyName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-semibold">{job.companyName}</div>
              <div className="text-sm text-muted-foreground font-normal">{job.title}</div>
            </div>
          </DialogTitle>
          <DialogDescription>Application ID: {applicationId}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(applicationStatus)}
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge className={`${getStatusColor(applicationStatus)} text-sm px-3 py-1`}>
                  {applicationStatus.toUpperCase()}
                </Badge>
                <span className="text-sm text-muted-foreground">Applied on {formatDate(appliedDate)}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{getNextSteps()}</p>
            </CardContent>
          </Card>

          {/* Application Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Application Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getApplicationSteps().map((step, index) => (
                  <div key={step.name} className="flex items-center gap-4">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        step.completed
                          ? "border-green-500 bg-green-500 text-white"
                          : step.current
                            ? "border-blue-500 bg-blue-500 text-white"
                            : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          step.completed ? "text-green-700" : step.current ? "text-blue-700" : "text-gray-500"
                        }`}
                      >
                        {step.name}
                      </div>
                      {step.current && <div className="text-sm text-muted-foreground">Current stage</div>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{job.jobDrive?.location || "Location TBD"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Drive: {new Date(job.jobDrive?.driveDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{job.noOfPositions} positions</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Job Description</h4>
                <p className="text-sm text-muted-foreground">{job.description}</p>
              </div>

              {job.skills && job.skills.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interview Details (if applicable) */}
          {applicationStatus.toLowerCase() === "interview" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Interview Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Date: To be announced</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Time: Will be shared via email</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>Mode: {job.jobDrive?.selectionProcess || "To be decided"}</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Preparation Tips:</strong> Review the job description, prepare for technical questions, and
                    have examples ready to demonstrate your skills.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Feedback (if available) */}
          {feedback && (feedback.strengths.length > 0 || feedback.improvements.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {feedback.strengths.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {feedback.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-green-600 flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {feedback.improvements.length > 0 && (
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">Areas for Improvement</h4>
                    <ul className="space-y-1">
                      {feedback.improvements.map((improvement, index) => (
                        <li key={index} className="text-sm text-orange-600 flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Company Email: </span>
                  <span className="text-muted-foreground">{job.companyMail}</span>
                </div>
                <div>
                  <span className="font-medium">For queries: </span>
                  <span className="text-muted-foreground">Contact your placement coordinator</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1">
              <FileText className="mr-2 h-4 w-4" />
              Download Application
            </Button>
            <Button variant="outline" className="flex-1">
              <Building className="mr-2 h-4 w-4" />
              Company Profile
            </Button>
            {applicationStatus.toLowerCase() === "interview" && (
              <Button className="flex-1">
                <Video className="mr-2 h-4 w-4" />
                Join Interview
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
