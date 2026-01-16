"use client";

import Loading from "@/app/(dashboard)/loading";
import { FaFolderOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { confirmToast } from "@/components/UI/ConfirmToast";
import toast from "react-hot-toast";
import {
  addCertificate,
  deleteCertificate,
  getCertificates,
  CertificatePayload,
  TCertificate,
  updateCertificate,
} from "@/libs/achievements";

export default function CertificatePage() {
    const [data, setData] = useState<TCertificate[]>([]);
    const [loading, setLoading] = useState(true);

    // modal states
    const [showAddCertificate, setShowAddCertificate] = useState(false);
    const [showUpdateCertificate, setShowUpdateCertificate] = useState(false);
    const [selectedCertificate, setSelectedCertificate] =
        useState<TCertificate | null>(null);
    const defaultForm: CertificatePayload = {
    title: "",
    issuer: "",
    image: "",
    credentialUrl: "",
    type: "course",
    issuedAt: "",
    isPinned: false,
    };

    const [form, setForm] = useState<CertificatePayload>(defaultForm);


  useEffect(() => {
    const fetchData = async () => {
      const res = await getCertificates();
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  // ---------- FORM ----------
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
        ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CertificatePayload = {
      title: form.title,
      issuer: form.issuer,
      image: form.image,
      issuedAt: form.issuedAt,
      type: form.type,
      credentialUrl: form.credentialUrl,
      isPinned: form.isPinned,
    };

    await addCertificate(payload);
    setData(await getCertificates());
    toast.success("Project added");

    setShowAddCertificate(false);
    setForm(defaultForm);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCertificate) return;

    const payload: Partial<CertificatePayload> = {
      title: form.title,
      issuer: form.issuer,
      image: form.image,
      issuedAt: form.issuedAt,
      type: form.type,
      credentialUrl: form.credentialUrl,
      isPinned: form.isPinned,
    };

    await updateCertificate(selectedCertificate.id, payload);
    toast.success("Certificate updated");

    setShowUpdateCertificate(false);
    setSelectedCertificate(null);
    setData(await getCertificates());
  };

  const handleDelete = (id: string) => {
    confirmToast({
      title: "Delete Certificate",
      message: "This action cannot be undone.",
      confirmText: "Delete",
      variant: "danger",
      onConfirm: async () => {
        await deleteCertificate(id);
        setData((prev) => prev.filter((item) => item.id !== id));
        toast.success("Certificate deleted");
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
                    <h2 className="text-lg font-semibold text-white">Certificate</h2>
                </div>
                <button 
                onClick={() => {
                setForm(defaultForm);
                setShowAddCertificate(true);
                }}
                className="py-1 px-4 border border-green-400/30 rounded-lg text-green-400 text-sm hover:bg-green-500/10 hover:border-green-400/60 hover:text-green-300 transition">
                Add Certificate
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase text-white/40">
                <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Issuer</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Issued</th>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4 text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                    {data.map((cert) => (
                    <tr key={cert.id} className="border-t border-white/10">
                        <td className="px-6 py-4 font-medium">{cert.title}</td>
                        <td className="px-6 py-4 text-white/70">{cert.issuer}</td>

                        {/* Type Badge */}
                        <td className="px-6 py-4">
                            <span className="rounded-full px-3 py-1 text-xs bg-indigo-500/20 text-indigo-300">
                            {cert.type}
                            </span>
                        </td>

                        <td className="px-6 py-4">{cert.issuedAt}</td>

                        {/* Image */}
                        <td className="px-6 py-4">
                            {cert.image}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                            <button 
                            onClick={() => {
                                setSelectedCertificate(cert);
                                setForm({
                                title: cert.title,
                                issuer: cert.issuer,
                                image: cert.image,
                                issuedAt: cert.issuedAt,
                                type: cert.type,
                                credentialUrl: cert.credentialUrl,
                                isPinned: cert.isPinned,
                                });
                                setShowUpdateCertificate(true);
                            }}
                            className="py-1 px-4 border border-blue-400/30 rounded-lg text-blue-400 text-sm hover:bg-blue-500/10 hover:border-blue-400/60 hover:text-blue-300 transition">
                            Edit
                            </button>
                            <button
                            onClick={() => handleDelete(cert.id)}
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
            {/* Add Certificate*/}
            {showAddCertificate && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 py-52">
                <div
                className="p-6 rounded-xl w-full max-w-md mx-4 border border-white/10 shadow-xl
                            max-h-[70vh] overflow-hidden flex flex-col"
                >
                <h3 className="text-lg font-semibold mb-4 text-white">
                    Add Certificate
                </h3>

                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                    setShowAddCertificate(false);
                    }}
                    className="flex-1 overflow-y-auto no-scrollbar space-y-4"
                >
                    {/* Title */}
                    <div>
                    <label className="text-sm text-white/60">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        required
                    />
                    </div>

                    {/* Issuer */}
                    <div>
                    <label className="text-sm text-white/60">Issuer</label>
                    <input
                        type="text"
                        name="issuer"
                        value={form.issuer}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        required
                    />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="text-sm text-white/60">Type</label>
                        <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg
                                    bg-white/5 border border-white/10
                                    text-white focus:outline-none focus:border-blue-400/60"
                        >
                            <option value="course" className="bg-slate-900 text-white">
                                Course
                            </option>
                            <option value="certification" className="bg-slate-900 text-white">
                                Certification
                            </option>
                            <option value="bootcamp" className="bg-slate-900 text-white">
                                Bootcamp
                            </option>
                            <option value="competition" className="bg-slate-900 text-white">
                                Competition
                            </option>
                            <option value="ShortClass" className="bg-slate-900 text-white">
                                Short Class
                            </option>
                            <option value="workshop" className="bg-slate-900 text-white">
                                Workshop
                            </option>
                        </select>
                    </div>

                    {/* Issued At */}
                    <div>
                    <label className="text-sm text-white/60">Issued At</label>
                    <input
                        type="text"
                        name="issuedAt"
                        value={form.issuedAt}
                        onChange={handleChange}
                        placeholder="Jan 2025 / 2025"
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                    />
                    </div>

                    {/* Image */}
                    <div>
                    <label className="text-sm text-white/60">Image</label>
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                    />
                    </div>

                    {/* Credential URL */}
                    <div>
                    <label className="text-sm text-white/60">Credential URL</label>
                    <input
                        type="text"
                        name="credentialUrl"
                        value={form.credentialUrl}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                    />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                    <button
                        type="button"
                        onClick={() => setShowAddCertificate(false)}
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
            {/* Update Certificate */}
            {showUpdateCertificate && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 py-52">
                <div
                className="p-6 rounded-xl w-full max-w-md mx-4 border border-white/10 shadow-xl
                            max-h-[70vh] overflow-hidden flex flex-col"
                >
                <h3 className="text-lg font-semibold mb-4 text-white">
                    Update Certificate
                </h3>

                <form
                    onSubmit={handleUpdate}
                    className="flex-1 overflow-y-auto no-scrollbar space-y-4"
                >
                    {/* Title */}
                    <div>
                    <label className="text-sm text-white/60">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        required
                    />
                    </div>

                    {/* Issuer */}
                    <div>
                    <label className="text-sm text-white/60">Issuer</label>
                    <input
                        type="text"
                        name="issuer"
                        value={form.issuer}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                        required
                    />
                    </div>

                    {/* Type */}
                    <div>
                    <label className="text-sm text-white/60">Type</label>
                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg
                                    bg-white/5 border border-white/10
                                    text-white focus:outline-none focus:border-blue-400/60"
                        >
                            <option value="course" className="bg-slate-900 text-white">
                                Course
                            </option>
                            <option value="certification" className="bg-slate-900 text-white">
                                Certification
                            </option>
                            <option value="bootcamp" className="bg-slate-900 text-white">
                                Bootcamp
                            </option>
                            <option value="competition" className="bg-slate-900 text-white">
                                Competition
                            </option>
                            <option value="ShortClass" className="bg-slate-900 text-white">
                                Short Class
                            </option>
                            <option value="workshop" className="bg-slate-900 text-white">
                                Workshop
                            </option>
                        </select>
                    </div>

                    {/* Issued At */}
                    <div>
                    <label className="text-sm text-white/60">Issued At</label>
                    <input
                        type="text"
                        name="issuedAt"
                        value={form.issuedAt}
                        onChange={handleChange}
                        placeholder="Jan 2025 / 2025"
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                    />
                    </div>

                    {/* Image */}
                    <div>
                    <label className="text-sm text-white/60">Image</label>
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                    />
                    </div>

                    {/* Credential URL */}
                    <div>
                    <label className="text-sm text-white/60">Credential URL</label>
                    <input
                        type="text"
                        name="credentialUrl"
                        value={form.credentialUrl}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60"
                    />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                    <button
                        type="button"
                        onClick={() => {
                        setShowUpdateCertificate(false);
                        setSelectedCertificate(null);
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
