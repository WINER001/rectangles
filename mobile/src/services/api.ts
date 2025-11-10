const API_BASE_URL = "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...init
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "网络请求失败");
  }
  return response.json() as Promise<T>;
}

export const api = {
  getTimeSummary: () => request<{ usedMinutes: number; remainingMinutes: number }>("/time/summary"),
  getRumors: () => request("/community/rumors"),
  getBounties: () => request("/community/bounties"),
  getLeaderboard: () => request("/community/leaderboard"),
  getDatasets: () => request("/datasets"),
  publishReflection: (payload: { sessionId: string; reflection: string; share: boolean }) =>
    request("/workflow/reflection", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};
