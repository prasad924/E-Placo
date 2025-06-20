"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  MapPin,
  Users,
  DollarSign,
  Star,
  Search,
  Eye,
  Heart,
  ExternalLink,
  Calendar,
  Briefcase,
  Award,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"

const companies = [
  {
    id: 1,
    name: "Google",
    logo: "/placeholder.svg?height=80&width=80",
    industry: "Technology",
    location: "Mountain View, CA",
    size: "100,000+",
    founded: 1998,
    website: "google.com",
    description: "Multinational technology company specializing in Internet-related services and products",
    rating: 4.5,
    reviews: 15420,
    openPositions: 12,
    packageRange: "₹25-45 LPA",
    hiringStatus: "Active",
    lastVisited: "2024-01-10",
    tags: ["AI/ML", "Cloud", "Search", "Mobile"],
    benefits: ["Health Insurance", "Stock Options", "Flexible Hours", "Remote Work"],
    techStack: ["Python", "Java", "Go", "JavaScript", "TensorFlow"],
    isFollowing: false,
    upcomingDrives: 2,
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "/placeholder.svg?height=80&width=80",
    industry: "Technology",
    location: "Redmond, WA",
    size: "200,000+",
    founded: 1975,
    website: "microsoft.com",
    description: "American multinational technology corporation producing computer software and services",
    rating: 4.4,
    reviews: 12890,
    openPositions: 8,
    packageRange: "₹22-38 LPA",
    hiringStatus: "Active",
    lastVisited: "2024-01-05",
    tags: ["Cloud", "Enterprise", "Gaming", "Productivity"],
    benefits: ["Health Insurance", "401k", "Parental Leave", "Learning Budget"],
    techStack: ["C#", ".NET", "Azure", "TypeScript", "React"],
    isFollowing: true,
    upcomingDrives: 1,
  },
  {
    id: 3,
    name: "Amazon",
    logo: "/placeholder.svg?height=80&width=80",
    industry: "E-commerce/Cloud",
    location: "Seattle, WA",
    size: "1,500,000+",
    founded: 1994,
    website: "amazon.com",
    description: "American multinational technology company focusing on e-commerce and cloud computing",
    rating: 4.1,
    reviews: 28450,
    openPositions: 15,
    packageRange: "₹18-32 LPA",
    hiringStatus: "Active",
    lastVisited: "2023-12-20",
    tags: ["E-commerce", "AWS", "Logistics", "AI"],
    benefits: ["Health Insurance", "Stock Purchase", "Career Development", "Relocation"],
    techStack: ["Java", "Python", "AWS", "React", "Node.js"],
    isFollowing: false,
    upcomingDrives: 3,
  },
  {
    id: 4,
    name: "TCS",
    logo: "/placeholder.svg?height=80&width=80",
    industry: "IT Services",
    location: "Mumbai, India",
    size: "500,000+",
    founded: 1968,
    website: "tcs.com",
    description: "Indian multinational information technology services and consulting company",
    rating: 3.9,
    reviews: 45670,
    openPositions: 200,
    packageRange: "₹3.5-7 LPA",
    hiringStatus: "Mass Hiring",
    lastVisited: "2024-01-12",
    tags: ["Consulting", "Digital", "Banking", "Healthcare"],
    benefits: ["Health Insurance", "Training Programs", "Global Opportunities", "Work-Life Balance"],
    techStack: ["Java", "Python", "Angular", "Spring", "Oracle"],
    isFollowing: true,
    upcomingDrives: 1,
  },
  {
    id: 5,
    name: "Infosys",
    logo: "/placeholder.svg?height=80&width=80",
    industry: "IT Services",
    location: "Bangalore, India",
    size: "300,000+",
    founded: 1981,
    website: "infosys.com",
    description: "Indian multinational corporation providing business consulting and software services",
    rating: 4.0,
    reviews: 38920,
    openPositions: 150,
    packageRange: "₹4-8 LPA",
    hiringStatus: "Active",
    lastVisited: "2024-01-08",
    tags: ["Digital Transformation", "Cloud", "Analytics", "Automation"],
    benefits: ["Health Insurance", "Skill Development", "Flexible Work", "Employee Assistance"],
    techStack: ["Java", "Python", "React", "Spring Boot", "MySQL"],
    isFollowing: false,
    upcomingDrives: 2,
  },
  {
    id: 6,
    name: "Wipro",
    logo: "/placeholder.svg?height=80&width=80",
    industry: "IT Services",
    location: "Bangalore, India",
    size: "250,000+",
    founded: 1945,
    website: "wipro.com",
    description: "Indian multinational corporation providing information technology and consulting services",
    rating: 3.8,
    reviews: 32150,
    openPositions: 120,
    packageRange: "₹3.8-6.5 LPA",
    hiringStatus: "Active",
    lastVisited: "2023-12-15",
    tags: ["Digital", "Cloud", "Cybersecurity", "Engineering"],
    benefits: ["Health Insurance", "Learning Platform", "Wellness Programs", "Diversity"],
    techStack: ["Java", "Python", "Angular", "AWS", "Docker"],
    isFollowing: false,
    upcomingDrives: 1,
  },
]

const industries = ["All", "Technology", "IT Services", "E-commerce/Cloud", "Finance", "Healthcare", "Consulting"]
const locations = ["All", "Bangalore", "Hyderabad", "Chennai", "Mumbai", "Pune", "Delhi", "International"]
const companySizes = ["All", "Startup (1-50)", "Small (51-200)", "Medium (201-1000)", "Large (1000+)"]

export function StudentCompanies() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [selectedSize, setSelectedSize] = useState("All")
  const [followedCompanies, setFollowedCompanies] = useState([2, 4])

  const handleCompanyClick = (company) => {
    // Navigate to detailed company profile
    window.open(`/company/${company.id}`, "_blank")
  }

  const handleApplyClick = (company) => {
    // Navigate to application page
    window.open(`/apply/company/${company.id}`, "_blank")
  }

  const handleViewJobs = (company) => {
    // Navigate to company jobs
    window.open(`/company/${company.id}/jobs`, "_blank")
  }

  const handleFollowCompany = (companyId) => {
    toggleFollow(companyId)
    // Here you would typically make an API call
    console.log("Following/unfollowing company:", companyId)
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = selectedIndustry === "All" || company.industry === selectedIndustry
    const matchesLocation = selectedLocation === "All" || company.location.includes(selectedLocation)
    return matchesSearch && matchesIndustry && matchesLocation
  })

  const toggleFollow = (companyId) => {
    setFollowedCompanies((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId],
    )
  }

  const getHiringStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "mass hiring":
        return "bg-blue-100 text-blue-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">Explore companies and their opportunities</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Heart className="mr-2 h-4 w-4" />
            Following ({followedCompanies.length})
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Company Size" />
          </SelectTrigger>
          <SelectContent>
            {companySizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Companies</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <Card
                key={company.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCompanyClick(company)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={company.logo || "/placeholder.svg"}
                        alt={company.name}
                        className="rounded-lg object-cover"
                        height={12} width={12}
                      />
                      <div>
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <CardDescription>{company.industry}</CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleFollowCompany(company.id)
                      }}
                      className="p-2"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          followedCompanies.includes(company.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{company.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{company.size}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{company.packageRange}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{company.openPositions} positions</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{company.rating}</span>
                      <span className="text-xs text-muted-foreground">({company.reviews.toLocaleString()})</span>
                    </div>
                    <Badge className={getHiringStatusColor(company.hiringStatus)}>{company.hiringStatus}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {company.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {company.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{company.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {company.upcomingDrives > 0 && (
                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-600">
                        {company.upcomingDrives} upcoming drive{company.upcomingDrives > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(company.website, "_blank")
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies
              .filter((company) => followedCompanies.includes(company.id))
              .map((company) => (
                <Card key={company.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          className="rounded-lg object-cover"
                          height={12} width={12}
                        />
                        <div>
                          <CardTitle className="text-lg">{company.name}</CardTitle>
                          <CardDescription>{company.industry}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Following</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Recent Updates:</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs">New job posting: Senior Developer</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs">Campus drive scheduled for Jan 25</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="w-full" >
                      View Company Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
