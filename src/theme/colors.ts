// VEYTRIX design tokens — "studio at night" theme.
// A cinematic dark canvas with a signature indigo→violet motion gradient,
// evoking a rendering timeline rather than a generic dark-mode app.

export const colors = {
  background: "#0B0D14",
  surface: "#141826",
  surfaceRaised: "#1B2032",
  surfaceOverlay: "rgba(20, 24, 38, 0.92)",
  border: "#262C40",
  borderSubtle: "#1E2333",

  gradientStart: "#4F6EF7",
  gradientEnd: "#B24BF3",
  accent: "#6C5CE7",
  accentMuted: "rgba(108, 92, 231, 0.16)",

  success: "#22D3AE",
  successMuted: "rgba(34, 211, 174, 0.14)",
  warning: "#F5A623",
  warningMuted: "rgba(245, 166, 35, 0.14)",
  error: "#FF5470",
  errorMuted: "rgba(255, 84, 112, 0.14)",
  info: "#22D3EE",

  textPrimary: "#F5F6FA",
  textSecondary: "#9096A8",
  textMuted: "#5C6377",
  textInverse: "#0B0D14",

  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(6, 7, 12, 0.72)",
};

export const gradients = {
  primary: [colors.gradientStart, colors.gradientEnd] as const,
  subtle: ["rgba(79,110,247,0.18)", "rgba(178,75,243,0.18)"] as const,
  progress: [colors.gradientStart, colors.info, colors.gradientEnd] as const,
};
