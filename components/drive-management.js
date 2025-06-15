"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Building,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Download,
  Clock,
  DollarSign,
  GraduationCap,
  Briefcase,
} from "lucide-react"
import NewDriveDialog from "./newDrive"

const driveStats = [
  { title: "Total Drives", value: "156", change: "+12%", icon: Briefcase, color: "text-blue-600" },
  { title: "Active Drives", value: "23", change: "+5%", icon: Calendar, color: "text-green-600" },
  { title: "Companies Registered", value: "89", change: "+8%", icon: Building, color: "text-purple-600" },
  { title: "Students Placed", value: "1,247", change: "+15%", icon: GraduationCap, color: "text-orange-600" },
]

const drives = [
  {
    id: 1,
    company: "Google",
    logo: "default.png?height=40&width=40",
    position: "Software Engineer",
    type: "On-Campus",
    status: "Active",
    applications: 245,
    shortlisted: 45,
    selected: 12,
    package: "₹25-30 LPA",
    deadline: "2024-01-15",
    driveDate: "2024-01-20",
    eligibility: "7.5+ CGPA",
    departments: ["CSE", "IT", "ECE"],
    rounds: ["Online Test", "Technical", "HR"],
    location: "Bangalore",
  },
  {
    id: 2,
    company: "Microsoft",
    logo: "default.png?height=40&width=40",
    position: "Product Manager",
    type: "Virtual",
    status: "Upcoming",
    applications: 189,
    shortlisted: 32,
    selected: 8,
    package: "₹22-28 LPA",
    deadline: "2024-01-18",
    driveDate: "2024-01-25",
    eligibility: "7.0+ CGPA",
    departments: ["CSE", "IT", "MBA"],
    rounds: ["Case Study", "Group Discussion", "Interview"],
    location: "Hyderabad",
  },
  {
    id: 3,
    company: "Amazon",
    logo: "default.png?height=40&width=40",
    position: "SDE-1",
    type: "On-Campus",
    status: "Completed",
    applications: 312,
    shortlisted: 67,
    selected: 18,
    package: "₹18-24 LPA",
    deadline: "2023-12-20",
    driveDate: "2024-01-05",
    eligibility: "6.5+ CGPA",
    departments: ["CSE", "IT"],
    rounds: ["Coding Test", "Technical", "Bar Raiser"],
    location: "Chennai",
  },
]

export function DriveManagement() {
    const [showNewDrive, setShowNewDrive] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDrive, setSelectedDrive] = useState(null)
  const [editingDrive, setEditingDrive] = useState(null)

  const filteredDrives = drives.filter((drive) => {
    const matchesSearch =
      drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || drive.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Drive Management</h1>
          <p className="text-muted-foreground">Manage placement drives and recruitment processes</p>
        </div>
        <Button size="sm" onClick={() => setShowNewDrive(true)} className={'cursor-pointer'}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Drive
                  </Button>
        {showNewDrive && <NewDriveDialog onClose={() => setShowNewDrive(false)} />}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {driveStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      
      <Card>
        <CardHeader>
          <CardTitle>Placement Drives</CardTitle>
          <CardDescription>Manage and monitor all placement drives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search drives..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Drive Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrives.map((drive) => (
                  <TableRow key={drive.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image src={drive.logo || "default.png"} alt={drive.company} height={8} width={8} className=" rounded" />
                        <div>
                          <div className="font-medium">{drive.company}</div>
                          <div className="text-sm text-muted-foreground">{drive.location}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{drive.position}</div>
                      <div className="text-sm text-muted-foreground">{drive.departments.join(", ")}</div>
                    </TableCell>
                    <TableCell>{drive.type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(drive.status)}>{drive.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{drive.applications} Applied</div>
                        <div className="text-muted-foreground">{drive.shortlisted} Shortlisted</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{drive.package}</TableCell>
                    <TableCell>{new Date(drive.driveDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedDrive(drive)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditingDrive(drive)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedDrive && (
        <Dialog open={!!selectedDrive} onOpenChange={() => setSelectedDrive(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Image
                  src={selectedDrive.logo || "default.png"}
                  alt={selectedDrive.company}
                  height={10}
                  width={10}
                  className="rounded"
                />
                <div>
                  <div>
                    {selectedDrive.company} - {selectedDrive.position}
                  </div>
                  <div className="text-sm text-muted-foreground">{selectedDrive.location}</div>
                </div>
              </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Package: {selectedDrive.package}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>Drive Date: {new Date(selectedDrive.driveDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>Deadline: {new Date(selectedDrive.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-purple-600" />
                      <span>Eligibility: {selectedDrive.eligibility}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Eligible Departments</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDrive.departments.map((dept) => (
                          <Badge key={dept} variant="secondary">
                            {dept}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Selection Rounds</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDrive.rounds.map((round) => (
                          <Badge key={round} variant="outline">
                            {round}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="applications">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">{selectedDrive.applications}</div>
                        <div className="text-sm text-muted-foreground">Total Applications</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">{selectedDrive.shortlisted}</div>
                        <div className="text-sm text-muted-foreground">Shortlisted</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">{selectedDrive.selected}</div>
                        <div className="text-sm text-muted-foreground">Selected</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {editingDrive && (
        <Dialog open={!!editingDrive} onOpenChange={() => setEditingDrive(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Drive - {editingDrive.company}</DialogTitle>
              <DialogDescription>Update drive details and requirements</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="process">Selection Process</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-company">Company Name</Label>
                    <Input id="edit-company" defaultValue={editingDrive.company} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-position">Job Position</Label>
                    <Input id="edit-position" defaultValue={editingDrive.position} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-package">Package Range</Label>
                    <Input id="edit-package" defaultValue={editingDrive.package} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Drive Type</Label>
                    <Select defaultValue={editingDrive.type.toLowerCase().replace("-", "")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oncampus">On-Campus</SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-location">Location</Label>
                    <Input id="edit-location" defaultValue={editingDrive.location} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select defaultValue={editingDrive.status.toLowerCase()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="requirements" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-eligibility">Eligibility Criteria</Label>
                    <Input id="edit-eligibility" defaultValue={editingDrive.eligibility} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-backlogs">Maximum Backlogs</Label>
                    <Input id="edit-backlogs" placeholder="e.g., 0" type="number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Eligible Departments</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "MBA", "MCA"].map((dept) => (
                      <label key={dept} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded"
                          defaultChecked={editingDrive.departments.includes(dept)}
                        />
                        <span className="text-sm">{dept}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="process" className="space-y-4">
                <div className="space-y-4">
                  <Label>Selection Rounds</Label>
                  {editingDrive.rounds.map((round) => (
                    <div key={round} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="flex-1">{round}</span>
                      <Input placeholder="Duration" className="w-24" />
                      <Select>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="offline">Offline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="schedule" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-deadline">Application Deadline</Label>
                    <Input id="edit-deadline" type="date" defaultValue={editingDrive.deadline} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-driveDate">Drive Date</Label>
                    <Input id="edit-driveDate" type="date" defaultValue={editingDrive.driveDate} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingDrive(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Drive updated:", editingDrive)
                  alert("Drive updated successfully!")
                  setEditingDrive(null)
                }}
              >
                Update Drive
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
