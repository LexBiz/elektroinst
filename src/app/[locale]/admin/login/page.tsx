import { redirect } from "next/navigation";

export default function LocalizedAdminLoginRedirect() {
  redirect("/admin/login");
}

