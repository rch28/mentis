import { Bookmark } from "lucide-react";
import type { MouseEvent } from "react";

import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  saved: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  savedLabel?: string;
  iconOnly?: boolean;
  className?: string;
}

export function BookmarkButton({
  saved,
  onClick,
  label = "Save",
  savedLabel = "Saved",
  iconOnly = false,
  className,
}: BookmarkButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove bookmark" : "Save to My Library"}
      title={saved ? "Remove bookmark" : "Save to My Library"}
      className={cn(
        "transition-all flex items-center justify-center gap-2",
        iconOnly
          ? "w-9 h-9 rounded-full"
          : "px-4 py-2 rounded-full text-sm font-medium",
        saved
          ? "bg-amber-400 text-[#0f1828]"
          : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10",
        className,
      )}
    >
      <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
      {!iconOnly && <span>{saved ? savedLabel : label}</span>}
    </button>
  );
}
