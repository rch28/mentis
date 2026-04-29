"use client";
import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

const heroBg =
  "https://d64gsuwffb70l.cloudfront.net/69ecc440c8cde95900318958_1777124617474_56b8cbe3.jpg";

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0f1828]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
          width={1000}
          height={1000}
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0f1828] via-[#0f1828]/70 to-[#0f1828]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium text-white/80 tracking-wider uppercase">
              A premium thinking framework
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-8">
            Master the Art of
            <span className="block mt-2 bg-linear-to-r from-indigo-300 via-blue-300 to-amber-200 bg-clip-text text-transparent italic">
              Systems Thinking
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10 font-light">
            A curated library of 25+ mental models that transform how you
            decide, solve, and strategize. Step-by-step guides, real-world case
            studies, and the frameworks thoughtful operators rely on.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollTo("#library")}
              className="group inline-flex items-center gap-2 px-7 py-4 bg-amber-400 hover:bg-amber-300 text-[#0f1828] rounded-full font-semibold shadow-2xl shadow-amber-400/20 transition-all hover:scale-[1.02]"
            >
              Explore the Library
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#guides")}
              className="inline-flex items-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-full font-semibold backdrop-blur-sm transition-all"
            >
              See the Step-by-Step
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-16 max-w-xl">
            {[
              { num: "25+", label: "Mental Models" },
              { num: "8", label: "Step Guides" },
              { num: "7", label: "Case Studies" },
            ].map((s) => (
              <div key={s.label} className="border-l border-white/15 pl-4">
                <div className="font-serif text-3xl text-white">{s.num}</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative diagram */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="relative aspect-square">
            {/* Center node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-linear-to-br from-indigo-500 to-blue-600 shadow-2xl shadow-indigo-500/40 flex items-center justify-center z-10">
              <span className="font-serif text-white text-xl text-center leading-tight">
                Systems
                <br />
                Thinking
              </span>
            </div>
            {/* Orbiting nodes */}
            {[
              {
                label: "Decision",
                top: "5%",
                left: "40%",
                color: "from-amber-400 to-amber-500",
              },
              {
                label: "Strategy",
                top: "40%",
                left: "85%",
                color: "from-blue-400 to-blue-500",
              },
              {
                label: "Problem",
                top: "85%",
                left: "50%",
                color: "from-indigo-400 to-indigo-500",
              },
              {
                label: "Bias",
                top: "40%",
                left: "0%",
                color: "from-purple-400 to-purple-500",
              },
            ].map((n) => (
              <div
                key={n.label}
                className={`absolute w-24 h-24 rounded-full bg-linear-to-br ${n.color} shadow-xl flex items-center justify-center text-white font-medium text-sm hover:scale-110 transition-transform cursor-pointer`}
                style={{ top: n.top, left: n.left }}
              >
                {n.label}
              </div>
            ))}
            {/* SVG connection lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="50"
                y1="50"
                x2="48"
                y2="13"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.3"
                strokeDasharray="1 1"
              />
              <line
                x1="50"
                y1="50"
                x2="92"
                y2="48"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.3"
                strokeDasharray="1 1"
              />
              <line
                x1="50"
                y1="50"
                x2="58"
                y2="92"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.3"
                strokeDasharray="1 1"
              />
              <line
                x1="50"
                y1="50"
                x2="8"
                y2="48"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.3"
                strokeDasharray="1 1"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
