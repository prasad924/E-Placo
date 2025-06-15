"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  DollarSign,
  Target,
  Download,
  Eye,
  Award,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
} from "lucide-react"
import Link from "next/link"

const overallStats = [
  {
    title: "Total Students",
    value: "3,247",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Students Placed",
    value: "2,841",
    change: "+12.5%",
    trend: "up",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Placement Rate",
    value: "87.5%",
    change: "+4.3%",
    trend: "up",
    icon: Award,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Average Package",
    value: "₹8.2 LPA",
    change: "+15.8%",
    trend: "up",
    icon: DollarSign,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Companies Visited",
    value: "156",
    change: "+6.8%",
    trend: "up",
    icon: Building,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Job Offers",
    value: "3,892",
    change: "+18.2%",
    trend: "up",
    icon: Briefcase,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
]

const quickStats = [
  { label: "Highest Package", value: "₹45 LPA", company: "Google", color: "text-green-600" },
  { label: "Most Hiring Company", value: "TCS", count: "180 students", color: "text-blue-600" },
  { label: "Top Department", value: "Computer Science", rate: "92.3%", color: "text-purple-600" },
  { label: "Dream Companies", value: "25", description: "Tier-1 companies", color: "text-orange-600" },
]

const recentPlacements = [
  {
    student: "Priya Sharma",
    company: "Google",
    package: "₹42 LPA",
    role: "Software Engineer",
    department: "Computer Science",
    date: "2 hours ago",
  },
  {
    student: "Rahul Patel",
    company: "Microsoft",
    package: "₹38 LPA",
    role: "Product Manager",
    department: "Information Technology",
    date: "5 hours ago",
  },
  {
    student: "Ananya Singh",
    company: "Amazon",
    package: "₹32 LPA",
    role: "SDE-1",
    department: "Computer Science",
    date: "1 day ago",
  },
  {
    student: "Vikram Kumar",
    company: "Flipkart",
    package: "₹28 LPA",
    role: "Frontend Developer",
    department: "Information Technology",
    date: "1 day ago",
  },
  {
    student: "Sneha Gupta",
    company: "Paytm",
    package: "₹25 LPA",
    role: "Data Scientist",
    department: "Computer Science",
    date: "2 days ago",
  },
]

const departmentOverview = [
  {
    name: "Computer Science",
    total: 450,
    placed: 415,
    rate: 92.2,
    avgPackage: "₹12.5 LPA",
    highest: "₹45 LPA",
    companies: 45,
  },
  {
    name: "Information Technology",
    total: 380,
    placed: 342,
    rate: 90.0,
    avgPackage: "₹11.8 LPA",
    highest: "₹42 LPA",
    companies: 42,
  },
  {
    name: "Electronics & Communication",
    total: 320,
    placed: 276,
    rate: 86.3,
    avgPackage: "₹8.9 LPA",
    highest: "₹28 LPA",
    companies: 38,
  },
  {
    name: "Electrical Engineering",
    total: 280,
    placed: 238,
    rate: 85.0,
    avgPackage: "₹7.8 LPA",
    highest: "₹25 LPA",
    companies: 35,
  },
  {
    name: "Mechanical Engineering",
    total: 350,
    placed: 287,
    rate: 82.0,
    avgPackage: "₹6.5 LPA",
    highest: "₹22 LPA",
    companies: 32,
  },
  {
    name: "Civil Engineering",
    total: 290,
    placed: 232,
    rate: 80.0,
    avgPackage: "₹5.8 LPA",
    highest: "₹18 LPA",
    companies: 28,
  },
]

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("2024")
  const [selectedDept, setSelectedDept] = useState("all")

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Placement Statistics</h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive analytics and insights for placement activities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">Academic Year 2024</SelectItem>
                <SelectItem value="2023">Academic Year 2023</SelectItem>
                <SelectItem value="2022">Academic Year 2022</SelectItem>
                <SelectItem value="all">All Years</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overall Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {overallStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-sm flex items-center mt-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="mr-1 h-4 w-4 text-red-600" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                  <span className="text-muted-foreground ml-1">from last year</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Insights */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground">
                    {stat.company && `at ${stat.company}`}
                    {stat.count && stat.count}
                    {stat.rate && `placement rate: ${stat.rate}`}
                    {stat.description && stat.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Placement Distribution
                  </CardTitle>
                  <CardDescription>Distribution across different company types</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Product Companies</span>
                      <span className="text-sm font-bold">28%</span>
                    </div>
                    <Progress value={28} className="h-3" />
                    <div className="text-xs text-muted-foreground">795 students placed</div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Service Companies</span>
                      <span className="text-sm font-bold">58%</span>
                    </div>
                    <Progress value={58} className="h-3" />
                    <div className="text-xs text-muted-foreground">1,648 students placed</div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Startups</span>
                      <span className="text-sm font-bold">14%</span>
                    </div>
                    <Progress value={14} className="h-3" />
                    <div className="text-xs text-muted-foreground">398 students placed</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Salary Distribution
                  </CardTitle>
                  <CardDescription>Package distribution across all placements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">₹20+ LPA</span>
                      <span className="text-sm font-bold">12%</span>
                    </div>
                    <Progress value={12} className="h-3" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">₹10-20 LPA</span>
                      <span className="text-sm font-bold">25%</span>
                    </div>
                    <Progress value={25} className="h-3" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">₹5-10 LPA</span>
                      <span className="text-sm font-bold">48%</span>
                    </div>
                    <Progress value={48} className="h-3" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">₹3-5 LPA</span>
                      <span className="text-sm font-bold">15%</span>
                    </div>
                    <Progress value={15} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Critical metrics for placement success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-blue-600">87.5%</div>
                    <div className="text-sm text-muted-foreground">Overall Placement Rate</div>
                    <Badge variant="secondary" className="text-xs">
                      Target: 85%
                    </Badge>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-green-600">₹8.2L</div>
                    <div className="text-sm text-muted-foreground">Average Package</div>
                    <Badge variant="secondary" className="text-xs">
                      +15.8% YoY
                    </Badge>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-purple-600">156</div>
                    <div className="text-sm text-muted-foreground">Companies Participated</div>
                    <Badge variant="secondary" className="text-xs">
                      +12 new companies
                    </Badge>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-orange-600">1.37</div>
                    <div className="text-sm text-muted-foreground">Offers per Student</div>
                    <Badge variant="secondary" className="text-xs">
                      Multiple offers
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department-wise Performance Analysis</CardTitle>
                <CardDescription>Detailed breakdown of placement statistics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {departmentOverview.map((dept, index) => (
                    <div key={index} className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{dept.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {dept.placed} out of {dept.total} students placed
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{dept.rate}%</div>
                          <div className="text-sm text-muted-foreground">placement rate</div>
                        </div>
                      </div>

                      <Progress value={dept.rate} className="h-3" />

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Average Package</div>
                          <div className="font-semibold">{dept.avgPackage}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Highest Package</div>
                          <div className="font-semibold">{dept.highest}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Companies Visited</div>
                          <div className="font-semibold">{dept.companies}</div>
                        </div>
                        <div className="flex justify-end">
                          <Link href={`/statistics/department/${dept.name.toLowerCase().replace(/\s+/g, "-")}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Recruiting Companies</CardTitle>
                  <CardDescription>Companies with highest hiring numbers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "TCS", hired: 180, package: "₹3.5-7 LPA", type: "Service" },
                      { name: "Infosys", hired: 145, package: "₹4-8 LPA", type: "Service" },
                      { name: "Wipro", hired: 120, package: "₹3.8-6.5 LPA", type: "Service" },
                      { name: "Accenture", hired: 95, package: "₹4.5-9 LPA", type: "Service" },
                      { name: "Cognizant", hired: 85, package: "₹4.2-8.5 LPA", type: "Service" },
                    ].map((company, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Building className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium">{company.name}</div>
                            <div className="text-sm text-muted-foreground">{company.package}</div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {company.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">{company.hired}</div>
                          <div className="text-sm text-muted-foreground">students hired</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dream Companies</CardTitle>
                  <CardDescription>Premium companies with top packages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Google", hired: 8, package: "₹25-45 LPA", type: "Product" },
                      { name: "Microsoft", hired: 12, package: "₹22-38 LPA", type: "Product" },
                      { name: "Amazon", hired: 15, package: "₹18-32 LPA", type: "Product" },
                      { name: "Adobe", hired: 6, package: "₹20-35 LPA", type: "Product" },
                      { name: "Salesforce", hired: 4, package: "₹18-28 LPA", type: "Product" },
                    ].map((company, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">{company.name}</div>
                            <div className="text-sm text-muted-foreground">{company.package}</div>
                            <Badge className="text-xs mt-1 bg-gradient-to-r from-blue-500 to-purple-600">
                              {company.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-purple-600">{company.hired}</div>
                          <div className="text-sm text-muted-foreground">students hired</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Recent Placements
                </CardTitle>
                <CardDescription>Latest placement updates and success stories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPlacements.map((placement, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {placement.student
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-medium">{placement.student}</div>
                          <div className="text-sm text-muted-foreground">{placement.department}</div>
                          <div className="text-sm text-muted-foreground">
                            {placement.role} at {placement.company}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{placement.package}</div>
                        <div className="text-sm text-muted-foreground">{placement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    View All Recent Placements
                    <Eye className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/statistics/departments">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Department Analysis
                    </CardTitle>
                    <CardDescription>Detailed department-wise statistics and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">6 Departments</div>
                    <p className="text-sm text-muted-foreground mt-2">Complete breakdown with historical data</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/statistics/companies">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      Company Reports
                    </CardTitle>
                    <CardDescription>Company-wise hiring patterns and analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">156 Companies</div>
                    <p className="text-sm text-muted-foreground mt-2">Hiring trends and company profiles</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/statistics/salary">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="mr-2 h-5 w-5" />
                      Salary Analytics
                    </CardTitle>
                    <CardDescription>Comprehensive salary distribution and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">₹8.2 LPA</div>
                    <p className="text-sm text-muted-foreground mt-2">Average with detailed breakdowns</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/statistics/trends">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Historical Trends
                    </CardTitle>
                    <CardDescription>Multi-year trends and comparative analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">5 Years</div>
                    <p className="text-sm text-muted-foreground mt-2">Historical data and projections</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/statistics/performance">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="mr-2 h-5 w-5" />
                      Performance Metrics
                    </CardTitle>
                    <CardDescription>Student performance and success factors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-pink-600">Top 10%</div>
                    <p className="text-sm text-muted-foreground mt-2">High-performer analysis</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/statistics/geography">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5" />
                      Geographic Distribution
                    </CardTitle>
                    <CardDescription>Location-wise placement distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-indigo-600">15 Cities</div>
                    <p className="text-sm text-muted-foreground mt-2">Major placement locations</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
