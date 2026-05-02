import React from "react";

import BrandMark from "@/components/BrandMark";

const testimonials = [
  {
    id: "testimonial-1",
    quote:
      "Mentis helped me structure complex product decisions without second-guessing.",
    name: "Priya Nair",
    role: "Product Designer",
    avatar: "PN",
  },
  {
    id: "testimonial-2",
    quote:
      "The model library keeps my team aligned on how we think and decide.",
    name: "Marcus Chen",
    role: "Software Engineer",
    avatar: "MC",
  },
];

const features = [
  { id: "feat-1", icon: "🧠", label: "25+ decision frameworks" },
  { id: "feat-2", icon: "📚", label: "Case studies and real-world uses" },
  { id: "feat-3", icon: "🧭", label: "Guided prompts for better choices" },
  { id: "feat-4", icon: "⭐", label: "Save and revisit your library" },
];

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-shrink-0 bg-[#111c30] flex-col justify-between p-10 xl:p-14 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-white/3 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <BrandMark className="mb-10" />

        <h2 className="text-white text-3xl xl:text-4xl font-semibold leading-tight mb-4">
          Clarity for every decision.
        </h2>
        <p className="text-white/70 text-base leading-relaxed mb-10">
          Build confidence with proven mental models, step-by-step guides, and a
          personal library that keeps your thinking sharp.
        </p>

        <div className="space-y-3">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center gap-3">
              <span className="text-lg" role="img" aria-label={feature.label}>
                {feature.icon}
              </span>
              <span className="text-white/85 text-sm font-semibold">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 space-y-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
          >
            <p className="text-white/90 text-sm leading-relaxed mb-3 italic">
              &quot;{testimonial.quote}&quot;
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {testimonial.avatar}
                </span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-white/60 text-xs">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
