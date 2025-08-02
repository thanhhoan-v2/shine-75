export const routes = {
  home: '/',
  docs: '/docs',
  docsSlug: (slug: string) => `/docs/${slug}`,
  favorites: '/favorites',
  completed: '/completed',
  problemSets: '/problem-sets',
  docsSlugWithTopic: (slug: string, topic: string) =>
    `/docs/${slug}?topic=${topic}`,
  docsSlugWithTopicAndDifficulty: (
    slug: string,
    topic: string,
    difficulty: string
  ) => `/docs/${slug}?topic=${topic}&difficulty=${difficulty}`,
  github: {
    repo: 'https://github.com/thanhhoan-v2/shine-75',
    edit: (path: string) =>
      `https://github.com/thanhhoan-v2/shine-75/blob/main/content/docs/${path}`,
  },
};
