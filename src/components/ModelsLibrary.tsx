"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Network,
  Lightbulb,
  AlertTriangle,
  Filter,
  Bookmark,
} from "lucide-react";
import { mentalModels, categories, MentalModel } from "@/data/modelsData";
import { useAuth } from "@/contexts/AuthContext";

const categoryIcons: Record<string, React.ReactNode> = {
  decision: <BookOpen className="w-4 h-4" />,
  problem: <Lightbulb className="w-4 h-4" />,
  strategic: <Network className="w-4 h-4" />,
  bias: <AlertTriangle className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  decision:
    "from-amber-400/20 to-amber-500/5 border-amber-400/30 text-amber-300",
  problem:
    "from-emerald-400/20 to-emerald-500/5 border-emerald-400/30 text-emerald-300",
  strategic:
    "from-indigo-400/20 to-indigo-500/5 border-indigo-400/30 text-indigo-300",
  bias: "from-rose-400/20 to-rose-500/5 border-rose-400/30 text-rose-300",
};

const ModelsLibrary: React.FC = () => {
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MentalModel | null>(null);
  const { isBookmarked, toggleBookmark } = useAuth();

  const filtered = useMemo(() => {
    return mentalModels.filter((m) => {
      const matchCat = activeCat === "all" || m.category === activeCat;
      const matchQ =
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.shortDesc.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [activeCat, query]);

  const handleBookmark = (e: React.MouseEvent, m: MentalModel) => {
    e.stopPropagation();
    toggleBookmark({
      id: m.id,
      type: "model",
      title: m.name,
      meta: {
        desc: m.shortDesc,
        origin: m.origin,
        category: m.category,
        difficulty: m.difficulty,
      },
    });
  };

  return (
    <section
      id="library"
      className="py-24 lg:py-32 bg-[#0b1220] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              — The Library
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-5">
              25+ Frameworks.
              <br />
              One Sharper Mind.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Filter by domain, search by name, click to dive deeper. Bookmark
              any model to save it to your personal library.
            </p>
          </div>
          <div className="text-white/40 text-sm">
            Showing{" "}
            <span className="text-white font-semibold">{filtered.length}</span>{" "}
            of {mentalModels.length}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models, concepts, originators..."
              className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-400/50 focus:bg-white/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-white/40 mr-1" />
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCat === c.id
                    ? "bg-amber-400 text-[#0f1828]"
                    : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((m, i) => {
            const saved = isBookmarked(m.id, "model");
            return (
              <div
                key={m.id}
                className="group relative bg-linear-to-br from-white/[0.07] to-white/2 hover:from-white/12 hover:to-white/4 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all hover:-translate-y-1 duration-300"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <button
                  onClick={(e) => handleBookmark(e, m)}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    saved
                      ? "bg-amber-400 text-[#0f1828]"
                      : "bg-white/5 hover:bg-white/15 text-white/50 hover:text-white"
                  }`}
                  title={saved ? "Remove bookmark" : "Save to My Library"}
                >
                  <Bookmark
                    className={`w-4 h-4 ${saved ? "fill-current" : ""}`}
                  />
                </button>

                <button
                  onClick={() => setSelected(m)}
                  className="text-left w-full"
                >
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-linear-to-br border ${categoryColors[m.category]} mb-4`}
                  >
                    {categoryIcons[m.category]}
                    {categories.find((c) => c.id === m.category)?.label}
                  </div>
                  <h3 className="font-serif text-xl text-white leading-tight mb-3 pr-10 group-hover:text-amber-200 transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed mb-5 line-clamp-3">
                    {m.shortDesc}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-4 border-t border-white/10">
                    <span className="text-white/40">{m.origin}</span>
                    <span className="text-indigo-300 font-medium">
                      {m.difficulty}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/50">
            No models match your search.
          </div>
        )}
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111c30] border border-white/10 rounded-3xl max-w-2xl w-full p-8 lg:p-10 relative"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
            >
              ×
            </button>
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-linear-to-br border ${categoryColors[selected.category]} mb-5`}
            >
              {categoryIcons[selected.category]}
              {categories.find((c) => c.id === selected.category)?.label}
            </div>
            <h3 className="font-serif text-3xl text-white mb-4">
              {selected.name}
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">
              {selected.shortDesc}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Origin
                </div>
                <div className="text-white">{selected.origin}</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Difficulty
                </div>
                <div className="text-white">{selected.difficulty}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={(e) => handleBookmark(e, selected)}
                className={`flex-1 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isBookmarked(selected.id, "model")
                    ? "bg-amber-400 text-[#0f1828]"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked(selected.id, "model") ? "fill-current" : ""}`}
                />
                {isBookmarked(selected.id, "model")
                  ? "Saved"
                  : "Save to Library"}
              </button>
              <button
                onClick={() => {
                  setSelected(null);
                  document
                    .querySelector("#guides")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-[#0f1828] rounded-full font-semibold transition-colors"
              >
                See Step Guides
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ModelsLibrary;
