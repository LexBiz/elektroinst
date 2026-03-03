import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "ei_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14;

function secret() {
  return process.env.ADMIN_SECRET ?? "change-this-admin-secret";
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "change-this-admin-password";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function verifyAdminPassword(input: string): boolean {
  const expected = adminPassword();
  if (!input || !expected) {
    return false;
  }
  const left = Buffer.from(input);
  const right = Buffer.from(expected);
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
}

export function makeAdminToken(): string {
  const createdAt = String(Date.now());
  return `${createdAt}.${sign(createdAt)}`;
}

export function isAdminTokenValid(token?: string): boolean {
  if (!token) {
    return false;
  }
  const [rawTs, rawSig] = token.split(".");
  if (!rawTs || !rawSig) {
    return false;
  }

  const expectedSig = sign(rawTs);
  const left = Buffer.from(rawSig);
  const right = Buffer.from(expectedSig);
  if (left.length !== right.length) {
    return false;
  }
  if (!timingSafeEqual(left, right)) {
    return false;
  }

  const ageMs = Date.now() - Number(rawTs);
  return ageMs >= 0 && ageMs <= SESSION_TTL_SECONDS * 1000;
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  return isAdminTokenValid(token);
}

export const adminCookieConfig = {
  name: ADMIN_COOKIE,
  maxAge: SESSION_TTL_SECONDS,
};

