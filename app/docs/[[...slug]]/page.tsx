import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "@/components/layouts/page";
import { routes } from "@/lib/routes";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { getGithubLastEdit } from "fumadocs-core/server";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { PenLineIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page(props: {
	params: Promise<{ slug?: string[] }>;
}) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	const MDXContent = page.data.body;

	let time = await getGithubLastEdit({
		owner: "thanhhoan-v2",
		repo: "shine-75",
		path: `content/docs/${page.path}`,
	});

	if (!time) time = new Date();

	return (
		<DocsPage
			// toc={page.data.toc}
			// tableOfContent={{
			// 	style: "clerk",
			// }}
			lastUpdate={new Date(time)}
			full={page.data.full}
			breadcrumb={{ includeSeparator: true }}
		>
			<DocsTitle className="flex justify-between items-center">
				<div className="font-bold text-4xl">{page.data.title}</div>
				<Link
					href={routes.github.edit(page.path)}
					rel="noreferrer noopener"
					target="_blank"
					className="flex items-center gap-2 bg-secondary hover:bg-accent px-3 py-1 rounded-md w-fit font-medium text-sm"
				>
					<PenLineIcon className="w-4 h-4" />
					Edit on GitHub
				</Link>
			</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDXContent
					components={getMDXComponents({
						// this allows you to link to other pages with relative file paths
						a: createRelativeLink(source, page),
					})}
				/>
			</DocsBody>
		</DocsPage>
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
