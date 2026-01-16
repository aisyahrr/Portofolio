"use client";

import { useEffect, useState } from "react";

export default function CountUp({ value }: { value: number }) {
    const safeValue = Number.isFinite(value) ? value : 0;
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1200;
        const step = safeValue / (duration / 16);

        const timer = setInterval(() => {
        start += step;
        if (start >= safeValue) {
            setCount(safeValue);
            clearInterval(timer);
        } else {
            setCount(Math.floor(start));
        }
        }, 16);

        return () => clearInterval(timer);
    }, [safeValue]);

    return <>{count}</>;
}
