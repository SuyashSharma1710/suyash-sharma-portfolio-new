import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { legalPolicies } from "@/content/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use, intellectual property rights, and governing law for Suyash Sharma's portfolio.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: `Terms of Use — ${siteConfig.name}`,
    description: "Terms of use and intellectual property guidelines for Suyash Sharma's engineering portfolio.",
    url: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return <LegalPageLayout document={legalPolicies.terms} />;
}
