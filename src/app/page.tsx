"use client";

import { SiteHeader } from "@/components/defense/site-header";
import { Hero } from "@/components/defense/hero";
import { TocSection } from "@/components/defense/toc";
import { IntroSection } from "@/components/defense/intro";
import { ProblemSection } from "@/components/defense/problem";
import { GoalSection } from "@/components/defense/goals";
import { BackgroundSection } from "@/components/defense/background-timeline";
import { ChaptersSection } from "@/components/defense/chapters";
import { ReferencesSection } from "@/components/defense/references";
import { ThanksSection, SiteFooter } from "@/components/defense/thanks";
import { PresentationOverlay } from "@/components/defense/presentation/presentation-overlay";

export default function DefensePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TocSection />
        <IntroSection />
        <ProblemSection />
        <GoalSection />
        <BackgroundSection />
        <ChaptersSection />
        <ReferencesSection />
        <ThanksSection />
      </main>
      <SiteFooter />
      <PresentationOverlay />
    </div>
  );
}
