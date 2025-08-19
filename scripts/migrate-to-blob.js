#!/usr/bin/env node

/**
 * Migration script to upload blog/story assets to Vercel Blob
 * Prerequisites: pnpm add @vercel/blob
 * Run: node scripts/migrate-to-blob.js
 */

import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { put } from '@vercel/blob';
import { readFile, readdir, stat } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '../public');

// Directories to migrate to Vercel Blob
const MIGRATE_DIRS = ['posts', 'clients', 'team'];

// Keep track of uploaded files and their URLs
const uploadedAssets = new Map();

async function getFilesToMigrate() {
  const files = [];

  for (const dir of MIGRATE_DIRS) {
    const dirPath = join(publicDir, dir);
    try {
      await walkDirectory(dirPath, dir, files);
    } catch (_error) {
      console.warn(`Directory ${dir} not found, skipping...`);
    }
  }

  return files;
}

async function walkDirectory(dirPath, relativePath, files) {
  const entries = await readdir(dirPath);

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const relativeFilePath = join(relativePath, entry);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      await walkDirectory(fullPath, relativeFilePath, files);
    } else if (stats.isFile() && isImageFile(entry)) {
      files.push({
        localPath: fullPath,
        blobPath: relativeFilePath.replace(/\\/g, '/'), // Normalize path separators
        size: stats.size,
      });
    }
  }
}

function isImageFile(filename) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];
  return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
}

async function uploadToBlob(file) {
  try {
    const fileBuffer = await readFile(file.localPath);
    const contentType = getContentType(file.blobPath);

    console.log(`Uploading: ${file.blobPath} (${formatBytes(file.size)})`);

    const blob = await put(`content/${file.blobPath}`, fileBuffer, {
      access: 'public',
      contentType,
      addRandomSuffix: false, // Keep original filenames
    });

    uploadedAssets.set(file.blobPath, blob.url);
    console.log(`✅ Uploaded: ${blob.url}`);

    return blob;
  } catch (error) {
    console.error(`❌ Failed to upload ${file.blobPath}:`, error.message);
    throw error;
  }
}

function getContentType(filename) {
  const ext = filename.toLowerCase().split('.').pop();
  const contentTypes = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    gif: 'image/gif',
  };
  return contentTypes[ext] || 'application/octet-stream';
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function generateUrlMapping() {
  const mapping = {};

  for (const [blobPath, url] of uploadedAssets) {
    // Generate old URL format for replacement
    const oldUrl = `/${blobPath}`;
    mapping[oldUrl] = url;
  }

  // Write mapping to file for frontmatter updates
  const mappingPath = join(__dirname, 'asset-url-mapping.json');
  await import('fs/promises').then((fs) =>
    fs.writeFile(mappingPath, JSON.stringify(mapping, null, 2)),
  );

  console.log(`\n📝 URL mapping saved to: ${mappingPath}`);
  return mapping;
}

async function main() {
  console.log('🚀 Starting migration to Vercel Blob...\n');

  // Check for required environment variable
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is required');
    console.log('Set it with: export BLOB_READ_WRITE_TOKEN="your_token_here"');
    process.exit(1);
  }

  try {
    const files = await getFilesToMigrate();
    console.log(`Found ${files.length} files to migrate\n`);

    if (files.length === 0) {
      console.log('No files to migrate. Exiting...');
      return;
    }

    // Calculate total size
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    console.log(`Total size: ${formatBytes(totalSize)}\n`);

    // Upload files in batches to avoid overwhelming the API
    const batchSize = 5;
    const batches = [];
    for (let i = 0; i < files.length; i += batchSize) {
      batches.push(files.slice(i, i + batchSize));
    }

    let uploadedCount = 0;
    for (const [index, batch] of batches.entries()) {
      console.log(`\n📦 Processing batch ${index + 1}/${batches.length}`);

      const promises = batch.map((file) => uploadToBlob(file));
      await Promise.all(promises);

      uploadedCount += batch.length;
      console.log(`Progress: ${uploadedCount}/${files.length} files uploaded`);

      // Small delay between batches
      if (index < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Generate URL mapping for frontmatter updates
    const mapping = await generateUrlMapping();

    console.log('\n✅ Migration completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`- Files uploaded: ${uploadedCount}`);
    console.log(`- Total size: ${formatBytes(totalSize)}`);
    console.log(`- URL mappings: ${Object.keys(mapping).length}`);

    console.log('\n🔄 Next steps:');
    console.log('1. Run: node scripts/update-frontmatter.js');
    console.log('2. Test the website locally');
    console.log('3. Remove migrated directories from /public/');
    console.log('4. Deploy to production');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main();
