"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import type { User, Session } from "@supabase/supabase-js";
import { supabase, supabaseConfigError } from "@/lib/supabase";
import type { Bookmark, BookmarkInput, LibraryItemType } from "@/types/library";

export type AuthMode = "signin" | "signup";

interface AuthCtx {
  user: User | null;
  session: Session | null;
  loading: boolean;
  bookmarks: Bookmark[];
  signUp: (
    email: string,
    password: string,
    name?: string,
  ) => Promise<{ error: string | null }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null }>;
  signInWithGoogle: (nextPath?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  toggleBookmark: (item: BookmarkInput) => Promise<void>;
  isBookmarked: (id: string, type: LibraryItemType) => boolean;
  authModalOpen: boolean;
  setAuthModalOpen: (v: boolean) => void;
  authMode: AuthMode;
  setAuthMode: (v: AuthMode) => void;
  myLibraryOpen: boolean;
  setMyLibraryOpen: (v: boolean) => void;
}
const AuthContext = createContext<AuthCtx | undefined>(undefined);

const getSafeRedirectPath = (value?: string) => {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/dashboard";
  return value;
};

const getAuthRedirectUrl = (nextPath?: string) => {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const appUrl =
    configuredUrl ||
    (typeof window !== "undefined" ? window.location.origin : "");

  if (!appUrl) return undefined;

  const callbackUrl = new URL(`${appUrl.replace(/\/$/, "")}/auth/callback`);
  callbackUrl.searchParams.set("next", getSafeRedirectPath(nextPath));
  return callbackUrl.toString();
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [myLibraryOpen, setMyLibraryOpen] = useState(false);

  const loadBookmarks = useCallback(async (uid: string) => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    if (!error && data) setBookmarks(data as Bookmark[]);
  }, []);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        if (session?.user) loadBookmarks(session.user.id);
      })
      .catch(() => {
        setSession(null);
        setUser(null);
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) loadBookmarks(session.user.id);
      else setBookmarks([]);
    });

    return () => subscription.unsubscribe();
  }, [loadBookmarks]);

  const signUp = async (email: string, password: string, name?: string) => {
    if (!supabase) return { error: supabaseConfigError };

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: name || email.split("@")[0] } },
    });
    if (error) return { error: error.message };
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          source: "signup",
          tags: ["member", "signup"],
        }),
      });
    } catch {
      // Newsletter subscription should not block account creation.
    }
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: supabaseConfigError };

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error ? error.message : null };
  };

  const signInWithGoogle = async (nextPath?: string) => {
    if (!supabase) return { error: supabaseConfigError };

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getAuthRedirectUrl(nextPath),
      },
    });
    return { error: error ? error.message : null };
  };

  const signOut = async () => {
    await supabase?.auth.signOut();
    setBookmarks([]);
  };

  const redirectToAuth = useCallback(
    (mode: AuthMode) => {
      setAuthMode(mode);
      setAuthModalOpen(false);
      router.push(`/sign-in?mode=${mode}`);
    },
    [router],
  );

  const isBookmarked = (id: string, type: LibraryItemType) =>
    bookmarks.some((b) => b.item_id === id && b.item_type === type);

  const toggleBookmark = async (item: BookmarkInput) => {
    if (!user) {
      redirectToAuth("signup");
      return;
    }
    if (!supabase) return;

    const existing = bookmarks.find(
      (b) => b.item_id === item.id && b.item_type === item.type,
    );
    if (existing) {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", existing.id);
      if (!error) {
        setBookmarks((current) => current.filter((b) => b.id !== existing.id));
      }
    } else {
      const { data, error } = await supabase
        .from("bookmarks")
        .insert({
          user_id: user.id,
          item_id: item.id,
          item_type: item.type,
          item_title: item.title,
          item_meta: item.meta || {},
        })
        .select()
        .single();
      if (!error && data) {
        setBookmarks((current) => [data as Bookmark, ...current]);
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        bookmarks,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        toggleBookmark,
        isBookmarked,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        myLibraryOpen,
        setMyLibraryOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
