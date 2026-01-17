"use client";

import { Toaster } from "react-hot-toast";

export default function Providers() {
    return (
        <Toaster
        position="top-right"
        toastOptions={{
            style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
            },
            success: {
            style: {
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.4)",
                color: "#22c55e",
                padding: "12px 16px",
                borderRadius: "12px",
            },
            iconTheme: {
                primary: "#22c55e",
                secondary: "white",
            },
            },
            error: {
            style: {
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.4)",
                color: "#ef4444",
                padding: "12px 16px",
                borderRadius: "12px",
            },
            iconTheme: {
                primary: "#ef4444",
                secondary: "transparent",
            },
            },
        }}
        />
    );
}
