import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from '@/components/layouts/page';
import { getDifficultyFromPathname } from '@/lib/db';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import Head from 'next/head';
import { notFound } from 'next/navigation';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const difficulty = getDifficultyFromPathname(page.path);

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
        <DocsTitle className="font-bold text-4xl">
          {page.data.title}
        </DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDXContent
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
              Steps,
              Step,
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
