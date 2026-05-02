const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "public");
const dataPath = path.join(__dirname, "data");
const postsFile = path.join(dataPath, "posts.json");
const contactsFile = path.join(dataPath, "contacts.json");

if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath, { recursive: true });

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const siteData = {
  name: "TechNexis",
  tagline: "AI Tools + Tech Blog",
  description: "Modern AI tools and tech blog for developers and creators.",
  url: "https://technexiss.in"
};

const defaultPosts = [
  {
    id: 1,
    slug: "ai-tools-guide-2026-complete-overview",
    title: "AI Tools Guide 2026 - Complete Overview",
    category: "AI",
    tag: "Tech",
    date: "2026-01-01",
    readingTime: "5 min read",
    intro: "AI tools productivity badha rahe hain aur kaam ko fast bana rahe hain.",
    what: "AI tools software hote hain jo automation, writing, research, image generation aur smart output dete hain.",
    features: ["Automation", "Speed", "Accuracy"],
    pros: "Fast aur efficient, beginners ke liye helpful.",
    cons: "Internet required aur some tools paid hote hain.",
    best: ["ChatGPT", "Gemini", "Claude"],
    comparison: "ChatGPT vs Gemini vs Claude comparison table yaha show hoga.",
    faqs: ["AI kya hai?", "Kya AI free hai?"],
    conclusion: "AI future ka base hai aur sab industries me use hoga.",
    cover: "This guide explains how AI tools are changing productivity, automation, and online work in 2026.",
    excerpt: "AI tools productivity badha rahe hain aur kaam ko fast bana rahe hain.",
    sections: [
      "AI tools kya hote hain aur kaise kaam karte hain",
      "Top use cases for creators, students, and businesses",
      "Best tools to start with in 2026",
      "How to use AI safely and effectively"
    ]
  },
  {
    id: 2,
    slug: "modern-tech-blogging-strategy-that-works",
    title: "Modern Tech Blogging Strategy That Works",
    category: "Blogging",
    tag: "SEO",
    date: "2026-01-05",
    readingTime: "5 min read",
    intro: "Tech blog grow karna chahte ho to SEO, content clusters aur intent targeting pe focus karo.",
    what: "Tech blogging ek long-term content system hai jisme useful posts, SEO, aur trust build hota hai.",
    features: ["SEO", "Traffic", "Monetization"],
    pros: "Long term income aur authority build hoti hai.",
    cons: "Time lagta hai aur consistency chahiye.",
    best: ["WordPress", "Ghost", "Hashnode"],
    comparison: "WordPress vs Ghost vs Hashnode comparison.",
    faqs: ["Blog kaise start kare?", "Traffic kaise laye?"],
    conclusion: "Consistency aur useful content hi growth laata hai.",
    cover: "Learn how modern tech blogs grow using SEO, content clusters, and user intent targeting.",
    excerpt: "Learn how modern tech blogs grow using SEO, content clusters, and user intent targeting.",
    sections: [
      "Keyword aur topic research",
      "Content clusters ka use",
      "Internal linking strategy",
      "Update old posts regularly"
    ]
  },
  {
    id: 3,
    slug: "how-to-build-a-saas-website-from-scratch",
    title: "How to Build a SaaS Website from Scratch",
    category: "Development",
    tag: "Build",
    date: "2026-01-10",
    readingTime: "5 min read",
    intro: "SaaS website banana ho to UI, backend, routing aur deployment sab clean rakho.",
    what: "SaaS website ek subscription-based product hota hai jisme features, dashboard aur payments hote hain.",
    features: ["Routing", "API", "Deployment"],
    pros: "Scalable aur professional product feel deta hai.",
    cons: "Planning aur technical setup heavy hota hai.",
    best: ["Node.js", "Express", "Render"],
    comparison: "Node.js vs PHP vs Python backend comparison.",
    faqs: ["SaaS kya hota hai?", "Isko deploy kaise kare?"],
    conclusion: "Good UX + solid backend = strong SaaS product.",
    cover: "Step-by-step SaaS architecture guide using Node.js, APIs, and deployment strategies.",
    excerpt: "Step-by-step SaaS architecture guide using Node.js, APIs, and deployment strategies.",
    sections: [
      "Frontend structure and layout",
      "Backend API design",
      "Database and persistence",
      "Deployment best practices"
    ]
  }
];

function loadPosts() {
  try {
    if (!fs.existsSync(postsFile)) {
      fs.writeFileSync(postsFile, JSON.stringify(defaultPosts, null, 2));
      return [...defaultPosts];
    }

    const raw = fs.readFileSync(postsFile, "utf8");
    const parsed = JSON.parse(raw || "[]");

    if (!Array.isArray(parsed) || parsed.length === 0) {
      fs.writeFileSync(postsFile, JSON.stringify(defaultPosts, null, 2));
      return [...defaultPosts];
    }

    return parsed;
  } catch (err) {
    console.error("Failed to load posts.json:", err.message);
    return [...defaultPosts];
  }
}

function savePosts(posts) {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
}

function normalizePost(post) {
  const title = post.title || "Untitled Post";
  const slug = post.slug || slugify(title);
  return {
    id: post.id || Date.now(),
    slug,
    title,
    category: post.category || "AI",
    tag: post.tag || "Tech",
    date: post.date || new Date().toISOString().slice(0, 10),
    readingTime: post.readingTime || post.read || "5 min read",
    intro: post.intro || post.excerpt || post.content || "",
    what: post.what || post.content || "",
    features: Array.isArray(post.features)
      ? post.features
      : String(post.features || "").split(",").map(s => s.trim()).filter(Boolean),
    pros: post.pros || "",
    cons: post.cons || "",
    best: Array.isArray(post.best)
      ? post.best
      : String(post.best || "").split(",").map(s => s.trim()).filter(Boolean),
    comparison: post.comparison || "",
    faqs: Array.isArray(post.faqs)
      ? post.faqs
      : String(post.faqs || "").split(",").map(s => s.trim()).filter(Boolean),
    conclusion: post.conclusion || "",
    cover: post.cover || post.excerpt || post.content || "",
    excerpt: post.excerpt || post.intro || post.content || "",
    sections: Array.isArray(post.sections)
      ? post.sections
      : [
          "Introduction",
          "Main idea",
          "Practical usage",
          "Conclusion"
        ]
  };
}

function readPosts() {
  return loadPosts().map(normalizePost);
}

function writePosts(posts) {
  savePosts(posts);
}

function renderPage(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${siteData.description}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#f8fafc" />
  <title>${title} — ${siteData.name}</title>
  <style>
    :root{
      --bg:#f5f7fb;
      --panel:#ffffff;
      --text:#0f172a;
      --muted:#64748b;
      --line:#e2e8f0;
      --accent:#2563eb;
      --accent2:#7c3aed;
      --shadow:0 18px 45px rgba(15,23,42,.08);
      --radius:22px;
      --max:980px;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      background:linear-gradient(180deg,#f8fbff 0%,#f5f7fb 60%,#eef4ff 100%);
      color:var(--text);
      min-height:100vh;
    }
    a{color:inherit;text-decoration:none}
    .wrap{max-width:var(--max);margin:0 auto;padding:18px}
    .topbar{
      display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;
      padding:14px 18px;border:1px solid rgba(226,232,240,.95);
      border-radius:24px;background:rgba(255,255,255,.82);backdrop-filter:blur(14px);
      box-shadow:var(--shadow);
    }
    .brand{font-weight:900;font-size:18px}
    .nav{display:flex;flex-wrap:wrap;gap:8px}
    .nav a{
      padding:10px 12px;border:1px solid var(--line);border-radius:999px;background:#fff;color:#334155;
    }
    .nav a:hover{border-color:rgba(37,99,235,.22)}
    .panel{
      margin-top:18px;
      padding:24px;
      border:1px solid rgba(226,232,240,.95);
      border-radius:var(--radius);
      background:var(--panel);
      box-shadow:var(--shadow);
    }
    h1{margin:0 0 12px;font-size:clamp(1.8rem,4vw,3rem);letter-spacing:-.04em}
    h2{margin-top:26px;margin-bottom:10px;font-size:1.15rem}
    p,li{color:#475569;line-height:1.9;font-size:1.02rem}
    ul{padding-left:20px}
    .btn{
      display:inline-flex;align-items:center;gap:8px;
      padding:10px 14px;border-radius:999px;border:1px solid var(--line);background:#fff;
      box-shadow:0 1px 0 rgba(15,23,42,.03);cursor:pointer;
    }
    .btn:hover{border-color:rgba(37,99,235,.24)}
    .meta{display:flex;flex-wrap:wrap;gap:12px;color:var(--muted);font-size:13px;margin:6px 0 16px}
    .footer{
      margin:22px 0 12px;padding:18px 4px 0;border-top:1px solid rgba(226,232,240,.95);
      display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;color:var(--muted);
    }
    form{display:grid;gap:12px;margin-top:14px}
    input,textarea{
      width:100%;padding:13px 14px;border-radius:14px;border:1px solid var(--line);
      background:#fff;color:var(--text);outline:none;font:inherit;
    }
    textarea{min-height:140px;resize:vertical}
    input:focus,textarea:focus{border-color:rgba(37,99,235,.6);box-shadow:0 0 0 4px rgba(37,99,235,.08)}
    .notice{
      margin:16px 0;padding:14px 16px;border-radius:16px;
      background:linear-gradient(180deg, rgba(37,99,235,.08), rgba(124,58,237,.05));
      border:1px solid rgba(37,99,235,.12);
      color:#1e3a8a;
    }
    .grid{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
      gap:12px;
      margin-top:14px;
    }
    .card{
      border:1px solid var(--line);
      border-radius:18px;
      padding:14px;
      background:#fff;
    }
    .card strong{display:block;margin-bottom:8px}
    @media (max-width: 720px){
      .wrap{padding:14px}
      .panel{padding:18px}
      .topbar{align-items:flex-start}
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header class="topbar">
      <div class="brand">${siteData.name}</div>
      <nav class="nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/rules">Rules</a>
        <a href="/terms">Terms</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </nav>
    </header>

    <main class="panel">
      ${content}
    </main>

    <footer class="footer">
      <div>© ${new Date().getFullYear()} ${siteData.name}</div>
      <div><a href="/">Back to Home</a></div>
    </footer>
  </div>
</body>
</html>`;
}

function renderAboutPage() {
  return renderPage("About Us", `
    <h1>About Us</h1>
    <p>
      ${siteData.name} is a simple AI tools and tech blog built to share useful guides, blogging ideas,
      product style tutorials, and practical content for readers who want clarity.
    </p>
    <div class="notice">
      We focus on readable design, clean structure, and helpful articles that are easy to browse on mobile.
    </div>
    <div class="grid">
      <div class="card"><strong>AI tools</strong><span>Prompt guides, tool reviews, automation ideas.</span></div>
      <div class="card"><strong>Blogging</strong><span>SEO, structure, growth, and content strategy.</span></div>
      <div class="card"><strong>Development</strong><span>Build, deploy, and improve web projects.</span></div>
    </div>
  `);
}

function renderRulesPage() {
  return renderPage("Rules & Community Guidelines", `
    <h1>Rules & Community Guidelines</h1>
    <p>These rules keep the platform safe, useful, and easy to read.</p>
    <ul>
      <li>Be respectful and keep the tone professional.</li>
      <li>Do not submit harmful, misleading, or spam content.</li>
      <li>Do not post copyrighted material without permission.</li>
      <li>Use the site only for lawful and responsible purposes.</li>
    </ul>
  `);
}

function renderTermsPage() {
  return renderPage("Terms of Use", `
    <h1>Terms of Use</h1>
    <p>
      Content on this site is provided for general information only. We may update, remove, or modify
      content and site features at any time.
    </p>
    <ul>
      <li>You are responsible for how you use the information here.</li>
      <li>We do not guarantee that every article is complete or error-free.</li>
      <li>We can change these terms at any time.</li>
    </ul>
  `);
}

function renderPrivacyPage() {
  return renderPage("Privacy Policy", `
    <h1>Privacy Policy</h1>
    <p>
      We collect only the information you submit through forms or what is needed to run the website.
    </p>
    <ul>
      <li>We may store contact submissions to respond to messages.</li>
      <li>We do not sell personal data.</li>
      <li>We may use basic analytics or logs to improve the site.</li>
    </ul>
  `);
}

function renderContactPage() {
  return renderPage("Contact Us", `
    <h1>Contact Us</h1>
    <p>Send feedback, partnership requests, corrections, or general questions.</p>
    <form id="contactForm">
      <input name="name" placeholder="Your name" required />
      <input name="email" type="email" placeholder="Your email" required />
      <textarea name="message" placeholder="Your message" required></textarea>
      <button class="btn" type="submit">Send Message</button>
      <small style="color:var(--muted);line-height:1.6">This form sends data to the backend API.</small>
    </form>
    <script>
      document.getElementById("contactForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        alert(data.message || (res.ok ? "Message sent." : "Something went wrong."));
        if (res.ok) e.target.reset();
      });
    </script>
  `);
}

app.use(express.static(publicPath));

app.get("/api/site", (req, res) => {
  res.json({ site: siteData });
});

app.get("/api/status", (req, res) => {
  res.json({ status: "running", name: siteData.name });
});

app.get("/api/articles", (req, res) => {
  const posts = readPosts();
  res.json({
    articles: posts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      tag: p.tag,
      date: p.date,
      readingTime: p.readingTime,
      intro: p.intro,
      what: p.what,
      features: p.features,
      pros: p.pros,
      cons: p.cons,
      best: p.best,
      comparison: p.comparison,
      faqs: p.faqs,
      conclusion: p.conclusion,
      cover: p.cover,
      excerpt: p.excerpt,
      sections: p.sections
    }))
  });
});

app.get("/api/post/:slug", (req, res) => {
  const posts = readPosts();
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json({ post });
});

app.get("/api/meta/:slug", (req, res) => {
  const posts = readPosts();
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.json({});

  res.json({
    title: post.title,
    description: post.excerpt || post.intro || post.cover || post.conclusion || siteData.description,
    url: `${siteData.url}/blog/${post.slug}`,
    image: `${siteData.url}/og.png`
  });
});

app.post("/api/posts", (req, res) => {
  const {
    title,
    category,
    tag,
    date,
    readingTime,
    intro,
    what,
    features,
    pros,
    cons,
    best,
    comparison,
    faqs,
    conclusion
  } = req.body || {};

  if (!title || !String(title).trim()) {
    return res.status(400).json({ success: false, message: "Title is required" });
  }

  const posts = readPosts();
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 2;
  while (posts.some(p => p.slug === slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  const post = normalizePost({
    id: Date.now(),
    title: String(title).trim(),
    slug,
    category: String(category || "AI").trim() || "AI",
    tag: String(tag || "Tech").trim() || "Tech",
    date: String(date || new Date().toISOString().slice(0, 10)).trim(),
    readingTime: String(readingTime || "5 min read").trim() || "5 min read",
    intro: String(intro || "").trim(),
    what: String(what || "").trim(),
    features: String(features || "").split(",").map(s => s.trim()).filter(Boolean),
    pros: String(pros || "").trim(),
    cons: String(cons || "").trim(),
    best: String(best || "").split(",").map(s => s.trim()).filter(Boolean),
    comparison: String(comparison || "").trim(),
    faqs: String(faqs || "").split(",").map(s => s.trim()).filter(Boolean),
    conclusion: String(conclusion || "").trim(),
    cover: String(intro || "").trim() || String(title).trim(),
    excerpt: String(intro || "").trim() || String(title).trim(),
    sections: [
      "Introduction",
      "Main idea",
      "Practical usage",
      "Conclusion"
    ]
  });

  posts.unshift(post);
  writePosts(posts);

  res.json({ success: true, post });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  let data = [];
  try {
    if (fs.existsSync(contactsFile)) {
      data = JSON.parse(fs.readFileSync(contactsFile, "utf8") || "[]");
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

  fs.writeFileSync(contactsFile, JSON.stringify(data, null, 2));

  res.json({
    success: true,
    message: "Message received successfully"
  });
});

app.get("/sitemap.xml", (req, res) => {
  const posts = readPosts();
  const urls = [
    { loc: `${siteData.url}/`, lastmod: new Date().toISOString().slice(0, 10) },
    { loc: `${siteData.url}/about` },
    { loc: `${siteData.url}/contact` },
    { loc: `${siteData.url}/rules` },
    { loc: `${siteData.url}/terms` },
    { loc: `${siteData.url}/privacy-policy` },
    ...posts.map(p => ({
      loc: `${siteData.url}/blog/${p.slug}`,
      lastmod: p.date
    }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `
    <lastmod>${u.lastmod}</lastmod>` : ""}
  </url>`).join("\n")}
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

app.get("/about", (req, res) => res.send(renderAboutPage()));
app.get("/contact", (req, res) => res.send(renderContactPage()));
app.get("/rules", (req, res) => res.send(renderRulesPage()));
app.get("/terms", (req, res) => res.send(renderTermsPage()));
app.get("/privacy-policy", (req, res) => res.send(renderPrivacyPage()));

app.get("*", (req, res) => {
  const indexPath = path.join(publicPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("index.html not found in public folder");
  }
});

app.listen(PORT, () => {
  console.log(`${siteData.name} running on port ${PORT}`);
});
