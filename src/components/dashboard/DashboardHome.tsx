"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Brain,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Heart,
  Play,
  Plus,
  RefreshCw,
  Settings,
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAuth } from "@/contexts/AuthContext";
import {
  achievements,
  habits as initialHabits,
  insights,
  moodData,
  sessions,
  stats,
} from "./dashboard-data";

const cardClass = "rounded-2xl border border-border bg-card text-foreground shadow-sm";

export default function DashboardHome() {
  return (
    <DashboardPageFrame>
      <Greeting />
      <KpiGrid />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <MoodTrend />
          <TodayHabits />
        </div>
        <div className="space-y-6">
          <InsightCard />
          <RecommendedSession />
          <RecentAchievements />
        </div>
      </div>
    </DashboardPageFrame>
  );
}

export function DashboardPageFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-8 px-5 py-8 sm:px-6 lg:px-8 xl:px-10 2xl:px-16">
      {children}
    </div>
  );
}

function Greeting() {
  const { user } = useAuth();
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const name =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Maya";

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="mb-1 text-2xl font-semibold tracking-tight text-foreground">
          {greeting}, {name}
        </h1>
        <p className="text-sm text-muted-foreground">{date}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          You have{" "}
          <span className="font-semibold text-foreground">
            {stats.totalHabits - stats.completedHabits} habits
          </span>{" "}
          and <span className="font-semibold text-foreground">1 session</span>{" "}
          left for today.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition-colors hover:bg-muted"
          aria-label="Notifications"
        >
          <Bell size={17} className="text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#c4956a]" />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition-colors hover:bg-muted"
          aria-label="Settings"
        >
          <Settings size={17} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

function KpiGrid() {
  const cards = [
    {
      label: "Avg Mood Score",
      value: stats.moodAverage,
      unit: "/10",
      icon: Heart,
      trend: "+0.6 this week",
      positive: true,
      className: "bg-[#eef8f2] border-[#bfe5cf]",
      iconClass: "bg-rose-50 text-rose-500",
    },
    {
      label: "Sessions Done",
      value: stats.sessionsDone,
      unit: "total",
      icon: Brain,
      trend: "3 this week",
      positive: true,
      className: "bg-card border-border",
      iconClass: "bg-muted text-primary",
    },
    {
      label: "Habits Today",
      value: stats.completedHabits,
      unit: `/ ${stats.totalHabits}`,
      icon: CheckCircle2,
      trend: `${stats.totalHabits - stats.completedHabits} still pending`,
      positive: false,
      className: "bg-[#fff5c7] border-[#f5d46f]",
      iconClass: "bg-card/70 text-[#b45309]",
    },
    {
      label: "Mindful Minutes",
      value: stats.mindfulMinutes,
      unit: "this week",
      icon: Clock,
      trend: "Goal: 120 min",
      positive: true,
      className: "bg-card border-border",
      iconClass: "bg-indigo-50 text-indigo-500",
    },
    {
      label: "Mental Models",
      value: stats.learnedModels,
      unit: "learned",
      icon: TrendingUp,
      trend: "2 in progress",
      positive: true,
      className: "bg-card border-border",
      iconClass: "bg-muted text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="relative overflow-hidden rounded-2xl bg-[#5c8a6f] p-6 text-white shadow-sm sm:col-span-2">
        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5" />
        <div className="relative">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <Flame size={25} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
              North Star
            </span>
          </div>
          <p className="mb-1 text-sm font-medium text-white/75">Current Streak</p>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tabular-nums">{stats.streakDays}</span>
            <span className="text-base text-white/70">days</span>
          </div>
          <p className="mb-3 text-xs text-white/65">
            Keep it going. Your longest streak was 31 days.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-medium text-white/85">
            <TrendingUp size={13} />
            +3 from last week
          </div>
        </div>
      </div>

      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md ${card.className}`}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${card.iconClass}`}>
                <Icon size={18} />
              </div>
              {!card.positive && <AlertTriangle size={14} className="text-[#b45309]" />}
            </div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {card.label}
            </p>
            <div className="mb-1.5 flex items-baseline gap-1">
              <span className="text-2xl font-semibold tabular-nums text-foreground">
                {card.value}
              </span>
              <span className="text-xs text-muted-foreground">{card.unit}</span>
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                card.positive ? "text-primary" : "text-destructive"
              }`}
            >
              {card.positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {card.trend}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MoodTrend() {
  const average = useMemo(
    () =>
      (moodData.reduce((sum, item) => sum + item.mood, 0) / moodData.length).toFixed(
        1,
      ),
    [],
  );

  return (
    <section className={`${cardClass} p-6`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">7-Day Mood Trend</h2>
          <p className="text-xs text-muted-foreground">
            Based on daily journal check-ins
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
          <TrendingUp size={13} />
          Avg {average}/10
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={moodData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="moodGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#5c8a6f" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#5c8a6f" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[4, 10]}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid var(--border)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            }}
          />
          <Area
            type="monotone"
            dataKey="mood"
            stroke="#5c8a6f"
            strokeWidth={2.5}
            fill="url(#moodGradient)"
            dot={{ fill: "#5c8a6f", strokeWidth: 2, r: 4, stroke: "white" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}

export function TodayHabits() {
  const [habits, setHabits] = useState(initialHabits);
  const completedCount = habits.filter((habit) => habit.completed).length;
  const progress = Math.round((completedCount / habits.length) * 100);

  return (
    <section className={`${cardClass} p-6`}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">Today&apos;s Habits</h2>
          <p className="text-xs text-muted-foreground">
            {completedCount} of {habits.length} completed
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-2xl bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
        >
          <Plus size={13} />
          Add habit
        </button>
      </div>

      <div className="mb-5">
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-[#5c8a6f] transition-all duration-500"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">{progress}% complete</p>
      </div>

      <div className="space-y-2">
        {habits.map((habit) => {
          const Icon = habit.icon;
          return (
            <button
              key={habit.id}
              type="button"
              onClick={() =>
                setHabits((current) =>
                  current.map((item) =>
                    item.id === habit.id
                      ? { ...item, completed: !item.completed }
                      : item,
                  ),
                )
              }
              className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                habit.completed
                  ? "border-primary/30 bg-primary/10"
                  : "border-border bg-muted/40 hover:border-primary/30"
              }`}
              aria-pressed={habit.completed}
            >
              {habit.completed ? (
                <CheckCircle2 size={20} className="shrink-0 text-primary" />
              ) : (
                <Circle size={20} className="shrink-0 text-muted-foreground" />
              )}
              <Icon size={18} className="shrink-0 text-[#c4956a]" />
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-sm font-medium ${
                    habit.completed
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }`}
                >
                  {habit.name}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {habit.duration} · {habit.category}
                </span>
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <Flame size={12} className="text-[#c4956a]" />
                {habit.streak}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function InsightCard() {
  const [refreshing, setRefreshing] = useState(false);
  const current = insights[0];
  const Icon = current.icon;

  return (
    <section className="rounded-2xl border border-primary/20 bg-primary/10 p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Icon size={15} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              AI Insight
            </p>
            <p className="text-xs text-muted-foreground">Personal pattern detection</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setRefreshing(true);
            window.setTimeout(() => setRefreshing(false), 700);
          }}
          className="rounded-xl p-1.5 text-muted-foreground transition-colors hover:bg-primary/15 hover:text-primary"
          aria-label="Refresh insight"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
        </button>
      </div>
      <h3 className="mb-2 text-sm font-semibold">{current.title}</h3>
      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{current.text}</p>
      <div className="flex flex-wrap gap-1.5">
        {current.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-card/80 px-2 py-0.5 text-xs font-medium text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

function RecommendedSession() {
  const [starting, setStarting] = useState(false);
  const session = sessions[0];
  const Icon = session.icon;

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Recommended for You
      </p>
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{session.title}</h3>
          <p className="text-xs text-muted-foreground">{session.category}</p>
        </div>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
        {session.description}
      </p>
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {session.duration}
        </span>
        <span className="flex items-center gap-1">
          <Star size={12} className="text-[#c4956a]" />
          {session.rating}
        </span>
        <span>{session.completions} sessions</span>
      </div>
      <button
        type="button"
        onClick={() => {
          setStarting(true);
          window.setTimeout(() => setStarting(false), 700);
        }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Play size={14} />
        {starting ? "Starting..." : "Begin Session"}
      </button>
    </section>
  );
}

function RecentAchievements() {
  const earned = achievements.filter((badge) => badge.earned).length;

  return (
    <section className={`${cardClass} p-5`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">Achievements</h2>
        <span className="text-xs text-muted-foreground">
          {earned}/{achievements.length} earned
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {achievements.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`rounded-2xl border p-3 text-center ${
                badge.earned
                  ? "border-primary/30 bg-primary/10"
                  : "border-border bg-muted/40 opacity-50"
              }`}
            >
              <Icon className="mx-auto mb-2 text-[#c4956a]" size={22} />
              <p className="text-xs font-semibold leading-tight">{badge.name}</p>
              <p className="mt-0.5 text-xs leading-tight text-muted-foreground">
                {badge.description}
              </p>
              {badge.earnedDate && (
                <p className="mt-1 text-xs font-medium text-primary">
                  {badge.earnedDate}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
