import { Mermaid } from "@/components/mdx/mermaid";
import ProblemGenerator from "@/components/mdx/problem-generator";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		Mermaid,
		ProblemGenerator,
		// AddToFavoriteBtn is now handled conditionally in the docs page
		// HTML `ref` attribute conflicts with `forwardRef`
		pre: ({ ref: _ref, ...props }) => (
			<CodeBlock {...props}>
				<Pre>{props.children}</Pre>
			</CodeBlock>
		),
		...components,
	};
}
