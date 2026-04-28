export interface MentalModel {
  id: string;
  name: string;
  category: 'decision' | 'problem' | 'strategic' | 'bias';
  shortDesc: string;
  origin: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const categories = [
  { id: 'all', label: 'All Models' },
  { id: 'decision', label: 'Decision-Making' },
  { id: 'problem', label: 'Problem-Solving' },
  { id: 'strategic', label: 'Strategic Thinking' },
  { id: 'bias', label: 'Cognitive Biases' },
];

export const mentalModels: MentalModel[] = [
  { id: 'first-principles', name: 'First Principles Thinking', category: 'problem', shortDesc: 'Break down complex problems into fundamental truths and rebuild from the ground up.', origin: 'Aristotle / Elon Musk', difficulty: 'Intermediate' },
  { id: 'second-order', name: 'Second-Order Thinking', category: 'decision', shortDesc: 'Consider the consequences of consequences—think beyond immediate outcomes.', origin: 'Howard Marks', difficulty: 'Intermediate' },
  { id: 'inversion', name: 'Inversion', category: 'problem', shortDesc: 'Solve problems backward by asking what could cause failure, then avoid it.', origin: 'Carl Jacobi / Charlie Munger', difficulty: 'Beginner' },
  { id: 'occams-razor', name: "Occam's Razor", category: 'decision', shortDesc: 'Among competing hypotheses, the one with fewest assumptions is usually correct.', origin: 'William of Ockham', difficulty: 'Beginner' },
  { id: 'pareto', name: 'Pareto Principle (80/20)', category: 'strategic', shortDesc: '80% of results come from 20% of causes. Focus on the vital few.', origin: 'Vilfredo Pareto', difficulty: 'Beginner' },
  { id: 'systems-thinking', name: 'Systems Thinking', category: 'strategic', shortDesc: 'Understand how parts interact within a whole, focusing on relationships.', origin: 'Donella Meadows', difficulty: 'Advanced' },
  { id: 'circle-competence', name: 'Circle of Competence', category: 'decision', shortDesc: 'Know what you know and what you don\'t. Operate within your expertise.', origin: 'Warren Buffett', difficulty: 'Beginner' },
  { id: 'opportunity-cost', name: 'Opportunity Cost', category: 'decision', shortDesc: 'Every choice has a hidden cost: what you gave up to make it.', origin: 'Economics', difficulty: 'Beginner' },
  { id: 'mental-models', name: 'Map is Not the Territory', category: 'strategic', shortDesc: 'Models simplify reality. Never confuse the description for the thing itself.', origin: 'Alfred Korzybski', difficulty: 'Intermediate' },
  { id: 'five-whys', name: 'The 5 Whys', category: 'problem', shortDesc: 'Ask "why" five times to drill down to the root cause of any problem.', origin: 'Sakichi Toyoda / Toyota', difficulty: 'Beginner' },
  { id: 'leverage', name: 'Leverage Points', category: 'strategic', shortDesc: 'Find the places in a system where small changes produce big shifts.', origin: 'Donella Meadows', difficulty: 'Advanced' },
  { id: 'feedback-loops', name: 'Feedback Loops', category: 'strategic', shortDesc: 'Identify reinforcing and balancing loops that drive system behavior.', origin: 'Cybernetics', difficulty: 'Intermediate' },
  { id: 'confirmation-bias', name: 'Confirmation Bias', category: 'bias', shortDesc: 'The tendency to seek information that confirms what we already believe.', origin: 'Peter Wason', difficulty: 'Beginner' },
  { id: 'survivorship', name: 'Survivorship Bias', category: 'bias', shortDesc: 'Focusing on successes while ignoring the silent evidence of failures.', origin: 'Abraham Wald', difficulty: 'Intermediate' },
  { id: 'sunk-cost', name: 'Sunk Cost Fallacy', category: 'bias', shortDesc: 'Continuing investment based on past costs rather than future value.', origin: 'Behavioral Economics', difficulty: 'Beginner' },
  { id: 'anchoring', name: 'Anchoring Bias', category: 'bias', shortDesc: 'Over-relying on the first piece of information encountered.', origin: 'Tversky & Kahneman', difficulty: 'Beginner' },
  { id: 'dunning-kruger', name: 'Dunning-Kruger Effect', category: 'bias', shortDesc: 'Low ability leads to overconfidence; expertise leads to humility.', origin: 'Dunning & Kruger', difficulty: 'Intermediate' },
  { id: 'eisenhower', name: 'Eisenhower Matrix', category: 'decision', shortDesc: 'Prioritize tasks by urgency and importance across four quadrants.', origin: 'Dwight D. Eisenhower', difficulty: 'Beginner' },
  { id: 'expected-value', name: 'Expected Value', category: 'decision', shortDesc: 'Multiply probability by outcome to make rational choices under uncertainty.', origin: 'Probability Theory', difficulty: 'Intermediate' },
  { id: 'margin-safety', name: 'Margin of Safety', category: 'strategic', shortDesc: 'Build buffers into decisions to absorb errors and uncertainty.', origin: 'Benjamin Graham', difficulty: 'Intermediate' },
  { id: 'compounding', name: 'Compounding', category: 'strategic', shortDesc: 'Small consistent gains accumulate into extraordinary long-term results.', origin: 'Albert Einstein (attr.)', difficulty: 'Beginner' },
  { id: 'antifragile', name: 'Antifragility', category: 'strategic', shortDesc: 'Systems that gain from disorder—stronger under stress, not just resilient.', origin: 'Nassim Taleb', difficulty: 'Advanced' },
  { id: 'hanlons-razor', name: "Hanlon's Razor", category: 'bias', shortDesc: 'Never attribute to malice what is adequately explained by stupidity.', origin: 'Robert J. Hanlon', difficulty: 'Beginner' },
  { id: 'parkinson', name: "Parkinson's Law", category: 'problem', shortDesc: 'Work expands to fill the time available for its completion.', origin: 'Cyril N. Parkinson', difficulty: 'Beginner' },
  { id: 'chestertons-fence', name: "Chesterton's Fence", category: 'problem', shortDesc: 'Don\'t remove a rule until you understand why it was put there.', origin: 'G.K. Chesterton', difficulty: 'Intermediate' },
  { id: 'via-negativa', name: 'Via Negativa', category: 'problem', shortDesc: 'Improve by removal—subtract what doesn\'t work rather than adding more.', origin: 'Nassim Taleb', difficulty: 'Intermediate' },
];

export interface StepGuide {
  id: string;
  title: string;
  subtitle: string;
  steps: { title: string; description: string; example: string }[];
}

export const stepGuides: StepGuide[] = [
  {
    id: 'first-principles-guide',
    title: 'First Principles Thinking',
    subtitle: 'A 5-step framework for breaking down any problem',
    steps: [
      { title: 'Identify the Problem', description: 'Clearly state the challenge you face without assumptions.', example: 'How do we make space travel affordable?' },
      { title: 'Question Every Assumption', description: 'Challenge what is "commonly known" about the problem.', example: 'Is it true rockets must cost $65M? Why?' },
      { title: 'Break Down to Fundamentals', description: 'Reduce the problem to its most basic, undeniable truths.', example: 'A rocket is made of aluminum, titanium, copper, carbon fiber.' },
      { title: 'Calculate Raw Costs', description: 'Determine the actual cost of fundamental components.', example: 'Raw materials = ~2% of typical rocket cost.' },
      { title: 'Reconstruct from Scratch', description: 'Build the solution back up using fundamental insights.', example: 'SpaceX builds rockets in-house at a fraction of the price.' },
    ],
  },
  {
    id: 'systems-thinking-guide',
    title: 'Systems Thinking',
    subtitle: 'See the whole, not just the parts',
    steps: [
      { title: 'Define the System Boundary', description: 'Determine what is inside and outside the system you study.', example: 'A company\'s growth system includes hiring, product, sales, customers.' },
      { title: 'Map the Components', description: 'List all elements and stakeholders within the system.', example: 'Engineers, marketers, users, competitors, regulators.' },
      { title: 'Identify Relationships', description: 'Show how each element influences the others.', example: 'Marketing → Leads → Sales → Revenue → R&D budget.' },
      { title: 'Find Feedback Loops', description: 'Spot reinforcing (R) and balancing (B) loops.', example: 'More users → more data → better product → more users (R).' },
      { title: 'Locate Leverage Points', description: 'Find small interventions that produce large change.', example: 'Changing onboarding can shift entire retention curve.' },
    ],
  },
  {
    id: 'inversion-guide',
    title: 'Inversion',
    subtitle: 'Solve problems by thinking backward',
    steps: [
      { title: 'State Your Goal', description: 'Define what success looks like.', example: 'I want to build a successful startup.' },
      { title: 'Invert the Question', description: 'Ask: what would guarantee failure?', example: 'How would I make a startup fail catastrophically?' },
      { title: 'List the Failure Modes', description: 'Brainstorm everything that leads to disaster.', example: 'No market, bad team, run out of cash, ignore users.' },
      { title: 'Identify Avoidance Strategies', description: 'For each failure mode, design a counter.', example: 'Validate market, hire slowly, raise wisely, talk to users weekly.' },
      { title: 'Execute the Inverted Plan', description: 'Focus on not losing rather than only winning.', example: 'Most success comes from avoiding stupid mistakes.' },
    ],
  },
  {
    id: 'second-order-guide',
    title: 'Second-Order Thinking',
    subtitle: 'Think beyond the immediate outcome',
    steps: [
      { title: 'Identify the Decision', description: 'Define the choice you are about to make.', example: 'Should we cut prices to grow market share?' },
      { title: 'Predict First-Order Effects', description: 'What happens immediately as a result?', example: 'Sales volume increases next quarter.' },
      { title: 'Predict Second-Order Effects', description: 'And then what? What happens after that?', example: 'Competitors match prices; margins compress; brand cheapens.' },
      { title: 'Predict Third-Order Effects', description: 'Continue cascading the consequences.', example: 'Lower R&D budget; product falls behind; market share lost.' },
      { title: 'Decide with Full Picture', description: 'Choose with the long-term cascade in mind.', example: 'Maybe invest in differentiation instead of cutting price.' },
    ],
  },
  {
    id: 'five-whys-guide',
    title: 'The 5 Whys',
    subtitle: 'Drill down to the root cause',
    steps: [
      { title: 'State the Problem Clearly', description: 'Articulate what went wrong without blame.', example: 'Our website went down for 3 hours.' },
      { title: 'Ask Why #1', description: 'Why did this happen? Identify the surface cause.', example: 'The server ran out of memory.' },
      { title: 'Ask Why #2', description: 'Why did the surface cause occur?', example: 'A memory leak in our new feature.' },
      { title: 'Ask Why #3', description: 'Continue digging deeper.', example: 'The code wasn\'t reviewed before deploy.' },
      { title: 'Ask Why #4 & #5', description: 'Reach the systemic root cause.', example: 'No mandatory PR review process exists. Fix the process, not the code.' },
    ],
  },
  {
    id: 'pareto-guide',
    title: 'Pareto Principle (80/20)',
    subtitle: 'Find the vital few that drive the trivial many',
    steps: [
      { title: 'List All Inputs/Activities', description: 'Make a comprehensive inventory.', example: 'All 50 features in your product.' },
      { title: 'Measure Each Output', description: 'Quantify the result each one produces.', example: 'Usage data per feature.' },
      { title: 'Sort by Impact', description: 'Rank from highest to lowest contribution.', example: 'Top 10 features = 82% of usage.' },
      { title: 'Identify the Vital 20%', description: 'Spotlight the few drivers of most results.', example: 'Search, dashboard, notifications drive 80%.' },
      { title: 'Reallocate Effort', description: 'Pour resources into the high-leverage 20%.', example: 'Improve top 10 features; deprecate the rest.' },
    ],
  },
  {
    id: 'eisenhower-guide',
    title: 'Eisenhower Matrix',
    subtitle: 'Prioritize what truly matters',
    steps: [
      { title: 'List Every Task', description: 'Capture everything on your plate.', example: 'Email, project, gym, meeting, learning.' },
      { title: 'Quadrant 1: Urgent + Important', description: 'Crises and deadlines—do immediately.', example: 'Client emergency, tax deadline.' },
      { title: 'Quadrant 2: Not Urgent + Important', description: 'Long-term value—schedule deeply.', example: 'Strategic planning, exercise, learning.' },
      { title: 'Quadrant 3: Urgent + Not Important', description: 'Interruptions—delegate them.', example: 'Most meetings, certain emails.' },
      { title: 'Quadrant 4: Neither', description: 'Distractions—eliminate them entirely.', example: 'Mindless scrolling, busywork.' },
    ],
  },
  {
    id: 'feedback-loops-guide',
    title: 'Feedback Loops',
    subtitle: 'Master the engines of system behavior',
    steps: [
      { title: 'Observe System Behavior Over Time', description: 'Look at trends, not snapshots.', example: 'User growth curve over 12 months.' },
      { title: 'Identify the Loops', description: 'Find what reinforces or balances change.', example: 'More users → more content → more users (R).' },
      { title: 'Distinguish R from B Loops', description: 'Reinforcing accelerates, Balancing stabilizes.', example: 'Server overload (B) caps growth (R).' },
      { title: 'Spot Delays', description: 'Find time gaps between cause and effect.', example: 'Marketing today affects revenue 3 months out.' },
      { title: 'Intervene Strategically', description: 'Strengthen good loops, weaken bad ones.', example: 'Add referral mechanic; fix scaling bottleneck.' },
    ],
  },
];

export interface CaseStudy {
  id: string;
  title: string;
  model: string;
  industry: string;
  before: string;
  after: string;
  outcome: string;
}

export const caseStudies: CaseStudy[] = [
  { id: 'spacex', title: 'SpaceX & Reusable Rockets', model: 'First Principles', industry: 'Aerospace', before: 'Industry assumed rockets must cost $65M+ and be single-use.', after: 'Musk decomposed rockets to raw materials (~2% of cost), built in-house, made them reusable.', outcome: 'Launch costs dropped by ~10x, opening a new commercial space era.' },
  { id: 'netflix', title: 'Netflix\'s Pivot to Streaming', model: 'Second-Order Thinking', industry: 'Media', before: 'DVD-by-mail was profitable; streaming would cannibalize the cash cow.', after: 'Reed Hastings traced the cascade: bandwidth growth → user preference → inevitable disruption.', outcome: '230M+ subscribers globally; reshaped the entertainment industry.' },
  { id: 'toyota', title: 'Toyota Production System', model: 'The 5 Whys', industry: 'Manufacturing', before: 'Defects were patched at the surface, recurring constantly on the line.', after: 'Engineers asked "why" five times to find systemic root causes, not symptoms.', outcome: 'Became the gold standard of lean manufacturing; saved billions.' },
  { id: 'amazon', title: 'Amazon\'s Flywheel', model: 'Feedback Loops', industry: 'E-commerce', before: 'Traditional retail viewed price, selection, experience as trade-offs.', after: 'Bezos mapped a reinforcing loop: lower prices → traffic → sellers → selection → traffic.', outcome: '$1.5T+ market cap built on a self-reinforcing growth engine.' },
  { id: 'buffett', title: 'Warren Buffett\'s Investing', model: 'Circle of Competence', industry: 'Finance', before: 'Investors chased every hot trend, including dot-com tech they didn\'t understand.', after: 'Buffett stayed within industries he deeply understood, ignoring the rest.', outcome: '20%+ annualized returns over 60 years; outperformed nearly all peers.' },
  { id: 'kodak', title: 'Kodak\'s Failure (Reverse Lesson)', model: 'Inversion', industry: 'Photography', before: 'Kodak invented digital photography but feared cannibalizing film profits.', after: 'Had they inverted (asked "what kills us?"), they would have led the digital era.', outcome: 'Bankruptcy in 2012—a cautionary tale of failing to think backward.' },
  { id: 'apple', title: 'Apple\'s Product Focus', model: 'Pareto Principle', industry: 'Technology', before: 'In 1997, Apple had 350 products and was bleeding cash.', after: 'Jobs cut the lineup to 4 products serving the 20% of customers driving 80% of value.', outcome: 'Returned to profitability in a year; foundation of today\'s $3T company.' },
];
