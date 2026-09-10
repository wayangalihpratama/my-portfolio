import fs from 'fs';
import path from 'path';

const GITHUB_USERNAME = 'wayangalihpratama';
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/projects.json');

// Local curated projects (e.g., enterprise projects or custom descriptions/achievements)
const CURATED_OVERLAY = {
  "akvo-rag": {
    category: "AI & RAG",
    color: "green",
    featured: true,
    achievements: [
      "Reduced query latency by 40% using vector indexing optimization",
      "Multi-modal doc parsing for PDFs, Excel, and structured JSON",
      "Integrated strict role-based data isolation"
    ]
  },
  "science-for-africa": {
    category: "Enterprise",
    color: "blue",
    featured: true,
    achievements: [
      "Integrated multi-provider OAuth authentication",
      "Designed responsive research grant application workflows",
      "Optimized client-side rendering performance"
    ]
  },
  "akvo-form-print": {
    category: "Tools",
    color: "amber",
    featured: true,
    achievements: [
      "Pixel-perfect Jinja2 HTML to WeasyPrint PDF conversion",
      "Supports dynamic page breaks, headers, footers, and images",
      "CLI & microservice wrapper for asynchronous job processing"
    ]
  },
  "idh-idc": {
    category: "Enterprise",
    color: "blue",
    featured: false,
    achievements: [
      "Engineered automated data validation scripts in PHP & MySQL",
      "Containerized legacy service environments with Docker Compose"
    ]
  }
};

function inferCategory(repo) {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  const topics = repo.topics || [];

  if (topics.includes('rag') || topics.includes('ai') || name.includes('rag') || desc.includes('rag') || desc.includes('ai')) {
    return 'AI & RAG';
  }
  if (topics.includes('tool') || name.includes('cli') || desc.includes('tool') || name.includes('mcp')) {
    return 'Tools';
  }
  if (name.includes('dash') || name.includes('portfolio') || name.includes('learn')) {
    return 'Personal';
  }
  return 'Tools';
}

function inferColor(category) {
  switch (category) {
    case 'AI & RAG': return 'green';
    case 'Enterprise': return 'blue';
    case 'Tools': return 'amber';
    default: return 'red';
  }
}

async function syncProjects() {
  console.log(`📡 Fetching public repositories for user "${GITHUB_USERNAME}" from GitHub API...`);

  let fetchedRepos = [];
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers: {
        'User-Agent': 'Portfolio-Sync-Script'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}: ${response.statusText}`);
    }

    fetchedRepos = await response.json();
    console.log(`✓ Successfully fetched ${fetchedRepos.length} repositories from GitHub.`);
  } catch (err) {
    console.warn(`⚠️ Failed to fetch live repos from GitHub API (${err.message}). Using existing fallback data.`);
    return;
  }

  // Filter out forks or profile repos if desired
  const publicRepos = fetchedRepos.filter(repo => !repo.fork && repo.name !== GITHUB_USERNAME);

  const projectsMap = new Map();

  // 1. Process live GitHub Repos
  for (const repo of publicRepos) {
    const id = repo.name.toLowerCase();
    const overlay = CURATED_OVERLAY[id] || {};

    const category = overlay.category || inferCategory(repo);
    const color = overlay.color || inferColor(category);

    const tags = Array.from(new Set([
      ...(repo.language ? [repo.language] : []),
      ...(repo.topics || [])
    ])).slice(0, 5);

    if (tags.length === 0) {
      tags.push('GitHub Project');
    }

    projectsMap.set(id, {
      id,
      name: repo.name,
      description: repo.description || 'Public GitHub repository project.',
      longDescription: repo.description ? `${repo.description} (Synced directly from GitHub repository ${repo.full_name}).` : `Open-source software project hosted on GitHub (${repo.full_name}).`,
      achievements: overlay.achievements || [
        `⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count}`,
        `Updated: ${new Date(repo.updated_at).toLocaleDateString()}`
      ],
      tags,
      link: repo.html_url,
      featured: overlay.featured !== undefined ? overlay.featured : repo.stargazers_count > 2,
      color,
      category
    });
  }

  // 2. Add enterprise/curated projects that might not be on user's personal public github
  for (const [id, overlay] of Object.entries(CURATED_OVERLAY)) {
    if (!projectsMap.has(id)) {
      projectsMap.set(id, {
        id,
        name: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: `Enterprise solution built for ${id.split('-')[0].toUpperCase()}.`,
        longDescription: `Enterprise application development and engineering solution.`,
        achievements: overlay.achievements || [],
        tags: ["Enterprise", "Python", "Full-Stack"],
        link: "#",
        featured: overlay.featured || false,
        color: overlay.color || 'blue',
        category: overlay.category || 'Enterprise'
      });
    }
  }

  const sortedProjects = Array.from(projectsMap.values()).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const outputPayload = {
    lastSynced: new Date().toISOString(),
    projects: sortedProjects
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputPayload, null, 2), 'utf-8');
  console.log(`✅ Successfully updated ${OUTPUT_FILE} with ${sortedProjects.length} dynamic projects!`);
}

syncProjects();
