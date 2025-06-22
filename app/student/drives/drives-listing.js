"use client";

import { useEffect, useState } from "react";
import { Award, Briefcase, Building, Clock, Search, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export function DrivesListing() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/student/jobs?sort=${sortBy}`);
      if (response) {
        const jobs = response.data.jobs || response.data;
        setAllJobs(jobs);
        setFilteredJobs(jobs);
      } else {
        toast.error("Failed to fetch jobs");
      }
    } catch (error) {
      toast.error("Error fetching jobs data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user?.id, sortBy]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredJobs(allJobs);
    } else {
      const filtered = allJobs.filter((job) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(searchLower) ||
          job.companyName.toLowerCase().includes(searchLower) ||
          (job.description &&
            job.description.toLowerCase().includes(searchLower)) ||
          (job.skills &&
            job.skills.some((skill) =>
              skill.toLowerCase().includes(searchLower)
            ))
        );
      });
      setFilteredJobs(filtered);
    }
  }, [searchQuery, allJobs]);

  const eligibleJobs = filteredJobs.filter((job) => {
    return (
      job.jobDrive?.approvedByadmin &&
      (job.jobDrive?.eligibleStudents === null ||
        job.jobDrive?.eligibleStudents === user?.finishingSchool)
    );
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Placement Drives
          </h2>
          <p className="text-muted-foreground">Loading placement drives...</p>
        </div>
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Placement Drives</h2>
        <p className="text-muted-foreground">
          Browse placement drives and find opportunities.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search companies, roles, skills, or descriptions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredJobs.length} of {allJobs.length} drives
        {searchQuery && ` for "${searchQuery}"`}
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">
            All Drives ({filteredJobs.length})
          </TabsTrigger>
          <TabsTrigger value="eligible">
            Eligible Drives ({eligibleJobs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="eligible" className="mt-6">
          <div className="grid gap-6">
            {eligibleJobs.length > 0 ? (
              eligibleJobs.map((job) => (
                <DriveDetailCard key={job._id} job={job} />
              ))
            ) : (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  No eligible drives found
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search criteria."
                    : "You don't have any eligible drives at the moment."}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <DriveDetailCard key={job._id} job={job} />
              ))
            ) : (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No drives found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DriveDetailCard({ job }) {
  const handleApply = async (jobID) => {
    try {
      const response = await api.post(`/student/apply/${jobID}`);
      toast("Response: " + response.data?.message);
    } catch (err) {
      toast.error("Error" + err);
    }
  };

  const { user } = useAuth();

    const isEligible =
  (job.jobDrive?.eligibleStudents === null || job.jobDrive?.eligibleStudents === user?.finishingSchool) &&
  job.jobDrive?.approvedByadmin;


  const getStatusInfo = () => {
    if (isEligible) {
      return { color: "bg-green-500/10 text-green-500", text: "Eligible" };
    } else {
      return { color: "bg-gray-500/10 text-gray-500", text: "Not Eligible" };
    }
  };

  const statusInfo = getStatusInfo();
  const deadline = new Date(job.deadline).toLocaleDateString();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={job.url || "/company_logo.png"}
                alt={job.companyName}
              />
              <AvatarFallback>{job.companyName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{job.companyName}</CardTitle>
              <CardDescription>{job.title}</CardDescription>
            </div>
          </div>
          <Badge className={statusInfo.color}>{statusInfo.text}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm">
          {job.salary && (
            <div className="flex items-center">
              <Award className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{job.salary}</span>
            </div>
          )}
          {job.jobDrive?.location && (
            <div className="flex items-center">
              <Building className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{job.jobDrive.location}</span>
            </div>
          )}
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Deadline: {deadline}</span>
          </div>
          {job.noOfPositions && (
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{job.noOfPositions} openings</span>
            </div>
          )}
        </div>

        <Separator />

        {job.description && (
          <div>
            <h4 className="font-medium mb-2">Job Description</h4>
            <p className="text-sm text-muted-foreground">{job.description}</p>
          </div>
        )}

        {job.jobDrive.selectionProcess && (
          <div>
            <h4 className="font-medium mb-2">Selection Process</h4>
            <p className="text-sm text-muted-foreground">
              {job.jobDrive.selectionProcess}
            </p>
          </div>
        )}

        {job.skills && job.skills.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          {isEligible ? (
            <Button className="sm:flex-1" onClick={() => handleApply(job._id)}>
              Apply Now
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
