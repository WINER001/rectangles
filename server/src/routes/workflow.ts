import { FastifyInstance } from "fastify";
import { z } from "zod";

import { pushWorkflowSession, workflowSessions } from "../services/dataStore.js";

const reflectionSchema = z.object({
  sessionId: z.string(),
  reflection: z.string().min(4),
  share: z.boolean().default(false),
  mode: z.enum(["thinking", "fasting", "waiting"]).optional()
});

export async function workflowRoutes(server: FastifyInstance) {
  server.get("/workflow/history", async () => workflowSessions);

  server.post("/workflow/reflection", async (request, reply) => {
    const payload = reflectionSchema.parse(request.body);
    const mode = payload.mode ?? "thinking";
    const session = pushWorkflowSession(mode, payload.reflection, payload.share);
    return reply.status(201).send(session);
  });
}
