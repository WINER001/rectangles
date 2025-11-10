import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import dotenv from "dotenv";

import { timeRoutes } from "./routes/time.js";
import { workflowRoutes } from "./routes/workflow.js";
import { communityRoutes } from "./routes/community.js";
import { datasetRoutes } from "./routes/datasets.js";
import { aiRoutes } from "./routes/ai.js";

dotenv.config();

async function bootstrap() {
  const server = Fastify({
    logger: true
  });

  await server.register(cors, {
    origin: "*"
  });
  await server.register(sensible);

  server.get("/health", async () => ({ status: "ok" }));

  await server.register(timeRoutes);
  await server.register(workflowRoutes);
  await server.register(communityRoutes);
  await server.register(datasetRoutes);
  await server.register(aiRoutes);

  const port = Number(process.env.PORT ?? 4000);
  const host = process.env.HOST ?? "0.0.0.0";

  try {
    await server.listen({ port, host });
    server.log.info(`Server listening on http://${host}:${port}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

void bootstrap();
