// SVG illustrations of the SignQuiz2 screen (rendered by react-native-svg).
export const art1 =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>';
export const art2 =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7396" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>';
export const answerMarkArt = (right: boolean) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.200" stroke-linecap="round" stroke-linejoin="round"><path d="${right ? "M20 6 9 17l-5-5" : "M18 6 6 18M6 6l12 12"}"></path></svg>`;
export const art4 =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>';
export const nextArrowArt = (color: string) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>`;
export const art6 =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>';
export const scoreRingArt = (fraction: number) =>
  `<svg width="112" height="112" viewBox="0 0 112 112"><circle cx="56" cy="56" r="48" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="10"></circle><circle cx="56" cy="56" r="48" fill="none" stroke="#FFB200" stroke-width="10" stroke-linecap="round" pathLength="100" stroke-dasharray="${(fraction * 100).toFixed(1)} 100" transform="rotate(-90 56 56)"></circle></svg>`;
export const reviewMarkArt = (ok: boolean) =>
  `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.600" stroke-linecap="round" stroke-linejoin="round"><path d="${ok ? "M20 6 9 17l-5-5" : "M18 6 6 18M6 6l12 12"}"></path></svg>`;
export const art9 =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>';
export const art10 =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB200" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"></path></svg>';
