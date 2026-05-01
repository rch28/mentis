"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const DEMO_EMAIL = "demo@mentis.app";
const DEMO_PASSWORD = "mentis2026";

export default function DemoCredentials() {
  const [copiedField, setCopiedField] = useState<"email" | "password" | null>(
    null,
  );

  const copy = async (value: string, field: "email" | "password") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Ignore clipboard errors silently.
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-amber-200/70 bg-amber-50 p-4">
      <p className="text-xs font-semibold text-amber-700 mb-3 uppercase tracking-wider">
        Demo Account
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-[#6b645c]">Email</p>
            <p className="text-sm font-mono font-semibold text-[#1c1917]">
              {DEMO_EMAIL}
            </p>
          </div>
          <button
            type="button"
            onClick={() => copy(DEMO_EMAIL, "email")}
            className="p-1.5 rounded-lg hover:bg-amber-100 text-[#6b645c] hover:text-amber-700 transition-colors"
            aria-label="Copy demo email"
          >
            {copiedField === "email" ? (
              <Check size={14} className="text-emerald-600" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        </div>
        <div className="h-px bg-amber-200/70" />
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-[#6b645c]">Password</p>
            <p className="text-sm font-mono font-semibold text-[#1c1917]">
              {DEMO_PASSWORD}
            </p>
          </div>
          <button
            type="button"
            onClick={() => copy(DEMO_PASSWORD, "password")}
            className="p-1.5 rounded-lg hover:bg-amber-100 text-[#6b645c] hover:text-amber-700 transition-colors"
            aria-label="Copy demo password"
          >
            {copiedField === "password" ? (
              <Check size={14} className="text-emerald-600" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
