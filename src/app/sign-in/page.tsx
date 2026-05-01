import AuthScreen from "@/components/auth/AuthScreen";
import type { AuthMode } from "@/contexts/AuthContext";

interface SignInPageProps {
  searchParams?: { mode?: string };
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  const modeParam = searchParams?.mode;
  const initialMode: AuthMode = modeParam === "signup" ? "signup" : "signin";

  return <AuthScreen initialMode={initialMode} />;
}
