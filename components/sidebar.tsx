"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import {
    Home,
    User,
    FolderKanban,
    Award,
    Mail,
} from "lucide-react";
import { IoMusicalNotes } from "react-icons/io5";
import DarkMode from "./UI/DarkModeToggle";
import BurgerButton from './UI/BurgerButton';
import { useRouter } from "next/navigation";

const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "About Me", path: "/about", icon: <User size={18} /> },
    { name: "Projects", path: "/projects", icon: <FolderKanban size={18} /> },
    { name: "Achievements", path: "/achievements", icon: <Award size={18} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={18} /> },
];

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    useEffect(() => {
    document.body.classList.toggle("sidebar-open", open);

    return () => {
        document.body.classList.remove("sidebar-open");
    };
    }, [open]);
    return (
        <>
        {/* Header mobile */}
        <div className="flex items-center justify-between lg:hidden px-2 border-b border-gray-700/50 pb-4 ">
            {/* Profile Section (kiri) */}
            <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#213555]">
                <Image
                    src="/me.jpg"
                    alt="Profile"
                    fill
                    sizes="48px"
                    loading="eager"
                    className="object-cover"
                />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-base font-semibold flex items-center gap-1">
                        Aisyah Rahmawati <MdVerified className="text-[#213555]" />
                    </h2>
                    <p className="text-sm text-gray-600">@aisyh.rr</p>
                </div>
            </div>
            <BurgerButton
                open={open && !isClosing}
                toggle={() => {
                    if (open) {
                        setIsClosing(true);
                        setTimeout(() => {
                            setOpen(false);
                            setIsClosing(false);
                        }, 300);
                    } else {
                        setOpen(true);
                    }
                }}
            />
        </div>


        {/* ===== Sidebar Desktop ===== */}
        <aside className="hidden lg:inline-block w-[16rem] bg-(--color-secondary) backdrop-blur-3xl text-(--text) font-inter px-3 py-5 rounded-lg shadow-lg h-fit sticky top-5 self-start">
            <div>
            {/* Profile section */}
            <div className="flex flex-col items-center mb-2 space-y-2 border-b pb-3 border-(--color-border)">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-(--color-border-card)">
                    <Image
                        src="/me.jpg"
                        alt="Profile"
                        fill
                        sizes="96px"
                        loading="eager"
                        className="object-cover"
                    />
                </div>
                <div className="text-center">
                    <h2 className="font-semibold text-lg flex items-center gap-1">
                    Aisyah Rahmawati{" "}
                    <span className="text-blue-500">
                        <MdVerified />
                    </span>
                    </h2>
                    <p className="text-sm text-gray-500">@aisyh.rr</p>
                </div>
                <div className="mt-2">
                    <DarkMode />
                </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 border-b pb-3 border-(--color-border)">
                {navItems.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
                    pathname === item.path
                        ? "bg-(--color-sidebar) text-white font-medium"
                        : "hover:bg-(--color-hover)"
                    }`}
                >
                    <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.name}</span>
                    </div>
                    <FaArrowRight className="text-sm" />
                </Link>
                ))}
                <button
                onClick={() => router.push("/playlist")}
                    className="
                    w-full flex items-center gap-2 px-4 py-2 rounded-xl
                    bg-[var(--color-hover)]
                    border border-[var(--color-border-card)]
                    text-[var(--color-heading)]
                    hover:bg-[var(--color-bg-hover)]
                    hover:shadow-[0_6px_20px_var(--glow-primary)]
                    font-medium transition
                    "
                    >
                    <IoMusicalNotes className="text-sm"/> Playlist
                </button>
            </nav>
            </div>

            {/* Footer */}
            <footer className="text-xs text-center mt-3 font-inter font-semibold text-gray-700">
            © 2026 <br /> Aisyah Rahmawati. All rights reserved.
            </footer>
        </aside>

        {/* ===== Sidebar Mobile ===== */}
        {open && (
            <div
                className="fixed inset-0 bg-(--background) backdrop-blur-sm z-50 lg:hidden"
            >
                {/* Keep sidebar clickable */}
                <aside
                    className={`fixed top-0 right-0 h-full w-68 bg-(--color-secondary) backdrop-blur-xl rounded-l-2xl shadow-2xl flex flex-col justify-between 
                    ${isClosing ? "animate-slideOut" : "animate-slideIn"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Profile */}
                    <div className="p-6 mt-10 flex flex-col items-center border-b border-gray-500/30">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#213555] mb-2">
                        <Image
                            src="/me.jpg"
                            alt="Profile"
                            fill
                            sizes="96px"
                            loading="eager"
                            className="object-cover"
                        />
                        </div>
                        <div className="text-center">
                            <h2 className="font-semibold text-lg flex items-center gap-1">
                            Aisyah Rahmawati{" "}
                            <span className="text-blue-500">
                                <MdVerified />
                            </span>
                            </h2>
                            <p className="text-sm text-gray-500">@aisyh.rr</p>
                        </div>
                        <div className="mt-2">
                            <DarkMode />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 text-(--color-text) overflow-y-auto border-(--color-border)">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setOpen(false)}
                                className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all ${
                                pathname === item.path
                                    ? "bg-(--color-sidebar) text-white font-medium"
                                    : "hover:bg-(--color-hover)"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    <span>{item.name}</span>
                                </div>
                                <FaArrowRight />
                            </Link>
                        ))}
                        <button
                            onClick={() => router.push("/playlist")}
                            className="
                            w-full flex items-center gap-2 px-4 py-2 rounded-xl
                            bg-[var(--color-hover)]
                            border border-[var(--color-border-card)]
                            text-[var(--color-heading)]
                            hover:bg-[var(--color-bg-hover)]
                            hover:shadow-[0_6px_20px_var(--glow-primary)]
                            font-medium transition
                            "
                            >
                            <IoMusicalNotes className="text-sm"/> Playlist
                        </button>
                    </nav>

                    {/* Footer */}
                    <footer className="text-xs text-center mt-3 py-2 font-inter font-semibold text-gray-700">
                    © 2026 <br /> Aisyah Rahmawati. All rights reserved.
                    </footer>
                </aside>
            </div>
        )}
        </>
    );
}
