"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, TrendingUp, BarChart3, PieChart, Target, Award } from "lucide-react"
import Link from "next/link"

const salaryData = {
  overall: {
    average: 8.2,
    median: 7.5,
    highest: 45,
    lowest: 2.5,
    mode: 6.5,
    standardDeviation: 3.8,
  },
  distribution: [
    { range: "₹30+ LPA", count: 45, percentage: 1.6, companies: ["Google", "Microsoft", "Amazon"] },
    { range: "₹20-30 LPA", count: 128, percentage: 4.5, companies: ["Adobe", "Salesforce", "Netflix"] },
    { range: "₹15-20 LPA", count: 245, percentage: 8.6, companies: ["Flipkart", "Paytm", "Zomato"] },
    { range: "₹10-15 LPA", count: 456, percentage: 16.0, companies: ["Accenture", "Capgemini", "HCL"] },
    { range: "₹7-10 LPA", count: 789, percentage: 27.8, companies: ["TCS Digital", "Infosys Specialist"] },
    { range: "₹5-7 LPA", count: 892, percentage: 31.4, companies: ["TCS", "Infosys", "Wipro"] },
    { range: "₹3-5 LPA", count: 285, percentage: 10.0, companies: ["Local Companies", "Startups"] },
    { range: "Below ₹3 LPA", count: 1, percentage: 0.1, companies: ["Internships"] },
  ],
  departmentWise: [
    {
      dept: "Computer Science",
      avg: 12.5,
      median: 11.2,
      highest: 45,
      lowest: 3.5,
      distribution: [
        { range: "₹20+ LPA", percentage: 18 },
        { range: "₹10-20 LPA", percentage: 35 },
        { range: "₹5-10 LPA", percentage: 40 },
        { range: "₹3-5 LPA", percentage: 7 },
      ],
    },
    {
      dept: "Information Technology",
      avg: 11.8,
      median: 10.8,
      highest: 42,
      lowest: 3.5,
      distribution: [
        { range: "₹20+ LPA", percentage: 16 },
        { range: "₹10-20 LPA", percentage: 32 },
        { range: "₹5-10 LPA", percentage: 42 },
        { range: "₹3-5 LPA", percentage: 10 },
      ],
    },
    {
      dept: "Electronics & Communication",
      avg: 8.9,
      median: 7.8,
      highest: 28,
      lowest: 3.2,
      distribution: [
        { range: "₹15+ LPA", percentage: 12 },
        { range: "₹8-15 LPA", percentage: 28 },
        { range: "₹5-8 LPA", percentage: 45 },
        { range: "₹3-5 LPA", percentage: 15 },
      ],
    },
    {
      dept: "Electrical Engineering",
      avg: 7.8,
      median: 6.9,
      highest: 25,
      lowest: 3.0,
      distribution: [
        { range: "₹12+ LPA", percentage: 8 },
        { range: "₹7-12 LPA", percentage: 25 },
        { range: "₹4-7 LPA", percentage: 52 },
        { range: "₹3-4 LPA", percentage: 15 },
      ],
    },
    {
      dept: "Mechanical Engineering",
      avg: 6.5,
      median: 5.8,
      highest: 22,
      lowest: 2.8,
      distribution: [
        { range: "₹10+ LPA", percentage: 6 },
        { range: "₹6-10 LPA", percentage: 22 },
        { range: "₹4-6 LPA", percentage: 58 },
        { range: "₹2.8-4 LPA", percentage: 14 },
      ],
    },
    {
      dept: "Civil Engineering",
      avg: 5.8,
      median: 5.2,
      highest: 18,
      lowest: 2.5,
      distribution: [
        { range: "₹8+ LPA", percentage: 5 },
        { range: "₹5-8 LPA", percentage: 28 },
        { range: "₹3.5-5 LPA", percentage: 52 },
        { range: "₹2.5-3.5 LPA", percentage: 15 },
      ],
    },
  ],
  companyWise: [
    { company: "Google", avgPackage: 35, range: "₹25-45 LPA", hired: 25, type: "Product" },
    { company: "Microsoft", avgPackage: 28, range: "₹22-38 LPA", hired: 32, type: "Product" },
    { company: "Amazon", avgPackage: 24, range: "₹18-32 LPA", hired: 42, type: "Product" },
    { company: "Adobe", avgPackage: 26, range: "₹20-35 LPA", hired: 18, type: "Product" },
    { company: "Salesforce", avgPackage: 22, range: "₹18-28 LPA", hired: 15, type: "Product" },
    { company: "TCS", avgPackage: 4.2, range: "₹3.5-7 LPA", hired: 285, type: "Service" },
    { company: "Infosys", avgPackage: 5.2, range: "₹4-8 LPA", hired: 225, type: "Service" },
    { company: "Wipro", avgPackage: 4.8, range: "₹3.8-6.5 LPA", hired: 185, type: "Service" },
  ],
  yearlyTrends: [
    { year: "2020", avg: 6.8, median: 6.2, highest: 32 },
    { year: "2021", avg: 7.2, median: 6.5, highest: 38 },
    { year: "2022", avg: 7.8, median: 7.0, highest: 42 },
    { year: "2023", avg: 8.0, median: 7.2, highest: 43 },
    { year: "2024", avg: 8.2, median: 7.5, highest: 45 },
  ],
  locationWise: [
    { location: "Bangalore", avg: 9.5, companies: 45, students: 892 },
    { location: "Hyderabad", avg: 8.8, companies: 38, students: 654 },
    { location: "Pune", avg: 8.2, companies: 32, students: 445 },
    { location: "Chennai", avg: 7.9, companies: 28, students: 398 },
    { location: "Mumbai", avg: 9.2, companies: 25, students: 285 },
    { location: "Delhi NCR", avg: 8.6, companies: 22, students: 218 },
  ],
}

export default function SalaryStatisticsPage() {
  const [selectedDept, setSelectedDept] = useState("all")
  const [selectedYear, setSelectedYear] = useState("2024")

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
              <h1 className="text-4xl font-bold tracking-tight">Salary Analytics</h1>
              <p className="text-muted-foreground text-lg">
                Comprehensive analysis of placement packages and compensation trends
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="all">All Years</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Salary Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Package</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">₹{salaryData.overall.average} LPA</div>
              <p className="text-sm text-green-600 flex items-center mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                +15.8% from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Median Package</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">₹{salaryData.overall.median} LPA</div>
              <p className="text-sm text-blue-600 flex items-center mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                +12.5% from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Highest Package</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">₹{salaryData.overall.highest} LPA</div>
              <p className="text-sm text-muted-foreground mt-2">Offered by Google</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Package Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                ₹{salaryData.overall.lowest}-{salaryData.overall.highest}L
              </div>
              <p className="text-sm text-muted-foreground mt-2">Full spectrum</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="distribution" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="distribution" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    Salary Distribution
                  </CardTitle>
                  <CardDescription>Distribution of packages across all placements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salaryData.distribution.map((range, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{range.range}</span>
                          <div className="text-right">
                            <span className="text-sm font-bold">{range.count} students</span>
                            <span className="text-xs text-muted-foreground ml-2">({range.percentage}%)</span>
                          </div>
                        </div>
                        <Progress value={range.percentage} className="h-3" />
                        <div className="text-xs text-muted-foreground">
                          Top companies: {range.companies.slice(0, 2).join(", ")}
                          {range.companies.length > 2 && ` +${range.companies.length - 2} more`}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Statistical Summary
                  </CardTitle>
                  <CardDescription>Key statistical measures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">₹{salaryData.overall.average}L</div>
                        <div className="text-sm text-muted-foreground">Mean</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">₹{salaryData.overall.median}L</div>
                        <div className="text-sm text-muted-foreground">Median</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">₹{salaryData.overall.mode}L</div>
                        <div className="text-sm text-muted-foreground">Mode</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          ±{salaryData.overall.standardDeviation}L
                        </div>
                        <div className="text-sm text-muted-foreground">Std Dev</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">75th Percentile</span>
                        <span className="font-bold">₹12.5 LPA</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">25th Percentile</span>
                        <span className="font-bold">₹5.2 LPA</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Interquartile Range</span>
                        <span className="font-bold">₹7.3 LPA</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department-wise Salary Analysis</CardTitle>
                <CardDescription>Salary statistics broken down by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {salaryData.departmentWise.map((dept, index) => (
                    <div key={index} className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{dept.dept}</h3>
                          <p className="text-sm text-muted-foreground">
                            Average: ₹{dept.avg} LPA | Median: ₹{dept.median} LPA
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">₹{dept.highest} LPA</div>
                          <div className="text-sm text-muted-foreground">Highest Package</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Average</div>
                          <div className="text-lg font-bold">₹{dept.avg} LPA</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Median</div>
                          <div className="text-lg font-bold">₹{dept.median} LPA</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Highest</div>
                          <div className="text-lg font-bold">₹{dept.highest} LPA</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Lowest</div>
                          <div className="text-lg font-bold">₹{dept.lowest} LPA</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Package Distribution</h4>
                        {dept.distribution.map((range, rangeIndex) => (
                          <div key={rangeIndex} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">{range.range}</span>
                              <span className="text-sm font-medium">{range.percentage}%</span>
                            </div>
                            <Progress value={range.percentage} className="h-2" />
                          </div>
                        ))}
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
                  <CardTitle>Top Paying Companies</CardTitle>
                  <CardDescription>Companies offering highest average packages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salaryData.companyWise
                      .sort((a, b) => b.avgPackage - a.avgPackage)
                      .slice(0, 8)
                      .map((company, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                              {company.company.substring(0, 2)}
                            </div>
                            <div>
                              <div className="font-medium">{company.company}</div>
                              <div className="text-sm text-muted-foreground">{company.range}</div>
                              <Badge
                                variant={company.type === "Product" ? "default" : "secondary"}
                                className="text-xs mt-1"
                              >
                                {company.type}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">₹{company.avgPackage}L</div>
                            <div className="text-sm text-muted-foreground">{company.hired} hired</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Company Type Analysis</CardTitle>
                  <CardDescription>Salary comparison by company type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-blue-800">Product Companies</h4>
                          <Badge className="bg-blue-600">Premium</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-blue-700">Average Package</div>
                            <div className="text-xl font-bold text-blue-800">₹26.2 LPA</div>
                          </div>
                          <div>
                            <div className="text-blue-700">Students Hired</div>
                            <div className="text-xl font-bold text-blue-800">132</div>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-blue-700">
                          Top companies: Google, Microsoft, Amazon, Adobe
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-green-800">Service Companies</h4>
                          <Badge variant="secondary">Volume</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-green-700">Average Package</div>
                            <div className="text-xl font-bold text-green-800">₹4.8 LPA</div>
                          </div>
                          <div>
                            <div className="text-green-700">Students Hired</div>
                            <div className="text-xl font-bold text-green-800">695</div>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-green-700">Top companies: TCS, Infosys, Wipro, Accenture</div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-purple-800">Startups</h4>
                          <Badge variant="outline">Growth</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-purple-700">Average Package</div>
                            <div className="text-xl font-bold text-purple-800">₹8.5 LPA</div>
                          </div>
                          <div>
                            <div className="text-purple-700">Students Hired</div>
                            <div className="text-xl font-bold text-purple-800">85</div>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-purple-700">
                          Emerging companies with high growth potential
                        </div>
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
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  5-Year Salary Trends
                </CardTitle>
                <CardDescription>Historical analysis of package growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-5 gap-4">
                    {salaryData.yearlyTrends.map((year, index) => (
                      <div key={index} className="text-center space-y-3">
                        <div className="text-lg font-bold">{year.year}</div>
                        <div className="space-y-2">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="text-lg font-bold text-green-600">₹{year.avg}L</div>
                            <div className="text-xs text-muted-foreground">Average</div>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="text-lg font-bold text-blue-600">₹{year.median}L</div>
                            <div className="text-xs text-muted-foreground">Median</div>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <div className="text-lg font-bold text-purple-600">₹{year.highest}L</div>
                            <div className="text-xs text-muted-foreground">Highest</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">
                        +₹{(salaryData.yearlyTrends[4].avg - salaryData.yearlyTrends[0].avg).toFixed(1)}L
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Average Growth (5 years)</div>
                      <div className="text-xs text-green-600 mt-1">
                        +
                        {Math.round(
                          ((salaryData.yearlyTrends[4].avg - salaryData.yearlyTrends[0].avg) /
                            salaryData.yearlyTrends[0].avg) *
                            100,
                        )}
                        % increase
                      </div>
                    </div>

                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        +₹{(salaryData.yearlyTrends[4].median - salaryData.yearlyTrends[0].median).toFixed(1)}L
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Median Growth (5 years)</div>
                      <div className="text-xs text-blue-600 mt-1">
                        +
                        {Math.round(
                          ((salaryData.yearlyTrends[4].median - salaryData.yearlyTrends[0].median) /
                            salaryData.yearlyTrends[0].median) *
                            100,
                        )}
                        % increase
                      </div>
                    </div>

                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">
                        +₹{salaryData.yearlyTrends[4].highest - salaryData.yearlyTrends[0].highest}L
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Highest Growth (5 years)</div>
                      <div className="text-xs text-purple-600 mt-1">
                        +
                        {Math.round(
                          ((salaryData.yearlyTrends[4].highest - salaryData.yearlyTrends[0].highest) /
                            salaryData.yearlyTrends[0].highest) *
                            100,
                        )}
                        % increase
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Location-wise Salary Analysis</CardTitle>
                <CardDescription>Average packages by job location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salaryData.locationWise
                    .sort((a, b) => b.avg - a.avg)
                    .map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                            {location.location.substring(0, 2)}
                          </div>
                          <div>
                            <div className="font-medium">{location.location}</div>
                            <div className="text-sm text-muted-foreground">
                              {location.companies} companies • {location.students} students
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">₹{location.avg} LPA</div>
                          <div className="text-sm text-muted-foreground">Average Package</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="font-medium text-green-800">Strong Growth Trajectory</div>
                      <div className="text-sm text-green-700 mt-1">
                        Average package increased by 20.6% over 5 years, outpacing inflation
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="font-medium text-blue-800">Premium Company Impact</div>
                      <div className="text-sm text-blue-700 mt-1">
                        Top 10% of packages (₹15+ LPA) account for 14.7% of all placements
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <div className="font-medium text-purple-800">Department Disparity</div>
                      <div className="text-sm text-purple-700 mt-1">
                        CSE average (₹12.5L) is 2.2x higher than Civil average (₹5.8L)
                      </div>
                    </div>

                    <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <div className="font-medium text-orange-800">Location Premium</div>
                      <div className="text-sm text-orange-700 mt-1">
                        Bangalore offers 64% higher packages than national average
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Performance Benchmarks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Industry Average</span>
                      <span className="font-bold">₹6.8 LPA</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Our Average</span>
                      <span className="font-bold text-green-600">₹8.2 LPA</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Performance vs Industry</span>
                      <span className="font-bold text-blue-600">+20.6%</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Salary Goals Achievement</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>₹10+ LPA Target (30%)</span>
                          <span>29.1% Achieved</span>
                        </div>
                        <Progress value={97} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>₹15+ LPA Target (15%)</span>
                          <span>14.7% Achieved</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>₹20+ LPA Target (8%)</span>
                          <span>6.1% Achieved</span>
                        </div>
                        <Progress value={76} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
