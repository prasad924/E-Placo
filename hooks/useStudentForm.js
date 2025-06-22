"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";

const defaultStudentForm = {
  id: "",
  name: "",
  email: "",
  gender: null,
  education: [],
  personalProfile: {
    aboutMe: "",
    phoneNumber: "",
    languages: [],
    address: "",
  },
  batch: "",
  finishingSchool: "",
  careerProfile: {
    skills: [],
    additionalLinks: [],
    projects: [],
    certifications: [],
    experience: [],
  },
  resumeLink: "",
  cgpa: "",
  url: "",
  department: "",
  location: "",
  university: "",
};

export function useStudentForm() {
  const [form, setForm] = useState(defaultStudentForm);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("idle");

  const addEducation = (data) => {
    setForm((prev) => ({
      ...prev,
      education: [...prev.education, data],
    }));
  };

  const updateEducation = (index, updatedEdu) => {
    const updated = [...form.education];
    updated[index] = updatedEdu;
    setForm((prev) => ({ ...prev, education: updated }));
  };

  const deleteEducation = (index) => {
    const updated = form.education.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, education: updated }));
  };

  const addProject = (data) => {
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        projects: [...prev.careerProfile.projects, data],
      },
    }));
  };

  const updateProject = (index, updatedProject) => {
    const updated = [...form.careerProfile.projects];
    updated[index] = updatedProject;
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        projects: updated,
      },
    }));
  };

  const deleteProject = (index) => {
    const updated = form.careerProfile.projects.filter((_, i) => i !== index);
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        projects: updated,
      },
    }));
  };

  const addExperience = (data) => {
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        experience: [...prev.careerProfile.experience, data],
      },
    }));
  };

  const updateExperience = (index, updatedExp) => {
    const updated = [...form.careerProfile.experience];
    updated[index] = updatedExp;
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        experience: updated,
      },
    }));
  };

  const deleteExperience = (index) => {
    const updated = form.careerProfile.experience.filter((_, i) => i !== index);
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        experience: updated,
      },
    }));
  };

  const addCertification = (data) => {
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        certifications: [...prev.careerProfile.certifications, data],
      },
    }));
  };

  const updateCertification = (index, updatedCert) => {
    const updated = [...form.careerProfile.certifications];
    updated[index] = updatedCert;
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        certifications: updated,
      },
    }));
  };

  const deleteCertification = (index) => {
    const updated = form.careerProfile.certifications.filter(
      (_, i) => i !== index
    );
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        certifications: updated,
      },
    }));
  };

  const addAdditionalLink = (data) => {
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        additionalLinks: [...prev.careerProfile.additionalLinks, data],
      },
    }));
  };

  const updateAdditionalLink = (index, updatedLink) => {
    const updated = [...form.careerProfile.additionalLinks];
    updated[index] = updatedLink;
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        additionalLinks: updated,
      },
    }));
  };

  const deleteAdditionalLink = (index) => {
    const updated = form.careerProfile.additionalLinks.filter(
      (_, i) => i !== index
    );
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        additionalLinks: updated,
      },
    }));
  };

  const addSkill = (newSkill) => {
    if (!newSkill.trim()) return;

    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        skills: [...new Set([...prev.careerProfile.skills, newSkill.trim()])],
      },
    }));
  };

  const removeSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      careerProfile: {
        ...prev.careerProfile,
        skills: prev.careerProfile.skills.filter((s) => s !== skillToRemove),
      },
    }));
  };

  const addLanguage = (language) => {
    if (!language.trim()) return;
    setForm((prev) => ({
      ...prev,
      personalProfile: {
        ...prev.personalProfile,
        languages: [
          ...new Set([...prev.personalProfile.languages, language.trim()]),
        ],
      },
    }));
  };

  const removeLanguage = (language) => {
    setForm((prev) => ({
      ...prev,
      personalProfile: {
        ...prev.personalProfile,
        languages: prev.personalProfile.languages.filter((l) => l !== language),
      },
    }));
  };

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const res = await api.get("/student/profile");
      const data = await res.data;
      const mergedData = {
        ...defaultStudentForm,
        ...data,
        personalProfile: {
          ...defaultStudentForm.personalProfile,
          ...(data.personalProfile || {}),
        },
        careerProfile: {
          ...defaultStudentForm.careerProfile,
          ...(data.careerProfile || {}),
        },
      };

      setForm(mergedData);
    } catch (error) {
      console.error("Failed to fetch student", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async () => {
    setSaveStatus("saving");
    try {
      const res = await api.patch("/student/update", form);
      if (res.status != 200) throw new Error("Update failed");
      await fetchStudent();
      setSaveStatus("saved");
      window.dispatchEvent(new Event("student-updated"));
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Update error:", error);
      setSaveStatus("idle");
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return {
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
  };
}
