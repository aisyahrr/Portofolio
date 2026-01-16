"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

interface ContactCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    href: string;
}

function ContactCard({ icon, title, value, href }: ContactCardProps) {
    return (
            <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
            rounded-2xl
            border border-[var(--color-border-card)]
            bg-[var(--color-secondary)]
            text-[var(--color-text)]
            backdrop-blur-md
            p-5 text-left
            hover:bg-[var(--color-hover)]
            hover:shadow-[0_0_0_1px_var(--color-border-card),0_8px_30px_var(--glow-primary)]
            hover:scale-[1.02]
            transition-all duration-300
            "

            >
            <div className="flex items-center gap-3 mb-2 text-(--color-bluePrimary)">
                {icon}
                <h3 className="font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-(--color-bluePrimary)">{value}</p>
            </a>
    );
}

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    return (
        <section className="space-y-6 text-(--color-text)">
            {/* Header */}
            <div className="border-b border-(--color-border) pb-5">
                <h1 className="text-2xl font-bold">Let’s Connect </h1>
                <p className="text-(--color-text-secondary) mt-1">
                Have a project, idea, or just want to say hi?
                </p>
                <p className="text-sm text-green-600 font-medium">
                    Open for collaboration
                </p>
            </div>
            <section className="flex flex-col md:flex-row gap-8 items-start">

            {/* CONTACT CARDS */}
            <div className="grid grid-cols-2 gap-4 md:w-1/2">
                <ContactCard
                icon={<FaEnvelope size={20} />}
                title="Email"
                value="aisyahr142@gmail.com"
                href="mailto:aisyahr142@gmail.com"
                />
                <ContactCard
                icon={<FaLinkedin size={20} />}
                title="LinkedIn"
                value="linkedin.com/in/aisyhrr"
                href="https://www.linkedin.com/in/aisyhrr/"
                />
                <ContactCard
                icon={<FaGithub size={20} />}
                title="GitHub"
                value="github.com/aisyahrr"
                href="https://github.com/aisyahrr"
                />
                <ContactCard
                icon={<FaInstagram size={20} />}
                title="Instagram"
                value="@aisyh.rr"
                href="https://www.instagram.com/aisyh.rr/"
                />
            </div>

            {/* CONTACT FORM */}
            <div className="w-full md:w-1/2 rounded-2xl border border-[var(--color-border-card)] p-6 backdrop-blur-md">
                <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full rounded-lg border border-(--color-border) px-4 py-2 focus:ring-2 focus:ring-[var(--color-border-card)]"
                />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full rounded-lg border border-(--color-border) px-4 py-2 focus:ring-2 focus:ring-[var(--color-border-card)]"
                />
                <textarea
                    placeholder="Message"
                    rows={4}
                    required
                    className="w-full rounded-lg border border-(--color-border) px-4 py-2 focus:ring-2 focus:ring-[var(--color-border-card)]"
                />
                <button
                    className="w-full px-6 py-2 rounded-lg  border-none 
                    bg-(--color-bluePrimary) hover:bg-(--color-bluePrimary)/80 text-white transition"
                >
                    Send Message
                </button>
                </form>
            </div>

            </section>
        </section>
    );
}
