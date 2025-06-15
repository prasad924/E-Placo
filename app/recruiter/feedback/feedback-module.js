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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Send,
  Search,
  Download,
  Calendar,
  User,
  Building,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Lightbulb,
} from "lucide-react"

const mockFeedbacks = [
  {
    id: 1,
    candidate: {
      name: "Arjun Sharma",
      email: "arjun.sharma@college.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      college: "IIT Bombay",
      branch: "Computer Science",
    },
    position: "Software Engineer",
    interviewer: "John Smith",
    interviewDate: "2024-01-18",
    round: "Technical Round 1",
    status: "completed",
    overallRating: 4,
    technicalSkills: 4,
    communication: 5,
    problemSolving: 4,
    culturalFit: 4,
    recommendation: "hire",
    strengths: ["Strong problem-solving skills", "Excellent communication", "Good understanding of algorithms"],
    improvements: ["Could improve system design knowledge", "More practice with advanced data structures"],
    detailedFeedback:
      "Candidate showed excellent problem-solving abilities and communicated solutions clearly. Demonstrated strong fundamentals in data structures and algorithms. Needs some work on system design concepts for senior roles.",
    nextSteps: "Proceed to HR round",
    interviewDuration: 60,
    questionsAsked: 5,
    questionsAnswered: 4,
  },
  {
    id: 2,
    candidate: {
      name: "Priya Patel",
      email: "priya.patel@college.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      college: "NIT Surat",
      branch: "Information Technology",
    },
    position: "Frontend Developer",
    interviewer: "Sarah Johnson",
    interviewDate: "2024-01-17",
    round: "HR Round",
    status: "completed",
    overallRating: 5,
    technicalSkills: 4,
    communication: 5,
    problemSolving: 4,
    culturalFit: 5,
    recommendation: "hire",
    strengths: ["Excellent cultural fit", "Strong communication skills", "Passionate about frontend development"],
    improvements: ["Could expand backend knowledge", "More experience with testing frameworks"],
    detailedFeedback:
      "Outstanding candidate with great enthusiasm and cultural alignment. Shows strong passion for frontend development and has excellent interpersonal skills. Would be a great addition to the team.",
    nextSteps: "Extend offer",
    interviewDuration: 45,
    questionsAsked: 8,
    questionsAnswered: 8,
  },
  {
    id: 3,
    candidate: {
      name: "Rahul Kumar",
      email: "rahul.kumar@college.edu",
      avatar: "/placeholder.svg?height=40&width=40",
      college: "IIIT Bangalore",
      branch: "Computer Science",
    },
    position: "Full Stack Developer",
    interviewer: "Mike Chen",
    interviewDate: "2024-01-16",
    round: "Technical Round 2",
    status: "pending",
    overallRating: 3,
    technicalSkills: 3,
    communication: 4,
    problemSolving: 3,
    culturalFit: 4,
    recommendation: "maybe",
    strengths: ["Good communication", "Eager to learn", "Basic understanding of full-stack concepts"],
    improvements: ["Needs more hands-on experience", "Should strengthen backend skills", "Practice system design"],
    detailedFeedback:
      "Candidate shows potential but needs more practical experience. Has good theoretical knowledge but struggles with implementation. With proper mentoring, could develop into a strong developer.",
    nextSteps: "Additional technical assessment recommended",
    interviewDuration: 75,
    questionsAsked: 6,
    questionsAnswered: 4,
  },
]

const ratingColors = {
  1: "text-red-500",
  2: "text-orange-500",
  3: "text-yellow-500",
  4: "text-blue-500",
  5: "text-green-500",
}

const recommendationColors = {
  hire: "bg-green-100 text-green-800",
  maybe: "bg-yellow-100 text-yellow-800",
  reject: "bg-red-100 text-red-800",
}

export function FeedbackModule() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(null)

  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingFeedback, setEditingFeedback] = useState(null)

  const handleEditFeedback = (feedback) => {
    setEditingFeedback(feedback)
    setShowEditDialog(true)
  }

  const filteredFeedbacks = mockFeedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.interviewer.toLowerCase().includes(searchTerm.toLowerCase())

    switch (selectedTab) {
      case "pending":
        return matchesSearch && feedback.status === "pending"
      case "completed":
        return matchesSearch && feedback.status === "completed"
      case "hire":
        return matchesSearch && feedback.recommendation === "hire"
      case "all":
      default:
        return matchesSearch
    }
  })

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-current text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const averageRating = mockFeedbacks.reduce((sum, feedback) => sum + feedback.overallRating, 0) / mockFeedbacks.length
  const hireRecommendations = mockFeedbacks.filter((f) => f.recommendation === "hire").length
  const completedFeedbacks = mockFeedbacks.filter((f) => f.status === "completed").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Interview Feedback</h1>
          <p className="text-muted-foreground">Review and manage candidate interview feedback</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Feedback
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Interview Feedback Form</DialogTitle>
                <DialogDescription>Provide detailed feedback for the candidate interview</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {/* Basic Information */}
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
                    <Label htmlFor="duration">Interview Duration (minutes)</Label>
                    <Input type="number" placeholder="60" />
                  </div>
                </div>

                {/* Ratings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Ratings</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label>Technical Skills</Label>
                      <RadioGroup defaultValue="4" className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <div key={rating} className="flex items-center space-x-1">
                            <RadioGroupItem value={rating.toString()} id={`technical-${rating}`} />
                            <Label htmlFor={`technical-${rating}`} className="text-sm">
                              {rating}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div>
                      <Label>Communication</Label>
                      <RadioGroup defaultValue="4" className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <div key={rating} className="flex items-center space-x-1">
                            <RadioGroupItem value={rating.toString()} id={`communication-${rating}`} />
                            <Label htmlFor={`communication-${rating}`} className="text-sm">
                              {rating}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div>
                      <Label>Problem Solving</Label>
                      <RadioGroup defaultValue="4" className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <div key={rating} className="flex items-center space-x-1">
                            <RadioGroupItem value={rating.toString()} id={`problem-${rating}`} />
                            <Label htmlFor={`problem-${rating}`} className="text-sm">
                              {rating}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div>
                      <Label>Cultural Fit</Label>
                      <RadioGroup defaultValue="4" className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <div key={rating} className="flex items-center space-x-1">
                            <RadioGroupItem value={rating.toString()} id={`cultural-${rating}`} />
                            <Label htmlFor={`cultural-${rating}`} className="text-sm">
                              {rating}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div>
                  <Label>Overall Recommendation</Label>
                  <RadioGroup defaultValue="hire" className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hire" id="hire" />
                      <Label htmlFor="hire" className="text-green-600 font-medium">
                        Hire
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="maybe" />
                      <Label htmlFor="maybe" className="text-yellow-600 font-medium">
                        Maybe
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reject" id="reject" />
                      <Label htmlFor="reject" className="text-red-600 font-medium">
                        Reject
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Detailed Feedback */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="strengths">Key Strengths</Label>
                    <Textarea placeholder="List the candidate's key strengths..." />
                  </div>
                  <div>
                    <Label htmlFor="improvements">Areas for Improvement</Label>
                    <Textarea placeholder="Areas where the candidate could improve..." />
                  </div>
                  <div>
                    <Label htmlFor="detailed-feedback">Detailed Feedback</Label>
                    <Textarea
                      placeholder="Provide detailed feedback about the interview..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="next-steps">Recommended Next Steps</Label>
                    <Textarea placeholder="What should happen next with this candidate?" />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsFeedbackDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsFeedbackDialogOpen(false)}>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
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
                <p className="text-sm font-medium text-muted-foreground">Total Feedbacks</p>
                <p className="text-2xl font-bold">{mockFeedbacks.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{completedFeedbacks} completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="flex mt-2">{renderStars(Math.round(averageRating))}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hire Recommendations</p>
                <p className="text-2xl font-bold">{hireRecommendations}</p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round((hireRecommendations / mockFeedbacks.length) * 100)}% success rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold">{mockFeedbacks.filter((f) => f.status === "pending").length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
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
                  <SelectValue placeholder="Filter by Round" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rounds</SelectItem>
                  <SelectItem value="technical-1">Technical Round 1</SelectItem>
                  <SelectItem value="technical-2">Technical Round 2</SelectItem>
                  <SelectItem value="hr">HR Round</SelectItem>
                  <SelectItem value="final">Final Round</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="2">2+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="hire">Hire Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredFeedbacks.map((feedback) => (
            <Card key={feedback.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={feedback.candidate.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {feedback.candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{feedback.candidate.name}</h3>
                        <Badge
                          className={recommendationColors[feedback.recommendation]}
                        >
                          {feedback.recommendation === "hire" && <ThumbsUp className="h-3 w-3 mr-1" />}
                          {feedback.recommendation === "maybe" && <AlertCircle className="h-3 w-3 mr-1" />}
                          {feedback.recommendation === "reject" && <ThumbsDown className="h-3 w-3 mr-1" />}
                          {feedback.recommendation.charAt(0).toUpperCase() + feedback.recommendation.slice(1)}
                        </Badge>
                        <Badge variant="outline">
                          {feedback.status === "completed" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1" />
                          )}
                          {feedback.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                        <div className="space-y-2">
                          <p className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Position: {feedback.position}
                          </p>
                          <p className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Interviewer: {feedback.interviewer}
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date: {feedback.interviewDate}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Round: {feedback.round}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Duration: {feedback.interviewDuration} minutes
                          </p>
                          <p className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Questions: {feedback.questionsAnswered}/{feedback.questionsAsked}
                          </p>
                        </div>
                      </div>

                      {/* Overall Rating */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium">Overall Rating:</span>
                          <div className="flex">{renderStars(feedback.overallRating)}</div>
                          <span className="text-sm text-muted-foreground">({feedback.overallRating}/5)</span>
                        </div>
                      </div>

                      {/* Skill Ratings */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Technical</p>
                          <div className="flex items-center gap-1">
                            <Progress value={feedback.technicalSkills * 20} className="flex-1 h-2" />
                            <span className="text-xs">{feedback.technicalSkills}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Communication</p>
                          <div className="flex items-center gap-1">
                            <Progress value={feedback.communication * 20} className="flex-1 h-2" />
                            <span className="text-xs">{feedback.communication}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Problem Solving</p>
                          <div className="flex items-center gap-1">
                            <Progress value={feedback.problemSolving * 20} className="flex-1 h-2" />
                            <span className="text-xs">{feedback.problemSolving}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Cultural Fit</p>
                          <div className="flex items-center gap-1">
                            <Progress value={feedback.culturalFit * 20} className="flex-1 h-2" />
                            <span className="text-xs">{feedback.culturalFit}</span>
                          </div>
                        </div>
                      </div>

                      {/* Strengths and Improvements */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium mb-2 text-green-700">Strengths:</p>
                          <div className="space-y-1">
                            {feedback.strengths.map((strength, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2 text-orange-700">Areas for Improvement:</p>
                          <div className="space-y-1">
                            {feedback.improvements.map((improvement, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <Lightbulb className="h-3 w-3 text-orange-600 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{improvement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Detailed Feedback */}
                      <div className="p-4 bg-muted rounded-lg mb-4">
                        <p className="text-sm font-medium mb-2">Detailed Feedback:</p>
                        <p className="text-sm text-muted-foreground">{feedback.detailedFeedback}</p>
                      </div>

                      {/* Next Steps */}
                      <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <p className="text-sm font-medium text-blue-800 mb-1">Next Steps:</p>
                        <p className="text-sm text-blue-700">{feedback.nextSteps}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Detailed Feedback - {feedback.candidate.name}</DialogTitle>
                          <DialogDescription>Complete interview feedback and assessment</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          {/* Candidate Info */}
                          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={feedback.candidate.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-lg">
                                {feedback.candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-semibold">{feedback.candidate.name}</h3>
                              <p className="text-muted-foreground">
                                {feedback.candidate.college} - {feedback.candidate.branch}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feedback.position} • {feedback.round}
                              </p>
                            </div>
                          </div>

                          {/* Ratings Breakdown */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4">Assessment Breakdown</h4>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Technical Skills</span>
                                    <span className="text-sm">{feedback.technicalSkills}/5</span>
                                  </div>
                                  <Progress value={feedback.technicalSkills * 20} />
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Communication</span>
                                    <span className="text-sm">{feedback.communication}/5</span>
                                  </div>
                                  <Progress value={feedback.communication * 20} />
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Problem Solving</span>
                                    <span className="text-sm">{feedback.problemSolving}/5</span>
                                  </div>
                                  <Progress value={feedback.problemSolving * 20} />
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Cultural Fit</span>
                                    <span className="text-sm">{feedback.culturalFit}/5</span>
                                  </div>
                                  <Progress value={feedback.culturalFit * 20} />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Full Feedback */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-green-700 mb-2">Key Strengths</h4>
                              <ul className="space-y-1">
                                {feedback.strengths.map((strength, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                                    <span className="text-sm">{strength}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-orange-700 mb-2">Areas for Improvement</h4>
                              <ul className="space-y-1">
                                {feedback.improvements.map((improvement, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <Lightbulb className="h-4 w-4 text-orange-600 mt-0.5" />
                                    <span className="text-sm">{improvement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Detailed Assessment</h4>
                              <p className="text-sm text-muted-foreground">{feedback.detailedFeedback}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Recommended Next Steps</h4>
                              <p className="text-sm text-muted-foreground">{feedback.nextSteps}</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm" onClick={() => handleEditFeedback(feedback)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Edit
                    </Button>

                    <Button variant="outline" size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Interview Feedback</DialogTitle>
            <DialogDescription>Modify the existing feedback for the candidate</DialogDescription>
          </DialogHeader>
          {editingFeedback ? (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="candidate">Candidate</Label>
                  <Input type="text" id="candidate" value={editingFeedback.candidate.name} disabled />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input type="text" id="position" value={editingFeedback.position} disabled />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="round">Interview Round</Label>
                  <Input type="text" id="round" value={editingFeedback.round} disabled />
                </div>
                <div>
                  <Label htmlFor="duration">Interview Duration (minutes)</Label>
                  <Input type="number" placeholder="60" defaultValue={editingFeedback.interviewDuration} />
                </div>
              </div>

              {/* Ratings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ratings</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Technical Skills</Label>
                    <RadioGroup defaultValue={editingFeedback.technicalSkills.toString()} className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div key={rating} className="flex items-center space-x-1">
                          <RadioGroupItem value={rating.toString()} id={`technical-${rating}`} />
                          <Label htmlFor={`technical-${rating}`} className="text-sm">
                            {rating}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>Communication</Label>
                    <RadioGroup defaultValue={editingFeedback.communication.toString()} className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div key={rating} className="flex items-center space-x-1">
                          <RadioGroupItem value={rating.toString()} id={`communication-${rating}`} />
                          <Label htmlFor={`communication-${rating}`} className="text-sm">
                            {rating}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>Problem Solving</Label>
                    <RadioGroup defaultValue={editingFeedback.problemSolving.toString()} className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div key={rating} className="flex items-center space-x-1">
                          <RadioGroupItem value={rating.toString()} id={`problem-${rating}`} />
                          <Label htmlFor={`problem-${rating}`} className="text-sm">
                            {rating}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>Cultural Fit</Label>
                    <RadioGroup defaultValue={editingFeedback.culturalFit.toString()} className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div key={rating} className="flex items-center space-x-1">
                          <RadioGroupItem value={rating.toString()} id={`cultural-${rating}`} />
                          <Label htmlFor={`cultural-${rating}`} className="text-sm">
                            {rating}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div>
                <Label>Overall Recommendation</Label>
                <RadioGroup defaultValue={editingFeedback.recommendation} className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hire" id="hire" />
                    <Label htmlFor="hire" className="text-green-600 font-medium">
                      Hire
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="maybe" />
                    <Label htmlFor="maybe" className="text-yellow-600 font-medium">
                      Maybe
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reject" id="reject" />
                    <Label htmlFor="reject" className="text-red-600 font-medium">
                      Reject
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Detailed Feedback */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="strengths">Key Strengths</Label>
                  <Textarea
                    placeholder="List the candidate's key strengths..."
                    defaultValue={editingFeedback.strengths.join(", ")}
                  />
                </div>
                <div>
                  <Label htmlFor="improvements">Areas for Improvement</Label>
                  <Textarea
                    placeholder="Areas where the candidate could improve..."
                    defaultValue={editingFeedback.improvements.join(", ")}
                  />
                </div>
                <div>
                  <Label htmlFor="detailed-feedback">Detailed Feedback</Label>
                  <Textarea
                    placeholder="Provide detailed feedback about the interview..."
                    className="min-h-[100px]"
                    defaultValue={editingFeedback.detailedFeedback}
                  />
                </div>
                <div>
                  <Label htmlFor="next-steps">Recommended Next Steps</Label>
                  <Textarea
                    placeholder="What should happen next with this candidate?"
                    defaultValue={editingFeedback.nextSteps}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowEditDialog(false)}>
                  <Send className="h-4 w-4 mr-2" />
                  Update Feedback
                </Button>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
