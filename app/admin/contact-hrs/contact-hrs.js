"use client"

import React from "react"

import { useState } from "react"
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  User,
  X,
  Send,
  MessageSquare,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ContactHRs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [companyFilter, setCompanyFilter] = useState("all")
  const [showAddHR, setShowAddHR] = useState(false)
  const [showEditHR, setShowEditHR] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [selectedHR, setSelectedHR] = useState(null)

  const hrContacts = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@techcorp.com",
      phone: "+91 98765 43210",
      company: "TechCorp Solutions",
      companyLogo: "/placeholder.svg",
      position: "Senior HR Manager",
      department: "Talent Acquisition",
      location: "Bangalore, India",
      lastContact: "2024-05-01",
      status: "Active",
      notes: "Primary contact for software engineering roles",
      linkedIn: "linkedin.com/in/rajeshkumar",
      experience: "8 years",
      specialization: "Technical Hiring",
      preferredTime: "10:00 AM - 6:00 PM IST",
      timezone: "Asia/Kolkata",
    },
    {
      id: 2,
      name: "Sneha Gupta",
      email: "sneha.gupta@innovatetech.com",
      phone: "+91 87654 32109",
      company: "InnovateTech",
      companyLogo: "/placeholder.svg",
      position: "HR Business Partner",
      department: "Human Resources",
      location: "Mumbai, India",
      lastContact: "2024-04-28",
      status: "Active",
      notes: "Handles frontend and UI/UX positions",
      linkedIn: "linkedin.com/in/snehagupta",
      experience: "6 years",
      specialization: "Frontend Hiring",
      preferredTime: "9:00 AM - 5:00 PM IST",
      timezone: "Asia/Kolkata",
    },
    {
      id: 3,
      name: "Vikram Mehta",
      email: "vikram.mehta@datainsights.com",
      phone: "+91 76543 21098",
      company: "DataInsights Corp",
      companyLogo: "/placeholder.svg",
      position: "Talent Acquisition Lead",
      department: "Recruitment",
      location: "Hyderabad, India",
      lastContact: "2024-04-25",
      status: "Active",
      notes: "Specializes in data science and analytics roles",
      linkedIn: "linkedin.com/in/vikrammehta",
      experience: "10 years",
      specialization: "Data Science Hiring",
      preferredTime: "11:00 AM - 7:00 PM IST",
      timezone: "Asia/Kolkata",
    },
    {
      id: 4,
      name: "Priya Sharma",
      email: "priya.sharma@globalsoft.com",
      phone: "+91 65432 10987",
      company: "GlobalSoft",
      companyLogo: "/placeholder.svg",
      position: "HR Director",
      department: "Human Resources",
      location: "Pune, India",
      lastContact: "2024-03-15",
      status: "Inactive",
      notes: "On maternity leave, backup contact available",
      linkedIn: "linkedin.com/in/priyasharma",
      experience: "12 years",
      specialization: "Leadership Hiring",
      preferredTime: "Currently unavailable",
      timezone: "Asia/Kolkata",
    },
  ]

  const filteredHRs = hrContacts.filter((hr) => {
    const matchesSearch =
      hr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hr.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hr.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCompany = companyFilter === "all" || hr.company === companyFilter
    return matchesSearch && matchesCompany
  })

  const companies = [...new Set(hrContacts.map((hr) => hr.company))]

  const handleEditHR = (hr) => {
    setSelectedHR(hr)
    setShowEditHR(true)
  }

  const handleContactHR = (hr) => {
    setSelectedHR(hr)
    setShowContactDialog(true)
  }

  const handleDeleteHR = (hrId) => {
    if (confirm("Are you sure you want to delete this HR contact?")) {
      alert(`HR contact ${hrId} deleted successfully!`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact HR&apos;s</h2>
          <p className="text-muted-foreground">Manage HR contacts from recruiting companies.</p>
        </div>
        <Button onClick={() => setShowAddHR(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add HR Contact
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total HR Contacts</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hrContacts.length}</div>
            <p className="text-xs text-muted-foreground">Across {companies.length} companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hrContacts.filter((hr) => hr.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">Available for contact</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Contacts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hrContacts.filter((hr) => new Date(hr.lastContact) > new Date("2024-04-01")).length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.length}</div>
            <p className="text-xs text-muted-foreground">Unique companies</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>HR Contacts</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search HR contacts..."
                  className="pl-8 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Company & Position</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHRs.map((hr) => (
                <TableRow key={hr.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" alt={hr.name} />
                        <AvatarFallback>
                          {hr.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{hr.name}</div>
                        <div className="text-sm text-muted-foreground">{hr.experience} experience</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{hr.company}</div>
                      <div className="text-sm text-muted-foreground">{hr.position}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {hr.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {hr.email}
                      </div>
                      <div className="text-sm flex items-center">
                        <Phone className="mr-1 h-3 w-3" />
                        {hr.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="outline">{hr.specialization}</Badge>
                      <div className="text-xs text-muted-foreground">{hr.department}</div>
                    </div>
                  </TableCell>
                  <TableCell>{hr.lastContact}</TableCell>
                  <TableCell>
                    <Badge variant={hr.status === "Active" ? "default" : "secondary"}>{hr.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleContactHR(hr)}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contact HR
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditHR(hr)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Contact
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteHR(hr.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showAddHR && <AddHRDialog onClose={() => setShowAddHR(false)} />}
      {showEditHR && selectedHR && <EditHRDialog hr={selectedHR} onClose={() => setShowEditHR(false)} />}
      {showContactDialog && selectedHR && (
        <ContactHRDialog hr={selectedHR} onClose={() => setShowContactDialog(false)} />
      )}
    </div>
  )
}

function AddHRDialog({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    department: "",
    location: "",
    specialization: "",
    experience: "",
    linkedIn: "",
    preferredTime: "",
    notes: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Add HR Data:", formData)
    alert("HR contact added successfully!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Add HR Contact</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, specialization: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical Hiring">Technical Hiring</SelectItem>
                  <SelectItem value="Frontend Hiring">Frontend Hiring</SelectItem>
                  <SelectItem value="Backend Hiring">Backend Hiring</SelectItem>
                  <SelectItem value="Data Science Hiring">Data Science Hiring</SelectItem>
                  <SelectItem value="Leadership Hiring">Leadership Hiring</SelectItem>
                  <SelectItem value="General Hiring">General Hiring</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                placeholder="e.g., 5 years"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedIn">LinkedIn Profile</Label>
              <Input
                id="linkedIn"
                value={formData.linkedIn}
                onChange={(e) => setFormData((prev) => ({ ...prev, linkedIn: e.target.value }))}
                placeholder="linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Contact Time</Label>
              <Input
                id="preferredTime"
                value={formData.preferredTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, preferredTime: e.target.value }))}
                placeholder="e.g., 10:00 AM - 6:00 PM IST"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
              placeholder="Additional notes about this HR contact..."
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add HR Contact</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EditHRDialog({ hr, onClose }) {
  const [formData, setFormData] = useState({
    name: hr.name,
    email: hr.email,
    phone: hr.phone,
    company: hr.company,
    position: hr.position,
    department: hr.department,
    location: hr.location,
    specialization: hr.specialization,
    experience: hr.experience,
    linkedIn: hr.linkedIn,
    preferredTime: hr.preferredTime,
    notes: hr.notes,
    status: hr.status,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Edit HR Data:", formData)
    alert("HR contact updated successfully!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit HR Contact</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, specialization: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical Hiring">Technical Hiring</SelectItem>
                  <SelectItem value="Frontend Hiring">Frontend Hiring</SelectItem>
                  <SelectItem value="Backend Hiring">Backend Hiring</SelectItem>
                  <SelectItem value="Data Science Hiring">Data Science Hiring</SelectItem>
                  <SelectItem value="Leadership Hiring">Leadership Hiring</SelectItem>
                  <SelectItem value="General Hiring">General Hiring</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedIn">LinkedIn Profile</Label>
              <Input
                id="linkedIn"
                value={formData.linkedIn}
                onChange={(e) => setFormData((prev) => ({ ...prev, linkedIn: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Contact Time</Label>
              <Input
                id="preferredTime"
                value={formData.preferredTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, preferredTime: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update HR Contact</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ContactHRDialog({ hr, onClose }) {
  const [message, setMessage] = useState("")
  const [subject, setSubject] = useState("")

  const handleSendMessage = () => {
    if (!subject.trim() || !message.trim()) {
      alert("Please fill in both subject and message.")
      return
    }
    console.log("Sending message to:", hr.email, { subject, message })
    alert(`Message sent to ${hr.name} successfully!`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Contact HR</h2>
              <p className="text-muted-foreground">Send message to {hr.name}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" alt={hr.name} />
              <AvatarFallback>
                {hr.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{hr.name}</h3>
              <p className="text-sm text-muted-foreground">
                {hr.position} at {hr.company}
              </p>
              <p className="text-sm text-muted-foreground">{hr.email}</p>
            </div>
          </div>

          <Tabs defaultValue="info" className="space-y-4">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="info">Contact Info</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm">{hr.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-sm">{hr.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm">{hr.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Preferred Time</Label>
                    <p className="text-sm">{hr.preferredTime}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Specialization</Label>
                    <p className="text-sm">{hr.specialization}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Experience</Label>
                    <p className="text-sm">{hr.experience}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">LinkedIn</Label>
                    <p className="text-sm">{hr.linkedIn}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Last Contact</Label>
                    <p className="text-sm">{hr.lastContact}</p>
                  </div>
                </div>
              </div>
              {hr.notes && (
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm text-muted-foreground">{hr.notes}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
