import { NextResponse } from "next/server";
import {
  adminCookieConfig,
  makeAdminToken,
  verifyAdminPassword,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const password = String(body.password ?? "");

  if (!verifyAdminPassword(password)) {
    return NextResponse.json(
      { message: "Invalid password" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieConfig.name, makeAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminCookieConfig.maxAge,
  });
  return response;
}

