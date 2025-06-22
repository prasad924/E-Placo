"use client"

import { useState, useEffect } from "react"
import {
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  GraduationCap,
  Mail,
  CheckCircle,
  X,
  Upload,
  FileText,
  Phone,
  AlertCircle,
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
import api from "@/lib/api"
import { toast } from "sonner"

export default function StudentManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const [showAddStudent, setShowAddStudent] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showViewProfile, setShowViewProfile] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    placed: 0,
    averageCgpa: 0,
  })
  const [totalPages, setTotalPages] = useState(1)
  const [totalStudents, setTotalStudents] = useState(0)

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchQuery,
        department: departmentFilter === "all" ? "" : departmentFilter,
        status: statusFilter === "all" ? "" : statusFilter,
      })

      const response = await api.get(`/admin/students?${params}`)
      const { students: fetchedStudents, total, stats: fetchedStats, totalPages: pages } = response.data

      setStudents(fetchedStudents)
      setTotalStudents(total)
      setStats(fetchedStats)
      setTotalPages(pages)
    } catch (error) {
      console.error("Error fetching students:", error)
      toast("Error fetching students data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [currentPage, itemsPerPage, searchQuery, departmentFilter, statusFilter])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, departmentFilter, statusFilter])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Management</h2>
          <p className="text-muted-foreground">Manage student profiles and placement activities.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowImportDialog(true)} className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Import Students
          </Button>
          <Button onClick={() => setShowAddStudent(true)} className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Registered students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Currently seeking placement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placed Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.placed}</div>
            <p className="text-xs text-muted-foreground">Successfully placed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CGPA</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageCgpa?.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Students</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Computer Science and Engineering">Computer Science and Engineering</SelectItem>
                  <SelectItem value="Computer Science and Engineering(DS)">
                    Computer Science and Engineering(DS)
                  </SelectItem>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="placed">Placed</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Applications</TableHead>
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
                      Loading students...
                    </div>
                  </TableCell>
                </TableRow>
              ) : students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.url || "/default.png"} alt={student.name} />
                          <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.batch}</TableCell>
                    <TableCell>
                      <Badge variant={student.cgpa >= 8.5 ? "default" : student.cgpa >= 7.5 ? "secondary" : "outline"}>
                        {student.cgpa || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.applicationsCount}</TableCell>
                    <TableCell>
                    <Badge
                      variant={
                        student.status === "Placed" ? "default" : student.status === "Active" ? "secondary" : "outline"
                      }
                    >
                      {student.status || "Idle"}
                    </Badge>
                  </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedStudent(student)
                              setShowViewProfile(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedStudent(student)
                              setShowEditProfile(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Student
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={()=>deleteStudent(student, fetchStudents)}>
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalStudents)}{" "}
                of {totalStudents} students
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

      {showAddStudent && <AddStudentDialog onClose={() => setShowAddStudent(false)} onSuccess={fetchStudents} />}
      {showImportDialog && (
        <ImportStudentsDialog onClose={() => setShowImportDialog(false)} onSuccess={fetchStudents} />
      )}
      {showViewProfile && selectedStudent && (
        <ViewStudentProfileDialog
          student={selectedStudent}
          onClose={() => {
            setShowViewProfile(false)
            setSelectedStudent(null)
          }}
        />
      )}
      {showEditProfile && selectedStudent && (
        <EditStudentDialog
          student={selectedStudent}
          onClose={() => {
            setShowEditProfile(false)
            setSelectedStudent(null)
          }}
          onSuccess={fetchStudents}
        />
      )}
    </div>
  )
}

async function deleteStudent(student, onSuccess) {
  try {
      const response = await api.delete(`/student/delete/${student.id}`)
      toast("Response: " + response.data?.message)
    } catch (error) {
      console.error("Error deleting student:", error)
      toast("Error deleting student")
    } finally {
      onSuccess()
    }
}

function AddStudentDialog({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    finishingSchool: "",
    department: "",
    batch: "",
    cloudinaryPublicId: "",
  })

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const res = await api.post("/student/create", formData)
      toast("Status : " + res.data?.message)
      onSuccess()
    } catch (err) {
      toast("Error while creating user (or)\n Student already exists ")
    } finally {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Add New Student</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Roll No *</Label>
              <Input
                id="id"
                value={formData.id}
                maxLength={10}
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
              <Label htmlFor="finishingSchool">Finishing School</Label>
              <Input
                id="finishingSchool"
                value={formData.finishingSchool}
                maxLength={3}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    finishingSchool: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science and Engineering">Computer Science and Engineering</SelectItem>
                  <SelectItem value="Computer Science and Engineering(DS)">
                    Computer Science and Engineering(DS)
                  </SelectItem>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="batch">Batch Year *</Label>
              <Select
                value={formData.batch}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, batch: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 9 }, (_, i) => {
                    const year = new Date().getFullYear() - 4 + i
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cloudinaryPublicId">Cloudinary ID</Label>
              <Input
                id="cloudinaryPublicId"
                value={formData.cloudinaryPublicId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cloudinaryPublicId: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Student</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EditStudentDialog({ student, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    id: student.id,
    name: student.name,
    email: student.email,
    finishingSchool: student.finishingSchool || "",
    department: student.department,
    batch: student.batch,
    status: student.status,
    cloudinaryPublicId: student.cloudinaryPublicId || "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updateData = { ...formData }
      const response = await api.patch(`/student/update/${student.id}`, updateData)
      toast("Student updated successfully")
      onSuccess()
    } catch (error) {
      console.error("Error updating student:", error)
      toast("Error updating student")
    } finally {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit Student</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-id">Roll No *</Label>
              <Input
                id="edit-id"
                value={formData.id}
                onChange={(e) => setFormData((prev) => ({ ...prev, id: e.target.value }))}
                required
                maxLength={10}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-finishingSchool">Finishing School</Label>
              <Input
                id="edit-finishingSchool"
                value={formData.finishingSchool}
                maxLength={3}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    finishingSchool: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-cloudinaryPublicId">Cloudinary ID</Label>
              <Input
                id="edit-cloudinaryPublicId"
                value={formData.cloudinaryPublicId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cloudinaryPublicId: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science and Engineering">Computer Science and Engineering</SelectItem>
                  <SelectItem value="Computer Science and Engineering(DS)">
                    Computer Science and Engineering(DS)
                  </SelectItem>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-batch">Batch Year *</Label>
              <Select
                value={formData.batch}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, batch: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 9 }, (_, i) => {
                    const year = new Date().getFullYear() - 4 + i
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Placed">Placed</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ImportStudentsDialog({ onClose, onSuccess }) {
  const [file, setFile] = useState(null)
  const [previewData, setPreviewData] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [importSettings, setImportSettings] = useState({
    defaultBatch: new Date().getFullYear().toString(),
    defaultDepartment: "Computer Science and Engineering",
  })

  const parseCSV = (csvText) => {
    const lines = csvText.split("\n").filter((line) => line.trim())
    if (lines.length < 2) {
      throw new Error("CSV file must have at least a header row and one data row")
    }

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())
    const students = []
    const parseErrors = []
    const headerMap = {
      id: ["id"],
      name: ["name"],
      email: ["email"],
      finishingSchool: ["finishingschool", "finishing school"],
      cloudinaryPublicId: ["cloudinarypublicid", "cloudinary public id", "cloudinaryurl"],
    }

    const columnIndices = {}
    Object.entries(headerMap).forEach(([key, possibleHeaders]) => {
      const index = headers.findIndex((h) => possibleHeaders.includes(h))
      if (index !== -1) {
        columnIndices[key] = index
      }
    })

    const requiredFields = ["id", "name", "email"]
    const missingFields = requiredFields.filter((field) => columnIndices[field] === undefined)
    if (missingFields.length > 0) {
      throw new Error(`Missing required columns: ${missingFields.join(", ")}`)
    }

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""))

      try {
        const student = {
          id: values[columnIndices.id] || "",
          name: values[columnIndices.name] || "",
          email: values[columnIndices.email] || "",
          finishingSchool: values[columnIndices.finishingSchool] || "",
          department: importSettings.defaultDepartment,
          batch: importSettings.defaultBatch,
          cloudinaryPublicId: values[columnIndices.cloudinaryPublicId] || "",
        }

        if (!student.id || !student.name || !student.email) {
          parseErrors.push(`Row ${i + 1}: Missing required fields (ID, Name, or Email)`)
          continue
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(student.email)) {
          parseErrors.push(`Row ${i + 1}: Invalid email format`)
          continue
        }

        students.push(student)
      } catch (error) {
        parseErrors.push(`Row ${i + 1}: Error parsing data`)
      }
    }

    if (parseErrors.length > 0) {
      setErrors(parseErrors)
    }

    return students
  }

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files?.[0]
    if (!uploadedFile) return

    setFile(uploadedFile)
    setErrors([])
    setIsLoading(true)

    try {
      const text = await uploadedFile.text()
      const parsedStudents = parseCSV(text)
      setPreviewData(parsedStudents)
      setShowPreview(true)
    } catch (error) {
      setErrors([error instanceof Error ? error.message : "Failed to parse CSV file"])
    } finally {
      setIsLoading(false)
    }
  }

  const handleImport = async () => {
    if (previewData.length === 0) return

    setIsLoading(true)
    try {
      const res = await api.post("student/add-users", previewData)

      setPreviewData([])
      setFile(null)
      setShowPreview(false)
      setErrors([])
      setImportSettings({
        defaultBatch: new Date().getFullYear().toString(),
        defaultDepartment: "Computer Science and Engineering",
        overwriteExisting: false,
      })

      toast(`Successfully prepared ${previewData.length} students for bulk insert!\n` + res.data?.message)

      onClose()
      onSuccess()
    } catch (error) {
      console.error("Error while processing students:", error)
      toast("Error while processing students")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Import Students from CSV</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {errors.length > 0 && (
            <div className="border border-red-200 bg-red-50 rounded-md p-4">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Parsing Errors:</span>
              </div>
              <div className="space-y-1 text-sm text-red-700">
                {errors.slice(0, 5).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
                {errors.length > 5 && <div>... and {errors.length - 5} more errors</div>}
              </div>
            </div>
          )}

          {!showPreview ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload CSV File</Label>
                <div
                  className="border border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => document.getElementById("csv-upload")?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">{file ? file.name : "Click to upload CSV file"}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    CSV file with columns: id, name, email, finishingSchool (optional), cloudinaryPublicId (optional)
                  </p>
                  <Button variant="outline" disabled={isLoading}>
                    <FileText className="mr-2 h-4 w-4" />
                    {isLoading ? "Processing..." : "Select CSV File"}
                  </Button>
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultBatch">Default Batch Year</Label>
                  <Select
                    value={importSettings.defaultBatch}
                    onValueChange={(value) =>
                      setImportSettings((prev) => ({
                        ...prev,
                        defaultBatch: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 9 }, (_, i) => {
                        const year = new Date().getFullYear() - 4 + i
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultDepartment">Default Department</Label>
                  <Select
                    value={importSettings.defaultDepartment}
                    onValueChange={(value) =>
                      setImportSettings((prev) => ({
                        ...prev,
                        defaultDepartment: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science and Engineering">Computer Science and Engineering</SelectItem>
                      <SelectItem value="Computer Science and Engineering(DS)">
                        Computer Science and Engineering(DS)
                      </SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>CSV Format Instructions</Label>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• First row should contain column headers</p>
                  <p>• Required columns: id, name, email</p>
                  <p>• Optional columns: finishingSchool, cloudinaryPublicId</p>
                  <p>• All students will use the selected Batch and Department below</p>
                  <p>• Example: id,name,email,finishingSchool,cloudinaryPublicId</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Preview Import Data</h3>
                <Badge variant="secondary">{previewData.length} students found</Badge>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Finishing School</TableHead>
                      <TableHead>Cloudinary ID</TableHead>
                      <TableHead>Department (Applied)</TableHead>
                      <TableHead>Batch (Applied)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.slice(0, 10).map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.finishingSchool || "-"}</TableCell>
                        <TableCell>{student.cloudinaryPublicId || "-"}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.batch}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {previewData.length > 10 && (
                <p className="text-sm text-muted-foreground text-center">
                  Showing first 10 rows. {previewData.length - 10} more students will be imported.
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {showPreview && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowPreview(false)
                  setPreviewData([])
                  setFile(null)
                  setErrors([])
                }}
              >
                Back to Upload
              </Button>
            )}
            {showPreview ? (
              <Button onClick={handleImport} disabled={isLoading || previewData.length === 0}>
                {isLoading ? "Importing..." : `Import ${previewData.length} Students`}
              </Button>
            ) : (
              <Button disabled={!file || isLoading}>{isLoading ? "Processing..." : "Preview Data"}</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ViewStudentProfileDialog({ student, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Student Profile</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={student.url || "/default.png"} alt={student.name} />
                    <AvatarFallback className="text-lg">{student.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-2">{student.name}</h3>
                  <p className="text-muted-foreground mb-4">{student.department}</p>
                  <div className="space-y-2">
                    <Badge variant="secondary">Batch of {student.batch}</Badge>
                    <Badge variant={student.cgpa >= 8.5 ? "default" : student.cgpa >= 7.5 ? "secondary" : "outline"}>
                      CGPA: {student.cgpa}
                    </Badge>
                    <Badge
                      variant={
                        student.status === "Placed" ? "default" : student.status === "Active" ? "secondary" : "outline"
                      }
                    >
                      {student.status || "Idle"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{student.email}</span>
                  </div>
                  {student.personalProfile?.phoneNumber && 
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{student.personalProfile.phoneNumber}</span>
                  </div>}
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Roll Number: {student.id}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Department</Label>
                      <p className="text-sm text-muted-foreground">{student.department}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Batch Year</Label>
                      <p className="text-sm text-muted-foreground">{student.batch}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">CGPA</Label>
                      <p className="text-sm text-muted-foreground">{student.cgpa}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <p className="text-sm text-muted-foreground">{student.status || "Idle"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Placement Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{student.applicationsCount}</div>
                      <p className="text-sm text-muted-foreground">Applications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
