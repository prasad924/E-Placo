"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  TrendingUp,
  Users,
  Building,
  DollarSign,
  Award,
  Target,
  BarChart3,
  PieChart,
} from "lucide-react"
import Link from "next/link"

const departmentData = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    shortName: "CSE",
    total: 450,
    placed: 415,
    rate: 92.2,
    avgPackage: 12.5,
    medianPackage: 10.8,
    highest: 45,
    lowest: 3.5,
    companies: 45,
    offers: 628,
    multipleOffers: 185,
    color: "blue",
    trend: "+5.2%",
    yearlyData: [
      { year: "2020", rate: 78.5, avg: 8.2 },
      { year: "2021", rate: 82.1, avg: 9.5 },
      { year: "2022", rate: 87.3, avg: 11.2 },
      { year: "2023", rate: 89.8, avg: 11.8 },
      { year: "2024", rate: 92.2, avg: 12.5 },
    ],
    topCompanies: [
      { name: "Google", hired: 8, package: "₹25-45 LPA" },
      { name: "Microsoft", hired: 12, package: "₹22-38 LPA" },
      { name: "Amazon", hired: 15, package: "₹18-32 LPA" },
      { name: "TCS", hired: 45, package: "₹3.5-7 LPA" },
      { name: "Infosys", hired: 38, package: "₹4-8 LPA" },
    ],
    salaryDistribution: [
      { range: "₹20+ LPA", count: 62, percentage: 15 },
      { range: "₹10-20 LPA", count: 145, percentage: 35 },
      { range: "₹5-10 LPA", count: 166, percentage: 40 },
      { range: "₹3-5 LPA", count: 42, percentage: 10 },
    ],
  },
  {
    id: "it",
    name: "Information Technology",
    shortName: "IT",
    total: 380,
    placed: 342,
    rate: 90.0,
    avgPackage: 11.8,
    medianPackage: 10.2,
    highest: 42,
    lowest: 3.5,
    companies: 42,
    offers: 485,
    multipleOffers: 145,
    color: "green",
    trend: "+4.8%",
    yearlyData: [
      { year: "2020", rate: 75.2, avg: 7.8 },
      { year: "2021", rate: 79.5, avg: 8.9 },
      { year: "2022", rate: 84.1, avg: 10.1 },
      { year: "2023", rate: 87.2, avg: 11.2 },
      { year: "2024", rate: 90.0, avg: 11.8 },
    ],
    topCompanies: [
      { name: "Microsoft", hired: 10, package: "₹22-38 LPA" },
      { name: "Adobe", hired: 6, package: "₹20-35 LPA" },
      { name: "Amazon", hired: 12, package: "₹18-32 LPA" },
      { name: "TCS", hired: 42, package: "₹3.5-7 LPA" },
      { name: "Wipro", hired: 35, package: "₹3.8-6.5 LPA" },
    ],
    salaryDistribution: [
      { range: "₹20+ LPA", count: 48, percentage: 14 },
      { range: "₹10-20 LPA", count: 116, percentage: 34 },
      { range: "₹5-10 LPA", count: 137, percentage: 40 },
      { range: "₹3-5 LPA", count: 41, percentage: 12 },
    ],
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering",
    shortName: "ECE",
    total: 320,
    placed: 276,
    rate: 86.3,
    avgPackage: 8.9,
    medianPackage: 7.5,
    highest: 28,
    lowest: 3.2,
    companies: 38,
    offers: 342,
    multipleOffers: 85,
    color: "purple",
    trend: "+3.5%",
    yearlyData: [
      { year: "2020", rate: 72.1, avg: 6.2 },
      { year: "2021", rate: 75.8, avg: 7.1 },
      { year: "2022", rate: 79.5, avg: 7.8 },
      { year: "2023", rate: 82.8, avg: 8.4 },
      { year: "2024", rate: 86.3, avg: 8.9 },
    ],
    topCompanies: [
      { name: "Qualcomm", hired: 8, package: "₹15-28 LPA" },
      { name: "Intel", hired: 6, package: "₹12-22 LPA" },
      { name: "TCS", hired: 38, package: "₹3.5-7 LPA" },
      { name: "Infosys", hired: 32, package: "₹4-8 LPA" },
      { name: "L&T", hired: 25, package: "₹4.5-8.5 LPA" },
    ],
    salaryDistribution: [
      { range: "₹15+ LPA", count: 22, percentage: 8 },
      { range: "₹8-15 LPA", count: 69, percentage: 25 },
      { range: "₹5-8 LPA", count: 124, percentage: 45 },
      { range: "₹3-5 LPA", count: 61, percentage: 22 },
    ],
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engineering",
    shortName: "EEE",
    total: 280,
    placed: 238,
    rate: 85.0,
    avgPackage: 7.8,
    medianPackage: 6.8,
    highest: 25,
    lowest: 3.0,
    companies: 35,
    offers: 295,
    multipleOffers: 68,
    color: "orange",
    trend: "+2.8%",
    yearlyData: [
      { year: "2020", rate: 70.5, avg: 5.8 },
      { year: "2021", rate: 74.2, avg: 6.5 },
      { year: "2022", rate: 78.1, avg: 7.1 },
      { year: "2023", rate: 82.2, avg: 7.4 },
      { year: "2024", rate: 85.0, avg: 7.8 },
    ],
    topCompanies: [
      { name: "Siemens", hired: 12, package: "₹8-18 LPA" },
      { name: "ABB", hired: 8, package: "₹7-15 LPA" },
      { name: "TCS", hired: 35, package: "₹3.5-7 LPA" },
      { name: "Infosys", hired: 28, package: "₹4-8 LPA" },
      { name: "L&T", hired: 22, package: "₹4.5-8.5 LPA" },
    ],
    salaryDistribution: [
      { range: "₹12+ LPA", count: 17, percentage: 7 },
      { range: "₹7-12 LPA", count: 57, percentage: 24 },
      { range: "₹4-7 LPA", count: 119, percentage: 50 },
      { range: "₹3-4 LPA", count: 45, percentage: 19 },
    ],
  },
  {
    id: "mech",
    name: "Mechanical Engineering",
    shortName: "MECH",
    total: 350,
    placed: 287,
    rate: 82.0,
    avgPackage: 6.5,
    medianPackage: 5.8,
    highest: 22,
    lowest: 2.8,
    companies: 32,
    offers: 325,
    multipleOffers: 58,
    color: "red",
    trend: "+1.8%",
    yearlyData: [
      { year: "2020", rate: 68.2, avg: 4.8 },
      { year: "2021", rate: 72.5, avg: 5.2 },
      { year: "2022", rate: 76.8, avg: 5.8 },
      { year: "2023", rate: 80.2, avg: 6.1 },
      { year: "2024", rate: 82.0, avg: 6.5 },
    ],
    topCompanies: [
      { name: "Tata Motors", hired: 18, package: "₹6-15 LPA" },
      { name: "Mahindra", hired: 15, package: "₹5-12 LPA" },
      { name: "L&T", hired: 25, package: "₹4.5-8.5 LPA" },
      { name: "TCS", hired: 32, package: "₹3.5-7 LPA" },
      { name: "Infosys", hired: 25, package: "₹4-8 LPA" },
    ],
    salaryDistribution: [
      { range: "₹10+ LPA", count: 23, percentage: 8 },
      { range: "₹6-10 LPA", count: 69, percentage: 24 },
      { range: "₹4-6 LPA", count: 143, percentage: 50 },
      { range: "₹2.8-4 LPA", count: 52, percentage: 18 },
    ],
  },
  {
    id: "civil",
    name: "Civil Engineering",
    shortName: "CIVIL",
    total: 290,
    placed: 232,
    rate: 80.0,
    avgPackage: 5.8,
    medianPackage: 5.2,
    highest: 18,
    lowest: 2.5,
    companies: 28,
    offers: 268,
    multipleOffers: 42,
    color: "indigo",
    trend: "+1.2%",
    yearlyData: [
      { year: "2020", rate: 65.8, avg: 4.2 },
      { year: "2021", rate: 69.5, avg: 4.6 },
      { year: "2022", rate: 74.2, avg: 5.1 },
      { year: "2023", rate: 78.8, avg: 5.5 },
      { year: "2024", rate: 80.0, avg: 5.8 },
    ],
    topCompanies: [
      { name: "L&T", hired: 28, package: "₹4.5-8.5 LPA" },
      { name: "Godrej", hired: 15, package: "₹4-7 LPA" },
      { name: "TCS", hired: 28, package: "₹3.5-7 LPA" },
      { name: "Infosys", hired: 22, package: "₹4-8 LPA" },
      { name: "Shapoorji Pallonji", hired: 18, package: "₹3.8-6.5 LPA" },
    ],
    salaryDistribution: [
      { range: "₹8+ LPA", count: 19, percentage: 8 },
      { range: "₹5-8 LPA", count: 58, percentage: 25 },
      { range: "₹3.5-5 LPA", count: 116, percentage: 50 },
      { range: "₹2.5-3.5 LPA", count: 39, percentage: 17 },
    ],
  },
]

export default function DepartmentStatisticsPage() {
  const [selectedDept, setSelectedDept] = useState("all")
  const [timeRange, setTimeRange] = useState("2024")

  const selectedDepartment = departmentData.find((dept) => dept.id === selectedDept)

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
              <h1 className="text-4xl font-bold tracking-tight">Department Statistics</h1>
              <p className="text-muted-foreground text-lg">Detailed analysis of placement performance by department</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departmentData.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.shortName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {selectedDept === "all" ? (
          // All Departments Overview
          <div className="space-y-8">
            {/* Comparison Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {departmentData.map((dept, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedDept(dept.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{dept.shortName}</CardTitle>
                      <Badge variant="outline" className={`text-${dept.color}-600`}>
                        {dept.rate}%
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{dept.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>
                        Placed: {dept.placed}/{dept.total}
                      </span>
                      <span className="text-green-600 flex items-center">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        {dept.trend}
                      </span>
                    </div>
                    <Progress value={dept.rate} className="h-2" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Avg Package</div>
                        <div className="font-semibold">₹{dept.avgPackage} LPA</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Highest</div>
                        <div className="font-semibold">₹{dept.highest} LPA</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparative Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Department Comparison</CardTitle>
                <CardDescription>Side-by-side comparison of key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Department</th>
                        <th className="text-center p-2">Students</th>
                        <th className="text-center p-2">Placed</th>
                        <th className="text-center p-2">Rate</th>
                        <th className="text-center p-2">Avg Package</th>
                        <th className="text-center p-2">Highest</th>
                        <th className="text-center p-2">Companies</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentData.map((dept, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{dept.shortName}</td>
                          <td className="text-center p-2">{dept.total}</td>
                          <td className="text-center p-2">{dept.placed}</td>
                          <td className="text-center p-2">
                            <Badge variant="outline" className={`text-${dept.color}-600`}>
                              {dept.rate}%
                            </Badge>
                          </td>
                          <td className="text-center p-2">₹{dept.avgPackage} LPA</td>
                          <td className="text-center p-2">₹{dept.highest} LPA</td>
                          <td className="text-center p-2">{dept.companies}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Individual Department Details
          selectedDepartment && (
            <div className="space-y-8">
              {/* Department Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{selectedDepartment.name}</CardTitle>
                  <CardDescription>Comprehensive placement analysis for {selectedDepartment.shortName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-blue-600">{selectedDepartment.total}</div>
                      <div className="text-sm text-muted-foreground">Total Students</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-green-600">{selectedDepartment.placed}</div>
                      <div className="text-sm text-muted-foreground">Students Placed</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-purple-600">{selectedDepartment.rate}%</div>
                      <div className="text-sm text-muted-foreground">Placement Rate</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-orange-600">₹{selectedDepartment.avgPackage}L</div>
                      <div className="text-sm text-muted-foreground">Average Package</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="companies">Companies</TabsTrigger>
                  <TabsTrigger value="salary">Salary Analysis</TabsTrigger>
                  <TabsTrigger value="trends">Historical Trends</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="mr-2 h-5 w-5" />
                          Key Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Placement Rate</div>
                            <div className="text-2xl font-bold text-green-600">{selectedDepartment.rate}%</div>
                            <div className="text-xs text-green-600 flex items-center">
                              <TrendingUp className="mr-1 h-3 w-3" />
                              {selectedDepartment.trend}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Multiple Offers</div>
                            <div className="text-2xl font-bold text-blue-600">{selectedDepartment.multipleOffers}</div>
                            <div className="text-xs text-muted-foreground">
                              {Math.round((selectedDepartment.multipleOffers / selectedDepartment.placed) * 100)}% of
                              placed students
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Total Offers</div>
                            <div className="text-2xl font-bold text-purple-600">{selectedDepartment.offers}</div>
                            <div className="text-xs text-muted-foreground">
                              {(selectedDepartment.offers / selectedDepartment.placed).toFixed(1)} offers per student
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Companies</div>
                            <div className="text-2xl font-bold text-orange-600">{selectedDepartment.companies}</div>
                            <div className="text-xs text-muted-foreground">Participated in recruitment</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <DollarSign className="mr-2 h-5 w-5" />
                          Package Statistics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Highest Package</span>
                            <span className="font-semibold">₹{selectedDepartment.highest} LPA</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Average Package</span>
                            <span className="font-semibold">₹{selectedDepartment.avgPackage} LPA</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Median Package</span>
                            <span className="font-semibold">₹{selectedDepartment.medianPackage} LPA</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Lowest Package</span>
                            <span className="font-semibold">₹{selectedDepartment.lowest} LPA</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="companies" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Recruiting Companies</CardTitle>
                      <CardDescription>
                        Companies with highest hiring from {selectedDepartment.shortName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedDepartment.topCompanies.map((company, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Building className="h-6 w-6 text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium">{company.name}</div>
                                <div className="text-sm text-muted-foreground">{company.package}</div>
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
                </TabsContent>

                <TabsContent value="salary" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChart className="mr-2 h-5 w-5" />
                        Salary Distribution
                      </CardTitle>
                      <CardDescription>
                        Package distribution for {selectedDepartment.shortName} students
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {selectedDepartment.salaryDistribution.map((range, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{range.range}</span>
                              <div className="text-right">
                                <span className="text-sm font-bold">{range.count} students</span>
                                <span className="text-xs text-muted-foreground ml-2">({range.percentage}%)</span>
                              </div>
                            </div>
                            <Progress value={range.percentage} className="h-3" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="trends" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5" />
                        Historical Performance
                      </CardTitle>
                      <CardDescription>5-year trend analysis for {selectedDepartment.shortName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-5 gap-4">
                          {selectedDepartment.yearlyData.map((year, index) => (
                            <div key={index} className="text-center space-y-2">
                              <div className="text-sm font-medium">{year.year}</div>
                              <div className="space-y-1">
                                <div className="text-lg font-bold text-green-600">{year.rate}%</div>
                                <div className="text-xs text-muted-foreground">Placement Rate</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-lg font-bold text-blue-600">₹{year.avg}L</div>
                                <div className="text-xs text-muted-foreground">Avg Package</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-4">Growth Analysis</h4>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <div className="text-sm text-muted-foreground">Placement Rate Growth</div>
                              <div className="text-2xl font-bold text-green-600">
                                +
                                {(
                                  selectedDepartment.yearlyData[4].rate - selectedDepartment.yearlyData[0].rate
                                ).toFixed(1)}
                                %
                              </div>
                              <div className="text-xs text-muted-foreground">Over 5 years</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Package Growth</div>
                              <div className="text-2xl font-bold text-blue-600">
                                +₹
                                {(selectedDepartment.yearlyData[4].avg - selectedDepartment.yearlyData[0].avg).toFixed(
                                  1,
                                )}
                                L
                              </div>
                              <div className="text-xs text-muted-foreground">Over 5 years</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="performance" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Award className="mr-2 h-5 w-5" />
                          Performance Highlights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <span className="text-sm font-medium">Above Average Performers</span>
                            <span className="font-bold text-green-600">
                              {Math.round(selectedDepartment.placed * 0.3)} students
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <span className="text-sm font-medium">Dream Company Placements</span>
                            <span className="font-bold text-blue-600">
                              {selectedDepartment.topCompanies
                                .slice(0, 3)
                                .reduce((sum, company) => sum + company.hired, 0)}{" "}
                              students
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span className="text-sm font-medium">Multiple Offer Recipients</span>
                            <span className="font-bold text-purple-600">
                              {selectedDepartment.multipleOffers} students
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                            <span className="text-sm font-medium">High Package (₹15+ LPA)</span>
                            <span className="font-bold text-orange-600">
                              {selectedDepartment.salaryDistribution[0]?.count || 0} students
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Users className="mr-2 h-5 w-5" />
                          Student Categories
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Placed Students</span>
                              <span className="text-sm font-medium">{selectedDepartment.placed}</span>
                            </div>
                            <Progress
                              value={(selectedDepartment.placed / selectedDepartment.total) * 100}
                              className="h-2"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Unplaced Students</span>
                              <span className="text-sm font-medium">
                                {selectedDepartment.total - selectedDepartment.placed}
                              </span>
                            </div>
                            <Progress
                              value={
                                ((selectedDepartment.total - selectedDepartment.placed) / selectedDepartment.total) *
                                100
                              }
                              className="h-2"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Higher Studies</span>
                              <span className="text-sm font-medium">
                                {Math.round((selectedDepartment.total - selectedDepartment.placed) * 0.3)}
                              </span>
                            </div>
                            <Progress
                              value={
                                (((selectedDepartment.total - selectedDepartment.placed) * 0.3) /
                                  selectedDepartment.total) *
                                100
                              }
                              className="h-2"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm">Entrepreneurship</span>
                              <span className="text-sm font-medium">
                                {Math.round((selectedDepartment.total - selectedDepartment.placed) * 0.1)}
                              </span>
                            </div>
                            <Progress
                              value={
                                (((selectedDepartment.total - selectedDepartment.placed) * 0.1) /
                                  selectedDepartment.total) *
                                100
                              }
                              className="h-2"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )
        )}
      </div>
    </div>
  )
}
