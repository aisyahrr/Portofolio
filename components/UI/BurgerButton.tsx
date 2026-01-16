"use client";

interface BurgerButtonProps {
    open: boolean;
    toggle: () => void;
}

export default function BurgerButton({ open, toggle }: BurgerButtonProps) {
    return (
        <button
            onClick={toggle}
            className="flex flex-col gap-1 p-2 rounded-lg text-(--color-text) transition z-9999"
        >
            <span
                className={`block w-7 h-0.75 bg-(--color-text) transition-all duration-300 ${
                    open ? "rotate-45 translate-y-1.75" : ""
                }`}
            />
            <span
                className={`block w-7 h-0.75bg-(--color-text) transition-all duration-300 ${
                    open ? "opacity-0" : ""
                }`}
            />
            <span
                className={`block w-7 h-0.75 bg-(--color-text) transition-all duration-300 ${
                    open ? "-rotate-45 -translate-y-1.75" : ""
                }`}
            />
        </button>
    );
}
