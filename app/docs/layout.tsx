import { baseOptions } from "@/app/layout.config";
import { DocsLayout } from "@/components/layouts/docs";
import { routes } from "@/lib/routes";
import { source } from "@/lib/source";
// import { DocsLayout } from "fumadocs-ui/layouts/docs";
// import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout
			{...baseOptions}
			tree={source.pageTree}
			nav={{ ...baseOptions.nav, mode: "top" }}
			githubUrl={routes.github.repo}
			sidebar={{
				collapsible: false,
			}}
		>
			{children}
		</DocsLayout>
	);
}
