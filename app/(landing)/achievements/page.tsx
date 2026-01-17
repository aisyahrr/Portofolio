"use client";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { useEffect, useState} from "react";

// data
import { getCertificates } from "@/libs/achievements";
import type { TCertificate } from "@/libs/achievements";

const INITIAL_VISIBLE = 12;
export default function Certificates() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [data, setData] = useState<TCertificate[]>([]);
    const [showAll, setShowAll] = useState(false);
    const visibleProjects = showAll ? data : data.slice(0, INITIAL_VISIBLE);
    useEffect(() => {
        async function fetchData() {
            const res = await getCertificates();
            setData(res as TCertificate[]);
        }
        fetchData();
    }, []);
    
    return (
        <div className="space-y-6 text-(--color-text)">
        {/* Header */}
        <div className="border-b border-(--color-border) pb-5">
            <h1 className="text-2xl font-bold">Achievements</h1>
            <p className="text-(--color-text-secondary) mt-1">
            Milestones, certifications, and accomplishments that reflect my growth.
            </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleProjects.map((item) => (
            <div
                key={item.id}
                onClick={() => {
                    if (window.innerWidth < 768) {
                    setActiveId(activeId === item.id ? null : item.id);
                    }
                }}
                className="
                group relative
                rounded-2xl overflow-hidden
                border border-white/10
                hover:backdrop-blur-2xl shadow-lg
                transition-all duration-300 ease-out
                hover:shadow-[
                inset_0_1px_0_var(--glow-inner),
                0_10px_30px_rgba(0,0,0,0.5),
                0_0_8px_var(--glow-primary),
                0_0_0_1px_var(--color-border-card)
                ]
                "
            >
             {/* Image */}
            <div className="relative h-45 bg-(--color-bg-hover)">
                <Image
                    src={`/Sertifikat/${item.image}`}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-2"
                />
                <div className="
                    absolute top-0 left-0
                    rounded-tl-2xl rounded-br-xl
                    px-3 py-1 text-xs font-semibold
                    bg-sky-500 backdrop-blur
                    text-white
                    ">
                    {item.type}
                </div>
                {/* Hover View */}
                <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`
                    absolute inset-0
                    flex items-center justify-center
                    bg-black/40 backdrop-blur-sm
                    opacity-0 rounded-t-2xl
                    transition-all duration-300
                    group-hover:opacity-100
                        ${activeId === item.id ? 'opacity-100 pointer-events-auto' : ''}
                    `}
                >
                    <span className="flex items-center gap-2 text-white font-semibold">
                    View Certificate <FiArrowUpRight />
                    </span>
                </a>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                <h3 className="font-semibold text-(--color-text) leading-snug min-h-12 line-clamp-2">
                    {item.title}
                </h3>

                <p className="text-sm text-gray-400">
                    {item.issuer}
                </p>

                <p className="text-sm text-gray-500">
                    Issued on <span className="text-(--color-text)">{item.issuedAt}</span>
                </p>
                </div>
            </div>
            ))}
        </div>
        {data.length > INITIAL_VISIBLE && (
            <div className="flex justify-end pt-4">
            <button
                onClick={() => setShowAll(!showAll)}
                className="
                text-base font-semibold
                text-(--color-text)
                hover:text-(--color-text)/50
                transition-all
                "
            >
                {showAll ? "Show Less" : "Show More"}
            </button>
            </div>
        )}
        </div>
    );
}
