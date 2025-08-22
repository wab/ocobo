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

Add to `.env.local`:
```env
BLOB_READ_WRITE_TOKEN="your_token_here"
GITHUB_ACCESS_TOKEN="your_github_token"
GITHUB_ACCOUNT="your-username"
GITHUB_REPO="ocobo-posts"
```

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