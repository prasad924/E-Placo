"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Download, Search, Building, MapPin, TrendingUp, Star, Eye } from "lucide-react"
import Link from "next/link"

const companyData = [
  {
    id: "google",
    name: "Google",
    type: "Product",
    tier: "Tier 1",
    logo: "/placeholder.svg?height=60&width=60",
    totalHired: 25,
    packageRange: "₹25-45 LPA",
    avgPackage: 35,
    locations: ["Bangalore", "Hyderabad", "Mumbai"],
    departments: ["CSE", "IT", "ECE"],
    visitFrequency: "Annual",
    lastVisit: "2024",
    rating: 4.8,
    hiringTrend: "+15%",
    roles: ["Software Engineer", "Product Manager", "Data Scientist"],
    requirements: ["CGPA > 8.0", "No Backlogs", "Strong Programming Skills"],
    selectionProcess: ["Online Test", "Technical Interview", "HR Interview"],
    yearlyHiring: [
      { year: "2020", hired: 18 },
      { year: "2021", hired: 20 },
      { year: "2022", hired: 22 },
      { year: "2023", hired: 23 },
      { year: "2024", hired: 25 },
    ],
    departmentWise: [
      { dept: "CSE", hired: 15, applied: 85 },
      { dept: "IT", hired: 8, applied: 45 },
      { dept: "ECE", hired: 2, applied: 25 },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    type: "Product",
    tier: "Tier 1",
    logo: "/placeholder.svg?height=60&width=60",
    totalHired: 32,
    packageRange: "₹22-38 LPA",
    avgPackage: 28,
    locations: ["Bangalore", "Hyderabad", "Noida"],
    departments: ["CSE", "IT", "ECE"],
    visitFrequency: "Annual",
    lastVisit: "2024",
    rating: 4.7,
    hiringTrend: "+12%",
    roles: ["Software Engineer", "Program Manager", "Cloud Engineer"],
    requirements: ["CGPA > 7.5", "No Active Backlogs", "Problem Solving Skills"],
    selectionProcess: ["Coding Round", "Technical Interview", "Managerial Round"],
    yearlyHiring: [
      { year: "2020", hired: 22 },
      { year: "2021", hired: 25 },
      { year: "2022", hired: 28 },
      { year: "2023", hired: 30 },
      { year: "2024", hired: 32 },
    ],
    departmentWise: [
      { dept: "CSE", hired: 18, applied: 95 },
      { dept: "IT", hired: 12, applied: 55 },
      { dept: "ECE", hired: 2, applied: 20 },
    ],
  },
  {
    id: "amazon",
    name: "Amazon",
    type: "Product",
    tier: "Tier 1",
    logo: "/placeholder.svg?height=60&width=60",
    totalHired: 42,
    packageRange: "₹18-32 LPA",
    avgPackage: 24,
    locations: ["Bangalore", "Chennai", "Hyderabad"],
    departments: ["CSE", "IT", "ECE", "EEE"],
    visitFrequency: "Annual",
    lastVisit: "2024",
    rating: 4.6,
    hiringTrend: "+8%",
    roles: ["SDE-1", "Support Engineer", "Operations Manager"],
    requirements: ["CGPA > 7.0", "Good Communication", "Leadership Skills"],
    selectionProcess: ["Online Assessment", "Technical Interview", "Bar Raiser"],
    yearlyHiring: [
      { year: "2020", hired: 32 },
      { year: "2021", hired: 35 },
      { year: "2022", hired: 38 },
      { year: "2023", hired: 40 },
      { year: "2024", hired: 42 },
    ],
    departmentWise: [
      { dept: "CSE", hired: 22, applied: 120 },
      { dept: "IT", hired: 15, applied: 75 },
      { dept: "ECE", hired: 3, applied: 35 },
      { dept: "EEE", hired: 2, applied: 25 },
    ],
  },
  {
    id: "tcs",
    name: "Tata Consultancy Services",
    type: "Service",
    tier: "Tier 2",
    logo: "/placeholder.svg?height=60&width=60",
    totalHired: 285,
    packageRange: "₹3.5-7 LPA",
    avgPackage: 4.2,
    locations: ["Pan India"],
    departments: ["All"],
    visitFrequency: "Annual",
    lastVisit: "2024",
    rating: 4.2,
    hiringTrend: "+5%",
    roles: ["System Engineer", "Assistant System Engineer", "Digital"],
    requirements: ["CGPA > 6.0", "No Backlogs", "Basic Programming"],
    selectionProcess: ["Aptitude Test", "Technical Interview", "HR Interview"],
    yearlyHiring: [
      { year: "2020", hired: 245 },
      { year: "2021", hired: 255 },
      { year: "2022", hired: 265 },
      { year: "2023", hired: 275 },
      { year: "2024", hired: 285 },
    ],
    departmentWise: [
      { dept: "CSE", hired: 85, applied: 180 },
      { dept: "IT", hired: 72, applied: 145 },
      { dept: "ECE", hired: 58, applied: 125 },
      { dept: "EEE", hired: 45, applied: 95 },
      { dept: "MECH", hired: 25, applied: 85 },
    ],
  },
  {
    id: "infosys",
    name: "Infosys",
    type: "Service",
    tier: "Tier 2",
    logo: "/placeholder.svg?height=60&width=60",
    totalHired: 225,
    packageRange: "₹4-8 LPA",
    avgPackage: 5.2,
    locations: ["Bangalore", "Mysore", "Pune", "Chennai"],
    departments: ["All"],
    visitFrequency: "Annual",
    lastVisit: "2024",
    rating: 4.3,
    hiringTrend: "+3%",
    roles: ["Systems Engineer", "Specialist Programmer", "Power Programmer"],
    requirements: ["CGPA > 6.5", "No Active Backlogs", "Communication Skills"],
    selectionProcess: ["Online Test", "Technical Interview", "HR Interview"],
    yearlyHiring: [
      { year: "2020", hired: 195 },
      { year: "2021", hired: 205 },
      { year: "2022", hired: 215 },
      { year: "2023", hired: 220 },
      { year: "2024", hired: 225 },
    ],
    departmentWise: [
      { dept: "CSE", hired: 68, applied: 145 },
      { dept: "IT", hired: 58, applied: 125 },
      { dept: "ECE", hired: 45, applied: 95 },
      { dept: "EEE", hired: 35, applied: 75 },
      { dept: "MECH", hired: 19, applied: 65 },
    ],
  },
]

const companyStats = {
  totalCompanies: 156,
  productCompanies: 45,
  serviceCompanies: 89,
  startups: 22,
  tier1Companies: 25,
  tier2Companies: 68,
  tier3Companies: 63,
  newCompanies: 18,
  returningCompanies: 138,
}

export default function CompanyStatisticsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedTier, setSelectedTier] = useState("all")
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  const filteredCompanies = companyData.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || company.type.toLowerCase() === selectedType
    const matchesTier = selectedTier === "all" || company.tier.toLowerCase().replace(" ", "") === selectedTier
    return matchesSearch && matchesType && matchesTier
  })

  const selectedCompanyData = companyData.find((c) => c.id === selectedCompany)

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/statistics">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Statistics
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Company Statistics</h1>
              <p className="text-muted-foreground text-lg">
                Detailed analysis of recruiting companies and hiring patterns
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Company Overview Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{companyStats.totalCompanies}</div>
              <p className="text-sm text-green-600 flex items-center mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />+{companyStats.newCompanies} new this year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Product Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{companyStats.productCompanies}</div>
              <p className="text-sm text-muted-foreground mt-2">
                {Math.round((companyStats.productCompanies / companyStats.totalCompanies) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Service Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{companyStats.serviceCompanies}</div>
              <p className="text-sm text-muted-foreground mt-2">
                {Math.round((companyStats.serviceCompanies / companyStats.totalCompanies) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Dream Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{companyStats.tier1Companies}</div>
              <p className="text-sm text-muted-foreground mt-2">Tier 1 companies</p>
            </CardContent>
          </Card>
        </div>

        {selectedCompany ? (
          // Individual Company Details
          selectedCompanyData && (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedCompanyData.logo || "/placeholder.svg"}
                        alt={selectedCompanyData.name}
                        className="w-16 h-16 rounded-lg border"
                      />
                      <div>
                        <CardTitle className="text-2xl">{selectedCompanyData.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={selectedCompanyData.type === "Product" ? "default" : "secondary"}>
                            {selectedCompanyData.type}
                          </Badge>
                          <Badge variant="outline">{selectedCompanyData.tier}</Badge>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{selectedCompanyData.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedCompany(null)}>
                      Back to List
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-green-600">{selectedCompanyData.totalHired}</div>
                      <div className="text-sm text-muted-foreground">Students Hired</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-blue-600">₹{selectedCompanyData.avgPackage}L</div>
                      <div className="text-sm text-muted-foreground">Average Package</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-purple-600">{selectedCompanyData.departments.length}</div>
                      <div className="text-sm text-muted-foreground">Departments</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-orange-600">{selectedCompanyData.locations.length}</div>
                      <div className="text-sm text-muted-foreground">Locations</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="hiring">Hiring Pattern</TabsTrigger>
                  <TabsTrigger value="departments">Departments</TabsTrigger>
                  <TabsTrigger value="process">Selection Process</TabsTrigger>
                  <TabsTrigger value="trends">Historical Trends</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Package Range</div>
                            <div className="font-semibold">{selectedCompanyData.packageRange}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Visit Frequency</div>
                            <div className="font-semibold">{selectedCompanyData.visitFrequency}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Last Visit</div>
                            <div className="font-semibold">{selectedCompanyData.lastVisit}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Hiring Trend</div>
                            <div className="font-semibold text-green-600">{selectedCompanyData.hiringTrend}</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Locations</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedCompanyData.locations.map((location, index) => (
                              <Badge key={index} variant="outline" className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                {location}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Job Roles</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedCompanyData.roles.map((role, index) => (
                              <Badge key={index} variant="secondary">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Requirements & Process</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Eligibility Requirements</div>
                          <ul className="text-sm space-y-1">
                            {selectedCompanyData.requirements.map((req, index) => (
                              <li key={index} className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Selection Process</div>
                          <div className="space-y-2">
                            {selectedCompanyData.selectionProcess.map((step, index) => (
                              <div key={index} className="flex items-center text-sm">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                                  {index + 1}
                                </div>
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="hiring" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hiring Statistics</CardTitle>
                      <CardDescription>Detailed breakdown of hiring numbers and patterns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium mb-4">5-Year Hiring Trend</h4>
                          <div className="space-y-3">
                            {selectedCompanyData.yearlyHiring.map((year, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm font-medium w-12">{year.year}</span>
                                <div className="flex-1 mx-4">
                                  <Progress
                                    value={
                                      (year.hired / Math.max(...selectedCompanyData.yearlyHiring.map((y) => y.hired))) *
                                      100
                                    }
                                    className="h-3"
                                  />
                                </div>
                                <span className="text-sm font-bold w-12 text-right">{year.hired}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-4">Growth Analysis</h4>
                          <div className="space-y-4">
                            <div className="p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">
                                +{selectedCompanyData.yearlyHiring[4].hired - selectedCompanyData.yearlyHiring[0].hired}
                              </div>
                              <div className="text-sm text-muted-foreground">Total growth over 5 years</div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                                {Math.round(
                                  ((selectedCompanyData.yearlyHiring[4].hired -
                                    selectedCompanyData.yearlyHiring[0].hired) /
                                    selectedCompanyData.yearlyHiring[0].hired) *
                                    100,
                                )}
                                %
                              </div>
                              <div className="text-sm text-muted-foreground">Percentage growth</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="departments" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Department-wise Hiring</CardTitle>
                      <CardDescription>Hiring breakdown by department</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {selectedCompanyData.departmentWise.map((dept, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{dept.dept}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {dept.hired} hired out of {dept.applied} applications
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-green-600">
                                  {Math.round((dept.hired / dept.applied) * 100)}%
                                </div>
                                <div className="text-sm text-muted-foreground">success rate</div>
                              </div>
                            </div>
                            <Progress value={(dept.hired / dept.applied) * 100} className="h-3" />
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Applied: {dept.applied}</span>
                              <span>Selected: {dept.hired}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="process" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Selection Process Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedCompanyData.selectionProcess.map((step, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                  {index + 1}
                                </div>
                                <h4 className="font-medium">{step}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground ml-11">
                                {step === "Online Test" && "Aptitude, Technical, and Logical Reasoning"}
                                {step === "Technical Interview" && "Data Structures, Algorithms, and System Design"}
                                {step === "HR Interview" && "Behavioral questions and cultural fit assessment"}
                                {step === "Coding Round" && "Programming problems and code optimization"}
                                {step === "Managerial Round" && "Leadership scenarios and project discussions"}
                                {step === "Bar Raiser" && "Amazon's high-bar interview process"}
                                {step === "Online Assessment" && "Comprehensive evaluation of technical skills"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Success Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="font-medium text-green-800">Preparation Focus</div>
                            <div className="text-sm text-green-700 mt-1">
                              {selectedCompanyData.type === "Product"
                                ? "Focus on Data Structures, Algorithms, and System Design"
                                : "Strengthen fundamentals and communication skills"}
                            </div>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="font-medium text-blue-800">Key Requirements</div>
                            <div className="text-sm text-blue-700 mt-1">
                              Maintain CGPA above{" "}
                              {selectedCompanyData.requirements[0]?.includes("8.0")
                                ? "8.0"
                                : selectedCompanyData.requirements[0]?.includes("7.5")
                                  ? "7.5"
                                  : "7.0"}
                            </div>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <div className="font-medium text-purple-800">Interview Tips</div>
                            <div className="text-sm text-purple-700 mt-1">
                              Practice coding problems and prepare for behavioral questions
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="trends" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Historical Analysis</CardTitle>
                      <CardDescription>Long-term trends and patterns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="text-center space-y-2">
                          <div className="text-3xl font-bold text-green-600">
                            {selectedCompanyData.yearlyHiring.length}
                          </div>
                          <div className="text-sm text-muted-foreground">Years of Partnership</div>
                        </div>
                        <div className="text-center space-y-2">
                          <div className="text-3xl font-bold text-blue-600">
                            {selectedCompanyData.yearlyHiring.reduce((sum, year) => sum + year.hired, 0)}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Students Hired</div>
                        </div>
                        <div className="text-center space-y-2">
                          <div className="text-3xl font-bold text-purple-600">
                            {Math.round(
                              selectedCompanyData.yearlyHiring.reduce((sum, year) => sum + year.hired, 0) /
                                selectedCompanyData.yearlyHiring.length,
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">Average per Year</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )
        ) : (
          // Company List View
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search companies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Company Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedTier} onValueChange={setSelectedTier}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Company Tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tiers</SelectItem>
                      <SelectItem value="tier1">Tier 1</SelectItem>
                      <SelectItem value="tier2">Tier 2</SelectItem>
                      <SelectItem value="tier3">Tier 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Company Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCompanies.map((company, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedCompany(company.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-4">
                      <img
                        src={company.logo || "/placeholder.svg"}
                        alt={company.name}
                        className="w-12 h-12 rounded-lg border"
                      />
                      <div className="flex-1">
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={company.type === "Product" ? "default" : "secondary"} className="text-xs">
                            {company.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {company.tier}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Students Hired</div>
                        <div className="text-xl font-bold text-green-600">{company.totalHired}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Package Range</div>
                        <div className="font-semibold">{company.packageRange}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{company.rating}</span>
                      </div>
                      <div className="text-green-600 flex items-center">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        {company.hiringTrend}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="text-xs text-muted-foreground">{company.departments.join(", ")}</div>
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No companies found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
