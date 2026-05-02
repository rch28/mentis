"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import AuthBrandPanel from "./AuthBrandPanel";
import DemoCredentials from "./DemoCredentials";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import type { AuthMode } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";

interface AuthScreenProps {
  initialMode?: AuthMode;
  redirectTo?: string;
}

export default function AuthScreen({
  initialMode = "signin",
  redirectTo = "/dashboard",
}: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<AuthMode>(initialMode);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setGoogleError("");
    try {
      const result = await signInWithGoogle(redirectTo);
      if (result.error) {
        setGoogleError(result.error);
        setGoogleLoading(false);
      }
    } catch {
      setGoogleError("Google sign-in could not be started. Try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f7f5f2] text-[#1c1917]">
      <AuthBrandPanel />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12 xl:px-16 min-h-screen overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-[#111c30] flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-semibold">M</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">Mentis</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2">
              {activeTab === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-[#6b645c]">
              {activeTab === "signin"
                ? "Sign in to access your saved models and case studies."
                : "Join Mentis and build your personal decision library."}
            </p>
          </div>

          <div className="flex bg-white rounded-xl p-1 mb-8 border border-[#e3ded6] shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("signin")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "signin"
                  ? "bg-[#111c30] text-white"
                  : "text-[#6b645c] hover:text-[#111c30]"
              }`}
              aria-pressed={activeTab === "signin"}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === "signup"
                  ? "bg-[#111c30] text-white"
                  : "text-[#6b645c] hover:text-[#111c30]"
              }`}
              aria-pressed={activeTab === "signup"}
            >
              Create Account
            </button>
          </div>

          {googleError && (
            <div
              className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2 mb-6"
              role="alert"
            >
              <span className="text-rose-600 text-sm">!</span>
              <p className="text-rose-600 text-sm font-medium">{googleError}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#e3ded6] bg-white hover:bg-[#f0ebe5] transition-all duration-150 active:scale-[0.98] mb-6 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Continue with Google"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.805.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            {googleLoading && <Loader2 size={16} className="animate-spin" />}
            <span className="text-sm font-semibold">
              {googleLoading ? "Redirecting to Google..." : "Continue with Google"}
            </span>
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#e3ded6]" />
            <span className="text-xs text-[#6b645c] font-semibold">or</span>
            <div className="flex-1 h-px bg-[#e3ded6]" />
          </div>

          {activeTab === "signin" ? (
            <LoginForm
              redirectTo={redirectTo}
              onSwitchToSignUp={() => setActiveTab("signup")}
            />
          ) : (
            <SignUpForm
              redirectTo={redirectTo}
              onSwitchToLogin={() => setActiveTab("signin")}
            />
          )}

          <DemoCredentials />
        </div>
      </div>
    </div>
  );
}
