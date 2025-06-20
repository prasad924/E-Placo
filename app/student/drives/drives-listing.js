"use client"

import { useState } from "react"
import { Award, Briefcase, Building, Calendar, Clock, Filter, Search, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DrivesListing() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Placement Drives</h2>
        <p className="text-muted-foreground">Browse and apply to placement drives you&apos;re eligible for.</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search companies, roles, or skills..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Software Development</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Data Science</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Product Management</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>10+ LPA</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>7-10 LPA</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>5-7 LPA</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
              <SelectItem value="package-high">Package (Highest)</SelectItem>
              <SelectItem value="package-low">Package (Lowest)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Drives</TabsTrigger>
          <TabsTrigger value="eligible">Eligible</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6">
            <DriveDetailCard
              company="TechCorp"
              role="Software Engineer"
              package="12-15 LPA"
              deadline="May 10, 2025"
              status="open"
              logo="/placeholder.svg"
              location="Bangalore, Hybrid"
              description="We are looking for Software Engineers to join our growing team. You will be responsible for developing and maintaining our core products."
              requirements={[
                "B.Tech/BE in CS/IT/ECE",
                "CGPA 7.5 or above",
                "Strong in DSA",
                "Knowledge of web technologies",
              ]}
              openings={5}
            />

            <DriveDetailCard
              company="InnovateTech"
              role="Frontend Developer"
              package="10-12 LPA"
              deadline="May 15, 2025"
              status="open"
              logo="/placeholder.svg"
              location="Remote"
              description="Join our product team to build beautiful, responsive user interfaces for our enterprise clients."
              requirements={[
                "B.Tech/BE in any discipline",
                "CGPA 7.0 or above",
                "Experience with React/Angular",
                "UI/UX knowledge",
              ]}
              openings={3}
            />

            <DriveDetailCard
              company="DataSystems"
              role="Data Analyst"
              package="9-11 LPA"
              deadline="Applied on Apr 28"
              status="in-progress"
              logo="/placeholder.svg"
              location="Mumbai, On-site"
              description="Looking for data analysts to help us derive insights from our vast datasets and create actionable reports."
              requirements={[
                "B.Tech/BE/B.Sc in CS/IT/Statistics",
                "CGPA 7.0 or above",
                "SQL knowledge",
                "Experience with data visualization",
              ]}
              openings={4}
            />

            <DriveDetailCard
              company="FutureTech"
              role="ML Engineer"
              package="15-18 LPA"
              deadline="Opens May 20"
              status="upcoming"
              logo="/placeholder.svg"
              location="Bangalore/Hyderabad"
              description="Join our AI team to build cutting-edge machine learning models for various business applications."
              requirements={["B.Tech/BE/M.Tech in CS/IT", "CGPA 8.0 or above", "ML/DL knowledge", "Python proficiency"]}
              openings={2}
            />
          </div>
        </TabsContent>
        <TabsContent value="eligible" className="mt-6">
          <div className="grid gap-6">
            <DriveDetailCard
              company="TechCorp"
              role="Software Engineer"
              package="12-15 LPA"
              deadline="May 10, 2025"
              status="open"
              logo="/placeholder.svg"
              location="Bangalore, Hybrid"
              description="We are looking for Software Engineers to join our growing team. You will be responsible for developing and maintaining our core products."
              requirements={[
                "B.Tech/BE in CS/IT/ECE",
                "CGPA 7.5 or above",
                "Strong in DSA",
                "Knowledge of web technologies",
              ]}
              openings={5}
            />

            <DriveDetailCard
              company="InnovateTech"
              role="Frontend Developer"
              package="10-12 LPA"
              deadline="May 15, 2025"
              status="open"
              logo="/placeholder.svg"
              location="Remote"
              description="Join our product team to build beautiful, responsive user interfaces for our enterprise clients."
              requirements={[
                "B.Tech/BE in any discipline",
                "CGPA 7.0 or above",
                "Experience with React/Angular",
                "UI/UX knowledge",
              ]}
              openings={3}
            />
          </div>
        </TabsContent>
        <TabsContent value="applied" className="mt-6">
          <div className="grid gap-6">
            <DriveDetailCard
              company="DataSystems"
              role="Data Analyst"
              package="9-11 LPA"
              deadline="Applied on Apr 28"
              status="in-progress"
              logo="/placeholder.svg"
              location="Mumbai, On-site"
              description="Looking for data analysts to help us derive insights from our vast datasets and create actionable reports."
              requirements={[
                "B.Tech/BE/B.Sc in CS/IT/Statistics",
                "CGPA 7.0 or above",
                "SQL knowledge",
                "Experience with data visualization",
              ]}
              openings={4}
            />

            <DriveDetailCard
              company="CloudTech"
              role="DevOps Engineer"
              package="13-16 LPA"
              deadline="Applied on Apr 25"
              status="shortlisted"
              logo="/placeholder.svg"
              location="Pune, Hybrid"
              description="Join our infrastructure team to build and maintain our cloud-based systems and deployment pipelines."
              requirements={["B.Tech/BE in CS/IT", "CGPA 7.0 or above", "Knowledge of AWS/Azure", "CI/CD experience"]}
              openings={2}
            />
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid gap-6">
            <DriveDetailCard
              company="FutureTech"
              role="ML Engineer"
              package="15-18 LPA"
              deadline="Opens May 20"
              status="upcoming"
              logo="/placeholder.svg"
              location="Bangalore/Hyderabad"
              description="Join our AI team to build cutting-edge machine learning models for various business applications."
              requirements={["B.Tech/BE/M.Tech in CS/IT", "CGPA 8.0 or above", "ML/DL knowledge", "Python proficiency"]}
              openings={2}
            />

            <DriveDetailCard
              company="SecureNet"
              role="Security Analyst"
              package="12-14 LPA"
              deadline="Opens May 25"
              status="upcoming"
              logo="/placeholder.svg"
              location="Delhi, On-site"
              description="Looking for security analysts to help protect our systems and data from cyber threats."
              requirements={[
                "B.Tech/BE in CS/IT",
                "CGPA 7.5 or above",
                "Network security knowledge",
                "Ethical hacking skills",
              ]}
              openings={3}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DriveDetailCard({
  company,
  role,
  package: salaryPackage,
  deadline,
  status,
  logo,
  location,
  description,
  requirements,
  openings,
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
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={logo || "/placeholder.svg"} alt={company} />
              <AvatarFallback>{company.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{company}</CardTitle>
              <CardDescription>{role}</CardDescription>
            </div>
          </div>
          <Badge className={statusColors[status]}>{statusText[status]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <Award className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{salaryPackage}</span>
          </div>
          <div className="flex items-center">
            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{deadline}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{openings} openings</span>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Job Description</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Requirements</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          {status === "open" && <Button className="sm:flex-1">Apply Now</Button>}
          {status === "shortlisted" && <Button className="sm:flex-1">View Application</Button>}
          {status === "in-progress" && <Button className="sm:flex-1">View Application</Button>}
          <Button variant="outline" className="sm:flex-1">
            <Briefcase className="mr-2 h-4 w-4" />
            Company Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
