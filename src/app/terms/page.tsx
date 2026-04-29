import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use — Mentis",
  description: "Terms for using the Mentis mental models library.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="April 29, 2026">
      <p>
        Mentis provides educational content and decision-support prompts. It is
        not legal, financial, medical, or professional advice. You remain
        responsible for decisions made using the material.
      </p>
      <h2>Accounts</h2>
      <p>
        You are responsible for protecting your account credentials and for
        activity under your account.
      </p>
      <h2>Content</h2>
      <p>
        Mental models, prompts, guides, and examples are provided for learning
        and practical reflection. Do not rely on any single model as a complete
        substitute for context, data, and expert judgment.
      </p>
      <h2>Acceptable Use</h2>
      <p>
        Do not abuse, disrupt, scrape, or reverse engineer the service. Mentis
        may restrict access if usage harms the service or other users.
      </p>
    </LegalPage>
  );
}
