import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { removeSubmission } from "@/lib/storage";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
  return NextResponse.redirect(url, 303);
}
