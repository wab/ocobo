# Ocobo - React Router v7 Application

A modern React Router v7 application with internationalization support, built with Panda CSS and deployed on Vercel.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Generate CSS styles (after design token changes)
pnpm prepare
```

## Tech Stack

- **React Router v7** - Full-stack React framework
- **Panda CSS** - Type-safe CSS-in-JS with atomic CSS
- **React i18next** - French/English internationalization
- **TypeScript** - Type-safe development
- **Biome** - Code formatting and linting
- **Vercel** - Edge deployment with caching

## Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm check        # Check code quality
pnpm check:fix    # Auto-fix formatting/linting
pnpm typecheck    # Type checking
pnpm prepare      # Generate CSS styles
```

## Project Structure

```
app/
├── routes/          # File-based routing
├── components/      # React components
├── modules/         # Business logic
│   ├── content/     # Content fetching
│   └── cache.ts     # Simple cache strategy
└── localization/    # i18n configuration

preset/              # Panda CSS design system
├── recipes/         # Component variants
├── tokens/          # Design tokens
└── patterns/        # Layout patterns
```

## Features

### Internationalization
- French (default): `/`
- English: `/en/`
- Translation files in `locales/`

### Content Management
- Markdown content fetched from GitHub API
- Local filesystem for development
- Markdoc parsing and rendering

### Caching Strategy
- Local development: No caching
- Production: Vercel Edge Cache
- Testing: `?refresh=1` parameter

See [CACHE_STRATEGY.md](./CACHE_STRATEGY.md) for details.

## Deployment

The application is configured for Vercel deployment with:
- Automatic builds on push
- Edge caching for GitHub content
- Serverless function optimization

```bash
vercel deploy
```

## Development Tips

### Content Sources
```bash
# Use local files (development)
CONTENT_SOURCE=locale pnpm dev

# Use GitHub API (production-like)
CONTENT_SOURCE=github pnpm dev
```

### Testing Cache
```bash
# Bypass cache during testing
http://localhost:3000/blog?refresh=1
```