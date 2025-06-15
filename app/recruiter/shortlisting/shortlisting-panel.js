"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  Eye,
  MessageSquare,
  Calendar,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

const mockApplications = [
  {
    id: 1,
    student: {
      name: "Arjun Sharma",
      email: "arjun.sharma@college.edu",
      phone: "+91 98765 43210",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Mumbai, Maharashtra",
      college: "IIT Bombay",
      branch: "Computer Science",
      cgpa: 9.2,
      year: "Final Year",
    },
    position: "Software Engineer",
    appliedDate: "2024-01-15",
    status: "pending",
    skills: ["React", "Node.js", "Python", "AWS"],
    experience: "2 internships",
    projects: 5,
    resumeScore: 85,
    assessmentScore: 92,
    notes: "Strong technical background, excellent problem-solving skills",
  },
  {
    id: 2,
    student: {
      name: "Priya Patel",
      email: "priya.patel@college.edu",
      phone: "+91 87654 32109",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Ahmedabad, Gujarat",
      college: "NIT Surat",
      branch: "Information Technology",
      cgpa: 8.9,
      year: "Final Year",
    },
    position: "Frontend Developer",
    appliedDate: "2024-01-14",
    status: "shortlisted",
    skills: ["React", "Vue.js", "TypeScript", "CSS"],
    experience: "1 internship",
    projects: 7,
    resumeScore: 88,
    assessmentScore: 89,
    notes: "Creative designer with strong frontend skills",
  },
  {
    id: 3,
    student: {
      name: "Rahul Kumar",
      email: "rahul.kumar@college.edu",
      phone: "+91 76543 21098",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Bangalore, Karnataka",
      college: "IIIT Bangalore",
      branch: "Computer Science",
      cgpa: 9.5,
      year: "Final Year",
    },
    position: "Full Stack Developer",
    appliedDate: "2024-01-13",
    status: "rejected",
    skills: ["MERN Stack", "Docker", "Kubernetes", "GraphQL"],
    experience: "3 internships",
    projects: 8,
    resumeScore: 91,
    assessmentScore: 87,
    notes: "Overqualified for the position, better suited for senior roles",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  shortlisted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  interview: "bg-blue-100 text-blue-800",
}

export function ShortlistingPanel() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplications, setSelectedApplications] = useState([])
  const [bulkAction, setBulkAction] = useState("")

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedTab === "all") return matchesSearch
    return matchesSearch && app.status === selectedTab
  })

  const handleSelectApplication = (id) => {
    setSelectedApplications((prev) => (prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]))
  }

  const handleBulkAction = () => {
    if (bulkAction && selectedApplications.length > 0) {
      console.log(`Performing ${bulkAction} on applications:`, selectedApplications)
      // Implement bulk action logic
      setSelectedApplications([])
      setBulkAction("")
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "shortlisted":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "interview":
        return <Calendar className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Shortlisting Panel</h1>
          <p className="text-muted-foreground">Review and manage candidate applications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shortlisted</p>
                <p className="text-2xl font-bold">28</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Ready for interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">68%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Above industry average</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates by name, email, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="software-engineer">Software Engineer</SelectItem>
                  <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                  <SelectItem value="backend-developer">Backend Developer</SelectItem>
                  <SelectItem value="full-stack">Full Stack Developer</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by College" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  <SelectItem value="iit">IIT</SelectItem>
                  <SelectItem value="nit">NIT</SelectItem>
                  <SelectItem value="iiit">IIIT</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedApplications.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{selectedApplications.length} application(s) selected</p>
              <div className="flex gap-2">
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shortlist">Shortlist</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                    <SelectItem value="schedule-interview">Schedule Interview</SelectItem>
                    <SelectItem value="send-email">Send Email</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleBulkAction} disabled={!bulkAction}>
                  Apply Action
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Applications Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      checked={selectedApplications.includes(application.id)}
                      onCheckedChange={() => handleSelectApplication(application.id)}
                    />
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={application.student.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {application.student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{application.student.name}</h3>
                        <Badge className={statusColors[application.status]}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1 capitalize">{application.status}</span>
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="space-y-1">
                          <p className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {application.student.email}
                          </p>
                          <p className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {application.student.phone}
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {application.student.location}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            {application.student.college} - {application.student.branch}
                          </p>
                          <p className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            CGPA: {application.student.cgpa} | {application.student.year}
                          </p>
                          <p>
                            Applied for: <span className="font-medium">{application.position}</span>
                          </p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {application.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Scores */}
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Resume Score</p>
                          <div className="flex items-center gap-2">
                            <Progress value={application.resumeScore} className="flex-1" />
                            <span className="text-sm font-medium">{application.resumeScore}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Assessment Score</p>
                          <div className="flex items-center gap-2">
                            <Progress value={application.assessmentScore} className="flex-1" />
                            <span className="text-sm font-medium">{application.assessmentScore}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {application.notes && (
                        <div className="mt-3 p-3 bg-muted rounded-lg">
                          <p className="text-sm">{application.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Candidate Profile - {application.student.name}</DialogTitle>
                          <DialogDescription>Detailed profile and application information</DialogDescription>
                        </DialogHeader>
                        {/* Detailed profile content would go here */}
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-2">Personal Information</h4>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <strong>Email:</strong> {application.student.email}
                                </p>
                                <p>
                                  <strong>Phone:</strong> {application.student.phone}
                                </p>
                                <p>
                                  <strong>Location:</strong> {application.student.location}
                                </p>
                                <p>
                                  <strong>College:</strong> {application.student.college}
                                </p>
                                <p>
                                  <strong>Branch:</strong> {application.student.branch}
                                </p>
                                <p>
                                  <strong>CGPA:</strong> {application.student.cgpa}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Application Details</h4>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <strong>Position:</strong> {application.position}
                                </p>
                                <p>
                                  <strong>Applied Date:</strong> {application.appliedDate}
                                </p>
                                <p>
                                  <strong>Experience:</strong> {application.experience}
                                </p>
                                <p>
                                  <strong>Projects:</strong> {application.projects}
                                </p>
                                <p>
                                  <strong>Resume Score:</strong> {application.resumeScore}%
                                </p>
                                <p>
                                  <strong>Assessment Score:</strong> {application.assessmentScore}%
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="flex gap-1">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>

                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
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
