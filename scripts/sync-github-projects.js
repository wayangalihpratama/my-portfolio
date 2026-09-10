import fs from 'fs';
import path from 'path';

const GITHUB_USERNAME = 'wayangalihpratama';
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/projects.json');

const CURATED_OVERLAY = {
  "akvo-rag": {
    name: "Akvo RAG System",
    description: "Core architecture for retrieval-augmented generation, enabling intelligent data-driven responses for global development platforms.",
    longDescription: "Built an enterprise Retrieval-Augmented Generation (RAG) pipeline enabling semantic vector search and LLM contextual synthesis across massive unstructured project datasets.",
    link: "https://github.com/akvo/akvo-rag",
    category: "Akvo Projects",
    color: "green",
    featured: true,
    achievements: [
      "Reduced query latency by 40% using vector indexing optimization",
      "Multi-modal doc parsing for PDFs, Excel, and structured JSON",
      "Integrated strict role-based data isolation"
    ]
  },
  "akvo-form-print": {
    name: "AkvoFormPrint",
    description: "A specialized Python tool for rendering modular forms into high-fidelity PDF or HTML using WeasyPrint and Jinja2.",
    longDescription: "Architected a high-fidelity PDF and HTML rendering engine designed to convert dynamic survey and monitoring forms into formatted printable reports.",
    link: "https://github.com/akvo/AkvoFormPrint-init",
    category: "Akvo Projects",
    color: "green",
    featured: true,
    achievements: [
      "Pixel-perfect Jinja2 HTML to WeasyPrint PDF conversion",
      "Supports dynamic page breaks, headers, footers, and images",
      "CLI & microservice wrapper for asynchronous job processing"
    ]
  },
  "akvo-react-form-editor": {
    name: "Akvo React Form Editor",
    description: "Modular drag-and-drop form builder component library for designing complex dynamic survey forms.",
    longDescription: "Engineered a React-based interactive form builder enabling non-technical users to build complex logic flows, question groups, and validation rules.",
    link: "https://github.com/akvo/akvo-react-form-editor",
    category: "Akvo Projects",
    color: "blue",
    featured: true,
    achievements: [
      "Dynamic field validation rules & conditional branching",
      "Export/Import schema compatibility with Akvo Flow forms",
      "High performance canvas rendering"
    ]
  },
  "akvo-react-form": {
    name: "Akvo React Form",
    description: "High-performance React form rendering engine for executing dynamic survey questionnaires with offline storage support.",
    longDescription: "Core frontend form runtime component that parses JSON form schemas and renders interactive responsive inputs with client-side validation.",
    link: "https://github.com/akvo/akvo-react-form",
    category: "Akvo Projects",
    color: "blue",
    featured: true,
    achievements: [
      "Offline-first state storage for remote data collection",
      "Cascading multi-level selection inputs & geospatial data capture"
    ]
  },
  "idh-idc": {
    name: "IDH-IDC Platform",
    description: "Maintenance and feature development for large-scale data portals, ensuring data integrity and user-friendly reporting.",
    longDescription: "Maintained and expanded enterprise data portal features for IDH Sustainable Trade Initiative, handling multi-tenant reporting dashboards and data exports.",
    link: "https://github.com/akvo/idh-idc",
    category: "Akvo Projects",
    color: "blue",
    featured: true,
    achievements: [
      "Engineered automated data validation scripts in PHP & MySQL",
      "Containerized legacy service environments with Docker Compose"
    ]
  },
  "science-for-africa": {
    name: "Science for Africa Platform",
    description: "High-impact collaboration platform for the Science for Africa Foundation, featuring complex OAuth integrations.",
    longDescription: "Developed key frontend features and OAuth authentication workflows for the Science for Africa Foundation platform, powering research collaboration across the continent.",
    link: "https://github.com/akvo/science-for-africa",
    category: "Akvo Projects",
    color: "blue",
    featured: false,
    achievements: [
      "Integrated multi-provider OAuth authentication",
      "Designed responsive research grant application workflows",
      "Optimized client-side rendering performance"
    ]
  },
  "localrag-vision": {
    name: "LocalRAG Vision",
    description: "Privacy-first multimodal retrieval-augmented generation pipeline using local vision LLMs.",
    longDescription: "Local RAG pipeline capable of performing semantic search and contextual visual QA over image and document collections.",
    category: "Personal Projects",
    color: "amber",
    featured: false,
    achievements: [
      "Local multimodal vector embeddings and document parsing",
      "100% offline local LLM inference without cloud dependencies"
    ]
  }
};

function inferCategory(repo) {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();

  if (name.includes('akvo') || desc.includes('akvo') || name.includes('idh-idc') || name.includes('science-for-africa')) {
    return 'Akvo Projects';
  }
  return 'Personal Projects';
}

function inferColor(category) {
  switch (category) {
    case 'Akvo Projects': return 'blue';
    case 'Personal Projects': return 'amber';
    default: return 'green';
  }
}

function inferStatus(repo, category) {
  if (category === 'Akvo Projects') {
    return 'completed';
  }
  return 'in-development';
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
    const status = overlay.status || inferStatus(repo, category);

    const tags = Array.from(new Set([
      ...(repo.language ? [repo.language] : []),
      ...(repo.topics || [])
    ])).slice(0, 5);

    if (tags.length === 0) {
      tags.push('GitHub Project');
    }

    projectsMap.set(id, {
      id,
      name: overlay.name || repo.name,
      description: overlay.description || repo.description || 'Public GitHub repository project.',
      longDescription: overlay.longDescription || (repo.description ? `${repo.description} (Synced directly from GitHub repository ${repo.full_name}).` : `Open-source software project hosted on GitHub (${repo.full_name}).`),
      achievements: overlay.achievements || [
        `⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count}`,
        `Updated: ${new Date(repo.updated_at).toLocaleDateString()}`
      ],
      tags,
      link: overlay.link || repo.html_url,
      featured: overlay.featured !== undefined ? overlay.featured : repo.stargazers_count > 1,
      color,
      category,
      status
    });
  }

  // 2. Add enterprise/curated projects that might not be on user's personal public github
  for (const [id, overlay] of Object.entries(CURATED_OVERLAY)) {
    if (!projectsMap.has(id)) {
      projectsMap.set(id, {
        id,
        name: overlay.name || id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: overlay.description || `Enterprise solution built for ${id.split('-')[0].toUpperCase()}.`,
        longDescription: overlay.longDescription || `Enterprise application development and engineering solution.`,
        achievements: overlay.achievements || [],
        tags: ["Enterprise", "Python", "Full-Stack"],
        link: overlay.link || "#",
        featured: overlay.featured !== undefined ? overlay.featured : false,
        color: overlay.color || 'blue',
        category: overlay.category || 'Enterprise',
        status: overlay.status || 'completed'
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
