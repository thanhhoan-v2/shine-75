export type Problem = {
	id: number;
	name: string;
	difficulty: "Easy" | "Medium" | "Hard";
	timeLimit: string;
	week: number;
};

export type Topic = {
	name: string;
	totalProblems: number;
	completed: number;
	problems: Problem[];
};
