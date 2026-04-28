
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Dummy blog data
const articles = [
  {
    id: 1,
    title: "Best AI Tools in 2026",
    category: "AI",
    content: "AI tools are growing fast. This article explains top tools."
  },
  {
    id: 2,
    title: "How to Start Tech Blog",
    category: "Blogging",
    content: "Step by step guide to start tech blog with SEO."
  },
  {
    id: 3,
    title: "Make Money with Tech Website",
    category: "Earning",
    content: "Learn how to monetize tech blogs with AdSense."
  }
];

// API: site info
app.get("/api/site", (req, res) => {
  res.json({
    name: "TechNexis",
    tagline: "AI Tools + Tech Blog"
  });
});

// API: articles list
app.get("/api/articles", (req, res) => {
  res.json(articles);
});

// API: single article
app.get("/api/article/:id", (req, res) => {
  const article = articles.find(a => a.id == req.params.id);
  if (!article) return res.status(404).json({ error: "Not found" });
  res.json(article);
});

// contact API
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false });
  }
  return res.json({ success: true });
});

// fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("TechNexis running on port", PORT);
});
