import { NextResponse } from "next/server";
import { addSubmission } from "@/lib/storage";

type ContactPayload = {
  fullName: string;
  email: string;
  phone: string;
  details: string;
  consent: boolean;
  locale?: "cs" | "uk";
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const fullName = String(payload.fullName ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const phone = String(payload.phone ?? "").trim();
    const details = String(payload.details ?? "").trim();

    if (!fullName || !email || !phone || !details || !payload.consent) {
      return NextResponse.json(
        { message: "Nejsou vyplnena vsechna povinna pole." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Neplatny e-mail." }, { status: 400 });
    }

    await addSubmission({
      locale: payload.locale === "uk" ? "uk" : "cs",
      fullName,
      email,
      phone,
      details,
    });

    return NextResponse.json({
      message: "Poptavka byla prijata.",
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
