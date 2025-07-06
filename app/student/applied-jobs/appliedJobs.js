"use client"

import { useEffect, useState } from "react"
import { Award, Briefcase, Building, Calendar, Clock, Search, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import api from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export function AppliedJobs() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [appliedJobs, setAppliedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredJobs, setFilteredJobs] = useState([])

  const fetchAppliedJobs = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      const response = await api.get(`/student/appliedJobs`)
      const data = response.data.applications

      if (data) {
        setAppliedJobs(data)
        setFilteredJobs(data)
      } else {
        toast.error("Failed to fetch applied jobs")
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error)
      toast.error("Error fetching applied jobs data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppliedJobs()
  }, [user?.id])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredJobs(appliedJobs)
    } else {
      const filtered = appliedJobs.filter((application) => {
        const job = application.jobId
        const searchLower = searchQuery.toLowerCase()
        return (
          job.title.toLowerCase().includes(searchLower) ||
          job.companyName.toLowerCase().includes(searchLower) ||
          (job.description && job.description.toLowerCase().includes(searchLower)) ||
          (job.skills && job.skills.some((skill) => skill.toLowerCase().includes(searchLower))) ||
          application.applicationStatus.toLowerCase().includes(searchLower)
        )
      })
      setFilteredJobs(filtered)
    }
  }, [searchQuery, appliedJobs])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Applied Jobs</h2>
          <p className="text-muted-foreground">Loading your applications...</p>
        </div>
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Applied Jobs</h2>
        <p className="text-muted-foreground">Track your job applications and their status.</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applied jobs, companies, or status..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredJobs.length} of {appliedJobs.length} applications
        {searchQuery && ` for "${searchQuery}"`}
      </div>

      <div className="grid gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((application) => <AppliedJobCard key={application._id} application={application} />)
        ) : (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No applications found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search criteria." : "You haven't applied to any jobs yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function AppliedJobCard({ application }) {
  if(!application.jobId) return
  const job = application.jobId

  const getStatusInfo = () => {
    const status = application.applicationStatus
    switch (status.toLowerCase()) {
      case "applied":
        return { color: "bg-blue-500/10 text-blue-500", text: "Applied" }
      case "shortlisted":
        return { color: "bg-purple-500/10 text-purple-500", text: "Shortlisted" }
      case "selected":
        return { color: "bg-green-500/10 text-green-500", text: "Selected" }
      case "rejected":
        return { color: "bg-red-500/10 text-red-500", text: "Rejected" }
      default:
        return { color: "bg-blue-500/10 text-blue-500", text: "In Progress" }
    }
  }

  const statusInfo = getStatusInfo()
  const deadline = new Date(job.deadline).toLocaleDateString()
  const appliedDate = new Date(application.createdAt).toLocaleDateString()
  const driveDate = job.jobDrive?.driveDate ? new Date(job.jobDrive.driveDate).toLocaleDateString() : null

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.companyName} />
              <AvatarFallback>{job.companyName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{job.companyName}</CardTitle>
              <CardDescription>{job.title}</CardDescription>
            </div>
          </div>
          <Badge className={statusInfo.color}>{statusInfo.text}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm">
          {job.salary && (
            <div className="flex items-center">
              <Award className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{job.salary}</span>
            </div>
          )}
          {job.jobDrive?.location && (
            <div className="flex items-center">
              <Building className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{job.jobDrive.location}</span>
            </div>
          )}
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Deadline: {deadline}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Applied: {appliedDate}</span>
          </div>
        </div>

        <Separator />

        {job.description && (
          <div>
            <h4 className="font-medium mb-2">Job Description</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
          </div>
        )}

        {job.skills && job.skills.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 5).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{job.skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="sm:flex-1">
                <Eye className="mr-2 h-4 w-4" />
                View Application
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>
                  Your application for {job.title} at {job.companyName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Application Status</h4>
                    <Badge className={statusInfo.color}>{statusInfo.text}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium">Applied Date</h4>
                    <p className="text-sm text-muted-foreground">{appliedDate}</p>
                  </div>
                </div>

                {application.feedback &&
                  (application.feedback.strengths?.length > 0 || application.feedback.imporvements?.length > 0) && (
                    <div>
                      <h4 className="font-medium mb-2">Feedback</h4>
                      <div className="bg-gray-50 p-3 rounded space-y-2">
                        {application.feedback.strengths?.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-green-600">Strengths:</p>
                            <ul className="text-sm text-muted-foreground list-disc list-inside">
                              {application.feedback.strengths.map((strength, index) => (
                                <li key={index}>{strength}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {application.feedback.imporvements?.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-orange-600">Areas for Improvement:</p>
                            <ul className="text-sm text-muted-foreground list-disc list-inside">
                              {application.feedback.imporvements.map((improvement, index) => (
                                <li key={index}>{improvement}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                <div>
                  <h4 className="font-medium mb-2">Job Details</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Company:</strong> {job.companyName}
                    </p>
                    <p>
                      <strong>Position:</strong> {job.title}
                    </p>
                    <p>
                      <strong>Department:</strong> {job.department}
                    </p>
                    <p>
                      <strong>Job Type:</strong> {job.jobType}
                    </p>
                    {job.salary && (
                      <p>
                        <strong>Salary:</strong> {job.salary}
                      </p>
                    )}
                    {job.jobDrive?.location && (
                      <p>
                        <strong>Location:</strong> {job.jobDrive.location}
                      </p>
                    )}
                    <p>
                      <strong>Positions:</strong> {job.noOfPositions}
                    </p>
                    <p>
                      <strong>CGPA Criteria:</strong> {job.cgpaCriteria}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {deadline}
                    </p>
                    {driveDate && (
                      <p>
                        <strong>Drive Date:</strong> {driveDate}
                      </p>
                    )}
                  </div>
                </div>

                {job.jobDrive?.selectionProcess && (
                  <div>
                    <h4 className="font-medium mb-2">Selection Process</h4>
                    <p className="text-sm text-muted-foreground">{job.jobDrive.selectionProcess}</p>
                    {job.jobDrive.interviewRounds && (
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>Interview Rounds:</strong> {job.jobDrive.interviewRounds}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
