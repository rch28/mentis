import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface Bookmark {
  id: string;
  item_id: string;
  item_type: "model" | "case";
  item_title: string;
  item_meta: any;
  created_at: string;
}
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
  signOut: () => Promise<void>;
  toggleBookmark: (item: {
    id: string;
    type: "model" | "case";
    title: string;
    meta?: any;
  }) => Promise<void>;
  isBookmarked: (id: string, type: "model" | "case") => boolean;
  authModalOpen: boolean;
  setAuthModalOpen: (v: boolean) => void;
  myLibraryOpen: boolean;
  setMyLibraryOpen: (v: boolean) => void;
}
const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [myLibraryOpen, setMyLibraryOpen] = useState(false);

  const loadBookmarks = useCallback(async (uid: string) => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    if (!error && data) setBookmarks(data as Bookmark[]);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) loadBookmarks(session.user.id);
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
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: name || email.split("@")[0] } },
    });
    if (error) return { error: error.message };
    // Also subscribe to CRM
    try {
      await fetch(
        "https://famous.ai/api/crm/69ecc440c8cde95900318958/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name,
            source: "signup",
            tags: ["member", "signup"],
          }),
        },
      );
    } catch {}
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error ? error.message : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setBookmarks([]);
  };

  const isBookmarked = (id: string, type: "model" | "case") =>
    bookmarks.some((b) => b.item_id === id && b.item_type === type);

  const toggleBookmark = async (item: {
    id: string;
    type: "model" | "case";
    title: string;
    meta?: any;
  }) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    const existing = bookmarks.find(
      (b) => b.item_id === item.id && b.item_type === item.type,
    );
    if (existing) {
      await supabase.from("bookmarks").delete().eq("id", existing.id);
      setBookmarks(bookmarks.filter((b) => b.id !== existing.id));
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
      if (!error && data) setBookmarks([data as Bookmark, ...bookmarks]);
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
        signOut,
        toggleBookmark,
        isBookmarked,
        authModalOpen,
        setAuthModalOpen,
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
