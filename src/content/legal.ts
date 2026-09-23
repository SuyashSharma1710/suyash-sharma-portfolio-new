/**
 * Legal & Compliance Content
 * Governed by RULES.md Rule 2 (Zero-Invention Policy)
 * Jurisdiction: Delhi, India (IT Act 2000 & Digital Personal Data Protection Act 2023)
 */

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export type LegalSlug = "privacy" | "terms" | "cookies" | "disclaimer";

export interface LegalDocument {
  slug: LegalSlug;
  title: string;
  subtitle: string;
  lastUpdated: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export const legalPolicies: Record<LegalSlug, LegalDocument> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    subtitle: "Data stewardship, telemetry protocols, and user rights under the Digital Personal Data Protection (DPDP) Act 2023 & global privacy frameworks.",
    lastUpdated: "March 2025",
    effectiveDate: "March 23, 2025",
    sections: [
      {
        id: "overview",
        title: "1. Overview & Commitment",
        paragraphs: [
          "This portfolio website (the \"Site\"), operated by Suyash Sharma (\"Engineer\", \"we\", \"our\", or \"us\"), is designed as an architectural software engineering showcase. We hold a strict privacy-first standard: we collect the absolute minimum data required to facilitate direct professional communication and ensure high-throughput system performance.",
          "We do not sell, rent, monetize, or trade your personal information with data brokers or commercial advertisers under any circumstances.",
        ],
      },
      {
        id: "data-collection",
        title: "2. Information We Collect",
        paragraphs: [
          "We collect personal information solely when you voluntarily provide it through our direct communication channels:",
        ],
        bulletPoints: [
          "Direct Inquiries & Contact: When you contact us via email (suyashsharma171001@gmail.com) or the contact form, we receive your name, email address, message content, and any project specifications you choose to share.",
          "Technical & Diagnostic Signals: When you navigate the Site, automated web server logs and privacy-aware analytics tools may collect non-identifiable technical data such as browser type, operating system, referring URL, and approximate geographic region (country/city level).",
          "Local System State: The Site stores local UI preferences (such as light/dark mode and audio sound engine state) strictly within your browser's localStorage. This data never leaves your device.",
        ],
      },
      {
        id: "analytics-consent",
        title: "3. Telemetry & Google Consent Mode v2",
        paragraphs: [
          "We utilize Google Analytics 4 (Measurement ID: G-H80QF4E239) to monitor site performance, page latency, and interaction telemetry. To respect your privacy rights unconditionally:",
        ],
        bulletPoints: [
          "Default Denied State: In compliance with Google Consent Mode v2 and global privacy regulations, all telemetry and advertising storage (ad_storage, ad_user_data, ad_personalization, analytics_storage) are set to 'denied' by default before any tag executes.",
          "User-Controlled Consent: Analytics identifiers are only initialized if you explicitly grant permission through the on-screen consent banner.",
          "IP Anonymization & Ads Redaction: IP addresses are automatically masked, and ads data redaction is enabled across all telemetry transmissions.",
          "Revocation at Any Time: You can adjust or revoke your consent preferences at any moment via the 'Privacy & Cookies' trigger located in the site footer.",
        ],
      },
      {
        id: "purpose-legal-basis",
        title: "4. Purpose & Legal Grounds for Processing",
        paragraphs: [
          "We process your data under the following legal bases recognized by the Digital Personal Data Protection (DPDP) Act 2023 (India) and the General Data Protection Regulation (GDPR):",
        ],
        bulletPoints: [
          "Legitimate Interests & Performance: To evaluate freelance/employment inquiries, respond to project dispatches, and maintain the operational security of our web infrastructure.",
          "Consent: To record anonymous telemetry and analytics metrics when you explicitly grant permission via our Consent Protocol.",
        ],
      },
      {
        id: "user-rights",
        title: "5. Your Rights & Data Control",
        paragraphs: [
          "Depending on your jurisdiction (including India under DPDP Act 2023, the European Economic Area under GDPR, and California under CCPA), you possess specific rights regarding your personal information:",
        ],
        bulletPoints: [
          "Right to Access: You may request confirmation of whether we hold any personal communication from you.",
          "Right to Correction: You may request the modification of inaccurate or outdated contact information.",
          "Right to Erasure (Right to be Forgotten): You may request the immediate deletion of past email correspondence or inquiry records.",
          "Right to Withdraw Consent: You may withdraw analytics consent at any time without impacting site navigation.",
        ],
      },
      {
        id: "contact",
        title: "6. Contact & Data Grievances",
        paragraphs: [
          "For any questions, rights requests, or data privacy grievances, please contact Suyash Sharma directly at:",
          "Email: suyashsharma171001@gmail.com\nPhone: +91 87550 63079\nLocation: Delhi, India",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms of Use",
    subtitle: "Guidelines and legal boundaries governing the access, inspection, and interaction with this engineering portfolio.",
    lastUpdated: "March 2025",
    effectiveDate: "March 23, 2025",
    sections: [
      {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        paragraphs: [
          "By accessing and navigating this website (https://suyash-sharma-portfolio-new.vercel.app or its associated custom domains), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
        ],
      },
      {
        id: "intellectual-property",
        title: "2. Intellectual Property Rights",
        paragraphs: [
          "All original content, visual layouts, editorial typography, GSAP animations, sound engine synthesis designs, and custom software architectures authored on this website are the proprietary intellectual property of Suyash Sharma, unless explicitly attributed otherwise.",
        ],
        bulletPoints: [
          "Open-Source Code: Code repositories linked to GitHub (https://github.com/SuyashSharma1710) are governed by their respective open-source licenses (e.g., MIT, Apache 2.0).",
          "Proprietary Portfolio Design: The custom design system, proprietary colophon, graphics, and architectural presentation of this portfolio may not be cloned, scraped, or republished wholesale without express written permission.",
          "Third-Party Trademarks: Technologies, logos, and platforms referenced (including Next.js, React, Rust, Tauri, Shopify, WordPress, and Vercel) remain the registered trademarks of their respective owners.",
        ],
      },
      {
        id: "demonstration-purposes",
        title: "3. Professional Showcase & Permitted Use",
        paragraphs: [
          "This site is provided for evaluation, hiring assessment, engineering demonstration, and client collaboration. You are granted a limited, non-exclusive license to view, inspect, and evaluate the materials on this website for personal or professional hiring review.",
          "You agree not to use automated scrapers, denial-of-service tools, or malicious exploit probes against this web application.",
        ],
      },
      {
        id: "disclaimer-liability",
        title: "4. Limitation of Liability",
        paragraphs: [
          "The materials and experimental lab demos on this website are provided on an 'as is' and 'as available' basis. While we strive for absolute accuracy and peak system uptime, Suyash Sharma makes no warranties, expressed or implied, regarding the uninterrupted availability or total error-free operation of experimental features.",
          "In no event shall Suyash Sharma be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the site.",
        ],
      },
      {
        id: "governing-law",
        title: "5. Governing Law & Jurisdiction",
        paragraphs: [
          "These Terms of Use and any disputes arising out of or related to this website shall be governed by and construed in accordance with the laws of India, specifically the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.",
          "You agree that the competent courts situated in Delhi, India shall have exclusive jurisdiction to settle any disputes or legal proceedings arising hereunder.",
        ],
      },
      {
        id: "modifications",
        title: "6. Modifications to Terms",
        paragraphs: [
          "We reserve the right to revise these Terms of Use at any time without prior notice. By continuing to use this site after updates are published, you agree to be bound by the then-current version of these Terms of Use.",
        ],
      },
    ],
  },

  cookies: {
    slug: "cookies",
    title: "Cookie Policy",
    subtitle: "Technical documentation of browser storage, Google Analytics cookies, and Consent Mode v2 implementation.",
    lastUpdated: "March 2025",
    effectiveDate: "March 23, 2025",
    sections: [
      {
        id: "what-are-cookies",
        title: "1. What are Cookies & Local Storage?",
        paragraphs: [
          "Cookies and browser local storage are small text files or key-value entries placed on your computer or mobile device when you visit websites. They allow web applications to remember your preferences (such as UI themes), provide seamless page transitions, and gather diagnostic telemetry.",
        ],
      },
      {
        id: "how-we-use",
        title: "2. Categories of Storage We Use",
        paragraphs: [
          "We categorize all browser storage mechanisms used on this site into two strict tiers:",
        ],
        bulletPoints: [
          "Strictly Necessary Storage (Essential): Required for basic website operation, state persistence, and accessibility. These cannot be disabled as the site cannot function properly without them (e.g., portfolio_theme for dark/light mode preference, sound_engine_muted for audio synthesizer toggle, and portfolio_cookie_consent_v2 to remember your cookie choice).",
          "Performance & Telemetry Cookies (Optional): Placed by Google Analytics 4 (e.g., _ga, _ga_*) to calculate visitor count, session durations, and page latency. These are disabled by default under Consent Mode v2 and only activate if you click 'Accept All' or enable them in settings.",
        ],
      },
      {
        id: "consent-mode-v2",
        title: "3. Consent Mode v2 Implementation",
        paragraphs: [
          "This website strictly implements Google Consent Mode v2. When you visit our website:",
        ],
        bulletPoints: [
          "The default state for ad_storage, ad_user_data, ad_personalization, and analytics_storage is set to 'denied'.",
          "No tracking cookies or analytics telemetry are transmitted until you interact with the Consent Banner.",
          "If you select 'Essential Only', all optional cookies remain blocked, and URL passthrough & ads data redaction ensure no identifying markers are passed.",
          "If you select 'Accept All', the consent state updates to 'granted' and stores your preference in localStorage.",
        ],
      },
      {
        id: "manage-preferences",
        title: "4. How to Manage & Revoke Preferences",
        paragraphs: [
          "You can modify or revoke your cookie preferences at any time:",
        ],
        bulletPoints: [
          "Via the Site Footer: Click the 'Privacy & Cookies' link in the footer on any page to open the preferences drawer.",
          "Via Browser Settings: You can configure your browser (Chrome, Safari, Firefox, Edge) to block or delete cookies entirely. Note that clearing browser storage will reset your light/dark theme preference.",
        ],
      },
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Professional & Project Disclaimer",
    subtitle: "Clarifications regarding resume accuracy, project demonstrations, client confidentiality, and external third-party trademarks.",
    lastUpdated: "March 2025",
    effectiveDate: "March 23, 2025",
    sections: [
      {
        id: "resume-accuracy",
        title: "1. Professional Resume & Qualifications",
        paragraphs: [
          "All biographical statements, educational credentials (College of Engineering Roorkee, Chandigarh University, Scaler IIT Roorkee), work experience milestones, and technical skill descriptions published on this portfolio and downloadable in the Resume PDF are accurate, truthful, and representative of the authentic professional record of Suyash Sharma.",
        ],
      },
      {
        id: "case-studies",
        title: "2. Client Projects & Confidentiality",
        paragraphs: [
          "The case studies, system architecture diagrams, and client project demonstrations presented in the Work section reflect real-world engineering engagements led or contributed to by Suyash Sharma.",
          "Proprietary backend credentials, client private API keys, proprietary database schemas, and confidential business metrics have been redacted, abstracted, or replaced with representative benchmarks to strictly uphold client non-disclosure agreements (NDAs) and commercial confidentiality.",
        ],
      },
      {
        id: "experimental-lab",
        title: "3. Experimental Lab Prototypes",
        paragraphs: [
          "Prototypes, interactive shaders, Web Audio synthesizer experiments, and ONNX AI search demos hosted in the Lab section are provided for exploratory research and technological demonstration. While engineered to high architectural standards, experimental features may evolve or vary based on local GPU acceleration, device capabilities, or network throughput.",
        ],
      },
      {
        id: "external-links",
        title: "4. External Links & Third-Party Platforms",
        paragraphs: [
          "This site contains links to external platforms and social networks (such as GitHub, LinkedIn, X/Twitter, Vercel, Shopify, and live client stores). We have no direct control over the privacy practices, content changes, or service availability of third-party domains.",
        ],
      },
    ],
  },
};
