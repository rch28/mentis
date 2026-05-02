"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Bookmark, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrandMark from "@/components/BrandMark";
const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [accountOpen, setAccountOpen] = useState(false);
  const router = useRouter();
  const { user, signOut, setMyLibraryOpen, bookmarks } = useAuth();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#coach", label: "Coach" },
    { href: "#library", label: "Library" },
    { href: "#guides", label: "Step Guides" },
    { href: "#cases", label: "Case Studies" },
    { href: "#compare", label: "Compare" },
    { href: "#resources", label: "Resources" },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const userName =
    user?.user_metadata?.name || user?.email?.split("@")[0] || "You";
  const initial = userName.charAt(0).toUpperCase();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0f1828]/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <Link
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
        >
          <BrandMark iconClassName="group-hover:shadow-indigo-500/60 transition-shadow" />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => scrollTo(l.href)}
              className="text-sm text-white/70 hover:text-white transition-colors font-medium tracking-wide cursor-pointer"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => setMyLibraryOpen(true)}
                className="relative inline-flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors"
              >
                <Bookmark className="w-4 h-4" />
                My Library
                {bookmarks.length > 0 && (
                  <span className="ml-1 min-w-5 h-5 px-1.5 rounded-full bg-amber-400 text-[#0f1828] text-[10px] font-bold flex items-center justify-center">
                    {bookmarks.length}
                  </span>
                )}
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountOpen(!accountOpen)}
                  aria-expanded={accountOpen}
                  aria-haspopup="menu"
                  className="w-10 h-10 rounded-full bg-linear-to-br from-amber-400 to-amber-500 text-[#0f1828] font-bold flex items-center justify-center hover:scale-105 transition-transform"
                  title={userName}
                >
                  {initial}
                </button>
                {accountOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setAccountOpen(false)}
                    />
                    <div className="absolute right-0 mt-3 w-64 bg-[#111c30] border border-white/10 rounded-2xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="text-white font-medium text-sm truncate">
                          {userName}
                        </div>
                        <div className="text-white/50 text-xs truncate">
                          {user.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAccountOpen(false);
                          setMyLibraryOpen(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/5"
                      >
                        <Bookmark className="w-4 h-4" /> My Library (
                        {bookmarks.length})
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          setAccountOpen(false);
                          await signOut();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-300 hover:bg-white/5"
                      >
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  router.push("/sign-in?mode=signin");
                }}
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/sign-in?mode=signup");
                }}
                className="px-5 py-2.5 text-sm font-medium text-[#0f1828] bg-amber-400 hover:bg-amber-300 rounded-full transition-colors shadow-lg shadow-amber-400/20"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="lg:hidden text-white p-2"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="h-0.5 bg-white/5">
        <div
          className="h-full bg-linear-to-r from-indigo-500 via-blue-400 to-amber-400 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {open && (
        <div className="lg:hidden bg-[#0f1828] border-t border-white/10">
          <div className="flex flex-col px-6 py-6 gap-4">
            {links.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => scrollTo(l.href)}
                className="text-left text-white/80 hover:text-white py-2"
              >
                {l.label}
              </button>
            ))}
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setMyLibraryOpen(true);
                  }}
                  className="text-left text-white/80 py-2 flex items-center gap-2"
                >
                  <Bookmark className="w-4 h-4" /> My Library (
                  {bookmarks.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="text-left text-rose-300 py-2 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.push("/sign-in?mode=signin");
                }}
                className="px-5 py-3 text-sm font-medium text-[#0f1828] bg-amber-400 rounded-full flex items-center justify-center gap-2"
              >
                <UserIcon className="w-4 h-4" /> Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
