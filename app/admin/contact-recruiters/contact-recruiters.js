"use client"

import { useState,useCallback, useEffect } from "react"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building,
  Calendar,
  User,
  X,
  MessageSquare,
  Loader2,
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
import api from "@/lib/api"
import { toast } from "sonner"

export function ContactRecruiters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specializationFilter, setSpecializationFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddRecruiter, setShowAddRecruiter] = useState(false)
  const [showEditRecruiter, setShowEditRecruiter] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [selectedRecruiter, setSelectedRecruiter] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [recruiterContacts, setRecruiterContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    recentContacts: 0,
    companies: 0,
  })
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecruiters, setTotalRecruiters] = useState(0)

  const fetchRecruiterContacts = useCallback (async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchQuery,
        specialization: specializationFilter === "all" ? "" : specializationFilter,
        status: statusFilter === "all" ? "" : statusFilter,
      })

      const response = await api.get(`/recruiter/get-recruiters?${params}`)
      const { recruiters: fetchedRecruiters, total, stats: fetchedStats, totalPages: pages } = response.data

      setRecruiterContacts(fetchedRecruiters)
      setTotalRecruiters(total)
      setStats(fetchedStats)
      setTotalPages(pages)
    } catch (error) {
      console.error("Error fetching Recruiter contacts:", error)
      toast("Error fetching Recruiter contacts data")
    } finally {
      setLoading(false)
    }
  },[currentPage, itemsPerPage, searchQuery, specializationFilter, statusFilter])


  useEffect(() => {
    fetchRecruiterContacts()
  }, [fetchRecruiterContacts])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, specializationFilter, statusFilter])

  const handleEditRecruiter = (recruiter) => {
    setSelectedRecruiter(recruiter)
    setShowEditRecruiter(true)
  }

  const handleContactRecruiter = (recruiter) => {
    setSelectedRecruiter(recruiter)
    setShowContactDialog(true)
  }

  const handleDeleteRecruiter = async (recruiterId) => {
    if (confirm("Are you sure you want to delete this Recruiter contact?")) {
      try {
        const res = await api.delete(`/recruiter/delete/${recruiterId}`)
        toast("Response: "+res.data?.message)
        fetchRecruiterContacts()
      } catch (error) {
        console.error("Error deleting Recruiter contact:", error)
        toast("Error deleting Recruiter contact")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact Recruiter&apos;s</h2>
          <p className="text-muted-foreground">Manage Recruiter contacts from recruiting companies.</p>
        </div>
        <Button onClick={() => setShowAddRecruiter(true)} className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Recruiter Contact
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recruiter Contacts</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Across {stats.companies} companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Available for contact</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Contacts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentContacts}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.companies}</div>
            <p className="text-xs text-muted-foreground">Unique companies</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recruiter Contacts</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Recruiter contacts..."
                  className="pl-8 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                 <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Technical Hiring">Technical Hiring</SelectItem>
                  <SelectItem value="Frontend Hiring">Frontend Hiring</SelectItem>
                  <SelectItem value="Backend Hiring">Backend Hiring</SelectItem>
                  <SelectItem value="Data Science Hiring">Data Science Hiring</SelectItem>
                  <SelectItem value="Leadership Hiring">Leadership Hiring</SelectItem>
                  <SelectItem value="General Hiring">General Hiring</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
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
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading Recruiter contacts...
                    </div>
                  </TableCell>
                </TableRow>
              ) : recruiterContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No Recruiter contacts found
                  </TableCell>
                </TableRow>
              ) : (
                recruiterContacts.map((recruiter) => (
                  <TableRow key={recruiter.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={recruiter.url || "/default.png"} alt={recruiter.name} />
                          <AvatarFallback>
                            {recruiter.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{recruiter.name}</div>
                          <div className="text-sm text-muted-foreground">{recruiter.experience} experience</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{recruiter.companyId.name}</div>
                        <div className="text-sm text-muted-foreground">{recruiter.designation}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm flex items-center">
                          <Mail className="mr-1 h-3 w-3" />
                          {recruiter.email}
                        </div>
                        <div className="text-sm flex items-center">
                          <Phone className="mr-1 h-3 w-3" />
                          {recruiter.phoneNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline">{recruiter.specialization}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={recruiter.status === "Active" ? "default" : "secondary"}>{recruiter.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleContactRecruiter(recruiter)} className="cursor-pointer">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contact Recruiter
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditRecruiter(recruiter)} className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleDeleteRecruiter(recruiter.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between px-2 py-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalRecruiters)} of{" "}
                {totalRecruiters} Recruiter contacts
              </p>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">per page</span>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber
                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showAddRecruiter && <AddRecruiterDialog onClose={() => setShowAddRecruiter(false)} onSuccess={fetchRecruiterContacts} />}
      {showEditRecruiter && selectedRecruiter && (
        <EditRecruiterDialog
          recruiter={selectedRecruiter}
          onClose={() => {
            setShowEditRecruiter(false)
            setSelectedRecruiter(null)
          }}
          onSuccess={fetchRecruiterContacts}
        />
      )}
      {showContactDialog && selectedRecruiter && (
        <ContactRecruiterDialog
          recruiter={selectedRecruiter}
          onClose={() => {
            setShowContactDialog(false)
            setSelectedRecruiter(null)
          }}
        />
      )}
    </div>
  )
}

function AddRecruiterDialog({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    companyID : "",
    designation: "",
    department: "",
    location: "",
    specialization: "",
    experience: "",
    linkedinProfile: "",
    password: "",
    additionalNotes: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("/recruiter/create", formData)
      toast("Respose: "+ response.data?.message)
      onSuccess()
    } catch (error) {
      console.error("Error adding Recruiter contact:", error)
      toast("Error adding Recruiter contact")
    } finally {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Add Recruiter Contact</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Employee ID *</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => setFormData((prev) => ({ ...prev, id: e.target.value }))}
                required
              />
            </div>
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
                value={formData.phoneNumber}
                maxLength ={14}
                onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company ID<br/>(Must be registered first)*</Label>
              <Input
                id="company"
                value={formData.companyID}
                onChange={(e) => setFormData((prev) => ({ ...prev, companyID: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => setFormData((prev) => ({ ...prev, designation: e.target.value }))}
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
              <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
              <Input
                id="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={(e) => setFormData((prev) => ({ ...prev, linkedinProfile: e.target.value }))}
                placeholder="linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Initial Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="password"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Notes</Label>
            <Textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
              rows={3}
              placeholder="Additional notes about this Recruiter contact..."
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Recruiter Contact</Button>
          </div>
        </form>
      </div>
    </div>
  )
}


function EditRecruiterDialog({ recruiter, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: recruiter.name,
    email: recruiter.email,
    phoneNumber: recruiter.phoneNumber,
    companyID: recruiter.companyId.id,
    designation: recruiter.designation,
    department: recruiter.department,
    specialization: recruiter.specialization,
    experience: recruiter.experience,
    linkedinProfile: recruiter.linkedinProfile,
    status: recruiter.status,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.patch(`/recruiter/update/${recruiter.id}`, formData)
      toast("Response: "+response.data?.message)
      onSuccess()
    } catch (error) {
      console.error("Error updating Recruiter contact:", error)
      toast("Error updating Recruiter contact")
    } finally {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit Recruiter Contact</h2>
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
                maxLength={14}
                type="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.companyID}
                onChange={(e) => setFormData((prev) => ({ ...prev, companyID: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.designation}
                onChange={(e) => setFormData((prev) => ({ ...prev, designation: e.target.value }))}
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
              <Label htmlFor="specialization">Specialization</Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, specialization: value }))}
              >
                <SelectTrigger>
                  <SelectValue value={formData.specialization || "None"}/>
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
              <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
              <Input
                id="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={(e) => setFormData((prev) => ({ ...prev, linkedinProfile: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Recruiter Contact</Button>
          </div>
        </form>
      </div>
    </div>
  )
}


function ContactRecruiterDialog({ recruiter, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Contact Recruiter</h2>
              <p className="text-muted-foreground">Send message to {recruiter.name}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={recruiter.url || "/default.png"} alt={recruiter.name} />
              <AvatarFallback>
                {recruiter.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{recruiter.name}</h3>
              <p className="text-sm text-muted-foreground">
                {recruiter.designation} at {recruiter.companyId.name}
              </p>
              <p className="text-sm text-muted-foreground">{recruiter.email}</p>
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
                    <p className="text-sm">{recruiter.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-sm">{recruiter.phoneNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm">{recruiter.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Specialization</Label>
                    <p className="text-sm">{recruiter.specialization}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Experience</Label>
                    <p className="text-sm">{recruiter.experience}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">LinkedIn</Label>
                    <p className="text-sm">{recruiter.linkedinProfile}</p>
                  </div>
                </div>
              </div>
              {recruiter.additionalNotes && (
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm text-muted-foreground">{recruiter.additionalNotes}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
