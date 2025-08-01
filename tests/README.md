# Structure Consistency Tests

This directory contains tests that verify the consistency between different parts of the algorithm patterns documentation system.

## Test Overview

The `structure-consistency.test.ts` file contains comprehensive tests that check:

1. **Pattern Consistency**: Ensures all patterns in `studyPlan` exist in `meta.json` and vice versa
2. **File Structure**: Verifies that all problems in `studyPlan` have corresponding MDX files in the docs directory
3. **Content Validation**: Checks that all MDX files have corresponding entries in `studyPlan`
4. **Navigation Consistency**: Ensures `meta.json` items match the actual file structure
5. **Problem Generator Access**: Validates that all problems are accessible in the problem generator
6. **Duplicate Prevention**: Checks for duplicate problem names across patterns
7. **Frontmatter Validation**: Verifies that all MDX files have valid frontmatter with required fields
8. **Count Consistency**: Ensures problem counts are consistent across all sources

## Running the Tests

```bash
# Run all tests
npm test

# Run only structure consistency tests
npm run test:structure

# Run tests in watch mode
npm test -- --watch
```

## Test Details

### Test 1: Pattern Consistency
- Checks if all patterns in `lib/data/patterns.ts` exist in `content/docs/meta.json`
- Ensures no orphaned patterns in either source

### Test 2: File Structure Validation
- Verifies that every problem in `studyPlan` has a corresponding MDX file
- Checks that pattern directories exist for all patterns

### Test 3: Content Validation
- Ensures all MDX files in the docs directory have corresponding entries in `studyPlan`
- Prevents orphaned MDX files

### Test 4: Navigation Consistency
- Validates that all items in `meta.json` point to existing MDX files
- Ensures the navigation structure matches the file system

### Test 5: Problem Generator Access
- Checks that all problems can be accessed by the problem generator component
- Validates slug generation and difficulty levels

### Test 6: Duplicate Prevention
- Ensures no duplicate problem names exist across different patterns
- Maintains data integrity

### Test 7: Frontmatter Validation
- Verifies that all MDX files have proper frontmatter
- Checks required fields: title, description, difficulty, timeLimit, week, tags
- Ensures frontmatter matches the problem data in `studyPlan`

### Test 8: Count Consistency
- Validates that problem counts are consistent across:
  - `studyPlan` patterns
  - Actual MDX files in directories
  - `meta.json` sections

## Helper Functions

The test file includes helper functions:

- `titleToSlug()`: Converts problem titles to URL-friendly slugs
- `getPatternSlug()`: Maps pattern names to their directory slugs

## Expected Behavior

When all tests pass, it means:
- ✅ All patterns are consistently defined across all sources
- ✅ All problems have corresponding MDX files
- ✅ All MDX files have valid frontmatter
- ✅ Navigation structure matches file structure
- ✅ Problem generator can access all problems
- ✅ No duplicate problems exist
- ✅ All counts are consistent

## Troubleshooting

If tests fail, check:
1. Missing MDX files for problems in `studyPlan`
2. Orphaned MDX files not in `studyPlan`
3. Inconsistent pattern names between sources
4. Invalid frontmatter in MDX files
5. Mismatched problem counts
6. Duplicate problem names

## Adding New Problems

When adding new problems:
1. Add the problem to `lib/data/patterns.ts`
2. Create the corresponding MDX file in the appropriate directory
3. Add the problem to `content/docs/meta.json`
4. Run the tests to ensure consistency 