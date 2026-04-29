export interface Resource {
  type: "book" | "article" | "video";
  title: string;
  author: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  desc: string;
  link: string;
}

export const bookImages = [
  "https://d64gsuwffb70l.cloudfront.net/69ecc440c8cde95900318958_1777124720875_4ce5d591.png",
  "https://d64gsuwffb70l.cloudfront.net/69ecc440c8cde95900318958_1777124712975_fb4cc05e.jpg",
  "https://d64gsuwffb70l.cloudfront.net/69ecc440c8cde95900318958_1777124720989_0185f82d.png",
];

export const resources: Resource[] = [
  {
    type: "book",
    title: "Thinking in Systems",
    author: "Donella H. Meadows",
    level: "Beginner",
    desc: "The definitive primer on systems thinking, written with rare clarity and warmth.",
    link: "https://www.goodreads.com/book/show/3828902-thinking-in-systems",
  },
  {
    type: "book",
    title: "Poor Charlie's Almanack",
    author: "Charlie Munger",
    level: "Intermediate",
    desc: "Munger's lifetime collection of mental models and worldly wisdom.",
    link: "https://www.goodreads.com/book/show/944652.Poor_Charlie_s_Almanack",
  },
  {
    type: "book",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    level: "Intermediate",
    desc: "Nobel-winning exploration of System 1 and System 2 thinking.",
    link: "https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow",
  },
  {
    type: "article",
    title: "Leverage Points: Places to Intervene in a System",
    author: "Donella Meadows",
    level: "Advanced",
    desc: "The seminal essay ranking 12 leverage points by their power to change systems.",
    link: "https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/",
  },
  {
    type: "article",
    title: "The Great Mental Models",
    author: "Farnam Street",
    level: "Beginner",
    desc: "A curated index introducing dozens of foundational frameworks.",
    link: "https://fs.blog/mental-models/",
  },
  {
    type: "article",
    title: "First Principles Thinking",
    author: "James Clear",
    level: "Beginner",
    desc: "A practical breakdown of how to reason from fundamentals like Aristotle and Musk.",
    link: "https://jamesclear.com/first-principles",
  },
  {
    type: "video",
    title: "How to Build a Mental Model",
    author: "Shane Parrish",
    level: "Beginner",
    desc: "A 20-minute talk on assembling your latticework of frameworks.",
    link: "https://fs.blog/",
  },
  {
    type: "video",
    title: "Systems Thinking Masterclass",
    author: "MIT OpenCourseWare",
    level: "Advanced",
    desc: "Lecture series covering feedback loops, stocks/flows, and dynamics.",
    link: "https://ocw.mit.edu/",
  },
  {
    type: "book",
    title: "Antifragile",
    author: "Nassim Nicholas Taleb",
    level: "Advanced",
    desc: "How systems gain from disorder, volatility, and stress.",
    link: "https://www.goodreads.com/book/show/13530973-antifragile",
  },
];
