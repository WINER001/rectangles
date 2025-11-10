import { FastifyInstance } from "fastify";
import { z } from "zod";

import { generateWorkflowReply } from "../services/ai.js";

const schema = z.object({
  input: z.string().min(2),
  intent: z.enum(["thinking", "fasting", "waiting"])
});

export async function aiRoutes(server: FastifyInstance) {
  server.post("/ai/workflow", async (request, reply) => {
    const payload = schema.parse(request.body);
    const replyMessage = await generateWorkflowReply(payload.input, payload.intent);
    return reply.status(200).send({ reply: replyMessage });
  });
}
