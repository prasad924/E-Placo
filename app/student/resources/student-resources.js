"use client"

import { useState } from "react"
import {
  Award,
  Bookmark,
  BookOpen,
  Code,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Laptop,
  Lightbulb,
  MapPin,
  Play,
  Search,
  Share2,
  ThumbsUp,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import Image from "next/image"

// Mock resource data
const RESOURCES = [
  {
    id: "res-001",
    title: "Resume Building Workshop",
    type: "video",
    category: "resume",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "Career Services",
    duration: "45 min",
    date: "Apr 15, 2025",
    description:
      "Learn how to create an effective resume that highlights your skills and experiences. This workshop covers resume formats, content organization, and tips for making your resume stand out to recruiters.",
    tags: ["Resume", "Career Development", "Job Application"],
    views: 1250,
    likes: 320,
    bookmarked: false,
    featured: true,
    url: "https://www.youtube.com/watch?v=example1",
    source: "YouTube",
  },
  {
    id: "res-002",
    title: "Technical Interview Questions",
    type: "document",
    category: "interview",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "Engineering Department",
    pages: 45,
    date: "Apr 10, 2025",
    description:
      "A comprehensive collection of technical interview questions commonly asked in software engineering interviews. Includes questions on data structures, algorithms, system design, and programming concepts.",
    tags: ["Technical Interview", "Coding", "Algorithms", "Data Structures"],
    downloads: 850,
    likes: 275,
    bookmarked: true,
    featured: true,
    url: "https://leetcode.com/explore/interview/card/top-interview-questions-easy/",
    source: "LeetCode",
  },
  {
    id: "res-003",
    title: "Aptitude Test Practice",
    type: "quiz",
    category: "aptitude",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "Mathematics Department",
    questions: 100,
    date: "Apr 5, 2025",
    description:
      "Practice your quantitative aptitude skills with this comprehensive test. Includes questions on numerical ability, logical reasoning, and verbal ability that are commonly asked in placement aptitude tests.",
    tags: ["Aptitude", "Quantitative", "Logical Reasoning", "Verbal"],
    attempts: 1500,
    likes: 420,
    bookmarked: false,
    featured: false,
    url: "https://www.indiabix.com/aptitude/questions-and-answers/",
    source: "IndiaBix",
  },
  {
    id: "res-004",
    title: "HR Interview Preparation Guide",
    type: "document",
    category: "interview",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "HR Department",
    pages: 30,
    date: "Mar 28, 2025",
    description:
      "Prepare for HR interviews with this comprehensive guide. Learn about common HR interview questions, how to present yourself professionally, and strategies for discussing your strengths, weaknesses, and career goals.",
    tags: ["HR Interview", "Soft Skills", "Communication"],
    downloads: 720,
    likes: 310,
    bookmarked: false,
    featured: false,
    url: "https://www.interviewbit.com/hr-interview-questions/",
    source: "InterviewBit",
  },
  {
    id: "res-005",
    title: "Data Structures and Algorithms",
    type: "course",
    category: "technical",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "Prof. Sharma",
    modules: 12,
    duration: "20 hours",
    date: "Mar 20, 2025",
    description:
      "A comprehensive course on data structures and algorithms. Learn about arrays, linked lists, trees, graphs, sorting algorithms, searching algorithms, and more. Includes practical coding exercises and problem-solving techniques.",
    tags: ["DSA", "Programming", "Algorithms", "Computer Science"],
    enrollments: 950,
    likes: 480,
    bookmarked: true,
    featured: true,
    url: "https://www.coursera.org/specializations/data-structures-algorithms",
    source: "Coursera",
  },
  {
    id: "res-006",
    title: "Group Discussion Strategies",
    type: "video",
    category: "soft-skills",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "Communication Skills Dept",
    duration: "35 min",
    date: "Mar 15, 2025",
    description:
      "Learn effective strategies for group discussions, a common component of the placement process. This video covers how to articulate your thoughts clearly, listen actively, and make meaningful contributions to group discussions.",
    tags: ["Group Discussion", "Communication", "Soft Skills"],
    views: 880,
    likes: 230,
    bookmarked: false,
    featured: false,
    url: "https://www.youtube.com/watch?v=example2",
    source: "YouTube",
  },
  {
    id: "res-007",
    title: "Web Development Fundamentals",
    type: "course",
    category: "technical",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "Tech Learning Center",
    modules: 8,
    duration: "15 hours",
    date: "Mar 10, 2025",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This course covers front-end development concepts, responsive design principles, and basic web application development.",
    tags: ["Web Development", "HTML", "CSS", "JavaScript"],
    enrollments: 1100,
    likes: 520,
    bookmarked: false,
    featured: false,
    url: "https://www.freecodecamp.org/learn/responsive-web-design/",
    source: "freeCodeCamp",
  },
  {
    id: "res-008",
    title: "Mock Interview Sessions",
    type: "event",
    category: "interview",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "Placement Cell",
    date: "May 5-10, 2025",
    location: "Online & Campus",
    description:
      "Participate in mock interview sessions conducted by industry professionals and faculty members. Get feedback on your interview performance and tips for improvement. Registration required.",
    tags: ["Mock Interview", "Feedback", "Practice"],
    registrations: 320,
    likes: 180,
    bookmarked: false,
    featured: true,
    url: "https://www.pramp.com/",
    source: "Pramp",
  },
  {
    id: "res-009",
    title: "Python Programming for Beginners",
    type: "course",
    category: "technical",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "Computer Science Dept",
    modules: 10,
    duration: "18 hours",
    date: "Mar 5, 2025",
    description:
      "A beginner-friendly course on Python programming. Learn Python syntax, data types, control structures, functions, and basic programming concepts. Includes hands-on coding exercises and projects.",
    tags: ["Python", "Programming", "Beginners"],
    enrollments: 1300,
    likes: 590,
    bookmarked: false,
    featured: false,
    url: "https://www.codecademy.com/learn/learn-python-3",
    source: "Codecademy",
  },
  {
    id: "res-010",
    title: "Effective Communication Skills",
    type: "workshop",
    category: "soft-skills",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "Soft Skills Training Center",
    duration: "2 days",
    date: "Apr 20-21, 2025",
    location: "Auditorium A",
    description:
      "Enhance your communication skills with this interactive workshop. Learn about verbal and non-verbal communication, presentation skills, email etiquette, and effective listening. Includes role-playing exercises.",
    tags: ["Communication", "Soft Skills", "Presentation"],
    registrations: 250,
    likes: 200,
    bookmarked: false,
    featured: false,
    url: "https://www.udemy.com/course/communication-skills-for-professionals/",
    source: "Udemy",
  },
  {
    id: "res-011",
    title: "System Design Interview Preparation",
    type: "document",
    category: "interview",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "Senior Engineers Panel",
    pages: 60,
    date: "Mar 1, 2025",
    description:
      "Prepare for system design interviews with this comprehensive guide. Learn about scalable system architecture, database design, API design, and how to approach system design problems during interviews.",
    tags: ["System Design", "Architecture", "Technical Interview"],
    downloads: 680,
    likes: 340,
    bookmarked: false,
    featured: false,
    url: "https://github.com/donnemartin/system-design-primer",
    source: "GitHub",
  },
  {
    id: "res-012",
    title: "Machine Learning Fundamentals",
    type: "course",
    category: "technical",
    thumbnail: "/placeholder.svg?height=200&width=350",
    author: "AI Research Lab",
    modules: 15,
    duration: "25 hours",
    date: "Feb 25, 2025",
    description:
      "Learn the fundamentals of machine learning including supervised and unsupervised learning, neural networks, and model evaluation. This course covers theoretical concepts and practical implementation using Python and popular ML libraries.",
    tags: ["Machine Learning", "AI", "Data Science", "Python"],
    enrollments: 850,
    likes: 420,
    bookmarked: false,
    featured: false,
    url: "https://www.kaggle.com/learn/intro-to-machine-learning",
    source: "Kaggle",
  },
]

// Resource categories
const CATEGORIES = [
  { id: "all", name: "All Resources", icon: BookOpen },
  { id: "resume", name: "Resume Building", icon: FileText },
  { id: "interview", name: "Interview Preparation", icon: Users },
  { id: "technical", name: "Technical Skills", icon: Code },
  { id: "aptitude", name: "Aptitude & Reasoning", icon: Lightbulb },
  { id: "soft-skills", name: "Soft Skills", icon: Award },
]

// Resource types
const TYPES = [
  { id: "all", name: "All Types" },
  { id: "video", name: "Videos" },
  { id: "document", name: "Documents" },
  { id: "course", name: "Courses" },
  { id: "quiz", name: "Quizzes" },
  { id: "event", name: "Events & Workshops" },
]

export function StudentResources() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [typeFilter, setTypeFilter] = useState([])
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false)
  const [resources, setResources] = useState(RESOURCES)

  // Filter resources based on search query, category, type, and bookmarked status
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory

    const matchesType = typeFilter.length === 0 || typeFilter.includes(resource.type)

    const matchesBookmarked = !bookmarkedOnly || resource.bookmarked

    return matchesSearch && matchesCategory && matchesType && matchesBookmarked
  })

  // Toggle bookmark status
  const toggleBookmark = (id) => {
    setResources(
      resources.map((resource) => {
        if (resource.id === id) {
          const newStatus = !resource.bookmarked
          toast({
            title: newStatus ? "Resource Bookmarked" : "Bookmark Removed",
            description: `"${resource.title}" has been ${newStatus ? "added to" : "removed from"} your bookmarks.`,
          })
          return { ...resource, bookmarked: newStatus }
        }
        return resource
      }),
    )
  }

  // Get resource icon based on type
  const getResourceIcon = (type) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "course":
        return <Laptop className="h-4 w-4" />
      case "quiz":
        return <Lightbulb className="h-4 w-4" />
      case "event":
      case "workshop":
        return <Users className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  // Format resource stats based on type
  const getResourceStats = (resource) => {
    switch (resource.type) {
      case "video":
        return `${resource.views} views • ${resource.duration}`
      case "document":
        return `${resource.downloads} downloads • ${resource.pages} pages`
      case "course":
        return `${resource.enrollments} enrolled • ${resource.modules} modules • ${resource.duration}`
      case "quiz":
        return `${resource.attempts} attempts • ${resource.questions} questions`
      case "event":
      case "workshop":
        return `${resource.registrations} registered • ${resource.location}`
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Resources</h2>
          <p className="text-muted-foreground">
            Access learning materials, guides, and practice resources to prepare for your placement journey.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources, topics, or keywords..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Resource Type
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {TYPES.slice(1).map((type) => (
                <DropdownMenuCheckboxItem
                  key={type.id}
                  checked={typeFilter.includes(type.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTypeFilter([...typeFilter, type.id])
                    } else {
                      setTypeFilter(typeFilter.filter((t) => t !== type.id))
                    }
                  }}
                >
                  {type.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant={bookmarkedOnly ? "default" : "outline"} onClick={() => setBookmarkedOnly(!bookmarkedOnly)}>
            <Bookmark className={`mr-2 h-4 w-4 ${bookmarkedOnly ? "fill-current" : ""}`} />
            Bookmarked
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 -mx-6 px-6 space-x-2">
        {CATEGORIES.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="flex-shrink-0"
              onClick={() => setSelectedCategory(category.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          )
        })}
      </div>

      

      {/* All Resources */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {bookmarkedOnly
              ? "Bookmarked Resources"
              : selectedCategory !== "all"
                ? CATEGORIES.find((c) => c.id === selectedCategory)?.name
                : "All Resources"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
        </div>

        {filteredResources.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No resources found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We couldn&apos;t find any resources matching your current filters. Try adjusting your search or filters.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setTypeFilter([])
                  setBookmarkedOnly(false)
                }}
              >
                Reset Filters
              </Button>
            </div>
          </Card>
        ) : (
          <Tabs defaultValue="grid">
            <div className="flex justify-end">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <Image
                        src={resource.thumbnail || "/placeholder.svg"}
                        alt={resource.title}
                        height={0}
                        width={0}
                        sizes="100dvw"
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getResourceIcon(resource.type)}
                          {TYPES.find((t) => t.id === resource.type)?.name.slice(0, -1) || resource.type}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleBookmark(resource.id)}
                        >
                          <Bookmark className={`h-4 w-4 ${resource.bookmarked ? "fill-primary text-primary" : ""}`} />
                          <span className="sr-only">Bookmark</span>
                        </Button>
                      </div>
                      <CardTitle className="line-clamp-1 text-lg">{resource.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Avatar className="mr-1 h-5 w-5">
                            <AvatarFallback>{resource.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{resource.author}</span>
                        </div>
                        <span>{resource.source}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Resource
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <div className="space-y-4">
                {filteredResources.map((resource) => (
                  <Card key={resource.id}>
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-48 md:w-60">
                        <div className="aspect-video w-full overflow-hidden bg-muted sm:h-full">
                          <Image
                            src={resource.thumbnail || "/placeholder.svg"}
                            alt={resource.title}
                            height={0}
                        width={0}
                        sizes="100dvw"
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getResourceIcon(resource.type)}
                            {TYPES.find((t) => t.id === resource.type)?.name.slice(0, -1) || resource.type}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleBookmark(resource.id)}
                          >
                            <Bookmark className={`h-4 w-4 ${resource.bookmarked ? "fill-primary text-primary" : ""}`} />
                            <span className="sr-only">Bookmark</span>
                          </Button>
                        </div>
                        <h3 className="mt-2 text-lg font-semibold">{resource.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{resource.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {resource.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-auto pt-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Avatar className="mr-1 h-5 w-5">
                                <AvatarFallback>{resource.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="mr-2">{resource.author}</span>
                              <span>•</span>
                              <span className="ml-2">{resource.source}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{getResourceStats(resource)}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <ThumbsUp className="mr-2 h-4 w-4" />
                              Like ({resource.likes})
                            </Button>
                            <Button size="sm" className="flex-1" asChild>
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                Visit Resource
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
