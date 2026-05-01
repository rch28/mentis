"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";

interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

export default function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
  });

  const passwordValue = watch("password");

  const getPasswordStrength = (
    pw: string,
  ): { label: string; className: string; width: string } => {
    if (!pw) return { label: "", className: "bg-[#e3ded6]", width: "0%" };
    if (pw.length < 6) {
      return { label: "Too short", className: "bg-rose-400", width: "25%" };
    }
    if (pw.length < 8) {
      return { label: "Weak", className: "bg-amber-400", width: "50%" };
    }
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) {
      return { label: "Strong", className: "bg-emerald-500", width: "100%" };
    }
    return { label: "Fair", className: "bg-sky-400", width: "75%" };
  };

  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    setAuthError("");

    const result = await signUp(data.email, data.password, data.fullName);

    if (result.error) {
      setAuthError(result.error);
      setIsLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {authError && (
        <div
          className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2"
          role="alert"
        >
          <span className="text-rose-600 text-sm">!</span>
          <p className="text-rose-600 text-sm font-medium">{authError}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="signup-name"
          className="block text-sm font-semibold mb-1.5"
        >
          Full name
        </label>
        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          placeholder="Ava Johnson"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-sm placeholder:text-[#8b867f] transition-all duration-150 outline-none focus:ring-2 focus:ring-amber-200/60 focus:border-amber-300 ${
            errors.fullName
              ? "border-rose-400"
              : "border-[#e3ded6] hover:border-amber-300/70"
          }`}
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />
        {errors.fullName && (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="signup-email"
          className="block text-sm font-semibold mb-1.5"
        >
          Email address
        </label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-sm placeholder:text-[#8b867f] transition-all duration-150 outline-none focus:ring-2 focus:ring-amber-200/60 focus:border-amber-300 ${
            errors.email
              ? "border-rose-400"
              : "border-[#e3ded6] hover:border-amber-300/70"
          }`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="signup-password"
          className="block text-sm font-semibold mb-1.5"
        >
          Password
        </label>
        <p className="text-xs text-[#6b645c] mb-2">
          At least 8 characters with a number and uppercase letter
        </p>
        <div className="relative">
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Create a strong password"
            className={`w-full px-4 py-3 pr-11 rounded-xl border bg-white text-sm placeholder:text-[#8b867f] transition-all duration-150 outline-none focus:ring-2 focus:ring-amber-200/60 focus:border-amber-300 ${
              errors.password
                ? "border-rose-400"
                : "border-[#e3ded6] hover:border-amber-300/70"
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b867f] hover:text-[#1c1917] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {passwordValue && (
          <div className="mt-2">
            <div className="h-1.5 bg-[#e3ded6] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${strength.className}`}
                style={{ width: strength.width }}
              />
            </div>
            {strength.label && (
              <p className="text-xs text-[#6b645c] mt-1">{strength.label}</p>
            )}
          </div>
        )}
        {errors.password && (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-start gap-2.5">
          <input
            id="agree-terms"
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-[#e3ded6] accent-amber-500 cursor-pointer flex-shrink-0"
            {...register("agreeToTerms", {
              required: "You must agree to the terms to continue",
            })}
          />
          <label
            htmlFor="agree-terms"
            className="text-sm text-[#6b645c] cursor-pointer select-none leading-relaxed"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-amber-700 font-semibold hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-amber-700 font-semibold hover:underline"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">
            {errors.agreeToTerms.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 rounded-xl bg-amber-400 text-[#111c30] text-sm font-semibold hover:bg-amber-300 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
        style={{ minHeight: "48px" }}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          "Create Free Account"
        )}
      </button>

      <p className="text-center text-sm text-[#6b645c]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-amber-700 font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}
