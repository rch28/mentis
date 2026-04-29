"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, ClipboardCheck, Target } from "lucide-react";

import { mentalModels, type MentalModel } from "@/data/modelsData";
import { SectionHeader } from "@/components/ui/section-header";

type Goal = "decision" | "problem" | "strategic" | "bias";

const goals: { id: Goal; label: string; cue: string }[] = [
  { id: "decision", label: "Choose", cue: "weigh options under uncertainty" },
  { id: "problem", label: "Diagnose", cue: "find the root cause" },
  { id: "strategic", label: "Plan", cue: "shape a longer-term system" },
  { id: "bias", label: "Check", cue: "reduce blind spots and bad assumptions" },
];

const modelPrompts: Record<string, string> = {
  "first-principles":
    "What facts remain true if every inherited assumption is removed?",
  "second-order":
    "What happens next, and what happens after that, if this choice works?",
  inversion: "What would make this fail, and how can you prevent that today?",
  pareto: "Which small set of inputs is producing most of the result?",
  "systems-thinking":
    "Which feedback loops are reinforcing or limiting the outcome?",
  "confirmation-bias": "What evidence would change your mind?",
  "opportunity-cost": "What are you saying no to by choosing this?",
  "five-whys": "Why did this happen, and why did that cause exist?",
};

function scoreModel(model: MentalModel, goal: Goal, challenge: string) {
  let score = model.category === goal ? 4 : 0;
  const text = `${model.name} ${model.shortDesc}`.toLowerCase();
  const terms = challenge.toLowerCase().split(/\W+/).filter(Boolean);

  for (const term of terms) {
    if (term.length > 3 && text.includes(term)) score += 1;
  }

  if (/risk|fail|avoid|mistake|wrong|loss/.test(challenge)) {
    if (["inversion", "margin-safety", "sunk-cost"].includes(model.id)) {
      score += 3;
    }
  }

  if (/priority|focus|time|resource|effort/.test(challenge)) {
    if (["pareto", "eisenhower", "opportunity-cost"].includes(model.id)) {
      score += 3;
    }
  }

  return score;
}

const DecisionCoach: React.FC = () => {
  const [goal, setGoal] = useState<Goal>("decision");
  const [challenge, setChallenge] = useState("");

  const recommendations = useMemo(() => {
    return [...mentalModels]
      .sort((a, b) => scoreModel(b, goal, challenge) - scoreModel(a, goal, challenge))
      .slice(0, 3);
  }, [challenge, goal]);

  return (
    <section
      id="coach"
      className="py-20 lg:py-28 bg-linear-to-b from-[#0f1828] to-[#0b1220]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="— Decision Coach"
          title={
            <>
              Turn a Real Problem Into{" "}
              <em className="text-amber-200 italic font-light">Next Steps</em>
            </>
          }
          description="Describe what you are facing and Mentis will suggest a small model stack with concrete prompts you can use immediately."
        />

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Target className="w-4 h-4" aria-hidden="true" />
              Your Situation
            </div>
            <textarea
              value={challenge}
              onChange={(event) => setChallenge(event.target.value)}
              placeholder="Example: We need to decide whether to launch a new feature now or wait until onboarding improves."
              className="min-h-40 w-full resize-none rounded-xl border border-white/15 bg-white/5 p-4 text-sm leading-relaxed text-white placeholder:text-white/35 focus:border-amber-400/50 focus:outline-none"
            />
            <div className="mt-5 grid grid-cols-2 gap-2">
              {goals.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={goal === option.id}
                  onClick={() => setGoal(option.id)}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    goal === option.id
                      ? "border-amber-400/50 bg-amber-400/15"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="text-sm font-semibold text-white">
                    {option.label}
                  </div>
                  <div className="mt-1 text-xs text-white/45">{option.cue}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
              Recommended Stack
            </div>
            <div className="space-y-3">
              {recommendations.map((model, index) => (
                <div
                  key={model.id}
                  className="rounded-xl border border-white/10 bg-[#0f1828]/70 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider">
                        Step {index + 1}
                      </div>
                      <h3 className="mt-1 font-serif text-xl text-white">
                        {model.name}
                      </h3>
                    </div>
                    <span className="rounded-full border border-indigo-400/30 bg-indigo-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-200">
                      {model.category}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {model.shortDesc}
                  </p>
                  <div className="mt-4 rounded-lg border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-50/90">
                    {modelPrompts[model.id] ??
                      "What would this model reveal that your default thinking may miss?"}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#library")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#0f1828] hover:bg-amber-300"
            >
              Explore full library
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecisionCoach;
