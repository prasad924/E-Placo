"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Award,
  Briefcase,
  Building,
  Calendar,
  Clock,
  Globe,
  Heart,
  Info,
  Mail,
  MapPin,
  Phone,
  Share2,
  Star,
  Users,
  ArrowLeft,
  ExternalLink,
  BookmarkPlus,
  BookmarkCheck,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

// Comprehensive company data
const COMPANY_DATA = {
  techcorp: {
    id: "techcorp",
    name: "TechCorp Solutions",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=300&width=1200",
    tagline: "Innovating for a better tomorrow",
    description:
      "TechCorp Solutions is a leading technology company specializing in software development, cloud computing, and artificial intelligence solutions. With a global presence and a team of talented professionals, we are committed to delivering innovative products and services that transform businesses and improve lives.",
    industry: "Information Technology",
    founded: "2005",
    headquarters: "Bangalore, India",
    size: "1000-5000 employees",
    website: "https://techcorp.example.com",
    rating: 4.2,
    totalReviews: 1247,
    isFollowing: false,
    isBookmarked: false,
    socialMedia: {
      linkedin: "https://linkedin.com/company/techcorp",
      twitter: "https://twitter.com/techcorp",
      facebook: "https://facebook.com/techcorp",
    },
    stats: {
      totalJobs: 45,
      activeJobs: 23,
      totalHires: 2847,
      avgSalary: "₹15.2 LPA",
      hiringRate: 78,
      responseTime: "3 days",
    },
    about:
      "TechCorp Solutions was founded in 2005 with a mission to create cutting-edge technology solutions that address complex business challenges. Over the years, we have grown into a global organization with offices in multiple countries and a diverse team of experts dedicated to innovation and excellence.\n\nOur core values include customer focus, innovation, integrity, and teamwork. We believe in fostering a culture of continuous learning and collaboration, where employees are encouraged to explore new ideas and push the boundaries of what's possible.\n\nAt TechCorp, we are committed to sustainability and social responsibility. We actively participate in community initiatives and strive to minimize our environmental footprint through sustainable practices.",
    culture:
      "At TechCorp, we foster a culture of innovation, collaboration, and continuous learning. We believe in empowering our employees to take ownership of their work and contribute to the company's success. Our open and inclusive work environment encourages diverse perspectives and creative thinking.\n\nWe offer flexible work arrangements, comprehensive benefits, and numerous opportunities for professional growth and development. Regular team-building activities, hackathons, and knowledge-sharing sessions help create a vibrant and engaging workplace.",
    benefits: [
      "Competitive salary with performance bonuses",
      "Comprehensive health insurance for family",
      "Flexible work hours and remote work options",
      "Professional development and learning budget",
      "Employee stock options and equity participation",
      "Paid time off and generous parental leave",
      "Wellness programs and gym memberships",
      "Modern office spaces with recreational facilities",
      "Free meals and snacks",
      "Transportation allowance",
      "Annual team retreats and offsites",
      "Mental health support and counseling",
    ],
    techStack: [
      "Java",
      "Python",
      "JavaScript",
      "React",
      "Node.js",
      "Angular",
      "Vue.js",
      "Spring Boot",
      "Django",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Git",
      "Redis",
    ],
    departments: [
      { name: "Engineering", openings: 15, employees: 450 },
      { name: "Product Management", openings: 3, employees: 45 },
      { name: "Data Science", openings: 8, employees: 120 },
      { name: "DevOps", openings: 5, employees: 80 },
      { name: "QA/Testing", openings: 7, employees: 95 },
      { name: "UI/UX Design", openings: 4, employees: 35 },
    ],
    openPositions: [
      {
        id: "job-001",
        title: "Software Development Engineer",
        department: "Engineering",
        location: "Bangalore, Karnataka",
        workMode: "Hybrid",
        type: "Full-time",
        experience: "0-2 years",
        salary: "₹12-18 LPA",
        deadline: "May 15, 2025",
        postedDate: "April 1, 2025",
        applicants: 245,
        description: "Join our dynamic engineering team to build next-generation software solutions...",
        requirements: [
          "B.Tech/BE in Computer Science with CGPA ≥ 7.5",
          "Strong programming skills in Java/Python/JavaScript",
          "Understanding of data structures and algorithms",
          "Knowledge of web technologies and frameworks",
        ],
        skills: ["Java", "Python", "JavaScript", "React", "Node.js", "SQL"],
      },
      {
        id: "job-002",
        title: "Frontend Developer",
        department: "Engineering",
        location: "Bangalore, Karnataka",
        workMode: "Remote",
        type: "Full-time",
        experience: "1-3 years",
        salary: "₹10-15 LPA",
        deadline: "May 20, 2025",
        postedDate: "April 3, 2025",
        applicants: 189,
        description: "Create engaging and responsive user interfaces for our web applications...",
        requirements: [
          "B.Tech/BE in any field with strong frontend skills",
          "Proficiency in HTML, CSS, JavaScript",
          "Experience with React/Angular/Vue.js",
          "Knowledge of responsive design principles",
        ],
        skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
      },
      {
        id: "job-003",
        title: "Data Scientist",
        department: "Data Science",
        location: "Bangalore, Karnataka",
        workMode: "Hybrid",
        type: "Full-time",
        experience: "2-5 years",
        salary: "₹15-22 LPA",
        deadline: "May 25, 2025",
        postedDate: "April 5, 2025",
        applicants: 156,
        description: "Analyze complex datasets to derive actionable insights for business decisions...",
        requirements: [
          "M.Tech/MS in Computer Science/Statistics/Mathematics",
          "Strong knowledge of machine learning algorithms",
          "Proficiency in Python and data science libraries",
          "Experience with big data technologies",
        ],
        skills: ["Python", "R", "SQL", "Machine Learning", "TensorFlow", "Pandas"],
      },
    ],
    reviews: [
      {
        id: 1,
        author: "Software Engineer",
        rating: 4.5,
        date: "March 2025",
        title: "Great place for career growth",
        content:
          "TechCorp has been an amazing place to work. The learning opportunities are endless, and the team is very supportive. The work-life balance is good, and the company truly cares about employee development.",
        pros: [
          "Excellent learning opportunities",
          "Supportive team culture",
          "Good work-life balance",
          "Competitive compensation",
        ],
        cons: ["Sometimes high pressure during product launches", "Limited parking space"],
        helpful: 24,
        department: "Engineering",
        experience: "2 years",
      },
      {
        id: 2,
        author: "Product Manager",
        rating: 4.0,
        date: "February 2025",
        title: "Innovative and dynamic workplace",
        content:
          "The company has a strong focus on innovation and provides excellent opportunities to work on cutting-edge projects. The leadership is approachable and values employee feedback.",
        pros: ["Innovative projects", "Approachable leadership", "Good benefits package", "Modern office facilities"],
        cons: ["Fast-paced environment can be stressful", "Occasional long hours during deadlines"],
        helpful: 18,
        department: "Product",
        experience: "3 years",
      },
      {
        id: 3,
        author: "Data Scientist",
        rating: 4.3,
        date: "January 2025",
        title: "Excellent for data professionals",
        content:
          "As a data scientist, I've had the opportunity to work on diverse projects with access to latest tools and technologies. The data infrastructure is robust and the team is highly skilled.",
        pros: [
          "Latest tools and technologies",
          "Diverse project portfolio",
          "Skilled team members",
          "Good learning curve",
        ],
        cons: ["Could improve cross-team collaboration", "Meeting-heavy culture"],
        helpful: 31,
        department: "Data Science",
        experience: "1.5 years",
      },
    ],
    faqs: [
      {
        question: "What is the interview process like?",
        answer:
          "Our interview process typically consists of an initial screening call, online assessment, 2-3 technical rounds, and a final HR discussion. The entire process usually takes 2-3 weeks and we provide feedback at each stage.",
      },
      {
        question: "Do you offer internship opportunities?",
        answer:
          "Yes, we have comprehensive internship programs running throughout the year. Our internships are 3-6 months long and provide hands-on experience with real projects. Many of our interns receive full-time offers.",
      },
      {
        question: "What is the work culture like?",
        answer:
          "We foster a collaborative, innovative, and inclusive work environment. We believe in work-life balance, continuous learning, and empowering employees to take ownership of their work.",
      },
      {
        question: "Do you provide relocation assistance?",
        answer:
          "Yes, we provide comprehensive relocation assistance including travel expenses, temporary accommodation, and help with finding permanent housing for eligible positions.",
      },
      {
        question: "What growth opportunities are available?",
        answer:
          "We offer various growth paths including technical leadership, people management, and cross-functional roles. We have mentorship programs, learning budgets, and internal mobility opportunities.",
      },
      {
        question: "What is the salary structure?",
        answer:
          "We offer competitive salaries benchmarked against industry standards, along with performance bonuses, stock options, and comprehensive benefits. Salary ranges vary by role and experience level.",
      },
    ],
    events: [
      {
        id: "event-001",
        title: "Campus Recruitment Drive",
        date: "May 10, 2025",
        time: "9:00 AM - 5:00 PM",
        location: "Main Auditorium",
        type: "Recruitment",
        description:
          "Join us for our comprehensive campus recruitment drive. We'll be hiring for multiple positions across engineering, product, and data science teams.",
        registrations: 450,
        maxCapacity: 500,
      },
      {
        id: "event-002",
        title: "Tech Talk: Future of AI",
        date: "May 15, 2025",
        time: "2:00 PM - 4:00 PM",
        location: "Seminar Hall A",
        type: "Tech Talk",
        description:
          "Our CTO will share insights about the future of artificial intelligence and how it's shaping our products and industry.",
        registrations: 180,
        maxCapacity: 200,
      },
      {
        id: "event-003",
        title: "Coding Workshop",
        date: "May 20, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "Computer Lab 1 & 2",
        type: "Workshop",
        description:
          "Hands-on coding workshop covering modern web development technologies including React, Node.js, and cloud deployment.",
        registrations: 95,
        maxCapacity: 100,
      },
    ],
    contactInfo: {
      email: "campus.recruitment@techcorp.com",
      phone: "+91 98765 43210",
      address: "TechCorp Campus, 123 Tech Park, Electronic City, Bangalore - 560100",
      recruiter: {
        name: "Priya Sharma",
        designation: "Campus Recruitment Manager",
        email: "priya.sharma@techcorp.com",
        phone: "+91 98765 43211",
      },
    },
  },
}

export function StudentCompanyProfile({ companyId }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Get company data based on ID
  const company = COMPANY_DATA[companyId] || COMPANY_DATA.techcorp

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: `You are now ${isFollowing ? "not following" : "following"} ${company.name}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="outline" size="sm" asChild>
        <Link href="/student/companies">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Link>
      </Button>

      {/* Cover Image and Company Info */}
      <div className="relative">
        <div className="h-48 w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden md:h-64">
          <img
            src={company.coverImage || "/placeholder.svg"}
            alt={`${company.name} cover`}
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="absolute -bottom-16 left-4 flex items-end md:left-8">
          <Avatar className="h-24 w-24 border-4 border-background md:h-32 md:w-32">
            <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
            <AvatarFallback className="text-2xl font-bold">{company.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Company Header */}
      <div className="mt-16 flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Actively Hiring
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground mb-3">{company.tagline}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Building className="mr-1 h-4 w-4" />
              <span>{company.industry}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{company.headquarters}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <span>{company.size}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Founded {company.founded}</span>
            </div>
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>
                {company.rating} ({company.totalReviews} reviews)
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{company.stats.activeJobs}</div>
              <div className="text-xs text-blue-600">Active Jobs</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{company.stats.hiringRate}%</div>
              <div className="text-xs text-green-600">Hiring Rate</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{company.stats.avgSalary}</div>
              <div className="text-xs text-purple-600">Avg Salary</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{company.stats.responseTime}</div>
              <div className="text-xs text-orange-600">Response Time</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              <Globe className="mr-2 h-4 w-4" />
              Website
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
          <Button size="sm" onClick={handleFollow}>
            <Heart className={`mr-2 h-4 w-4 ${isFollowing ? "fill-current" : ""}`} />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs ({company.stats.activeJobs})</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line text-muted-foreground leading-relaxed">{company.about}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technology Stack</CardTitle>
                  <CardDescription>Technologies and tools used at {company.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {company.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <CardTitle>Open Positions</CardTitle>
                  <CardDescription>Current job openings at {company.name}. Apply now to join our team!</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{company.stats.activeJobs} Active Jobs</Badge>
                  <Badge variant="outline">{company.stats.totalHires} Total Hires</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {company.openPositions.map((job) => (
                  <div key={job.id} className="rounded-lg border p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Briefcase className="mr-1 h-4 w-4" />
                                {job.department}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center">
                                <Award className="mr-1 h-4 w-4" />
                                {job.salary}
                              </span>
                              <span className="flex items-center">
                                <Users className="mr-1 h-4 w-4" />
                                {job.applicants} applicants
                              </span>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            Hot
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{job.type}</Badge>
                          <Badge variant="outline">{job.workMode}</Badge>
                          <Badge variant="outline">{job.experience}</Badge>
                          <Badge variant="outline" className="text-red-600 border-red-200">
                            <Clock className="mr-1 h-3 w-3" />
                            Deadline: {job.deadline}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

                        <div className="mb-4">
                          <h4 className="font-medium mb-2 text-sm">Key Requirements:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {job.requirements.slice(0, 2).map((req, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2 text-primary">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {job.skills.slice(0, 6).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 6 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.skills.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:min-w-[140px]">
                        <Button size="sm" asChild className="w-full">
                          <Link href={`/student/apply/${job.id}`}>
                            <Zap className="mr-2 h-4 w-4" />
                            Apply Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-muted-foreground">
                  Showing {company.openPositions.length} of {company.stats.activeJobs} active positions
                </p>
                <Button variant="outline" size="sm">
                  View All Jobs
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <CardTitle>Employee Reviews</CardTitle>
                  <CardDescription>
                    Read what current and former employees have to say about working at {company.name}.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{company.rating}</div>
                    <div className="flex items-center justify-center mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i <= Math.floor(company.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">Based on {company.totalReviews} reviews</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {company.reviews.map((review) => (
                  <div key={review.id} className="rounded-lg border p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{review.title}</h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span>{review.author}</span>
                          <span>•</span>
                          <span>{review.department}</span>
                          <span>•</span>
                          <span>{review.experience} experience</span>
                          <span>•</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="font-medium">{review.rating}</div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i <= Math.floor(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm mb-4 leading-relaxed">{review.content}</p>

                    <div className="grid gap-4 sm:grid-cols-2 mb-4">
                      <div>
                        <h5 className="text-sm font-medium text-green-700 mb-2">Pros</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {review.pros.map((pro, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2 text-green-500">+</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-red-700 mb-2">Cons</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {review.cons.map((con, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2 text-red-500">-</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-muted-foreground">{review.helpful} people found this helpful</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          👍 Helpful
                        </Button>
                        <Button variant="outline" size="sm">
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Load more reviews
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Culture Tab */}
        <TabsContent value="culture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Culture & Benefits</CardTitle>
              <CardDescription>Discover what makes {company.name} a great place to work.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Work Culture</h3>
                <p className="whitespace-pre-line text-muted-foreground leading-relaxed">{company.culture}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Benefits & Perks</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {company.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about working at {company.name} and our recruitment process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {company.faqs.map((faq, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">Have more questions? Contact our recruitment team.</p>
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${company.contactInfo.recruiter.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Recruiter
                </a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
