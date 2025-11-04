# GEMINI.md

## Project Overview

This is a personal portfolio website built with [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/). It is designed to showcase my skills, projects, and blog posts.

The project uses a modern tech stack, including:

*   **Framework:** Next.js with Turbopack
*   **Language:** TypeScript
*   **UI:** React with a custom component library
*   **Styling:** Tailwind CSS
*   **Linting & Formatting:** Biome
*   **Package Manager:** pnpm

The application is structured with a clear separation of concerns, with components, services, and data fetching logic organized into distinct directories.

## Building and Running

To get the project up and running, you will need to have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    This will start the development server at `http://localhost:3000`.

3.  **Build for production:**
    ```bash
    pnpm build
    ```
    This will create an optimized production build in the `.next` directory.

4.  **Start the production server:**
    ```bash
    pnpm start
    ```
    This will start the production server.

5.  **Run the linter:**
    ```bash
    pnpm check
    ```
    This will run Biome to check for any linting or formatting issues.

## Development Conventions

*   **Component-Based Architecture:** The UI is built using a component-based architecture, with components located in the `src/components` directory.
*   **Styling:** The project uses [Tailwind CSS](https://tailwindcss.com/) for styling.
*   **Linting & Formatting:** The project uses [Biome](https://biomejs.dev/) for linting and formatting. A pre-commit hook is set up with [Husky](https://typicode.github.io/husky/) to automatically run `biome check` before each commit.
*   **Path Aliases:** The project uses path aliases to simplify imports. The `@/` alias is configured to point to the `src` directory.
*   **Data Fetching:** Data is fetched from external services using the `getBlogPosts` and `getPinnedRepos` functions in the `src/services` directory.
