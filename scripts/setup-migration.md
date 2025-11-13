# Asset Migration to Vercel Blob

Quick guide for migrating static assets from `/public/` to Vercel Blob storage.

## Prerequisites

```bash
# Install dependencies
pnpm add @vercel/blob @octokit/rest

# Setup environment
vercel login
vercel link
vercel env add BLOB_READ_WRITE_TOKEN
```

Copy `.env.sample` to `.env.local` and configure:
```bash
cp .env.sample .env.local
```

Then add your actual values to `.env.local`:
- `BLOB_READ_WRITE_TOKEN` - Your Vercel Blob token
- `GITHUB_ACCESS_TOKEN` - Your GitHub personal access token  
- `GITHUB_ACCOUNT` - Your GitHub username (e.g., "wab")
- `GITHUB_REPO` - Content repository name (e.g., "ocobo-posts")
- `GITHUB_BRANCH` - Content branch (default: "main", testing: "offers")

## Migration Steps

### 1. Run Migration
```bash
# Test first (dry run)
node scripts/migrate-to-blob.js --dry-run

# Execute migration  
node scripts/migrate-to-blob.js
```

### 2. Update Content References
```bash
# Clone content repo locally
git clone https://github.com/wab/ocobo-posts.git ../ocobo-posts

# Update frontmatter URLs
node scripts/update-frontmatter-local.js ../ocobo-posts --dry-run
node scripts/update-frontmatter-local.js ../ocobo-posts

# Create PR
cd ../ocobo-posts
git checkout -b update-asset-urls-to-vercel-blob
git add . && git commit -m "Update asset URLs to Vercel Blob"
git push origin update-asset-urls-to-vercel-blob
```

### 3. Verify & Clean Up
```bash
# Test new URLs
node scripts/verify-blob-urls.js

# Remove migrated assets (after verification)
rm -rf public/posts/ public/clients/ public/team/
```

## URL Changes

**Before:** `/posts/1/image.png`  
**After:** `https://[blob-id].vercel.app/content/posts/1/image.png`

## Benefits

- ✅ Smaller builds (no assets in `/public/`)
- ✅ Content updates don't trigger rebuilds
- ✅ CDN-optimized asset delivery
- ✅ Better separation of concerns

## Cost

- Blob storage: ~$0.15/GB stored
- Bandwidth: ~$0.30/GB transferred
- Monitor usage in Vercel Dashboard → Storage → Blob