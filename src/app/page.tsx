/**
 * Homepage — /
 * Narrative order per RULES.md Rule 5 and Master Plan §8:
 * 01 Hero → 02 Positioning → 03 SelectedWork → 04 Capabilities →
 * 05 Engineering → 06 Experience → 07 Lab → 08 About → 09 FinalCTA → 10 Footer
 */
import type { Metadata } from "next";
import { Hero }          from "@/components/hero/Hero";
import { Positioning }   from "@/components/positioning/Positioning";
import { SelectedWork }  from "@/components/work/SelectedWork";
import { Capabilities }  from "@/components/capabilities/Capabilities";
import { Engineering }   from "@/components/engineering/Engineering";
import { Experience }    from "@/components/experience/Experience";
import { Lab }           from "@/components/lab/Lab";
import { About }         from "@/components/about/About";
import { FinalCTA }      from "@/components/cta/FinalCTA";
import { Footer }        from "@/components/footer/Footer";
import { siteConfig }    from "@/content/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <SelectedWork />
      <Capabilities />
      <Engineering />
      <Experience />
      <Lab />
      <About />
      <FinalCTA />
      <Footer />
    </>
  );
}
