"use client"

import React from "react"
import { useState } from "react"
import {X} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import api from "@/lib/api"


export default function NewDriveDialog({ onClose }) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyLogo: null,
    companyDescription: "",
    website: "",
    location: "",
    jobTitle: "",
    department: "",
    jobType: "Full-time",
    experienceLevel: "Entry Level",
    skills: [],
    qualifications: "",
    cgpaCriteria: "",
    applicationDeadline: "",
    positions: "",
    salaryRange: "",
    jobDescription: "",
    selectionProcess: "",
    interviewRounds: "",
  })

  const [currentSkill, setCurrentSkill] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    //backend calls still to implement!!!
    console.log("New Drive Data:", formData)
    alert("New drive created successfully!")
    onClose()
  }

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()],
      }))
      setCurrentSkill("")
    }
  }

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

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
                    onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Company Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                    placeholder="https://company.com"
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
                  <Label htmlFor="companyLogo">Company Logo</Label>
                  <Input
                    id="companyLogo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData((prev) => ({ ...prev, companyLogo: e.target.files?.[0] || null }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyDescription">Company Description</Label>
                <Textarea
                  id="companyDescription"
                  value={formData.companyDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, companyDescription: e.target.value }))}
                  rows={4}
                  placeholder="Brief description about the company..."
                />
              </div>
            </TabsContent>

            <TabsContent value="job" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
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
                      <SelectItem value="All Departments">All Departments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select
                    value={formData.jobType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, jobType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, experienceLevel: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry Level">Entry Level</SelectItem>
                      <SelectItem value="Mid Level">Mid Level</SelectItem>
                      <SelectItem value="Senior Level">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="positions">Number of Positions *</Label>
                  <Input
                    id="positions"
                    type="number"
                    value={formData.positions}
                    onChange={(e) => setFormData((prev) => ({ ...prev, positions: e.target.value }))}
                    required
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryRange">Salary Range</Label>
                  <Input
                    id="salaryRange"
                    value={formData.salaryRange}
                    onChange={(e) => setFormData((prev) => ({ ...prev, salaryRange: e.target.value }))}
                    placeholder="e.g., ₹5-8 LPA"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description *</Label>
                <Textarea
                  id="jobDescription"
                  value={formData.jobDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, jobDescription: e.target.value }))}
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
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualifications">Educational Qualifications</Label>
                  <Textarea
                    id="qualifications"
                    value={formData.qualifications}
                    onChange={(e) => setFormData((prev) => ({ ...prev, qualifications: e.target.value }))}
                    rows={3}
                    placeholder="Required educational qualifications..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgpaCriteria">CGPA Criteria</Label>
                  <Input
                    id="cgpaCriteria"
                    value={formData.cgpaCriteria}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cgpaCriteria: e.target.value }))}
                    placeholder="e.g., Minimum 7.0 CGPA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicationDeadline">Application Deadline *</Label>
                  <Input
                    id="applicationDeadline"
                    type="datetime-local"
                    value={formData.applicationDeadline}
                    onChange={(e) => setFormData((prev) => ({ ...prev, applicationDeadline: e.target.value }))}
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
                    value={formData.selectionProcess}
                    onChange={(e) => setFormData((prev) => ({ ...prev, selectionProcess: e.target.value }))}
                    rows={4}
                    placeholder="Describe the overall selection process..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewRounds">Interview Rounds</Label>
                  <Textarea
                    id="interviewRounds"
                    value={formData.interviewRounds}
                    onChange={(e) => setFormData((prev) => ({ ...prev, interviewRounds: e.target.value }))}
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
  )
}
