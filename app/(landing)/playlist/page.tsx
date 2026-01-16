"use client";

import {useState} from "react";
import PlayerControls from "@/components/UI/PlayerControls";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import { PlaylistMusic } from "@/data/data";
export default function PlaylistPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const current = PlaylistMusic[currentIndex];
    
    return(
        <section className="space-y-6 text-(--color-text) ">
            {/* Header */}
            <div className="border-b border-(--color-border) pb-5">
                <h1 className="text-2xl font-bold">My Playlist </h1>
                <p className="text-(--color-text-secondary) mt-1">
                Music I enjoy while coding, designing, and building projects.
                </p>
            </div>
            <div className="flex items-center justify-center rounded-2xl ">
                <div className="relative rounded-3xl bg-(--color-hover) border border-(--color-border-card) w-full md:w-[60%] ">
                    {/* Glass / Blur Overlay */}
                    <div
                    className="
                        flex justify-between items-center gap-10
                        rounded-3xl
                        p-6
                        backdrop-blur-2xl
                        bg-linear-to-t
                        from-[#005c97]
                        to-[#363795]
                        shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]
                    "
                    >
                    <div className="flex items-center gap-3 md:gap-8 ">                    
                        {/* ALBUM COVER */}
                        <div className="relative w-30 h-30 md:w-50 md:h-50 rounded-3xl overflow-hidden shrink-0">
                            <Image
                            src={`/Playlist/${current.image}`}
                            alt="Juicy Luicy"
                            fill
                            sizes="150px"
                            className="object-cover"
                            />
                        </div>

                        {/* SONG INFO */}
                        <div className="relative flex flex-col justify-center text-white space-y-1">
                            <p className="text-xs absolute -top-5 md:-top-12">Now Playing</p>
                            <h1 className="text-lg md:text-2xl font-semibold">{current.title}</h1>
                            <p className="text-sm opacity-60">{current.singer}</p>
                            <p className="text-xs opacity-60">{current.album}</p>
                        </div>
                    </div>

                    {/* OPTIONAL ACTION */}
                    <div className="hidden md:flex md:flex-col">
                        <div className="
                        p-2 rounded-full
                        border border-indigo-800
                        backdrop-blur-lg
                        hover:bg-white/30
                        hover:scale-110
                        transition
                        shadow-lg
                        
                        ">

                            <FaRegHeart
                            className="text-base text-white"
                            />
                        </div>

                    </div>
                    </div>

                    <div className="p-7">
                        <PlayerControls
                            playlist={PlaylistMusic}
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                        />
                    </div>


                </div>

            </div>
        </section>

    )
}