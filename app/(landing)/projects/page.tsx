"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// icons
import { FiArrowUpRight } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

// data
import { getProject } from "@/libs/project";
import type { TProject } from "@/libs/project";

const INITIAL_VISIBLE = 10;

export default function ProjectsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [data, setData] = useState<TProject[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await getProject();
      setData(res as TProject[]);
    }
    fetchData();
  }, []);

  const sortedProjects = [...data].sort((a: TProject, b: TProject) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    if (a.createdAt && b.createdAt) {
      return (
        b.createdAt.toDate().getTime() -
        a.createdAt.toDate().getTime()
      );
    }

    return parseInt(b.year) - parseInt(a.year);
  });

  const visibleProjects = showAll
    ? sortedProjects
    : sortedProjects.slice(0, INITIAL_VISIBLE);

  return (
    <div className="space-y-6.25 text-(--color-text)">
      {/* Header */}
      <div className="border-b border-(--color-border) pb-5 space-y-2">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-(--color-text-secondary) text-base font-medium">
          Transforming Concepts into Digital Experiences.
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {visibleProjects.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (window.innerWidth < 768) {
                setActiveId(activeId === item.id ? null : item.id);
              }
            }}
            className="
              group relative w-full
              border border-white/10
              rounded-xl p-2 shadow-lg
              transition-all duration-300 ease-out
              md:hover:-translate-y-1
              md:hover:border-(--color-border-card)
              md:hover:shadow-[
                inset_0_1px_0_var(--glow-inner),
                0_10px_30px_rgba(0,0,0,0.5),
                0_0_8px_var(--glow-primary),
                0_0_0_1px_var(--color-border-card)
              ]
            "
          >
            {/* Image */}
            <div className="relative w-full md:h-62.5 h-50 rounded-xl overflow-hidden bg-[#C7B7A3]">
              <Image
                src={`/Project/${item.image}`}
                alt={item.project}
                width={600}
                height={400}
                loading="eager"
                className="object-cover h-full w-full "
              />

              {/* Role + Year Badge */}
              <div className="
                absolute left-0 top-0
                flex items-center gap-2
                px-3 py-1
                rounded-tl-xl rounded-br-xl
                bg-white/70
                text-black
                text-sm font-extrabold
                shadow-lg
              ">
                <span>{item.role}</span>

                <span
                  className="
                    h-4 px-2
                    flex items-center justify-center
                    text-[10px]
                    bg-black/40
                    text-white/90
                    rounded-full
                    translate-y-px
                  "
                >
                  {item.year}
                </span>
              </div>
              {/* Hover View */}
              <a
                href={item.view}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`
                  absolute inset-0 z-10
                  flex items-center justify-center
                  bg-black/50 backdrop-blur-sm
                  opacity-0 pointer-events-none rounded-xl
                  transition-all duration-300
                  md:group-hover:opacity-100
                  md:group-hover:pointer-events-auto

                  ${activeId === item.id ? 'opacity-100 pointer-events-auto' : ''}
                `}
              >
                <span className="flex items-center gap-2 text-white font-semibold text-lg">
                  View Project <FiArrowUpRight />
                </span>
              </a>
            </div>

            {/* GitHub Button */}
            {item.github && item.github !== "-" && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="
                  absolute right-3 top-3
                  h-10 w-10
                  bg-white/60 rounded-full shadow-lg
                  flex items-center justify-center
                  text-black text-xl
                  transition-transform duration-300
                  hover:scale-110
                "
              >
                <FaGithub />
              </a>
            )}

            {/* Content */}
            <div className="px-2 pt-3 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {item.project}
                </h3>
                <p className="text-sm text-(--color-text-secondary) line-clamp-2">
                  {item.deskripsi}
                </p>
              </div>

              {/* Tools */}
              <div className="flex gap-2 flex-wrap">
                {item.tools?.map((tool, idx) => (
                  <span
                    key={idx}
                    className="
                      capitalize px-2 py-1 text-xs
                      rounded bg-white/10
                      text-(--color-text)
                      border border-(--color-border)
                      font-semibold
                    "
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More */}
      {data.length > INITIAL_VISIBLE && (
        <div className="flex justify-end pt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="
              text-base font-semibold
              text-(--color-text)
              hover:text-(--color-text)/60
              transition-all
            "
          >
            {showAll ? "Show Less" : "View All Projects"}
          </button>
        </div>
      )}
    </div>
  );
}
