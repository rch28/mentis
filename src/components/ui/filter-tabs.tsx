import { cn } from "@/lib/utils";

export interface FilterTabOption<T extends string> {
  id: T;
  label: string;
  count?: number;
}

interface FilterTabsProps<T extends string> {
  options: readonly FilterTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
}

export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: FilterTabsProps<T>) {
  return (
    <div
      aria-label={ariaLabel}
      className={cn("flex items-center gap-2 flex-wrap", className)}
      role="group"
    >
      {options.map((option) => (
        <button
          key={option.id}
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          type="button"
          className={cn(
            "px-4 py-2.5 rounded-full text-sm font-medium transition-all",
            value === option.id
              ? "bg-amber-400 text-[#0f1828]"
              : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10",
          )}
        >
          {option.label}
          {typeof option.count === "number" && (
            <span className="opacity-60"> ({option.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
