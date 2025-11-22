# 🚀 My Developer Portfolio

This is the source code for my personal developer portfolio, built with a modern, fast, and static-first web stack. The project is designed for a consistent development experience using Docker Compose and is hosted statically on GitHub Pages.

---

## 💻 Tech Stack

* **Framework:** [Astro](https://astro.build/) - Used for its static-first architecture, excellent performance, and easy deployment to GitHub Pages.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid and highly customizable responsive design.
* **Components:** [React](https://react.dev/) - Utilized for building complex, interactive UI components where JavaScript interactivity is necessary (e.g., filterable galleries, custom animations).
* **Environment:** [Docker Compose](https://docs.docker.com/compose/) - Ensures a consistent and isolated local development environment for all developers.
* **Deployment:** [GitHub Pages](https://pages.github.com/) - Used for free, reliable, and automatic static hosting via GitHub Actions.

---

## 🐳 Local Development Setup (Recommended)

To run this project locally, you must have **Docker** and **Docker Compose** installed.

### 1. Build and Run the Development Environment

Use the following command to build the Docker image and start the development server. This process handles installing all `pnpm` dependencies inside the container.

```bash
docker compose up -d
```

### 2. Access the Site

Once the container is running, the site will be available at:

```bash
http://localhost:4321
```

### 3. Stop Development

When you are finished, stop the services:

```bash
docker compose down
```

## 📦 Deployment

This project uses GitHub Actions to automatically build and deploy the static site to GitHub Pages whenever a push is made to the `main` branch.

### Manual Build (Local Testing)

To manually generate the static production files (found in the `./dist` folder), run the build command inside the Docker environment:

```bash
# This executes the 'pnpm run build' command within a temporary container
docker compose run --rm portfolio_dev pnpm run build
```
