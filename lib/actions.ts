import { problems } from "@/lib/problems";
import { Problem, Topic } from "@/lib/schema";

const getAllTopics = (): string[] => {
	return Object.keys(problems);
};

const getTotalProblemsByTopic = (topicName: string): number => {
	return problems[topicName]?.totalProblems || 0;
};

const getTotalProblems = (): number => {
	return Object.values(problems).reduce(
		(total, topic) => total + (topic as Topic).totalProblems,
		0
	);
};

const getTotalCompleted = (): number => {
	return Object.values(problems).reduce(
		(total, topic) => total + topic.completed,
		0
	);
};

const getProblemsByDifficulty = (difficulty: "Easy" | "Medium" | "Hard") => {
	return Object.values(problems).flatMap((topic) =>
		topic.problems.filter(
			(problem: Problem) => problem.difficulty === difficulty
		)
	);
};

const getProblemsByWeek = (week: number) => {
	return Object.values(problems).flatMap((topic) =>
		topic.problems.filter((problem: Problem) => problem.week === week)
	);
};

const getTopicProgress = (
	topicName: string
): { completed: number; total: number; percentage: number } => {
	const topic = problems[topicName];
	if (!topic) return { completed: 0, total: 0, percentage: 0 };

	const percentage =
		topic.totalProblems > 0 ? (topic.completed / topic.totalProblems) * 100 : 0;
	return {
		completed: topic.completed,
		total: topic.totalProblems,
		percentage: Math.round(percentage * 100) / 100,
	};
};

const getTopicsByDifficultyDistribution = () => {
	const distribution: Record<
		string,
		{ Easy: number; Medium: number; Hard: number }
	> = {};

	Object.entries(problems).forEach(([topicName, topic]) => {
		distribution[topicName] = { Easy: 0, Medium: 0, Hard: 0 };
		topic.problems.forEach((problem: Problem) => {
			distribution[topicName][problem.difficulty]++;
		});
	});

	return distribution;
};

export {
	getAllTopics,
	getProblemsByDifficulty,
	getProblemsByWeek,
	getTopicProgress,
	getTopicsByDifficultyDistribution,
	getTotalCompleted,
	getTotalProblems,
	getTotalProblemsByTopic
};

