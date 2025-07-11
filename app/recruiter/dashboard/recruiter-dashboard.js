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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import NewDriveDialog from "@/components/newDrive"

export function RecruiterDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJob, setSelectedJob] = useState("all")
  const [isViewJobOpen, setIsViewJobOpen] = useState(false)
  const [isEditJobOpen, setIsEditJobOpen] = useState(false)
  const [selectedJobData, setSelectedJobData] = useState(null)
  const [newDrive, setNewDrive] = useState(false);

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
      location: "Bangalore, India",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹8-12 LPA",
      description: "We are looking for a skilled Software Engineer to join our dynamic team...",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "2+ years of experience in software development",
        "Proficiency in Java, Python, or JavaScript",
        "Experience with databases and web technologies",
      ],
      skills: ["Java", "Python", "JavaScript", "SQL", "React"],
      benefits: ["Health Insurance", "Flexible Working Hours", "Learning Budget", "Stock Options"],
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
      location: "Mumbai, India",
      type: "Full-time",
      experience: "1-3 years",
      salary: "₹6-10 LPA",
      description: "Join our frontend team to build amazing user experiences...",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "1+ years of experience in frontend development",
        "Strong knowledge of React, HTML, CSS, JavaScript",
        "Experience with responsive design",
      ],
      skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript"],
      benefits: ["Health Insurance", "Remote Work", "Learning Budget", "Team Outings"],
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
      location: "Delhi, India",
      type: "Full-time",
      experience: "1-2 years",
      salary: "₹5-8 LPA",
      description: "We need a Data Analyst to help us make data-driven decisions...",
      requirements: [
        "Bachelor's degree in Statistics, Mathematics, or related field",
        "1+ years of experience in data analysis",
        "Proficiency in SQL, Python, and Excel",
        "Experience with data visualization tools",
      ],
      skills: ["Python", "SQL", "Excel", "Tableau", "Statistics"],
      benefits: ["Health Insurance", "Flexible Hours", "Training Programs", "Performance Bonus"],
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
      location: "Pune, India",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹12-18 LPA",
      description: "Lead product strategy and development for our key products...",
      requirements: [
        "Bachelor's degree in Business, Engineering, or related field",
        "3+ years of product management experience",
        "Strong analytical and communication skills",
        "Experience with agile methodologies",
      ],
      skills: ["Product Strategy", "Analytics", "Agile", "Communication", "Leadership"],
      benefits: ["Health Insurance", "Stock Options", "Learning Budget", "Flexible Work"],
    },
  ]

  const activeJobs = jobPostings.filter((job) => job.status === "active")
  const totalApplications = jobPostings.reduce((sum, job) => sum + job.applications, 0)
  const totalShortlisted = jobPostings.reduce((sum, job) => sum + job.shortlisted, 0)
  const totalInterviewed = jobPostings.reduce((sum, job) => sum + job.interviewed, 0)
  const totalSelected = jobPostings.reduce((sum, job) => sum + job.selected, 0)

  const handleViewJob = (job) => {
    setSelectedJobData(job)
    setIsViewJobOpen(true)
  }

  const handleEditJob = (job) => {
    setSelectedJobData(job)
    setIsEditJobOpen(true)
  }

  const handleSaveJob = () => {
    // Here you would typically save the job data
    console.log("Saving job:", selectedJobData)
    setIsEditJobOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recruiter Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to TechCorp&apos;s recruitment portal. Manage your job postings and candidates.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setNewDrive(true)} className={'cursor-pointer'}>
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
          {newDrive && <NewDriveDialog onClose={() => setNewDrive(false)} />}
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
              <JobPostingCard
                key={job.id}
                job={job}
                onView={() => handleViewJob(job)}
                onEdit={() => handleEditJob(job)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Job Dialog */}
      <Dialog open={isViewJobOpen} onOpenChange={setIsViewJobOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Job Details - {selectedJobData?.title}</DialogTitle>
            <DialogDescription>Complete job posting information</DialogDescription>
          </DialogHeader>
          {selectedJobData && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Job ID:</strong> {selectedJobData.id}
                    </p>
                    <p>
                      <strong>Title:</strong> {selectedJobData.title}
                    </p>
                    <p>
                      <strong>Department:</strong> {selectedJobData.department}
                    </p>
                    <p>
                      <strong>Location:</strong> {selectedJobData.location}
                    </p>
                    <p>
                      <strong>Type:</strong> {selectedJobData.type}
                    </p>
                    <p>
                      <strong>Experience:</strong> {selectedJobData.experience}
                    </p>
                    <p>
                      <strong>Salary:</strong> {selectedJobData.salary}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Application Statistics</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Applications:</strong> {selectedJobData.applications}
                    </p>
                    <p>
                      <strong>Shortlisted:</strong> {selectedJobData.shortlisted}
                    </p>
                    <p>
                      <strong>Interviewed:</strong> {selectedJobData.interviewed}
                    </p>
                    <p>
                      <strong>Selected:</strong> {selectedJobData.selected}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <Badge
                        className={
                          selectedJobData.status === "active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-gray-500/10 text-gray-500"
                        }
                      >
                        {selectedJobData.status}
                      </Badge>
                    </p>
                    <p>
                      <strong>Posted:</strong> {selectedJobData.postedDate}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {selectedJobData.deadline}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <p className="text-sm text-muted-foreground">{selectedJobData.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {selectedJobData.requirements?.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJobData.skills?.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJobData.benefits?.map((benefit) => (
                    <Badge key={benefit} variant="secondary">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={isEditJobOpen} onOpenChange={setIsEditJobOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job - {selectedJobData?.title}</DialogTitle>
            <DialogDescription>Update job posting information</DialogDescription>
          </DialogHeader>
          {selectedJobData && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Job Title</Label>
                  <Input
                    id="edit-title"
                    value={selectedJobData.title}
                    onChange={(e) => setSelectedJobData({ ...selectedJobData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-department">Department</Label>
                  <Input
                    id="edit-department"
                    value={selectedJobData.department}
                    onChange={(e) => setSelectedJobData({ ...selectedJobData, department: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={selectedJobData.location}
                    onChange={(e) => setSelectedJobData({ ...selectedJobData, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-type">Job Type</Label>
                  <Select
                    value={selectedJobData.type}
                    onValueChange={(value) => setSelectedJobData({ ...selectedJobData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-experience">Experience Required</Label>
                  <Input
                    id="edit-experience"
                    value={selectedJobData.experience}
                    onChange={(e) => setSelectedJobData({ ...selectedJobData, experience: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-salary">Salary Range</Label>
                  <Input
                    id="edit-salary"
                    value={selectedJobData.salary}
                    onChange={(e) => setSelectedJobData({ ...selectedJobData, salary: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-deadline">Application Deadline</Label>
                  <Input
                    id="edit-deadline"
                    type="date"
                    value={selectedJobData.deadline}
                    onChange={(e) => setSelectedJobData({ ...selectedJobData, deadline: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={selectedJobData.status}
                    onValueChange={(value) => setSelectedJobData({ ...selectedJobData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description">Job Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedJobData.description}
                  onChange={(e) => setSelectedJobData({ ...selectedJobData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="edit-skills">Required Skills (comma-separated)</Label>
                <Input
                  id="edit-skills"
                  value={selectedJobData.skills?.join(", ") || ""}
                  onChange={(e) => setSelectedJobData({ ...selectedJobData, skills: e.target.value.split(", ") })}
                />
              </div>

              <div>
                <Label htmlFor="edit-benefits">Benefits (comma-separated)</Label>
                <Input
                  id="edit-benefits"
                  value={selectedJobData.benefits?.join(", ") || ""}
                  onChange={(e) => setSelectedJobData({ ...selectedJobData, benefits: e.target.value.split(", ") })}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditJobOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveJob}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Candidate Management</CardTitle>
            <CardDescription>Review and manage candidate applications across all jobs.</CardDescription>
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

function JobPostingCard({ job, onView, onEdit }) {
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
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onView}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
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
