"use client";
import React, { useState } from "react";
import { ArrowRight, TrendingUp, TrendingDown, Bookmark } from "lucide-react";
import { caseStudies } from "@/data/modelsData";
import { useAuth } from "@/contexts/AuthContext";

const CaseStudies: React.FC = () => {
  const [active, setActive] = useState(0);
  const study = caseStudies[active];
  const { isBookmarked, toggleBookmark } = useAuth();
  const saved = isBookmarked(study.id, "case");

  const handleSave = () => {
    toggleBookmark({
      id: study.id,
      type: "case",
      title: study.title,
      meta: {
        desc: study.outcome,
        origin: study.model,
        industry: study.industry,
      },
    });
  };

  return (
    <section
      id="cases"
      className="py-24 lg:py-32 bg-[#0f1828] relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-amber-400/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              — Models in Action
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-5">
              Real Decisions.
              <br />
              Real Outcomes.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              See how the world's most consequential thinkers applied these
              models—and the cascading impact of their choices.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-2">
            {caseStudies.map((c, i) => {
              const cSaved = isBookmarked(c.id, "case");
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all relative ${
                    active === i
                      ? "bg-linear-to-br from-amber-400/15 to-amber-500/5 border-amber-400/40"
                      : "bg-white/3 border-white/5 hover:bg-white/6"
                  }`}
                >
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                    {c.industry}
                  </div>
                  <div
                    className={`font-serif text-lg pr-7 ${active === i ? "text-white" : "text-white/80"}`}
                  >
                    {c.title}
                  </div>
                  <div className="text-xs text-indigo-300/80 mt-1">
                    {c.model}
                  </div>
                  {cSaved && (
                    <Bookmark className="absolute top-4 right-4 w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <div className="bg-linear-to-br from-white/[0.07] to-white/2 border border-white/10 rounded-3xl p-8 lg:p-12">
              <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                    {study.model}
                  </span>
                  <span className="text-white/40 text-sm">
                    {study.industry}
                  </span>
                </div>
                <button
                  onClick={handleSave}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    saved
                      ? "bg-amber-400 text-[#0f1828]"
                      : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${saved ? "fill-current" : ""}`}
                  />
                  {saved ? "Saved" : "Save"}
                </button>
              </div>

              <h3 className="font-serif text-3xl lg:text-4xl text-white mb-8 leading-tight">
                {study.title}
              </h3>

              <div className="grid md:grid-cols-2 gap-5 mb-8">
                <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20">
                  <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
                    <TrendingDown className="w-4 h-4" />
                    Before
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    {study.before}
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                    <TrendingUp className="w-4 h-4" />
                    After (Applying the Model)
                  </div>
                  <p className="text-white/80 leading-relaxed">{study.after}</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-linear-to-br from-amber-400/10 to-transparent border border-amber-400/20">
                <div className="text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  The Outcome
                </div>
                <p className="text-amber-50 text-lg font-serif italic leading-relaxed">
                  "{study.outcome}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
