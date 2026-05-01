"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSwitchToSignUp: () => void;
}

export default function LoginForm({ onSwitchToSignUp }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setAuthError("");

    const result = await signIn(data.email, data.password);

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
          htmlFor="login-email"
          className="block text-sm font-semibold mb-1.5"
        >
          Email address
        </label>
        <input
          id="login-email"
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
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="login-password"
            className="block text-sm font-semibold"
          >
            Password
          </label>
          <button
            type="button"
            className="text-xs text-amber-600 font-semibold hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
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
        {errors.password && (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <input
          id="remember-me"
          type="checkbox"
          className="w-4 h-4 rounded border-[#e3ded6] accent-amber-500 cursor-pointer"
          {...register("rememberMe")}
        />
        <label
          htmlFor="remember-me"
          className="text-sm text-[#6b645c] cursor-pointer select-none"
        >
          Remember me for 30 days
        </label>
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
            <span>Signing in...</span>
          </>
        ) : (
          "Sign In"
        )}
      </button>

      <p className="text-center text-sm text-[#6b645c]">
        Do not have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-amber-700 font-semibold hover:underline"
        >
          Create one free
        </button>
      </p>
    </form>
  );
}
