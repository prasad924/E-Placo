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
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Imprima } from "next/font/google";

const formatDateTimeLocal = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

const formatDate = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toISOString().slice(0, 10);
};

export function EditDriveDialog({ drive, onClose, onSuccess }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    id: drive.id || "",
    companyName: drive.companyName || "",
    companyMail: drive.companyMail || "",
    title: drive.title || "",
    jobType: drive.jobType || "",
    salary: drive.salary || "",
    jobDrive: {
      driveDate: drive.jobDrive.driveDate || "",
      location: drive.jobDrive.location || "",
      eligibleStudents: drive.jobDrive.eligibleStudents || null,
      selectionProcess: drive.jobDrive.selectionProcess || "",
    },
    cgpaCriteria: drive.cgpaCriteria || "",
    deadline: drive.deadline || "",
    description: drive.description || "",
    status: drive.status || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(
        `/admin/drive/update/${drive.id}`,
        formData
      );
      toast("Response: " + response.data?.message);
      onSuccess();
    } catch (error) {
      console.error("Error updating drive:", error);
      toast("Error updating drive");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={!!drive} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Drive - {drive.id}</DialogTitle>
          <DialogDescription>
            Update drive details and requirements
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Job Position</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-package">Package Range</Label>
                  <Input
                    id="edit-package"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salary: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Job Type</Label>
                  <Select
                    value={formData.jobType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, jobType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-Time">Full-Time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={formData.jobDrive.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        jobDrive: {
                          ...prev.jobDrive,
                          location: e.target.value,
                        },
                      }))
                    }
                  />
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
                      <SelectValue value={formData.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {user.role === "admin" && (
                  <div className="space-y-2">
                    <Label htmlFor="eligibleStudents">Eligible Students</Label>
                    <Select
                      value={formData.jobDrive.eligibleStudents}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          jobDrive: {
                            ...prev.jobDrive,
                            eligibleStudents: value,
                          },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All students" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Elite">Elite</SelectItem>
                        <SelectItem value="A1">A1</SelectItem>
                        <SelectItem value="A2">A2</SelectItem>
                        <SelectItem value="B1">B1</SelectItem>
                        <SelectItem value="B2">B2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="requirements" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-minCGPA">Minimum CGPA</Label>
                  <Input
                    id="edit-minCGPA"
                    type="String"
                    value={formData.cgpaCriteria}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cgpaCriteria: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline *</Label>
                  <Input
                    id="deadline"
                    type="datetime-local"
                    value={formatDateTimeLocal(formData.deadline)}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        deadline: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driveDate">Drive Date *</Label>
                  <Input
                    id="driveDate"
                    type="date"
                    value={formatDate(formData.jobDrive.driveDate)}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        jobDrive: {
                          ...prev.jobDrive,
                          driveDate: e.target.value,
                        },
                      }))
                    }
                    required
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Job Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update Drive</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
