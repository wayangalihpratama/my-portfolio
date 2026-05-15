# Low-Level Design (LLD) - Galih Pratama Portfolio

## System Overview
The portfolio is a high-performance static site built with **Astro** and **Tailwind CSS**. It follows a component-driven architecture where content is externalized to data files to ensure maintainability and separation of concerns.

## Architecture Diagram
```mermaid
graph TD
    A[src/data/projects.json] --> B[src/components/ProjectsSection.astro]
    B --> F[src/components/ProjectGrid.tsx]
    F --> C[src/pages/index.astro]
    C --> D[Dist/Static HTML]
    E[Tailwind CSS] --> C
    G[Framer Motion] --> F
```

## Data Models

### Project Schema
Stored in `src/data/projects.json`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique slug (e.g., `akvo-rag`) |
| `name` | String | Display name of the project |
| `description` | String | Short pitch of the project |
| `tags` | Array[String]| Technical stack or skills |
| `link` | String | External URL |
| `featured` | Boolean | Whether to show in the featured section |
| `color` | String | UI accent color (red, blue, green, amber) |
| `category` | String | Project type (Enterprise, AI & RAG, Tools, Personal) |

## Tech Stack (Aligned)
- **Framework**: Astro v5
- **UI**: React 19 + Tailwind CSS v4
- **Animations**: Framer Motion
- **Runtime**: Docker (via `./dc.sh` wrapper)

### ADR-001: JSON Content Externalization
- **Status**: Accepted
- **Context**: Project data was hardcoded in `ProjectsSection.astro`, leading to high coupling between content and UI.
- **Decision**: Externalize all project metadata to `src/data/projects.json`.
- **Alternatives Considered**: Markdown (Astro Content Collections). Selected JSON for its simplicity and direct mapping to the existing project array structure.
- **Consequences**: Improved maintainability; content can be updated by non-developers or via automated scripts (like this agent).

## Security & Performance
- **Static Generation**: All content is pre-rendered at build time for maximum speed and security.
- **Image Optimization**: Astro's built-in image processing is used for any project assets.
