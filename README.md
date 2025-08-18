# Ocobo - React Router v7 Application

A modern React Router v7 application with internationalization (i18n) support, built with Panda CSS and deployed on Vercel.

📖 See the [React Router docs](https://reactrouter.com/en/main) for details on supported features.

## Tech Stack

- **React Router v7** - Full-stack React framework with file-based routing
- **Panda CSS** - CSS-in-JS solution with atomic CSS generation
- **React i18next** - Internationalization with French/English support
- **TypeScript** - Type-safe development
- **Biome** - Code formatting and linting
- **Vercel** - Deployment platform

## Development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Generate CSS styles (run after modifying design tokens):

```bash
pnpm prepare
```

## Code Quality

Check code formatting and linting:

```bash
pnpm check
```

Auto-fix formatting and linting issues:

```bash
pnpm check:fix
```

Run type checking:

```bash
pnpm typecheck
```

## Deployment

Build the application for production:

```bash
pnpm build
```

Start the production server locally:

```bash
pnpm start
```

### Vercel Deployment

This application is configured for deployment on Vercel with React Router v7 support. The build process includes:

- Client and server build generation
- Vercel-specific configuration in `vercel.json`
- Automatic deployment preparation via `vercel/prepare.js`

Deploy to Vercel:

```bash
vercel deploy
```

### Build Output

The build process generates:

- `build/client` - Static client assets
- `build/server` - Server-side bundle
- Vercel configuration for serverless deployment

## Project Structure

```
app/
├── routes/          # React Router file-based routing
├── components/      # Reusable React components
├── localization/    # i18n configuration
├── modules/         # Business logic and utilities
└── utils/           # Shared utilities

preset/              # Custom Panda CSS design system
├── recipes/         # Component variants
├── patterns/        # Layout patterns
├── tokens/          # Design tokens
└── slot-recipes/    # Multi-part component recipes
```

## Internationalization

- Supports French (default) and English
- Route structure: `/` (French) and `/en/` (English)
- Translation files in `locales/fr/` and `locales/en/`

## Content Management

- Blog posts and client stories stored as Markdown in GitHub
- Server-side content fetching using GitHub API
- Markdoc for parsing and rendering Markdown content
