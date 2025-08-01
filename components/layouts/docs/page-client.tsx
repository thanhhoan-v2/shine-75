"use client";

import { TOCProvider } from "@/components/layout/toc";
import { cn } from "@/lib/utils";
import type { AnchorProviderProps } from "fumadocs-core/toc";
import { useSidebar } from "fumadocs-ui/contexts/sidebar";
import {
    type ComponentProps,
} from "react";

export { PageTOCPopover, PageTOCPopoverContent, PageTOCPopoverTrigger } from "./toc-popover";

export interface RootProps extends ComponentProps<"div"> {
	toc: Omit<AnchorProviderProps, "children">;
}

export function PageRoot({ toc, children, ...props }: RootProps) {
	const { collapsed } = useSidebar();

	return (
		<TOCProvider {...toc}>
			<div
				id="nd-page"
				{...props}
				className={cn("flex flex-1 mx-auto w-full", props.className)}
				style={{
					paddingTop: "calc(var(--fd-nav-height) + var(--fd-tocnav-height))",
					maxWidth: collapsed
						? "var(--fd-page-width)"
						: "min(var(--fd-page-width),calc(var(--fd-layout-width) - var(--fd-sidebar-width)))",
					...props.style,
				}}
			>
				{children}
			</div>
		</TOCProvider>
	);
}

export { PageBreadcrumb, type BreadcrumbProps } from "./breadcrumb";
export { PageFooter, PageLastUpdate, type FooterProps } from "./footer";

export function PageTOC(props: ComponentProps<"div">) {
	return (
		<div
			id="nd-toc"
			{...props}
			className={cn("sticky pb-2 pt-12 max-xl:hidden", props.className)}
			style={{
				...props.style,
				top: "calc(var(--fd-banner-height) + var(--fd-nav-height))",
				height: "calc(100dvh - var(--fd-banner-height) - var(--fd-nav-height))",
			}}
		>
			<div className="flex flex-col pe-4 w-(--fd-toc-width) max-w-full h-full">
				{props.children}
			</div>
		</div>
	);
}
