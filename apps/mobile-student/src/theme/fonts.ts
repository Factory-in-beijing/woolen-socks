// Import each weight from its own path: importing the package root would bundle every weight of the family.
import { Manrope_500Medium } from "@expo-google-fonts/manrope/500Medium";
import { Manrope_600SemiBold } from "@expo-google-fonts/manrope/600SemiBold";
import { Manrope_700Bold } from "@expo-google-fonts/manrope/700Bold";
import { Manrope_800ExtraBold } from "@expo-google-fonts/manrope/800ExtraBold";
import { SpaceGrotesk_500Medium } from "@expo-google-fonts/space-grotesk/500Medium";
import { SpaceGrotesk_600SemiBold } from "@expo-google-fonts/space-grotesk/600SemiBold";
import { SpaceGrotesk_700Bold } from "@expo-google-fonts/space-grotesk/700Bold";

/** Font files to load at start-up (see app/_layout.tsx). */
export const fontAssets = {
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
};

/**
 * Font family names by weight. React Native needs one family per weight, so styles reference
 * `font.manrope[800]` where the design says `font-family: Manrope; font-weight: 800`.
 */
export const font = {
  manrope: {
    500: "Manrope_500Medium",
    600: "Manrope_600SemiBold",
    700: "Manrope_700Bold",
    800: "Manrope_800ExtraBold",
  },
  spaceGrotesk: {
    500: "SpaceGrotesk_500Medium",
    600: "SpaceGrotesk_600SemiBold",
    700: "SpaceGrotesk_700Bold",
  },
} as const;
