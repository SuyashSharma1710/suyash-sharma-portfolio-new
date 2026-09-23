import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { legalPolicies } from "@/content/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy, storage mechanisms, and Google Consent Mode v2 implementation details for Suyash Sharma's portfolio.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: `Cookie Policy — ${siteConfig.name}`,
    description: "Detailed documentation of cookies, telemetry parameters, and Google Consent Mode v2.",
    url: `${siteConfig.url}/cookies`,
  },
};

export default function CookiesPage() {
  return <LegalPageLayout document={legalPolicies.cookies} />;
}
