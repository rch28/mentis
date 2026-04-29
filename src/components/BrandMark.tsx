import { Brain } from "lucide-react";

import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  iconClassName?: string;
}

export default function BrandMark({
  className,
  iconClassName,
}: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/30",
          iconClassName,
        )}
      >
        <Brain className="w-5 h-5 text-white" />
      </div>
      <div className="text-white">
        <div className="font-serif text-xl leading-none tracking-tight">
          Mentis
        </div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-indigo-300/80">
          Systems Thinking
        </div>
      </div>
    </div>
  );
}
