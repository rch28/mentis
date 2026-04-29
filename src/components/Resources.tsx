"use client";
import React, { useState } from "react";
import { BookOpen, FileText, Video, ExternalLink } from "lucide-react";

const bookImages = [
  "https://d64gsuwffb70l.cloudfront.net/69ecc440c8cde95900318958_1777124720875_4ce5d591.png",
  "https://d64gsuwffb70l.cloudfront.net/69ecc440c8cde95900318958_1777124712975_fb4cc05e.jpg",
  "https://d64gsuwffb70l.cloudfront.net/69ecc440c8cde95900318958_1777124720989_0185f82d.png",
];

interface Resource {
  type: "book" | "article" | "video";
  title: string;
  author: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  desc: string;
  link: string;
}

const resources: Resource[] = [
  {
    type: "book",
    title: "Thinking in Systems",
    author: "Donella H. Meadows",
    level: "Beginner",
    desc: "The definitive primer on systems thinking, written with rare clarity and warmth.",
    link: "https://www.goodreads.com/book/show/3828902-thinking-in-systems",
  },
  {
    type: "book",
    title: "Poor Charlie's Almanack",
    author: "Charlie Munger",
    level: "Intermediate",
    desc: "Munger's lifetime collection of mental models and worldly wisdom.",
    link: "https://www.goodreads.com/book/show/944652.Poor_Charlie_s_Almanack",
  },
  {
    type: "book",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    level: "Intermediate",
    desc: "Nobel-winning exploration of System 1 and System 2 thinking.",
    link: "https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow",
  },
  {
    type: "article",
    title: "Leverage Points: Places to Intervene in a System",
    author: "Donella Meadows",
    level: "Advanced",
    desc: "The seminal essay ranking 12 leverage points by their power to change systems.",
    link: "https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/",
  },
  {
    type: "article",
    title: "The Great Mental Models",
    author: "Farnam Street",
    level: "Beginner",
    desc: "A curated index introducing dozens of foundational frameworks.",
    link: "https://fs.blog/mental-models/",
  },
  {
    type: "article",
    title: "First Principles Thinking",
    author: "James Clear",
    level: "Beginner",
    desc: "A practical breakdown of how to reason from fundamentals like Aristotle and Musk.",
    link: "https://jamesclear.com/first-principles",
  },
  {
    type: "video",
    title: "How to Build a Mental Model",
    author: "Shane Parrish",
    level: "Beginner",
    desc: "A 20-minute talk on assembling your latticework of frameworks.",
    link: "https://fs.blog/",
  },
  {
    type: "video",
    title: "Systems Thinking Masterclass",
    author: "MIT OpenCourseWare",
    level: "Advanced",
    desc: "Lecture series covering feedback loops, stocks/flows, and dynamics.",
    link: "https://ocw.mit.edu/",
  },
  {
    type: "book",
    title: "Antifragile",
    author: "Nassim Nicholas Taleb",
    level: "Advanced",
    desc: "How systems gain from disorder, volatility, and stress.",
    link: "https://www.goodreads.com/book/show/13530973-antifragile",
  },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  Intermediate: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  Advanced: "bg-rose-500/15 text-rose-300 border-rose-400/30",
};

const typeIcons: Record<string, React.ReactNode> = {
  book: <BookOpen className="w-4 h-4" />,
  article: <FileText className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
};

const Resources: React.FC = () => {
  const [filter, setFilter] = useState<
    "all" | "Beginner" | "Intermediate" | "Advanced"
  >("all");

  const filtered =
    filter === "all" ? resources : resources.filter((r) => r.level === filter);

  return (
    <section id="resources" className="py-24 lg:py-32 bg-[#0b1220]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <div className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            — Curated Resources
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-5">
            Continue Your{" "}
            <em className="text-amber-200 italic font-light">Pathway</em>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            A handpicked library of books, essays, and lectures—organized by
            depth so you can grow at your pace.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-10">
          {(["all", "Beginner", "Intermediate", "Advanced"] as const).map(
            (l) => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === l
                    ? "bg-amber-400 text-[#0f1828]"
                    : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                }`}
              >
                {l === "all" ? "All Levels" : l}
              </button>
            ),
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r, i) => (
            <a
              key={i}
              href={r.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-linear-to-br from-white/[0.07] to-white/2 hover:from-white/12 hover:to-white/2 border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 duration-300"
            >
              {r.type === "book" && (
                <div className="aspect-4/3 overflow-hidden bg-[#0f1828]">
                  <img
                    src={bookImages[i % bookImages.length]}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/50 uppercase tracking-wider">
                    {typeIcons[r.type]}
                    {r.type}
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${levelColors[r.level]}`}
                  >
                    {r.level}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-white group-hover:text-amber-200 transition-colors leading-tight mb-1">
                  {r.title}
                </h3>
                <div className="text-xs text-white/40 mb-3">by {r.author}</div>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  {r.desc}
                </p>
                <div className="flex items-center gap-1.5 text-amber-300 text-sm font-medium">
                  Open resource <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
