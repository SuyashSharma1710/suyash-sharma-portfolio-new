import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#090a0f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Suyash — Digital Engineer",
  description: "Digital Engineer building products where engineering, design, and intelligence meet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      {/* suppressHydrationWarning silences attribute mismatches caused by browser
          extensions that inject attributes (e.g. cz-shortcut-listen, data-gr-*)
          onto <body> before React hydrates. This does not suppress child mismatches. */}
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div id="root-container">{children}</div>
      </body>
    </html>
  );
}
