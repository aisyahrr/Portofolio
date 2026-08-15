"use client";
// icons + fonts
import { educationIcons } from "@/components/UI/EducationIcon";
import { useEffect, useState} from "react";
import { getEducations} from "@/libs/education";
import type { Education } from "@/libs/education";
import { FaDownload } from "react-icons/fa6";
import { Experience, getExperience } from "@/libs/experience";

export default function AboutPage() {
    const [data, setData] = useState<Education[]>([]);
    const [dataExp, setDataExp] = useState<Experience[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        const [edu, exp] = await Promise.all([
            getEducations(),
            getExperience(),
        ]);
    
        setData(edu);
        setDataExp(exp);
        };
    
        fetchData();
    },[]);
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/PDF/AISYAHRAHMAWATI-CV.pdf'; 
        link.download = 'Curriculum.pdf'; 
        link.click();
    };
    return(
        <div className="space-y-6.25 text-(--color-text)">
            {/* Header */}
            <div className="border-b border-gray-400/50 pb-5">
                <div className="border-b border-dashed border-(--color-border) pb-5 space-y-2">
                        <h1 className="text-2xl font-bold">About</h1>
                        <div className="text-(--color-text-secondary) font-medium flex items-center gap-3">
                            <p className="text-lg">From Ideas to Interfaces</p>
                        </div>
                </div>
                <p className="font-medium text-base pt-3 text-justify ">
                    Hi, I’m Aisyah Rahmawati, an Informatics Engineering student at Universitas Pamulang with a passion for Frontend Development and creating intuitive, user-centered digital experiences.
                </p>
                <p className="font-medium text-base pt-3 text-justify ">
                    I enjoy turning ideas into responsive and engaging websites using technologies such as TypeScript, JavaScript, Laravel, Tailwind CSS, and Bootstrap. For me, web development is not just about writing code—it’s about understanding users, creating intuitive interfaces, and making every interaction feel simple and meaningful.
                </p>
                <p className= "font-medium text-base pt-3 text-justify ">
                    I’m always excited to learn new technologies, explore better ways to build digital products, and grow through every project I work on. I also value collaboration, communication, and continuous improvement, because I believe great products are built through both technical skills and teamwork.
                </p>
                <p className="font-medium text-base pt-3 text-justify">
                    I’m currently looking for opportunities to learn, collaborate, and create impactful digital experiences while continuing to grow as a Frontend Developer.
                </p>
            </div>
            {/* Education section */}
            <section className="border-b border-gray-400/50 pb-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">
                        Education
                        </h2>
                        <p className="text-base text-(--color-heading)">My educational journey.</p>
                    </div>
                    <button onClick={handleDownload} className="flex items-center gap-4 bg-transparent backdrop-blur-2xl p-3 rounded-lg shadow-md border border-[#213555] hover:scale-105 hover:cursor-pointer hover:backdrop-blur-2xl transition font-medium">
                        <FaDownload className="text-base"/> Download CV
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {data.map((edu) =>{
                        const Icon = educationIcons[edu.icon];
                        return (
                        <div key={edu.id} className="space-y-3 mt-4 backdrop-blur-md border border-(--color-border-card) hover:shadow-[inset_0_4px_10px_var(--glow-inner),0_4px_25px_var(--glow-primary)] p-5 rounded-lg hover:-translate-y-1 hover:cursor-pointer transition">
                            <div className="flex items-center gap-3">
                                <div className="inline-block p-3 rounded-xl bg-black/10">
                                    {Icon && <Icon className="text-blue-500 text-xl" />}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl">{edu.institution}</h3>
                                    <p className="text-sm">{edu.degree} - {edu.field}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] md:text-sm text-(--color-text) font-bold inline-block px-3 rounded-2xl border-2 border-[#155dfc]">{edu.GPA_dec} : {edu.GPA}</p>
                                <p className="text-[10px] md:text-sm  text-(--color-text) font-bold inline-block px-3 rounded-2xl border border-(--color-border)">{edu.date}</p>
                            </div>
                            <p className="text-sm ">
                                {edu.description}
                            </p>
                            <hr className="text-(--color-border)/20" />
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                                {edu.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 text-sm rounded-lg bg-white/10 border border-(--color-border) text-(--color-text)"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>  
                    )})}
                </div>
            </section>
            {/* ExperienceSection */}
            <section className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-semibold">Experience</h2>
                <p className="text-base text-(--color-heading)">
                Hands-on professional experience.
                </p>
            </div>

            {/* Timeline */}
            <div className="relative md:pl-6 space-y-8 md:border-l md:border-(--color-border-card)">
                {dataExp.map((exp) => (
                <div key={exp.id} className="relative">
                    <span className="hidden md:block absolute -left-7.5 top-2 h-3 w-3 rounded-full bg-(--color-border-card)" />

                    <div className="rounded-xl border border-(--color-border-card) p-5">
                    <h3 className="font-semibold text-lg">
                        {exp.role}
                    </h3>

                    <p className="text-sm text-(--color-text)/80">
                        {exp.company} — {exp.location} • {exp.startDate}
                        {exp.endDate && ` – ${exp.endDate}`}
                    </p>
                    
                    <ul className="mt-3 space-y-2 text-sm text-(--color-text) list-disc list-inside">
                        {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                        ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-sm rounded-lg bg-white/10 border border-(--color-border) text-(--color-text)"
                        >
                            {tech}
                        </span>
                        ))}
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </section>
        </div>
    );
}


