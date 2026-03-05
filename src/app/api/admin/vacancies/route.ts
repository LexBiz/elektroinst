import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { addVacancy, removeVacancy } from "@/lib/storage";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  try {
    const form = await request.formData();
    const intent = String(form.get("intent") ?? "");

    if (intent === "delete") {
      const id = String(form.get("id") ?? "");
      if (id) {
        await removeVacancy(id);
      }
      revalidatePath("/admin");
      revalidatePath("/cs/career");
      revalidatePath("/uk/career");
      return NextResponse.redirect(new URL("/admin?deleted=1", request.url), 303);
    }

    const titleCs = String(form.get("titleCs") ?? "").trim();
    const titleUk = String(form.get("titleUk") ?? "").trim();
    const type = String(form.get("type") ?? "").trim();
    const location = String(form.get("location") ?? "").trim();
    const descriptionCs = String(form.get("descriptionCs") ?? "").trim();
    const descriptionUk = String(form.get("descriptionUk") ?? "").trim();

    await addVacancy({
      titleCs: titleCs || "Nova pozice",
      titleUk: titleUk || "Nova vakansiia",
      type: type || "HPP / ICO",
      location: location || "Ceska republika",
      descriptionCs: descriptionCs || "Detaily pozice doplnime po konzultaci.",
      descriptionUk: descriptionUk || "Detali vakansii utochnymo pid chas konsultatsii.",
    });

    revalidatePath("/admin");
    revalidatePath("/cs/career");
    revalidatePath("/uk/career");
    return NextResponse.redirect(new URL("/admin?created=1", request.url), 303);
  } catch {
    return NextResponse.redirect(new URL("/admin?error=vacancy", request.url), 303);
  }
}

