"use client"

import { useState } from "react"
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  Search,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, John! Here&apos;s what&apos;s happening with your placement journey.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            View Resume
          </Button>
          <Button size="sm">
            <Briefcase className="mr-2 h-4 w-4" />
            Browse Drives
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Complete your profile to improve visibility</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eligible Drives</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-2">Based on your CGPA and branch</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-2">4 in progress, 1 shortlisted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-2">2 interviews, 1 pre-placement talk</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Placement Drives</CardTitle>
            <CardDescription>Browse and apply to placement drives you&apos;re eligible for.</CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search companies or roles..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="eligible">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="eligible">Eligible</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
              <TabsContent value="eligible" className="space-y-4 mt-4">
                <DriveCard
                  company="TechCorp"
                  role="Software Engineer"
                  package="12-15 LPA"
                  deadline="May 10, 2025"
                  status="open"
                  logo="/placeholder.svg"
                />
                <DriveCard
                  company="InnovateTech"
                  role="Frontend Developer"
                  package="10-12 LPA"
                  deadline="May 15, 2025"
                  status="open"
                  logo="/placeholder.svg"
                />
                <DriveCard
                  company="GlobalSoft"
                  role="Product Manager"
                  package="14-18 LPA"
                  deadline="May 8, 2025"
                  status="open"
                  logo="/placeholder.svg"
                />
                <Button variant="outline" className="w-full">
                  View all eligible drives
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
              <TabsContent value="applied" className="space-y-4 mt-4">
                <DriveCard
                  company="DataSystems"
                  role="Data Analyst"
                  package="9-11 LPA"
                  deadline="Applied on Apr 28"
                  status="in-progress"
                  logo="/placeholder.svg"
                />
                <DriveCard
                  company="CloudTech"
                  role="DevOps Engineer"
                  package="13-16 LPA"
                  deadline="Applied on Apr 25"
                  status="shortlisted"
                  logo="/placeholder.svg"
                />
                <Button variant="outline" className="w-full">
                  View all applications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
              <TabsContent value="upcoming" className="space-y-4 mt-4">
                <DriveCard
                  company="FutureTech"
                  role="ML Engineer"
                  package="15-18 LPA"
                  deadline="Opens May 20"
                  status="upcoming"
                  logo="/placeholder.svg"
                />
                <DriveCard
                  company="SecureNet"
                  role="Security Analyst"
                  package="12-14 LPA"
                  deadline="Opens May 25"
                  status="upcoming"
                  logo="/placeholder.svg"
                />
                <Button variant="outline" className="w-full">
                  View all upcoming drives
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>Your upcoming interviews and events.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ScheduleItem
                title="Interview with CloudTech"
                description="Technical Round 1"
                date="May 5, 2025"
                time="10:00 AM - 11:00 AM"
                location="Online (Zoom)"
              />
              <ScheduleItem
                title="Pre-placement Talk"
                description="FutureTech Company Presentation"
                date="May 7, 2025"
                time="2:00 PM - 3:30 PM"
                location="Auditorium A"
              />
              <ScheduleItem
                title="Aptitude Test"
                description="TechCorp Screening"
                date="May 9, 2025"
                time="9:00 AM - 10:30 AM"
                location="Computer Lab 3"
              />
              <Button variant="outline" className="w-full">
                View full calendar
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resource Center</CardTitle>
            <CardDescription>Preparation materials and guides.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResourceItem title="Resume Building Workshop" type="Workshop Recording" date="Apr 15, 2025" />
              <ResourceItem title="Technical Interview Questions" type="PDF Document" date="Apr 10, 2025" />
              <ResourceItem title="Aptitude Test Practice" type="Online Quiz" date="Apr 5, 2025" />
              <Button variant="outline" className="w-full">
                Browse all resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Placement Statistics</CardTitle>
            <CardDescription>Current placement trends for your batch.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Students Placed</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
                <Progress value={68} className="w-1/2" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Computer Science</p>
                  <p className="text-2xl font-bold">82%</p>
                </div>
                <Progress value={82} className="w-1/2" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Highest Package</p>
                  <p className="text-2xl font-bold">24 LPA</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
              <Button variant="outline" className="w-full">
                View detailed statistics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DriveCard({
  company,
  role,
  package: drivePackage,
  deadline,
  status,
  logo,
}) {
  const statusColors = {
    open: "bg-green-500/10 text-green-500",
    "in-progress": "bg-blue-500/10 text-blue-500",
    shortlisted: "bg-purple-500/10 text-purple-500",
    upcoming: "bg-orange-500/10 text-orange-500",
    closed: "bg-gray-500/10 text-gray-500",
  }

  const statusText = {
    open: "Open",
    "in-progress": "In Progress",
    shortlisted: "Shortlisted",
    upcoming: "Upcoming",
    closed: "Closed",
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={logo || "/placeholder.svg"} alt={company} />
        <AvatarFallback>{company.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{company}</h4>
          <Badge className={statusColors[status]}>{statusText[status]}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{role}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Award className="mr-1 h-3 w-3" />
            {drivePackage}
          </span>
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {deadline}
          </span>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="ml-auto">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

function ScheduleItem({
  title,
  description,
  date,
  time,
  location,
}) {
  return (
    <div className="flex gap-4 rounded-lg border p-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Calendar className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {date}
          </span>
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {time}
          </span>
          <span className="flex items-center">
            <CheckCircle className="mr-1 h-3 w-3" />
            {location}
          </span>
        </div>
      </div>
    </div>
  )
}

function ResourceItem({
  title,
  type,
  date,
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-1">
        <h4 className="font-medium">{title}</h4>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{type}</span>
          <span>{date}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <FileText className="h-4 w-4" />
      </Button>
    </div>
  )
}
