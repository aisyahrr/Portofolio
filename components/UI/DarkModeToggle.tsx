"use client";

import { useEffect, useState } from "react";
import useColorMode from "@/hooks/useColorMode";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false); 
  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  if (!mounted) return null; 

  const toggleMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleMode}
      className={`
        relative w-20 h-8 rounded-full flex items-center px-2 transition-all
        ${
          colorMode === "dark"
            ? "bg-[#000000]/50 backdrop-blur-md" 
            : "bg-[#D8C4B6]/50 backdrop-blur-md"
        }
      `}
    >
      <div className="absolute left-3.5 text-orange-500">
        <Sun size={16} />
      </div>

      <div className="absolute right-3.5 text-blue-400">
        <Moon size={16} />
      </div>

      <div
        className={`
          w-7 h-7 rounded-full bg-white/20 shadow-md
          absolute top-1/2 -translate-y-1/2 transition-all duration-300
          ${colorMode === "dark" ? "translate-x-9" : "translate-x-0"}
        `}
      />
    </button>
  );
}
