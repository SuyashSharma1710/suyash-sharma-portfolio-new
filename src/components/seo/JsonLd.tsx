import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";

/**
 * Root Schema: Person & WebSite
 */
export function RootJsonLd() {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle || "Full-Stack Engineer & Systems Architect",
    description: siteConfig.description,
    url: baseUrl,
    image: `${baseUrl}/images/suyash-editorial.jpg`,
    email: `mailto:${siteConfig.social.email}`,
    ...(siteConfig.social.phone || siteConfig.phone
      ? { telephone: siteConfig.social.phone || siteConfig.phone }
      : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      ...(siteConfig.social.twitter ? [siteConfig.social.twitter] : []),
      ...(siteConfig.social.facebook ? [siteConfig.social.facebook] : []),
      ...(siteConfig.social.instagram ? [siteConfig.social.instagram] : []),
    ],
    knowsAbout: [
      "Full-Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Rust",
      "Tauri",
      "ONNX Vector Embeddings",
      "Local RAG Search Engines",
      "Systems Architecture",
      "E-Commerce Architecture",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
    inLanguage: "en-US",
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${baseUrl}/#localbusiness`,
    name: "Suyash Sharma — Full-Stack Engineering & Web Development",
    alternateName: "Suyash Sharma Technical Consulting",
    description: siteConfig.description,
    url: baseUrl,
    image: `${baseUrl}/images/suyash-editorial.jpg`,
    email: `mailto:${siteConfig.social.email}`,
    ...(siteConfig.social.phone || siteConfig.phone
      ? { telephone: siteConfig.social.phone || siteConfig.phone }
      : {}),
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6139,
      longitude: 77.209,
    },
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "Country",
        name: "Worldwide",
      },
    ],
    founder: {
      "@id": `${baseUrl}/#person`,
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      ...(siteConfig.social.twitter ? [siteConfig.social.twitter] : []),
      ...(siteConfig.social.facebook ? [siteConfig.social.facebook] : []),
      ...(siteConfig.social.instagram ? [siteConfig.social.instagram] : []),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering & Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-Stack Web Development (Next.js, React, TypeScript)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Local AI & Systems Engineering (Rust, Tauri, ONNX)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CMS & E-Commerce Engineering (WordPress, Shopify)",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}

/**
 * ProfilePage Schema for /about
 */
export function AboutJsonLd() {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/about/#webpage`,
    url: `${baseUrl}/about`,
    name: "About & Engineering Philosophy — Suyash Sharma",
    description:
      "Background, technical approach, and verified engineering experience of Suyash Sharma.",
    mainEntity: {
      "@id": `${baseUrl}/#person`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
    />
  );
}

/**
 * ItemList / CreativeWork Schema for /work
 */
export function WorkJsonLd() {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${baseUrl}/work/#itemlist`,
    name: "Selected Software & Production Systems by Suyash Sharma",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.summary,
        applicationCategory: project.category,
        url: project.liveUrl || project.githubUrl || `${baseUrl}/work`,
        creator: {
          "@id": `${baseUrl}/#person`,
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  );
}

/**
 * ContactPage Schema for /contact
 */
export function ContactJsonLd() {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${baseUrl}/contact/#webpage`,
    url: `${baseUrl}/contact`,
    name: "Contact & Inquiries — Suyash Sharma",
    description:
      "Direct transmission channels, availability, and inquiries for Suyash Sharma.",
    mainEntity: {
      "@id": `${baseUrl}/#person`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
    />
  );
}
