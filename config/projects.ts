// Everything Omar has built, in display order. Projects with an `image` are
// the home page's cards (six per page); the AI assistant reads all of them
// (lib/chatbot/website-data.ts). Public GitHub repos also show their live
// star/fork/watcher counts on the cards.

/** Display names of the technologies used below. */
const TECH = {
  ai: "AI",
  auth: "Auth",
  "aws-s3": "AWS S3",
  blender: "Blender",
  clerk: "Clerk",
  csharp: "C#",
  css: "CSS",
  docker: "Docker",
  ejs: "EJS",
  fastapi: "FastAPI",
  fastify: "Fastify",
  flask: "Flask",
  html: "HTML",
  javascript: "JavaScript",
  laravel: "Laravel",
  linux: "Linux",
  mediapipe: "MediaPipe",
  mongo: "MongoDB",
  mysql: "MySQL",
  neon: "Neon",
  nextjs: "Next.js",
  nodejs: "Node.js",
  php: "PHP",
  postgresql: "PostgreSQL",
  prisma: "Prisma",
  puppeteer: "Puppeteer",
  python: "Python",
  react: "React",
  supabase: "Supabase",
  tailwindcss: "Tailwind CSS",
  threejs: "Three.js",
  typescript: "TypeScript",
  unity: "Unity",
  wireguard: "WireGuard",
} as const;

export type Tech = keyof typeof TECH;

export const techName = (tech: Tech) => TECH[tech];

/** Technologies with an icon in public/static/icons/tech, shown on the cards. */
const TECH_ICONS = new Set<Tech>([
  "ai",
  "auth",
  "blender",
  "clerk",
  "csharp",
  "docker",
  "ejs",
  "fastapi",
  "fastify",
  "flask",
  "javascript",
  "mediapipe",
  "mongo",
  "mysql",
  "neon",
  "nextjs",
  "nodejs",
  "php",
  "postgresql",
  "prisma",
  "python",
  "react",
  "supabase",
  "tailwindcss",
  "threejs",
  "typescript",
  "unity",
]);

export const hasTechIcon = (tech: Tech) => TECH_ICONS.has(tech);

export type ProjectStatus = "complete" | "dev" | "archived";

export type Project = {
  /** Shown as is to the AI assistant; the card shows it as a slug. */
  name: string;
  /** The card's text. */
  description: string;
  /** A shorter description for the AI assistant (every word it reads costs
   *  time on the Pi); defaults to `description`. */
  summary?: string;
  tech: Tech[];
  /** The year it started, and the last year of work if that differs. */
  year: number;
  until?: number;
  status: ProjectStatus;
  /** Why, shown with the status (e.g. why it's archived). */
  note?: string;
  /** A working public URL; omit when the site is down or private. */
  url?: string;
  /** A public repo under the author's GitHub account. */
  repo?: string;
  /** Work for someone else: at a company I worked for, or for a client. */
  client?: { kind: "company" | "client"; name: string };
  /** The card's screenshot. Projects with one are shown on the home page. */
  image?: string;
};

export type FeaturedProject = Project & { image: string };

export const PROJECTS_PER_PAGE = 6;

/** "Arkanex HR App" → "arkanex-hr-app", the card's title. */
export const projectSlug = (project: Project) =>
  project.name.toLowerCase().replace(/\s+/g, "-");

export const projects: Project[] = [
  {
    name: "Raml",
    description:
      "A co-op survival game in a desert world. Craft, fight through the nights and tame a saluki with friends.",
    tech: ["unity", "csharp", "blender"],
    year: 2026,
    status: "dev",
    image: "/static/images/projects/raml.png",
  },
  {
    name: "Arkanex HR App",
    description:
      "A multi-tenant HR system for small and medium businesses: leave, attendance, payslips, approval workflows and 62 reports, with portals for employees, managers and HR.",
    tech: ["react", "typescript", "python", "fastapi", "postgresql"],
    year: 2026,
    status: "dev",
    url: "https://platform.arkanex.org",
    client: { kind: "company", name: "Arkanex" },
    image: "/static/images/projects/arkanex-hr.png",
  },
  {
    name: "Arkanex Website",
    description:
      "Arkanex's bilingual (Arabic and English) corporate website, statically rendered.",
    tech: ["nextjs", "typescript", "tailwindcss"],
    year: 2026,
    status: "dev",
    client: { kind: "company", name: "Arkanex" },
    image: "/static/images/projects/arkanex-website.png",
  },
  {
    name: "Virtual Fitting Mirror",
    description:
      "Try on shirts live through your webcam, in 2D or a rigged 3D model, with pose tracking. A Qassim University graduation project.",
    summary:
      "Try on shirts live through your webcam, in 2D or 3D. A university graduation project.",
    tech: ["typescript", "react", "threejs", "mediapipe", "fastify"],
    year: 2026,
    status: "complete",
    url: "https://fitting-mirror.vercel.app",
    repo: "virtual-fitting-mirror",
    client: { kind: "client", name: "a student" },
    image: "/static/images/projects/fitting-mirror.png",
  },
  {
    name: "omar11.sa",
    description:
      "My personal website and online portfolio showcase my projects, skills, tech stack, owned games, etc., featuring optimized performance and an attractive UI design.",
    summary:
      "This website: my projects, skills, games, a guestbook and an AI assistant.",
    tech: ["nextjs", "typescript", "tailwindcss", "neon", "auth"],
    year: 2023,
    until: 2026,
    status: "complete",
    url: "https://omar11.sa",
    repo: "omar11.sa",
    image: "/static/images/projects/portfolio.png",
  },
  {
    name: "Self-hosted AI",
    description:
      "A language model running at home on an Orange Pi 5, reachable from anywhere.",
    tech: ["linux", "docker", "wireguard"],
    year: 2026,
    status: "dev",
  },
  {
    name: "Minecraft Server Scanner",
    description:
      "Scans the whole internet for Minecraft servers with sharded masscan workers and shows them in a live dashboard.",
    summary:
      "Scans the whole internet for Minecraft servers and shows them in a dashboard.",
    tech: ["nodejs", "postgresql", "docker"],
    year: 2025,
    until: 2026,
    status: "dev",
    image: "/static/images/projects/mc-scanner.png",
  },
  {
    name: "Student Skills Platform",
    description:
      "Teachers track each student's Arabic skills and see what to work on; students sign in to follow their own progress.",
    tech: ["python", "flask", "postgresql", "javascript"],
    year: 2026,
    status: "complete",
    url: "https://www.sultanalwulayi.site",
    client: { kind: "client", name: "a teacher" },
    image: "/static/images/projects/student-skills.png",
  },
  {
    name: "MirageHost",
    description:
      "A game server hosting platform: order, pay for and manage your servers from one dashboard.",
    tech: ["nextjs", "typescript", "prisma", "postgresql", "auth"],
    year: 2025,
    until: 2026,
    status: "archived",
    note: "requires capital",
    image: "/static/images/projects/miragehost.png",
  },
  {
    name: "Arabic Grammar Analyzer",
    description:
      "Finds grammar and spelling mistakes in Arabic text, even from photos, and explains each one.",
    summary:
      "Finds grammar and spelling mistakes in Arabic text and explains each one.",
    tech: ["python", "flask", "ai", "postgresql", "javascript"],
    year: 2025,
    until: 2026,
    status: "complete",
    // Its site (arabic-grammar-analyzer.vercel.app) is down: the card links
    // to the repo instead.
    repo: "arabic-grammar-analyzer",
    client: { kind: "client", name: "a client" },
    image: "/static/images/projects/arabic-grammar.png",
  },
  {
    name: "Jayda Employee Guide",
    description:
      "A bilingual (Arabic and English) step-by-step guide for the Jayda Gifts team to run their Salla store.",
    tech: ["nextjs", "typescript", "tailwindcss"],
    year: 2026,
    status: "complete",
    client: { kind: "client", name: "Jayda Gifts" },
    image: "/static/images/projects/jayda-guide.png",
  },
  {
    name: "Sama Academy",
    description:
      "Events, enrollment and a scoreboard for a children's academy, with an admin dashboard.",
    tech: ["nextjs", "typescript", "prisma", "clerk", "aws-s3"],
    year: 2024,
    until: 2025,
    status: "complete",
    client: { kind: "client", name: "Musab Sultan Academy" },
    image: "/static/images/projects/sama-academy.png",
  },
  {
    name: "Games Hosting Service",
    description:
      "My first game hosting platform, started in Laravel and rebuilt in Next.js.",
    tech: ["laravel", "php", "react", "nextjs"],
    year: 2024,
    status: "archived",
  },
  {
    name: "Chatin v2",
    description:
      "Talk to Kaito voice-to-voice using speech recognition or text-to-speech, with elevenlabs technology and chatgpt on the web.",
    summary: "Talk to Kaito, an AI character with attitude, by voice.",
    tech: ["nextjs", "supabase", "tailwindcss", "ai"],
    year: 2023,
    status: "dev",
    url: "https://chatin2.vercel.app",
    repo: "chatin-v2",
    image: "/static/images/projects/chatin2.png",
  },
  {
    name: "Guestbook Demo",
    description:
      "A logging system that allows website visitors to leave public comments. (You can integrate this into your own website)",
    summary: "Let visitors sign in and leave public comments on any website.",
    tech: ["nextjs", "typescript", "tailwindcss", "supabase", "auth"],
    year: 2023,
    until: 2024,
    status: "dev",
    url: "https://guestbook.omar11.sa",
    repo: "guestbook-demo",
    image: "/static/images/projects/guestbook.png",
  },
  {
    name: "steamid.info",
    description:
      "Find and show any list of games from any Steam profile effortlessly by simply entering the steamID in the search bar. And Once logged in, you can conveniently view your friend's profiles and the games they own.",
    summary:
      "Enter a Steam ID and see every game on that profile, and your friends' too.",
    tech: ["javascript", "nodejs", "mongo", "auth", "ejs"],
    year: 2023,
    status: "complete",
    // steamid.info no longer responds: the card links to the repo instead.
    repo: "steamid.info",
    image: "/static/images/projects/steamid.png",
  },
  {
    name: "Steam Screenshots API",
    description:
      "My attempt to make API data by scraping steam website using (puppeteer), for getting my own screenshot URL's in a JSON format.",
    summary: "Scrapes Steam to serve my screenshots as a JSON API.",
    tech: ["nodejs", "puppeteer"],
    year: 2023,
    status: "complete",
    repo: "steam-screenshots-api",
    image: "/static/images/projects/steam-screenshots-api.png",
  },
  {
    name: "Guardion",
    description:
      "My graduation project, built in a team of three. We took first place.",
    tech: ["javascript", "nodejs", "mongo", "ejs"],
    year: 2022,
    until: 2023,
    status: "archived",
    url: "/static/files/graduation_project_ar.pdf",
    repo: "Graduation-Project",
  },
  {
    name: "My Old Website",
    description:
      "My first website, where I taught myself HTML, CSS, JavaScript and PHP.",
    tech: ["html", "css", "javascript", "php", "mysql"],
    year: 2021,
    status: "archived",
  },
];

export const featuredProjects = projects.filter(
  (project): project is FeaturedProject => project.image !== undefined,
);
