import { Bounty, DatasetMeta, Rumor, WorkflowMode, WorkflowSession } from "../types/index.js";

const now = new Date();

const minutesUsed = 250;

export const timeSummary = {
  usedMinutes: minutesUsed,
  remainingMinutes: 1440 - minutesUsed
};

export const rumorBoard: Rumor[] = [
  {
    id: "r1",
    author: "酒楼掌柜",
    snippet: "今天的斋戒模式帮我砍掉了 6 个通知，终于完成策划案。",
    createdAt: now.toISOString(),
    likes: 87,
    tags: ["斋戒", "专注"]
  },
  {
    id: "r2",
    author: "旅人阿枝",
    snippet: "等待模式的海浪呼吸太疗愈，疲惫值下降 50%。",
    createdAt: now.toISOString(),
    likes: 54,
    tags: ["等待", "恢复"]
  }
];

export const bountyBoard: Bounty[] = [
  {
    id: "b1",
    requester: "墨客",
    title: "寻找时间切片的最佳实践",
    reward: 120,
    description: "希望收集 5 条关于如何拆分 10 分钟时间块的经验，准备写一篇指南。",
    expiresAt: new Date(now.getTime() + 86400000).toISOString(),
    status: "open"
  },
  {
    id: "b2",
    requester: "设计师白鹭",
    title: "需要一个手绘风的番茄钟音效库",
    reward: 200,
    description: "寻找温暖鼓点、木鱼声等节奏，配合斋戒模式使用。",
    expiresAt: new Date(now.getTime() + 172800000).toISOString(),
    status: "in_progress"
  }
];

export const datasets: DatasetMeta[] = [
  {
    id: "d1",
    owner: "掌柜",
    title: "晨间思考例行",
    coverMood: "thinking",
    price: 39,
    downloads: 123,
    rating: 4.8,
    synopsis: "记录 21 次晨间模式的拆解脚本，含 AI 提示词和执行清单。"
  },
  {
    id: "d2",
    owner: "旅人阿枝",
    title: "深夜等待冥想集",
    coverMood: "waiting",
    price: 29,
    downloads: 86,
    rating: 4.6,
    synopsis: "以呼吸和体感为主线的冥想稿，适合夜间恢复能量。"
  }
];

export const workflowSessions: WorkflowSession[] = [];

export const leaderboard = {
  datasets: datasets.map((dataset) => ({
    label: dataset.title,
    value: `评分 ${dataset.rating}`
  })),
  helpers: [
    { label: "掌柜", value: "完成悬赏 5" },
    { label: "旅人阿枝", value: "完成悬赏 3" },
    { label: "青山隐士", value: "完成悬赏 2" }
  ]
};

export function pushWorkflowSession(mode: WorkflowMode, reflection: string, share: boolean) {
  const session: WorkflowSession = {
    id: `session-${Date.now()}`,
    mode,
    startedAt: new Date(Date.now() - 45 * 60000).toISOString(),
    endedAt: new Date().toISOString(),
    reflection,
    shared: share
  };
  workflowSessions.unshift(session);
  if (share) {
    rumorBoard.unshift({
      id: `rumor-${Date.now()}`,
      author: "你",
      snippet: reflection.slice(0, 120),
      createdAt: new Date().toISOString(),
      likes: 0,
      tags: ["新鲜出炉"]
    });
  }
  return session;
}
