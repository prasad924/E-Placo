"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Building,
  Edit,
  FileText,
  MapPin,
  Phone,
  Plus,
  Save,
  Send,
  X,
  Upload,
  Mail,
  Github,
  ExternalLink,
  Linkedin,
} from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useStudentForm } from "@/hooks/useStudentForm";
import Eloading from "@/components/loading";
import Link from "next/link";

const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0)
  );
};

export function StudentProfile() {
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const {
    form,
    setForm,
    loading,
    saveStatus,
    updateStudent,
    fetchStudent,
    addEducation,
    updateEducation,
    deleteEducation,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    addCertification,
    updateCertification,
    deleteCertification,
    addAdditionalLink,
    updateAdditionalLink,
    deleteAdditionalLink,
    addSkill,
    removeSkill,
    addLanguage,
    removeLanguage,
  } = useStudentForm();

  const [isEditing, setIsEditing] = useState(false);

  const calculateCompletion = () => {
    if (!form) return 0;

    let completed = 0;
    const total = 12;

    if (form.name) completed++;
    if (form.email) completed++;
    if (form.personalProfile?.phoneNumber) completed++;
    if (form.personalProfile?.address) completed++;
    if (
      form.personalProfile?.aboutMe &&
      form.personalProfile.aboutMe.length > 50
    )
      completed++;
    if (form.url) completed++;
    if (form.careerProfile?.skills?.filter(Boolean).length >= 3) completed++;
    if (form.personalProfile?.languages?.filter(Boolean).length >= 1)
      completed++;
    if (form.careerProfile?.projects?.length >= 1) completed++;
    if (form.education?.length >= 1) completed++;
    if (form.careerProfile?.experience?.length >= 1) completed++;
    if (form.careerProfile?.certifications?.length >= 1) completed++;

    return Math.round((completed / total) * 100);
  };

  const handleSaveProfile = async () => {
    try {
      await updateStudent();
      setIsEditing(false);

      toast("Success", {
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast("Failed", {
        title: "Update failed",
        description:
          error?.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = async () => {
    await fetchStudent();
    setIsEditing(false);
  };

  if (loading || !form) return <Eloading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">
            Manage your profile information and resume.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                disabled={saveStatus !== "idle"}
              >
                <Save className="mr-2 h-4 w-4" />
                {saveStatus === "idle" ? "Save Changes" : "Saving"}
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
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={form.url || "/default.png"}
                    alt={form.name || "Student"}
                  />
                  <AvatarFallback>
                    {(form.name || "User")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              {isEditing ? (
                <div className="mt-4 w-full space-y-2">
                  <Input
                    value={form.name || ""}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="text-center font-semibold"
                  />
                  {["male", "female", "other"].map((option) => (
                    <Label
                      key={option}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={form.gender === option}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                      />
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Label>
                  ))}
                </div>
              ) : (
                <>
                  <CardTitle className="mt-4 text-center">
                    {form.name || "User"}{" "}
                    {form.gender
                      ? `(${form.gender.charAt(0).toUpperCase()})`
                      : ""}
                  </CardTitle>
                  <CardDescription className="text-center">
                    Roll No : {form.id}
                  </CardDescription>
                  {form.department && (
                    <CardDescription className="text-center">
                      {form.department}
                    </CardDescription>
                  )}
                </>
              )}

              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {isEditing ? (
                  <Input
                    value={form.cgpa || ""}
                    onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
                    className="text-center font-light text-sm "
                    placeholder="CGPA"
                  />
                ) : (
                  <>
                    <Badge variant="secondary">{form.finishingSchool}</Badge>
                    {form.cgpa && (
                      <Badge variant="secondary">CGPA: {form.cgpa}</Badge>
                    )}
                    <Badge variant="secondary">
                      Batch of {form.batch || "N/A"}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Profile Completion</h4>
              <Progress value={calculateCompletion()} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                Your profile is {calculateCompletion()}% complete. Add more
                details to improve visibility.
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Contact Information</h4>
              {isEditing || !isEmpty(form.personalProfile?.address) ? (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={form.personalProfile?.address || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          personalProfile: {
                            ...prev.personalProfile,
                            address: e.target.value,
                          },
                        }))
                      }
                      className="text-sm"
                    />
                  ) : (
                    <span>{form.personalProfile?.address}</span>
                  )}
                </div>
              ) : null}

              {isEditing || !isEmpty(form.personalProfile?.phoneNumber) ? (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={form.personalProfile?.phoneNumber || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          personalProfile: {
                            ...prev.personalProfile,
                            phoneNumber: e.target.value,
                          },
                        }))
                      }
                      className="text-sm"
                    />
                  ) : (
                    <span>{form.personalProfile?.phoneNumber}</span>
                  )}
                </div>
              ) : null}

              {isEditing || !isEmpty(form.email) ? (
                <div className="flex items-center gap-2 text-sm">
                  <Send className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={form.email || ""}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="text-sm"
                    />
                  ) : (
                    <span>{form.email}</span>
                  )}
                </div>
              ) : null}

              {isEditing || !isEmpty(form.university) ? (
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={form.university || ""}
                      onChange={(e) =>
                        setForm({ ...form, university: e.target.value })
                      }
                      className="text-sm"
                    />
                  ) : (
                    <span>{form.university}</span>
                  )}
                </div>
              ) : null}
            </div>

            {isEditing || !isEmpty(form.careerProfile?.skills) ? (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Skills</h4>
                    {isEditing && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Skill</DialogTitle>
                            <DialogDescription>
                              Add a new skill to your profile
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter skill name"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addSkill(newSkill);
                                  setNewSkill("");
                                }
                              }}
                            />
                            <Button
                              onClick={() => {
                                addSkill(newSkill);
                                setNewSkill("");
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(form.careerProfile?.skills || []).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="relative group"
                      >
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
              </>
            ) : null}

            {isEditing || !isEmpty(form.personalProfile?.languages) ? (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Languages</h4>
                    {isEditing && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Language</DialogTitle>
                            <DialogDescription>
                              Add a language you speak
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter Language"
                              value={newLanguage}
                              onChange={(e) => setNewLanguage(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addLanguage(newLanguage);
                                  setNewLanguage("");
                                }
                              }}
                            />
                            <Button
                              onClick={() => {
                                addLanguage(newLanguage);
                                setNewLanguage("");
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(form.personalProfile?.languages || []).map(
                      (lang, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="relative group"
                        >
                          {lang}
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100"
                              onClick={() => removeLanguage(lang)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
        <div className="space-y-6 md:col-span-5">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      className="min-h-[150px]"
                      value={form.personalProfile?.aboutMe || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          personalProfile: {
                            ...prev.personalProfile,
                            aboutMe: e.target.value,
                          },
                        }))
                      }
                      placeholder="Tell us about yourself, your interests, and career goals..."
                    />
                  ) : (
                    <p className="text-muted-foreground">
                      {form.personalProfile?.aboutMe ||
                        "No description provided."}
                    </p>
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
                  {(form.careerProfile?.projects || []).map(
                    (project, index) => (
                      <ProjectCard
                        key={index}
                        project={project}
                        isEditing={isEditing}
                        onUpdate={(updatedProject) =>
                          updateProject(index, updatedProject)
                        }
                        onDelete={() => deleteProject(index)}
                      />
                    )
                  )}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Certifications</CardTitle>
                    {isEditing && (
                      <CertificationDialog onAdd={addCertification} />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(form.careerProfile?.certifications || []).map(
                    (cert, index) => (
                      <CertificationCard
                        key={index}
                        certification={cert}
                        isEditing={isEditing}
                        onUpdate={(updatedCert) =>
                          updateCertification(index, updatedCert)
                        }
                        onDelete={() => deleteCertification(index)}
                      />
                    )
                  )}
                </CardContent>
              </Card>

              {/* Additional Links */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Additional Links</CardTitle>
                    {isEditing && (
                      <AdditionalLinkDialog onAdd={addAdditionalLink} />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(form.careerProfile?.additionalLinks || []).map(
                    (link, index) => (
                      <AdditionalLinkCard
                        key={index}
                        link={link}
                        isEditing={isEditing}
                        onUpdate={(updatedLink) =>
                          updateAdditionalLink(index, updatedLink)
                        }
                        onDelete={() => deleteAdditionalLink(index)}
                      />
                    )
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Education</CardTitle>
                    {isEditing && <EducationDialog onAdd={addEducation} />}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(form.education || []).map((edu, index) => (
                    <EducationCard
                      key={index}
                      education={edu}
                      isEditing={isEditing}
                      onUpdate={(updatedEdu) =>
                        updateEducation(index, updatedEdu)
                      }
                      onDelete={() => deleteEducation(index)}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Work Experience</CardTitle>
                    {isEditing && <ExperienceDialog onAdd={addExperience} />}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(form.careerProfile?.experience || []).map((exp, index) => (
                    <ExperienceCard
                      key={index}
                      experience={exp}
                      isEditing={isEditing}
                      onUpdate={(updatedExp) =>
                        updateExperience(index, updatedExp)
                      }
                      onDelete={() => deleteExperience(index)}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resume" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Resume</CardTitle>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <div className="flex">
                          <Label htmlFor="resumeLink">External resume</Label>
                          <Input
                            id="resumeLink"
                            value={form.resumeLink || ""}
                            onChange={(e) =>
                              setForm({ ...form, resumeLink: e.target.value })
                            }
                            placeholder="Ex: https:drive.google.com/prasad924/resume"
                          />
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className={"cursor-pointer"}
                          onClick={() =>
                            window.open(form.resumeLink || "#", "_blank")
                          }
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Show External Resume
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="rounded-lg border p-4 bg-muted/50">
                    <div
                      className={`aspect-[1/1.414] w-full max-w-2xl mx-auto bg-white rounded-md shadow-sm p-8 text-black flex flex-col`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
                        <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">
                          {form.name || "Your Name"}
                        </h1>
                        <div className="flex justify-center items-center gap-4 text-sm text-gray-700 flex-wrap">
                          {form.personalProfile?.phoneNumber && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{form.personalProfile.phoneNumber}</span>
                            </div>
                          )}
                          {form.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{form.email}</span>
                            </div>
                          )}
                          {form.personalProfile?.address && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{form.personalProfile?.address}</span>
                            </div>
                          )}
                          {form.careerProfile?.additionalLinks?.map(
                            (link, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1"
                              >
                                {link.linkName
                                  ?.toLowerCase()
                                  .includes("linkedin") ? (
                                  <Linkedin className="h-3 w-3" />
                                ) : link.linkName
                                    ?.toLowerCase()
                                    .includes("github") ? (
                                  <Github className="h-3 w-3" />
                                ) : (
                                  <ExternalLink className="h-3 w-3" />
                                )}
                                <Link target="_blank" href={link.linkUrl}>
                                  {link.linkUrl}
                                </Link>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div className="space-y-5 flex-1">
                        {form.personalProfile?.aboutMe && (
                          <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
                              Summary
                            </h2>
                            <p className="text-xs leading-relaxed text-justify">
                              {form.personalProfile.aboutMe}
                            </p>
                          </div>
                        )}

                        {form.education && form.education.length > 0 && (
                          <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
                              Education
                            </h2>
                            {form.education.slice(0, 2).map((edu, index) => (
                              <div key={index} className="mb-3">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h3 className="text-xs font-bold">
                                      {edu.school || "Institution"}
                                    </h3>
                                    <p className="text-xs italic text-gray-600">
                                      {edu.degree || "Degree"}{" "}
                                      {edu.grade && `(GPA: ${edu.grade})`}
                                    </p>
                                  </div>
                                  <div className="text-xs text-right">
                                    <p className="font-medium">
                                      {edu.startYear || "Year"} -{" "}
                                      {edu.endYear || "Year"}
                                    </p>
                                    <p className="text-gray-600">
                                      {edu.location || ""}
                                    </p>
                                  </div>
                                </div>
                                {edu.courseWork && (
                                  <div className="mt-1">
                                    <p className="text-xs">
                                      <span className="font-medium">
                                        Relevant coursework:
                                      </span>{" "}
                                      {edu.courseWork}
                                    </p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {form.careerProfile?.projects &&
                          form.careerProfile.projects.length > 0 && (
                            <div>
                              <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
                                Projects
                              </h2>
                              {form.careerProfile.projects
                                .slice(0, 3)
                                .map((project, index) => (
                                  <div key={index} className="mb-3">
                                    <div className="flex justify-between items-start mb-1">
                                      <div className="flex items-center gap-2">
                                        <h3 className="text-xs font-bold">
                                          {project.title || "Project Title"}
                                        </h3>
                                        {project.projectLink && (
                                          <ExternalLink className="h-3 w-3 text-blue-600" />
                                        )}
                                      </div>
                                      <div className="text-xs text-gray-600">
                                        {project.technologies &&
                                          project.technologies.length > 0 && (
                                            <span className="italic">
                                              {project.technologies
                                                .slice(0, 3)
                                                .join(", ")}
                                            </span>
                                          )}
                                      </div>
                                    </div>
                                    {project.description && (
                                      <div className="text-xs space-y-1">
                                        {project.description
                                          .split(".")
                                          .filter((sentence) => sentence.trim())
                                          .slice(0, 3)
                                          .map((sentence, idx) => (
                                            <p
                                              key={idx}
                                              className="flex items-start"
                                            >
                                              <span className="mr-2">•</span>
                                              <span>{sentence.trim()}.</span>
                                            </p>
                                          ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          )}

                        {form.careerProfile?.experience &&
                          form.careerProfile.experience.length > 0 && (
                            <div>
                              <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
                                Experience
                              </h2>
                              {form.careerProfile.experience
                                .slice(0, 2)
                                .map((exp, index) => (
                                  <div key={index} className="mb-3">
                                    <div className="flex justify-between items-start mb-1">
                                      <div>
                                        <h3 className="text-xs font-bold">
                                          {exp.title || "Job Title"}
                                        </h3>
                                        <p className="text-xs italic text-gray-600">
                                          {exp.company || "Company"}
                                        </p>
                                      </div>
                                      <div className="text-xs text-right">
                                        <p className="font-medium">
                                          {exp.startDate || "Start"} -{" "}
                                          {exp.endDate || "End"}
                                        </p>
                                      </div>
                                    </div>
                                    {exp.description && (
                                      <div className="text-xs space-y-1">
                                        {exp.description
                                          .split(".")
                                          .filter((sentence) => sentence.trim())
                                          .slice(0, 3)
                                          .map((sentence, idx) => (
                                            <p
                                              key={idx}
                                              className="flex items-start"
                                            >
                                              <span className="mr-2">•</span>
                                              <span>{sentence.trim()}.</span>
                                            </p>
                                          ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          )}

                        {form.careerProfile?.skills &&
                          form.careerProfile.skills.length > 0 && (
                            <div>
                              <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
                                Skills
                              </h2>
                              <div className="space-y-1">
                                <div>
                                  <span className="text-xs font-medium">
                                    Technologies and Frameworks:{" "}
                                  </span>
                                  <span className="text-xs">
                                    {form.careerProfile.skills.join(", ")}
                                  </span>
                                </div>
                                {form.personalProfile?.languages &&
                                  form.personalProfile.languages.length > 0 && (
                                    <div>
                                      <span className="text-xs font-medium">
                                        Languages:{" "}
                                      </span>
                                      <span className="text-xs">
                                        {form.personalProfile.languages.join(
                                          ", "
                                        )}
                                      </span>
                                    </div>
                                  )}
                              </div>
                            </div>
                          )}
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
  );
}

function ProjectCard({ project, isEditing, onUpdate, onDelete }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium">{project.title || "Untitled Project"}</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.description || "No description"}
          </p>
          {project.projectStatus && (
            <p className="text-sm text-muted-foreground">
              Status: {project.projectStatus}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {(project.technologies || []).map((tech, index) => (
              <Badge key={index} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
          {project.projectLink && (
            <a
              href={project.projectLink}
              className="text-sm text-blue-600 hover:underline mt-2 block"
              target="_blank"
              rel="noopener noreferrer"
            >
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
  );
}

function ProjectDialog({ project, onAdd, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    project || {
      title: "",
      description: "",
      projectStatus: "",
      projectLink: "",
      technologies: [],
    }
  );
  const [newTech, setNewTech] = useState("");

  const handleSubmit = () => {
    if (project) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setOpen(false);
    if (!project) {
      setFormData({
        title: "",
        description: "",
        projectStatus: "",
        projectLink: "",
        technologies: [],
      });
    }
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech.trim()],
      });
      setNewTech("");
    }
  };

  const removeTechnology = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={project ? "ghost" : "outline"}
          size={project ? "icon" : "sm"}
        >
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
            {project
              ? "Update your project details"
              : "Add a new project to your profile"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter project title"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your project"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>

            <Select
              value={formData.projectStatus || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, projectStatus: value })
              }
            >
              <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In-Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="link">Project Link (Optional)</Label>
            <Input
              id="link"
              value={formData.projectLink || ""}
              onChange={(e) =>
                setFormData({ ...formData, projectLink: e.target.value })
              }
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1"
                    onClick={() => removeTechnology(tech)}
                  >
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
  );
}

function EducationCard({ education, isEditing, onUpdate, onDelete }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="mt-2 flex items-center justify-between">
            <h4 className="font-medium">{education.degree || "Degree"}</h4>
            <Badge>{education.grade || "Grade"} CGPA</Badge>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {education.school || "School"}, {education.location || ""}
            </p>
            <p className="text-sm">
              {education.startYear || "Start"} - {education.endYear || "End"}
            </p>
          </div>
          {education.courseWork && (
            <div className="mt-2">
              <h5 className="text-sm font-medium">Relevant coursework:</h5>
              <p className="text-sm text-muted-foreground">
                {education.courseWork}
              </p>
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
  );
}

function EducationDialog({ education, onAdd, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    education || {
      degree: "",
      school: "",
      startYear: "",
      endYear: "",
      grade: "",
      courseWork: "",
      location: "",
    }
  );

  const handleSubmit = () => {
    if (education) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setOpen(false);
    if (!education) {
      setFormData({
        degree: "",
        school: "",
        startYear: "",
        endYear: "",
        grade: "",
        courseWork: "",
        lcoation: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={education ? "ghost" : "outline"}
          size={education ? "icon" : "sm"}
        >
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
          <DialogTitle>
            {education ? "Edit Education" : "Add Education"}
          </DialogTitle>
          <DialogDescription>
            {education
              ? "Update your education details"
              : "Add education to your profile"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              value={formData.degree || ""}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
              placeholder="B.Tech in Computer Science"
            />
          </div>
          <div>
            <Label htmlFor="school">University/School</Label>
            <Input
              id="school"
              value={formData.school || ""}
              onChange={(e) =>
                setFormData({ ...formData, school: e.target.value })
              }
              placeholder="University Name"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Ex: Hyderabad"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startYear">Start Year</Label>
              <Input
                id="startYear"
                value={formData.startYear || ""}
                onChange={(e) =>
                  setFormData({ ...formData, startYear: e.target.value })
                }
                placeholder="2021"
              />
            </div>
            <div>
              <Label htmlFor="endYear">End Year</Label>
              <Input
                id="endYear"
                value={formData.endYear || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endYear: e.target.value })
                }
                placeholder="2025"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="grade">Grade/CGPA</Label>
            <Input
              id="grade"
              value={formData.grade || ""}
              onChange={(e) =>
                setFormData({ ...formData, grade: e.target.value })
              }
              placeholder="8.5 CGPA or 85%"
            />
          </div>
          <div>
            <Label htmlFor="courseWork">Relevant coursework (Optional)</Label>
            <Textarea
              id="courseWork"
              value={formData.courseWork || ""}
              onChange={(e) =>
                setFormData({ ...formData, courseWork: e.target.value })
              }
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
  );
}

function ExperienceCard({ experience, isEditing, onUpdate, onDelete }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium">{experience.title || "Job Title"}</h4>
          <p className="text-sm text-muted-foreground">
            {experience.company || "Company"}
          </p>
          <p className="mt-1 text-sm">
            {experience.startDate || "Start"} - {experience.endDate || "End"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {experience.description || "No description"}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(experience.technologies || []).map((tech, index) => (
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
  );
}

function ExperienceDialog({ experience, onAdd, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    experience || {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: [],
    }
  );
  const [newTech, setNewTech] = useState("");

  const handleSubmit = () => {
    if (experience) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setOpen(false);
    if (!experience) {
      setFormData({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: [],
      });
    }
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech.trim()],
      });
      setNewTech("");
    }
  };

  const removeTechnology = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={experience ? "ghost" : "outline"}
          size={experience ? "icon" : "sm"}
        >
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
          <DialogTitle>
            {experience ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
          <DialogDescription>
            {experience
              ? "Update your experience details"
              : "Add work experience to your profile"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Software Developer Intern"
            />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company || ""}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="Company Name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                value={formData.startDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                placeholder="May 2024"
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                value={formData.endDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                placeholder="July 2024 or Present"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1"
                    onClick={() => removeTechnology(tech)}
                  >
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
  );
}

function CertificationCard({ certification, isEditing, onUpdate, onDelete }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium">
            {certification.name || "Certification Name"}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {certification.provider || "Provider"}
          </p>
          <p className="text-xs text-muted-foreground">
            Issued: {certification.issueDate || "Date"}
          </p>
          {certification.credentialId && (
            <p className="text-xs text-muted-foreground">
              Credential ID: {certification.credentialId}
            </p>
          )}
          {certification.credentialLink && (
            <a
              href={certification.credentialLink}
              className="text-xs text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Credential →
            </a>
          )}
        </div>
        {isEditing && (
          <div className="flex gap-2 ml-4">
            <CertificationDialog
              certification={certification}
              onUpdate={onUpdate}
            />
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function CertificationDialog({ certification, onAdd, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    certification || {
      name: "",
      provider: "",
      issueDate: "",
      credentialId: "",
      credentialLink: "",
    }
  );

  const handleSubmit = () => {
    if (certification) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setOpen(false);
    if (!certification) {
      setFormData({
        name: "",
        provider: "",
        issueDate: "",
        credentialId: "",
        credentialLink: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={certification ? "ghost" : "outline"}
          size={certification ? "icon" : "sm"}
        >
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
          <DialogTitle>
            {certification ? "Edit Certification" : "Add Certification"}
          </DialogTitle>
          <DialogDescription>
            {certification
              ? "Update your certification details"
              : "Add a certification to your profile"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Certification Name</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="AWS Certified Developer"
            />
          </div>
          <div>
            <Label htmlFor="provider">Issuing Authority</Label>
            <Input
              id="provider"
              value={formData.provider || ""}
              onChange={(e) =>
                setFormData({ ...formData, provider: e.target.value })
              }
              placeholder="Amazon Web Services"
            />
          </div>
          <div>
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input
              id="issueDate"
              value={formData.issueDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, issueDate: e.target.value })
              }
              placeholder="January 2025"
            />
          </div>
          <div>
            <Label htmlFor="credentialId">Credential ID (Optional)</Label>
            <Input
              id="credentialId"
              value={formData.credentialId || ""}
              onChange={(e) =>
                setFormData({ ...formData, credentialId: e.target.value })
              }
              placeholder="AWS-DEV-2025-001"
            />
          </div>
          <div>
            <Label htmlFor="credentialLink">Credential Link (Optional)</Label>
            <Input
              id="credentialLink"
              value={formData.credentialLink || ""}
              onChange={(e) =>
                setFormData({ ...formData, credentialLink: e.target.value })
              }
              placeholder="https://example.com/credential"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            {certification ? "Update Certification" : "Add Certification"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AdditionalLinkCard({ link, isEditing, onUpdate, onDelete }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium">{link.linkName || "Link Name"}</h4>
          {link.linkUrl && (
            <a
              href={link.linkUrl}
              className="text-sm text-blue-600 hover:underline mt-1 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.linkUrl} →
            </a>
          )}
        </div>
        {isEditing && (
          <div className="flex gap-2 ml-4">
            <AdditionalLinkDialog link={link} onUpdate={onUpdate} />
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function AdditionalLinkDialog({ link, onAdd, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    link || {
      linkName: "",
      linkUrl: "",
    }
  );

  const handleSubmit = () => {
    if (link) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setOpen(false);
    if (!link) {
      setFormData({
        linkName: "",
        linkUrl: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={link ? "ghost" : "outline"}
          size={link ? "icon" : "sm"}
        >
          {link ? (
            <Edit className="h-4 w-4" />
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Link
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {link ? "Edit Link" : "Add Additional Link"}
          </DialogTitle>
          <DialogDescription>
            {link
              ? "Update your link details"
              : "Add an additional link to your profile"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="linkName">Link Name</Label>
            <Input
              id="linkName"
              value={formData.linkName || ""}
              onChange={(e) =>
                setFormData({ ...formData, linkName: e.target.value })
              }
              placeholder="Portfolio, LinkedIn, GitHub, etc."
            />
          </div>
          <div>
            <Label htmlFor="linkUrl">Link URL</Label>
            <Input
              id="linkUrl"
              value={formData.linkUrl || ""}
              onChange={(e) =>
                setFormData({ ...formData, linkUrl: e.target.value })
              }
              placeholder="https://example.com"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            {link ? "Update Link" : "Add Link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
