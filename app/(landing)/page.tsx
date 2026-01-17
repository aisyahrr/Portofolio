
"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
// react + swiper + framer motion
import { useState,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import CountUp from "@/components/UI/CountUp";
import GithubContributionCalendar from "@/components/UI/GithubContribution";

// icon + font
import { FaCode } from "react-icons/fa";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { User, FolderKanban, Award } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import {HiOutlineMail} from "react-icons/hi";
// data
import {techStack, tools, platforms  } from "@/data/data"; 
import { getCertificates } from "@/libs/achievements";
import { TCertificate } from "@/libs/achievements";
import { getProject } from "@/libs/project";
import type { TProject } from "@/libs/project";

interface Contact{
  url: string;
  icon: React.ReactElement;
}
const contacts: Contact[] = [
  {url: "https://www.instagram.com/aisyh.rr/",icon: <FaInstagram size={20} />,},
  {url: "https://github.com/aisyahrr",icon: <FaGithub size={20} />,},
  {url: "https://www.linkedin.com/in/aisyhrr/",icon: <FaLinkedin size={20} />,},
]

interface Stats {
  totalRepos: number;
  totalContributions: number;
}
function SkillBubble({ icon, title }: { icon: string; title: string }) {
  return (
    <div
      title={title}
      className="relative h-14 w-14 rounded-full
      shadow-[inset_0_4px_10px_rgba(255,255,255,0.6),0_2px_10px_var(--glow-primary)]
      backdrop-blur-md md:shadow-[inset_0_4px_10px_rgba(255,255,255,0.6),0_4px_20px_var(--glow-primary)]
      hover:scale-110 transition animate-bounce-slow "
    >
      <div className="absolute top-1 left-2 h-4 w-4 bg-white/50 rounded-full blur-[2px]" />
      <div className="flex h-full w-full items-center justify-center">
        <Image src={icon} alt={title} width={26} height={26} sizes="100vw" />
      </div>
    </div>
  );
}


export default function Page(){
  // const [certificates] = useState<TCertificate[]>([]);
  const [order, setOrder] = useState<TCertificate[]>([]);
  const [data, setData] = useState<TProject[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const router = useRouter();

  const bringToFront = (id: string) => {
    setOrder((prev) => {
      const clicked = prev.find((c) => c.id === id);
      if (!clicked) return prev;

      const rest = prev.filter((c) => c.id !== id);
      return [clicked, ...rest];
    });
  };

  useEffect(() => {
    fetch("/api/github-stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const [projectRes, certificateRes] = await Promise.all([
        getProject(),
        getCertificates(),
      ]);

      setData(projectRes);
      setOrder(certificateRes);
    }

    fetchData();
  }, []);


  const years = new Date().getFullYear() - 2024;
  return (
    <div className="space-y-6.25 text-(--text) overflow-hidden">
      {/* Header */}
      <section
        className="border-b border-gray-400/50 pb-6"
      >
        <div className="space-y-2">
            <h1 className="text-2xl font-bold">Hi! I’m Aisyah Rahmawati</h1>

            <div className="text-(--color-text-secondary) font-medium flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-(--color-text-secondary)" />
              <p className="text-base">
                Based in Depok, Indonesia <span className="text-sm">ID</span>
              </p>
            </div>
        </div>

        <p className=" text-base pt-4 text-justify">
          A Web Development and UI/UX Designer who is studying at Pamulang
          University. I have a passion for designing and developing websites
          that are not only functional but also provide an optimal user
          experience. With expertise in HTML5, CSS, JavaScript, PHP, and
          frameworks such as React.js and Tailwind CSS, I focus on developing
          responsive and engaging interfaces. In addition, I also have an
          understanding of UX Research, Wireframing, and Prototyping using tools
          like Figma.
        </p>
      </section>
      <section className="border-b border-gray-400/50 pb-6">
        <h2 className="text-xl font-semibold flex items-center gap-3">
          <FaGithub /> GitHub Contributions
        </h2>
        <p className="text-base text-(--color-heading) mb-6">
          My GitHub activity over the past year.
        </p>
        <div className="space-y-4">
          <div className="overflow-x-auto overflow-y-hidden no-scrollbar">
          <GithubContributionCalendar/>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Less</span>
            <div className="w-3 h-3 bg-[#1f2933] rounded-sm" />
            <div className="w-3 h-3 bg-[#9be9a8] rounded-sm" />
            <div className="w-3 h-3 bg-[#40c463] rounded-sm" />
            <div className="w-3 h-3 bg-[#30a14e] rounded-sm" />
            <div className="w-3 h-3 bg-[#216e39] rounded-sm" />
            <span>More</span>
          </div>
          <div className="space-y-6 md:place-items-center">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="inline-block p-4 rounded-xl bg-(--color-secondary) backdrop-blur-lg space-y-2">
                <p className="text-3xl font-extrabold text-(--color-text)">
                  {stats && <CountUp value={Number(stats?.totalRepos ?? 0)} />}+
                </p>
                <p className="text-sm text-gray-500">Total Repositories</p>
              </div>

              <div className="inline-block p-4 rounded-xl bg-(--color-secondary) backdrop-blur-lg space-y-2">
                <p className="text-3xl font-extrabold text-(--color-text)">
                  {stats && <CountUp value={Number(stats?.totalContributions ?? 0)} />}
                </p>
                <p className="text-sm text-gray-500">
                  Contributions (Last Year)
                </p>
              </div>

              <div className="inline-block p-4 rounded-xl bg-(--color-secondary) backdrop-blur-lg space-y-2">
                <p className="text-3xl font-extrabold text-(--color-text)">
                  <CountUp value={years} />+
                </p>
                <p className="text-sm text-gray-500">Years Active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Section */}
      <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="border-b border-gray-400/50 pb-6"
        >
        <h2 className="text-xl font-semibold flex items-center gap-3">
          <FaCode /> Skills
        </h2>
        <p className="text-base text-(--color-heading) mb-6">
          My Professional Skill.
        </p>

        {/* Tech Stack */}
        <div 
        className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-(--color-heading)">
            Tech Stack
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-9 gap-2 place-items-center">
            {techStack.map((item) => (
              <SkillBubble key={item.title} {...item} />
            ))}
          </div>
        </div>

        {/* Tools */}
        <div 
        className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-(--color-heading)">
            Tools
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-9 gap-2 place-items-center">
            
            {tools.map((item) => (
              <SkillBubble key={item.title} {...item} />
            ))}
          </div>
        </div>

        {/* Platform */}
        <div 
        >
          <h3 className="text-sm font-semibold mb-3 text-(--color-heading)">
            Platform / Database
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-9 gap-2 place-items-center">
            {platforms.map((item) => (
              <SkillBubble key={item.title} {...item} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Sections */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold flex items-center gap-3">
          <MdOutlineFeaturedPlayList />
          Featured Sections
        </h2>
        <p className="text-base text-(--color-heading)">
          Showcasing my core professional skills and expertise in the tech
          industry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-5">
          {/* About Me */}
          <motion.section 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={() => router.push("/about")}

          className="bg-(--color-background) 
          backdrop-blur-md rounded-2xl 
          shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)] 
          py-5 px-4 flex flex-col items-center text-center">
            <div className="p-2 bg-[#3E5879]/30 backdrop-blur-md rounded-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-semibold mt-2">About Me</h3>
            <p className="text-sm text-(--color-heading)">
              A glimpse into who I am and what I do.
            </p>
            <div className="relative w-36 h-44 rounded-xl overflow-hidden mt-4 outline-2 outline-offset-2 outline-(--color-border-card) shadow-lg hover:scale-105 transition-transform">
              <Image
                src="/aboutme.jpg"
                alt="Aisyah Rahmawati"
                fill 
                sizes="144px"
                className="object-cover"
              />
            </div>
          </motion.section>

          {/* Projects */}
          <motion.section 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={() => router.push("/projects")}
          className="bg-(--color-background) 
          py-5 px-4 backdrop-blur-md rounded-2xl 
          shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)] 
          flex flex-col items-center text-center lg:col-span-2">
            <div className="p-2 bg-[#3E5879]/30 backdrop-blur-md rounded-lg">
              <FolderKanban className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-semibold mt-2">Projects</h3>
            <p className="text-sm text-(--color-heading)">
              Showcase of My Academic and Creative Works.
            </p>
            {/* Slider project */}
            <div className="mt-10 w-full">
              <Swiper
                key={data.length}  
                spaceBetween={20}
                slidesPerView={2.4}
                breakpoints={{
                  0: { slidesPerView: 1.4, spaceBetween: 6 },
                  640: { slidesPerView: 1.8, spaceBetween: 10 },
                  1024: { slidesPerView: 2.4, spaceBetween: 15 },
                }}

                loop={true}
                allowTouchMove={false}

                autoplay={{
                  delay: 0,              
                  disableOnInteraction: false,
                }}
                speed={2500}             
                cssMode={false}          
                modules={[Autoplay]}
                className="mySwiper"
              >
                {data.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="group relative w-full h-32.5 rounded-xl overflow-hidden border-2 border-(--color-border-card) bg-[#C7B7A3] shadow-[inset_0_3px_10px_rgba(0,0,0,0.3)]">
                    <Image
                      src={`/Project/${item.image}`}
                      alt={item.project}
                      fill
                      sizes="130px"
                      loading="eager"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.project}
                    </div>
                  </div>
                </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.section>
          {/* Achievements */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="
              bg-(--color-background)
              py-3
              backdrop-blur-md
              rounded-2xl
              shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)]
              flex flex-col lg:flex-row
              justify-center
              items-center
              text-center
              lg:col-span-2
            "
          >
            <div className="text-center lg:text-left lg:w-1/3 space-y-2">
              <div className="inline-block p-2 bg-[#3E5879]/30 backdrop-blur-md rounded-lg">
                <Award className="w-5 h-5 text-white" />
              </div>

                <h3 className="text-lg font-semibold">
                  Achievements
                </h3>

                <p className="text-sm text-(--color-text-secondary) leading-relaxed">
                  Certifications and milestones that reflect my growth.
                </p>
            </div>
            <div className="relative w-62.5 md:h-62.5 h-40 mb-6 md:mb-0 flex items-center justify-center">
              {order
                .map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    onClick={() => bringToFront(cert.id)}
                    className="absolute cursor-pointer"
                    style={{
                      zIndex: order.length - index,
                    }}
                    initial={{ scale: 0.9, y: index * 8, rotate: index * -2 }}
                    animate={{ scale: 1, y: index * 8, rotate: index * -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  >
                    <Image
                      src={`/Sertifikat/${cert.image}`}
                      alt={`Certificate ${cert.id}`}
                      width={200}
                      height={200}
                      sizes="100vw"
                      className="
                        rounded-xl
                        border border-(--color-border-card)
                        shadow-xl
                        bg-white
                      "
                    />
                  </motion.div>
                ))
                .reverse()}
            </div>
          </motion.section>
          {/* Future Section */}
          <motion.section 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-(--color-background) 
          backdrop-blur-md rounded-2xl 
          shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)] 
          p-6 text-center flex flex-col items-center ">
              <div
            onClick={() => router.push("/contact")}
              className="inline-block p-2 bg-[#3E5879]/30 backdrop-blur-md rounded-lg">
                <HiOutlineMail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold mt-2">Contact</h3>
              <p className="text-sm text-(--color-heading)">
                Follow my journey in tech and creativity.
              </p>
              <div className="flex gap-4 mt-8">
                {contacts.map((contact, index) => (
                  <a
                      key={index}
                      href={contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative h-14 w-14 rounded-full
                        bg-white
                        dark:bg-slate-600
                        border border-slate-200/70 dark:border-slate-700
                        shadow-[0_4px_12px_rgba(15,23,42,0.08)]
                        dark:shadow-[0_6px_20px_rgba(0,0,0,0.4)]
                        transition-all duration-300
                        hover:-translate-y-0.5
                        hover:shadow-[0_8px_24px_rgba(79,70,229,0.18)]
                        dark:hover:shadow-[0_8px_28px_rgba(99,102,241,0.35)]"
                    >
                    {/* Glass highlight */}
                    <span className="pointer-events-none absolute top-1 left-2 h-4 w-4 rounded-full bg-white/60 blur-[2px]" />

                    {/* Icon */}
                    <span
                      className="flex h-full w-full items-center justify-center
                        text-slate-700 dark:text-slate-200
                        group-hover:text-indigo-500 dark:group-hover:text-indigo-400
                        transition-colors"
                    >
                      {contact.icon}
                    </span>
                  </a>
                ))}
              </div>
          </motion.section>
        </div>
      </motion.section>
    </div>
  );
}
