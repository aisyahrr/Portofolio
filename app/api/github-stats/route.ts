import { NextResponse } from "next/server";

export async function GET() {
    const query = `
        query {
        user(login: "aisyahrr") {
            repositories(privacy: PUBLIC) {
            totalCount
            }
            contributionsCollection {
            contributionCalendar {
                totalContributions
                weeks {
                contributionDays {
                    date
                    contributionCount
                    color
                }
                }
            }
            }
        }
        }
    `;

    try {
        const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        cache: "no-store",
        });

        const json = await res.json();

        if (json.errors) {
        return NextResponse.json({ error: json.errors }, { status: 500 });
        }

        return NextResponse.json({
        totalRepos: json.data.user.repositories.totalCount,
        totalContributions:
            json.data.user.contributionsCollection.contributionCalendar
            .totalContributions,
        weeks:
            json.data.user.contributionsCollection.contributionCalendar
            .weeks,
        });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
