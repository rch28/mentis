"use client";
import React, { useState } from "react";
import { X, Mail, Lock, User as UserIcon, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result =
      mode === "signin"
        ? await signIn(email, password)
        : await signUp(email, password, name);
    setLoading(false);
    if (result.error) setError(result.error);
    else {
      setAuthModalOpen(false);
      setEmail("");
      setPassword("");
      setName("");
    }
  };

  return (
    <div
      onClick={() => setAuthModalOpen(false)}
      className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111c30] border border-white/10 rounded-3xl max-w-md w-full p-8 lg:p-10 relative"
      >
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
            {mode === "signin" ? "Welcome back" : "Join Mentis"}
          </span>
        </div>

        <h2 className="font-serif text-3xl text-white mb-2">
          {mode === "signin" ? "Sign In" : "Create Your Account"}
        </h2>
        <p className="text-white/55 text-sm mb-7">
          {mode === "signin"
            ? "Access your saved models and case studies."
            : "Bookmark models and build your personal library."}
        </p>

        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 6 chars)"
              required
              minLength={6}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-[#0f1828] rounded-xl font-semibold transition-colors"
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/55">
          {mode === "signin" ? "Don't have an account? " : "Already a member? "}
          <button
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
            }}
            className="text-amber-300 hover:text-amber-200 font-semibold"
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
