"use client"

import { useEffect } from "react"

import { useState } from "react"
import {
  BarChart3,
  Building,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  Plus,
  Settings,
  Users,
  PieChart
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import NewDriveDialog from "@/components/newDrive"
import ScheduleEventDialog from "@/components/scheduleEvent"
import ExportReportsDialog from "@/components/export-data"
import api from "@/lib/api"
import { DriveCard } from "@/components/driveCard"

export function AdminDashboard() {
  const [showNewDrive, setShowNewDrive] = useState(false)
  const [showScheduleEvent, setShowScheduleEvent] = useState(false)
  const [showExportReports, setShowExportReports] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const [dashboardStats, setDashboardStats] = useState({})

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/admin-stats")
        setDashboardStats(res.data.data)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back {user.name}! Here&apos;s an overview of the placement activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className={"cursor-pointer"}
            size="sm"
            onClick={() => router.push("/admin/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button size="sm" onClick={() => setShowNewDrive(true)} className={"cursor-pointer"}>
            <Plus className="mr-2 h-4 w-4" />
            New Drive
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalStudents || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">Total registered students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drives</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalJobs || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">Active job postings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.placedPercentage ? `${dashboardStats.placedPercentage.toFixed(1)}%` : "0%"}
            </div>
            <Progress value={dashboardStats.placedPercentage || 0} className="mt-2" />
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-2">5 interviews, 7 pre-placement talks</p>
          </CardContent>
        </Card> */}
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Drive Management</CardTitle>
            <CardDescription>Manage ongoing and upcoming placement drives.</CardDescription>
          </CardHeader>
          <CardContent>
            {dashboardStats.activeJobs && dashboardStats.activeJobs.length > 0 ? (
              dashboardStats.activeJobs.map((job) => (
                <DriveCard
                  key={job.id}
                  id= {job.id}
                  company={job.companyName}
                  role={job.title}
                  deadline={new Date(job.deadline).toLocaleDateString()}
                  status="active"
                  logo="/default.png"
                  applicants={0}
                  totalPositions={job.noOfPositions}
                />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No active jobs available</p>
            )}
            <Button variant="outline" className="w-full cursor-pointer" onClick={() => router.push("/admin/drives")}>
              View all active drives
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* <Card className="md:col-span-3">
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
        </Card> */}
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
                  <p className="text-sm font-medium">Computer Science and Engineering</p>
                  <p className="text-2xl font-bold">82%</p>
                </div>
                <Progress value={82} className="w-1/2" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Computer Science and Engineering(DS)</p>
                  <p className="text-2xl font-bold">75%</p>
                </div>
                <Progress value={75} className="w-1/2" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">AI/ML</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
                <Progress value={68} className="w-1/2" />
              </div>
              <Button variant="outline" className="w-full cursor-pointer" onClick={()=>router.push('/admin/analytics')}>
                <PieChart className="mr-2 h-4 w-4" />
                View detailed analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Company Contacts</CardTitle>
            <CardDescription>Recent company representatives.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardStats.activeRecruiters && dashboardStats.activeRecruiters.length > 0 ? (
                dashboardStats.activeRecruiters.map((recruiter) => (
                  <CompanyContactItem
                    key={recruiter._id}
                    name={recruiter.name}
                    company={recruiter.department}
                    role={recruiter.designation}
                    email={recruiter.email}
                    url="/default.png"
                  />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No active recruiters</p>
              )}
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() => router.push("/admin/contact-recruiters")}
              >
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
                onClick={() => router.push("/admin/students")}
              >
                <Users className="h-6 w-6 mb-2" />
                <span>Batch Management</span>
              </Button>
              {/* <Button
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
              </Button> */}
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


function AdminScheduleItem({ title, description, date, time, location, students }) {
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

function CompanyContactItem({ name, company, role, email, url }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={url || "/default.png"} alt={name} />
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
