"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Projects", path: "/dashboard" },
    { name: "Achievements", path: "/dashboard/achievements" },
    { name: "Education", path: "/dashboard/education" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="h-16 flex items-center px-10 py-12 text-white justify-between">
        <h1 className="text-lg font-semibold">Dashboard</h1>

        <nav className="flex items-center p-2 gap-5 bg-white/20 rounded-lg divide-x divide-white/40">
            {navItems.map((item) => {
            const isActive =
                item.path === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.path);

            return (
                <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 transition-all rounded-lg
                    ${
                    isActive
                        ? "bg-black/50 font-medium"
                        : "hover:bg-black/20"
                    }
                `}
                >
                {item.name}
                </Link>
            );
            })}
        </nav>

        <div className="py-1 px-4 border border-red-400/30 rounded-lg text-red-400 text-sm hover:bg-red-500/10 hover:border-red-400/60 hover:text-red-300 transition">
            <button
            onClick={async () => {
                await fetch("/api/admin-logout", { method: "POST" });

                // bersihkan localStorage
                localStorage.removeItem("token");
                localStorage.removeItem("adminToken");

                window.location.href = "/";
            }}
            >
            Logout
            </button>
        </div>
        </header>
    );
}
