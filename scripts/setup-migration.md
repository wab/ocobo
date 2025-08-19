# Migration Setup Guide: Moving Assets to Vercel Blob

## Prerequisites

1. **Vercel Blob Store Setup**
   ```bash
   # Install Vercel CLI if not already installed
   pnpm add -g vercel
   
   # Login to Vercel if not already done
   vercel login
   
   # Link your project (or create new one)
   vercel link
   
   # Create blob token via Vercel dashboard or API
   # Go to: https://vercel.com/dashboard/stores
   # Click "Create Database" > "Blob" > Get your token
   
   # Add the token to your environment
   vercel env add BLOB_READ_WRITE_TOKEN
   # Enter your token when prompted
   ```

2. **Environment Variables**
   ```bash
   # Add to your .env file
   export BLOB_READ_WRITE_TOKEN="vercel_blob_token_here"
   export GITHUB_ACCESS_TOKEN="github_token_here"
   export GITHUB_ACCOUNT="your-github-username"
   export GITHUB_REPO="ocobo-posts"
   ```

3. **Install Dependencies**
   ```bash
   pnpm add @vercel/blob @octokit/rest
   ```

## Migration Steps

### Step 1: Run Migration (Dry Run First)
```bash
# Test migration without uploading
node scripts/migrate-to-blob.js --dry-run

# Run actual migration
node scripts/migrate-to-blob.js
```

### Step 2: Update Frontmatter References (Local Approach)
```bash
# Clone the ocobo-posts repository locally (if not already done)
git clone https://github.com/wab/ocobo-posts.git ../ocobo-posts

# Test updates without making changes
node scripts/update-frontmatter-local.js ../ocobo-posts --dry-run

# Apply the updates locally
node scripts/update-frontmatter-local.js ../ocobo-posts

# Review changes and create PR
cd ../ocobo-posts
git diff                                           # Review changes
git checkout -b update-asset-urls-to-vercel-blob   # Create branch
git add .                                          # Stage changes
git commit -m "Update asset URLs to Vercel Blob"  # Commit
git push origin update-asset-urls-to-vercel-blob  # Push branch
# Then create PR via GitHub UI
```

### Step 3: Verify Migration
```bash
# Check that URLs are working
node scripts/verify-blob-urls.js
```

### Step 4: Clean Up Local Assets
```bash
# Remove migrated directories (after verification)
rm -rf public/posts/
rm -rf public/clients/
rm -rf public/team/
```

## GitHub Actions Setup (For Future Assets)

1. **Copy Workflow File to ocobo-posts Repository**:
   ```bash
   # Copy the workflow file from scripts/ to ocobo-posts repo
   cp scripts/github-actions-workflow.yml /path/to/ocobo-posts/.github/workflows/upload-assets.yml
   ```

2. **Add Repository Secrets** (in ocobo-posts repo settings):
   - `BLOB_READ_WRITE_TOKEN`: Your Vercel blob token
   - `VERCEL_WEBHOOK_URL`: Webhook for revalidation (optional)

3. **Create Assets Directory Structure** (in ocobo-posts repo):
   ```
   assets/
   ├── posts/
   │   └── new-post-name/
   │       └── image.png
   ├── clients/
   │   └── new-client-logo.png
   └── team/
       └── new-member.jpg
   
   # OR embed assets within content folders:
   blog/fr/
   ├── post-slug/
   │   ├── index.md
   │   └── assets/
   │       └── image.png
   ```

4. **Workflow Triggers**:
   - Automatic: Push image files to `assets/` or `*/assets/` directories
   - Manual: Use workflow dispatch in GitHub Actions tab

## Monitoring & Maintenance

### Check Blob Storage Usage
```bash
# List all blobs in your store
vercel blob list

# Check specific blob details
vercel blob list --prefix content/

# Monitor via Vercel dashboard
vercel dashboard
# Go to Storage > Blob to see usage stats
```

### Monitor Upload Costs
- Vercel Blob pricing: $0.15/GB stored + $0.30/GB bandwidth
- Monitor usage in Vercel dashboard

### URL Format After Migration
- Old: `/posts/1/image.png`
- New: `https://[blob-id].vercel.app/content/posts/1/image.png`

## Rollback Plan (If Needed)

1. **Revert Frontmatter Changes**:
   ```bash
   # GitHub repository has version history
   git revert [commit-hash-of-frontmatter-updates]
   ```

2. **Keep Blob Storage**: Assets remain in blob, just update references back

3. **Emergency Restoration**: Copy assets back to `/public/` from local backup

## Performance Benefits

✅ **Before Migration**:
- Every asset change = full website rebuild
- Large `/public/` directory increases build time
- Assets served from same domain as website

✅ **After Migration**:
- Content updates don't trigger rebuilds
- Faster builds (smaller `/public/` directory)
- Assets served from CDN with optimal caching
- Better separation of concerns

## Cost Estimation

**Current Approach**: Every content update triggers Vercel build
- ~5-10 builds/month for content = $X

**New Approach**: Only code changes trigger builds  
- ~2-3 builds/month for code = $Y
- Blob storage: ~100MB = $0.015/month
- Blob bandwidth: ~1GB/month = $0.30/month

**Net Savings**: $X - $Y - $0.315/month