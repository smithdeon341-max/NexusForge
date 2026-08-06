import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-pro-latest'),
    system: "You are BuddieAI, an expert enterprise AI assistant for NexusForge LLC and its subsidiaries (We The People, StudioSocial). You are helpful, concise, and highly intelligent. Do not hallucinate business metrics.",
    messages,
  });

  return result.toTextStreamResponse();
}