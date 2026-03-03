import { NextResponse } from "next/server";
import { adminCookieConfig } from "@/lib/adminAuth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieConfig.name, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}

