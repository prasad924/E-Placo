"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  DollarSign,
  Calendar,
  Target,
  PieChart,
  LineChart,
} from "lucide-react"
import ExportReportsDialog from "./export-data"

const overallStats = [
  { title: "Total Students", value: "2,847", change: "+12%", trend: "up", icon: Users, color: "text-blue-600" },
  { title: "Companies Registered", value: "156", change: "+8%", trend: "up", icon: Building, color: "text-green-600" },
  { title: "Placement Rate", value: "87.5%", change: "+5.2%", trend: "up", icon: Target, color: "text-purple-600" },
  {
    title: "Average Package",
    value: "₹8.2 LPA",
    change: "+15%",
    trend: "up",
    icon: DollarSign,
    color: "text-orange-600",
  },
]

const departmentStats = [
  { dept: "Computer Science", students: 450, placed: 398, rate: 88.4, avgPackage: "₹12.5 LPA", highest: "₹45 LPA" },
  {
    dept: "Information Technology",
    students: 380,
    placed: 342,
    rate: 90.0,
    avgPackage: "₹11.8 LPA",
    highest: "₹42 LPA",
  },
  {
    dept: "Electronics & Communication",
    students: 320,
    placed: 276,
    rate: 86.3,
    avgPackage: "₹8.9 LPA",
    highest: "₹28 LPA",
  },
  {
    dept: "Electrical Engineering",
    students: 280,
    placed: 238,
    rate: 85.0,
    avgPackage: "₹7.8 LPA",
    highest: "₹25 LPA",
  },
  {
    dept: "Mechanical Engineering",
    students: 350,
    placed: 287,
    rate: 82.0,
    avgPackage: "₹6.5 LPA",
    highest: "₹22 LPA",
  },
  { dept: "Civil Engineering", students: 290, placed: 232, rate: 80.0, avgPackage: "₹5.8 LPA", highest: "₹18 LPA" },
]

const topCompanies = [
  { name: "Google", hired: 25, package: "₹25-45 LPA", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Microsoft", hired: 22, package: "₹22-38 LPA", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Amazon", hired: 35, package: "₹18-32 LPA", logo: "/placeholder.svg?height=40&width=40" },
  { name: "TCS", hired: 180, package: "₹3.5-7 LPA", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Infosys", hired: 145, package: "₹4-8 LPA", logo: "/placeholder.svg?height=40&width=40" },
  { name: "Wipro", hired: 120, package: "₹3.8-6.5 LPA", logo: "/placeholder.svg?height=40&width=40" },
]

const monthlyTrends = [
  { month: "Jan", applications: 1200, placements: 180, drives: 12 },
  { month: "Feb", applications: 1450, placements: 220, drives: 15 },
  { month: "Mar", applications: 1680, placements: 280, drives: 18 },
  { month: "Apr", applications: 1320, placements: 195, drives: 14 },
  { month: "May", applications: 980, placements: 145, drives: 10 },
  { month: "Jun", applications: 1150, placements: 168, drives: 11 },
]

export function Analytics() {
  const [showExportReports, setShowExportReports] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive placement analytics and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setShowExportReports(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          {showExportReports && <ExportReportsDialog onClose={() => setShowExportReports(false)} />}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overallStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span> from last
                period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="salary">Salary Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5" />
                  Placement Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Product Companies</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Service Companies</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Startups</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  Monthly Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTrends.slice(-3).map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 text-sm font-medium">{month.month}</div>
                        <div className="text-sm text-muted-foreground">{month.drives} drives</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{month.placements} placed</div>
                        <div className="text-xs text-muted-foreground">{month.applications} applications</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Metrics Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2,847</div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">2,491</div>
                  <div className="text-sm text-muted-foreground">Students Placed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">89</div>
                  <div className="text-sm text-muted-foreground">Active Drives</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Performance</CardTitle>
              <CardDescription>Placement statistics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{dept.dept}</h4>
                        <p className="text-sm text-muted-foreground">
                          {dept.placed}/{dept.students} students placed
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{dept.rate}%</div>
                        <div className="text-sm text-muted-foreground">placement rate</div>
                      </div>
                    </div>
                    <Progress value={dept.rate} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Avg: {dept.avgPackage}</span>
                      <span>Highest: {dept.highest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Recruiting Companies</CardTitle>
              <CardDescription>Companies with highest hiring numbers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img src={company.logo || "/placeholder.svg"} alt={company.name} className="h-10 w-10 rounded" />
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-sm text-muted-foreground">{company.package}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{company.hired}</div>
                      <div className="text-sm text-muted-foreground">students hired</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="mr-2 h-5 w-5" />
                  Application Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTrends.map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-12">{month.month}</span>
                      <div className="flex-1 mx-4">
                        <Progress value={(month.applications / 2000) * 100} className="h-2" />
                      </div>
                      <span className="text-sm text-muted-foreground w-16 text-right">{month.applications}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Placement Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTrends.map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-12">{month.month}</span>
                      <div className="flex-1 mx-4">
                        <Progress value={(month.placements / 300) * 100} className="h-2" />
                      </div>
                      <span className="text-sm text-muted-foreground w-16 text-right">{month.placements}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="salary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Salary Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">₹20+ LPA</span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                  <Progress value={8} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">₹10-20 LPA</span>
                    <span className="text-sm font-medium">22%</span>
                  </div>
                  <Progress value={22} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">₹5-10 LPA</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">₹3-5 LPA</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Package Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-600">₹45 LPA</div>
                  <div className="text-sm text-muted-foreground">Highest Package</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-600">₹8.2 LPA</div>
                  <div className="text-sm text-muted-foreground">Average Package</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-orange-600">₹3.5 LPA</div>
                  <div className="text-sm text-muted-foreground">Median Package</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-600">+15%</div>
                  <div className="text-sm text-muted-foreground">Average Package Growth</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-600">+12%</div>
                  <div className="text-sm text-muted-foreground">Placement Rate Growth</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-purple-600">+8%</div>
                  <div className="text-sm text-muted-foreground">Company Participation</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
