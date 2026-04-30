/**
 * Shared UI utility functions for common patterns
 */

/**
 * Smoothly scroll to an element by ID
 * @param elementId - The ID of the element to scroll to
 */
export const scrollToSection = (elementId: string): void => {
  document.querySelector(`#${elementId}`)?.scrollIntoView({ behavior: "smooth" });
};
