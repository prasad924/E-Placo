"use client"

import React from "react"

import { useState } from "react"
import { Users, Search, Plus, MoreHorizontal, Edit, Trash2, Eye, GraduationCap, Mail, CheckCircle, X, Upload, FileText, Phone } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"

export default function StudentManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showViewProfile, setShowViewProfile] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const students = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@college.edu",
      phone: "+91 98765 43210",
      rollNumber: "CS2021001",
      department: "Computer Science",
      batch: "2025",
      cgpa: 8.7,
      status: "Active",
      profilePicture: "/placeholder.svg",
      applications: 5,
      interviews: 2,
      offers: 1,
      lastActive: "2024-05-01",
    },
    {
      id: 2,
      name: "Rahul Patel",
      email: "rahul.patel@college.edu",
      phone: "+91 87654 32109",
      rollNumber: "EC2021002",
      department: "Electronics",
      batch: "2025",
      cgpa: 8.2,
      status: "Active",
      profilePicture: "/placeholder.svg",
      applications: 3,
      interviews: 1,
      offers: 0,
      lastActive: "2024-04-30",
    },
    {
      id: 3,
      name: "Ananya Singh",
      email: "ananya.singh@college.edu",
      phone: "+91 76543 21098",
      rollNumber: "CS2021003",
      department: "Computer Science",
      batch: "2025",
      cgpa: 9.1,
      status: "Placed",
      profilePicture: "/placeholder.svg",
      applications: 4,
      interviews: 3,
      offers: 2,
      lastActive: "2024-05-02",
    },
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter
    const matchesStatus = statusFilter === "all" || student.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesDepartment && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Management</h2>
          <p className="text-muted-foreground">Manage student profiles and placement activities.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowImportDialog(true)} className={'cursor-pointer'}>
            <Upload className="mr-2 h-4 w-4" />
            Import Students
          </Button>
          <Button onClick={() => setShowAddStudent(true)} className={'cursor-pointer'}>
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
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Registered students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">Currently seeking placement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placed Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.status === "Placed").length}</div>
            <p className="text-xs text-muted-foreground">Successfully placed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CGPA</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(1)}
            </div>
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
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
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
                <TableHead>Status</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Offers</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.profilePicture || "/placeholder.svg"} alt={student.name} />
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
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.batch}</TableCell>
                  <TableCell>
                    <Badge variant={student.cgpa >= 8.5 ? "default" : student.cgpa >= 7.5 ? "secondary" : "outline"}>
                      {student.cgpa}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === "Placed" ? "default" : student.status === "Active" ? "secondary" : "outline"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.applications}</TableCell>
                  <TableCell>
                    <Badge variant={student.offers > 0 ? "default" : "outline"}>{student.offers}</Badge>
                  </TableCell>
                  <TableCell>{student.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className={'cursor-pointer'}
                          onClick={() => {
                            setSelectedStudent(student)
                            setShowViewProfile(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className={'cursor-pointer'}
                          onClick={() => {
                            setSelectedStudent(student)
                            setShowEditProfile(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Student
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
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

      {showAddStudent && <AddStudentDialog onClose={() => setShowAddStudent(false)} />}
      {showImportDialog && <ImportStudentsDialog onClose={() => setShowImportDialog(false)} />}
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
          onSave={(updatedStudent) => {
            console.log("Updated student:", updatedStudent)
            //handle backend is pending
            setShowEditProfile(false)
            setSelectedStudent(null)
          }}
        />
      )}
    </div>
  )
}

function AddStudentDialog({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollNumber: "",
    department: "",
    batch: "",
    cgpa: "",
    profilePicture: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Add Student Data:", formData)
    alert("Student added successfully!")
    onClose()
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
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number *</Label>
              <Input
                id="rollNumber"
                value={formData.rollNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, rollNumber: e.target.value }))}
                required
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
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
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
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cgpa">CGPA</Label>
              <Input
                id="cgpa"
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={(e) => setFormData((prev) => ({ ...prev, cgpa: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <Input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData((prev) => ({ ...prev, profilePicture: e.target.files?.[0] || null }))}
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

function ImportStudentsDialog({ onClose }) {
  const [file, setFile] = useState(null)
  const [previewData, setPreviewData] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [importSettings, setImportSettings] = useState({
    batch: "2025",
    department: "all",
    overwriteExisting: false,
  })

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      const mockData = [
        {
          name: "John Doe",
          email: "john@college.edu",
          rollNumber: "CS2025001",
          department: "Computer Science",
          cgpa: 8.5,
        },
        {
          name: "Jane Smith",
          email: "jane@college.edu",
          rollNumber: "CS2025002",
          department: "Computer Science",
          cgpa: 9.0,
        },
        {
          name: "Bob Johnson",
          email: "bob@college.edu",
          rollNumber: "EC2025001",
          department: "Electronics",
          cgpa: 7.8,
        },
      ]
      setPreviewData(mockData)
      setShowPreview(true)
    }
  }

  const handleImport = () => {
    console.log("Importing students:", { file, previewData, importSettings })
    alert(`Successfully imported ${previewData.length} students!`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Import Students from Excel</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {!showPreview ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Upload Excel File</Label>
                <div
                  className="border border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => document.getElementById("excel-upload")?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">{file ? file.name : "Click to upload Excel file"}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Excel file with columns: Name, Email, Roll Number, Department, CGPA, Phone
                  </p>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Select Excel File
                  </Button>
                  <input
                    id="excel-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batch">Default Batch Year</Label>
                  <Select
                    value={importSettings.batch}
                    onValueChange={(value) => setImportSettings((prev) => ({ ...prev, batch: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Filter Department</Label>
                  <Select
                    value={importSettings.department}
                    onValueChange={(value) => setImportSettings((prev) => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Civil">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Options</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="overwrite"
                      checked={importSettings.overwriteExisting}
                      onChange={(e) => setImportSettings((prev) => ({ ...prev, overwriteExisting: e.target.checked }))}
                    />
                    <Label htmlFor="overwrite">Overwrite existing students</Label>
                  </div>
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
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>CGPA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.slice(0, 10).map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.cgpa}</TableCell>
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
              <Button type="button" variant="outline" onClick={() => setShowPreview(false)}>
                Back to Upload
              </Button>
            )}
            {showPreview ? (
              <Button onClick={handleImport}>Import {previewData.length} Students</Button>
            ) : (
              <Button disabled={!file}>Preview Data</Button>
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
            {/* Profile Picture and Basic Info */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={student.profilePicture || "/placeholder.svg"} alt={student.name} />
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
                      {student.status}
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
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{student.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Roll Number: {student.rollNumber}</span>
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
                      <p className="text-sm text-muted-foreground">{student.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Placement Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{student.applications}</div>
                      <p className="text-sm text-muted-foreground">Applications</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">{student.interviews}</div>
                      <p className="text-sm text-muted-foreground">Interviews</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{student.offers}</div>
                      <p className="text-sm text-muted-foreground">Offers</p>
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

function EditStudentDialog({ student, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone,
    rollNumber: student.rollNumber,
    department: student.department,
    batch: student.batch,
    cgpa: student.cgpa.toString(),
    status: student.status,
    profilePicture: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...student, ...formData, cgpa: Number.parseFloat(formData.cgpa) })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit Student Profile</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-rollNumber">Roll Number *</Label>
              <Input
                id="edit-rollNumber"
                value={formData.rollNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, rollNumber: e.target.value }))}
                required
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
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
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
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-cgpa">CGPA</Label>
              <Input
                id="edit-cgpa"
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={(e) => setFormData((prev) => ({ ...prev, cgpa: e.target.value }))}
              />
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
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-profilePicture">Profile Picture</Label>
              <Input
                id="edit-profilePicture"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData((prev) => ({ ...prev, profilePicture: e.target.files?.[0] || null }))}
              />
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
