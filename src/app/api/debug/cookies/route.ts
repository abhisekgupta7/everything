import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const user = await currentUser();

    // Return minimal info for debugging — do not expose sensitive data
    return NextResponse.json({
      hasCookie: !!cookieHeader,
      cookiePreview: cookieHeader ? cookieHeader.split(";").slice(0, 3) : null,
      clerkUserId: user ? user.id : null,
    });
  } catch (err) {
    console.error("/api/debug/cookies error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export const runtime = "edge";
