# shine75

A curated collection of LeetCode problems with solutions, focusing on efficiency and readability. This is a Next.js application generated with [Create Fumadocs](https://github.com/fuma-nama/fumadocs).

## Features

- **Problem Collection**: Curated LeetCode problems organized by patterns and difficulty
- **Interactive Solutions**: Step-by-step solutions with multiple programming languages
- **Favorites System**: Save your favorite problems to localStorage for quick access
- **Search**: Find problems quickly with the built-in search functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `app/layout.config.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/favorites`           | The favorites page to view saved problems.             |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Favorites System

The application includes a favorites system that allows users to:

- **Add/Remove Favorites**: Click the "Add to favorites" button on any problem page
- **View Favorites**: Navigate to `/favorites` to see all saved problems
- **Persistent Storage**: Favorites are stored in localStorage and persist across sessions
- **Quick Access**: Direct links to favorite problems from the favorites page

To use the favorites feature:
1. Navigate to any problem page (e.g., `/docs/two-pointers/two-sum`)
2. Click the "Add to favorites" button to save the problem
3. Visit `/favorites` to see all your saved problems
4. Use the navigation links to quickly access your favorites

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.vercel.app) - learn about Fumadocs
