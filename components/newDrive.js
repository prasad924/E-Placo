"use client";

import React from "react";
import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import api from "@/lib/api";

export default function NewDriveDialog({ onClose, onSuccess }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    companyName: "",
    companyMail: "",
    department: "",
    jobType: "Full-Time",
    noOfPositions: 0,
    salary: "",
    skills: [],
    qualifications: "",
    cgpaCriteria: "",
    description: "",
    recruiterId: user.role =="recruiter"? user.id : "",
    deadline: "",
    jobDrive: {
      eligibleStudents: null,
      driveDate: "",
      location: "",
      selectionProcess: "",
      interviewRounds: "",
    },
  });

  const [currentSkill, setCurrentSkill] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/newDrive", formData);
      toast("Reponse" + response.data?.message);
      if (onSuccess !== undefined) onSuccess();
    } catch(error) {
      toast("Error: "+ error)
    } finally {
      onClose();
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()],
      }));
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Create New Placement Drive</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <Tabs defaultValue="company" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="company">Company Info</TabsTrigger>
              <TabsTrigger value="job">Job Details</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="process">Selection Process</TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyMail">Company Mail *</Label>
                  <Input
                    id="companyMail"
                    type="email"
                    value={formData.companyMail}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        companyMail: e.target.value,
                      }))
                    }
                    placeholder="reddyprasad.tech@gmail.com"
                    required
                  />
                </div>
                {user.role != "recruiter" ? 
                <div className="space-y-2">
                  <Label htmlFor="recruiterId">Recruiter ID *</Label>
                  <Input
                    id="recruiterId"
                    type="String"
                    value={formData.recruiterId}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recruiterId: e.target.value,
                      }))
                    }
                    placeholder="Ex: EMP001"
                    required
                  />
                </div> : <div className="space-y-2">
                  <Label htmlFor="recruiterId">Recruiter ID *</Label>
                  <Badge variant={'primary'}> {user.id}</Badge>
                </div> }
              </div>
            </TabsContent>

            <TabsContent value="job" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Job ID *</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        id: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, department: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
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
                        <SelectItem value="ELITE">Elite</SelectItem>
                        <SelectItem value="A1">A1</SelectItem>
                        <SelectItem value="A2">A2</SelectItem>
                        <SelectItem value="B1">B1</SelectItem>
                        <SelectItem value="B2">B2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
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
                  <Label htmlFor="noOfPositions">
                    Number of Positions(optional)
                  </Label>
                  <Input
                    id="noOfPositions"
                    type="number"
                    value={formData.noOfPositions}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        noOfPositions: e.target.value,
                      }))
                    }
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range *</Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        salary: e.target.value,
                      }))
                    }
                    placeholder="e.g., ₹5-8 LPA"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driveDate">Drive Date *</Label>
                  <Input
                    id="driveDate"
                    type="date"
                    value={formData.jobDrive.driveDate}
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
                <div className="space-y-2">
                  <Label htmlFor="location">Drive Location</Label>
                  <Input
                    id="location"
                    type="string"
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={6}
                  placeholder="Detailed job description, responsibilities, and requirements..."
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Required Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addSkill())
                      }
                    />
                    <Button type="button" onClick={addSkill}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {skill}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualifications">
                    Educational Qualifications
                  </Label>
                  <Textarea
                    id="qualifications"
                    value={formData.qualifications}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        qualifications: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Required educational qualifications..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgpaCriteria">CGPA Criteria</Label>
                  <Input
                    id="cgpaCriteria"
                    value={formData.cgpaCriteria}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cgpaCriteria: e.target.value,
                      }))
                    }
                    placeholder="e.g., Minimum 7.0 CGPA"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline *</Label>
                  <Input
                    id="deadline"
                    type="datetime-local"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        deadline: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="process" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="selectionProcess">Selection Process</Label>
                  <Textarea
                    id="selectionProcess"
                    value={formData.jobDrive.selectionProcess}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        jobDrive: {
                          ...prev.jobDrive,
                          selectionProcess: e.target.value,
                        },
                      }))
                    }
                    rows={4}
                    placeholder="Describe the overall selection process..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewRounds">Interview Rounds</Label>
                  <Textarea
                    id="interviewRounds"
                    value={formData.jobDrive.interviewRounds}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        jobDrive: {
                          ...prev.jobDrive,
                          interviewRounds: e.target.value,
                        },
                      }))
                    }
                    rows={4}
                    placeholder="Detail about each interview round..."
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Drive</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
