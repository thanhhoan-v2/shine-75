export interface Problem {
  title: string;
  difficulty: string;
  description: string;
  timeLimit: string;
  week: number;
  tags: string[];
  slug: string;
}

export interface Topic {
  name: string;
  slug: string;
  problems: Problem[];
}

export interface ProblemSet {
  name: string;
  problems: Problem[];
  topic?: string;
  difficulty?: string;
} 