"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Star,
  Search,
  Eye,
  Download,
  MessageSquare,
  Calendar,
  Award,
  Code,
  Briefcase,
  Heart,
} from "lucide-react"

const candidates = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+91 9876543210",
    avatar: "/placeholder.svg?height=80&width=80",
    degree: "B.Tech Computer Science",
    college: "IIT Delhi",
    cgpa: 8.9,
    graduationYear: 2024,
    location: "Delhi, India",
    experience: "Fresher",
    skills: ["React", "Node.js", "Python", "MongoDB", "AWS"],
    projects: 5,
    certifications: 3,
    internships: 2,
    status: "Available",
    profileStrength: 92,
    lastActive: "2 hours ago",
    appliedPositions: ["Software Engineer", "Full Stack Developer"],
    preferredRoles: ["Frontend Developer", "Full Stack Developer"],
    expectedSalary: "₹8-12 LPA",
    noticePeriod: "Immediate",
    achievements: ["Dean's List", "Hackathon Winner", "Open Source Contributor"],
    languages: ["English", "Hindi"],
    isShortlisted: false,
    rating: 4.8,
    resumeUrl: "/resume/alice-johnson.pdf",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+91 9876543211",
    avatar: "/placeholder.svg?height=80&width=80",
    degree: "B.Tech Information Technology",
    college: "NIT Trichy",
    cgpa: 8.5,
    graduationYear: 2024,
    location: "Chennai, India",
    experience: "6 months",
    skills: ["Java", "Spring Boot", "MySQL", "Docker", "Kubernetes"],
    projects: 4,
    certifications: 2,
    internships: 1,
    status: "Available",
    profileStrength: 85,
    lastActive: "1 day ago",
    appliedPositions: ["Backend Developer", "Java Developer"],
    preferredRoles: ["Backend Developer", "DevOps Engineer"],
    expectedSalary: "₹6-10 LPA",
    noticePeriod: "1 month",
    achievements: ["Top 10% in Class", "Technical Lead in Project"],
    languages: ["English", "Tamil"],
    isShortlisted: true,
    rating: 4.6,
    resumeUrl: "/resume/bob-smith.pdf",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+91 9876543212",
    avatar: "/placeholder.svg?height=80&width=80",
    degree: "B.Tech Electronics & Communication",
    college: "BITS Pilani",
    cgpa: 9.2,
    graduationYear: 2024,
    location: "Bangalore, India",
    experience: "Fresher",
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL"],
    projects: 6,
    certifications: 4,
    internships: 2,
    status: "Available",
    profileStrength: 95,
    lastActive: "30 minutes ago",
    appliedPositions: ["Data Scientist", "ML Engineer"],
    preferredRoles: ["Data Scientist", "AI/ML Engineer"],
    expectedSalary: "₹10-15 LPA",
    noticePeriod: "Immediate",
    achievements: ["Research Paper Published", "ML Competition Winner", "Gold Medalist"],
    languages: ["English", "Hindi", "Kannada"],
    isShortlisted: false,
    rating: 4.9,
    resumeUrl: "/resume/carol-davis.pdf",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+91 9876543213",
    avatar: "/placeholder.svg?height=80&width=80",
    degree: "B.Tech Mechanical Engineering",
    college: "IIT Bombay",
    cgpa: 8.1,
    graduationYear: 2024,
    location: "Mumbai, India",
    experience: "Fresher",
    skills: ["AutoCAD", "SolidWorks", "MATLAB", "Python", "Project Management"],
    projects: 3,
    certifications: 2,
    internships: 1,
    status: "Available",
    profileStrength: 78,
    lastActive: "3 hours ago",
    appliedPositions: ["Design Engineer", "Product Engineer"],
    preferredRoles: ["Mechanical Engineer", "Design Engineer"],
    expectedSalary: "₹5-8 LPA",
    noticePeriod: "Immediate",
    achievements: ["Best Project Award", "Industry Internship"],
    languages: ["English", "Hindi", "Marathi"],
    isShortlisted: false,
    rating: 4.4,
    resumeUrl: "/resume/david-wilson.pdf",
  },
]

const departments = [
  "All",
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
]
const colleges = ["All", "IIT Delhi", "IIT Bombay", "NIT Trichy", "BITS Pilani", "VIT", "SRM"]
const experiences = ["All", "Fresher", "0-1 years", "1-2 years", "2+ years"]

export function CandidateProfiles() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedCollege, setSelectedCollege] = useState("All")
  const [selectedExperience, setSelectedExperience] = useState("All")
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [shortlistedCandidates, setShortlistedCandidates] = useState([2])

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDepartment = selectedDepartment === "All" || candidate.degree.includes(selectedDepartment)
    const matchesCollege = selectedCollege === "All" || candidate.college === selectedCollege
    const matchesExperience = selectedExperience === "All" || candidate.experience === selectedExperience
    return matchesSearch && matchesDepartment && matchesCollege && matchesExperience
  })

  const toggleShortlist = (candidateId) => {
    setShortlistedCandidates((prev) =>
      prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId],
    )
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "unavailable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProfileStrengthColor = (strength) => {
    if (strength >= 90) return "text-green-600"
    if (strength >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidate Profiles</h1>
          <p className="text-muted-foreground">Browse and manage candidate profiles</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Heart className="mr-2 h-4 w-4" />
            Shortlisted ({shortlistedCandidates.length})
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Profiles
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates by name or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedCollege} onValueChange={setSelectedCollege}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="College" />
          </SelectTrigger>
          <SelectContent>
            {colleges.map((college) => (
              <SelectItem key={college} value={college}>
                {college}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedExperience} onValueChange={setSelectedExperience}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            {experiences.map((exp) => (
              <SelectItem key={exp} value={exp}>
                {exp}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Candidates</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
          <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
          <TabsTrigger value="recent">Recently Active</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{candidate.name}</CardTitle>
                        <CardDescription>{candidate.degree}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => toggleShortlist(candidate.id)} className="p-2">
                      <Heart
                        className={`h-4 w-4 ${
                          shortlistedCandidates.includes(candidate.id)
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.college}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>CGPA: {candidate.cgpa}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{candidate.experience}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{candidate.rating}</span>
                    </div>
                    <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profile Strength</span>
                      <span className={getProfileStrengthColor(candidate.profileStrength)}>
                        {candidate.profileStrength}%
                      </span>
                    </div>
                    <Progress value={candidate.profileStrength} className="h-2" />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Top Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{candidate.skills.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="font-medium">{candidate.projects}</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div>
                      <div className="font-medium">{candidate.certifications}</div>
                      <div className="text-xs text-muted-foreground">Certificates</div>
                    </div>
                    <div>
                      <div className="font-medium">{candidate.internships}</div>
                      <div className="text-xs text-muted-foreground">Internships</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Button size="sm" className="flex-1" onClick={() => setSelectedCandidate(candidate)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shortlisted">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {candidates
              .filter((candidate) => shortlistedCandidates.includes(candidate.id))
              .map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-lg transition-shadow border-red-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{candidate.name}</CardTitle>
                          <CardDescription>{candidate.degree}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-red-100 text-red-800">Shortlisted</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Expected Salary:</span>
                        <span className="font-medium">{candidate.expectedSalary}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Notice Period:</span>
                        <span className="font-medium">{candidate.noticePeriod}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Button size="sm" className="flex-1">
                        Schedule Interview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="top-rated">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {candidates
              .filter((candidate) => candidate.rating >= 4.5)
              .sort((a, b) => b.rating - a.rating)
              .map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-lg transition-shadow border-yellow-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{candidate.name}</CardTitle>
                          <CardDescription>{candidate.degree}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{candidate.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Achievements</h4>
                      <div className="space-y-1">
                        {candidate.achievements.slice(0, 3).map((achievement) => (
                          <div key={achievement} className="flex items-center space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      View Full Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {candidates
              .sort((a, b) => {
                const timeA = a.lastActive.includes("minutes") ? 0 : a.lastActive.includes("hour") ? 1 : 2
                const timeB = b.lastActive.includes("minutes") ? 0 : b.lastActive.includes("hour") ? 1 : 2
                return timeA - timeB
              })
              .map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{candidate.name}</CardTitle>
                          <CardDescription>{candidate.degree}</CardDescription>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">Active {candidate.lastActive}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Recent Activity:</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs">Updated profile</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs">Applied to new positions</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Candidate Details Dialog */}
      {selectedCandidate && (
        <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedCandidate.avatar || "/placeholder.svg"} alt={selectedCandidate.name} />
                  <AvatarFallback>
                    {selectedCandidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-2xl">{selectedCandidate.name}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {selectedCandidate.degree} • {selectedCandidate.college}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span>{selectedCandidate.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Experience:</span>
                          <span>{selectedCandidate.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Expected Salary:</span>
                          <span>{selectedCandidate.expectedSalary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Notice Period:</span>
                          <span>{selectedCandidate.noticePeriod}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Preferred Roles</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.preferredRoles.map((role) => (
                          <Badge key={role} variant="secondary">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Profile Statistics</h4>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{selectedCandidate.projects}</div>
                          <div className="text-xs text-muted-foreground">Projects</div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{selectedCandidate.certifications}</div>
                          <div className="text-xs text-muted-foreground">Certificates</div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{selectedCandidate.internships}</div>
                          <div className="text-xs text-muted-foreground">Internships</div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{selectedCandidate.rating}</div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.languages.map((language) => (
                          <Badge key={language} variant="outline">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Achievements</h4>
                  <div className="space-y-2">
                    {selectedCandidate.achievements.map((achievement) => (
                      <div key={achievement} className="flex items-center space-x-2 text-sm">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="education">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <GraduationCap className="h-8 w-8 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium">{selectedCandidate.degree}</h4>
                          <p className="text-sm text-muted-foreground">{selectedCandidate.college}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span>
                              CGPA: <span className="font-medium">{selectedCandidate.cgpa}</span>
                            </span>
                            <span>
                              Graduation: <span className="font-medium">{selectedCandidate.graduationYear}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="skills">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="projects">
                <div className="text-center py-8">
                  <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Project Portfolio</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedCandidate.projects} projects available for review
                  </p>
                  <Button variant="outline">View Projects</Button>
                </div>
              </TabsContent>

              <TabsContent value="contact">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-muted-foreground">Email</div>
                            <div className="font-medium">{selectedCandidate.email}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="text-sm text-muted-foreground">Phone</div>
                            <div className="font-medium">{selectedCandidate.phone}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => toggleShortlist(selectedCandidate.id)}>
                <Heart
                  className={`mr-2 h-4 w-4 ${
                    shortlistedCandidates.includes(selectedCandidate.id) ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {shortlistedCandidates.includes(selectedCandidate.id) ? "Remove from Shortlist" : "Add to Shortlist"}
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
