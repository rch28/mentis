"use client";
import React, { useState } from "react";
import { Mail, Check, Sparkles } from "lucide-react";
import { IconInput } from "@/components/ui/icon-input";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      });
      if (!res.ok) throw new Error("Subscription failed");
      setStatus("success");
      setMessage("Welcome aboard. Check your inbox for your starter pathway.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Subscription is unavailable right now. Please try again.");
    }
  };

  return (
    <section
      id="newsletter"
      className="py-24 lg:py-32 bg-linear-to-b from-[#0b1220] to-[#0f1828] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.18),transparent_60%)]" />
      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative">
        <div className="bg-linear-to-br from-indigo-600/20 via-[#111c30] to-[#0f1828] border border-white/10 rounded-3xl p-10 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
                  Premium Pathway
                </span>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight tracking-tight mb-5">
                One Mental Model.
                <br />
                Every Sunday.
              </h2>
              <p className="text-white/65 leading-relaxed mb-6">
                Join 18,000+ thinkers receiving a weekly deep-dive: one model,
                one example, one prompt to apply it. Plus your personalized
                learning pathway based on where you are now.
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                {[
                  "Weekly model breakdown (5-min read)",
                  "Curated examples from history & business",
                  "Member-only worksheets and templates",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

              <div>
                <form onSubmit={submit} className="space-y-3">
                  <IconInput
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setStatus("idle");
                    }}
                    placeholder="your@email.com"
                    icon={<Mail className="w-4 h-4" aria-hidden="true" />}
                    rounded="full"
                    required
                    className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/15 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition-all"
                  />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-[#0f1828] rounded-full font-semibold transition-colors shadow-xl shadow-amber-400/20"
                >
                  {status === "loading"
                    ? "Subscribing..."
                    : status === "success"
                      ? "Subscribed ✓"
                      : "Get the Sunday Pathway"}
                </button>
                {message && (
                  <p
                    className={`text-sm text-center ${status === "error" ? "text-rose-300" : "text-emerald-300"}`}
                  >
                    {message}
                  </p>
                )}
                <p className="text-xs text-white/40 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
