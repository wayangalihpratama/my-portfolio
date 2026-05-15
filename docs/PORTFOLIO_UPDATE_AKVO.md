# Feature Spec: Portfolio Content Migration & April 2026 Update

## Overview
This feature involves migrating the portfolio's project data from a hardcoded array to an external JSON file and adding several new projects based on the user's high-impact work in April 2026.

## User Stories
- **As a Developer**, I want to manage project content in a dedicated JSON file so that I don't have to modify component code for simple content updates.
- **As a Portfolio Owner**, I want to showcase my breadth of work across Enterprise Systems, AI (RAG), and custom Tools (AkvoFormPrint).

## Technical Requirements
- Create `src/data/projects.json` to store project metadata.
- Update `src/components/ProjectsSection.astro` to import and render the JSON file.
- Categorize projects into: `Enterprise`, `AI & RAG`, `Tools`, and `Personal`.
- Key Projects to Include:
    - **Akvo RAG System** (Featured, AI & RAG)
    - **Science for Africa** (Featured, Enterprise)
    - **AkvoFormPrint** (Featured, Tools)
    - **AgMCP** (Agentic AI)
    - **IDH-IDC Platform** (Enterprise)
    - **Autoffiliate** (Automation)
    - **Dawn Dash** (Personal)

## Data Model (JSON Schema)
```json
{
  "projects": [
    {
      "id": "string (slug)",
      "name": "string",
      "description": "string",
      "tags": ["string"],
      "link": "string",
      "featured": "boolean",
      "color": "string (red | blue | green | amber)",
      "category": "string (Enterprise | AI & RAG | Tools | Personal)"
    }
  ]
}
```


## Architectural Decision Records (ADRs)

### ADR-001: JSON Content Externalization
- **Status**: Accepted
- **Context**: Project data was hardcoded in `ProjectsSection.astro`, leading to high coupling between content and UI.
- **Decision**: Externalize all project metadata to `src/data/projects.json`.
- **Alternatives Considered**: Markdown (Astro Content Collections). Selected JSON for its simplicity and direct mapping to the existing project array structure.
- **Consequences**: Improved maintainability; content can be updated by non-developers or via automated scripts (like this agent).

## Success Criteria
- [ ] `src/data/projects.json` exists with at least 6 high-quality project entries.
- [ ] `ProjectsSection.astro` renders projects dynamically from the JSON file.
- [ ] The "Akvo RAG System" and "AkvoFormPrint" are highlighted as featured.
- [ ] UI maintains its premium look and feel with appropriate color coding for categories.


