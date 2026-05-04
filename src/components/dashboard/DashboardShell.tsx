"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  BookOpen,
  Brain,
  ChevronLeft,
  ChevronRight,
  Flame,
  LayoutDashboard,
  LogOut,
  NotebookPen,
  Settings,
  Sparkles,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

const navGroups = [
  {
    label: "Practice",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/habits", icon: Flame, label: "Habits", badge: "3" },
      { href: "/sessions", icon: Brain, label: "Sessions" },
      { href: "/mental-models", icon: BookOpen, label: "Mental Models", badge: "2" },
    ],
  },
  {
    label: "Reflect",
    items: [
      { href: "/journal", icon: NotebookPen, label: "Journal" },
      { href: "/ai-insights", icon: Sparkles, label: "AI Insights" },
      { href: "/achievements", icon: Award, label: "Achievements" },
    ],
  },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/sign-in?mode=signin&next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, pathname, router, user]);

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="rounded-2xl border border-border bg-card px-6 py-5 text-sm text-muted-foreground shadow-sm">
          Loading your workspace...
        </div>
      </main>
    );
  }

  const userName =
    user.user_metadata?.name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Member";
  const initials = userName
    .split(" ")
    .map((part: string) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <aside
        className={`hidden lg:flex min-h-screen flex-col border-r border-border bg-card transition-all duration-200 ${
          collapsed ? "w-16" : "w-60"
        }`}
        aria-label="Dashboard navigation"
      >
        <Link
          href="/dashboard"
          className={`flex h-[52px] items-center border-b border-border ${
            collapsed ? "justify-center px-3" : "gap-3 px-5"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Brain size={17} />
          </div>
          {!collapsed && <span className="text-base font-bold tracking-tight">Mentis</span>}
        </Link>

        <nav className="flex-1 overflow-y-auto py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-6">
              {!collapsed && (
                <p className="mb-2 px-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.label}
                </p>
              )}
              <div className="space-y-1 px-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    (item.href === "/dashboard" && pathname === "/home-dashboard");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center rounded-2xl transition-colors ${
                        collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
                      } ${
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                      aria-current={active ? "page" : undefined}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={18} />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-sm font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-semibold text-muted-foreground">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-2">
          <Link
            href="/settings"
            className={`flex items-center rounded-2xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${
              collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
            }`}
          >
            <Settings size={18} />
            {!collapsed && <span className="text-sm font-medium">Settings</span>}
          </Link>

          <div className={`flex items-center rounded-2xl p-2 ${collapsed ? "justify-center" : "gap-3 px-3"}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-primary">
              {initials}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{userName}</p>
                <p className="truncate text-xs text-muted-foreground">23-day streak</p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={async () => {
              await signOut();
              router.replace("/");
            }}
            className={`flex w-full items-center rounded-2xl text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive ${
              collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
            }`}
          >
            <LogOut size={18} />
            {!collapsed && <span className="text-sm font-medium">Sign out</span>}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="flex h-10 items-center justify-center border-t border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      <main className="min-w-0 flex-1 pb-24 lg:pb-0">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-card px-2 py-2 lg:hidden">
        {[
          { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
          { href: "/habits", icon: Flame, label: "Habits" },
          { href: "/sessions", icon: Brain, label: "Sessions" },
          { href: "/journal", icon: NotebookPen, label: "Journal" },
          { href: "/ai-insights", icon: Sparkles, label: "Insights" },
        ].map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-xs font-medium ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
