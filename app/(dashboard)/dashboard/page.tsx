"use client";

import Loading from "@/app/(dashboard)/loading";
import { FaFolderOpen } from "react-icons/fa";
import { Pin, PinOff } from "lucide-react";
import { useEffect, useState } from "react";
import { confirmToast } from "@/components/UI/ConfirmToast";
import toast from "react-hot-toast";
import {
  addProject,
  deleteProject,
  getProject,
  ProjectPayload,
  TProject,
  updateProject,
  togglePinProject,
} from "@/libs/project";

const MAX_PIN = 3;

export default function ProjectPage() {
  const [data, setData] = useState<TProject[]>([]);
  const [loading, setLoading] = useState(true);

  // modal states
  const [showAddProject, setShowAddProject] = useState(false);
  const [showUpdateProject, setShowUpdateProject] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<TProject | null>(null);

  const [form, setForm] = useState<Omit<ProjectPayload, "tools"> & { tools: string }>({
    project: "",
    role: "",
    deskripsi: "",
    year: "",
    image: "",
    github: "",
    view: "",
    tools: "",
  });

  const emptyForm = { ...form };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProject();
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  // ---------- PIN LOGIC ----------
  const pinnedCount = data.filter((p) => p.isPinned).length;

  const handleTogglePin = async (project: TProject) => {
    if (!project.isPinned && pinnedCount >= MAX_PIN) {
      toast.error(`Maximum ${MAX_PIN} pinned projects`);
      return;
    }

    await togglePinProject(project.id, !project.isPinned);
    toast.success(project.isPinned ? "Unpinned" : "Pinned");

    const res = await getProject();
    setData(res);
  };

  // ---------- FORM ----------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ProjectPayload = {
      project: form.project,
      role: form.role,
      image: form.image,
      github: form.github,
      view: form.view,
      deskripsi: form.deskripsi,
      year: form.year,
      tools: form.tools.split(",").map((s) => s.trim()).filter(Boolean),
      isPinned: false,
    };

    await addProject(payload);
    setData(await getProject());
    toast.success("Project added");

    setShowAddProject(false);
    setForm(emptyForm);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const payload: Partial<ProjectPayload> = {
      project: form.project,
      role: form.role,
      image: form.image,
      github: form.github,
      view: form.view,
      deskripsi: form.deskripsi,
      year: form.year,
      tools: form.tools.split(",").map((s) => s.trim()).filter(Boolean),
    };

    await updateProject(selectedProject.id, payload);
    toast.success("Project updated");

    setShowUpdateProject(false);
    setSelectedProject(null);
    setData(await getProject());
  };

  const handleDelete = (id: string) => {
    confirmToast({
      title: "Delete Project",
      message: "This action cannot be undone.",
      confirmText: "Delete",
      variant: "danger",
      onConfirm: async () => {
        await deleteProject(id);
        setData((prev) => prev.filter((item) => item.id !== id));
        toast.success("Project deleted");
      },
    });
  };

  if (loading) return <Loading />;
    return (
        <div className="rounded-xl border border-white/10 bg-linear-to-b from-white/5 to-white/0 backdrop-blur-md shadow-lg">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between">
                <div className=" flex items-center gap-2">
                    <FaFolderOpen className="text-blue-400" />
                    <h2 className="text-lg font-semibold text-white">Project</h2>
                </div>
                <button 
                onClick={() => {
                setForm(emptyForm);
                setShowAddProject(true);
                }}
                className="py-1 px-4 border border-green-400/30 rounded-lg text-green-400 text-sm hover:bg-green-500/10 hover:border-green-400/60 hover:text-green-300 transition">
                Add Project
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase text-white/40">
                    <tr>
                    <th className="px-6 py-4">Project</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Year</th>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Tools</th>
                    <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((pro) => (
                    <tr
                        key={pro.id}
                        className="border-t border-white/10 hover:bg-white/5 transition"
                    >
                        <td className="px-6 py-4 text-white font-medium">
                        {pro.project}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 text-xs rounded-full bg-blue-500/10 border border-blue-400/60 text-blue-300">
                            {pro.role}
                        </span>
                        </td>

                        <td className="px-6 py-4 max-w-[300px]">
                        <p
                            title={pro.deskripsi}
                            className="text-white/80 line-clamp-2 cursor-help"
                        >
                            {pro.deskripsi}
                        </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 text-xs rounded-full bg-blue-500/10 border border-blue-400/60 text-blue-300">
                            {pro.year}
                        </span>
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                        {pro.image}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                                {pro.tools.slice(0, 3).map((tool) => (
                                <span
                                    key={tool}
                                    className="
                                    px-2 py-1 text-xs rounded
                                    bg-white/10 text-white/70
                                    border border-gray-500/20
                                    "
                                >
                                    {tool}
                                </span>
                                ))}

                                {pro.tools.length > 4 && (
                                <span className="px-2 py-1 text-xs rounded bg-white/10 text-white/70">
                                    +{pro.tools.length - 4}
                                </span>
                                )}
                            </div>
                        </td>
                        {/* PIN BUTTON */}
                        <td className="px-6 py-4">
                        <button
                            onClick={() => handleTogglePin(pro)}
                            className={`p-2 rounded-lg border transition
                            ${
                                pro.isPinned
                                ? "border-yellow-400/40 text-yellow-300 bg-yellow-500/10"
                                : "border-white/20 text-white/50 hover:bg-white/10"
                            }`}
                        >
                            {pro.isPinned ? <Pin size={16} /> : <PinOff size={16} />}
                        </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                            <button 
                            onClick={() => {
                                setSelectedProject(pro);
                                setForm({
                                project: pro.project,
                                role: pro.role,
                                deskripsi: pro.deskripsi,
                                year: pro.year,
                                image: pro.image,
                                view: pro.view,
                                github: pro.github,
                                tools: pro.tools.join(", "),
                                });
                                setShowUpdateProject(true);
                            }}
                            className="py-1 px-4 border border-blue-400/30 rounded-lg text-blue-400 text-sm hover:bg-blue-500/10 hover:border-blue-400/60 hover:text-blue-300 transition">
                            Edit
                            </button>
                            <button
                            onClick={() => handleDelete(pro.id)}
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
            {/* Add Education*/}
            {showAddProject && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 py-52">
                <div className=" p-6 rounded-xl w-full max-w-md mx-4 border border-white/10 shadow-xl
                                max-h-[70vh] overflow-hidden flex flex-col">

                
                <h3 className="text-lg font-semibold mb-4 text-white">
                    Add Project
                </h3>

                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                    setShowAddProject(false);
                    }}
                    className="flex-1 overflow-y-auto no-scrollbar  space-y-4"
                >
                    {/* Project */}
                    <div>
                        <label className="text-sm text-white/60">Project</label>
                        <input
                            type="text"
                            name="project"
                            onChange={handleChange}
                            value = {form.project}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="text-sm text-white/60">Role</label>
                        <input
                            type="text"
                            name="role"
                            onChange={handleChange}
                            value = {form.role}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm text-white/60">Description</label>
                        <textarea
                            name="deskripsi"
                            onChange={handleChange}
                            value = {form.deskripsi}
                            rows={4}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60 resize-none no-scrollbar"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-white/60">Year</label>
                        <input
                            type="text"
                            name="year"
                            onChange={handleChange}
                            value = {form.year}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        />
                    </div>

                    {/* Github*/}
                    <div>
                        <label className="text-sm text-white/60">Github Url</label>
                        <input
                            type="text"
                            name="github"
                            onChange={handleChange}
                            value = {form.github}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        />
                    </div>

                    {/* Image */}
                    <div>
                    <label className="text-sm text-white/60">Image</label>
                        <input
                            type="text"
                            name="image"
                            value = {form.image}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        />
                    </div>

                    {/* View url */}
                    <div>
                    <label className="text-sm text-white/60">View Url</label>
                        <input
                            type="text"
                            name="view"
                            onChange={handleChange}
                            value = {form.view}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        />
                    </div>
                    {/* Tools */}
                    <div>
                        <label className="text-sm text-white/60">Tools</label>
                        <input
                            type="text"
                            name="tools"
                            onChange={handleChange}
                            value={form.tools}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        />
                        <p className="text-xs text-white/40 mt-1">
                            Separate Tools with commas
                        </p>
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowAddProject(false)}
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
            {/* Update Project */}
            {showUpdateProject && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 py-52">
                    <div className=" p-6 rounded-xl w-full max-w-md mx-4 border border-white/10 shadow-xl
                                    max-h-[70vh] overflow-hidden flex flex-col">

                    
                    <h3 className="text-lg font-semibold mb-4 text-white">
                        Update Project
                    </h3>

                    <form
                        onSubmit={handleUpdate}
                        className="flex-1 overflow-y-auto no-scrollbar  space-y-4"
                    >
                    {/* Project */}
                        <div>
                            <label className="text-sm text-white/60">Project</label>
                            <input
                                type="text"
                                name="project"
                                onChange={handleChange}
                                value = {form.project}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="Universitas Pamulang"
                                required
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="text-sm text-white/60">Role</label>
                            <input
                                type="text"
                                name="role"
                                onChange={handleChange}
                                value = {form.role}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="Bachelor's Degree"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-sm text-white/60">Description</label>
                            <textarea
                                name="deskripsi"
                                value = {form.deskripsi}
                                onChange={handleChange}
                                rows={4}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60 resize-none no-scrollbar"
                                placeholder="Active student majoring in Informatics Engineering..."
                            />
                        </div>
                        <div>
                        <label className="text-sm text-white/60">Year</label>
                        <input
                            type="text"
                            name="year"
                            onChange={handleChange}
                            value = {form.year}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        />
                    </div>

                        {/* Github*/}
                        <div>
                            <label className="text-sm text-white/60">Github Url</label>
                            <input
                                type="text"
                                name="github"
                                onChange={handleChange}
                                value = {form.github}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="Indonesia"
                            />
                        </div>

                        {/* Image */}
                        <div>
                        <label className="text-sm text-white/60">Image</label>
                            <input
                                type="text"
                                name="image"
                                value = {form.image}
                                onChange={handleChange}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="Sep 2023 – Present"
                            />
                        </div>

                        {/* View url */}
                        <div>
                        <label className="text-sm text-white/60">View Url</label>
                            <input
                                type="text"
                                name="view"
                                value = {form.view}
                                onChange={handleChange}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="Current GPA"
                            />
                        </div>
                        {/* Tools */}
                        <div>
                            <label className="text-sm text-white/60">Tools</label>
                            <input
                                type="text"
                                name="tools"
                                onChange={handleChange}
                                value={form.tools}
                                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                                placeholder="React.js, UI/UX Design, Figma"
                            />
                            <p className="text-xs text-white/40 mt-1">
                                Separate Tools with commas
                            </p>
                        </div>
                        {/* Actions */}
                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowUpdateProject(false);
                                    setSelectedProject(null);
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

        </div>
    );
}
