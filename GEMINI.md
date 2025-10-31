# Project Overview

This is a full-stack portfolio project built with a monorepo architecture using pnpm and Turborepo.

**Frontend:**
- Next.js with Turbopack
- TypeScript
- Tailwind CSS
- Zustand for state management
- Radix UI and lucide-react for UI components

**Backend:**
- Hono (a small, fast, and web-standard API framework for the Edge)

**Tooling:**
- Biome for linting and formatting
- Husky for pre-commit hooks

# Building and Running

**Installation:**
```bash
pnpm install
```

**Development:**
To start the development server for both the web and server applications:
```bash
pnpm dev
```

**Building for Production:**
```bash
pnpm build
```

# Development Conventions

- Code is formatted and linted using Biome.
- Husky is used to run pre-commit hooks, which currently runs `biome check`.
- The project uses a monorepo structure with `apps/web` for the frontend and `apps/server` for the backend.
- The `web` application uses Next.js with Turbopack for development and builds.
