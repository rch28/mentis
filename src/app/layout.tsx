import type { Metadata } from "next";
import "./globals.css";
import App from "./App";

export const metadata: Metadata = {
  title: "Mentis — Master the Art of Systems Thinking",
  description:
    "A premium library of 25+ mental models with step-by-step guides, case studies, and a comparison matrix for sharper decisions.",
  openGraph: {
    title: "Mentis — Master the Art of Systems Thinking",
    description:
      "Apply mental models with guided prompts, real-world cases, and a personal library.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col">
        <App>{children}</App>
      </body>
    </html>
  );
}
