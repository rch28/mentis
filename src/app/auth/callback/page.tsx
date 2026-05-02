"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";

import { supabase, supabaseConfigError } from "@/lib/supabase";

type CallbackState = "loading" | "success" | "error";

const getSafeRedirectPath = (value: string | null) => {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<CallbackState>("loading");
  const [message, setMessage] = useState("Completing your Google sign-in...");

  const nextPath = useMemo(() => {
    if (typeof window === "undefined") return "/";
    const params = new URLSearchParams(window.location.search);
    return getSafeRedirectPath(params.get("next"));
  }, []);

  useEffect(() => {
    let redirectTimer: ReturnType<typeof setTimeout> | undefined;

    const completeSignIn = async () => {
      if (!supabase) {
        setStatus("error");
        setMessage(supabaseConfigError || "Authentication is not configured.");
        return;
      }

      const url = new URL(window.location.href);
      const oauthError =
        url.searchParams.get("error_description") ||
        url.searchParams.get("error");

      if (oauthError) {
        setStatus("error");
        setMessage(oauthError);
        return;
      }

      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          setStatus("error");
          setMessage(error.message);
          return;
        }
      } else {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session) {
          setStatus("error");
          setMessage(
            error?.message ||
              "Google sign-in did not return a session. Try signing in again.",
          );
          return;
        }
      }

      setStatus("success");
      setMessage("You're signed in. Redirecting...");
      redirectTimer = setTimeout(() => router.replace(nextPath), 600);
    };

    completeSignIn();

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [nextPath, router]);

  return (
    <main className="min-h-screen bg-[#f7f5f2] text-[#1c1917] flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-2xl border border-[#e3ded6] bg-white p-8 shadow-sm text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700">
          {status === "loading" && <Loader2 className="h-6 w-6 animate-spin" />}
          {status === "success" && <CheckCircle2 className="h-6 w-6" />}
          {status === "error" && <TriangleAlert className="h-6 w-6" />}
        </div>
        <h1 className="text-xl font-semibold mb-2">
          {status === "error" ? "Sign-in failed" : "Google sign-in"}
        </h1>
        <p className="text-sm text-[#6b645c]">{message}</p>
        {status === "error" && (
          <button
            type="button"
            onClick={() => router.replace("/sign-in")}
            className="mt-6 w-full rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-[#111c30] transition-colors hover:bg-amber-300"
          >
            Back to sign in
          </button>
        )}
      </section>
    </main>
  );
}
