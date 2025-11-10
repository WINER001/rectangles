import { FastifyInstance } from "fastify";

import { timeSummary } from "../services/dataStore.js";

export async function timeRoutes(server: FastifyInstance) {
  server.get("/time/summary", async () => timeSummary);
}
