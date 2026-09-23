import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { legalPolicies } from "@/content/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Professional & Project Disclaimer",
  description: "Professional disclaimer, resume accuracy standards, and project confidentiality details for Suyash Sharma's portfolio.",
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: `Disclaimer — ${siteConfig.name}`,
    description: "Professional qualifications disclaimer, client confidentiality boundaries, and third-party trademarks.",
    url: `${siteConfig.url}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return <LegalPageLayout document={legalPolicies.disclaimer} />;
}
