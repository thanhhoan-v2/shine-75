import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { studyPlan } from '../lib/data/patterns';

// Helper function to convert title to slug
function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[&]/g, '')
    .replace(/[()]/g, '')
    .replace(/--/g, '-');
}

// Helper function to get pattern slug from pattern name
function getPatternSlug(patternName: string): string {
  const patternSlugMap: Record<string, string> = {
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

describe('Structure Consistency Tests', () => {
  // Test 1: Check if all patterns in studyPlan exist in meta.json
  it('should have all studyPlan patterns in meta.json', () => {
    const metaJsonPath = path.join(process.cwd(), 'content', 'docs', 'meta.json');
    const metaJson = JSON.parse(fs.readFileSync(metaJsonPath, 'utf-8'));
    
    const studyPlanPatterns = Object.keys(studyPlan);
    const metaJsonPatterns = metaJson.sections
      .filter((section: any) => section.title !== 'Getting Started')
      .map((section: any) => section.title);
    
    // Check if all studyPlan patterns are in meta.json
    for (const pattern of studyPlanPatterns) {
      expect(metaJsonPatterns).toContain(pattern);
    }
    
    // Check if all meta.json patterns are in studyPlan
    for (const pattern of metaJsonPatterns) {
      expect(studyPlanPatterns).toContain(pattern);
    }
  });

  // Test 2: Check if all problems in studyPlan have corresponding MDX files
  it('should have MDX files for all problems in studyPlan', () => {
    const docsPath = path.join(process.cwd(), 'content', 'docs');
    
    for (const [patternName, pattern] of Object.entries(studyPlan)) {
      const patternSlug = getPatternSlug(patternName);
      const patternDir = path.join(docsPath, patternSlug);
      
      // Check if pattern directory exists
      expect(fs.existsSync(patternDir), 
        `Pattern directory should exist: ${patternSlug}`).toBe(true);
      
      for (const problem of pattern.problems) {
        const problemSlug = titleToSlug(problem.name);
        const mdxPath = path.join(patternDir, `${problemSlug}.mdx`);
        
        expect(fs.existsSync(mdxPath), 
          `MDX file should exist for problem: ${patternSlug}/${problemSlug}.mdx`).toBe(true);
      }
    }
  });

  // Test 3: Check if all MDX files have corresponding entries in studyPlan
  it('should have studyPlan entries for all MDX files', () => {
    const docsPath = path.join(process.cwd(), 'content', 'docs');
    
    // Get all pattern directories
    const patternDirs = fs.readdirSync(docsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const patternDir of patternDirs) {
      if (patternDir === '[[...slug]]') continue; // Skip dynamic route directory
      
      const patternPath = path.join(docsPath, patternDir);
      const mdxFiles = fs.readdirSync(patternPath)
        .filter(file => file.endsWith('.mdx'))
        .map(file => file.replace('.mdx', ''));
      
      // Find the pattern name from the slug
      const patternName = Object.keys(studyPlan).find(
        name => getPatternSlug(name) === patternDir
      );
      
      expect(patternName, 
        `Pattern should exist in studyPlan for directory: ${patternDir}`).toBeDefined();
      
      if (patternName) {
        const pattern = studyPlan[patternName];
        
        for (const mdxFile of mdxFiles) {
          const problemName = mdxFile
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          const problemExists = pattern.problems.some(
            problem => titleToSlug(problem.name) === mdxFile
          );
          
          expect(problemExists, 
            `Problem should exist in studyPlan: ${patternDir}/${mdxFile}.mdx`).toBe(true);
        }
      }
    }
  });

  // Test 4: Check if meta.json items match the actual file structure
  it('should have meta.json items matching actual file structure', () => {
    const metaJsonPath = path.join(process.cwd(), 'content', 'docs', 'meta.json');
    const metaJson = JSON.parse(fs.readFileSync(metaJsonPath, 'utf-8'));
    const docsPath = path.join(process.cwd(), 'content', 'docs');
    
    for (const section of metaJson.sections) {
      if (section.title === 'Getting Started') continue;
      
      const patternSlug = getPatternSlug(section.title);
      const patternDir = path.join(docsPath, patternSlug);
      
      // Check if pattern directory exists
      expect(fs.existsSync(patternDir), 
        `Pattern directory should exist for section: ${section.title}`).toBe(true);
      
      for (const item of section.items) {
        const href = item.href;
        const expectedPath = href.replace('/docs/', '');
        const mdxPath = path.join(docsPath, `${expectedPath}.mdx`);
        
        expect(fs.existsSync(mdxPath), 
          `MDX file should exist for meta.json item: ${href}`).toBe(true);
      }
    }
  });

  // Test 5: Check if problem generator can access all problems
  it('should have all problems accessible in problem generator', () => {
    const allProblems = Object.entries(studyPlan).flatMap(([patternName, pattern]) =>
      pattern.problems.map(problem => ({
        patternName,
        patternSlug: getPatternSlug(patternName),
        problemName: problem.name,
        problemSlug: titleToSlug(problem.name),
        difficulty: problem.difficulty,
        category: problem.category
      }))
    );
    
    // Check if all problems have valid slugs
    for (const problem of allProblems) {
      expect(problem.problemSlug).toBeDefined();
      expect(problem.problemSlug.length).toBeGreaterThan(0);
      expect(problem.patternSlug).toBeDefined();
      expect(problem.patternSlug.length).toBeGreaterThan(0);
    }
    
    // Check if all problems have valid difficulties
    const validDifficulties = ['Easy', 'Medium', 'Hard'];
    for (const problem of allProblems) {
      expect(validDifficulties).toContain(problem.difficulty);
    }
  });

  // Test 6: Check for duplicate problem names across patterns
  it('should not have duplicate problem names across patterns', () => {
    const allProblemNames = Object.values(studyPlan).flatMap(pattern =>
      pattern.problems.map(problem => problem.name)
    );
    
    const uniqueProblemNames = new Set(allProblemNames);
    expect(allProblemNames.length).toBe(uniqueProblemNames.size);
  });

  // Test 7: Check if all MDX files have valid frontmatter
  it('should have valid frontmatter in all MDX files', () => {
    const docsPath = path.join(process.cwd(), 'content', 'docs');
    
    for (const [patternName, pattern] of Object.entries(studyPlan)) {
      const patternSlug = getPatternSlug(patternName);
      const patternDir = path.join(docsPath, patternSlug);
      
      if (!fs.existsSync(patternDir)) continue;
      
      for (const problem of pattern.problems) {
        const problemSlug = titleToSlug(problem.name);
        const mdxPath = path.join(patternDir, `${problemSlug}.mdx`);
        
        if (!fs.existsSync(mdxPath)) continue;
        
        const mdxContent = fs.readFileSync(mdxPath, 'utf-8');
        
        // Check if file has frontmatter
        expect(mdxContent).toMatch(/^---\s*\n/);
        expect(mdxContent).toMatch(/\n---\s*\n/);
        
        // Extract frontmatter
        const frontmatterMatch = mdxContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
        expect(frontmatterMatch).toBeDefined();
        
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          
          // Check for required fields
          expect(frontmatter).toMatch(/title:/);
          expect(frontmatter).toMatch(/description:/);
          expect(frontmatter).toMatch(/difficulty:/);
          expect(frontmatter).toMatch(/timeLimit:/);
          expect(frontmatter).toMatch(/week:/);
          expect(frontmatter).toMatch(/tags:/);
          
          // Check if title matches problem name
          const titleMatch = frontmatter.match(/title:\s*(.+)/);
          if (titleMatch) {
            const title = titleMatch[1].trim();
            expect(title).toBe(problem.name);
          }
          
          // Check if difficulty matches
          const difficultyMatch = frontmatter.match(/difficulty:\s*(.+)/);
          if (difficultyMatch) {
            const difficulty = difficultyMatch[1].trim();
            expect(difficulty).toBe(problem.difficulty);
          }
        }
      }
    }
  });

  // Test 8: Check if all patterns have consistent problem counts
  it('should have consistent problem counts across all sources', () => {
    const metaJsonPath = path.join(process.cwd(), 'content', 'docs', 'meta.json');
    const metaJson = JSON.parse(fs.readFileSync(metaJsonPath, 'utf-8'));
    
    for (const [patternName, pattern] of Object.entries(studyPlan)) {
      const patternSlug = getPatternSlug(patternName);
      const docsPath = path.join(process.cwd(), 'content', 'docs');
      const patternDir = path.join(docsPath, patternSlug);
      
      if (fs.existsSync(patternDir)) {
        const mdxFiles = fs.readdirSync(patternDir)
          .filter(file => file.endsWith('.mdx'))
          .length;
        
        const metaJsonSection = metaJson.sections.find(
          (section: any) => section.title === patternName
        );
        
        if (metaJsonSection) {
          const metaJsonCount = metaJsonSection.items.length;
          
          expect(mdxFiles).toBe(pattern.problems.length);
          expect(metaJsonCount).toBe(pattern.problems.length);
        }
      }
    }
  });
}); 