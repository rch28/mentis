import AuthScreen from "@/components/auth/AuthScreen";
import type { AuthMode } from "@/contexts/AuthContext";

interface SignInPageProps {
  searchParams: Promise<{ mode?: string | string[]; next?: string | string[] }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { mode, next } = await searchParams;
  const modeParam = Array.isArray(mode) ? mode[0] : mode;
  const nextParam = Array.isArray(next) ? next[0] : next;
  const initialMode: AuthMode = modeParam === "signup" ? "signup" : "signin";
  const redirectTo =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/dashboard";

  return (
    <AuthScreen
      key={`${initialMode}-${redirectTo}`}
      initialMode={initialMode}
      redirectTo={redirectTo}
    />
  );
}
