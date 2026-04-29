import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  aside?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  aside,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between flex-wrap gap-6 mb-12",
        className,
      )}
    >
      <div className="max-w-3xl">
        <div className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          {eyebrow}
        </div>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-5">
          {title}
        </h2>
        {description && (
          <p className="text-white/60 text-lg leading-relaxed">{description}</p>
        )}
      </div>
      {aside}
    </div>
  );
}
