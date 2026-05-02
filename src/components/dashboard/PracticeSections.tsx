"use client";

import React, { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Flame,
  Lightbulb,
  NotebookPen,
  Play,
  Plus,
  Search,
  Settings as SettingsIcon,
  Sparkles,
  Star,
  Target,
} from "lucide-react";

import {
  achievements,
  habits,
  insights,
  journalEntries,
  practiceModels,
  sessions,
  settingsGroups,
} from "./dashboard-data";
import { DashboardPageFrame, TodayHabits } from "./DashboardHome";

const panel = "rounded-2xl border border-[#ddd8d0] bg-white shadow-sm";

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#5c8a6f]">
          {eyebrow}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#78716c]">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

export function HabitsSection() {
  return (
    <DashboardPageFrame>
      <PageHeader
        eyebrow="Practice"
        title="Habits"
        description="Track the routines that compound into clearer thinking. Toggle today's habits and review the next work queued for the week."
        action={
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5c8a6f] px-4 py-2.5 text-sm font-semibold text-white">
            <Plus size={16} />
            New habit
          </button>
        }
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TodayHabits />
        </div>
        <div className={`${panel} p-5`}>
          <h2 className="mb-4 text-sm font-semibold">Habit cadence</h2>
          <div className="space-y-3">
            {habits.map((habit) => {
              const Icon = habit.icon;
              return (
                <div key={habit.id} className="flex items-center gap-3 rounded-2xl bg-[#f7f5f2] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#e5f0e9] text-[#5c8a6f]">
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{habit.name}</p>
                    <p className="text-xs text-[#78716c]">{habit.duration} · {habit.category}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#78716c]">
                    <Flame size={12} className="text-[#c4956a]" />
                    {habit.streak}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardPageFrame>
  );
}

export function SessionsSection() {
  return (
    <DashboardPageFrame>
      <PageHeader
        eyebrow="Practice"
        title="Sessions"
        description="Choose a guided routine based on the state you want to create before work, reflection, or a hard decision."
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {sessions.map((session) => {
          const Icon = session.icon;
          return (
            <article key={session.id} className={`${panel} p-5`}>
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e5f0e9] text-[#5c8a6f]">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-semibold">{session.title}</h2>
                  <p className="text-xs text-[#78716c]">{session.category}</p>
                </div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-[#625d56]">{session.description}</p>
              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-[#78716c]">
                <span className="flex items-center gap-1"><Clock size={12} />{session.duration}</span>
                <span className="flex items-center gap-1"><Star size={12} className="text-[#c4956a]" />{session.rating}</span>
                <span>{session.completions} sessions</span>
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5c8a6f] py-2.5 text-sm font-semibold text-white">
                <Play size={14} />
                Begin session
              </button>
            </article>
          );
        })}
      </div>
    </DashboardPageFrame>
  );
}

export function MentalModelsSection() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      practiceModels.filter((model) =>
        `${model.name} ${model.shortDesc} ${model.category}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <DashboardPageFrame>
      <PageHeader
        eyebrow="Practice"
        title="Mental Models"
        description="Continue the models you are practicing and keep the whole learning path connected to your daily decisions."
        action={
          <label className="relative block w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716c]" size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search models"
              className="w-full rounded-2xl border border-[#ddd8d0] bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#5c8a6f]"
            />
          </label>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((model) => (
          <article key={model.id} className={`${panel} p-5`}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e5f0e9] text-[#5c8a6f]">
                <BookOpen size={18} />
              </div>
              <span className="rounded-full bg-[#f7f5f2] px-2 py-1 text-xs font-medium text-[#78716c]">
                {model.status}
              </span>
            </div>
            <h2 className="mb-2 text-sm font-semibold">{model.name}</h2>
            <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-[#78716c]">
              {model.shortDesc}
            </p>
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-[#e8e3dc]">
              <div className="h-full rounded-full bg-[#5c8a6f]" style={{ width: `${model.progress}%` }} />
            </div>
            <p className="text-xs text-[#78716c]">{model.progress}% complete</p>
          </article>
        ))}
      </div>
    </DashboardPageFrame>
  );
}

export function JournalSection() {
  return (
    <DashboardPageFrame>
      <PageHeader
        eyebrow="Reflect"
        title="Journal"
        description="Capture decisions, moods, and repeated patterns while the context is still fresh."
        action={
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5c8a6f] px-4 py-2.5 text-sm font-semibold text-white">
            <NotebookPen size={16} />
            New entry
          </button>
        }
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className={`${panel} p-5 xl:col-span-2`}>
          <h2 className="mb-4 text-sm font-semibold">Recent reflections</h2>
          <div className="space-y-3">
            {journalEntries.map((entry) => (
              <article key={entry.id} className="rounded-2xl border border-[#ddd8d0] bg-[#f7f5f2] p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">{entry.title}</h3>
                  <span className="text-xs text-[#78716c]">{entry.date}</span>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-[#625d56]">{entry.excerpt}</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-medium text-[#5c8a6f]">
                  <Sparkles size={12} />
                  Mood {entry.mood}/10
                </span>
              </article>
            ))}
          </div>
        </section>
        <section className={`${panel} p-5`}>
          <h2 className="mb-4 text-sm font-semibold">Today&apos;s prompt</h2>
          <div className="rounded-2xl bg-[#fff5c7] p-4">
            <Lightbulb className="mb-3 text-[#b45309]" size={20} />
            <p className="text-sm font-semibold">What decision would become easier if you inverted it?</p>
            <p className="mt-2 text-xs leading-relaxed text-[#78716c]">
              Write the failure modes first, then choose the one action that avoids the most damage.
            </p>
          </div>
        </section>
      </div>
    </DashboardPageFrame>
  );
}

export function AIInsightsSection() {
  return (
    <DashboardPageFrame>
      <PageHeader
        eyebrow="Reflect"
        title="AI Insights"
        description="Review patterns inferred from your habits, sessions, and journal entries."
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <article key={insight.id} className="rounded-2xl border border-[#bfe5cf] bg-[#eff8f3] p-5 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#d9eadf] text-[#5c8a6f]">
                <Icon size={18} />
              </div>
              <h2 className="mb-2 text-base font-semibold">{insight.title}</h2>
              <p className="mb-4 text-sm leading-relaxed text-[#625d56]">{insight.text}</p>
              <div className="flex flex-wrap gap-1.5">
                {insight.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-2 py-1 text-xs font-medium text-[#5c8a6f]">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </DashboardPageFrame>
  );
}

export function AchievementsSection() {
  return (
    <DashboardPageFrame>
      <PageHeader
        eyebrow="Reflect"
        title="Achievements"
        description="Track streaks, practice milestones, and learning progress across the whole workspace."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {achievements.map((badge) => {
          const Icon = badge.icon;
          return (
            <article
              key={badge.id}
              className={`rounded-2xl border p-5 shadow-sm ${
                badge.earned
                  ? "border-[#bfe5cf] bg-white"
                  : "border-[#ddd8d0] bg-[#f7f5f2] opacity-60"
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f0e9] text-[#5c8a6f]">
                <Icon size={22} />
              </div>
              <h2 className="mb-1 text-base font-semibold">{badge.name}</h2>
              <p className="mb-3 text-sm text-[#78716c]">{badge.description}</p>
              {badge.earned ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#ebf4ef] px-2 py-1 text-xs font-semibold text-[#4a7c5c]">
                  <CheckCircle2 size={12} />
                  Earned {badge.earnedDate}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-[#78716c]">
                  <Target size={12} />
                  In progress
                </span>
              )}
            </article>
          );
        })}
      </div>
    </DashboardPageFrame>
  );
}

export function SettingsSection() {
  return (
    <DashboardPageFrame>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Manage account preferences, reminders, and the data used to personalize the logged-in experience."
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {settingsGroups.map((group) => (
          <section key={group.title} className={`${panel} p-5`}>
            <div className="mb-4 flex items-center gap-2">
              {group.title === "Practice" && <CalendarDays size={18} className="text-[#5c8a6f]" />}
              {group.title === "Privacy" && <Bell size={18} className="text-[#5c8a6f]" />}
              {group.title === "Account" && <SettingsIcon size={18} className="text-[#5c8a6f]" />}
              <h2 className="text-base font-semibold">{group.title}</h2>
            </div>
            <div className="space-y-3">
              {group.items.map((item, index) => (
                <label key={item} className="flex items-center justify-between gap-4 rounded-2xl bg-[#f7f5f2] p-3">
                  <span className="text-sm text-[#625d56]">{item}</span>
                  <input
                    type="checkbox"
                    defaultChecked={index !== group.items.length - 1}
                    className="h-4 w-4 accent-[#5c8a6f]"
                  />
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>
    </DashboardPageFrame>
  );
}
