// SVG illustrations of the Tickets screen (rendered by react-native-svg).
export const art2 =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>';
export const art4 =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.800" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>';
/** Hero of the tickets screen: the road is hidden while the student has not started (opacity 0). The moving car is added with the animation pass. */
export const orderHeroArt = (roadOpacity: number) =>
  `<svg width="350" height="192" viewBox="0 0 350 192" fill="none">
    <defs>
      <linearGradient id="h5bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1A2BB0"></stop><stop offset="1" stop-color="#0B1679"></stop></linearGradient>
      <radialGradient id="h5glow" cx="0.9" cy="0.22" r="0.55"><stop offset="0" stop-color="#FFB200" stop-opacity="0.32"></stop><stop offset="1" stop-color="#FFB200" stop-opacity="0"></stop></radialGradient>
      <clipPath id="h5clip"><path d="M0 46 Q0 30 16 28 L320 2 Q350 0 350 28 V168 Q350 192 326 192 H24 Q0 192 0 168z"></path></clipPath>
    </defs>
    <path d="M0 46 Q0 30 16 28 L320 2 Q350 0 350 28 V168 Q350 192 326 192 H24 Q0 192 0 168z" fill="url(#h5bg)"></path>
    <g clip-path="url(#h5clip)">
      <rect width="350" height="192" fill="url(#h5glow)"></rect>
      <path d="M-6 156 C 70 158, 120 142, 186 138 S 286 120, 356 72" stroke="rgba(255,255,255,0.09)" stroke-width="22" stroke-linecap="round"></path>
      <path d="M-6 156 C 70 158, 120 142, 186 138 S 286 120, 356 72" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-dasharray="7 9" stroke-linecap="round"></path>
      <path d="M-6 156 C 70 158, 120 142, 186 138 S 286 120, 356 72" pathLength="100" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-dasharray="33.900 300" opacity="${roadOpacity}"></path>
      <path d="M-6 156 C 70 158, 120 142, 186 138 S 286 120, 356 72" pathLength="100" stroke="#FF6B78" stroke-width="5" stroke-linecap="round" stroke-dasharray="5 300" stroke-dashoffset="-34.200" opacity="${roadOpacity}"></path>
    </g>
  </svg>`;
export const art6 =
  '<svg width="96" height="96" viewBox="20 18 128 112" fill="none">\n    <g transform="translate(84 76) rotate(-16) translate(-18 0)"><rect x="-34" y="-46" width="68" height="92" rx="12" fill="#6E86FF"></rect></g>\n    <g transform="translate(84 76) rotate(14) translate(18 0)"><rect x="-34" y="-46" width="68" height="92" rx="12" fill="#FFB200"></rect></g>\n    <g transform="translate(84 74)">\n      <rect x="-36" y="-48" width="72" height="96" rx="13" fill="#FFFFFF"></rect>\n      <rect x="-26" y="-38" width="52" height="22" rx="6" fill="#EEF1FF"></rect>\n      <rect x="-26" y="-8" width="52" height="10" rx="5" fill="#DDE2FA"></rect>\n      <rect x="-26" y="8" width="52" height="10" rx="5" fill="#0E1C91"></rect>\n      <path d="M-21 13l2.500 2.500 4.500-4.500" stroke="#FFB200" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"></path>\n      <rect x="-26" y="24" width="52" height="10" rx="5" fill="#DDE2FA"></rect>\n    </g>\n  </svg>';
export const art7 =
  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6h10M10 12h10M10 18h10"></path><path d="M4 5h1.500v3M4 8h3M4.200 14.500a1.400 1.400 0 0 1 2.600.700c0 1-2.800 2-2.800 2.800h3"></path></svg>';
export const art8 =
  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.700"></path><path d="M3 4v5h5"></path></svg>';
export const art9 =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="#0A0E2E" stroke="#0A0E2E" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12v18l-6-4-6 4z"></path></svg>';
export const art10 =
  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="6" rx="2"></rect><rect x="3" y="14" width="18" height="6" rx="2"></rect></svg>';
export const art11 =
  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16"></path></svg>';
export const art12 =
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.800" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.700"></path><path d="M3 4v5h5"></path></svg>';
export const ticketRowBackground = (color: string) =>
  `<svg width="100%" height="112" viewBox="0 0 170 112" preserveAspectRatio="none" fill="none">\n            <path d="M0 0 H170 V84 Q170 98 156 100 L14 112 Q0 113 0 99z" fill="${color}"></path>\n          </svg>`;
export const art15 =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="3.400" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';
export const art16 =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB200" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';
export const art19 =
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="3.400" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.500l4.500 4.500L19 7.500"></path></svg>';
export const art20 =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="2.600" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"></path></svg>';
export const art22 =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFB200" stroke-width="2.800" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';
export const recentMark = (wrong: boolean) => {
  const path = wrong ? "M6 6l12 12M18 6 6 18" : "M20 6 9 17l-5-5";
  return `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="4.500" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"></path></svg>`;
};
export const art24 =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#566086" stroke-width="2.600" stroke-linecap="round"><path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"></path></svg>';
export const art25 =
  '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D92D3A" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.700"></path><path d="M3 4v5h5"></path></svg>';
