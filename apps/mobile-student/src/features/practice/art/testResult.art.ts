// SVG illustrations of the TestResult screen (rendered by react-native-svg).
export const art1 =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="2.400" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>';
export const art2 =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#566086" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l2 2M9 2h6"></path></svg>';
export const art3 =
  '<svg width="350" height="194" viewBox="0 0 350 194" fill="none">\n      <path d="M-20 170 C 70 170, 110 110, 190 116 S 300 90, 370 30" stroke="rgba(255,255,255,0.06)" stroke-width="48" stroke-linecap="round"></path>\n      <path d="M-20 170 C 70 170, 110 110, 190 116 S 300 90, 370 30" stroke="rgba(255,255,255,0.22)" stroke-width="2" stroke-dasharray="8 10" stroke-linecap="round"></path>\n    </svg>';
export const resultRingArt = (color: string, fraction: number) =>
  `<svg width="104" height="104" viewBox="0 0 104 104">\n      <circle cx="52" cy="52" r="44" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)" stroke-width="10"></circle>\n      <circle cx="52" cy="52" r="44" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" pathLength="100" stroke-dasharray="${(fraction * 100).toFixed(1)} 100" transform="rotate(-90 52 52)"></circle>\n    </svg>`;
export const resultChipArt = (passed: boolean) => {
  const path = passed ? "M20 6 9 17l-5-5" : "M18 6 6 18M6 6l12 12";
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="3.400" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"></path></svg>`;
};
export const art6 =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A93B8" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"></path></svg>';
export const art7 =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"></path></svg>';
export const art8 =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB200" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.700"></path><path d="M3 4v5h5"></path></svg>';
