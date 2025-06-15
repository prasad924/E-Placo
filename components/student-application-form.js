"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Briefcase, Building, Check, Clock, Loader2, MapPin, Upload, Award, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"

// Mock job data with comprehensive details
const JOB_DATA = {
  "job-001": {
    id: "job-001",
    title: "Software Development Engineer",
    company: "TechCorp Solutions",
    companyId: "techcorp",
    logo: "/placeholder.svg?height=60&width=60",
    department: "Engineering",
    location: "Bangalore, Karnataka",
    workMode: "Hybrid",
    type: "Full-time",
    experience: "0-2 years",
    salary: "₹12-18 LPA",
    deadline: "May 15, 2025",
    postedDate: "April 1, 2025",
    applicants: 245,
    openings: 15,
    description:
      "Join our dynamic engineering team to build next-generation software solutions. You'll work on cutting-edge technologies, collaborate with talented developers, and contribute to products used by millions of users worldwide.",
    requirements: [
      "B.Tech/BE in Computer Science, IT, or related field with CGPA ≥ 7.5",
      "Strong programming skills in Java, Python, or JavaScript",
      "Understanding of data structures and algorithms",
      "Knowledge of web technologies (HTML, CSS, React/Angular)",
      "Familiarity with databases (SQL/NoSQL)",
      "Good problem-solving and analytical skills",
      "Excellent communication and teamwork abilities",
    ],
    responsibilities: [
      "Design and develop scalable software applications",
      "Write clean, maintainable, and efficient code",
      "Collaborate with cross-functional teams on feature development",
      "Participate in code reviews and technical discussions",
      "Debug and resolve technical issues",
      "Stay updated with latest technology trends",
    ],
    skills: ["Java", "Python", "JavaScript", "React", "Node.js", "SQL", "Git", "AWS", "Docker", "REST APIs"],
    benefits: [
      "Competitive salary with performance bonuses",
      "Health insurance for employee and family",
      "Flexible work hours and remote work options",
      "Learning and development opportunities",
      "Employee stock options",
      "Modern office with recreational facilities",
    ],
    selectionProcess: [
      "Online Application Review",
      "Online Assessment Test",
      "Technical Interview (2 rounds)",
      "HR Interview",
      "Final Selection",
    ],
  },
  "job-002": {
    id: "job-002",
    title: "Data Analyst",
    company: "DataTech Analytics",
    companyId: "datatech",
    logo: "/placeholder.svg?height=60&width=60",
    department: "Data Science",
    location: "Mumbai, Maharashtra",
    workMode: "Remote",
    type: "Full-time",
    experience: "1-3 years",
    salary: "₹8-12 LPA",
    deadline: "May 20, 2025",
    postedDate: "April 5, 2025",
    applicants: 189,
    openings: 8,
    description:
      "Analyze complex datasets to derive actionable insights that drive business decisions. Work with stakeholders to understand requirements and present findings through compelling visualizations.",
    requirements: [
      "B.Tech/BE/M.Tech in any field with strong analytical background",
      "Proficiency in SQL and data analysis tools",
      "Experience with Python/R for data analysis",
      "Knowledge of statistical concepts and methods",
      "Familiarity with data visualization tools (Tableau, Power BI)",
      "Strong analytical and problem-solving skills",
    ],
    responsibilities: [
      "Analyze large datasets to identify trends and patterns",
      "Create comprehensive reports and dashboards",
      "Collaborate with business teams to understand requirements",
      "Develop and maintain data models",
      "Present insights to stakeholders",
      "Ensure data quality and accuracy",
    ],
    skills: ["SQL", "Python", "R", "Tableau", "Power BI", "Excel", "Statistics", "Machine Learning"],
    benefits: [
      "Competitive compensation package",
      "100% remote work flexibility",
      "Professional development budget",
      "Health and wellness benefits",
      "Flexible PTO policy",
      "Latest tools and technology",
    ],
    selectionProcess: [
      "Application Screening",
      "Technical Assessment",
      "Case Study Presentation",
      "Technical Interview",
      "Final Interview",
    ],
  },
}

export function StudentApplicationForm({ jobId }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    degree: "",
    branch: "",
    college: "",
    graduationYear: "",
    cgpa: "",
    tenthMarks: "",
    twelfthMarks: "",

    // Professional Information
    resume: null,
    coverLetter: "",
    portfolioUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    experience: "",
    currentCompany: "",
    noticePeriod: "",
    expectedSalary: "",

    skills: [],
    certifications: "",
    projects: "",
    achievements: "",
    relocate: "yes",
    workMode: "hybrid",

    // Additional Information
    referral: "",
    howDidYouHear: "",
    whyInterested: "",
    additionalInfo: "",

    // Agreements
    agreeTerms: false,
    agreePrivacy: false,
  })

  const job = JOB_DATA[jobId]

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Job Not Found</h2>
          <p className="mt-2 text-muted-foreground">The job you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-6" asChild>
            <Link href="/student/companies">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Companies
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files?.[0] || null }))
    }
  }

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSkillToggle = (skill) => {
    setFormData((prev) => {
      const skills = [...prev.skills]
      if (skills.includes(skill)) {
        return { ...prev, skills: skills.filter((s) => s !== skill) }
      } else {
        return { ...prev, skills: [...skills, skill] }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Application Submitted Successfully!",
        description: `Your application for ${job.title} at ${job.company} has been submitted. You'll receive a confirmation email shortly.`,
      })
      // Redirect to applications page
      window.location.href = "/student/dashboard"
    }, 2000)
  }

  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const progressPercentage = (step / 4) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Apply for {job.title}</h2>
          <p className="text-muted-foreground">Complete your application to join {job.company}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/student/companies">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Companies
          </Link>
        </Button>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Application Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className={step >= 1 ? "text-primary font-medium" : ""}>Personal Info</span>
              <span className={step >= 2 ? "text-primary font-medium" : ""}>Academic Details</span>
              <span className={step >= 3 ? "text-primary font-medium" : ""}>Professional Info</span>
              <span className={step >= 4 ? "text-primary font-medium" : ""}>Review & Submit</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Application Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                Step {step} of 4:{" "}
                {step === 1
                  ? "Personal Information"
                  : step === 2
                    ? "Academic Details"
                    : step === 3
                      ? "Professional Information"
                      : "Review & Submit"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Please provide your personal details"}
                {step === 2 && "Share your academic background and achievements"}
                {step === 3 && "Tell us about your professional experience and skills"}
                {step === 4 && "Review your application before submitting"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Gender *</Label>
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={(value) => handleSelectChange("gender", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete address"
                        required
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code *</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="PIN Code"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Academic Information */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="degree">Degree *</Label>
                        <Select value={formData.degree} onValueChange={(value) => handleSelectChange("degree", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select degree" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="btech">B.Tech</SelectItem>
                            <SelectItem value="be">B.E.</SelectItem>
                            <SelectItem value="bca">BCA</SelectItem>
                            <SelectItem value="mtech">M.Tech</SelectItem>
                            <SelectItem value="mca">MCA</SelectItem>
                            <SelectItem value="msc">M.Sc</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branch">Branch/Specialization *</Label>
                        <Input
                          id="branch"
                          name="branch"
                          value={formData.branch}
                          onChange={handleInputChange}
                          placeholder="e.g., Computer Science"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="college">College/University *</Label>
                      <Input
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                        placeholder="Enter your college/university name"
                        required
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="graduationYear">Graduation Year *</Label>
                        <Select
                          value={formData.graduationYear}
                          onValueChange={(value) => handleSelectChange("graduationYear", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2027">2027</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cgpa">CGPA/Percentage *</Label>
                        <Input
                          id="cgpa"
                          name="cgpa"
                          value={formData.cgpa}
                          onChange={handleInputChange}
                          placeholder="e.g., 8.5 or 85%"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tenthMarks">10th Grade Marks *</Label>
                        <Input
                          id="tenthMarks"
                          name="tenthMarks"
                          value={formData.tenthMarks}
                          onChange={handleInputChange}
                          placeholder="e.g., 95%"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twelfthMarks">12th Grade Marks *</Label>
                        <Input
                          id="twelfthMarks"
                          name="twelfthMarks"
                          value={formData.twelfthMarks}
                          onChange={handleInputChange}
                          placeholder="e.g., 90%"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Professional Information */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resume">Resume/CV *</Label>
                      <div className="relative">
                        <Input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                          required
                        />
                        <Label
                          htmlFor="resume"
                          className="flex h-20 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground"
                        >
                          {formData.resume ? (
                            <span className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              {formData.resume.name}
                            </span>
                          ) : (
                            <span className="flex flex-col items-center">
                              <Upload className="mb-2 h-6 w-6" />
                              <span>Click to upload resume (PDF, DOC, DOCX)</span>
                              <span className="text-xs text-muted-foreground">Max size: 5MB</span>
                            </span>
                          )}
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coverLetter">Cover Letter</Label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Tell us why you're interested in this position and what makes you a good fit..."
                        className="min-h-[120px]"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                        <Input
                          id="portfolioUrl"
                          name="portfolioUrl"
                          value={formData.portfolioUrl}
                          onChange={handleInputChange}
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="githubUrl">GitHub Profile</Label>
                        <Input
                          id="githubUrl"
                          name="githubUrl"
                          value={formData.githubUrl}
                          onChange={handleInputChange}
                          placeholder="https://github.com/username"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                      <Input
                        id="linkedinUrl"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Relevant Skills *</Label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {job.skills.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={`skill-${skill}`}
                              checked={formData.skills.includes(skill)}
                              onCheckedChange={() => handleSkillToggle(skill)}
                            />
                            <Label htmlFor={`skill-${skill}`} className="text-sm font-normal">
                              {skill}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projects">Key Projects</Label>
                      <Textarea
                        id="projects"
                        name="projects"
                        value={formData.projects}
                        onChange={handleInputChange}
                        placeholder="Describe your key projects, technologies used, and your role..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expectedSalary">Expected Salary (LPA)</Label>
                        <Input
                          id="expectedSalary"
                          name="expectedSalary"
                          value={formData.expectedSalary}
                          onChange={handleInputChange}
                          placeholder="e.g., 12-15 LPA"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Willing to relocate?</Label>
                        <RadioGroup
                          value={formData.relocate}
                          onValueChange={(value) => handleSelectChange("relocate", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="relocate-yes" />
                            <Label htmlFor="relocate-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="relocate-no" />
                            <Label htmlFor="relocate-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold mb-3">Personal Information</h3>
                      <div className="grid gap-2 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">Name:</span> {formData.fullName || "Not provided"}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {formData.email || "Not provided"}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">Phone:</span> {formData.phone || "Not provided"}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span>{" "}
                            {formData.city && formData.state ? `${formData.city}, ${formData.state}` : "Not provided"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold mb-3">Academic Details</h3>
                      <div className="grid gap-2 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">Degree:</span> {formData.degree || "Not provided"}
                          </div>
                          <div>
                            <span className="font-medium">Branch:</span> {formData.branch || "Not provided"}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">College:</span> {formData.college || "Not provided"}
                          </div>
                          <div>
                            <span className="font-medium">CGPA:</span> {formData.cgpa || "Not provided"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold mb-3">Professional Information</h3>
                      <div className="grid gap-2 text-sm">
                        <div>
                          <span className="font-medium">Resume:</span>{" "}
                          {formData.resume ? formData.resume.name : "Not uploaded"}
                        </div>
                        <div>
                          <span className="font-medium">Skills:</span>{" "}
                          {formData.skills.length > 0 ? formData.skills.join(", ") : "None selected"}
                        </div>
                        <div>
                          <span className="font-medium">Expected Salary:</span>{" "}
                          {formData.expectedSalary || "Not specified"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", checked === true)}
                          required
                        />
                        <Label htmlFor="agreeTerms" className="text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            Terms and Conditions
                          </Link>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreePrivacy"
                          checked={formData.agreePrivacy}
                          onCheckedChange={(checked) => handleCheckboxChange("agreePrivacy", checked === true)}
                          required
                        />
                        <Label htmlFor="agreePrivacy" className="text-sm">
                          I agree to the{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button onClick={nextStep} className={step === 1 ? "ml-auto" : ""}>
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.agreeTerms || !formData.agreePrivacy}
                  className="ml-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Job Details Sidebar */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={job.logo || "/placeholder.svg"} alt={job.company} />
                <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  {job.type} • {job.workMode}
                </span>
              </div>
              <div className="flex items-center">
                <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Deadline: {job.deadline}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{job.applicants} applicants</span>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Selection Process</h4>
              <div className="space-y-2">
                {job.selectionProcess.map((step, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium mr-2">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Key Benefits</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {job.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
