"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { toast } from "sonner"
import { DriveCard } from "@/components/driveCard"

export function StudentDashboard() {
  const [stats, setStats] = useState({})
  const {user} = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchStats = async ()=> {
      try {
        const res = await api.get('/student/get-stats')
        if(!res) {
          toast.error("error while getting data")
        }
        setStats(res.data.stats)
      }
      catch(error) {
        toast.error("Error: "+ error)
      }
    }
    fetchStats()
  }, [])
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user.name}! Here&apos;s what&apos;s happening with your placement journey.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className={'cursor-pointer'}>
            <Link target="_blank" className="flex" href={user.resumeLink || 'https://drive.google.com/file/d/1bnbq9gWukHXxI1nOMGfNeTBIMx2nVaSj/view?usp=sharing'}>
              <FileText className="mr-2 h-4 w-4" />
              View Resume
            </Link>
          </Button>
          <Button size="sm" className={'cursor-pointer'} onClick={()=>router.push('/student/drives')}>
            <Briefcase className="mr-2 h-4 w-4" />
            Browse Drives
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eligible Drives</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.eligible}</div>
            <p className="text-xs text-muted-foreground mt-2">Based on your CGPA and branch</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applications}</div>
            <p className="text-xs text-muted-foreground mt-2">4 in progress, 0 shortlisted</p>
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
                  </CardHeader>
                  <CardContent>
                    {stats.activeJobs && stats.activeJobs.length > 0 ? (
                      stats.activeJobs.map((job) => (
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
                    <Button variant="outline" className="w-full cursor-pointer" onClick={() => router.push("/student/drives")}>
                      View all active drives
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
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
              <Button variant="outline" className="w-full cursor-pointer" onClick={()=>router.push('/student/calendar')}>
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
              {stats.resources ? 
              <>
              {stats.resources.map((resource, index) => (
          <ResourceItem
            key={index}
            title={resource.title}
            type={resource.category}
            date={resource.date}
          />
        ))}
              
              <Button variant="outline" className="w-full cursor-pointer" onClick={()=>router.push('/student/resources')}>
                Browse all resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              </>
              :<div>No resources Found</div> }
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
              <Button variant="outline" className="w-full cursor-pointer" onClick={()=>router.push('/student/analytics')}>
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
