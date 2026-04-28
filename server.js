const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const PUBLIC_DIR = path.join(ROOT, "public");
const CONTACT_FILE = path.join(DATA_DIR, "contact-submissions.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(CONTACT_FILE)) fs.writeFileSync(CONTACT_FILE, "[]", "utf8");

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(PUBLIC_DIR, "assets"), { maxAge: "7d" }));
app.use("/css", express.static(path.join(PUBLIC_DIR, "css"), { maxAge: "7d" }));
app.use("/js", express.static(path.join(PUBLIC_DIR, "js"), { maxAge: "7d" }));
app.use(express.static(PUBLIC_DIR, { extensions: ["html"] }));

const site = {
  name: "TechNexis",
  title: "AI Tools + Tech Blog for Practical Growth",
  description:
    "A modern AI tools and tech blog with tutorials, prompts, reviews, and productivity guides.",
  url: "https://example.com",
  email: "hello@example.com",
};

const articles = [
  {
    slug: "best-ai-tools-for-students-2026",
    title: "Best AI Tools for Students in 2026",
    category: "AI Tools",
    tag: "Trending",
    readingTime: "6 min read",
    date: "2026-04-28",
    excerpt:
      "A practical list of AI tools that help with notes, summaries, assignments, and revision without making your workflow messy.",
    cover:
      "Students need tools that save time. This guide focuses on real utility: note summarizers, writing assistants, research helpers, and presentation boosters.",
    sections: [
      "Start with one note summarizer, one writing helper, and one research assistant. Using too many tools creates confusion.",
      "Use AI to draft faster, but always review for accuracy, tone, and formatting.",
      "The best student workflow is simple: capture, summarize, organize, and revise.",
    ],
  },
  {
    slug: "chatgpt-prompts-for-bloggers",
    title: "30 ChatGPT Prompts for Bloggers Who Want Better Articles",
    category: "Blogging",
    tag: "Useful",
    readingTime: "8 min read",
    date: "2026-04-27",
    excerpt:
      "Copy-ready prompt ideas to plan posts, write intros, generate outlines, and improve SEO without sounding robotic.",
    cover:
      "Prompting works best when you give the AI context, audience, format, and goal. This article is built for fast publishing.",
    sections: [
      "Use role + task + audience + output format in every prompt.",
      "Add constraints such as word count, tone, and reading level.",
      "Turn each prompt into a reusable template for your editorial process.",
    ],
  },
  {
    slug: "best-free-ai-image-tools",
    title: "Best Free AI Image Tools for Creators",
    category: "AI Tools",
    tag: "Popular",
    readingTime: "7 min read",
    date: "2026-04-26",
    excerpt:
      "From background removal to text-to-image generation, these tools are perfect for creators, bloggers, and small businesses.",
    cover:
      "Creators need speed. These tools help you create thumbnails, feature images, and social assets with less effort.",
    sections: [
      "Pick tools based on the task, not the hype.",
      "Keep a consistent visual style across your posts.",
      "Use AI images as a starting point, then refine them for brand consistency.",
    ],
  },
  {
    slug: "tech-setup-for-a-fast-blog",
    title: "The Tech Setup Behind a Fast Blog",
    category: "Web Dev",
    tag: "SEO",
    readingTime: "9 min read",
    date: "2026-04-25",
    excerpt:
      "A clean stack, optimized images, proper caching, and mobile-first layouts can make a huge difference in ranking and user retention.",
    cover:
      "Fast websites reduce bounce rate and increase trust. This guide covers the practical stack choices that actually matter.",
    sections: [
      "Keep your stack simple: Node, static content, lightweight CSS, and minimal JavaScript.",
      "Use server-side routing for SEO-friendly pages.",
      "Compress assets and defer non-essential scripts.",
    ],
  },
  {
    slug: "best-chrome-extensions-for-productivity",
    title: "Best Chrome Extensions for Productivity",
    category: "Tech Tips",
    tag: "Workflow",
    readingTime: "5 min read",
    date: "2026-04-24",
    excerpt:
      "A short list of extensions that help you save tabs, write faster, and manage tasks without clutter.",
    cover:
      "The right extensions can turn a browser into a focused work station. Less chaos, more output.",
    sections: [
      "Keep only the extensions you use every week.",
      "Separate research, writing, and admin tasks into different browser profiles.",
      "Review extensions monthly to avoid bloat.",
    ],
  },
  {
    slug: "how-to-build-a-blog-that-ranks",
    title: "How to Build a Blog That Ranks on Google",
    category: "Blogging",
    tag: "SEO",
    readingTime: "10 min read",
    date: "2026-04-23",
    excerpt:
      "The real ranking formula is clarity, internal linking, useful pages, and consistency. This guide keeps it practical.",
    cover:
      "Ranking is not magic. It is site architecture, content depth, and user intent alignment working together.",
    sections: [
      "Write one page per topic and support it with related articles.",
      "Make sure every page solves a real search intent.",
      "Update older posts instead of publishing random new ones every day.",
    ],
  },
  {
    slug: "ai-workflow-for-content-creators",
    title: "AI Workflow for Content Creators",
    category: "AI Tools",
    tag: "Workflow",
    readingTime: "6 min read",
    date: "2026-04-22",
    excerpt:
      "Plan, draft, edit, and repurpose content faster with a repeatable AI workflow that still keeps your own voice.",
    cover:
      "Good workflow beats raw speed. AI should remove friction, not remove your personality.",
    sections: [
      "Write your outline first, then use AI for expansion.",
      "Use a final human edit pass for clarity and originality.",
      "Repurpose one blog post into a newsletter, short post, and summary card.",
    ],
  },
  {
    slug: "best-free-tech-news-sources",
    title: "Best Free Tech News Sources to Follow",
    category: "Tech News",
    tag: "Update",
    readingTime: "4 min read",
    date: "2026-04-21",
    excerpt:
      "A useful roundup for creators who want to stay updated without drowning in information.",
    cover:
      "A good news diet is curated. You only need a few reliable sources to keep up with trends.",
    sections: [
      "Follow sources with editorial consistency.",
      "Use one feed reader or saved list instead of jumping between apps.",
      "Turn news into content by adding your interpretation and examples.",
    ],
  },
  {
    slug: "best-laptops-for-blogging",
    title: "Best Laptops for Blogging and Editing",
    category: "Reviews",
    tag: "Buyer Guide",
    readingTime: "7 min read",
    date: "2026-04-20",
    excerpt:
      "A practical buying guide for creators who want battery life, a good keyboard, and smooth browsing.",
    cover:
      "You do not need a gaming machine for blogging. You need stability, battery life, and a comfortable typing setup.",
    sections: [
      "Prioritize keyboard, display, battery, and SSD speed.",
      "Pick a machine that stays cool and quiet during long work sessions.",
      "For most bloggers, portability matters more than raw power.",
    ],
  },
  {
    slug: "how-to-use-ai-for-seo-topics",
    title: "How to Use AI for SEO Topic Research",
    category: "AI Tools",
    tag: "SEO",
    readingTime: "8 min read",
    date: "2026-04-19",
    excerpt:
      "A workflow for finding blog ideas, grouping keywords, and building topic clusters with AI assistance.",
    cover:
      "AI can speed up research, but the final judgment should still come from you. Human intent wins.",
    sections: [
      "Use AI to brainstorm clusters, then verify search intent manually.",
      "Group related queries into one content hub.",
      "Avoid publishing pages that overlap too much with each other.",
    ],
  },
  {
    slug: "simple-blog-monetization-guide",
    title: "Simple Blog Monetization Guide for New Sites",
    category: "Blogging",
    tag: "Money",
    readingTime: "9 min read",
    date: "2026-04-18",
    excerpt:
      "Ads, affiliate links, digital products, and lead capture explained in plain language for new publishers.",
    cover:
      "A blog earns when it gives readers a reason to stay, trust, and click. Monetization is a result, not a trick.",
    sections: [
      "Start with useful content and clean navigation.",
      "Mix ads with affiliate content only when it makes sense.",
      "Build email capture early so traffic does not disappear.",
    ],
  },
  {
    slug: "mobile-first-design-for-blogs",
    title: "Mobile-First Design for Blogs That Actually Works",
    category: "Web Dev",
    tag: "UX",
    readingTime: "6 min read",
    date: "2026-04-17",
    excerpt:
      "A mobile-first layout makes reading, browsing, and clicking better on small screens.",
    cover:
      "If the site looks great on mobile, it usually looks great everywhere else too.",
    sections: [
      "Use large tap targets and readable spacing.",
      "Keep your layout narrow enough for comfortable scanning.",
      "Make important actions visible without excessive scrolling.",
    ],
  },
  {
    slug: "best-ai-writing-assistants",
    title: "Best AI Writing Assistants for Bloggers",
    category: "AI Tools",
    tag: "Writing",
    readingTime: "7 min read",
    date: "2026-04-16",
    excerpt:
      "Choosing an AI writing assistant is easier when you focus on workflow, tone control, and editing speed.",
    cover:
      "A writing assistant should help you think faster, not replace your judgment.",
    sections: [
      "Look for tools that can keep tone consistent.",
      "Use AI for outlines, rewrites, and summaries.",
      "Always do a final edit before publishing.",
    ],
  },
  {
    slug: "best-tech-newsletter-ideas",
    title: "Best Tech Newsletter Ideas for a New Audience",
    category: "Tech News",
    tag: "Growth",
    readingTime: "5 min read",
    date: "2026-04-15",
    excerpt:
      "Newsletter ideas that can work alongside a blog and help you own your audience.",
    cover:
      "A newsletter turns one-time visitors into repeat readers.",
    sections: [
      "Send one clear topic per issue.",
      "Mix curation with your own commentary.",
      "Keep the format short and repeatable.",
    ],
  },
  {
    slug: "how-to-build-authority-with-blog-content",
    title: "How to Build Authority with Blog Content",
    category: "Blogging",
    tag: "Authority",
    readingTime: "8 min read",
    date: "2026-04-14",
    excerpt:
      "A simple strategy for building trust through consistency, usefulness, and organized content hubs.",
    cover:
      "Authority grows when your site becomes the obvious place for a specific topic.",
    sections: [
      "Focus on one audience and one main promise.",
      "Use internal links to connect related posts.",
      "Keep your titles specific and your content honest.",
    ],
  },
  {
    slug: "best-ai-productivity-workflows",
    title: "Best AI Productivity Workflows for Solo Creators",
    category: "AI Tools",
    tag: "Workflow",
    readingTime: "7 min read",
    date: "2026-04-13",
    excerpt:
      "A solo creator can do more with a simple AI workflow for research, drafting, and repurposing.",
    cover:
      "Productivity improves when you remove decision fatigue from the process.",
    sections: [
      "Create one repeatable content pipeline.",
      "Keep templates for common tasks.",
      "Track the tools that save real time.",
    ],
  },
];

app.get("/api/site", (req, res) => res.json({ site }));
app.get("/api/articles", (req, res) => res.json({ articles }));
app.get("/api/articles/:slug", (req, res) => {
  const article = articles.find((a) => a.slug === req.params.slug);
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json({ article });
});
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const entry = {
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  };
  const existing = JSON.parse(fs.readFileSync(CONTACT_FILE, "utf8"));
  existing.unshift(entry);
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(existing, null, 2), "utf8");
  res.json({ ok: true });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`TechNexis running on port ${PORT}`);
});
