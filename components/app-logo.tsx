import { SVGProps } from "react";

const AppLogo = (props: SVGProps<SVGSVGElement>) => {
	return (
		<div className="flex items-center gap-2">
			<svg
				aria-label="Logo"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<path
					d="M3 10H8L12 4H21M3 14H21M8 14L12 20H21"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<span className="font-bold text-2xl">Shine75</span>
		</div>
	);
};

export default AppLogo;
