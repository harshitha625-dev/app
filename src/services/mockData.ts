import { AppNotification, LedgerEntry, Project, User } from "@/types";

export const mockUser: User = {
  id: "u_1",
  fullName: "Aarav Mehta",
  email: "aarav@veytrix.app",
  plan: "pro",
  creditsBalance: 340,
};

export const mockProjects: Project[] = [
  {
    id: "p_1",
    type: "text_to_video",
    title: "Neon city flyover",
    status: "completed",
    prompt: "A drone shot flying over a neon-lit cyberpunk city at night, rain reflections",
    durationSeconds: 8,
    aspectRatio: "16:9",
    creditsCost: 20,
    createdAt: "2026-07-08T18:30:00Z",
  },
  {
    id: "p_2",
    type: "image_to_video",
    title: "Portrait to cinematic pan",
    status: "processing",
    progress: 62,
    durationSeconds: 5,
    aspectRatio: "9:16",
    creditsCost: 15,
    createdAt: "2026-07-09T09:12:00Z",
  },
  {
    id: "p_3",
    type: "reference_video",
    title: "Dance reference restyle",
    status: "queued",
    durationSeconds: 10,
    aspectRatio: "9:16",
    creditsCost: 25,
    createdAt: "2026-07-09T10:02:00Z",
  },
  {
    id: "p_4",
    type: "manual_edit",
    title: "Product launch teaser",
    status: "draft",
    durationSeconds: 15,
    aspectRatio: "1:1",
    creditsCost: 5,
    createdAt: "2026-07-07T14:20:00Z",
  },
  {
    id: "p_5",
    type: "text_to_video",
    title: "Mountain sunrise timelapse",
    status: "failed",
    prompt: "Timelapse of sunrise over snow-capped mountains, golden hour",
    durationSeconds: 6,
    aspectRatio: "16:9",
    creditsCost: 20,
    createdAt: "2026-07-06T07:45:00Z",
  },
];

export const mockLedger: LedgerEntry[] = [
  { id: "l_1", amount: -20, reason: "generation", label: "Neon city flyover", createdAt: "2026-07-08T18:30:00Z" },
  { id: "l_2", amount: 500, reason: "recharge", label: "Pro plan renewal", createdAt: "2026-07-01T00:00:00Z" },
  { id: "l_3", amount: -15, reason: "generation", label: "Portrait to cinematic pan", createdAt: "2026-07-09T09:12:00Z" },
  { id: "l_4", amount: 50, reason: "promo", label: "Referral bonus", createdAt: "2026-06-28T12:00:00Z" },
  { id: "l_5", amount: 25, reason: "refund", label: "Failed render refund", createdAt: "2026-07-06T08:00:00Z" },
];

export const mockNotifications: AppNotification[] = [
  { id: "n_1", type: "generation", title: "Render complete", body: "\u201cNeon city flyover\u201d is ready to view.", read: false, createdAt: "2026-07-08T18:32:00Z" },
  { id: "n_2", type: "credits", title: "Low credits", body: "You have 40 credits left this cycle.", read: false, createdAt: "2026-07-09T08:00:00Z" },
  { id: "n_3", type: "updates", title: "New: Reference strength control", body: "Fine-tune how closely output follows your reference clip.", read: true, createdAt: "2026-07-05T10:00:00Z" },
  { id: "n_4", type: "security", title: "New sign-in detected", body: "A new device signed in to your account.", read: true, createdAt: "2026-07-03T21:15:00Z" },
  { id: "n_5", type: "maintenance", title: "Scheduled maintenance", body: "Rendering may be delayed July 12, 2-3 AM IST.", read: true, createdAt: "2026-07-02T09:00:00Z" },
];

export const TRENDING_TEMPLATES = [
  { id: "t_1", title: "Cinematic product reveal", type: "text_to_video" as const },
  { id: "t_2", title: "Retro film look", type: "manual_edit" as const },
  { id: "t_3", title: "Portrait parallax", type: "image_to_video" as const },
];
