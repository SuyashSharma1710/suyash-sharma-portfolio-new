import { redirect } from "next/navigation";
import { siteConfig } from "@/content/site";

export async function GET() {
  redirect(siteConfig.resume || "/resume/resume.pdf");
}
