import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function SidebarSeparator(props: ComponentProps<"p">) {
	return (
		<p
			{...props}
			className={cn(
				"inline-flex underline underline-offset-2 decoration-wavy decoration-pink-300 px-3 py-1 items-center gap-2 mb-1.5 text-lg rounded-md ps-(--sidebar-item-offset) empty:mb-0 [&_svg]:size-4 [&_svg]:shrink-0",
				props.className
			)}
		>
			{props.children}
		</p>
	);
}
