import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Mentis",
  description: "How Mentis handles account, bookmark, and newsletter data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="April 29, 2026">
      <p>
        Mentis collects the information needed to provide accounts, saved
        library items, and newsletter delivery. This can include your email
        address, display name, authentication identifiers, saved bookmarks, and
        newsletter preferences.
      </p>
      <h2>How Data Is Used</h2>
      <p>
        Account data is used to authenticate you and synchronize your saved
        library. Newsletter data is used to send learning material you request.
        Mentis does not sell personal data.
      </p>
      <h2>Third-Party Services</h2>
      <p>
        Mentis uses Supabase for authentication and bookmark storage. Newsletter
        subscriptions may be processed through a CRM/email service provider.
      </p>
      <h2>Your Choices</h2>
      <p>
        You can sign out at any time, remove saved items from your library, and
        unsubscribe from email messages using the link provided in those emails.
      </p>
    </LegalPage>
  );
}
