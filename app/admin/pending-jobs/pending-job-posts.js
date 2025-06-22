"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  Clock,
  MapPin,
  Briefcase,
  Users,
  Calendar,
  DollarSign,
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
import api from "@/lib/api";
import { toast } from "sonner";
import { EditDriveDialog } from "@/components/editDriveDialog";

export function PendingJobPosts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [pendingJobs, setPendingJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pendingReview: 0,
    totalPositions: 0,
    totalApplications: 0,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const fetchPendingJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchQuery,
        department: departmentFilter === "all" ? "" : departmentFilter,
        approvedByadmin : false,
      });

      const response = await api.get(`/admin/drives?${params}`);
      const {
        jobDrives: fetchedJobs,
        total,
        stats: fetchedStats,
        totalPages: pages,
      } = response.data;
      setPendingJobs(fetchedJobs);
      setTotalJobs(total);
      setStats(fetchedStats);
      setTotalPages(pages);
    } catch (error) {
      console.error("Error fetching pending jobs:", error);
      toast.error("Error fetching pending jobs data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingJobs();
  }, [currentPage, itemsPerPage, searchQuery, departmentFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, departmentFilter]);

  const handleReviewJob = (job) => {
    setSelectedJob(job);
    setShowReviewDialog(true);
  };

  const handleApproveJob = async (id) => {
    try {
      await api.patch(`/admin/drive/${id}/approve`);
      toast.success("Job approved and published successfully!");
      fetchPendingJobs();
    } catch (error) {
      console.error("Error approving job:", error);
      toast.error("Failed to approve job");
    }
  };

  return (
    <div className="space-y-6">
      {!pendingJobs ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Pending Job Posts
              </h2>
              <p className="text-muted-foreground">
                Review and approve job posts submitted by recruiters.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              {console.log(stats)}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Review
                </CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingReview}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting admin review
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Positions
                </CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPositions}</div>
                <p className="text-xs text-muted-foreground">
                  Available positions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Applications
                </CardTitle>
                <Briefcase className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalApplications}
                </div>
                <p className="text-xs text-muted-foreground">
                  Applications received
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Job Posts Awaiting Review</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs..."
                      className="pl-8 w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        All
                      </SelectItem>
                      <SelectItem value="Computer Science and Engineering">
                        Computer Science and Engineering
                      </SelectItem>
                      <SelectItem value="Computer Science and Engineering(DS)">
                        Computer Science and Engineering(DS)
                      </SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[250px]">
                          Job Details
                        </TableHead>
                        <TableHead className="min-w-[200px]">Company</TableHead>
                        <TableHead className="min-w-[200px]">
                          Requirements
                        </TableHead>
                        <TableHead className="min-w-[150px]">
                          Submitted By
                        </TableHead>
                        <TableHead className="text-right min-w-[100px]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex items-center justify-center">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Loading pending jobs...
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : pendingJobs.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            No pending jobs found
                          </TableCell>
                        </TableRow>
                      ) : (
                        pendingJobs.map((job) => {
                          try {
                            return (
                              <TableRow key={job._id}>
                                <TableCell className="min-w-[250px]">
                                  <div className="space-y-1">
                                    <div className="font-medium">
                                      {String(job.title || "No Title")}
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                                      
                                      <span className="flex items-center">
                                        <Badge variant={'primary'}>{String(job.id)}
                                          </Badge>
                                      </span>
                                      <span className="flex items-center">
                                        <DollarSign className="mr-1 h-3 w-3 flex-shrink-0" />
                                        {String(job.salary || "Not specified")}
                                      </span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="min-w-[200px]">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 flex-shrink-0">
                                      <AvatarImage
                                        src="/placeholder.svg"
                                        alt={String(
                                          job.companyName || "Company"
                                        )}
                                      />
                                      <AvatarFallback>
                                        {String(
                                          job.companyName || "CO"
                                        ).substring(0, 2)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                      <div className="font-medium truncate">
                                        {String(
                                          job.companyName || "Unknown Company"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                            <TableCell className="min-w-[200px]">
                                  <div className="space-y-1">
                                    <div className="text-sm">
                                      <span className="font-medium">CGPA:</span>{" "}
                                      {String(
                                        job.cgpaCriteria || "Not specified"
                                      )}
                                    </div>
                                    <div className="text-sm">
                                      <span className="font-medium">
                                        Positions:
                                      </span>{" "}
                                      {String(job.noOfPositions || 1)}
                                    </div>
                                    <div className="text-sm">
                                      <span className="font-medium">
                                        Eligible:
                                      </span>{" "}
                                      {String(
                                        job.jobDrive?.eligibleStudents || "All"
                                      )}
                                    </div>
                                    {job.skills &&
                                      Array.isArray(job.skills) && (
                                        <div className="text-sm">
                                          <span className="font-medium">
                                            Skills:
                                          </span>{" "}
                                          {job.skills.join(", ")}
                                        </div>
                                      )}
                                  </div>
                                </TableCell>
                              <TableCell className="min-w-[150px]">
                                  <div className="space-y-1">
                                    <div className="font-medium">
                                      {String(job.recruiterId || "Unknown")}
                                    </div>
                                    <div className="text-sm text-muted-foreground flex items-center">
                                      <Calendar className="mr-1 h-3 w-3" />
                                      {job.jobDrive?.driveDate
                                        ? new Date(
                                            job.jobDrive.driveDate
                                          ).toLocaleDateString()
                                        : "Unknown"}
                                    </div>
                                  </div>
                                </TableCell>
                                 <TableCell className="text-right min-w-[100px]">
                                  <div className="flex items-center gap-2 justify-end">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleReviewJob(job)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleApproveJob(job.id)}
                                      disabled={job.jobDrive?.approvedByadmin}
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          } catch (error) {
                            console.error(
                              "Error rendering job row:",
                              error,
                              job
                            );
                            return (
                              <TableRow key={job._id || Math.random()}>
                                <TableCell
                                  colSpan={6}
                                  className="text-center py-4 text-red-500"
                                >
                                  Error rendering job data
                                </TableCell>
                              </TableRow>
                            );
                          }
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2 py-4">
  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
    <p className="text-sm text-muted-foreground">
      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalJobs)} of {totalJobs} jobs
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
                  <span className="text-sm text-muted-foreground">
                    per page
                  </span>
                </div>

         <div className="flex flex-wrap items-center gap-2">
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

          {showReviewDialog && selectedJob && (
            <EditDriveDialog
              drive={selectedJob}
              onClose={() => setShowReviewDialog(false)}
              onSuccess={fetchPendingJobs}
            />
          )}
        </>
      )}
    </div>
  );
}
