"use client";
import React, { useState } from "react";
import { Mail, Lock, User as UserIcon, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { IconInput } from "@/components/ui/icon-input";
import { ModalShell } from "@/components/ui/modal-shell";

const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authMode,
    setAuthMode,
    signIn,
    signUp,
  } = useAuth();
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
      authMode === "signin"
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
    <ModalShell
      open={authModalOpen}
      onOpenChange={setAuthModalOpen}
      title={authMode === "signin" ? "Sign in to Mentis" : "Create a Mentis account"}
      className="max-w-md"
    >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
            {authMode === "signin" ? "Welcome back" : "Join Mentis"}
          </span>
        </div>

        <h2 className="font-serif text-3xl text-white mb-2">
          {authMode === "signin" ? "Sign In" : "Create Your Account"}
        </h2>
        <p className="text-white/55 text-sm mb-7">
          {authMode === "signin"
            ? "Access your saved models and case studies."
            : "Bookmark models and build your personal library."}
        </p>

        <form onSubmit={submit} className="space-y-3">
          {authMode === "signup" && (
            <IconInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              icon={<UserIcon className="w-4 h-4" aria-hidden="true" />}
              autoComplete="name"
            />
          )}
          <IconInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            icon={<Mail className="w-4 h-4" aria-hidden="true" />}
            autoComplete="email"
          />
          <IconInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            required
            minLength={6}
            icon={<Lock className="w-4 h-4" aria-hidden="true" />}
            autoComplete={authMode === "signin" ? "current-password" : "new-password"}
          />

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
              : authMode === "signin"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/55">
          {authMode === "signin" ? "Do not have an account? " : "Already a member? "}
          <button
            onClick={() => {
              setAuthMode(authMode === "signin" ? "signup" : "signin");
              setError("");
            }}
            className="text-amber-300 hover:text-amber-200 font-semibold"
          >
            {authMode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </div>
    </ModalShell>
  );
};

export default AuthModal;
