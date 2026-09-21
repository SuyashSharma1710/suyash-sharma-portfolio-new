import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav/Nav";
import { ThemeProvider, themeScript } from "@/components/theme/ThemeProvider";
import { SoundProvider } from "@/components/sound/SoundProvider";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CursorTracker } from "@/lib/motion/components/CursorTracker";
import { Preloader } from "@/components/ui/Preloader";
import { PageTransitionProvider } from "@/components/transitions/PageTransitionProvider";
import { RootJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — Suyash Sharma | Full-Stack Engineer`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale || "en_IN",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@SuyashSHARMA170",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "eN202awJpSwdDL2JMo77-bXvOug-4yMtPPZP74huKO4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline script prevents flash of wrong theme before hydration */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Structured Schema.org JSON-LD */}
        <RootJsonLd />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <SoundProvider>
            <Preloader />
            <CursorTracker />
            <PageTransitionProvider>
              <Nav />
              <SmoothScrollProvider>
                <ScrollRevealProvider>
                  <div id="root-container">
                    <main id="main-content" tabIndex={-1}>
                      {children}
                    </main>
                  </div>
                </ScrollRevealProvider>
              </SmoothScrollProvider>
            </PageTransitionProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
