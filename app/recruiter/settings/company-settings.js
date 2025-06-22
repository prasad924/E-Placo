"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  X,
  Save,
  Building2,
  Users,
  MessageSquare,
  Phone,
  BarChart3,
  Heart,
  Code,
  Globe,
  Loader2,
} from "lucide-react"
import { ImageUpload } from "@/components/image-upload"
import { toast } from "sonner"

export function CompanySettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [companyData, setCompanyData] = useState({
    name: "TechCorp Solutions",
    industry: "Software Development",
    description: "Leading software development company specializing in web and mobile applications.",
    tagline: "Innovation at Scale",
    founded: "2015",
    headquarters: "San Francisco, CA",
    size: "100-500 employees",
    website: "https://techcorp.com",
    logo: "",
    coverImage: "",
    socialMedia: {
      linkedin: "https://linkedin.com/company/techcorp",
      twitter: "https://twitter.com/techcorp",
      facebook: "https://facebook.com/techcorp",
    },
    stats: {
      totalHires: 150,
      avgSalary: "$85,000 - $120,000",
      hiringRate: 85,
      responseTime: "2-3 days",
    },
    about:
      "We are a dynamic technology company focused on creating innovative solutions that transform businesses and improve lives.",
    culture: "We foster a collaborative, inclusive environment where creativity and innovation thrive.",
    benefits: [
      "Health Insurance",
      "401k Matching",
      "Flexible Work Hours",
      "Remote Work Options",
      "Professional Development",
    ],
    techStack: ["React", "Node.js", "Python", "AWS", "Docker", "MongoDB"],
    departments: [
      { name: "Engineering", openings: 5, employees: 45 },
      { name: "Product", openings: 2, employees: 12 },
      { name: "Design", openings: 1, employees: 8 },
    ],
    faqs: [
      {
        question: "What is the interview process like?",
        answer:
          "Our interview process consists of 3 rounds: initial screening, technical assessment, and final interview.",
      },
      {
        question: "Do you offer remote work?",
        answer: "Yes, we offer flexible remote work options for all positions.",
      },
    ],
    contactInfo: {
      email: "careers@techcorp.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Street, San Francisco, CA 94105",
      recruiter: {
        name: "Sarah Johnson",
        designation: "Senior Recruiter",
        email: "sarah.johnson@techcorp.com",
        phone: "+1 (555) 123-4568",
      },
    },
  })

  const handleInputChange = (field, value, nested) => {
    setCompanyData((prev) => {
      if (nested) {
        return {
          ...prev,
          [nested]: {
            ...prev[nested],
            [field]: value,
          },
        }
      }
      return { ...prev, [field]: value }
    })
  }

  const addArrayItem = (field, item) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: [...(prev[field ]), item],
    }))
  }

  const removeArrayItem = (field, index) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: (prev[field ]).filter((_, i) => i !== index),
    }))
  }

  const updateArrayItem = (field, index , value) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: (prev[field]).map((item, i) => (i === index ? value : item)),
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // If updating existing company, use PUT with ID
      // For now, we&apos;ll create a new company
      const response = await fetch("http://localhost:5000/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save")
      }

      const result = await response.json()
      console.log("Saved successfully:", result)

      toast.success("Success!", {
        description: "Company settings have been saved successfully.",
      })
    } catch (error) {
      console.error("Save error:", error)
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Failed to save company settings. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Company Settings</h1>
          <p className="text-muted-foreground">Manage your company profile and information</p>
        </div>
        <Button className="flex items-center gap-2" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="basic" className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Basic</span>
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Details</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Social</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Stats</span>
          </TabsTrigger>
          <TabsTrigger value="culture" className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Culture</span>
          </TabsTrigger>
          <TabsTrigger value="tech" className="flex items-center gap-1">
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Tech</span>
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Teams</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Contact</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential company details and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    value={companyData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Input
                    id="industry"
                    value={companyData.industry}
                    onChange={(e) => handleInputChange("industry", e.target.value)}
                    placeholder="e.g., Software Development"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website *</Label>
                  <Input
                    id="website"
                    type="url"
                    value={companyData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://yourcompany.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={companyData.tagline}
                    onChange={(e) => handleInputChange("tagline", e.target.value)}
                    placeholder="Your company motto"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founded">Founded</Label>
                  <Input
                    id="founded"
                    value={companyData.founded}
                    onChange={(e) => handleInputChange("founded", e.target.value)}
                    placeholder="2015"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Input
                    id="size"
                    value={companyData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    placeholder="e.g., 100-500 employees"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="headquarters">Headquarters</Label>
                <Input
                  id="headquarters"
                  value={companyData.headquarters}
                  onChange={(e) => handleInputChange("headquarters", e.target.value)}
                  placeholder="City, State/Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={companyData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of your company"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUpload
                  label="Company Logo"
                  value={companyData.logo}
                  onChange={(url) => handleInputChange("logo", url)}
                  folder="company-logos"
                  aspectRatio="square"
                  maxSize={2}
                />
                <ImageUpload
                  label="Cover Image"
                  value={companyData.coverImage}
                  onChange={(url) => handleInputChange("coverImage", url)}
                  folder="company-covers"
                  aspectRatio="wide"
                  maxSize={5}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>Detailed information about your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="about">About Us</Label>
                <Textarea
                  id="about"
                  value={companyData.about}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  placeholder="Tell us more about your company..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Your company&apos;s social media presence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={companyData.socialMedia.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value, "socialMedia")}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    type="url"
                    value={companyData.socialMedia.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value, "socialMedia")}
                    placeholder="https://twitter.com/yourcompany"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    type="url"
                    value={companyData.socialMedia.facebook}
                    onChange={(e) => handleInputChange("facebook", e.target.value, "socialMedia")}
                    placeholder="https://facebook.com/yourcompany"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Statistics</CardTitle>
              <CardDescription>Key metrics and hiring information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="totalHires">Total Hires</Label>
                  <Input
                    id="totalHires"
                    type="number"
                    value={companyData.stats.totalHires}
                    onChange={(e) => handleInputChange("totalHires", Number.parseInt(e.target.value), "stats")}
                    placeholder="150"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avgSalary">Average Salary Range</Label>
                  <Input
                    id="avgSalary"
                    value={companyData.stats.avgSalary}
                    onChange={(e) => handleInputChange("avgSalary", e.target.value, "stats")}
                    placeholder="$80,000 - $120,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hiringRate">Hiring Rate (%)</Label>
                  <Input
                    id="hiringRate"
                    type="number"
                    min="0"
                    max="100"
                    value={companyData.stats.hiringRate}
                    onChange={(e) => handleInputChange("hiringRate", Number.parseInt(e.target.value), "stats")}
                    placeholder="85"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responseTime">Response Time</Label>
                  <Input
                    id="responseTime"
                    value={companyData.stats.responseTime}
                    onChange={(e) => handleInputChange("responseTime", e.target.value, "stats")}
                    placeholder="2-3 days"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="culture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Culture & Benefits</CardTitle>
              <CardDescription>Company culture and employee benefits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="culture">Company Culture</Label>
                <Textarea
                  id="culture"
                  value={companyData.culture}
                  onChange={(e) => handleInputChange("culture", e.target.value)}
                  placeholder="Describe your company culture..."
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Benefits</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("benefits", "")}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Benefit
                  </Button>
                </div>
                <div className="space-y-2">
                  {companyData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={benefit}
                        onChange={(e) => updateArrayItem("benefits", index, e.target.value)}
                        placeholder="Enter benefit"
                      />
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("benefits", index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tech" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
              <CardDescription>Technologies and tools used at your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Tech Stack</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("techStack", "")}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Technology
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {companyData.techStack.map((tech, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={tech}
                        onChange={(e) => updateArrayItem("techStack", index, e.target.value)}
                        placeholder="e.g., React, Node.js"
                      />
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("techStack", index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {companyData.techStack
                    .filter((tech) => tech.trim())
                    .map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
              <CardDescription>Manage your company departments and openings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Departments</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("departments", { name: "", openings: 0, employees: 0 })}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Department
                  </Button>
                </div>
                <div className="space-y-4">
                  {companyData.departments.map((dept, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                          <Label>Department Name</Label>
                          <Input
                            value={dept.name}
                            onChange={(e) => updateArrayItem("departments", index, { ...dept, name: e.target.value })}
                            placeholder="e.g., Engineering"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Open Positions</Label>
                          <Input
                            type="number"
                            value={dept.openings}
                            onChange={(e) =>
                              updateArrayItem("departments", index, {
                                ...dept,
                                openings: Number.parseInt(e.target.value) || 0,
                              })
                            }
                            placeholder="5"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Total Employees</Label>
                          <Input
                            type="number"
                            value={dept.employees}
                            onChange={(e) =>
                              updateArrayItem("departments", index, {
                                ...dept,
                                employees: Number.parseInt(e.target.value) || 0,
                              })
                            }
                            placeholder="45"
                          />
                        </div>
                        <Button variant="outline" size="sm" onClick={() => removeArrayItem("departments", index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Frequently Asked Questions</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("faqs", { question: "", answer: "" })}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add FAQ
                  </Button>
                </div>
                <div className="space-y-4">
                  {companyData.faqs.map((faq, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <Label>Question</Label>
                            <Input
                              value={faq.question}
                              onChange={(e) => updateArrayItem("faqs", index, { ...faq, question: e.target.value })}
                              placeholder="What is the interview process like?"
                            />
                          </div>
                          <Button variant="outline" size="sm" onClick={() => removeArrayItem("faqs", index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label>Answer</Label>
                          <Textarea
                            value={faq.answer}
                            onChange={(e) => updateArrayItem("faqs", index, { ...faq, answer: e.target.value })}
                            placeholder="Our interview process consists of..."
                            rows={2}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Company contact details and recruiter information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Company Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={companyData.contactInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value, "contactInfo")}
                    placeholder="careers@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={companyData.contactInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value, "contactInfo")}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={companyData.contactInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value, "contactInfo")}
                  placeholder="123 Business St, City, State 12345"
                  rows={2}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Primary Recruiter</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="recruiterName">Name</Label>
                    <Input
                      id="recruiterName"
                      value={companyData.contactInfo.recruiter.name}
                      onChange={(e) => handleInputChange("name", e.target.value, "contactInfo.recruiter")}
                      placeholder="Sarah Johnson"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recruiterDesignation">Designation</Label>
                    <Input
                      id="recruiterDesignation"
                      value={companyData.contactInfo.recruiter.designation}
                      onChange={(e) => handleInputChange("designation", e.target.value, "contactInfo.recruiter")}
                      placeholder="Senior Recruiter"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recruiterEmail">Email</Label>
                    <Input
                      id="recruiterEmail"
                      type="email"
                      value={companyData.contactInfo.recruiter.email}
                      onChange={(e) => handleInputChange("email", e.target.value, "contactInfo.recruiter")}
                      placeholder="sarah@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recruiterPhone">Phone</Label>
                    <Input
                      id="recruiterPhone"
                      type="tel"
                      value={companyData.contactInfo.recruiter.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value, "contactInfo.recruiter")}
                      placeholder="+1 (555) 123-4568"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-6">
        <Button size="lg" className="flex items-center gap-2" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save All Changes
        </Button>
      </div>
    </div>
  )
}
