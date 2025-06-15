"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Plus,
  Search,
  Download,
  Edit,
  Trash2,
  Eye,
  Share2,
  Copy,
  Building,
  Award,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
} from "lucide-react"

const mockJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₹12-18 LPA",
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
    status: "active",
    applicants: 156,
    shortlisted: 28,
    interviewed: 12,
    hired: 2,
    description:
      "We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software solutions.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in software development",
      "Proficiency in React, Node.js, and Python",
      "Experience with cloud platforms (AWS/Azure)",
      "Strong problem-solving and communication skills",
    ],
    responsibilities: [
      "Design and develop scalable web applications",
      "Collaborate with cross-functional teams",
      "Mentor junior developers",
      "Participate in code reviews and technical discussions",
      "Contribute to architectural decisions",
    ],
    skills: ["React", "Node.js", "Python", "AWS", "MongoDB", "Docker"],
    benefits: [
      "Competitive salary and equity",
      "Health insurance for family",
      "Flexible working hours",
      "Learning and development budget",
      "Remote work options",
    ],
    companyInfo: {
      name: "TechCorp Solutions",
      logo: "/placeholder.svg?height=60&width=60",
      size: "500-1000 employees",
      industry: "Technology",
      website: "https://techcorp.com",
      description: "Leading technology company specializing in enterprise solutions",
    },
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    experience: "1-3 years",
    salary: "₹8-12 LPA",
    postedDate: "2024-01-12",
    deadline: "2024-02-10",
    status: "active",
    applicants: 89,
    shortlisted: 15,
    interviewed: 8,
    hired: 1,
    description:
      "Join our fast-growing startup as a Frontend Developer and help build amazing user experiences for our customers.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "1+ years of frontend development experience",
      "Strong skills in React and TypeScript",
      "Experience with modern CSS frameworks",
      "Understanding of responsive design principles",
    ],
    responsibilities: [
      "Develop responsive web applications",
      "Implement UI/UX designs",
      "Optimize applications for performance",
      "Work closely with backend developers",
      "Participate in agile development process",
    ],
    skills: ["React", "TypeScript", "CSS", "HTML", "JavaScript", "Tailwind CSS"],
    benefits: [
      "Equity participation",
      "Health insurance",
      "Flexible work environment",
      "Learning opportunities",
      "Team outings and events",
    ],
    companyInfo: {
      name: "StartupXYZ",
      logo: "/placeholder.svg?height=60&width=60",
      size: "50-100 employees",
      industry: "Fintech",
      website: "https://startupxyz.com",
      description: "Innovative fintech startup revolutionizing digital payments",
    },
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Enterprise Corp",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    experience: "2-4 years",
    salary: "₹10-15 LPA",
    postedDate: "2024-01-10",
    deadline: "2024-02-05",
    status: "paused",
    applicants: 203,
    shortlisted: 45,
    interviewed: 20,
    hired: 3,
    description:
      "We are seeking a talented Full Stack Developer to work on enterprise-level applications and contribute to our digital transformation initiatives.",
    requirements: [
      "Bachelor's degree in Computer Science",
      "2+ years of full-stack development experience",
      "Proficiency in MERN stack",
      "Experience with microservices architecture",
      "Knowledge of DevOps practices",
    ],
    responsibilities: [
      "Develop end-to-end web applications",
      "Design and implement APIs",
      "Work with databases and data modeling",
      "Collaborate with DevOps team",
      "Ensure code quality and best practices",
    ],
    skills: ["React", "Node.js", "MongoDB", "Express", "Docker", "Kubernetes"],
    benefits: [
      "Comprehensive health coverage",
      "Retirement savings plan",
      "Professional development budget",
      "Work-life balance initiatives",
      "Employee stock options",
    ],
    companyInfo: {
      name: "Enterprise Corp",
      logo: "/placeholder.svg?height=60&width=60",
      size: "1000+ employees",
      industry: "Enterprise Software",
      website: "https://enterprisecorp.com",
      description: "Global enterprise software company serving Fortune 500 clients",
    },
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  closed: "bg-red-100 text-red-800",
  draft: "bg-gray-100 text-gray-800",
}

export function JobDetails() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false)
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false)
  const [isEditJobOpen, setIsEditJobOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<any>(null)

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())

    switch (selectedTab) {
      case "active":
        return matchesSearch && job.status === "active"
      case "paused":
        return matchesSearch && job.status === "paused"
      case "closed":
        return matchesSearch && job.status === "closed"
      case "all":
      default:
        return matchesSearch
    }
  })

  const totalApplications = mockJobs.reduce((sum, job) => sum + job.applicants, 0)
  const totalShortlisted = mockJobs.reduce((sum, job) => sum + job.shortlisted, 0)
  const totalHired = mockJobs.reduce((sum, job) => sum + job.hired, 0)
  const activeJobs = mockJobs.filter((job) => job.status === "active").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Job Management</h1>
          <p className="text-muted-foreground">Manage job postings and track applications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isCreateJobOpen} onOpenChange={setIsCreateJobOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Job Posting</DialogTitle>
                <DialogDescription>Fill in the details to create a new job posting</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input placeholder="e.g. Senior Software Engineer" />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="techcorp">TechCorp Solutions</SelectItem>
                          <SelectItem value="startupxyz">StartupXYZ</SelectItem>
                          <SelectItem value="enterprise">Enterprise Corp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input placeholder="e.g. Bangalore, Karnataka" />
                    </div>
                    <div>
                      <Label htmlFor="type">Job Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salary">Salary Range</Label>
                      <Input placeholder="e.g. ₹12-18 LPA" />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input type="date" />
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Job Description</h3>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea placeholder="Provide a detailed job description..." className="min-h-[100px]" />
                  </div>
                  <div>
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea placeholder="List the job requirements..." className="min-h-[80px]" />
                  </div>
                  <div>
                    <Label htmlFor="responsibilities">Responsibilities</Label>
                    <Textarea placeholder="List the key responsibilities..." className="min-h-[80px]" />
                  </div>
                </div>

                {/* Skills and Benefits */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="skills">Required Skills</Label>
                    <Textarea placeholder="List required skills (comma separated)" />
                  </div>
                  <div>
                    <Label htmlFor="benefits">Benefits</Label>
                    <Textarea placeholder="List job benefits..." />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateJobOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button onClick={() => setIsCreateJobOpen(false)}>Publish Job</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <p className="text-2xl font-bold">{activeJobs}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Currently hiring</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-bold">{totalApplications}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Across all jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shortlisted</p>
                <p className="text-2xl font-bold">{totalShortlisted}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round((totalShortlisted / totalApplications) * 100)}% of applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hired</p>
                <p className="text-2xl font-bold">{totalHired}</p>
              </div>
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round((totalHired / totalApplications) * 100)}% success rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Building className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <Badge className={statusColors[job.status]}>
                          {job.status === "active" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {job.status === "paused" && <AlertCircle className="h-3 w-3 mr-1" />}
                          {job.status === "closed" && <XCircle className="h-3 w-3 mr-1" />}
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                        <div className="space-y-2">
                          <p className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            {job.company}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {job.type} • {job.experience}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Posted: {job.postedDate}
                          </p>
                          <p className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Deadline: {job.deadline}
                          </p>
                        </div>
                      </div>

                      {/* Application Stats */}
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{job.applicants}</p>
                          <p className="text-xs text-blue-600">Applications</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{job.shortlisted}</p>
                          <p className="text-xs text-green-600">Shortlisted</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">{job.interviewed}</p>
                          <p className="text-xs text-purple-600">Interviewed</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <p className="text-2xl font-bold text-orange-600">{job.hired}</p>
                          <p className="text-xs text-orange-600">Hired</p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Description Preview */}
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedJob(job)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {selectedJob?.title}
                            <Badge className={statusColors[selectedJob?.status]}>
                              {selectedJob?.status}
                            </Badge>
                          </DialogTitle>
                          <DialogDescription>
                            {selectedJob?.company} • {selectedJob?.location}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedJob && (
                          <div className="space-y-6">
                            {/* Company Info */}
                            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                                <Building className="h-8 w-8 text-muted-foreground" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">{selectedJob.companyInfo.name}</h3>
                                <p className="text-muted-foreground">
                                  {selectedJob.companyInfo.industry} • {selectedJob.companyInfo.size}
                                </p>
                                <p className="text-sm text-muted-foreground">{selectedJob.companyInfo.description}</p>
                              </div>
                            </div>

                            {/* Job Details */}
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3">Job Information</h4>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <strong>Type:</strong> {selectedJob.type}
                                  </p>
                                  <p>
                                    <strong>Experience:</strong> {selectedJob.experience}
                                  </p>
                                  <p>
                                    <strong>Salary:</strong> {selectedJob.salary}
                                  </p>
                                  <p>
                                    <strong>Location:</strong> {selectedJob.location}
                                  </p>
                                  <p>
                                    <strong>Posted:</strong> {selectedJob.postedDate}
                                  </p>
                                  <p>
                                    <strong>Deadline:</strong> {selectedJob.deadline}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3">Application Stats</h4>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Applications</span>
                                      <span>{selectedJob.applicants}</span>
                                    </div>
                                    <Progress value={100} />
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Shortlisted</span>
                                      <span>{selectedJob.shortlisted}</span>
                                    </div>
                                    <Progress value={(selectedJob.shortlisted / selectedJob.applicants) * 100} />
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Interviewed</span>
                                      <span>{selectedJob.interviewed}</span>
                                    </div>
                                    <Progress value={(selectedJob.interviewed / selectedJob.applicants) * 100} />
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Hired</span>
                                      <span>{selectedJob.hired}</span>
                                    </div>
                                    <Progress value={(selectedJob.hired / selectedJob.applicants) * 100} />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <div>
                              <h4 className="font-semibold mb-3">Job Description</h4>
                              <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
                            </div>

                            {/* Requirements and Responsibilities */}
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3">Requirements</h4>
                                <ul className="space-y-2">
                                  {selectedJob.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3">Responsibilities</h4>
                                <ul className="space-y-2">
                                  {selectedJob.responsibilities.map((resp, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                      <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Skills and Benefits */}
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3">Required Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedJob.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3">Benefits</h4>
                                <ul className="space-y-1">
                                  {selectedJob.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                      <Star className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                      <span>{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isEditJobOpen} onOpenChange={setIsEditJobOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingJob(job)
                            setIsEditJobOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Job Posting</DialogTitle>
                          <DialogDescription>Update the job posting details for {editingJob?.title}</DialogDescription>
                        </DialogHeader>
                        {editingJob && (
                          <div className="space-y-6">
                            <Tabs defaultValue="basic" className="w-full">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                                <TabsTrigger value="company">Company</TabsTrigger>
                              </TabsList>

                              <TabsContent value="basic" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="edit-title">Job Title</Label>
                                    <Input
                                      id="edit-title"
                                      defaultValue={editingJob.title}
                                      placeholder="e.g. Senior Software Engineer"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-company">Company</Label>
                                    <Input
                                      id="edit-company"
                                      defaultValue={editingJob.company}
                                      placeholder="Company name"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <Label htmlFor="edit-location">Location</Label>
                                    <Input
                                      id="edit-location"
                                      defaultValue={editingJob.location}
                                      placeholder="e.g. Bangalore, Karnataka"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-type">Job Type</Label>
                                    <Select defaultValue={editingJob.type.toLowerCase().replace("-", "")}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="fulltime">Full-time</SelectItem>
                                        <SelectItem value="parttime">Part-time</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                        <SelectItem value="internship">Internship</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-experience">Experience</Label>
                                    <Select defaultValue={editingJob.experience}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="0-1 years">0-1 years</SelectItem>
                                        <SelectItem value="1-3 years">1-3 years</SelectItem>
                                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                                        <SelectItem value="5+ years">5+ years</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <Label htmlFor="edit-salary">Salary Range</Label>
                                    <Input
                                      id="edit-salary"
                                      defaultValue={editingJob.salary}
                                      placeholder="e.g. ₹12-18 LPA"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-posted">Posted Date</Label>
                                    <Input id="edit-posted" type="date" defaultValue={editingJob.postedDate} />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-deadline">Application Deadline</Label>
                                    <Input id="edit-deadline" type="date" defaultValue={editingJob.deadline} />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select defaultValue={editingJob.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="paused">Paused</SelectItem>
                                      <SelectItem value="closed">Closed</SelectItem>
                                      <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </TabsContent>

                              <TabsContent value="description" className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-description">Job Description</Label>
                                  <Textarea
                                    id="edit-description"
                                    defaultValue={editingJob.description}
                                    placeholder="Provide a detailed job description..."
                                    className="min-h-[120px]"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-skills">Required Skills</Label>
                                  <Textarea
                                    id="edit-skills"
                                    defaultValue={editingJob.skills.join(", ")}
                                    placeholder="List required skills (comma separated)"
                                    className="min-h-[80px]"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-benefits">Benefits</Label>
                                  <Textarea
                                    id="edit-benefits"
                                    defaultValue={editingJob.benefits.join("\n")}
                                    placeholder="List job benefits..."
                                    className="min-h-[100px]"
                                  />
                                </div>
                              </TabsContent>

                              <TabsContent value="requirements" className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-requirements">Job Requirements</Label>
                                  <Textarea
                                    id="edit-requirements"
                                    defaultValue={editingJob.requirements.join("\n")}
                                    placeholder="List the job requirements..."
                                    className="min-h-[120px]"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-responsibilities">Key Responsibilities</Label>
                                  <Textarea
                                    id="edit-responsibilities"
                                    defaultValue={editingJob.responsibilities.join("\n")}
                                    placeholder="List the key responsibilities..."
                                    className="min-h-[120px]"
                                  />
                                </div>
                              </TabsContent>

                              <TabsContent value="company" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="edit-company-name">Company Name</Label>
                                    <Input
                                      id="edit-company-name"
                                      defaultValue={editingJob.companyInfo.name}
                                      placeholder="Company name"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-industry">Industry</Label>
                                    <Input
                                      id="edit-industry"
                                      defaultValue={editingJob.companyInfo.industry}
                                      placeholder="e.g. Technology"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="edit-company-size">Company Size</Label>
                                    <Select defaultValue={editingJob.companyInfo.size}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="1-10 employees">1-10 employees</SelectItem>
                                        <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                                        <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                                        <SelectItem value="201-500 employees">201-500 employees</SelectItem>
                                        <SelectItem value="501-1000 employees">501-1000 employees</SelectItem>
                                        <SelectItem value="1000+ employees">1000+ employees</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-website">Company Website</Label>
                                    <Input
                                      id="edit-website"
                                      defaultValue={editingJob.companyInfo.website}
                                      placeholder="https://company.com"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="edit-company-description">Company Description</Label>
                                  <Textarea
                                    id="edit-company-description"
                                    defaultValue={editingJob.companyInfo.description}
                                    placeholder="Brief description of the company..."
                                    className="min-h-[80px]"
                                  />
                                </div>
                              </TabsContent>
                            </Tabs>

                            <div className="flex justify-end gap-2 pt-4 border-t">
                              <Button variant="outline" onClick={() => setIsEditJobOpen(false)}>
                                Cancel
                              </Button>
                              <Button variant="outline">Save as Draft</Button>
                              <Button
                                onClick={() => {
                                  // Handle save logic here
                                  console.log("Saving job changes...")
                                  setIsEditJobOpen(false)
                                }}
                              >
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>

                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>

                    {job.status === "active" ? (
                      <Button variant="outline" size="sm" className="text-yellow-600">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Activate
                      </Button>
                    )}

                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
