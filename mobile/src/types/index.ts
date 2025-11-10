export type WorkflowMode = "thinking" | "fasting" | "waiting";

export interface TimeBlock {
  id: string;
  index: number;
  label: string;
  isPast: boolean;
  isActive: boolean;
  mood?: WorkflowMode;
}

export interface WorkflowSession {
  id: string;
  mode: WorkflowMode;
  startedAt: string;
  endedAt?: string;
  reflection?: string;
  aiSummary?: string;
}

export interface Rumor {
  id: string;
  author: string;
  snippet: string;
  createdAt: string;
  likes: number;
  tags: string[];
}

export interface Bounty {
  id: string;
  requester: string;
  title: string;
  reward: number;
  description: string;
  expiresAt: string;
  status: "open" | "in_progress" | "completed";
}

export interface DatasetMeta {
  id: string;
  owner: string;
  title: string;
  coverMood: WorkflowMode;
  price: number;
  downloads: number;
  rating: number;
  synopsis: string;
}
