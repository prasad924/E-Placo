"use client"

import { useState, useRef } from "react"
import { Building, Edit, FileText, MapPin, Phone, Plus, Save, Send, X, Upload, Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  

  const [profileData, setProfileData] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    university: "Tech University",
    degree: "Computer Science & Engineering",
    batch: "2025",
    cgpa: "8.5",
    profilePicture: "/placeholder.svg", // This will be Cloudinary URL
    aboutMe:
      "I am a final year Computer Science student with a passion for web development and machine learning. I have experience building full-stack applications and working with various frameworks and technologies. I am looking for opportunities in software development and data science.",
  })

  // Skills state
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js", "Python", "SQL", "Git"])
  const [newSkill, setNewSkill] = useState("")

  // Languages state
  const [languages, setLanguages] = useState([
    { language: "English", proficiency: "Fluent" },
    { language: "Hindi", proficiency: "Native" },
    { language: "French", proficiency: "Basic" },
  ])

  // Projects state
  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "E-Commerce Platform",
      description:
        "Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented features like user authentication, product search, cart management, and payment integration.",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/johnsmith/ecommerce",
    },
    {
      id: "2",
      name: "Sentiment Analysis Tool",
      description:
        "Developed a sentiment analysis tool that analyzes text data from social media and provides insights on customer sentiment. Used Python, NLTK, and Flask for the backend.",
      technologies: ["Python", "NLTK", "Flask"],
      link: "https://github.com/johnsmith/sentiment-analysis",
    },
  ])

  // Education state
  const [education, setEducation] = useState([
    {
      id: "1",
      degree: "B.Tech in Computer Science & Engineering",
      university: "Tech University",
      startYear: "2021",
      endYear: "2025",
      grade: "8.5 CGPA",
      coursework:
        "Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Machine Learning, Web Development",
    },
    {
      id: "2",
      degree: "Higher Secondary Education",
      university: "City Public School",
      startYear: "2019",
      endYear: "2021",
      grade: "92%",
      coursework: "",
    },
  ])

  // Experience state
  const [experience, setExperience] = useState([
    {
      id: "1",
      title: "Software Development Intern",
      company: "TechCorp",
      startDate: "May 2024",
      endDate: "July 2024",
      description:
        "Worked on developing new features for the company's web application using React and Node.js. Collaborated with the design team to implement responsive UI components. Participated in code reviews and agile development processes.",
      technologies: ["React", "Node.js", "Agile"],
    },
    {
      id: "2",
      title: "Research Assistant",
      company: "University AI Lab",
      startDate: "January 2024",
      endDate: "April 2024",
      description:
        "Assisted in research on natural language processing techniques. Implemented and evaluated various machine learning models for text classification. Co-authored a research paper on sentiment analysis.",
      technologies: ["Python", "NLP", "Research"],
    },
  ])

  // Certifications state
  const [certifications, setCertifications] = useState([
    {
      id: "1",
      name: "AWS Certified Developer",
      authority: "Amazon Web Services",
      date: "January 2025",
      credentialId: "AWS-DEV-2025-001",
    },
    {
      id: "2",
      name: "Machine Learning Specialization",
      authority: "Stanford University (Coursera)",
      date: "November 2024",
      credentialId: "COURSERA-ML-2024-002",
    },
  ])

  // Temporary edit states
  const [editData, setEditData] = useState(profileData)

  // Handle avatar upload
  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, GIF)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Option 1: Upload to Cloudinary (Recommended)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "your_upload_preset") // Replace with your Cloudinary preset

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        },
      )

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()

      // Update profile with Cloudinary URL
      const newProfileData = { ...profileData, profilePicture: data.secure_url }
      setProfileData(newProfileData)
      setEditData(newProfileData)

      toast({
        title: "Profile picture updated!",
        description: "Your profile picture has been successfully updated.",
      })

      // Here you would also update the backend
      // await updateUserProfile({ profilePicture: data.secure_url })
    } catch (error) {
      console.error("Upload error:", error)

      // Fallback: Create local preview (for development)
      const reader = new FileReader()
      reader.onload = (e) => {
        const newProfileData = { ...profileData, profilePicture: e.target?.result }
        setProfileData(newProfileData)
        setEditData(newProfileData)

        toast({
          title: "Profile picture updated!",
          description: "Your profile picture has been updated (local preview).",
        })
      }
      reader.readAsDataURL(file)
    } finally {
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Calculate profile completion
  const calculateCompletion = () => {
    let completed = 0
    const total = 12

    if (profileData.name) completed++
    if (profileData.email) completed++
    if (profileData.phone) completed++
    if (profileData.location) completed++
    if (profileData.aboutMe && profileData.aboutMe.length > 50) completed++
    if (profileData.profilePicture && profileData.profilePicture !== "/placeholder.svg") completed++
    if (skills.length >= 3) completed++
    if (languages.length >= 1) completed++
    if (projects.length >= 1) completed++
    if (education.length >= 1) completed++
    if (experience.length >= 1) completed++
    if (certifications.length >= 1) completed++

    return Math.round((completed / total) * 100)
  }

  // Handle profile save
  const handleSaveProfile = async () => {
    try {
      setProfileData(editData)
      setIsEditing(false)

      // Here you would make API call to save the data
      // await updateUserProfile(editData)

      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      })

      console.log("Profile saved:", editData)
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle profile cancel
  const handleCancelEdit = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  // Skills functions
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  // Projects functions
  const addProject = (newProject) => {
    setProjects([...projects, { ...newProject, id: Date.now().toString() }])
  }

  const updateProject = (id, updatedProject) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, ...updatedProject } : project)))
  }

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  // Education functions
  const addEducation = (newEducation) => {
    setEducation([...education, { ...newEducation, id: Date.now().toString() }])
  }

  const updateEducation = (id, updatedEducation) => {
    setEducation(education.map((edu) => (edu.id === id ? { ...edu, ...updatedEducation } : edu)))
  }

  const deleteEducation = (id) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  // Experience functions
  const addExperience = (newExperience) => {
    setExperience([...experience, { ...newExperience, id: Date.now().toString() }])
  }

  const updateExperience = (id, updatedExperience) => {
    setExperience(experience.map((exp) => (exp.id === id ? { ...exp, ...updatedExperience } : exp)))
  }

  const deleteExperience = (id) => {
    setExperience(experience.filter((exp) => exp.id !== id))
  }

  // Certifications functions
  const addCertification = (newCertification) => {
    setCertifications([...certifications, { ...newCertification, id: Date.now().toString() }])
  }

  const updateCertification = (id, updatedCertification) => {
    setCertifications(certifications.map((cert) => (cert.id === id ? { ...cert, ...updatedCertification } : cert)))
  }

  const deleteCertification = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">Manage your profile information and resume.</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Left Sidebar */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileData.profilePicture || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback>
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {/* Upload overlay */}
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={triggerFileInput}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Upload button for mobile/always visible option */}
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background"
                  onClick={triggerFileInput}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                  ) : (
                    <Upload className="h-3 w-3" />
                  )}
                </Button>
              </div>

              {isEditing ? (
                <div className="mt-4 w-full space-y-2">
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="text-center font-semibold"
                  />
                  <Input
                    value={editData.degree}
                    onChange={(e) => setEditData({ ...editData, degree: e.target.value })}
                    className="text-center text-sm"
                  />
                </div>
              ) : (
                <>
                  <CardTitle className="mt-4 text-center">{profileData.name}</CardTitle>
                  <CardDescription className="text-center">{profileData.degree}</CardDescription>
                </>
              )}

              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">CGPA: {profileData.cgpa}</Badge>
                <Badge variant="secondary">Batch of {profileData.batch}</Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Profile Completion */}
            <div>
              <h4 className="mb-2 text-sm font-medium">Profile Completion</h4>
              <Progress value={calculateCompletion()} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                Your profile is {calculateCompletion()}% complete. Add more details to improve visibility.
              </p>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Contact Information</h4>
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={editData.university}
                      onChange={(e) => setEditData({ ...editData, university: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Send className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.university}</span>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Skills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Skills</h4>
                {isEditing && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Skill</DialogTitle>
                        <DialogDescription>Add a new skill to your profile</DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter skill name"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addSkill()}
                        />
                        <Button onClick={addSkill}>Add</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="relative group">
                    {skill}
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Languages */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Languages</h4>
                {isEditing && (
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                  <Badge key={index} variant="outline">
                    {lang.language} ({lang.proficiency})
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6 md:col-span-5">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6 mt-6">
              {/* About Me */}
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      className="min-h-[150px]"
                      value={editData.aboutMe}
                      onChange={(e) => setEditData({ ...editData, aboutMe: e.target.value })}
                      placeholder="Tell us about yourself, your interests, and career goals..."
                    />
                  ) : (
                    <p className="text-muted-foreground">{profileData.aboutMe}</p>
                  )}
                </CardContent>
              </Card>

              {/* Projects */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Projects</CardTitle>
                    {isEditing && <ProjectDialog onAdd={addProject} />}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isEditing={isEditing}
                      onUpdate={(updatedProject) => updateProject(project.id, updatedProject)}
                      onDelete={() => deleteProject(project.id)}
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Certifications</CardTitle>
                    {isEditing && <CertificationDialog onAdd={addCertification} />}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certifications.map((cert) => (
                    <CertificationCard
                      key={cert.id}
                      certification={cert}
                      isEditing={isEditing}
                      onUpdate={(updatedCert) => updateCertification(cert.id, updatedCert)}
                      onDelete={() => deleteCertification(cert.id)}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Education</CardTitle>
                    {isEditing && <EducationDialog onAdd={addEducation} />}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.map((edu) => (
                    <EducationCard
                      key={edu.id}
                      education={edu}
                      isEditing={isEditing}
                      onUpdate={(updatedEdu) => updateEducation(edu.id, updatedEdu)}
                      onDelete={() => deleteEducation(edu.id)}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Work Experience</CardTitle>
                    {isEditing && <ExperienceDialog onAdd={addExperience} />}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experience.map((exp) => (
                    <ExperienceCard
                      key={exp.id}
                      experience={exp}
                      isEditing={isEditing}
                      onUpdate={(updatedExp) => updateExperience(exp.id, updatedExp)}
                      onDelete={() => deleteExperience(exp.id)}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resume Tab */}
            <TabsContent value="resume" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Resume</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Resume
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border p-4 bg-muted/50">
                    <div className="aspect-[1/1.414] w-full max-w-md mx-auto bg-background rounded-md shadow-sm p-8 flex flex-col">
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-bold">{profileData.name}</h2>
                        <p className="text-sm text-muted-foreground">{profileData.degree} Student</p>
                        <div className="flex justify-center gap-2 mt-2 text-xs text-muted-foreground">
                          <span>{profileData.email}</span>
                          <span>•</span>
                          <span>{profileData.phone}</span>
                        </div>
                      </div>

                      <div className="space-y-4 flex-1">
                        <div>
                          <h3 className="text-sm font-bold border-b pb-1">EDUCATION</h3>
                          {education.slice(0, 2).map((edu, index) => (
                            <div key={index} className="mt-2">
                              <div className="flex justify-between text-xs">
                                <p className="font-medium">{edu.degree}</p>
                                <p>
                                  {edu.startYear} - {edu.endYear}
                                </p>
                              </div>
                              <p className="text-xs">
                                {edu.university} | {edu.grade}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h3 className="text-sm font-bold border-b pb-1">EXPERIENCE</h3>
                          {experience.slice(0, 2).map((exp, index) => (
                            <div key={index} className="mt-2">
                              <div className="flex justify-between text-xs">
                                <p className="font-medium">{exp.title}</p>
                                <p>
                                  {exp.startDate} - {exp.endDate}
                                </p>
                              </div>
                              <p className="text-xs">{exp.company}</p>
                              <p className="text-xs mt-1">{exp.description.substring(0, 100)}...</p>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h3 className="text-sm font-bold border-b pb-1">PROJECTS</h3>
                          {projects.slice(0, 2).map((project, index) => (
                            <div key={index} className="mt-2">
                              <p className="text-xs font-medium">{project.name}</p>
                              <p className="text-xs mt-1">{project.description.substring(0, 80)}...</p>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h3 className="text-sm font-bold border-b pb-1">SKILLS</h3>
                          <div className="mt-2 flex flex-wrap gap-1 text-xs">
                            {skills.slice(0, 6).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project, isEditing, onUpdate, onDelete }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium">{project.name}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
          {project.link && (
            <a href={project.link} className="text-sm text-blue-600 hover:underline mt-2 block">
              View Project →
            </a>
          )}
        </div>
        {isEditing && (
          <div className="flex gap-2 ml-4">
            <ProjectDialog project={project} onUpdate={onUpdate} />
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Project Dialog Component
function ProjectDialog({ project, onAdd, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(
    project || {
      name: "",
      description: "",
      technologies: [],
      link: "",
    },
  )
  const [newTech, setNewTech] = useState("")

  const handleSubmit = () => {
    if (project) {
      onUpdate(formData)
    } else {
      onAdd(formData)
    }
    setOpen(false)
    if (!project) {
      setFormData({ name: "", description: "", technologies: [], link: "" })
    }
  }

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech.trim()],
      })
      setNewTech("")
    }
  }

  const removeTechnology = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={project ? "ghost" : "outline"} size={project ? "icon" : "sm"}>
          {project ? (
            <Edit className="h-4 w-4" />
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
          <DialogDescription>
            {project ? "Update your project details" : "Add a new project to your profile"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your project"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="link">Project Link (Optional)</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://github.com/username/project"
            />
          </div>
          <div>
            <Label>Technologies</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === "Enter" && addTechnology()}
              />
              <Button type="button" onClick={addTechnology}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="relative group">
                  {tech}
                  <Button variant="ghost" size="icon" className="h-4 w-4 ml-1" onClick={() => removeTechnology(tech)}>
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full">
            {project ? "Update Project" : "Add Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Similar components for Education, Experience, and Certification
function EducationCard({ education, isEditing, onUpdate, onDelete }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium">{education.degree}</h4>
          <p className="text-sm text-muted-foreground">{education.university}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm">
              {education.startYear} - {education.endYear}
            </p>
            <Badge>{education.grade}</Badge>
          </div>
          {education.coursework && (
            <div className="mt-2">
              <h5 className="text-sm font-medium">Relevant Coursework:</h5>
              <p className="text-sm text-muted-foreground">{education.coursework}</p>
            </div>
          )}
        </div>
        {isEditing && (
          <div className="flex gap-2 ml-4">
            <EducationDialog education={education} onUpdate={onUpdate} />
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function EducationDialog({ education, onAdd, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(
    education || {
      degree: "",
      university: "",
      startYear: "",
      endYear: "",
      grade: "",
      coursework: "",
    },
  )

  const handleSubmit = () => {
    if (education) {
      onUpdate(formData)
    } else {
      onAdd(formData)
    }
    setOpen(false)
    if (!education) {
      setFormData({ degree: "", university: "", startYear: "", endYear: "", grade: "", coursework: "" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={education ? "ghost" : "outline"} size={education ? "icon" : "sm"}>
          {education ? (
            <Edit className="h-4 w-4" />
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{education ? "Edit Education" : "Add Education"}</DialogTitle>
          <DialogDescription>
            {education ? "Update your education details" : "Add education to your profile"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="B.Tech in Computer Science"
            />
          </div>
          <div>
            <Label htmlFor="university">University/School</Label>
            <Input
              id="university"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              placeholder="University Name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startYear">Start Year</Label>
              <Input
                id="startYear"
                value={formData.startYear}
                onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                placeholder="2021"
              />
            </div>
            <div>
              <Label htmlFor="endYear">End Year</Label>
              <Input
                id="endYear"
                value={formData.endYear}
                onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                placeholder="2025"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="grade">Grade/CGPA</Label>
            <Input
              id="grade"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              placeholder="8.5 CGPA or 85%"
            />
          </div>
          <div>
            <Label htmlFor="coursework">Relevant Coursework (Optional)</Label>
            <Textarea
              id="coursework"
              value={formData.coursework}
              onChange={(e) => setFormData({ ...formData, coursework: e.target.value })}
              placeholder="List relevant courses"
              rows={2}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            {education ? "Update Education" : "Add Education"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ExperienceCard({ experience, isEditing, onUpdate, onDelete }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium">{experience.title}</h4>
          <p className="text-sm text-muted-foreground">{experience.company}</p>
          <p className="mt-1 text-sm">
            {experience.startDate} - {experience.endDate}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{experience.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
              <Badge key={index} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        {isEditing && (
          <div className="flex gap-2 ml-4">
            <ExperienceDialog experience={experience} onUpdate={onUpdate} />
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function ExperienceDialog({ experience, onAdd, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(
    experience || {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: [],
    },
  )
  const [newTech, setNewTech] = useState("")

  const handleSubmit = () => {
    if (experience) {
      onUpdate(formData)
    } else {
      onAdd(formData)
    }
    setOpen(false)
    if (!experience) {
      setFormData({ title: "", company: "", startDate: "", endDate: "", description: "", technologies: [] })
    }
  }

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech.trim()],
      })
      setNewTech("")
    }
  }

  const removeTechnology = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={experience ? "ghost" : "outline"} size={experience ? "icon" : "sm"}>
          {experience ? (
            <Edit className="h-4 w-4" />
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{experience ? "Edit Experience" : "Add Experience"}</DialogTitle>
          <DialogDescription>
            {experience ? "Update your experience details" : "Add work experience to your profile"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Software Developer Intern"
            />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company Name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="May 2024"
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                placeholder="July 2024 or Present"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your role and achievements"
              rows={3}
            />
          </div>
          <div>
            <Label>Technologies/Skills</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === "Enter" && addTechnology()}
              />
              <Button type="button" onClick={addTechnology}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="relative group">
                  {tech}
                  <Button variant="ghost" size="icon" className="h-4 w-4 ml-1" onClick={() => removeTechnology(tech)}>
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full">
            {experience ? "Update Experience" : "Add Experience"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CertificationCard({ certification, isEditing, onUpdate, onDelete }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium">{certification.name}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{certification.authority}</p>
          <p className="text-xs text-muted-foreground">Issued: {certification.date}</p>
          {certification.credentialId && (
            <p className="text-xs text-muted-foreground">Credential ID: {certification.credentialId}</p>
          )}
        </div>
        {isEditing && (
          <div className="flex gap-2 ml-4">
            <CertificationDialog certification={certification} onUpdate={onUpdate} />
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function CertificationDialog({ certification, onAdd, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(
    certification || {
      name: "",
      authority: "",
      date: "",
      credentialId: "",
    },
  )

  const handleSubmit = () => {
    if (certification) {
      onUpdate(formData)
    } else {
      onAdd(formData)
    }
    setOpen(false)
    if (!certification) {
      setFormData({ name: "", authority: "", date: "", credentialId: "" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={certification ? "ghost" : "outline"} size={certification ? "icon" : "sm"}>
          {certification ? (
            <Edit className="h-4 w-4" />
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Certification
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{certification ? "Edit Certification" : "Add Certification"}</DialogTitle>
          <DialogDescription>
            {certification ? "Update your certification details" : "Add a certification to your profile"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Certification Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="AWS Certified Developer"
            />
          </div>
          <div>
            <Label htmlFor="authority">Issuing Authority</Label>
            <Input
              id="authority"
              value={formData.authority}
              onChange={(e) => setFormData({ ...formData, authority: e.target.value })}
              placeholder="Amazon Web Services"
            />
          </div>
          <div>
            <Label htmlFor="date">Issue Date</Label>
            <Input
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="January 2025"
            />
          </div>
          <div>
            <Label htmlFor="credentialId">Credential ID (Optional)</Label>
            <Input
              id="credentialId"
              value={formData.credentialId}
              onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              placeholder="AWS-DEV-2025-001"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            {certification ? "Update Certification" : "Add Certification"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
