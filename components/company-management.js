"use client"

import React from "react"

import { useState } from "react"
import { Building, Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Eye, MapPin, Globe, Users, Briefcase, Star, Mail, CheckCircle, X } from "lucide-react"
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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function CompanyManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddCompany, setShowAddCompany] = useState(false)
  const [viewingCompany, setViewingCompany] = useState(null)
  const [editingCompany, setEditingCompany] = useState(null)

  const companies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "default.png",
      industry: "Technology",
      location: "Bangalore, India",
      website: "https://techcorp.com",
      email: "hr@techcorp.com",
      phone: "+91 98765 43210",
      status: "Active",
      activeDrives: 3,
      totalHires: 45,
      rating: 4.5,
      lastContact: "2024-05-01",
    },
    {
      id: 2,
      name: "InnovateTech",
      logo: "default.png",
      industry: "Software",
      location: "Mumbai, India",
      website: "https://innovatetech.com",
      email: "careers@innovatetech.com",
      phone: "+91 87654 32109",
      status: "Active",
      activeDrives: 2,
      totalHires: 28,
      rating: 4.2,
      lastContact: "2024-04-28",
    },
    {
      id: 3,
      name: "GlobalSoft",
      logo: "default.png",
      industry: "IT Services",
      location: "Hyderabad, India",
      website: "https://globalsoft.com",
      email: "recruitment@globalsoft.com",
      phone: "+91 76543 21098",
      status: "Inactive",
      activeDrives: 0,
      totalHires: 67,
      rating: 4.7,
      lastContact: "2024-03-15",
    },
  ]

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || company.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Company Management</h2>
          <p className="text-muted-foreground">Manage companies and their placement drives.</p>
        </div>
        <Button onClick={() => setShowAddCompany(true)} className={'cursor-pointer'}>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.filter((c) => c.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">Currently recruiting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drives</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.reduce((sum, c) => sum + c.activeDrives, 0)}</div>
            <p className="text-xs text-muted-foreground">Ongoing recruitment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hires</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.reduce((sum, c) => sum + c.totalHires, 0)}</div>
            <p className="text-xs text-muted-foreground">All time placements</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Companies</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  className="pl-8 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
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
                <TableHead>Id</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active Drives</TableHead>
                <TableHead>Total Hires</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                <TableCell>{company.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={company.logo || "default.png"} alt={company.name} />
                        <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Globe className="mr-1 h-3 w-3" />
                          {company.website.replace("https://", "")}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                      {company.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={company.status === "Active" ? "default" : "secondary"}>{company.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-3 w-3 text-muted-foreground" />
                      {company.activeDrives}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                      {company.totalHires}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="mr-1 h-3 w-3 text-yellow-500 fill-current" />
                      {company.rating}
                    </div>
                  </TableCell>
                  <TableCell>{company.lastContact}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewingCompany(company)} className={'cursor-pointer'}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingCompany(company)} className={'cursor-pointer'}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Company
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 cursor-pointer">
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

      {showAddCompany && <AddCompanyDialog onClose={() => setShowAddCompany(false)} />}

      {viewingCompany && (
        <Dialog open={!!viewingCompany} onOpenChange={() => setViewingCompany(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={viewingCompany.logo || "default.png"} alt={viewingCompany.name} />
                  <AvatarFallback>{viewingCompany.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xl font-bold">{viewingCompany.name}</div>
                  <div className="text-sm text-muted-foreground">{viewingCompany.industry}</div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      {viewingCompany.email}
                    </div>
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      {viewingCompany.website}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      {viewingCompany.location}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Company Status</h3>
                  <Badge variant={viewingCompany.status === "Active" ? "default" : "secondary"}>
                    {viewingCompany.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{viewingCompany.activeDrives}</div>
                      <div className="text-sm text-muted-foreground">Active Drives</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{viewingCompany.totalHires}</div>
                      <div className="text-sm text-muted-foreground">Total Hires</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Rating</h3>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{viewingCompany.rating}</span>
                    <span className="text-muted-foreground ml-1">/ 5.0</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Last Contact</h3>
                  <p className="text-sm text-muted-foreground">{viewingCompany.lastContact}</p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setViewingCompany(null)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setViewingCompany(null)
                  setEditingCompany(viewingCompany)
                }}
              >
                Edit Company
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {editingCompany && (
        <Dialog open={!!editingCompany} onOpenChange={() => setEditingCompany(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Company - {editingCompany.name}</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                console.log("Company updated:", editingCompany)
                alert("Company updated successfully!")
                setEditingCompany(null)
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Company Name *</Label>
                  <Input id="edit-name" defaultValue={editingCompany.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-industry">Industry *</Label>
                  <Input id="edit-industry" defaultValue={editingCompany.industry} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input id="edit-location" defaultValue={editingCompany.location} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-website">Website</Label>
                  <Input id="edit-website" type="url" defaultValue={editingCompany.website} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Contact Email *</Label>
                  <Input id="edit-email" type="email" defaultValue={editingCompany.email} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Contact Phone</Label>
                  <Input id="edit-phone" type="tel" defaultValue={editingCompany.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={editingCompany.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setEditingCompany(null)}>
                  Cancel
                </Button>
                <Button type="submit">Update Company</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function AddCompanyDialog({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    location: "",
    website: "",
    email: "",
    phone: "",
    description: "",
    logo: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    //backend is pending
    console.log("Add Company Data:", formData)
    alert("Company added successfully!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Add New Company</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="City, State, Country"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                placeholder="https://company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Company Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={(e) => setFormData((prev) => ({ ...prev, logo: e.target.files?.[0] || null }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              placeholder="Brief description about the company..."
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Company</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
