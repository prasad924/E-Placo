"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, TrendingUp, BarChart3, Calendar, Target, Award, Activity } from "lucide-react"
import Link from "next/link"

const trendsData = {
  placementRates: [
    { year: "2020", rate: 72.5, students: 2890, placed: 2095 },
    { year: "2021", rate: 76.8, students: 3020, placed: 2319 },
    { year: "2022", rate: 81.2, students: 3150, placed: 2558 },
    { year: "2023", rate: 84.6, students: 3180, placed: 2690 },
    { year: "2024", rate: 87.5, students: 3247, placed: 2841 },
  ],
  salaryTrends: [
    { year: "2020", avg: 6.8, median: 6.2, highest: 32 },
    { year: "2021", rate: 7.2, median: 6.5, highest: 38 },
    { year: "2022", avg: 7.8, median: 7.0, highest: 42 },
    { year: "2023", avg: 8.0, median: 7.2, highest: 43 },
    { year: "2024", avg: 8.2, median: 7.5, highest: 45 },
  ],
  companyTrends: [
    { year: "2020", total: 128, product: 32, service: 78, startups: 18 },
    { year: "2021", total: 135, product: 36, service: 82, startups: 17 },
    { year: "2022", total: 142, product: 38, service: 86, startups: 18 },
    { year: "2023", total: 148, product: 41, service: 87, startups: 20 },
    { year: "2024", total: 156, product: 45, service: 89, startups: 22 },
  ],
  departmentTrends: {
    "Computer Science": [
      { year: "2020", rate: 78.5, avg: 8.2 },
      { year: "2021", rate: 82.1, avg: 9.5 },
      { year: "2022", rate: 87.3, avg: 11.2 },
      { year: "2023", rate: 89.8, avg: 11.8 },
      { year: "2024", rate: 92.2, avg: 12.5 },
    ],
    "Information Technology": [
      { year: "2020", rate: 75.2, avg: 7.8 },
      { year: "2021", rate: 79.5, avg: 8.9 },
      { year: "2022", rate: 84.1, avg: 10.1 },
      { year: "2023", rate: 87.2, avg: 11.2 },
      { year: "2024", rate: 90.0, avg: 11.8 },
    ],
    "Electronics & Communication": [
      { year: "2020", rate: 72.1, avg: 6.2 },
      { year: "2021", rate: 75.8, avg: 7.1 },
      { year: "2022", rate: 79.5, avg: 7.8 },
      { year: "2023", rate: 82.8, avg: 8.4 },
      { year: "2024", rate: 86.3, avg: 8.9 },
    ],
  },
  industryComparison: [
    { metric: "Placement Rate", industry: 78.2, ours: 87.5, difference: "+9.3%" },
    { metric: "Average Package", industry: 6.8, ours: 8.2, difference: "+20.6%" },
    { metric: "Dream Company %", industry: 12.5, ours: 16.8, difference: "+4.3%" },
    { metric: "Multiple Offers", industry: 28.5, ours: 35.2, difference: "+6.7%" },
  ],
  seasonalTrends: [
    { month: "Jul", drives: 8, placements: 145 },
    { month: "Aug", drives: 12, placements: 285 },
    { month: "Sep", drives: 18, placements: 456 },
    { month: "Oct", drives: 25, placements: 678 },
    { month: "Nov", drives: 32, placements: 892 },
    { month: "Dec", drives: 28, placements: 385 },
    { month: "Jan", drives: 15, placements: 285 },
    { month: "Feb", drives: 12, placements: 185 },
    { month: "Mar", drives: 8, placements: 125 },
    { month: "Apr", drives: 6, placements: 85 },
    { month: "May", drives: 4, placements: 45 },
    { month: "Jun", drives: 2, placements: 25 },
  ],
  predictions: {
    "2025": {
      placementRate: 89.2,
      avgPackage: 8.8,
      companies: 165,
      confidence: 85,
    },
    "2026": {
      placementRate: 90.8,
      avgPackage: 9.4,
      companies: 175,
      confidence: 78,
    },
  },
}

export default function TrendsPage() {
  const [selectedMetric, setSelectedMetric] = useState("placement")
  const [selectedDept, setSelectedDept] = useState("all")

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
              <h1 className="text-4xl font-bold tracking-tight">Historical Trends</h1>
              <p className="text-muted-foreground text-lg">
                Multi-year analysis and future projections for placement activities
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placement">Placement Rate</SelectItem>
                <SelectItem value="salary">Salary Trends</SelectItem>
                <SelectItem value="companies">Company Growth</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Trend Indicators */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">5-Year Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">+15.0%</div>
              <p className="text-sm text-green-600 flex items-center mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                Placement rate improvement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Salary Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">+20.6%</div>
              <p className="text-sm text-blue-600 flex items-center mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                Average package increase
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Company Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">+21.9%</div>
              <p className="text-sm text-purple-600 flex items-center mt-2">
                <TrendingUp className="mr-1 h-3 w-3" />
                More companies participating
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Industry Benchmark</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">+9.3%</div>
              <p className="text-sm text-orange-600 flex items-center mt-2">
                <Award className="mr-1 h-3 w-3" />
                Above industry average
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="placement">Placement Trends</TabsTrigger>
            <TabsTrigger value="salary">Salary Trends</TabsTrigger>
            <TabsTrigger value="companies">Company Trends</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal Patterns</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    5-Year Performance Summary
                  </CardTitle>
                  <CardDescription>Key metrics progression over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-5 gap-2 text-center text-sm">
                      <div className="font-medium">Year</div>
                      <div className="font-medium">Students</div>
                      <div className="font-medium">Placed</div>
                      <div className="font-medium">Rate</div>
                      <div className="font-medium">Avg Pkg</div>

                      {trendsData.placementRates.map((year, index) => (
                        <React.Fragment key={index}>
                          <div className="py-2">{year.year}</div>
                          <div className="py-2">{year.students}</div>
                          <div className="py-2">{year.placed}</div>
                          <div className="py-2">
                            <Badge variant="outline" className="text-xs">
                              {year.rate}%
                            </Badge>
                          </div>
                          <div className="py-2">₹{trendsData.salaryTrends[index]?.avg || "N/A"}L</div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Industry Comparison
                  </CardTitle>
                  <CardDescription>How we perform against industry standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendsData.industryComparison.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.metric}</span>
                          <Badge variant="outline" className="text-green-600">
                            {item.difference}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Industry</span>
                              <span>
                                {typeof item.industry === "number"
                                  ? item.metric.includes("Package")
                                    ? `₹${item.industry}L`
                                    : item.metric.includes("Rate") || item.metric.includes("%")
                                      ? `${item.industry}%`
                                      : item.industry
                                  : item.industry}
                              </span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Our College</span>
                              <span className="font-medium">
                                {typeof item.ours === "number"
                                  ? item.metric.includes("Package")
                                    ? `₹${item.ours}L`
                                    : item.metric.includes("Rate") || item.metric.includes("%")
                                      ? `${item.ours}%`
                                      : item.ours
                                  : item.ours}
                              </span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Growth Trajectory Analysis</CardTitle>
                <CardDescription>Detailed breakdown of growth patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">Consistent</div>
                    <div className="text-sm text-muted-foreground mt-2">Growth Pattern</div>
                    <div className="text-xs text-green-600 mt-1">Year-over-year improvement in all metrics</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">Accelerating</div>
                    <div className="text-sm text-muted-foreground mt-2">Salary Growth</div>
                    <div className="text-xs text-blue-600 mt-1">Faster growth in recent years</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">Expanding</div>
                    <div className="text-sm text-muted-foreground mt-2">Company Base</div>
                    <div className="text-xs text-purple-600 mt-1">More diverse recruitment partners</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="placement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Rate Trends</CardTitle>
                <CardDescription>Historical placement rate progression</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-5 gap-4">
                    {trendsData.placementRates.map((year, index) => (
                      <div key={index} className="text-center space-y-3">
                        <div className="text-lg font-bold">{year.year}</div>
                        <div className="space-y-2">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{year.rate}%</div>
                            <div className="text-xs text-muted-foreground">Placement Rate</div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {year.placed}/{year.students}
                          </div>
                          {index > 0 && (
                            <div className="text-xs text-green-600 flex items-center justify-center">
                              <TrendingUp className="mr-1 h-3 w-3" />+
                              {(year.rate - trendsData.placementRates[index - 1].rate).toFixed(1)}%
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-4">Department-wise Trends</h4>
                      <div className="space-y-3">
                        {Object.entries(trendsData.departmentTrends).map(([dept, data]) => (
                          <div key={dept} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{dept}</span>
                              <div className="text-right">
                                <span className="text-sm font-bold text-green-600">{data[data.length - 1].rate}%</span>
                                <span className="text-xs text-green-600 ml-2">
                                  (+{(data[data.length - 1].rate - data[0].rate).toFixed(1)}%)
                                </span>
                              </div>
                            </div>
                            <Progress value={data[data.length - 1].rate} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Growth Analysis</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">
                            +{(trendsData.placementRates[4].rate - trendsData.placementRates[0].rate).toFixed(1)}%
                          </div>
                          <div className="text-sm text-muted-foreground">Total improvement over 5 years</div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">
                            +{Math.round(trendsData.placementRates[4].placed - trendsData.placementRates[0].placed)}
                          </div>
                          <div className="text-sm text-muted-foreground">Additional students placed</div>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">
                            {((trendsData.placementRates[4].rate - trendsData.placementRates[0].rate) / 4).toFixed(1)}%
                          </div>
                          <div className="text-sm text-muted-foreground">Average annual growth</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Salary Evolution</CardTitle>
                <CardDescription>Package trends across different metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-5 gap-4">
                    {trendsData.salaryTrends.map((year, index) => (
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
                        +₹{(trendsData.salaryTrends[4].avg - trendsData.salaryTrends[0].avg).toFixed(1)}L
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Average Growth (5 years)</div>
                      <div className="text-xs text-green-600 mt-1">
                        +
                        {Math.round(
                          ((trendsData.salaryTrends[4].avg - trendsData.salaryTrends[0].avg) /
                            trendsData.salaryTrends[0].avg) *
                            100,
                        )}
                        % increase
                      </div>
                    </div>

                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        +₹{(trendsData.salaryTrends[4].median - trendsData.salaryTrends[0].median).toFixed(1)}L
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Median Growth (5 years)</div>
                      <div className="text-xs text-blue-600 mt-1">
                        +
                        {Math.round(
                          ((trendsData.salaryTrends[4].median - trendsData.salaryTrends[0].median) /
                            trendsData.salaryTrends[0].median) *
                            100,
                        )}
                        % increase
                      </div>
                    </div>

                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">
                        +₹{trendsData.salaryTrends[4].highest - trendsData.salaryTrends[0].highest}L
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Highest Growth (5 years)</div>
                      <div className="text-xs text-purple-600 mt-1">
                        +
                        {Math.round(
                          ((trendsData.salaryTrends[4].highest - trendsData.salaryTrends[0].highest) /
                            trendsData.salaryTrends[0].highest) *
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

          <TabsContent value="companies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Participation Trends</CardTitle>
                <CardDescription>Growth in recruiting companies over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-5 gap-4">
                    {trendsData.companyTrends.map((year, index) => (
                      <div key={index} className="text-center space-y-3">
                        <div className="text-lg font-bold">{year.year}</div>
                        <div className="space-y-2">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">{year.total}</div>
                            <div className="text-xs text-muted-foreground">Total</div>
                          </div>
                          <div className="grid grid-cols-3 gap-1 text-xs">
                            <div className="p-2 bg-green-50 rounded">
                              <div className="font-bold text-green-600">{year.product}</div>
                              <div className="text-muted-foreground">Product</div>
                            </div>
                            <div className="p-2 bg-purple-50 rounded">
                              <div className="font-bold text-purple-600">{year.service}</div>
                              <div className="text-muted-foreground">Service</div>
                            </div>
                            <div className="p-2 bg-orange-50 rounded">
                              <div className="font-bold text-orange-600">{year.startups}</div>
                              <div className="text-muted-foreground">Startups</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        +{trendsData.companyTrends[4].total - trendsData.companyTrends[0].total}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Total Company Growth</div>
                      <div className="text-xs text-blue-600 mt-1">
                        +
                        {Math.round(
                          ((trendsData.companyTrends[4].total - trendsData.companyTrends[0].total) /
                            trendsData.companyTrends[0].total) *
                            100,
                        )}
                        % increase
                      </div>
                    </div>

                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">
                        +{trendsData.companyTrends[4].product - trendsData.companyTrends[0].product}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Product Companies</div>
                      <div className="text-xs text-green-600 mt-1">
                        +
                        {Math.round(
                          ((trendsData.companyTrends[4].product - trendsData.companyTrends[0].product) /
                            trendsData.companyTrends[0].product) *
                            100,
                        )}
                        % increase
                      </div>
                    </div>

                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">
                        +{trendsData.companyTrends[4].startups - trendsData.companyTrends[0].startups}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Startup Participation</div>
                      <div className="text-xs text-orange-600 mt-1">
                        +
                        {Math.round(
                          ((trendsData.companyTrends[4].startups - trendsData.companyTrends[0].startups) /
                            trendsData.companyTrends[0].startups) *
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

          <TabsContent value="seasonal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Seasonal Placement Patterns
                </CardTitle>
                <CardDescription>Monthly distribution of placement activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-6 gap-4">
                    {trendsData.seasonalTrends.map((month, index) => (
                      <div key={index} className="text-center space-y-2">
                        <div className="text-sm font-medium">{month.month}</div>
                        <div className="space-y-2">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="text-lg font-bold text-blue-600">{month.drives}</div>
                            <div className="text-xs text-muted-foreground">Drives</div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="text-lg font-bold text-green-600">{month.placements}</div>
                            <div className="text-xs text-muted-foreground">Placed</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-4">Peak Seasons</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <div className="font-medium text-green-800">September - December</div>
                          <div className="text-sm text-green-700 mt-1">
                            Peak placement season with 70% of annual placements
                          </div>
                          <div className="text-xs text-green-600 mt-2">103 drives • 2,411 placements</div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <div className="font-medium text-blue-800">January - March</div>
                          <div className="text-sm text-blue-700 mt-1">Secondary season for remaining opportunities</div>
                          <div className="text-xs text-blue-600 mt-2">35 drives • 595 placements</div>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <div className="font-medium text-orange-800">April - August</div>
                          <div className="text-sm text-orange-700 mt-1">Off-season with internship conversions</div>
                          <div className="text-xs text-orange-600 mt-2">20 drives • 300 placements</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Activity Analysis</h4>
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">October</div>
                          <div className="text-sm text-muted-foreground">Peak Month</div>
                          <div className="text-xs text-purple-600 mt-1">32 drives • 892 placements</div>
                        </div>

                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-600">June</div>
                          <div className="text-sm text-muted-foreground">Lowest Activity</div>
                          <div className="text-xs text-gray-600 mt-1">2 drives • 25 placements</div>
                        </div>

                        <div className="text-center p-4 bg-indigo-50 rounded-lg">
                          <div className="text-2xl font-bold text-indigo-600">27.9</div>
                          <div className="text-sm text-muted-foreground">Avg Placements/Drive</div>
                          <div className="text-xs text-indigo-600 mt-1">Efficiency metric</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Future Projections
                </CardTitle>
                <CardDescription>Data-driven predictions for upcoming years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {Object.entries(trendsData.predictions).map(([year, data]) => (
                      <div key={year} className="border rounded-lg p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold">{year} Projections</h3>
                          <Badge variant="outline" className="text-xs">
                            {data.confidence}% Confidence
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-xl font-bold text-green-600">{data.placementRate}%</div>
                            <div className="text-xs text-muted-foreground">Placement Rate</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">₹{data.avgPackage}L</div>
                            <div className="text-xs text-muted-foreground">Avg Package</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-xl font-bold text-purple-600">{data.companies}</div>
                            <div className="text-xs text-muted-foreground">Companies</div>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          Based on historical trends and market analysis
                        </div>
                      </div>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Prediction Methodology</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium mb-3">Data Sources</h4>
                          <ul className="text-sm space-y-2">
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              5-year historical placement data
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              Industry growth trends
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                              Economic indicators
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                              Company expansion plans
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Key Assumptions</h4>
                          <ul className="text-sm space-y-2">
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Continued economic stability
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              Technology sector growth
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                              Maintained academic standards
                            </li>
                            <li className="flex items-center">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                              Industry partnership growth
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
