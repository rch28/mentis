import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility — Mentis",
  description: "Accessibility commitments and current support in Mentis.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility" updated="April 29, 2026">
      <p>
        Mentis aims to provide an interface that works with keyboard navigation,
        screen readers, and common browser accessibility settings.
      </p>
      <h2>Current Support</h2>
      <p>
        Core actions use semantic buttons and links, dialogs are labeled, and
        form feedback is presented inline. The interface avoids relying only on
        color to communicate saved or selected states.
      </p>
      <h2>Known Work</h2>
      <p>
        Future improvements should include deeper automated accessibility tests,
        reduced-motion tuning, and regular contrast audits as the visual system
        evolves.
      </p>
      <h2>Feedback</h2>
      <p>
        Accessibility issues should be treated as product bugs and prioritized
        with the same rigor as functional defects.
      </p>
    </LegalPage>
  );
}
