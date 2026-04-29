import Link from "next/link";
import type { ReactNode } from "react";

import BrandMark from "@/components/BrandMark";

interface LegalPageProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#0f1828] px-6 py-10 text-white lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex">
          <BrandMark />
        </Link>
        <div className="mt-14 border-b border-white/10 pb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
            Mentis Policy
          </div>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-white/45">Updated {updated}</p>
        </div>
        <div className="prose prose-invert prose-neutral mt-8 max-w-none prose-headings:font-serif prose-a:text-amber-300">
          {children}
        </div>
      </div>
    </main>
  );
}
