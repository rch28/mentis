"use client";
import React, { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { stepGuides } from "@/data/modelsData";
import { SectionHeader } from "@/components/ui/section-header";

const StepGuides: React.FC = () => {
  const [active, setActive] = useState(stepGuides[0].id);
  const [expanded, setExpanded] = useState<number | null>(0);

  const guide = stepGuides.find((g) => g.id === active)!;

  return (
    <section
      id="guides"
      className="py-24 lg:py-32 bg-linear-to-b from-[#0b1220] to-[#0f1828] relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="— Step-by-Step Guides"
          title={
            <>
              From Theory to{" "}
              <em className="text-amber-200 font-light italic">Practice</em>
            </>
          }
          description="Each framework distilled into a clear, sequential process. Follow along, see the example, apply it tonight."
          className="mb-14"
        />

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-2">
              {stepGuides.map((g, i) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setActive(g.id);
                    setExpanded(0);
                  }}
                  className={`w-full text-left p-5 rounded-2xl transition-all border ${
                    active === g.id
                      ? "bg-linear-to-br from-indigo-500/20 to-blue-600/10 border-indigo-400/40"
                      : "bg-white/3 border-white/5 hover:bg-white/6"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-serif text-sm ${active === g.id ? "bg-amber-400 text-[#0f1828]" : "bg-white/5 text-white/60"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div
                        className={`font-serif text-lg leading-tight ${active === g.id ? "text-white" : "text-white/80"}`}
                      >
                        {g.title}
                      </div>
                      <div className="text-xs text-white/45 mt-1">
                        {g.subtitle}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="lg:col-span-8">
            <div className="bg-linear-to-br from-white/6 to-white/2 border border-white/10 rounded-3xl p-8 lg:p-10">
              <div className="mb-8 pb-8 border-b border-white/10">
                <h3 className="font-serif text-3xl lg:text-4xl text-white mb-2">
                  {guide.title}
                </h3>
                <p className="text-white/60">{guide.subtitle}</p>
              </div>

              <div className="space-y-4">
                {guide.steps.map((step, i) => {
                  const isOpen = expanded === i;
                  return (
                    <div
                      key={i}
                      className={`border border-white/10 rounded-2xl overflow-hidden transition-all ${isOpen ? "bg-linear-to-br from-indigo-500/10 to-transparent" : "bg-white/2"}`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : i)}
                        className="w-full flex items-center gap-5 p-5 lg:p-6 text-left hover:bg-white/3 transition-colors"
                      >
                        <div
                          className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-serif text-lg transition-colors ${isOpen ? "bg-amber-400 text-[#0f1828]" : "bg-white/5 text-white/70"}`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1">
                          <div className="font-serif text-xl text-white">
                            {step.title}
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 pl-26 space-y-4">
                          <p className="text-white/70 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20">
                            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Real-World Example
                            </div>
                            <p className="text-amber-50/90 italic leading-relaxed">
                              &quot;{step.example}&quot;
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepGuides;
