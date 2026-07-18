// Type scale. Display headings read "editorial studio" rather than default
// system UI; body copy stays highly legible at small mobile sizes.
// Swap fontFamily values for @expo-google-fonts/space-grotesk + inter
// once fonts are loaded in App.tsx.

import { Platform } from "react-native";

const displayFamily = Platform.select({ ios: "System", android: "sans-serif-medium", default: "System" });
const bodyFamily = Platform.select({ ios: "System", android: "sans-serif", default: "System" });

export const typography = {
  fontFamily: {
    display: displayFamily,
    body: bodyFamily,
  },
  display: { fontSize: 32, lineHeight: 38, fontWeight: "700" as const, letterSpacing: -0.5 },
  h1: { fontSize: 26, lineHeight: 32, fontWeight: "700" as const, letterSpacing: -0.3 },
  h2: { fontSize: 21, lineHeight: 27, fontWeight: "700" as const, letterSpacing: -0.2 },
  h3: { fontSize: 17, lineHeight: 23, fontWeight: "600" as const },
  body: { fontSize: 15, lineHeight: 22, fontWeight: "400" as const },
  bodyMedium: { fontSize: 15, lineHeight: 22, fontWeight: "600" as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: "400" as const },
  captionMedium: { fontSize: 13, lineHeight: 18, fontWeight: "600" as const },
  tiny: { fontSize: 11, lineHeight: 14, fontWeight: "500" as const, letterSpacing: 0.3 },
};
