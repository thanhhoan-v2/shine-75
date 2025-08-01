#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Helper functions from the test
function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[&]/g, '')
    .replace(/[()]/g, '')
    .replace(/--/g, '-');
}

function getPatternSlug(patternName) {
  const patternSlugMap = {
    'Two Pointers': 'two-pointers',
    'Fast & Slow Pointers': 'fast-slow-pointers',
    'Sliding Window': 'sliding-window',
    'Tree Traversal': 'tree-traversal',
    'Graph Traversal': 'graph-traversal',
    'Merge Intervals': 'merge-intervals',
    'Cyclic Sort': 'cyclic-sort',
    'Bit Manipulation': 'bit-manipulation',
    'Hash Table': 'hash-table',
    'Heap': 'heap',
    'Linked List': 'linked-list',
    'Stack': 'stack',
    'Topological Sort': 'topological-sort',
    'Backtracking': 'backtracking',
  };
  
  return patternSlugMap[patternName] || patternName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[&]/g, '')
    .replace(/[()]/g, '')
    .replace(/--/g, '-');
}

// Load studyPlan
const studyPlanPath = path.join(process.cwd(), 'lib', 'data', 'patterns.ts');
const studyPlanContent = fs.readFileSync(studyPlanPath, 'utf-8');

// Extract studyPlan object (simplified parsing)
const studyPlanMatch = studyPlanContent.match(/export const studyPlan: Record<string, Pattern> = ({[\s\S]*});/);
if (!studyPlanMatch) {
  console.error('Could not parse studyPlan from patterns.ts');
  process.exit(1);
}

// Parse the studyPlan (this is a simplified parser)
const studyPlanText = studyPlanMatch[1];
const patterns = {};

// Extract pattern names and their problems
const patternMatches = studyPlanText.matchAll(/['"]([^'"]+)['"]:\s*{[\s\S]*?problems:\s*\[([\s\S]*?)\][\s\S]*?}/g);

for (const match of patternMatches) {
  const patternName = match[1];
  const problemsText = match[2];
  
  // Extract problem names
  const problemMatches = problemsText.matchAll(/name:\s*['"]([^'"]+)['"]/g);
  const problems = [];
  
  for (const problemMatch of problemMatches) {
    problems.push(problemMatch[1]);
  }
  
  patterns[patternName] = problems;
}

console.log('🔍 Structure Analysis Report\n');

// 1. Check for missing MDX files
console.log('📁 Missing MDX Files:');
const docsPath = path.join(process.cwd(), 'content', 'docs');
let totalMissing = 0;

for (const [patternName, problems] of Object.entries(patterns)) {
  const patternSlug = getPatternSlug(patternName);
  const patternDir = path.join(docsPath, patternSlug);
  
  if (!fs.existsSync(patternDir)) {
    console.log(`  ❌ Pattern directory missing: ${patternSlug}`);
    continue;
  }
  
  for (const problem of problems) {
    const problemSlug = titleToSlug(problem);
    const mdxPath = path.join(patternDir, `${problemSlug}.mdx`);
    
    if (!fs.existsSync(mdxPath)) {
      console.log(`  ❌ Missing: ${patternSlug}/${problemSlug}.mdx (${problem})`);
      totalMissing++;
    }
  }
}

if (totalMissing === 0) {
  console.log('  ✅ All MDX files exist');
}

// 2. Check for orphaned directories
console.log('\n📂 Orphaned Directories:');
const patternDirs = fs.readdirSync(docsPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const patternDir of patternDirs) {
  if (patternDir === '[[...slug]]') continue;
  
  const patternName = Object.keys(patterns).find(
    name => getPatternSlug(name) === patternDir
  );
  
  if (!patternName) {
    console.log(`  ❌ Orphaned: ${patternDir}/`);
  }
}

// 3. Check for duplicate problems
console.log('\n🔄 Duplicate Problems:');
const allProblems = Object.values(patterns).flat();
const problemCounts = {};

for (const problem of allProblems) {
  problemCounts[problem] = (problemCounts[problem] || 0) + 1;
}

const duplicates = Object.entries(problemCounts)
  .filter(([problem, count]) => count > 1)
  .sort((a, b) => b[1] - a[1]);

if (duplicates.length === 0) {
  console.log('  ✅ No duplicate problems found');
} else {
  for (const [problem, count] of duplicates) {
    console.log(`  ❌ "${problem}" appears ${count} times:`);
    
    // Find which patterns contain this problem
    for (const [patternName, problems] of Object.entries(patterns)) {
      if (problems.includes(problem)) {
        console.log(`    - ${patternName}`);
      }
    }
  }
}

// 4. Check problem counts
console.log('\n📊 Problem Counts:');
for (const [patternName, problems] of Object.entries(patterns)) {
  const patternSlug = getPatternSlug(patternName);
  const patternDir = path.join(docsPath, patternSlug);
  
  if (fs.existsSync(patternDir)) {
    const mdxFiles = fs.readdirSync(patternDir)
      .filter(file => file.endsWith('.mdx'))
      .length;
    
    const status = mdxFiles === problems.length ? '✅' : '❌';
    console.log(`  ${status} ${patternName}: ${problems.length} in studyPlan, ${mdxFiles} MDX files`);
  } else {
    console.log(`  ❌ ${patternName}: ${problems.length} in studyPlan, directory missing`);
  }
}

console.log('\n💡 Recommendations:');
console.log('1. Create missing MDX files for problems in studyPlan');
console.log('2. Remove duplicate problems from one pattern (keep in most appropriate)');
console.log('3. Remove orphaned directories or add them to studyPlan');
console.log('4. Update meta.json to reflect the corrected structure');
console.log('5. Run the test again to verify fixes'); 