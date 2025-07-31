import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
	"inline-flex justify-center items-center disabled:opacity-50 p-2 rounded-md focus-visible:outline-none font-medium text-sm transition-colors duration-100 cursor-pointer disabled:pointer-events-none",
	{
		variants: {
			color: {
				primary:
					"bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/80",
				outline: "border hover:bg-fd-accent hover:text-fd-accent-foreground",
				ghost: "hover:bg-fd-accent hover:text-fd-accent-foreground",
				secondary:
					"border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
			},
			size: {
				sm: "gap-1 px-2 py-1.5 text-xs",
				icon: "p-1.5 [&_svg]:size-5",
				"icon-sm": "p-1.5 [&_svg]:size-4.5",
				"icon-xs": "p-1 [&_svg]:size-4",
			},
		},
	}
);

export const Button = ({
	className,
	color,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) => {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ color, size, className }))}
			{...props}
		/>
	);
};

export type ButtonProps = VariantProps<typeof buttonVariants>;
