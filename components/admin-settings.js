"use client"

import { useState } from "react"
import { Check, Cog, Mail, Phone, MapPin, Save, Building, Calendar, Globe } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function AdminSettings() {
  const [saveStatus, setSaveStatus] = useState("idle")

  const handleSave = () => {
    setSaveStatus("saving")
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000)
  }

  return (
    <div className="w-full h-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Admin Settings</h2>
          <p className="text-sm text-muted-foreground">Configure platform settings and contact information</p>
        </div>
        <Button onClick={handleSave} disabled={saveStatus !== "idle"}>
          {saveStatus === "idle" && (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
          {saveStatus === "saving" && "Saving..."}
          {saveStatus === "saved" && (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved
            </>
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <Tabs defaultValue="general" className="w-full space-y-4">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="general" className="flex-1">
              General Settings
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex-1">
              Contact Information
            </TabsTrigger>
            <TabsTrigger value="email" className="flex-1">
              Email Templates
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="w-full space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cog className="h-5 w-5" />
                    Platform Configuration
                  </CardTitle>
                  <CardDescription>Basic platform settings and academic year configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform-name">Platform Name</Label>
                      <Input id="platform-name" defaultValue="E-Placo" />
                      <p className="text-sm text-muted-foreground">Name displayed throughout the platform</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="institution-name">College Name</Label>
                      <Input id="institution-name" defaultValue="ABC Engineering College" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Platform Logo</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg" alt="College Logo" />
                        <AvatarFallback className="text-lg font-bold">EP</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium">College Logo</p>
                        <p>This logo represents your institution across the platform</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Academic Year Settings
                  </CardTitle>
                  <CardDescription>Configure current academic year and placement season</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="academic-year">Current Academic Year</Label>
                      <Select defaultValue="2024-2025">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023-2024">2023-2024</SelectItem>
                          <SelectItem value="2024-2025">2024-2025</SelectItem>
                          <SelectItem value="2025-2026">2025-2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="Asia/Kolkata">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Kolkata">India (GMT+5:30)</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (GMT-5:00)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT+0:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="placement-start">Placement Season Start</Label>
                      <Input id="placement-start" type="date" defaultValue="2024-07-01" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="placement-end">Placement Season End</Label>
                      <Input id="placement-end" type="date" defaultValue="2025-04-30" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Information */}
          <TabsContent value="contact" className="w-full space-y-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Placement Cell Contact Information
                </CardTitle>
                <CardDescription>Contact details displayed to students and recruiters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Primary Email
                      </Label>
                      <Input id="contact-email" type="email" defaultValue="placements@college.edu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      <Input id="contact-phone" defaultValue="+91 1234567890" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        College Website
                      </Label>
                      <Input id="website" type="url" defaultValue="https://www.college.edu" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="placement-head">Placement Head Name</Label>
                      <Input id="placement-head" defaultValue="Dr. John Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="office-hours">Office Hours</Label>
                      <Input id="office-hours" defaultValue="Monday - Friday: 9:00 AM - 5:00 PM" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    College Address
                  </Label>
                  <Textarea
                    id="contact-address"
                    rows={3}
                    defaultValue="ABC Engineering College&#10;123 College Road, University Area&#10;City, State - 123456, India"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Templates */}
          <TabsContent value="email" className="w-full space-y-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Templates
                </CardTitle>
                <CardDescription>Customize email templates sent to students and recruiters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="template-select">Select Template</Label>
                      <Select defaultValue="welcome-student">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome-student">Welcome Email - Student</SelectItem>
                          <SelectItem value="welcome-recruiter">Welcome Email - Recruiter</SelectItem>
                          <SelectItem value="drive-notification">New Drive Notification</SelectItem>
                          <SelectItem value="interview-schedule">Interview Schedule</SelectItem>
                          <SelectItem value="application-confirmation">Application Confirmation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-subject">Email Subject</Label>
                      <Input id="email-subject" defaultValue="Welcome to E-Placo - ABC Engineering College" />
                    </div>

                    <div className="space-y-2">
                      <Label>Available Variables</Label>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm text-muted-foreground mb-2">Use these variables in your templates:</p>
                        <div className="space-y-1">
                          <code className="block px-2 py-1 bg-background rounded text-xs">{"{student_name}"}</code>
                          <code className="block px-2 py-1 bg-background rounded text-xs">{"{recruiter_name}"}</code>
                          <code className="block px-2 py-1 bg-background rounded text-xs">{"{company_name}"}</code>
                          <code className="block px-2 py-1 bg-background rounded text-xs">{"{job_title}"}</code>
                          <code className="block px-2 py-1 bg-background rounded text-xs">{"{college_name}"}</code>
                          <code className="block px-2 py-1 bg-background rounded text-xs">{"{date}"}</code>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="w-full">
                        Preview Email
                      </Button>
                      <Button variant="outline" className="w-full">
                        Send Test Email
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-content">Email Content</Label>
                      <Textarea
                        id="email-content"
                        rows={16}
                        className="min-h-[400px]"
                        defaultValue={`Dear {student_name},

Welcome to E-Placo, the official placement portal of ABC Engineering College!

Your account has been successfully created and verified. You can now:
• Browse and apply for placement drives
• Update your profile and upload your resume
• Track your application status
• Access placement resources and preparation materials

To get started, please complete your profile by logging into the portal.

If you need any assistance, please contact our placement cell:
Email: placements@college.edu
Phone: +91 1234567890

Best regards,
The Placement Team
ABC Engineering College`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-signature">Email Signature</Label>
                      <Textarea
                        id="email-signature"
                        rows={4}
                        defaultValue={`Best regards,
The Placement Cell
ABC Engineering College
Email: placements@college.edu | Phone: +91 1234567890
Website: www.college.edu`}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
