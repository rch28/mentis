import React from "react";
import { Brain,  Rss } from "lucide-react";
import { LuTwitter, LuLinkedin, LuGithub } from "react-icons/lu";

const Footer: React.FC = () => {
  const cols = [
    {
      title: "Library",
      links: [
        "All Models",
        "Decision-Making",
        "Problem-Solving",
        "Strategic Thinking",
        "Cognitive Biases",
      ],
    },
    {
      title: "Learn",
      links: [
        "Step Guides",
        "Case Studies",
        "Comparison Tool",
        "Resources",
        "Pathways",
      ],
    },
    {
      title: "Company",
      links: ["About", "Philosophy", "Contact", "Press", "Careers"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Cookies", "Accessibility", "Imprint"],
    },
  ];

  return (
    <footer className="bg-[#080f1c] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="text-white">
                <div className="font-serif text-xl">Mentis</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-indigo-300/80">
                  Systems Thinking
                </div>
              </div>
            </div>
            <p className="text-white/55 leading-relaxed text-sm max-w-sm mb-6">
              A premium library of mental models for the world's most thoughtful
              operators, founders, and leaders.
            </p>
            <div className="flex gap-3">
              {[LuTwitter, LuLinkedin, LuGithub, Rss].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
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
                    <li key={l}>
                      <a
                        href="#"
                        className="text-white/50 hover:text-white text-sm transition-colors"
                      >
                        {l}
                      </a>
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
            "The map is not the territory." — Korzybski
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
