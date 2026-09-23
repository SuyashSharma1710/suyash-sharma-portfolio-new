import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { legalPolicies } from "@/content/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy, data stewardship standards, and DPDP Act 2023 compliance for Suyash Sharma's portfolio.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: `Privacy Policy — ${siteConfig.name}`,
    description: "Privacy policy, telemetry parameters, and user rights under the DPDP Act 2023.",
    url: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return <LegalPageLayout document={legalPolicies.privacy} />;
}
