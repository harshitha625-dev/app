import { PricingPlan } from "@/types";

export const APP_NAME = "VEYTRIX";

export const ONBOARDING_SLIDES = [
  {
    key: "text_to_video",
    title: "AI Video Generation",
    body: "Describe a scene in plain words and watch VEYTRIX render it into a full video clip.",
  },
  {
    key: "image_to_video",
    title: "Image to Video",
    body: "Turn a single photo into motion. Upload an image, add a prompt, pick a style.",
  },
  {
    key: "reference_video",
    title: "Reference Video Editing",
    body: "Give VEYTRIX a reference clip and steer the output with your own prompt and strength.",
  },
  {
    key: "manual_edit",
    title: "AI Manual Edit",
    body: "Trim, layer effects, add transitions and filters — fine control when you need it.",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "plus",
    name: "Plus",
    priceLabel: "₹99",
    credits: 200,
    perks: ["200 monthly credits", "720p exports", "Standard render queue"],
  },
  {
    id: "pro",
    name: "Pro",
    priceLabel: "₹199",
    credits: 500,
    perks: ["500 monthly credits", "1080p exports", "Priority render queue", "Reference video editing"],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    priceLabel: "₹299",
    credits: 1200,
    perks: ["1200 monthly credits", "4K exports", "Fastest render queue", "Early access features"],
  },
];

export const GENERATION_COSTS = {
  text_to_video: 20,
  image_to_video: 15,
  reference_video: 25,
  manual_edit: 5,
};
