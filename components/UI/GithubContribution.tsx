"use client";

import { useEffect, useState } from "react";

interface Day {
  date: string;
  contributionCount: number;
  color: string;
}

interface Week {
  contributionDays: Day[];
}
const getMonthLabel = (week: Week) => {
  for (const day of week.contributionDays) {
    const date = new Date(day.date);
    if (date.getDate() === 1) {
      return date.toLocaleString("en-US", { month: "short" });
    }
  }
  return "";
};
const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function GithubContributionCalendar() {
  const [weeks, setWeeks] = useState<Week[]>([]);

  useEffect(() => {
    fetch("/api/github-stats")
      .then((res) => res.json())
      .then((data) => setWeeks(data.weeks));
  }, []);

  return (
    <section className="space-y-3 text-sm">
      {/* MONTH LABELS */}
        <div className="flex md:gap-1 gap-[13.5px] pl-10 text-gray-400 text-xs">
          {weeks.map((week, i) => {
            const month = getMonthLabel(week);

            return (
              <div
                key={i}
                className="w-3 text-left"
              >
                {month}
              </div>
            );
          })}
        </div>

      {/* GRID */}
      <div className="flex gap-1">
        {/* DAY LABELS */}
        <div className="flex flex-col gap-1 pr-2 text-gray-400 text-xs">
          {dayLabels.map((label, i) => (
            <div key={i} className="h-3">
              {label}
            </div>
          ))}
        </div>

        {/* WEEKS */}
        {weeks.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1">
            {week.contributionDays.map((day) => {
              const count = day.contributionCount;

              return (
                <div
                  key={day.date}
                  title={`${day.date} • ${count} contributions`}
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor:
                      count === 0 ? "#1f2933" : day.color,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
