"use client"

import { useState } from "react"
import {
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  MessageSquare,
  Plus,
  Search,
  ThumbsUp,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RecruiterDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJob, setSelectedJob] = useState("all")

  // Mock job postings data
  const jobPostings = [
    {
      id: "JOB001",
      title: "Software Engineer",
      department: "Engineering",
      applications: 78,
      shortlisted: 24,
      interviewed: 15,
      selected: 5,
      status: "active",
      postedDate: "2025-04-15",
      deadline: "2025-05-15",
    },
    {
      id: "JOB002",
      title: "Frontend Developer",
      department: "Engineering",
      applications: 45,
      shortlisted: 18,
      interviewed: 12,
      selected: 3,
      status: "active",
      postedDate: "2025-04-20",
      deadline: "2025-05-20",
    },
    {
      id: "JOB003",
      title: "Data Analyst",
      department: "Analytics",
      applications: 32,
      shortlisted: 12,
      interviewed: 8,
      selected: 2,
      status: "active",
      postedDate: "2025-04-25",
      deadline: "2025-05-25",
    },
    {
      id: "JOB004",
      title: "Product Manager",
      department: "Product",
      applications: 28,
      shortlisted: 10,
      interviewed: 6,
      selected: 1,
      status: "closed",
      postedDate: "2025-03-15",
      deadline: "2025-04-15",
    },
  ]

  const activeJobs = jobPostings.filter((job) => job.status === "active")
  const totalApplications = jobPostings.reduce((sum, job) => sum + job.applications, 0)
  const totalShortlisted = jobPostings.reduce((sum, job) => sum + job.shortlisted, 0)
  const totalInterviewed = jobPostings.reduce((sum, job) => sum + job.interviewed, 0)
  const totalSelected = jobPostings.reduce((sum, job) => sum + job.selected, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recruiter Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to TechCorp's recruitment portal. Manage your job postings and candidates.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs.length}</div>
            <p className="text-xs text-muted-foreground mt-2">{jobPostings.length - activeJobs.length} closed jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground mt-2">Across all job postings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalShortlisted}</div>
            <Progress value={(totalShortlisted / totalApplications) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round((totalShortlisted / totalApplications) * 100)}% of total applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selected</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSelected}</div>
            <Progress value={(totalSelected / totalShortlisted) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round((totalSelected / totalShortlisted) * 100)}% conversion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Job Postings Management */}
      <Card>
        <CardHeader>
          <CardTitle>Job Postings</CardTitle>
          <CardDescription>Manage your active and closed job postings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobPostings.map((job) => (
              <JobPostingCard key={job.id} job={job} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Candidate Management</CardTitle>
            <CardDescription>Review and manage candidate applications across all jobs.</CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search candidates..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {jobPostings.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="shortlisted">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                <TabsTrigger value="pending">Pending Review</TabsTrigger>
                <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
              </TabsList>
              <TabsContent value="shortlisted" className="space-y-4 mt-4">
                <CandidateCard
                  name="Rahul Sharma"
                  department="Computer Science"
                  cgpa={8.9}
                  skills={["Java", "Spring Boot", "React"]}
                  status="shortlisted"
                  jobTitle="Software Engineer"
                  jobId="JOB001"
                  interviewDate="May 5, 2025"
                  image="/placeholder.svg"
                />
                <CandidateCard
                  name="Priya Patel"
                  department="Computer Science"
                  cgpa={9.2}
                  skills={["Python", "Django", "Machine Learning"]}
                  status="shortlisted"
                  jobTitle="Data Analyst"
                  jobId="JOB003"
                  interviewDate="May 5, 2025"
                  image="/placeholder.svg"
                />
                <CandidateCard
                  name="Amit Singh"
                  department="Information Technology"
                  cgpa={8.7}
                  skills={["JavaScript", "Node.js", "MongoDB"]}
                  status="shortlisted"
                  jobTitle="Frontend Developer"
                  jobId="JOB002"
                  interviewDate="May 6, 2025"
                  image="/placeholder.svg"
                />
                <Button variant="outline" className="w-full">
                  View all shortlisted candidates
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
              <TabsContent value="pending" className="space-y-4 mt-4">
                <CandidateCard
                  name="Neha Gupta"
                  department="Electronics"
                  cgpa={8.5}
                  skills={["C++", "Embedded Systems", "IoT"]}
                  status="pending"
                  jobTitle="Software Engineer"
                  jobId="JOB001"
                  image="/placeholder.svg"
                />
                <CandidateCard
                  name="Vikram Reddy"
                  department="Computer Science"
                  cgpa={8.3}
                  skills={["Java", "Android", "Kotlin"]}
                  status="pending"
                  jobTitle="Frontend Developer"
                  jobId="JOB002"
                  image="/placeholder.svg"
                />
                <Button variant="outline" className="w-full">
                  View all pending candidates
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
              <TabsContent value="interviewed" className="space-y-4 mt-4">
                <CandidateCard
                  name="Ananya Desai"
                  department="Computer Science"
                  cgpa={9.0}
                  skills={["Python", "React", "AWS"]}
                  status="interviewed"
                  jobTitle="Software Engineer"
                  jobId="JOB001"
                  feedback="Strong technical skills, good communication"
                  image="/placeholder.svg"
                />
                <CandidateCard
                  name="Rohan Joshi"
                  department="Information Technology"
                  cgpa={8.6}
                  skills={["JavaScript", "Angular", "Node.js"]}
                  status="interviewed"
                  jobTitle="Frontend Developer"
                  jobId="JOB002"
                  feedback="Good problem-solving skills, needs improvement in system design"
                  image="/placeholder.svg"
                />
                <Button variant="outline" className="w-full">
                  View all interviewed candidates
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Interview Schedule</CardTitle>
            <CardDescription>Upcoming interviews across all job postings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <InterviewScheduleItem
                name="Rahul Sharma"
                jobTitle="Software Engineer"
                jobId="JOB001"
                round="Technical Round 1"
                date="May 5, 2025"
                time="10:00 AM - 11:00 AM"
                interviewer="Vikram Mehta"
                platform="Zoom"
              />
              <InterviewScheduleItem
                name="Priya Patel"
                jobTitle="Data Analyst"
                jobId="JOB003"
                round="Technical Round 1"
                date="May 5, 2025"
                time="11:30 AM - 12:30 PM"
                interviewer="Sneha Gupta"
                platform="Zoom"
              />
              <InterviewScheduleItem
                name="Amit Singh"
                jobTitle="Frontend Developer"
                jobId="JOB002"
                round="Technical Round 1"
                date="May 6, 2025"
                time="2:00 PM - 3:00 PM"
                interviewer="Rajesh Kumar"
                platform="Zoom"
              />
              <Button variant="outline" className="w-full">
                View full schedule
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Job Performance</CardTitle>
            <CardDescription>Application statistics by job posting.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.id}</p>
                    <p className="text-lg font-bold">{job.applications} applications</p>
                  </div>
                  <div className="text-right">
                    <Progress value={(job.applications / totalApplications) * 100} className="w-20 mb-1" />
                    <p className="text-xs text-muted-foreground">
                      {Math.round((job.applications / totalApplications) * 100)}%
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <BarChart3 className="mr-2 h-4 w-4" />
                View detailed analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest interview feedback across all jobs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FeedbackItem
                name="Ananya Desai"
                jobTitle="Software Engineer"
                jobId="JOB001"
                interviewer="Vikram Mehta"
                rating="Positive"
                comment="Strong technical skills, good communication. Recommended for next round."
                date="May 2, 2025"
              />
              <FeedbackItem
                name="Rohan Joshi"
                jobTitle="Frontend Developer"
                jobId="JOB002"
                interviewer="Sneha Gupta"
                rating="Neutral"
                comment="Good problem-solving skills, needs improvement in system design."
                date="May 2, 2025"
              />
              <FeedbackItem
                name="Kiran Shah"
                jobTitle="Data Analyst"
                jobId="JOB003"
                interviewer="Rajesh Kumar"
                rating="Negative"
                comment="Lacks fundamental knowledge in key areas. Not recommended."
                date="May 1, 2025"
              />
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                View all feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function JobPostingCard({ job }) {
  const statusColors = {
    active: "bg-green-500/10 text-green-500",
    closed: "bg-gray-500/10 text-gray-500",
    draft: "bg-orange-500/10 text-orange-500",
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Briefcase className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{job.title}</h4>
            <Badge className={statusColors[job.status]}>{job.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {job.id} • {job.department} • Posted: {job.postedDate}
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>{job.applications} applications</span>
            <span>{job.shortlisted} shortlisted</span>
            <span>{job.interviewed} interviewed</span>
            <span>{job.selected} selected</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function CandidateCard({
  name,
  department,
  cgpa,
  skills,
  status,
  jobTitle,
  jobId,
  interviewDate,
  feedback,
  image,
}) {
  const statusColors = {
    shortlisted: "bg-blue-500/10 text-blue-500",
    pending: "bg-orange-500/10 text-orange-500",
    interviewed: "bg-purple-500/10 text-purple-500",
    selected: "bg-green-500/10 text-green-500",
    rejected: "bg-red-500/10 text-red-500",
  }

  const statusText = {
    shortlisted: "Shortlisted",
    pending: "Pending Review",
    interviewed: "Interviewed",
    selected: "Selected",
    rejected: "Rejected",
  }

  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={image || "/placeholder.svg"} alt={name} />
        <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{name}</h4>
          <Badge className={statusColors[status]}>{statusText[status]}</Badge>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Briefcase className="mr-1 h-3 w-3" />
            {jobTitle} ({jobId})
          </span>
          <span className="flex items-center">
            <GraduationCap className="mr-1 h-3 w-3" />
            {department}
          </span>
          <span className="flex items-center">
            <FileText className="mr-1 h-3 w-3" />
            CGPA: {cgpa}
          </span>
          {interviewDate && (
            <span className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              Interview: {interviewDate}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        {feedback && (
          <p className="text-xs text-muted-foreground border-t pt-2 mt-2">
            <span className="font-medium">Feedback:</span> {feedback}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <User className="h-4 w-4" />
        </Button>
        {status === "pending" && (
          <>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
        {status === "shortlisted" && (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MessageSquare className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

function InterviewScheduleItem({
  name,
  jobTitle,
  jobId,
  round,
  date,
  time,
  interviewer,
  platform,
}) {
  return (
    <div className="flex gap-4 rounded-lg border p-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Calendar className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-1">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm text-muted-foreground">
          {jobTitle} ({jobId})
        </p>
        <p className="text-sm text-muted-foreground">{round}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {date}
          </span>
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {time}
          </span>
          <span className="flex items-center">
            <User className="mr-1 h-3 w-3" />
            {interviewer}
          </span>
          <span className="flex items-center">
            <CheckCircle className="mr-1 h-3 w-3" />
            {platform}
          </span>
        </div>
      </div>
    </div>
  )
}

function FeedbackItem({
  name,
  jobTitle,
  jobId,
  interviewer,
  rating,
  comment,
  date,
}) {
  const ratingColors = {
    Positive: "bg-green-500/10 text-green-500",
    Neutral: "bg-blue-500/10 text-blue-500",
    Negative: "bg-red-500/10 text-red-500",
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{name}</h4>
        <Badge className={ratingColors[rating]}>{rating}</Badge>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {jobTitle} ({jobId}) • {interviewer} • {date}
      </p>
      <p className="text-sm mt-2">{comment}</p>
    </div>
  )
}
