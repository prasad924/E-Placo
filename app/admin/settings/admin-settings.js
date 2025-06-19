"use client"

import { useEffect, useState } from "react"
import { Check, Mail, Save, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { usePlatformSettings } from "@/context/PlatformSettingContext"
import Eloading from "@/components/loading"

const defaultSettings = {
  collegeName: "",
  contactPhone: "",
  contactEmail: "",
  website: "",
  placementHead: "",
  officeHours: "",
  contactAddress: "",
  emailTemplates: {
    welcomeStudent: {
      subject: "",
      content: "",
      signature: "",
    },
    welcomeRecruiter: {
      subject: "",
      content: "",
      signature: "",
    },
    driveNotification: {
      subject: "",
      content: "",
      signature: "",
    },
    interviewSchedule: {
      subject: "",
      content: "",
      signature: "",
    },
    applicationConfirmation: {
      subject: "",
      content: "",
      signature: "",
    },
  },
}

export default function PlatformSettings() {
  const { settings, updateSettings, loading } = usePlatformSettings()
  const [saveStatus, setSaveStatus] = useState("idle")
  const [form, setForm] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState("welcomeStudent")

  useEffect(() => {
    if (!loading) {
      setForm({ ...defaultSettings, ...(settings || {}) })
    }
  }, [loading, settings])

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleTemplateChange = (key, value) => {
    setForm(prev => ({
      ...prev,
      emailTemplates: {
        ...prev.emailTemplates,
        [selectedTemplate]: {
          ...prev.emailTemplates?.[selectedTemplate],
          [key]: value,
        },
      },
    }))
  }

  const handleSave = async () => {
    setSaveStatus("saving")
    await updateSettings({ ...form })
    setSaveStatus("saved")
    setTimeout(() => setSaveStatus("idle"), 2000)
  }

  if (!form) return <Eloading />

  return (
    <div className="w-full h-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Platform Settings</h2>
          <p className="text-sm text-muted-foreground">Configure platform settings and contact information</p>
        </div>
        <Button onClick={handleSave} disabled={saveStatus !== "idle"}>
          {saveStatus === "idle" && (<><Save className="mr-2 h-4 w-4" />Save Changes</>)}
          {saveStatus === "saving" && "Saving..."}
          {saveStatus === "saved" && (<><Check className="mr-2 h-4 w-4" />Saved</>)}
        </Button>
      </div>

      <Tabs defaultValue="contact" className="w-full space-y-4">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="contact" className="flex-1">Contact Information</TabsTrigger>
          <TabsTrigger value="email" className="flex-1">Email Templates</TabsTrigger>
        </TabsList>

        {/* Contact Info */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Placement Cell Contact Information
              </CardTitle>
              <CardDescription>Displayed to students and recruiters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <Label>College Name</Label>
                  <Input value={form.collegeName} onChange={e => handleChange("collegeName", e.target.value)} />
                  <Label>Phone</Label>
                  <Input value={form.contactPhone} onChange={e => handleChange("contactPhone", e.target.value)} />
                  <Label>Website</Label>
                  <Input value={form.website} onChange={e => handleChange("website", e.target.value)} />
                </div>
                <div className="space-y-4">
                  <Label>Email</Label>
                  <Input value={form.contactEmail} onChange={e => handleChange("contactEmail", e.target.value)} />
                  <Label>Placement Head</Label>
                  <Input value={form.placementHead} onChange={e => handleChange("placementHead", e.target.value)} />
                  <Label>Office Hours</Label>
                  <Input value={form.officeHours} onChange={e => handleChange("officeHours", e.target.value)} />
                </div>
              </div>
              <Label>Contact Address</Label>
              <Textarea value={form.contactAddress} onChange={e => handleChange("contactAddress", e.target.value)} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Email Templates</CardTitle>
              <CardDescription>Customize automated emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-4">
                  <Label>Select Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(form.emailTemplates).map(template => (
                        <SelectItem key={template} value={template}>{template}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Label>Subject</Label>
                  <Input
                    value={form.emailTemplates[selectedTemplate]?.subject || ""}
                    onChange={e => handleTemplateChange("subject", e.target.value)}
                  />

                  <Label>Variables</Label>
                  <div className="text-xs p-2 bg-muted rounded">
                    {["{student_name}", "{recruiter_name}", "{company_name}", "{job_title}", "{college_name}", "{date}"].map(v => (
                      <code key={v} className="block px-2 py-1 bg-background rounded">{v}</code>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <Label>Content</Label>
                  <Textarea
                    rows={8}
                    value={form.emailTemplates[selectedTemplate]?.content || ""}
                    onChange={e => handleTemplateChange("content", e.target.value)}
                  />
                  <Label>Signature</Label>
                  <Textarea
                    rows={4}
                    value={form.emailTemplates[selectedTemplate]?.signature || ""}
                    onChange={e => handleTemplateChange("signature", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
