import { FastifyInstance } from "fastify";

import { datasets } from "../services/dataStore.js";

export async function datasetRoutes(server: FastifyInstance) {
  server.get("/datasets", async () => datasets);
}
