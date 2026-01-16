"use client";

import Loading from "@/app/(dashboard)/loading";
import { RiGraduationCapLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { confirmToast } from "@/components/UI/ConfirmToast";
import toast from "react-hot-toast";
import { getEducations, addEducation, deleteEducation , updateEducation } from "@/libs/education";
import type { Education, EducationPayload } from "@/libs/education";
import { addExperience, deleteExperience, getExperience, updateExperience, type Experience, type ExperiencePayload } from "@/libs/experience";

type SectionType = "education" | "experience";
export default function EducationPage() {
    const [activeSection, setActiveSection] =
    useState<SectionType>("education");
    const [data, setData] = useState<Education[]>([]);
    const [dataExp, setDataExp] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddEducation, setShowAddEducation] = useState(false);
    const [showUpdateEducation, setShowUpdateEducation] = useState(false);
    const [showAddExperience, setShowAddExperience] = useState(false);
    const [showUpdateExperience, setShowUpdateExperience] = useState(false);
    const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
    const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
    const [form, setForm] = useState<Omit<EducationPayload, "skills"> & { skills: string }>({
        institution: "",
        degree: "",
        field: "",
        country: "",
        date: "",
        GPA_dec: "",
        GPA: "",
        description: "",
        icon : "graduation",
        skills: "",
    });
    const [formExperience, setFormExperience] = useState<
      Omit<ExperiencePayload, "description" | "technologies"> & {
        description: string;
        technologies: string;
      }
    >({
      role: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: "",
    });
    const emptyForm: Omit<EducationPayload, "skills"> & { skills: string } = {
        institution: "",
        degree: "",
        field: "",
        country: "",
        date: "",
        GPA_dec: "",
        GPA: "",
        description: "",
        icon : "graduation",
        skills: "",
    };
    
    // get data 
    useEffect(() => {
      const fetchData = async () => {
        const [edu, exp] = await Promise.all([
          getEducations(),
          getExperience(),
        ]);

        setData(edu);
        setDataExp(exp);
        setLoading(false);
      };

      fetchData();
    }, []);


    // post data 
    const handleEducationChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    const handleExperienceChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setFormExperience((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: EducationPayload = {
        institution: form.institution,
        degree: form.degree,
        field: form.field,
        country: form.country,
        date: form.date,
        GPA: form.GPA,
        GPA_dec: form.GPA_dec,
        description: form.description,
        icon : form.icon,
        skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    await addEducation(payload);
    const res = await getEducations();
    setData(res);
    toast.success("Education added successfully");

    setShowAddEducation(false);
    setForm({
        institution: "",
        degree: "",
        field: "",
        country: "",
        date: "",
        GPA_dec: "",
        GPA: "",
        description: "",
        icon: "graduation",
        skills: "",
    });
    };
    const handleSubmitExperience = async (e: React.FormEvent) => {
      e.preventDefault()  
      const payload: ExperiencePayload = {
        role: formExperience.role,
        company: formExperience.company,
        location: formExperience.location,
        startDate: formExperience.startDate,
        endDate: formExperience.endDate,
        description: formExperience.description
          .split("\n")
          .map((d) => d.trim())
          .filter(Boolean),
        technologies: formExperience.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      } 
      await addExperience(payload)  
      const res = await getExperience();
      setDataExp(res)  
      toast.success("Experience added successfully")  
      setShowAddExperience(false);
      setFormExperience({
        role: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: "",
      });
    };

    // update data
    const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEducation) return;

    const payload: Partial<EducationPayload> = {
        institution: form.institution,
        degree: form.degree,
        field: form.field,
        country: form.country,
        date: form.date,
        GPA: form.GPA,
        GPA_dec: form.GPA_dec,
        description: form.description,
        icon : form.icon,
        skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    await updateEducation(selectedEducation.id, payload);
    toast.success("Education updated");

    setShowUpdateEducation(false);
    setSelectedEducation(null);

    // refresh table
    const res = await getEducations();
    setData(res);
    };

    const handleUpdateExp = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedExperience) return;

      const payload: Partial<ExperiencePayload> ={
        role: formExperience.role,
        company: formExperience.company,
        location: formExperience.location,
        startDate: formExperience.startDate,
        endDate: formExperience.endDate,
        description: formExperience.description
          .split("\n")
          .map((d) => d.trim())
          .filter(Boolean),
        technologies: formExperience.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      await updateExperience(selectedExperience.id, payload);
      toast.success("Experience updated");

      setShowUpdateEducation(false);
      setSelectedExperience(null);
      const res = await getExperience();
      setDataExp(res);
    }

    // delete data
    const handleDelete = (id: string) => {
    confirmToast({
        title: "Delete Education",
        message: "This action cannot be undone.",
        confirmText: "Delete",
        variant: "danger",
        onConfirm: async () => {
        await deleteEducation(id);

        setData((prev) => prev.filter((item) => item.id !== id));
        toast.success("Education deleted");
        },
    });
    };
    const handleDeleteExperience = (id: string) => {
      confirmToast({
        title: "Delete Experience",
        message: "This action cannot be undone.",
        confirmText: "Delete",
        variant: "danger",
        onConfirm: async () => {
          await deleteExperience(id);
          setDataExp((prev) => prev.filter((item) => item.id !== id));
          toast.success("Experience deleted");
        },
      });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="rounded-xl border border-white/10 bg-linear-to-b from-white/5 to-white/0 backdrop-blur-md shadow-lg">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <RiGraduationCapLine className="text-blue-400 text-xl" />
                    <h2 className="text-lg font-semibold text-white">
                      Education &  Experience
                    </h2>
                  </div>
                  <p className="text-xs text-white/40 mt-1">
                    Manage education history & academic achievements
                  </p>
                </div>
                <div className="flex gap-2">
                      <button
                        onClick={() => setActiveSection("education")}
                        className={`px-4 py-1 rounded-lg text-sm border transition
                          ${activeSection === "education"
                            ? "border-blue-400 text-blue-400 bg-blue-500/10"
                            : "border-white/20 text-white/50 hover:text-white"}
                        `}
                      >
                        Education
                      </button>

                      <button
                        onClick={() => setActiveSection("experience")}
                        className={`px-4 py-1 rounded-lg text-sm border transition
                          ${activeSection === "experience"
                            ? "border-green-400 text-green-400 bg-green-500/10"
                            : "border-white/20 text-white/50 hover:text-white"}
                        `}
                      >
                        Experience
                      </button>
                      <button
                          onClick={() => {
                            setForm(emptyForm);
                            if (activeSection === "education") {
                              setShowAddEducation(true);
                            } else {
                              setShowAddExperience(true);
                            }
                          }}
                          className={`py-1 px-4 rounded-lg text-sm transition border
                            ${
                              activeSection === "education"
                                ? "border-blue-400/40 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400/60"
                                : "border-green-400/40 text-green-400 hover:bg-green-500/10 hover:border-green-400/60"
                            }
                          `}
                        >
                          {activeSection === "education" ? "Add Education" : "Add Experience"}
                      </button>
                </div>
            </div>

            {/* Table */}
            {activeSection === "education" ? (
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase text-white/40">
                      <tr>
                      <th className="px-6 py-4">Institution</th>
                      <th className="px-6 py-4">Degree</th>
                      <th className="px-6 py-4">Period</th>
                      <th className="px-6 py-4">GPA</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Skills</th>
                      <th className="px-6 py-4 text-center">Action</th>
                      </tr>
                  </thead>

                  <tbody>
                      {data.map((edu) => (
                      <tr
                          key={edu.id}
                          className="border-t border-white/10 hover:bg-white/5 transition"
                      >
                          <td className="px-6 py-4 text-white font-medium">
                          {edu.institution}
                          <div className="text-xs text-white/40">{edu.country}</div>
                          </td>

                          <td className="px-6 py-4">
                          <div className="text-white">{edu.degree}</div>
                          <div className="text-xs text-white/40">{edu.field}</div>
                          </td>

                          <td className="px-6 py-4 text-white/80">{edu.date}</td>

                          <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 text-xs rounded-full bg-blue-500/10 border border-blue-400/60 text-blue-300">
                              {edu.GPA}
                          </span>
                          </td>

                          <td className="px-6 py-4 max-w-[300px]">
                          <p
                              title={edu.description}
                              className="text-white/80 line-clamp-2 cursor-help"
                          >
                              {edu.description}
                          </p>
                          </td>

                          <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                              {edu.skills.slice(0, 3).map((skill) => (
                              <span
                                  key={skill}
                                  className="px-2 py-1 text-xs rounded bg-white/10 text-white/70"
                              >
                                  {skill}
                              </span>
                              ))}
                              {edu.skills.length > 3 && (
                              <span className="px-2 py-1 text-xs rounded bg-white/5 text-white/40">
                                  +{edu.skills.length - 3}
                              </span>
                              )}
                          </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                              <button 
                              onClick={() => {
                                  setSelectedEducation(edu);
                                  setForm({
                                  institution: edu.institution,
                                  degree: edu.degree,
                                  field: edu.field,
                                  country: edu.country,
                                  date: edu.date,
                                  GPA: edu.GPA,
                                  GPA_dec: edu.GPA_dec,
                                  description: edu.description,
                                  icon : edu.icon,
                                  skills: edu.skills.join(", "),
                                  });
                                  setShowUpdateEducation(true);
                              }}
                              className="py-1 px-4 border border-blue-400/30 rounded-lg text-blue-400 text-sm hover:bg-blue-500/10 hover:border-blue-400/60 hover:text-blue-300 transition">
                              Edit
                              </button>
                              <button
                              onClick={() => handleDelete(edu.id)}
                              className="py-1 px-4 border border-red-400/30 rounded-lg text-red-400 text-sm
                                          hover:bg-red-500/10 hover:border-red-400/60 hover:text-red-300 transition"
                              >
                              Delete
                              </button>

                          </div>
                          </td>
                      </tr>
                      ))}
                  </tbody>
                  </table>
              </div>
            ):(
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase text-white/40">
                      <tr>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Start Date</th>
                      <th className="px-6 py-4">End Date</th>
                      <th className="px-6 py-4"> description</th>
                      <th className="px-6 py-4"> technologies</th>
                      <th className="px-6 py-4 text-center">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {dataExp.map((Exp) => (
                      <tr
                          key={Exp.id}
                          className="border-t border-white/10 hover:bg-white/5 transition"
                      >
                        <td className="px-6 py-4 text-white font-medium">
                            {Exp.role}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                          {Exp.company}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                          {Exp.location}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                          {Exp.startDate}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                          {Exp.endDate}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                          {Exp.description[0]}
                          {Exp.description.length > 1 && (
                            <span className="text-white/40"> …</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                              {Exp.technologies.slice(0, 3).map((techno) => (
                              <span
                                  key={techno}
                                  className="px-2 py-1 text-xs rounded bg-white/10 text-white/70"
                              >
                                  {techno}
                              </span>
                              ))}
                              {Exp.technologies.length > 3 && (
                              <span className="px-2 py-1 text-xs rounded bg-white/5 text-white/40">
                                  +{Exp.technologies.length - 3}
                              </span>
                              )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                              <button 
                              onClick={() => {
                                setSelectedExperience(Exp);
                                setFormExperience({
                                  role: Exp.role,
                                  company: Exp.company,
                                  location: Exp.location,
                                  startDate: Exp.startDate,
                                  endDate: Exp.endDate,
                                  description: Exp.description.join("\n"),
                                  technologies: Exp.technologies.join(", "),
                                });
                                setShowUpdateExperience(true);
                              }}
                              className="py-1 px-4 border border-blue-400/30 rounded-lg text-blue-400 text-sm hover:bg-blue-500/10 hover:border-blue-400/60 hover:text-blue-300 transition">
                              Edit
                              </button>
                              <button
                              onClick={() => handleDeleteExperience(Exp.id)}
                              className="py-1 px-4 border border-red-400/30 rounded-lg text-red-400 text-sm
                                          hover:bg-red-500/10 hover:border-red-400/60 hover:text-red-300 transition"
                              >
                              Delete
                              </button>
                          </div>
                        </td>
                      </tr>
                      ))}
                  </tbody>
                  </table>
              </div>
            )}
            {/* Add Education*/}
            {showAddEducation && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 py-52">
                <div className=" p-6 rounded-xl w-full max-w-md mx-4 border border-white/10 shadow-xl
                                max-h-[70vh] overflow-hidden flex flex-col">

                
                <h3 className="text-lg font-semibold mb-4 text-white">
                    Add Education
                </h3>

                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                    setShowAddEducation(false);
                    }}
                    className="flex-1 overflow-y-auto no-scrollbar  space-y-4"
                >
                    {/* Institution */}
                    <div>
                        <label className="text-sm text-white/60">Institution</label>
                        <input
                            type="text"
                            name="institution"
                            onChange={handleEducationChange}
                            value = {form.institution}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                            placeholder="Universitas Pamulang"
                            required
                        />
                    </div>

                    {/* Degree */}
                    <div>
                        <label className="text-sm text-white/60">Degree</label>
                        <input
                            type="text"
                            name="degree"
                            onChange={handleEducationChange}
                            value = {form.degree}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                            placeholder="Bachelor's Degree"
                        />
                    </div>

                    {/* Field / Major */}
                    <div>
                        <label className="text-sm text-white/60">Field of Study</label>
                        <input
                            type="text"
                            name="field"
                            onChange={handleEducationChange}
                            value = {form.field}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                            placeholder="Informatics Engineering"
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="text-sm text-white/60">Country</label>
                        <input
                            type="text"
                            name="country"
                            onChange={handleEducationChange}
                            value = {form.country}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                            placeholder="Indonesia"
                        />
                    </div>

                    {/* Study Period */}
                    <div>
                    <label className="text-sm text-white/60">Study Period</label>
                        <input
                            type="text"
                            name="date"
                            value = {form.date}
                            onChange={handleEducationChange}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                            placeholder="Sep 2023 – Present"
                        />
                    </div>

                    {/* GPA Description */}
                    <div>
                    <label className="text-sm text-white/60">GPA Description</label>
                        <input
                            type="text"
                            name="GPA_dec"
                            value = {form.GPA_dec}
                            onChange={handleEducationChange}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                            placeholder="Current GPA"
                        />
                    </div>

                    {/* GPA Value */}
                    <div>
                        <label className="text-sm text-white/60">GPA</label>
                        <input
                            type="text"
                            name="GPA"
                            value = {form.GPA}
                            onChange={handleEducationChange}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                            placeholder="3.77 / 4.00"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm text-white/60">Description</label>
                        <textarea
                            name="description"
                            value = {form.description}
                            onChange={handleEducationChange}
                            rows={4}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60 resize-none no-scrollbar"
                            placeholder="Active student majoring in Informatics Engineering..."
                        />
                    </div>
                    {/* icon */}
                    <div>
                    <label className="text-sm text-white/60">Icon</label>
                    <select
                    name="icon"
                    value={form.icon}
                    onChange={handleEducationChange}
                    className="
                        w-full mt-1 px-3 py-2 rounded-lg
                        bg-zinc-900 text-white
                        border border-white/10
                        focus:outline-none focus:border-blue-400/60
                    "
                    >
                        <option value="" className="bg-zinc-900 text-white">
                            Select icon
                        </option>
                        <option value="graduation" className="bg-zinc-900 text-white">
                            🎓 Graduation
                        </option>
                        <option value="code" className="bg-zinc-900 text-white">
                            💻 Code
                        </option>
                    </select>
                    </div>
                    {/* Skills */}
                    <div>
                        <label className="text-sm text-white/60">Skills</label>
                        <input
                            type="text"
                            name="skills"
                            onChange={handleEducationChange}
                            value={form.skills}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                            placeholder="React.js, UI/UX Design, Figma"
                        />
                        <p className="text-xs text-white/40 mt-1">
                            Separate skills with commas
                        </p>
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowAddEducation(false)}
                            className="py-2 px-4 border border-white/30 rounded-lg text-white text-sm hover:bg-white/10 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="py-2 px-4 border border-green-400/30 rounded-lg text-green-400 text-sm hover:bg-green-500/10 hover:border-green-400/60 hover:text-green-300 transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
                </div>
            </div>
            )}
            {/* Update Education */}
            {showUpdateEducation && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 py-52">
                    <div className=" p-6 rounded-xl w-full max-w-md mx-4 border border-white/10 shadow-xl
                                    max-h-[70vh] overflow-hidden flex flex-col">

                    
                    <h3 className="text-lg font-semibold mb-4 text-white">
                        Update Education
                    </h3>

                    <form
                        onSubmit={handleUpdate}
                        className="flex-1 overflow-y-auto no-scrollbar  space-y-4"
                    >
                        {/* Institution */}
                        <div>
                            <label className="text-sm text-white/60">Institution</label>
                            <input
                                type="text"
                                name="institution"
                                onChange={handleEducationChange}
                                value = {form.institution}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="Universitas Pamulang"
                                required
                            />
                        </div>

                        {/* Degree */}
                        <div>
                            <label className="text-sm text-white/60">Degree</label>
                            <input
                                type="text"
                                name="degree"
                                onChange={handleEducationChange}
                                value = {form.degree}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="Bachelor's Degree"
                            />
                        </div>

                        {/* Field / Major */}
                        <div>
                            <label className="text-sm text-white/60">Field of Study</label>
                            <input
                                type="text"
                                name="field"
                                onChange={handleEducationChange}
                                value = {form.field}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="Informatics Engineering"
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label className="text-sm text-white/60">Country</label>
                            <input
                                type="text"
                                name="country"
                                onChange={handleEducationChange}
                                value = {form.country}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="Indonesia"
                            />
                        </div>

                        {/* Study Period */}
                        <div>
                        <label className="text-sm text-white/60">Study Period</label>
                            <input
                                type="text"
                                name="date"
                                value = {form.date}
                                onChange={handleEducationChange}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="Sep 2023 – Present"
                            />
                        </div>

                        {/* GPA Description */}
                        <div>
                        <label className="text-sm text-white/60">GPA Description</label>
                            <input
                                type="text"
                                name="GPA_dec"
                                value = {form.GPA_dec}
                                onChange={handleEducationChange}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="Current GPA"
                            />
                        </div>

                        {/* GPA Value */}
                        <div>
                            <label className="text-sm text-white/60">GPA</label>
                            <input
                                type="text"
                                name="GPA"
                                value = {form.GPA}
                                onChange={handleEducationChange}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="3.77 / 4.00"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-sm text-white/60">Description</label>
                            <textarea
                                name="description"
                                value = {form.description}
                                onChange={handleEducationChange}
                                rows={4}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60 resize-none no-scrollbar"
                                placeholder="Active student majoring in Informatics Engineering..."
                            />
                        </div>
                        {/* icon */}
                        <div>
                            <label className="text-sm text-white/60">Icon</label>
                            <select
                            name="icon"
                            value={form.icon}
                            onChange={handleEducationChange}
                            className="
                                w-full mt-1 px-3 py-2 rounded-lg
                                bg-zinc-900 text-white
                                border border-white/10
                                focus:outline-none focus:border-blue-400/60
                            "
                            >
                                <option value="" className="bg-zinc-900 text-white">
                                    Select icon
                                </option>
                                <option value="graduation" className="bg-zinc-900 text-white">
                                    🎓 Graduation
                                </option>
                                <option value="code" className="bg-zinc-900 text-white">
                                    💻 Code
                                </option>
                            </select>
                        </div>
                        {/* Skills */}
                        <div>
                            <label className="text-sm text-white/60">Skills</label>
                            <input
                                type="text"
                                name="skills"
                                onChange={handleEducationChange}
                                value={form.skills}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="React.js, UI/UX Design, Figma"
                            />
                            <p className="text-xs text-white/40 mt-1">
                                Separate skills with commas
                            </p>
                        </div>
                        {/* Actions */}
                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowUpdateEducation(false);
                                    setSelectedEducation(null);
                                }}
                                className="py-2 px-4 border border-white/30 rounded-lg text-white text-sm hover:bg-white/10 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="py-2 px-4 border border-green-400/30 rounded-lg text-green-400 text-sm hover:bg-green-500/10 hover:border-green-400/60 hover:text-green-300 transition"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            )}
            {/* Add Experiece */}
            {showAddExperience && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 py-52">
                <div className=" p-6 rounded-xl w-full max-w-md mx-4 border border-white/10 shadow-xl
                                max-h-[70vh] overflow-hidden flex flex-col">

                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Add Experience
                  </h3>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmitExperience(e);
                      setShowAddExperience(false);
                    }}
                    className="flex-1 overflow-y-auto no-scrollbar space-y-4"
                  >
                    {/* Role */}
                    <div>
                      <label className="text-sm text-white/60">Role</label>
                      <input
                        type="text"
                        name="role"
                        value={formExperience.role}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="Frontend Developer"
                        required
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="text-sm text-white/60">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formExperience.company}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="LabShare"
                        required
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="text-sm text-white/60">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formExperience.location}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="Universitas Pamulang"
                      />
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="text-sm text-white/60">Start Date</label>
                      <input
                        type="text"
                        name="startDate"
                        value={formExperience.startDate}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="May 2025"
                      />
                    </div>

                    {/* End Date */}
                    <div>
                      <label className="text-sm text-white/60">End Date</label>
                      <input
                        type="text"
                        name="endDate"
                        value={formExperience.endDate}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="Oct 2025 / Present"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-sm text-white/60">Description</label>
                      <textarea
                        name="description"
                        value={formExperience.description}
                        onChange={handleExperienceChange}
                        rows={4}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60 resize-none"
                        placeholder="• Developed and maintained...
            • Implemented responsive UI..."
                      />
                      <p className="text-xs text-white/40 mt-1">
                        Use new line for bullet points
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <label className="text-sm text-white/60">Technologies</label>
                      <input
                        type="text"
                        name="technologies"
                        value={formExperience.technologies}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="React, TypeScript, Tailwind CSS"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAddExperience(false)}
                        className="py-2 px-4 border border-white/30 rounded-lg text-white text-sm hover:bg-white/10 transition"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="py-2 px-4 border border-green-400/30 rounded-lg text-green-400 text-sm hover:bg-green-500/10 hover:border-green-400/60 hover:text-green-300 transition"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {showUpdateExperience && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 py-52">
                <div className=" p-6 rounded-xl w-full max-w-md mx-4 border border-white/10 shadow-xl
                                max-h-[70vh] overflow-hidden flex flex-col">

                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Update Experience
                  </h3>

                  <form
                    onSubmit={handleUpdateExp}
                    className="flex-1 overflow-y-auto no-scrollbar space-y-4"
                  >
                    {/* Role */}
                    <div>
                      <label className="text-sm text-white/60">Role</label>
                      <input
                        type="text"
                        name="role"
                        value={formExperience.role}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="Frontend Developer"
                        required
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="text-sm text-white/60">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formExperience.company}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="LabShare"
                        required
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="text-sm text-white/60">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formExperience.location}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="Universitas Pamulang"
                      />
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="text-sm text-white/60">Start Date</label>
                      <input
                        type="text"
                        name="startDate"
                        value={formExperience.startDate}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="May 2025"
                      />
                    </div>

                    {/* End Date */}
                    <div>
                      <label className="text-sm text-white/60">End Date</label>
                      <input
                        type="text"
                        name="endDate"
                        value={formExperience.endDate}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="Oct 2025 / Present"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-sm text-white/60">Description</label>
                      <textarea
                        name="description"
                        value={formExperience.description}
                        onChange={handleExperienceChange}
                        rows={4}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60 resize-none"
                        placeholder="• Developed and maintained...
            • Implemented responsive UI..."
                      />
                      <p className="text-xs text-white/40 mt-1">
                        Use new line for bullet points
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <label className="text-sm text-white/60">Technologies</label>
                      <input
                        type="text"
                        name="technologies"
                        value={formExperience.technologies}
                        onChange={handleExperienceChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        placeholder="React, TypeScript, Tailwind CSS"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowUpdateExperience(false)}
                        className="py-2 px-4 border border-white/30 rounded-lg text-white text-sm hover:bg-white/10 transition"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="py-2 px-4 border border-green-400/30 rounded-lg text-green-400 text-sm hover:bg-green-500/10 hover:border-green-400/60 hover:text-green-300 transition"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
        </div>
    );
}
