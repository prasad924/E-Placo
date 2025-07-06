"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import {
  Calendar,
  Building,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  GraduationCap,
  Briefcase,
  Loader2,
  MapPin,
} from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";
import NewDriveDialog from "@/components/newDrive";
import { EditDriveDialog } from "@/components/editDriveDialog";
import { ViewDriveDialog } from "@/components/view-drive-dialog";
import { deleteDrive } from "@/components/delete-drive";

export function DriveManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [showNewDrive, setShowNewDrive] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [editingDrive, setEditingDrive] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDrives: 0,
    activeDrives: 0,
    companiesRegistered: 0,
    studentsPlaced: 0,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalDrives, setTotalDrives] = useState(0);

  const fetchDrives = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        status: statusFilter === "all" ? "" : statusFilter,
        eligibleStudents: typeFilter === "all" ? "" : typeFilter,
        approvedByadmin: true,
      });

      const response = await api.get(`/admin/drives?${params}`);
      const {
        jobDrives: fetchedDrives,
        total,
        stats: fetchedStats,
        totalPages: pages,
      } = response.data;

      setDrives(fetchedDrives);
      setTotalDrives(total);
      setStats(fetchedStats);
      setTotalPages(pages);
    } catch (error) {
      console.error("Error fetching drives:", error);
      toast("Error fetching drives data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, [currentPage, itemsPerPage, searchTerm, statusFilter, typeFilter]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Drive Management
          </h1>
          <p className="text-muted-foreground">
            Manage placement drives and recruitment processes
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowNewDrive(true)}
          className="cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Drive
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drives</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDrives}</div>
            <p className="text-xs text-muted-foreground">
              All placement drives
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drives</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDrives}</div>
            <p className="text-xs text-muted-foreground">
              Currently accepting applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Companies Registered
            </CardTitle>
            <Building className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.companiesRegistered}
            </div>
            <p className="text-xs text-muted-foreground">
              Participating companies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Students Placed
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.studentsPlaced}</div>
            <p className="text-xs text-muted-foreground">Successfully placed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Placement Drives</CardTitle>
          <CardDescription>
            Manage and monitor all placement drives
          </CardDescription>
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
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by eligibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="Elite">Elite</SelectItem>
                  <SelectItem value="A1">A1</SelectItem>
                  <SelectItem value="A2">A2</SelectItem>
                  <SelectItem value="B1">B1</SelectItem>
                  <SelectItem value="B2">B2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Drive ID</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Eligible</TableHead>
                  <TableHead>Jobs Count</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recruiter</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Loading drives...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : drives.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No drives found
                    </TableCell>
                  </TableRow>
                ) : (
                  drives.map((drive) => (
                    <TableRow key={drive._id}>
                      <TableCell>
                        <div className="font-medium">{drive.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {drive.jobDrive.selectionProcess ||
                            "Selection process not specified"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {drive.companyName || "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>
                        {drive.jobDrive.driveDate
                          ? new Date(
                              drive.jobDrive.driveDate
                            ).toLocaleDateString()
                          : "TBD"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                          {drive.jobDrive.location || "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {drive.jobDrive.eligibleStudents || "All"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Briefcase className="mr-1 h-3 w-3 text-muted-foreground" />
                          {drive.noOfPositions || 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={drive.status ? "default" : "secondary"}>
                          {drive.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{drive.recruiterId || "N/A"}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setSelectedDrive(drive)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setEditingDrive(drive)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteDrive(drive, fetchDrives)}
                              className="text-red-600 focus:text-red-700"
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
          </div>

          <div className="flex items-center justify-between px-2 py-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalDrives)} of{" "}
                {totalDrives} drives
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

      {showNewDrive && (
        <NewDriveDialog
          onClose={() => setShowNewDrive(false)}
          onSuccess={fetchDrives}
        />
      )}

      {selectedDrive && (
        <ViewDriveDialog
          drive={selectedDrive}
          onClose={() => setSelectedDrive(null)}
          onEdit={() => {
            setSelectedDrive(null);
            setEditingDrive(selectedDrive);
          }}
        />
      )}

      {editingDrive && (
        <EditDriveDialog
          drive={editingDrive}
          onClose={() => setEditingDrive(null)}
          onSuccess={fetchDrives}
        />
      )}
    </div>
  );
}
