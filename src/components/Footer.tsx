import React from "react";
import Link from "next/link";
import { Rss } from "lucide-react";

import BrandMark from "@/components/BrandMark";

const Footer: React.FC = () => {
  const cols = [
    {
      title: "Library",
      links: [
        { label: "All Models", href: "#library" },
        { label: "Decision-Making", href: "#library" },
        { label: "Problem-Solving", href: "#library" },
        { label: "Strategic Thinking", href: "#library" },
        { label: "Cognitive Biases", href: "#library" },
      ],
    },
    {
      title: "Learn",
      links: [
        { label: "Decision Coach", href: "#coach" },
        { label: "Step Guides", href: "#guides" },
        { label: "Case Studies", href: "#cases" },
        { label: "Comparison Tool", href: "#compare" },
        { label: "Resources", href: "#resources" },
        { label: "Newsletter", href: "#newsletter" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#top" },
        { label: "Philosophy", href: "#guides" },
        { label: "Contact", href: "#newsletter" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Accessibility", href: "/accessibility" },
      ],
    },
  ];

  return (
    <footer className="bg-[#080f1c] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <BrandMark className="mb-5" />
            <p className="text-white/55 leading-relaxed text-sm max-w-sm mb-6">
              A premium library of mental models for thoughtful operators,
              founders, and leaders.
            </p>
            <div className="flex gap-3">
              <a
                href="#newsletter"
                aria-label="Weekly pathway"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-white text-sm font-semibold mb-4">
                  {c.title}
                </div>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-white/50 hover:text-white text-sm transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-white/40 text-xs">
            © {new Date().getFullYear()} Mentis. All rights reserved. Crafted
            for thinkers.
          </div>
          <div className="text-white/40 text-xs italic font-serif">
            &quot;The map is not the territory.&quot; - Korzybski
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
