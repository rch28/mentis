"use client";
import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        {children}
      </TooltipProvider>
    </AuthProvider>
  );
};

export default App;
