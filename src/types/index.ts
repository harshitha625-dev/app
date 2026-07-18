export type ProjectType = "text_to_video" | "image_to_video" | "reference_video" | "manual_edit";
export type ProjectStatus = "draft" | "queued" | "processing" | "rendering" | "completed" | "failed";

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  status: ProjectStatus;
  prompt?: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  aspectRatio: "9:16" | "1:1" | "16:9";
  creditsCost: number;
  createdAt: string;
  progress?: number; // 0-100 while rendering
}

export type PlanTier = "free" | "plus" | "pro" | "premium";

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  plan: PlanTier;
  creditsBalance: number;
}

export type LedgerReason = "generation" | "recharge" | "refund" | "promo";

export interface LedgerEntry {
  id: string;
  amount: number; // + credit, - debit
  reason: LedgerReason;
  label: string;
  createdAt: string;
}

export type NotificationType = "generation" | "credits" | "updates" | "security" | "maintenance";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface PricingPlan {
  id: PlanTier;
  name: string;
  priceLabel: string;
  credits: number;
  perks: string[];
  highlighted?: boolean;
}
