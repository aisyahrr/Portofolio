"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
    const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
        toast.success("Login berhasil");
        router.push("/dashboard");
    } else {
        toast.error("Username atau password salah");
    }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-3 bg-blue-950 text-white">
        <div className="w-full max-w-sm rounded-xl border p-6 backdrop-blur-3xl shadow-lg ">
            <h1 className="text-xl font-semibold mb-4 text-center">
            Admin Login
            </h1>

            <input
            placeholder="Username"
            className="w-full mb-3 border rounded-lg px-4 py-2"
            onChange={(e) => setUsername(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 border rounded-lg px-4 py-2"
            onChange={(e) => setPassword(e.target.value)}
            />

            <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded-lg"
            >
            Login
            </button>
        </div>
        </div>
    );
}
