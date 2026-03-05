import { NextResponse } from "next/server";
import { adminCookieConfig } from "@/lib/adminAuth";
import { toPublicUrl } from "@/lib/requestUrl";

export async function POST(request: Request) {
  const response = NextResponse.redirect(toPublicUrl(request, "/admin/login"), 303);
  response.cookies.set(adminCookieConfig.name, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}

