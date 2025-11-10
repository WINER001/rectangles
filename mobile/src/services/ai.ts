type WorkflowIntent = "thinking" | "fasting" | "waiting";

export async function askWorkflowAssistant(input: string, intent: WorkflowIntent): Promise<string> {
  const response = await fetch("http://localhost:4000/ai/workflow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input, intent })
  });

  if (!response.ok) {
    return "AI 正在小憩，请稍后再试。";
  }
  const { reply } = (await response.json()) as { reply: string };
  return reply;
}
