const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 10000;

// ===================== MIDDLEWARE =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SAFE PUBLIC PATH
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// ===================== BASIC SITE DATA =====================
const siteData = {
  name: "TechNexis",
  tagline: "AI Tools + Tech Blog",
  description: "Modern AI tools and tech blog for developers and creators."
};

// ===================== REAL BLOG POSTS (STRUCTURED) =====================
const posts = [
  {
    id: 1,
    slug: "ai-tools-2026-guide",
    title: "AI Tools Guide 2026 - Complete Overview",
    category: "AI Tools",
    content: "This guide explains how AI tools are changing productivity, automation, and online work in 2026.",
    date: "2026-01-01"
  },
  {
    id: 2,
    slug: "modern-tech-blogging-strategy",
    title: "Modern Tech Blogging Strategy That Works",
    category: "Blogging",
    content: "Learn how modern tech blogs grow using SEO, content clusters, and user intent targeting.",
    date: "2026-01-05"
  },
  {
    id: 3,
    slug: "how-to-build-saas-website",
    title: "How to Build a SaaS Website from Scratch",
    category: "Development",
    content: "Step-by-step SaaS architecture guide using Node.js, APIs, and deployment strategies.",
    date: "2026-01-10"
  }
];

// ===================== API ROUTES =====================
app.get("/api/site", (req, res) => {
  res.json({
    site: siteData
  });
});

app.get("/api/articles", (req, res) => {
  res.json({
    articles: posts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      excerpt: p.content,
      cover: p.content,
      tag: "Tech",
      readingTime: "5 min read",
      date: p.date,
      sections: [
        "Introduction to topic",
        "Main concept explained",
        "Practical use case",
        "Conclusion and future scope"
      ]
    }))
  });
});

// Single Post by ID
app.get("/api/post/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// Single Post by SLUG (SEO friendly)
app.get("/api/post/slug/:slug", (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// ===================== STATIC PAGES ROUTES =====================

app.get("/about", (req, res) => {
  res.sendFile(path.join(publicPath, "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(publicPath, "contact.html"));
});

app.get("/terms", (req, res) => {
  res.sendFile(path.join(publicPath, "terms.html"));
});

app.get("/privacy-policy", (req, res) => {
  res.sendFile(path.join(publicPath, "privacy-policy.html"));
});

app.get("/rules", (req, res) => {
  res.sendFile(path.join(publicPath, "rules.html"));
});

// ===================== CONTACT API =====================
const contactFile = path.join(__dirname, "data", "contacts.json");

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  let data = [];

  try {
    if (fs.existsSync(contactFile)) {
      data = JSON.parse(fs.readFileSync(contactFile));
    }
  } catch (err) {
    data = [];
  }

  data.push({
    name,
    email,
    message,
    date: new Date().toISOString()
  });

  fs.writeFileSync(contactFile, JSON.stringify(data, null, 2));

  res.json({
    success: true,
    message: "Message received successfully"
  });
});

// ===================== HEALTH CHECK =====================
app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    name: siteData.name
  });
});

// ===================== FALLBACK =====================
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// ===================== SERVER START =====================
app.listen(PORT, () => {
  console.log(`${siteData.name} running on port ${PORT}`);
});
