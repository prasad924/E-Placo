"use client"

import React from "react"

import { useState } from "react"
import { BarChart3, Building, Calendar, CheckCircle, ChevronRight, Clock, Download, FileText, PieChart, Plus, Settings, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import NewDriveDialog from "./newDrive"
import ScheduleEventDialog from "./scheduleEvent"

export function AdminDashboard() {
  const [showNewDrive, setShowNewDrive] = useState(false)
  const [showExportReports, setShowExportReports] = useState(false)
  const {user} = useAuth();
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Welcome back {user.name}! Here's an overview of the placement activities.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className={'cursor-pointer'} size="sm" onClick={()=>router.push('/admin/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button size="sm" onClick={() => setShowNewDrive(true)} className={'cursor-pointer'}>
            <Plus className="mr-2 h-4 w-4" />
            New Drive
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>  
            <p className="text-xs text-muted-foreground mt-2">+42 from last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drives</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-2">8 closing this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-2">5 interviews, 7 pre-placement talks</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Placement Statistics</CardTitle>
            <CardDescription>Current placement trends by department.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Computer Science</p>
                  <p className="text-2xl font-bold">82%</p>
                </div>
                <Progress value={82} className="w-1/2" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Electronics</p>
                  <p className="text-2xl font-bold">75%</p>
                </div>
                <Progress value={75} className="w-1/2" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Mechanical</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
                <Progress value={68} className="w-1/2" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Civil</p>
                  <p className="text-2xl font-bold">62%</p>
                </div>
                <Progress value={62} className="w-1/2" />
              </div>
              <Button variant="outline" className="w-full cursor-pointer" onClick={()=>router.push('admin/analytics')}>
                <PieChart className="mr-2 h-4 w-4" />
                View detailed analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Drive Management</CardTitle>
            <CardDescription>Manage ongoing and upcoming placement drives.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active" className={'cursor-pointer'}>Active</TabsTrigger>
                <TabsTrigger value="upcoming" className={'cursor-pointer'}>Upcoming</TabsTrigger>
                <TabsTrigger value="completed" className={'cursor-pointer'}>Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="space-y-4 mt-4">
                <AdminDriveCard
                  company="TechCorp"
                  role="Software Engineer"
                  deadline="May 10, 2025"
                  status="active"
                  logo="default.png"
                  applicants={78}
                  totalPositions={10}
                />
                <AdminDriveCard
                  company="InnovateTech"
                  role="Frontend Developer"
                  deadline="May 15, 2025"
                  status="active"
                  logo="default.png"
                  applicants={45}
                  totalPositions={5}
                />
                <AdminDriveCard
                  company="GlobalSoft"
                  role="Product Manager"
                  deadline="May 8, 2025"
                  status="active"
                  logo="default.png"
                  applicants={32}
                  totalPositions={3}
                />
                <Button variant="outline" className="w-full cursor-pointer" onClick={()=>router.push('/admin/drives')}>
                  View all active drives
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
              <TabsContent value="upcoming" className="space-y-4 mt-4">
                <AdminDriveCard
                  company="FutureTech"
                  role="ML Engineer"
                  deadline="Opens May 20"
                  status="upcoming"
                  logo="default.png"
                  applicants={0}
                  totalPositions={4}
                />
                <AdminDriveCard
                  company="SecureNet"
                  role="Security Analyst"
                  deadline="Opens May 25"
                  status="upcoming"
                  logo="default.png"
                  applicants={0}
                  totalPositions={6}
                />
                <Button variant="outline" className="w-full">
                  View all upcoming drives
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
              <TabsContent value="completed" className="space-y-4 mt-4">
                <AdminDriveCard
                  company="DataTech"
                  role="Data Scientist"
                  deadline="Completed Apr 15"
                  status="completed"
                  logo="default.png"
                  applicants={65}
                  totalPositions={8}
                  selectedCandidates={7}
                />
                <AdminDriveCard
                  company="CloudSystems"
                  role="DevOps Engineer"
                  deadline="Completed Apr 10"
                  status="completed"
                  logo="default.png"
                  applicants={42}
                  totalPositions={4}
                  selectedCandidates={4}
                />
                <Button variant="outline" className="w-full">
                  View all completed drives
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>Events and interviews scheduled for this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AdminScheduleItem
                title="TechCorp Interviews"
                description="Technical Round 1"
                date="May 5, 2025"
                time="10:00 AM - 4:00 PM"
                location="Online (Zoom)"
                students={15}
              />
              <AdminScheduleItem
                title="FutureTech Pre-placement Talk"
                description="Company Presentation"
                date="May 7, 2025"
                time="2:00 PM - 3:30 PM"
                location="Auditorium A"
                students={120}
              />
              <AdminScheduleItem
                title="GlobalSoft Aptitude Test"
                description="Screening Round"
                date="May 9, 2025"
                time="9:00 AM - 10:30 AM"
                location="Computer Lab 3"
                students={85}
              />
              <Button variant="outline" className="w-full cursor-pointer" onClick={()=>router.push('admin/calendar')}>
                View full calendar
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Company Contacts</CardTitle>
            <CardDescription>Recent company representatives.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <CompanyContactItem
                name="Rajesh Kumar"
                company="TechCorp"
                role="HR Manager"
                email="rajesh.k@techcorp.com"
                image="default.png"
              />
              <CompanyContactItem
                name="Sneha Gupta"
                company="InnovateTech"
                role="Technical Recruiter"
                email="sneha.g@innovatetech.com"
                image="default.png"
              />
              <CompanyContactItem
                name="Vikram Mehta"
                company="GlobalSoft"
                role="Hiring Manager"
                email="vikram.m@globalsoft.com"
                image="default.png"
              />
              <Button variant="outline" className="w-full cursor-pointer" onClick={()=>router.push('/admin/contacts')}>
                View all contacts
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used admin actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setShowNewDrive(true)}
              >
                <Plus className="h-6 w-6 mb-2" />
                <span>Add New Drive</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => router.push('/admin/student')}
              >
                <Users className="h-6 w-6 mb-2" />
                <span>Batch Management</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setShowScheduleEvent(true)}
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span>Schedule Event</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setShowExportReports(true)}
              >
                <Download className="h-6 w-6 mb-2" />
                <span>Export Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showNewDrive && <NewDriveDialog onClose={() => setShowNewDrive(false)} />}
      {showScheduleEvent && <ScheduleEventDialog onClose={() => setShowScheduleEvent(false)} />}
      {showExportReports && <ExportReportsDialog onClose={() => setShowExportReports(false)} />}
    </div>
  )
}

function AdminDriveCard({
  company,
  role,
  deadline,
  status,
  logo,
  applicants,
  totalPositions,
  selectedCandidates,
}) {
  const statusColors = {
    active: "bg-green-500/10 text-green-500",
    upcoming: "bg-orange-500/10 text-orange-500",
    completed: "bg-blue-500/10 text-blue-500",
  }

  const statusText = {
    active: "Active",
    upcoming: "Upcoming",
    completed: "Completed",
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={logo || "default.png"} alt={company} />
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
            <Clock className="mr-1 h-3 w-3" />
            {deadline}
          </span>
          <span className="flex items-center">
            <Users className="mr-1 h-3 w-3" />
            {applicants} / {totalPositions} positions
          </span>
          {selectedCandidates && (
            <span className="flex items-center">
              <CheckCircle className="mr-1 h-3 w-3" />
              {selectedCandidates} selected
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
          <FileText className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function AdminScheduleItem({
  title,
  description,
  date,
  time,
  location,
  students,
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
          <span className="flex items-center">
            <Users className="mr-1 h-3 w-3" />
            {students} students
          </span>
        </div>
      </div>
    </div>
  )
}

function CompanyContactItem({
  name,
  company,
  role,
  email,
  image,
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={image || "default.png"} alt={name} />
          <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-sm font-medium">{name}</h4>
          <div className="flex flex-col text-xs text-muted-foreground">
            <span className="flex items-center">
              <Building className="mr-1 h-3 w-3" />
              {company} - {role}
            </span>
            <span>{email}</span>
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <FileText className="h-4 w-4" />
      </Button>
    </div>
  )
}
