import { OpenAI } from "openai";

const SYSTEM_PROMPT = `你是酒楼里的 AI 夥计，语气温柔，擅长结合用户脑力/体力状态给出三态工作流建议。
输出限制在 120 字以内，使用自然中文。`;

let client: OpenAI | null = null;

function getClient() {
  if (client) {
    return client;
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  client = new OpenAI({ apiKey });
  return client;
}

export async function generateWorkflowReply(input: string, intent: string) {
  const openai = getClient();
  if (!openai) {
    return `【离线建议】当前模式：${intent}。请设定一个 10 分钟可完成的小目标，并专注呼吸三次再开始。`;
  }

  const resp = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      {
        role: "user",
        content: `当前模式：${intent}。\n用户描述：${input}`
      }
    ],
    max_output_tokens: 256
  });

  const text = resp.output_text?.trim();
  return text || "AI 暂时走神，请稍后再试。";
}
