import { useState } from "react";

export type LegalTab = "terms" | "privacy";

// Hero card look per tab (blue for the terms of use, yellow for privacy).
const HERO = {
  terms: {
    title: "What you agree to",
    backgroundImage: "radial-gradient(120% 120% at 0% 0%, #2638DA 0%, #0E1C91 55%, #08106A 100%)",
    boxShadow: "0 20px 34px -20px rgba(14,28,145,0.6)",
    foreground: "#FFFFFF",
    blob: "rgba(255,178,0,0.14)",
  },
  privacy: {
    title: "How we treat your data",
    backgroundImage: "linear-gradient(135deg, #FFD266 0%, #FFB200 55%, #F2A100 100%)",
    boxShadow: "0 20px 34px -20px rgba(242,161,0,0.7)",
    foreground: "#0A0E2E",
    blob: "rgba(255,255,255,0.22)",
  },
} as const;

const PILL_LEFT = { terms: 4, privacy: 174 } as const;
const TAB_ACTIVE = "#FFFFFF";
const TAB_IDLE = "#566086";

/** State of the Terms / Privacy switcher: which tab is open and how the hero and tab pill look for it. */
export function useLegalViewModel() {
  const [tab, setTab] = useState<LegalTab>("terms");
  return {
    tab,
    hero: HERO[tab],
    pillLeft: PILL_LEFT[tab],
    termsColor: tab === "terms" ? TAB_ACTIVE : TAB_IDLE,
    privacyColor: tab === "privacy" ? TAB_ACTIVE : TAB_IDLE,
    showTerms: () => setTab("terms"),
    showPrivacy: () => setTab("privacy"),
  };
}
