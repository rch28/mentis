"use client";
import React, { useState } from "react";
import { X, Plus, GitCompare } from "lucide-react";
import { mentalModels, MentalModel } from "@/data/modelsData";

const Comparison: React.FC = () => {
  const [selected, setSelected] = useState<MentalModel[]>([
    mentalModels[0], // First Principles
    mentalModels[1], // Second Order
    mentalModels[2], // Inversion
  ]);
  const [picker, setPicker] = useState(false);

  const remove = (id: string) =>
    setSelected(selected.filter((s) => s.id !== id));
  const add = (m: MentalModel) => {
    if (selected.length >= 4) return;
    if (selected.find((s) => s.id === m.id)) return;
    setSelected([...selected, m]);
    setPicker(false);
  };

  const useCases: Record<string, string> = {
    decision: "Best for choosing between options",
    problem: "Best for diagnosing root causes",
    strategic: "Best for long-term planning",
    bias: "Best for self-correction",
  };

  const speeds: Record<string, string> = {
    Beginner: "Fast (~5 min)",
    Intermediate: "Medium (~15 min)",
    Advanced: "Deep (~30+ min)",
  };

  return (
    <section
      id="compare"
      className="py-24 lg:py-32 bg-linear-to-b from-[#0f1828] to-[#0b1220]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <div className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            — Comparison Matrix
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-5">
            Compare Models{" "}
            <em className="text-amber-200 italic font-light">Side-by-Side</em>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Pick up to 4 frameworks and instantly see how their use cases,
            complexity, and origins differ.
          </p>
        </div>

        <div className="bg-linear-to-br from-white/6 to-white/2 border border-white/10 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {selected.map((m) => (
              <div key={m.id} className="p-6 relative">
                <button
                  onClick={() => remove(m.id)}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 text-white/50 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="text-[10px] text-amber-300 uppercase tracking-wider font-semibold mb-3">
                  {m.category}
                </div>
                <h4 className="font-serif text-xl text-white leading-tight mb-4 pr-8">
                  {m.name}
                </h4>
                <div className="space-y-3 text-sm">
                  <Row label="Use Case" value={useCases[m.category]} />
                  <Row label="Complexity" value={m.difficulty} />
                  <Row label="Time" value={speeds[m.difficulty]} />
                  <Row label="Origin" value={m.origin} />
                </div>
                <p className="text-xs text-white/50 leading-relaxed mt-5 pt-4 border-t border-white/10">
                  {m.shortDesc}
                </p>
              </div>
            ))}

            {selected.length < 4 && (
              <button
                onClick={() => setPicker(true)}
                className="p-6 flex flex-col items-center justify-center gap-3 text-white/40 hover:text-white hover:bg-white/3 min-h-75 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 border-2 border-dashed border-white/15 flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="text-sm">Add a model to compare</div>
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-white/40 text-sm">
          <GitCompare className="w-4 h-4" />
          Comparing {selected.length} of 4 max
        </div>

        {/* Picker Modal */}
        {picker && (
          <div
            onClick={() => setPicker(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111c30] border border-white/10 rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-white">Add a Model</h3>
                <button
                  onClick={() => setPicker(false)}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {mentalModels
                  .filter((m) => !selected.find((s) => s.id === m.id))
                  .map((m) => (
                    <button
                      key={m.id}
                      onClick={() => add(m)}
                      className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <div className="font-serif text-white">{m.name}</div>
                      <div className="text-xs text-white/50 mt-1">
                        {m.origin}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">
      {label}
    </div>
    <div className="text-white/85">{value}</div>
  </div>
);

export default Comparison;
