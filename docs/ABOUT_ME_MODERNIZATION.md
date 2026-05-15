# Feature Specification: About Me Modernization

## 🎯 Goal
Transform the "About Me" section from a static component into a dynamic, data-driven system that reflects real-time professional growth.

## 📐 Architecture
- **Data Source**: `src/data/about.json`
- **Component**: `src/components/AboutSection.astro`
- **Visuals**: Glassmorphism, animated skill bars, and category-aware theming.

## 🛠️ Data Schema (`about.json`)
```json
{
  "summary": "...",
  "skills": [
    { "name": "Enterprise Systems", "percentage": 95, "color": "blue" },
    { "name": "AI & RAG Development", "percentage": 90, "color": "green" }
  ],
  "values": [
    { "title": "Precision", "description": "...", "icon": "..." }
  ],
  "stats": {
    "yearsExperience": 5,
    "projectsCompleted": 15
  }
}
```

## ✅ Definition of Done
- All hardcoded text moved to JSON.
- Skill bars animate on scroll.
- Category colors match the Projects section.
- Build passes in Docker.
