import AuthScreen from "@/components/auth/AuthScreen";
import type { AuthMode } from "@/contexts/AuthContext";

interface SignInPageProps {
  searchParams: Promise<{ mode?: string | string[] }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { mode } = await searchParams;
  const modeParam = Array.isArray(mode) ? mode[0] : mode;
  const initialMode: AuthMode = modeParam === "signup" ? "signup" : "signin";

  return <AuthScreen key={initialMode} initialMode={initialMode} />;
}
