import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const res = NextResponse.json({ success: true });
        res.cookies.set("admin", "true", {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: true,
        });
        return res;
    }

    return NextResponse.json(
        { success: false },
        { status: 401 }
    );
}
