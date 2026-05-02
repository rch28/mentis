"use client";
import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
