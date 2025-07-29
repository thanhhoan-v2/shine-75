import HeroSection from "@/components/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Shine 75 - Home",
	description: "Shine 75 is a collection of curated LeetCode problems.",
};

export default function HomePage() {
	return (
		<>
			<HeroSection />
		</>
	);
}
