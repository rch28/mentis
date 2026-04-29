"use client";
import React, { useState } from "react";
import {
  X,
  Bookmark,
  BookOpen,
  Layers,
  Trash2,
  LibraryBig,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const MyLibrary: React.FC = () => {
  const { myLibraryOpen, setMyLibraryOpen, bookmarks, toggleBookmark, user } =
    useAuth();
  const [tab, setTab] = useState<"all" | "model" | "case">("all");

  if (!myLibraryOpen) return null;

  const filtered =
    tab === "all" ? bookmarks : bookmarks.filter((b) => b.item_type === tab);

  return (
    <div
      onClick={() => setMyLibraryOpen(false)}
      className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 pt-20 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111c30] border border-white/10 rounded-3xl max-w-4xl w-full p-8 lg:p-10 relative my-8"
      >
        <button
          onClick={() => setMyLibraryOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-amber-400 to-amber-500 flex items-center justify-center">
            <LibraryBig className="w-5 h-5 text-[#0f1828]" />
          </div>
          <div>
            <h2 className="font-serif text-3xl text-white">My Library</h2>
            <p className="text-white/50 text-sm">{user?.email}</p>
          </div>
        </div>

        <p className="text-white/55 text-sm mb-7 mt-3">
          Your saved frameworks and case studies, ready when you need them.
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          {(
            [
              { id: "all", label: "All", count: bookmarks.length },
              {
                id: "model",
                label: "Models",
                count: bookmarks.filter((b) => b.item_type === "model").length,
              },
              {
                id: "case",
                label: "Case Studies",
                count: bookmarks.filter((b) => b.item_type === "case").length,
              },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-amber-400 text-[#0f1828]"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {t.label} <span className="opacity-60">({t.count})</span>
            </button>
          ))}
        </div>

        {/* Items */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-white mb-2">
              Nothing saved yet
            </h3>
            <p className="text-white/50 text-sm max-w-xs mx-auto">
              Browse the library and tap the bookmark icon on any model or case
              study to save it here.
            </p>
            <button
              onClick={() => {
                setMyLibraryOpen(false);
                document
                  .querySelector("#library")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-6 px-6 py-2.5 bg-amber-400 text-[#0f1828] rounded-full text-sm font-semibold"
            >
              Browse the Library
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-2">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="group bg-white/4 hover:bg-white/[0.07] border border-white/10 rounded-2xl p-5 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-300 uppercase tracking-wider font-semibold">
                    {b.item_type === "model" ? (
                      <Layers className="w-3 h-3" />
                    ) : (
                      <BookOpen className="w-3 h-3" />
                    )}
                    {b.item_type === "model" ? "Mental Model" : "Case Study"}
                  </div>
                  <button
                    onClick={() =>
                      toggleBookmark({
                        id: b.item_id,
                        type: b.item_type,
                        title: b.item_title,
                      })
                    }
                    className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-rose-300 transition-all"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="font-serif text-lg text-white leading-tight mb-2">
                  {b.item_title}
                </h4>
                {b.item_meta?.desc && (
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                    {b.item_meta.desc}
                  </p>
                )}
                {b.item_meta?.origin && (
                  <div className="text-[10px] text-white/35 mt-3 pt-3 border-t border-white/5">
                    {b.item_meta.origin}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
