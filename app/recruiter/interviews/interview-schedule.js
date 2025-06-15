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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  CalendarIcon,
  Clock,
  Video,
  MapPin,
  Users,
  Plus,
  Search,
  Download,
  Mail,
  Phone,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  User,
  Building,
  FileText,
  LinkIcon,
} from "lucide-react"
import { format } from "date-fns"

const mockInterviews = [
  {
    id: 1,
    candidate: {
      name: "Arjun Sharma",
      email: "arjun.sharma@college.edu",
      phone: "+91 98765 43210",
      avatar: "/placeholder.svg?height=40&width=40",
      college: "IIT Bombay",
      branch: "Computer Science",
    },
    position: "Software Engineer",
    date: "2024-01-20",
    time: "10:00 AM",
    duration: 60,
    type: "video",
    status: "scheduled",
    interviewer: "John Smith",
    interviewerEmail: "john.smith@company.com",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    location: "Conference Room A",
    round: "Technical Round 1",
    notes: "Focus on data structures and algorithms",
    preparation: ["Resume review", "Coding assessment", "System design basics"],
  },
  {
    id: 2,
    candidate: {
      name: "Priya Patel",
      email: "priya.patel@college.edu",
      phone: "+91 87654 32109",
      avatar: "/placeholder.svg?height=40&width=40",
      college: "NIT Surat",
      branch: "Information Technology",
    },
    position: "Frontend Developer",
    date: "2024-01-20",
    time: "2:00 PM",
    duration: 45,
    type: "in-person",
    status: "confirmed",
    interviewer: "Sarah Johnson",
    interviewerEmail: "sarah.johnson@company.com",
    meetingLink: null,
    location: "Office - Floor 3, Room 301",
    round: "HR Round",
    notes: "Cultural fit assessment",
    preparation: ["Company overview", "Role expectations", "Behavioral questions"],
  },
  {
    id: 3,
    candidate: {
      name: "Rahul Kumar",
      email: "rahul.kumar@college.edu",
      phone: "+91 76543 21098",
      avatar: "/placeholder.svg?height=40&width=40",
      college: "IIIT Bangalore",
      branch: "Computer Science",
    },
    position: "Full Stack Developer",
    date: "2024-01-21",
    time: "11:30 AM",
    duration: 90,
    type: "video",
    status: "pending",
    interviewer: "Mike Chen",
    interviewerEmail: "mike.chen@company.com",
    meetingLink: "https://zoom.us/j/123456789",
    location: null,
    round: "Final Round",
    notes: "System design and leadership discussion",
    preparation: ["Portfolio review", "System architecture", "Team collaboration"],
  },
]

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
}

const typeIcons = {
  video: Video,
  "in-person": MapPin,
  phone: Phone,
}

export function InterviewSchedule() {
  const [selectedTab, setSelectedTab] = useState("upcoming")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState()
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingInterview, setEditingInterview] = useState(null)
  const [editDate, setEditDate] = useState()

  const filteredInterviews = mockInterviews.filter((interview) => {
    const matchesSearch =
      interview.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase())

    const today = new Date()
    const interviewDate = new Date(interview.date)

    switch (selectedTab) {
      case "upcoming":
        return matchesSearch && interviewDate >= today && interview.status !== "completed"
      case "today":
        return matchesSearch && interviewDate.toDateString() === today.toDateString()
      case "completed":
        return matchesSearch && interview.status === "completed"
      case "all":
      default:
        return matchesSearch
    }
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "scheduled":
        return <CalendarIcon className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }

  const handleEditInterview = (interview) => {
    setEditingInterview(interview)
    setEditDate(new Date(interview.date))
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    // Here you would typically update the interview data
    console.log("Saving interview changes:", editingInterview)
    setIsEditDialogOpen(false)
    setEditingInterview(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Interview Schedule</h1>
          <p className="text-muted-foreground">Manage and track all candidate interviews</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Schedule
          </Button>
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Interview</DialogTitle>
                <DialogDescription>Create a new interview appointment for a candidate</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="candidate">Candidate</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select candidate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arjun">Arjun Sharma</SelectItem>
                        <SelectItem value="priya">Priya Patel</SelectItem>
                        <SelectItem value="rahul">Rahul Kumar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software-engineer">Software Engineer</SelectItem>
                        <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                        <SelectItem value="full-stack">Full Stack Developer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="14:00">02:00 PM</SelectItem>
                        <SelectItem value="15:00">03:00 PM</SelectItem>
                        <SelectItem value="16:00">04:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Interview Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="interviewer">Interviewer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="round">Interview Round</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select round" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="screening">Initial Screening</SelectItem>
                      <SelectItem value="technical-1">Technical Round 1</SelectItem>
                      <SelectItem value="technical-2">Technical Round 2</SelectItem>
                      <SelectItem value="hr">HR Round</SelectItem>
                      <SelectItem value="final">Final Round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea placeholder="Add any special instructions or notes..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsScheduleDialogOpen(false)}>Schedule Interview</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Edit Interview Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Interview</DialogTitle>
            <DialogDescription>Update interview details for {editingInterview?.candidate.name}</DialogDescription>
          </DialogHeader>
          {editingInterview && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-candidate">Candidate</Label>
                  <Input value={editingInterview.candidate.name} disabled />
                </div>
                <div>
                  <Label htmlFor="edit-position">Position</Label>
                  <Input
                    value={editingInterview.position}
                    onChange={(e) => setEditingInterview({ ...editingInterview, position: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editDate ? format(editDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={editDate}
                        onSelect={(date) => {
                          setEditDate(date)
                          if (date) {
                            setEditingInterview({ ...editingInterview, date: format(date, "yyyy-MM-dd") })
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="edit-time">Time</Label>
                  <Select
                    value={editingInterview.time}
                    onValueChange={(value) => setEditingInterview({ ...editingInterview, time: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                      <SelectItem value="2:00 PM">02:00 PM</SelectItem>
                      <SelectItem value="3:00 PM">03:00 PM</SelectItem>
                      <SelectItem value="4:00 PM">04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-duration">Duration (minutes)</Label>
                  <Select
                    value={editingInterview.duration.toString()}
                    onValueChange={(value) =>
                      setEditingInterview({ ...editingInterview, duration: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-type">Interview Type</Label>
                  <Select
                    value={editingInterview.type}
                    onValueChange={(value) => setEditingInterview({ ...editingInterview, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-interviewer">Interviewer</Label>
                  <Select
                    value={editingInterview.interviewer}
                    onValueChange={(value) => setEditingInterview({ ...editingInterview, interviewer: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select interviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Smith">John Smith</SelectItem>
                      <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingInterview.status}
                    onValueChange={(value) => setEditingInterview({ ...editingInterview, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-round">Interview Round</Label>
                <Select
                  value={editingInterview.round}
                  onValueChange={(value) => setEditingInterview({ ...editingInterview, round: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select round" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Initial Screening">Initial Screening</SelectItem>
                    <SelectItem value="Technical Round 1">Technical Round 1</SelectItem>
                    <SelectItem value="Technical Round 2">Technical Round 2</SelectItem>
                    <SelectItem value="HR Round">HR Round</SelectItem>
                    <SelectItem value="Final Round">Final Round</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {editingInterview.type === "video" && (
                <div>
                  <Label htmlFor="edit-meeting-link">Meeting Link</Label>
                  <Input
                    value={editingInterview.meetingLink || ""}
                    onChange={(e) => setEditingInterview({ ...editingInterview, meetingLink: e.target.value })}
                    placeholder="Enter meeting link"
                  />
                </div>
              )}
              {editingInterview.type === "in-person" && (
                <div>
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    value={editingInterview.location || ""}
                    onChange={(e) => setEditingInterview({ ...editingInterview, location: e.target.value })}
                    placeholder="Enter location"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  value={editingInterview.notes || ""}
                  onChange={(e) => setEditingInterview({ ...editingInterview, notes: e.target.value })}
                  placeholder="Add any special instructions or notes..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Interviews</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">2 confirmed, 3 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">18</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">12 scheduled, 6 completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">72%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Above target of 65%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Duration</p>
                <p className="text-2xl font-bold">58m</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Within planned time</p>
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
                  placeholder="Search by candidate name, position, or interviewer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredInterviews.map((interview) => {
            const TypeIcon = typeIcons[interview.type]
            return (
              <Card key={interview.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={interview.candidate.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {interview.candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{interview.candidate.name}</h3>
                          <Badge className={statusColors[interview.status]}>
                            {getStatusIcon(interview.status)}
                            <span className="ml-1 capitalize">{interview.status}</span>
                          </Badge>
                          <Badge variant="outline">
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {interview.type.replace("-", " ")}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                          <div className="space-y-2">
                            <p className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4" />
                              {format(new Date(interview.date), "PPP")} at {interview.time}
                            </p>
                            <p className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Duration: {interview.duration} minutes
                            </p>
                            <p className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              Position: {interview.position}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Interviewer: {interview.interviewer}
                            </p>
                            <p className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Round: {interview.round}
                            </p>
                            {interview.type === "video" && interview.meetingLink && (
                              <p className="flex items-center gap-2">
                                <LinkIcon className="h-4 w-4" />
                                <a
                                  href={interview.meetingLink}
                                  className="text-blue-600 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Join Meeting
                                </a>
                              </p>
                            )}
                            {interview.type === "in-person" && interview.location && (
                              <p className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {interview.location}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Preparation Items */}
                        {interview.preparation && interview.preparation.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Preparation Checklist:</p>
                            <div className="flex flex-wrap gap-1">
                              {interview.preparation.map((item, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {interview.notes && (
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-sm">
                              <strong>Notes:</strong> {interview.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleEditInterview(interview)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Reminder
                      </Button>
                      {interview.type === "video" && interview.meetingLink && (
                        <Button size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Join Now
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
