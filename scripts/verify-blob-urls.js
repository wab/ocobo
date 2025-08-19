#!/usr/bin/env node

/**
 * Verifies that all uploaded blob URLs are accessible
 * Run: node scripts/verify-blob-urls.js
 */

import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadUrlMapping() {
  const mappingPath = join(__dirname, 'asset-url-mapping.json');
  try {
    const mappingData = await readFile(mappingPath, 'utf-8');
    return JSON.parse(mappingData);
  } catch (error) {
    console.error('❌ Failed to load URL mapping file:', error.message);
    process.exit(1);
  }
}

async function checkUrl(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return {
      url,
      status: response.status,
      ok: response.ok,
      size: response.headers.get('content-length'),
      type: response.headers.get('content-type'),
    };
  } catch (error) {
    clearTimeout(timeoutId);
    return {
      url,
      status: null,
      ok: false,
      error: error.message,
    };
  }
}

async function main() {
  console.log('🔍 Verifying Vercel Blob URLs...\n');

  const urlMapping = await loadUrlMapping();
  const urls = Object.values(urlMapping);

  if (urls.length === 0) {
    console.log('No URLs to verify.');
    return;
  }

  console.log(`Checking ${urls.length} URLs...\n`);

  const batchSize = 10;
  const results = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(
      `Checking batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(urls.length / batchSize)}`,
    );

    const batchPromises = batch.map((url) => checkUrl(url));
    const batchResults = await Promise.all(batchPromises);

    results.push(...batchResults);

    // Show progress
    batchResults.forEach((result) => {
      const status = result.ok ? '✅' : '❌';
      const size = result.size ? `(${formatBytes(result.size)})` : '';
      console.log(
        `  ${status} ${result.status || 'ERROR'} ${result.url.split('/').pop()} ${size}`,
      );
    });

    // Small delay between batches
    if (i + batchSize < urls.length) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  // Summary
  const successful = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;
  const totalSize = results
    .filter((r) => r.size)
    .reduce((sum, r) => sum + parseInt(r.size || 0), 0);

  console.log('\n📊 Verification Summary:');
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📦 Total size: ${formatBytes(totalSize)}`);

  if (failed > 0) {
    console.log('\n❌ Failed URLs:');
    results
      .filter((r) => !r.ok)
      .forEach((r) => {
        console.log(`  - ${r.url}`);
        console.log(`    Error: ${r.error || `HTTP ${r.status}`}`);
      });
  }

  if (successful === results.length) {
    console.log('\n🎉 All URLs are accessible!');
  } else {
    console.log(`\n⚠️  ${failed} URLs failed verification`);
    process.exit(1);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

main();
