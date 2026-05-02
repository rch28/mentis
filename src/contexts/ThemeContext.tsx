"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeCtx {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(true); // Default to dark
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem("theme-dark");
    if (stored !== null) {
      setIsDark(stored === "true");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme-dark", String(isDark));
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("light");
    } else {
      html.classList.add("light");
    }
  }, [isDark, mounted]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
