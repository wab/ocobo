#!/usr/bin/env node

/**
 * Update dynamic asset references in the main website to use Vercel Blob URLs
 * Handles template patterns like ${slug}-avatar.png
 * Run: node scripts/update-dynamic-asset-refs.js
 */

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Vercel Blob base URL
const BLOB_BASE_URL =
  'https://jr0deqtyc8c5pvr8.public.blob.vercel-storage.com/content';

function updateDynamicReferences(content) {
  let updatedContent = content;
  let replacements = 0;

  // Pattern 1: /clients/${slug}-avatar.png -> blob URL
  const avatarPattern = /\/clients\/\$\{([^}]+)\}-avatar\.png/g;
  const avatarMatches = updatedContent.match(avatarPattern);
  if (avatarMatches) {
    updatedContent = updatedContent.replace(
      avatarPattern,
      `${BLOB_BASE_URL}/clients/\${$1}-avatar.png`,
    );
    replacements += avatarMatches.length;
  }

  // Pattern 2: /clients/${slug}-white.png -> blob URL
  const whiteLogoPattern = /\/clients\/\$\{([^}]+)\}-white\.png/g;
  const whiteMatches = updatedContent.match(whiteLogoPattern);
  if (whiteMatches) {
    updatedContent = updatedContent.replace(
      whiteLogoPattern,
      `${BLOB_BASE_URL}/clients/\${$1}-white.png`,
    );
    replacements += whiteMatches.length;
  }

  // Pattern 3: /clients/${slug}-color.png -> blob URL
  const colorLogoPattern = /\/clients\/\$\{([^}]+)\}-color\.png/g;
  const colorMatches = updatedContent.match(colorLogoPattern);
  if (colorMatches) {
    updatedContent = updatedContent.replace(
      colorLogoPattern,
      `${BLOB_BASE_URL}/clients/\${$1}-color.png`,
    );
    replacements += colorMatches.length;
  }

  // Pattern 4: /clients/${slug}-dark.png -> blob URL
  const darkLogoPattern = /\/clients\/\$\{([^}]+)\}-dark\.png/g;
  const darkMatches = updatedContent.match(darkLogoPattern);
  if (darkMatches) {
    updatedContent = updatedContent.replace(
      darkLogoPattern,
      `${BLOB_BASE_URL}/clients/\${$1}-dark.png`,
    );
    replacements += darkMatches.length;
  }

  // Pattern 5: /team/${author}.jpeg -> blob URL
  const teamPattern = /\/team\/\$\{([^}]+)\.?([^}]*)\}\.jpeg/g;
  const teamMatches = updatedContent.match(teamPattern);
  if (teamMatches) {
    updatedContent = updatedContent.replace(
      teamPattern,
      `${BLOB_BASE_URL}/team/\${$1$2}.jpeg`,
    );
    replacements += teamMatches.length;
  }

  // Pattern 6: More flexible team pattern
  const teamPattern2 = /\/team\/\$\{([^}]+)\}\.jpeg/g;
  const teamMatches2 = updatedContent.match(teamPattern2);
  if (teamMatches2) {
    updatedContent = updatedContent.replace(
      teamPattern2,
      `${BLOB_BASE_URL}/team/\${$1}.jpeg`,
    );
    replacements += teamMatches2.length;
  }

  return { content: updatedContent, replacements };
}

async function updateFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const { content: updatedContent, replacements } =
      updateDynamicReferences(content);

    if (replacements === 0) {
      return { updated: false, replacements: 0 };
    }

    console.log(
      `📝 ${filePath.split('/').pop()}: ${replacements} dynamic reference(s) updated`,
    );

    await writeFile(filePath, updatedContent, 'utf-8');

    return { updated: true, replacements };
  } catch (error) {
    console.error(`❌ Failed to update ${filePath}:`, error.message);
    return { updated: false, replacements: 0, error: error.message };
  }
}

async function main() {
  console.log(
    '🔄 Updating dynamic asset references to use Vercel Blob URLs...\n',
  );

  // Files that contain dynamic references
  const filesToUpdate = [
    '/Users/jeromeboileux/projects/ocobo/app/components/stories/StoryItem.tsx',
    '/Users/jeromeboileux/projects/ocobo/app/components/stories/StorySpeaker.tsx',
    '/Users/jeromeboileux/projects/ocobo/app/components/stories/StoryMetas.tsx',
    '/Users/jeromeboileux/projects/ocobo/app/components/homepage/Stories.tsx',
    '/Users/jeromeboileux/projects/ocobo/app/components/blog/PostMetas.tsx',
  ];

  let totalUpdated = 0;
  let totalReplacements = 0;
  const errors = [];

  console.log('🔍 Updating dynamic asset references...\n');

  for (const filePath of filesToUpdate) {
    const result = await updateFile(filePath);

    if (result.updated) {
      totalUpdated++;
    }

    totalReplacements += result.replacements;

    if (result.error) {
      errors.push({ file: filePath, error: result.error });
    }
  }

  // Summary
  console.log('\n✅ Dynamic asset reference update completed!');
  console.log(`\n📊 Summary:`);
  console.log(`- Files processed: ${filesToUpdate.length}`);
  console.log(`- Files updated: ${totalUpdated}`);
  console.log(`- Total dynamic replacements: ${totalReplacements}`);
  console.log(`- Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }

  if (totalUpdated > 0) {
    console.log(
      '\n🎉 All dynamic asset references have been updated to use Vercel Blob!',
    );
  } else {
    console.log('\n💡 No dynamic references found or already updated');
  }
}

main().catch((error) => {
  console.error('❌ Update failed:', error);
  process.exit(1);
});
