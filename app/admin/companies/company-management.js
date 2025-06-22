"use client";

import { useState, useCallback,useEffect } from "react";
import {
  Building,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Globe,
  Users,
  Briefcase,
  Star,
  Mail,
  CheckCircle,
  X,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import { toast } from "sonner";
import { DialogDescription } from "@radix-ui/react-dialog";

export function CompanyManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  const [showAddCompany, setShowAddCompany] = useState(false);
  const [viewingCompany, setViewingCompany] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    activeDrives: 0,
    totalHires: 0,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalCompanies, setTotalCompanies] = useState(0);

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchQuery,
        status: statusFilter === "all" ? "" : statusFilter,
        industry: industryFilter === "all" ? "" : industryFilter,
      })

      const response = await api.get(`/admin/companies?${params}`)
      const { companies: fetchedCompanies, total, stats: fetchedStats, totalPages: pages } = response.data

      setCompanies(fetchedCompanies)
      setTotalCompanies(total)
      setStats(fetchedStats)
      setTotalPages(pages)
    } catch (error) {
      console.error("Error fetching companies:", error)
      toast("Error fetching companies data")
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, searchQuery, statusFilter, industryFilter])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])


  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, industryFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Company Management
          </h2>
          <p className="text-muted-foreground">
            Manage companies and their placement drives.
          </p>
        </div>
        <Button
          onClick={() => setShowAddCompany(true)}
          className="cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Companies
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Registered companies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Companies
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently recruiting
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drives</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDrives}</div>
            <p className="text-xs text-muted-foreground">Ongoing recruitment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hires</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHires}</div>
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
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="IT Services">IT Services</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
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
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Hires</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading companies...
                    </div>
                  </TableCell>
                </TableRow>
              ) : companies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No companies found
                  </TableCell>
                </TableRow>
              ) : (
                companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={company.logo || "/default.png"}
                            alt={company.name}
                          />
                          <AvatarFallback>
                            {company.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{company.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Globe className="mr-1 h-3 w-3" />
                            {company.website
                              ? company.website.replace("https://", "")
                              : "N/A"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                        {company.location || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          company.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {company.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                        {company.totalHires || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="mr-1 h-3 w-3 text-yellow-500 fill-current" />
                        {company.rating || "N/A"}
                      </div>
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
                            onClick={() => setViewingCompany(company)}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setEditingCompany(company)}
                            className="cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Company
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={() =>
                              deleteCompany(company, fetchCompanies)
                            }
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
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalCompanies)} of{" "}
                {totalCompanies} companies
              </p>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
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
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={
                        currentPage === pageNumber ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  );
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

      {showAddCompany && (
        <AddCompanyDialog
          onClose={() => setShowAddCompany(false)}
          onSuccess={fetchCompanies}
        />
      )}

      {viewingCompany && (
        <ViewCompanyDialog
          company={viewingCompany}
          onClose={() => setViewingCompany(null)}
          onEdit={() => {
            setViewingCompany(null);
            setEditingCompany(viewingCompany);
          }}
        />
      )}

      {editingCompany && (
        <EditCompanyDialog
          company={editingCompany}
          onClose={() => setEditingCompany(null)}
          onSuccess={fetchCompanies}
        />
      )}
    </div>
  );
}

async function deleteCompany(company, onSuccess) {
  try {
    const response = await api.delete(`/admin/company/delete/${company.id}`);
    toast("Company updated successfully! " + response.data?.message);
  } catch (error) {
    console.error("Error updating company:", error);
    toast("Error updating company");
  } finally {
    onSuccess();
  }
}

function AddCompanyDialog({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    id: "",
    recruitersId: [],
    name: "",
    industry: "",
    website: "",
    contactInfo: {
      email: "",
      address: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/create-company", formData);
      toast("Company added successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error adding company:", error);
      toast("Error adding company");
    } finally {
      onClose();
    }
  };

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
              <Label htmlFor="id">Company ID *</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, id: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, industry: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="IT Services">IT Services</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website *</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, website: e.target.value }))
                }
                placeholder="https://company.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, email: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.contactInfo.address}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      address: e.target.value,
                    },
                  }))
                }
                placeholder="City, State, Country"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recruitersId">Recruiter IDs</Label>
              <Input
                id="recruitersId"
                value={formData.recruitersId.join(", ")}
                onChange={(e) => {
                  const ids = e.target.value
                    .split(",")
                    .map((id) => id.trim())
                    .filter((id) => id !== "");
                  setFormData((prev) => ({ ...prev, recruitersId: ids }));
                }}
                placeholder="Enter recruiter IDs separated by commas"
              />
              <p className="text-xs text-muted-foreground">
                Enter multiple recruiter IDs separated by commas (e.g., REC001,
                REC002, REC003)
              </p>
            </div>
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
  );
}

function ViewCompanyDialog({ company, onClose, onEdit }) {
  return (
    <Dialog open={!!company} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={company.logo || "/default.png"}
                alt={company.name}
              />
              <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-bold">{company.name}</div>
              <div className="text-sm text-muted-foreground">
                {company.industry}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  {company.contactInfo?.email || "N/A"}
                </div>
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                  {company.website || "N/A"}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  {company.contactInfo?.address || "N/A"}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Company Status</h3>
              <Badge
                variant={company.status === "Active" ? "default" : "secondary"}
              >
                {company.status}
              </Badge>
            </div>

            {company.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {company.description}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {company.activeDrives || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Drives
                  </div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {company.totalHires || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Hires
                  </div>
                </div>
              </div>
            </div>

            {company.rating !== 0 && (
              <div>
                <h3 className="font-semibold mb-2">Rating</h3>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{company.rating}</span>
                  <span className="text-muted-foreground ml-1">/ 5.0</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit}>Edit Company</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditCompanyDialog({ company, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    id: company.id,
    name: company.name,
    industry: company.industry,
    website: company.website || "",
    recruitersId: company.recruitersId || [],
    contactInfo: {
      email: company.contactInfo?.email || company.email || "",
      address: company.contactInfo?.address || company.location || "",
    },
    status: company.status,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(
        `/admin/company/update/${company.id}`,
        formData
      );
      toast("Company updated successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error updating company:", error);
      toast("Error updating company");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={!!company} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Company - {company.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Company Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-industry">Industry *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, industry: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="IT Services">IT Services</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-website">Website *</Label>
              <Input
                id="edit-website"
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, website: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Contact Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, email: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={formData.contactInfo.address}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      address: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-recruitersId">Recruiter IDs *</Label>
              <Input
                id="edit-recruitersId"
                value={formData.recruitersId.join(", ")}
                onChange={(e) => {
                  const ids = e.target.value
                    .split(",")
                    .map((id) => id.trim())
                    .filter((id) => id !== "");
                  setFormData((prev) => ({ ...prev, recruitersId: ids }));
                }}
                placeholder="Enter recruiter IDs separated by commas"
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter multiple recruiter IDs separated by commas
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
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
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Company</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
