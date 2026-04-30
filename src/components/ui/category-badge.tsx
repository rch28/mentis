import React from "react";

/**
 * Props for the CategoryBadge component
 */
interface CategoryBadgeProps {
  categoryIcon: React.ReactNode;
  categoryLabel: string;
  categoryColor: string;
  className?: string;
}

/**
 * Reusable category badge component
 * Displays a category label with icon and color styling
 * Used in both library card and detail modal views
 */
export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  categoryIcon,
  categoryLabel,
  categoryColor,
  className = "",
}) => (
  <div
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-linear-to-br border ${categoryColor} ${className}`}
  >
    {categoryIcon}
    {categoryLabel}
  </div>
);
