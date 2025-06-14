"use client"

import React from "react"
import { useState } from "react"
import { Search, Filter, Eye, CheckCircle, X, Clock, MapPin, Briefcase, Users, Calendar, DollarSign } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PendingJobPosts() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [pendingJobs, setPendingJobs] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      companyLogo: "/placeholder.svg",
      location: "Bangalore, India",
      jobType: "Full-time",
      experience: "2-4 years",
      salary: "₹12-18 LPA",
      positions: 5,
      department: "Computer Science",
      submittedBy: "Rajesh Kumar",
      submittedDate: "2024-05-01",
      status: "Pending Review",
      description: "We are looking for a Senior Software Engineer to join our dynamic team...",
      requirements: "Bachelor's degree in Computer Science, 2+ years experience in React/Node.js",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      applicationDeadline: "2024-05-15",
      selectionProcess: "Online Test → Technical Interview → HR Interview",
      cgpaCriteria: "7.0+",
      priority: "High",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "InnovateTech",
      companyLogo: "/placeholder.svg",
      location: "Mumbai, India",
      jobType: "Full-time",
      experience: "0-2 years",
      salary: "₹6-10 LPA",
      positions: 3,
      department: "Computer Science",
      submittedBy: "Sneha Gupta",
      submittedDate: "2024-04-30",
      status: "Pending Review",
      description: "Join our frontend team to build amazing user experiences...",
      requirements: "Bachelor's degree in Computer Science or related field",
      skills: ["React", "JavaScript", "CSS", "HTML"],
      applicationDeadline: "2024-05-12",
      selectionProcess: "Coding Test → Technical Interview → Final Interview",
      cgpaCriteria: "6.5+",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "DataInsights Corp",
      companyLogo: "/placeholder.svg",
      location: "Hyderabad, India",
      jobType: "Full-time",
      experience: "1-3 years",
      salary: "₹8-12 LPA",
      positions: 2,
      department: "All Departments",
      submittedBy: "Vikram Mehta",
      submittedDate: "2024-04-28",
      status: "Under Review",
      description: "We need a skilled Data Analyst to help us make data-driven decisions...",
      requirements: "Bachelor's degree in any field with strong analytical skills",
      skills: ["Python", "SQL", "Excel", "Tableau"],
      applicationDeadline: "2024-05-10",
      selectionProcess: "Aptitude Test → Case Study → Interview",
      cgpaCriteria: "7.5+",
    },
  ])

  const filteredJobs = pendingJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status.toLowerCase().includes(statusFilter.toLowerCase())
    return matchesSearch && matchesStatus
  })

  const handleReviewJob = (job) => {
    setSelectedJob(job)
    setShowReviewDialog(true)
  }

  const handleApproveJob = (jobId) => {
    const updatedJobs = pendingJobs.map((job) => (job.id === jobId ? { ...job, status: "Approved" } : job))
    setPendingJobs(updatedJobs)
    alert(`Job ${jobId} approved and published!`)
    // Here you would update the job status in your backend
  }

  const handleRejectJob = (jobId) => {
    const updatedJobs = pendingJobs.map((job) => (job.id === jobId ? { ...job, status: "Rejected" } : job))
    setPendingJobs(updatedJobs)
    alert(`Job ${jobId} rejected and returned to recruiter!`)
    // Here you would update the job status in your backend
  }

  const handleUpdateJob = (updatedJob) => {
    const updatedJobs = pendingJobs.map((job) => (job.id === updatedJob.id ? { ...updatedJob } : job))
    setPendingJobs(updatedJobs)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pending Job Posts</h2>
          <p className="text-muted-foreground">Review and approve job posts submitted by recruiters.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingJobs.filter((j) => j.status === "Pending Review").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting admin review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingJobs.filter((j) => j.status === "Under Review").length}</div>
            <p className="text-xs text-muted-foreground">Currently being reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Positions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingJobs.reduce((sum, j) => sum + j.positions, 0)}</div>
            <p className="text-xs text-muted-foreground">Available positions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Job Posts Awaiting Review</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  className="pl-8 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="under">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Details</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Requirements</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{job.title}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Briefcase className="mr-1 h-3 w-3" />
                          {job.jobType}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="mr-1 h-3 w-3" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                        <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{job.company}</div>
                        <div className="text-sm text-muted-foreground">{job.department}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">Experience:</span> {job.experience}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">CGPA:</span> {job.cgpaCriteria}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Positions:</span> {job.positions}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{job.submittedBy}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {job.submittedDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={job.status === "Pending Review" ? "outline" : "secondary"}>{job.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button variant="ghost" size="icon" onClick={() => handleReviewJob(job)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleApproveJob(job.id)}>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleRejectJob(job.id)}>
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showReviewDialog && selectedJob && (
        <JobReviewDialog job={selectedJob} onClose={() => setShowReviewDialog(false)} onUpdate={handleUpdateJob} />
      )}
    </div>
  )
}

function JobReviewDialog({ job, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    id: job.id,
    title: job.title,
    description: job.description,
    requirements: job.requirements,
    salary: job.salary,
    positions: job.positions.toString(),
    applicationDeadline: job.applicationDeadline,
    cgpaCriteria: job.cgpaCriteria,
    selectionProcess: job.selectionProcess,
    skills: job.skills.join(", "),
    department: job.department,
    jobType: job.jobType,
    experience: job.experience,
    location: job.location,
    adminNotes: "",
    company: job.company,
    companyLogo: job.companyLogo,
    submittedBy: job.submittedBy,
    submittedDate: job.submittedDate,
    priority: job.priority,
    status: job.status,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Updated Job Data:", formData)
    alert("Job post approved and published!")
    onUpdate(formData)
    onClose()
  }

  const handleReject = () => {
    if (formData.adminNotes.trim()) {
      alert("Job post rejected and returned to recruiter with feedback!")
      onUpdate(formData)
      onClose()
    } else {
      alert("Please provide feedback notes before rejecting.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Review Job Post</h2>
              <p className="text-muted-foreground">
                Submitted by {job.submittedBy} from {job.company}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Job Details</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="review">Admin Review</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Civil">Civil</SelectItem>
                      <SelectItem value="All Departments">All Departments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select
                    value={formData.jobType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, jobType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="positions">Number of Positions</Label>
                  <Input
                    id="positions"
                    type="number"
                    value={formData.positions}
                    onChange={(e) => setFormData((prev) => ({ ...prev, positions: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicationDeadline">Application Deadline</Label>
                  <Input
                    id="applicationDeadline"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => setFormData((prev) => ({ ...prev, applicationDeadline: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={6}
                />
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgpaCriteria">CGPA Criteria</Label>
                  <Input
                    id="cgpaCriteria"
                    value={formData.cgpaCriteria}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cgpaCriteria: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="selectionProcess">Selection Process</Label>
                  <Textarea
                    id="selectionProcess"
                    value={formData.selectionProcess}
                    onChange={(e) => setFormData((prev) => ({ ...prev, selectionProcess: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="review" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Original Submission Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Submitted by:</span> {job.submittedBy}
                    </div>
                    <div>
                      <span className="font-medium">Company:</span> {job.company}
                    </div>
                    <div>
                      <span className="font-medium">Submitted on:</span> {job.submittedDate}
                    </div>
                    <div>
                      <span className="font-medium">Priority:</span> {job.priority}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminNotes">Admin Notes/Feedback</Label>
                  <Textarea
                    id="adminNotes"
                    value={formData.adminNotes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, adminNotes: e.target.value }))}
                    rows={4}
                    placeholder="Add any notes or feedback for the recruiter..."
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleReject}>
              Reject & Return
            </Button>
            <Button type="submit">Approve & Publish</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
