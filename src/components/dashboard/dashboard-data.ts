import {
  Award,
  BookOpen,
  Brain,
  Flame,
  Heart,
  Lightbulb,
  Moon,
  NotebookPen,
  Sparkles,
  Target,
  Timer,
  Wind,
} from "lucide-react";

import { mentalModels } from "@/data/modelsData";

export const habits = [
  {
    id: "morning-meditation",
    name: "Morning meditation",
    duration: "10 min",
    category: "Mindfulness",
    streak: 23,
    completed: true,
    icon: Brain,
  },
  {
    id: "gratitude-journaling",
    name: "Gratitude journaling",
    duration: "5 min",
    category: "Journaling",
    streak: 17,
    completed: true,
    icon: NotebookPen,
  },
  {
    id: "deep-breathing",
    name: "Deep breathing exercise",
    duration: "5 min",
    category: "Breathwork",
    streak: 8,
    completed: false,
    icon: Wind,
  },
  {
    id: "mental-model-lesson",
    name: "Read mental model lesson",
    duration: "15 min",
    category: "Learning",
    streak: 5,
    completed: false,
    icon: BookOpen,
  },
  {
    id: "evening-reflection",
    name: "Evening reflection",
    duration: "10 min",
    category: "Journaling",
    streak: 12,
    completed: false,
    icon: Moon,
  },
];

export const sessions = [
  {
    id: "box-breathing",
    title: "Box Breathing for Anxiety",
    category: "Breathwork",
    duration: "8 min",
    rating: 4.8,
    completions: "1,240",
    description:
      "A paced 4-4-4-4 breathing pattern for downshifting quickly before a stressful decision.",
    icon: Wind,
    accent: "blue",
  },
  {
    id: "decision-reset",
    title: "Decision Reset",
    category: "Clarity",
    duration: "12 min",
    rating: 4.7,
    completions: "860",
    description:
      "Step back from urgency, name the real tradeoff, and choose your next action.",
    icon: Target,
    accent: "green",
  },
  {
    id: "focus-sprint",
    title: "Focus Sprint",
    category: "Attention",
    duration: "18 min",
    rating: 4.9,
    completions: "2,180",
    description:
      "A short guided routine for clearing mental clutter and starting one deep work block.",
    icon: Timer,
    accent: "amber",
  },
];

export const journalEntries = [
  {
    id: "entry-1",
    title: "What made today feel lighter?",
    mood: 8,
    date: "Today",
    excerpt:
      "The morning session helped me notice the decision I was avoiding. I handled it before lunch.",
  },
  {
    id: "entry-2",
    title: "Where did I overcomplicate a choice?",
    mood: 6,
    date: "Yesterday",
    excerpt:
      "I kept optimizing the wrong thing. Inversion made the failure mode obvious.",
  },
  {
    id: "entry-3",
    title: "What pattern is repeating?",
    mood: 7,
    date: "Apr 30",
    excerpt:
      "My best workdays start with a written priority and no inbox until after the first block.",
  },
];

export const insights = [
  {
    id: "insight-1",
    title: "Meditation is moving your mood",
    text: "Mood scores are highest on days with morning meditation. Keep that habit before reactive work.",
    tags: ["Mindfulness", "Mood"],
    icon: Heart,
  },
  {
    id: "insight-2",
    title: "Evening reflection needs an anchor",
    text: "The only habit missed four times this week is reflection. Pair it with an existing night routine.",
    tags: ["Habits", "Consistency"],
    icon: Lightbulb,
  },
  {
    id: "insight-3",
    title: "Decision notes are getting clearer",
    text: "Your recent journal entries use fewer assumptions and more explicit tradeoffs.",
    tags: ["Mental models", "Journaling"],
    icon: Sparkles,
  },
];

export const achievements = [
  {
    id: "three-week-warrior",
    name: "3-Week Warrior",
    description: "21-day streak achieved",
    earnedDate: "Apr 22",
    earned: true,
    icon: Flame,
  },
  {
    id: "zen-beginner",
    name: "Zen Beginner",
    description: "10 meditation sessions",
    earnedDate: "Apr 14",
    earned: true,
    icon: Brain,
  },
  {
    id: "reflective-soul",
    name: "Reflective Soul",
    description: "7 journal entries in a row",
    earnedDate: "Apr 9",
    earned: true,
    icon: NotebookPen,
  },
  {
    id: "model-thinker",
    name: "Model Thinker",
    description: "5 mental models completed",
    earnedDate: "",
    earned: false,
    icon: Award,
  },
];

export const moodData = [
  { day: "Mon", mood: 6.2 },
  { day: "Tue", mood: 5.8 },
  { day: "Wed", mood: 7.1 },
  { day: "Thu", mood: 6.9 },
  { day: "Fri", mood: 7.8 },
  { day: "Sat", mood: 8.2 },
  { day: "Sun", mood: 7.4 },
];

export const practiceModels = mentalModels.slice(0, 8).map((model, index) => ({
  ...model,
  progress: index < 3 ? 100 : index < 5 ? 55 : 20,
  status: index < 3 ? "Learned" : index < 5 ? "In progress" : "Queued",
}));

export const settingsGroups = [
  {
    title: "Practice",
    items: ["Daily reminder at 8:00 AM", "Weekly progress digest", "Session recommendations"],
  },
  {
    title: "Privacy",
    items: ["Keep journal entries private", "Use activity for AI insights", "Export my data"],
  },
  {
    title: "Account",
    items: ["Profile details", "Connected sign-in methods", "Notification preferences"],
  },
];

export const stats = {
  streakDays: 23,
  moodAverage: 7.4,
  sessionsDone: 41,
  mindfulMinutes: 84,
  completedHabits: habits.filter((habit) => habit.completed).length,
  totalHabits: habits.length,
  learnedModels: practiceModels.filter((model) => model.status === "Learned").length,
};
