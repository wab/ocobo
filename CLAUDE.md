# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` or `npm run dev`
- **Build for production**: `pnpm build` or `npm run build`
- **Start production server**: `pnpm start` or `npm start`
- **Code quality checks**: `pnpm check` or `npm run check`
- **Fix formatting/linting**: `pnpm check:fix` or `npm run check:fix`
- **Type checking**: `pnpm typecheck` or `npm run typecheck` (includes type generation)
- **Generate styled system**: `pnpm prepare` or `npm run prepare`

### Content Source Testing

- **Local filesystem** (default): `pnpm dev:local` - Uses content from `~/projects/ocobo-posts/`
- **GitHub API**: `pnpm dev:github` - Fetches content from GitHub repository
- **Custom source**: Set `CONTENT_SOURCE=github` or `CONTENT_SOURCE=locale` in `.env.local`

### Third-Party Integrations

- **AGO Chatbot**: Set `AGO_API_KEY` and `AGO_BASEPATH` in `.env` to enable the chat widget
- **Analytics**: Google Analytics, Clearbit, and HubSpot tracking (production only)
- **Vercel**: Analytics and Speed Insights integration

## Architecture Overview

This is a **React Router v7** application (formerly Remix) with **internationalization** (i18n) support, using **Panda CSS** for styling and **Vercel** for deployment.

### Key Technologies
- **React Router v7**: Full-stack React framework with file-based routing (evolved from Remix)
- **Panda CSS**: CSS-in-JS solution with atomic CSS generation
- **React i18next**: Internationalization with French/English support
- **TypeScript**: Primary language with automatic type generation
- **Biome**: Code formatting and linting
- **Vercel**: Deployment platform

### Project Structure

```
app/
├── routes/          # Remix file-based routing
├── components/      # Reusable React components
│   ├── ui/         # Base UI components
│   ├── homepage/   # Page-specific components
│   └── stories/    # Blog/content components
├── modules/         # Business logic and utilities
│   ├── github/     # GitHub API integration for content
│   └── fs/         # File system operations
├── localization/    # i18n configuration
└── utils/           # Shared utilities

preset/              # Custom Panda CSS preset
├── recipes/         # Component variants
├── patterns/        # Layout patterns  
├── tokens/          # Design tokens
└── slot-recipes/    # Multi-part component recipes

@ocobo/styled-system/ # Generated Panda CSS output
```

### Routing Convention
- Routes support optional language parameter: `($lang)`
- Main routes are nested under `_main.tsx` layout
- Content is fetched from GitHub repository for blog posts and client stories

### Internationalization
- Supports French (default) and English
- Route structure: `/` (French) and `/en/` (English)
- Translation files in `locales/fr/` and `locales/en/`

### Content Management
- Blog posts and client stories are stored as Markdown files in GitHub
- Content is fetched server-side using GitHub API
- Markdoc is used for parsing and rendering Markdown content

### Styling Architecture
- Uses Panda CSS for type-safe CSS-in-JS
- Custom design system defined in `preset/` directory
- Component variants defined as "recipes"
- Layout patterns for common UI structures
- Responsive design with mobile-first approach

### Data Fetching
- Server-side data fetching in Remix loaders
- GitHub integration for content management
- HubSpot integration for contact forms
- Environment variables for external service configuration