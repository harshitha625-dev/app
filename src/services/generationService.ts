// Abstraction boundary: every screen calls into this service, never a backend
// SDK directly. Today it resolves against local mock state; swapping Plan A
// (Supabase Edge Functions) or Plan B (NestJS + queue) later means only this
// file changes, not the screens that call it.

import { Project, ProjectType } from "@/types";
import { GENERATION_COSTS } from "@/constants";

export interface CreateGenerationInput {
  type: ProjectType;
  prompt?: string;
  aspectRatio: Project["aspectRatio"];
  durationSeconds: number;
}

let idCounter = 100;

export async function createGeneration(input: CreateGenerationInput): Promise<Project> {
  await delay(400);
  idCounter += 1;
  return {
    id: `p_${idCounter}`,
    type: input.type,
    title: input.prompt ? truncate(input.prompt, 40) : "Untitled project",
    status: "queued",
    prompt: input.prompt,
    durationSeconds: input.durationSeconds,
    aspectRatio: input.aspectRatio,
    creditsCost: GENERATION_COSTS[input.type],
    createdAt: new Date().toISOString(),
    progress: 0,
  };
}

export async function cancelGeneration(projectId: string): Promise<void> {
  await delay(200);
}

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1)}\u2026` : text;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
