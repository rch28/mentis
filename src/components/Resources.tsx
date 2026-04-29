"use client";
import React, { useState } from "react";
import { BookOpen, FileText, Video, ExternalLink } from "lucide-react";
import Image from "next/image";

import { bookImages, resources } from "@/data/resourcesData";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { SectionHeader } from "@/components/ui/section-header";

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
        <SectionHeader
          eyebrow="— Curated Resources"
          title={
            <>
              Continue Your{" "}
              <em className="text-amber-200 italic font-light">Pathway</em>
            </>
          }
          description="A handpicked library of books, essays, and lectures organized by depth so you can grow at your pace."
        />

        <FilterTabs
          options={[
            { id: "all", label: "All Levels" },
            { id: "Beginner", label: "Beginner" },
            { id: "Intermediate", label: "Intermediate" },
            { id: "Advanced", label: "Advanced" },
          ]}
          value={filter}
          onChange={setFilter}
          ariaLabel="Filter resources by level"
          className="mb-10"
        />

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
                <div className="relative aspect-4/3 overflow-hidden bg-[#0f1828]">
                  <Image
                    src={bookImages[i % bookImages.length]}
                    alt={r.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
