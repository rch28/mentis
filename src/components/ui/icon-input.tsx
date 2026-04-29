import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  rounded?: "full" | "xl";
  containerClassName?: string;
}

export function IconInput({
  icon,
  rounded = "xl",
  containerClassName,
  className,
  ...props
}: IconInputProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
        {icon}
      </span>
      <input
        className={cn(
          "w-full pl-11 pr-4 py-3 bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 transition-all",
          rounded === "full" ? "rounded-full pl-12 pr-5 py-4" : "rounded-xl",
          className,
        )}
        {...props}
      />
    </div>
  );
}
