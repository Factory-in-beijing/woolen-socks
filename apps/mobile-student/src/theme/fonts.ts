import {
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import {
  NotoSansGeorgian_500Medium,
  NotoSansGeorgian_600SemiBold,
  NotoSansGeorgian_700Bold,
  NotoSansGeorgian_800ExtraBold,
} from "@expo-google-fonts/noto-sans-georgian";

/** Font files to load at start-up (see app/_layout.tsx). */
export const fontAssets = {
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  NotoSansGeorgian_500Medium,
  NotoSansGeorgian_600SemiBold,
  NotoSansGeorgian_700Bold,
  NotoSansGeorgian_800ExtraBold,
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
  notoGeorgian: {
    500: "NotoSansGeorgian_500Medium",
    600: "NotoSansGeorgian_600SemiBold",
    700: "NotoSansGeorgian_700Bold",
    800: "NotoSansGeorgian_800ExtraBold",
  },
} as const;
