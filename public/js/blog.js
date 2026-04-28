const featured = [
  {
    slug: "best-ai-tools-for-students-2026",
    title: "Best AI Tools for Students in 2026",
    category: "AI Tools",
    excerpt: "Practical AI tools for notes, summaries, homework, and revision.",
    date: "2026-04-28"
  },
  {
    slug: "chatgpt-prompts-for-bloggers",
    title: "30 ChatGPT Prompts for Bloggers",
    category: "Blogging",
    excerpt: "Ready-made prompts to plan, draft, and improve SEO.",
    date: "2026-04-27"
  },
  {
    slug: "best-free-ai-image-tools",
    title: "Best Free AI Image Tools",
    category: "AI Tools",
    excerpt: "Tools for creators, thumbnails, and quick visual assets.",
    date: "2026-04-26"
  }
];

function renderCards() {
  const list = document.getElementById("blog-list");
  if (!list) return;
  list.innerHTML = featured.map((a) => `
    <article class="card">
      <div class="thumb">
        <div class="pill">${a.category}</div>
        <div>
          <h3>${a.title}</h3>
          <p>${a.excerpt}</p>
        </div>
      </div>
      <div class="meta">
        <span>🗓 ${new Date(a.date).toLocaleDateString()}</span>
      </div>
      <div class="card-body">
        <p class="excerpt">Static preview page linked to dynamic post routes in the main app.</p>
        <div class="card-actions">
          <a class="link" href="/blog/${a.slug}">Read article →</a>
        </div>
      </div>
    </article>
  `).join("");
}
renderCards();
