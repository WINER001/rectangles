import { FastifyInstance } from "fastify";

import { bountyBoard, leaderboard, rumorBoard } from "../services/dataStore.js";

export async function communityRoutes(server: FastifyInstance) {
  server.get("/community/rumors", async () => rumorBoard);
  server.get("/community/bounties", async () => bountyBoard);
  server.get("/community/leaderboard", async () => leaderboard);
}
