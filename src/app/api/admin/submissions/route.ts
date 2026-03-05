import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { removeSubmission } from "@/lib/storage";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  try {
    const form = await request.formData();
    const id = String(form.get("id") ?? "");
    const sort = String(form.get("sort") ?? "newest");

    if (id) {
      await removeSubmission(id);
    }

    revalidatePath("/admin");
    const url = new URL("/admin", request.url);
    if (sort === "oldest") {
      url.searchParams.set("sort", "oldest");
    }
    url.searchParams.set("deletedLead", "1");
    return NextResponse.redirect(url, 303);
  } catch {
    return NextResponse.redirect(new URL("/admin?error=submission", request.url), 303);
  }
}
