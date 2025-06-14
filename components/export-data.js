"use client"

import React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ExportReportsDialog({ onClose }) {
  const [formData, setFormData] = useState({
    reportType: "Student Data",
    format: "CSV",
    dateRange: "all",
    startDate: "",
    endDate: "",
    departments: [],
    batchYear: "all",
    includeFields: [],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Export Report Data:", formData)
    alert("Report export initiated! You will receive an email when ready.")
    onClose()
  }

  const reportFields = {
    "Student Data": ["Name", "Email", "Department", "CGPA", "Phone", "Resume", "Skills"],
    "Placement Statistics": ["Department", "Total Students", "Placed Students", "Placement Rate", "Average Package"],
    "Company Reports": ["Company Name", "Positions", "Applications", "Selected", "Package Range"],
    "Drive Analytics": ["Drive Name", "Company", "Applications", "Shortlisted", "Selected", "Status"],
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border">
        <div className="sticky top-0 bg-card border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Export Reports</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type *</Label>
              <Select
                value={formData.reportType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, reportType: value, includeFields: [] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student Data">Student Data</SelectItem>
                  <SelectItem value="Placement Statistics">Placement Statistics</SelectItem>
                  <SelectItem value="Company Reports">Company Reports</SelectItem>
                  <SelectItem value="Drive Analytics">Drive Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="format">Export Format *</Label>
              <Select
                value={formData.format}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, format: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSV">CSV</SelectItem>
                  <SelectItem value="Excel">Excel</SelectItem>
                  <SelectItem value="PDF">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <Select
              value={formData.dateRange}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, dateRange: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="current_year">Current Academic Year</SelectItem>
                <SelectItem value="last_month">Last Month</SelectItem>
                <SelectItem value="last_3_months">Last 3 Months</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.dateRange === "custom" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Filter by Departments</Label>
            <div className="grid grid-cols-2 gap-2">
              {["Computer Science", "Electronics", "Mechanical", "Civil"].map((dept) => (
                <div key={dept} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dept-${dept}`}
                    checked={formData.departments.includes(dept)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData((prev) => ({
                          ...prev,
                          departments: [...prev.departments, dept],
                        }))
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          departments: prev.departments.filter((d) => d !== dept),
                        }))
                      }
                    }}
                  />
                  <Label htmlFor={`dept-${dept}`}>{dept}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="batchYear">Batch Year</Label>
            <Select
              value={formData.batchYear}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, batchYear: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Include Fields</Label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {reportFields[formData.reportType]?.map((field) => (
                <div key={field} className="flex items-center space-x-2">
                  <Checkbox
                    id={`field-${field}`}
                    checked={formData.includeFields.includes(field)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData((prev) => ({
                          ...prev,
                          includeFields: [...prev.includeFields, field],
                        }))
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          includeFields: prev.includeFields.filter((f) => f !== field),
                        }))
                      }
                    }}
                  />
                  <Label htmlFor={`field-${field}`}>{field}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Export Report</Button>
          </div>
        </form>
      </div>
    </div>
  )
}