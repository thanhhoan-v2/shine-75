import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from '@/components/layouts/page';
import AddToFavoriteBtn from '@/components/mdx/add-to-favorite-btn';
import CompletedBtn from '@/components/mdx/completed-btn';
import { Badge } from '@/components/ui/badge';
import { getDifficultyFromPathname } from '@/lib/db';
import { source } from '@/lib/source';
import { getCategoryFromPath, shouldShowFavoriteButton } from '@/lib/utils';
import { getMDXComponents } from '@/mdx-components';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { BrainIcon } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const difficulty = getDifficultyFromPathname(page.data.title);

  const MDXContent = page.data.body;

  // let time = await getGithubLastEdit({
  //   owner: 'thanhhoan-v2',
  //   repo: 'shine-75',
  //   path: `content/docs/${page.path}`,
  // });

  // if (!time) time = new Date();

  return (
    <>
      <Head>
        <title>{page.data.title}</title>
        <meta name="description" content={page.data.description} />
      </Head>
      <DocsPage
        // toc={page.data.toc}
        // tableOfContent={{
        // 	style: "clerk",
        // }}
        // lastUpdate={new Date(time)}
        full={page.data.full}
        breadcrumb={{ includeSeparator: true }}
        editOnGithub={{
          owner: 'thanhhoan-v2',
          repo: 'shine-75',
          path: `content/docs/${page.path}`,
        }}
      >
        <DocsTitle className="flex items-baseline gap-2 font-bold text-4xl">
          {page.data.title}
          {difficulty && (
            <Badge
              className="-translate-y-1.5"
              variant={
                difficulty === 'Easy'
                  ? 'easy'
                  : difficulty === 'Medium'
                  ? 'medium'
                  : 'hard'
              }
            >
              {difficulty}
            </Badge>
          )}
        </DocsTitle>
        {shouldShowFavoriteButton(page.path) ? (
          <div className="flex gap-2">
            <AddToFavoriteBtn problemTitle={page.data.title} topic={getCategoryFromPath(page.path)} />
            <CompletedBtn problemTitle={page.data.title} topic={getCategoryFromPath(page.path)} />
          </div>
        ) : null}
        <DocsDescription>{page.data.description}</DocsDescription>
        {difficulty === 'Easy' && (
          <Link
            href="/docs/easy-problems"
            className="flex items-center gap-1 font-bold hover:underline transition-all duration-500"
          >
            <BrainIcon className="size-4" /> Easy Problems
          </Link>
        )}
        <DocsBody>
          <MDXContent
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
              Steps,
              Step,
              AddToFavoriteBtn: shouldShowFavoriteButton(page.path) ? () => (
                <AddToFavoriteBtn problemTitle={page.data.title} topic={getCategoryFromPath(page.path)} />
              ) : () => null,
              CompletedBtn: shouldShowFavoriteButton(page.path) ? () => (
                <CompletedBtn problemTitle={page.data.title} topic={getCategoryFromPath(page.path)} />
              ) : () => null,
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
