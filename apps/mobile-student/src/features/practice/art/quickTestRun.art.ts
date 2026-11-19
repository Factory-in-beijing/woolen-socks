// SVG illustrations of the QuickTestRun screen (rendered by react-native-svg).
export const art1 =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="2.400" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>';
export const timerRingArt = (fraction: number) =>
  `<svg width="30" height="30" viewBox="0 0 30 30">\n      <circle cx="15" cy="15" r="11" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="4"></circle>\n      <circle cx="15" cy="15" r="11" fill="none" stroke="#FFB200" stroke-width="4" stroke-linecap="round" pathLength="100" stroke-dasharray="${(fraction * 100).toFixed(1)} 100" transform="rotate(-90 15 15)"></circle>\n    </svg>`;
export const art3 =
  '<svg width="350" height="176" viewBox="0 0 350 176" preserveAspectRatio="xMidYMid slice" fill="none">\n        <rect width="350" height="176" fill="#CFE4FB"></rect>\n        <rect y="122" width="350" height="54" fill="#9CCB76"></rect>\n        <rect y="134" width="350" height="42" fill="#7D8496"></rect>\n        <path d="M0 155H350" stroke="#FFFFFF" stroke-width="2.500" stroke-dasharray="14 10"></path>\n        <rect x="171" y="70" width="8" height="70" rx="3" fill="#8A93A8"></rect>\n        <g transform="translate(175 62)">\n          <path d="M-17 -41H17L41 -17V17L17 41H-17L-41 17V-17Z" fill="#FFFFFF"></path>\n          <path d="M-15 -36H15L36 -15V15L15 36H-15L-36 15V-15Z" fill="#D92D3A"></path>\n          <text x="0" y="8" text-anchor="middle" font-family="Manrope_800ExtraBold" font-size="21" font-weight="800" letter-spacing="0.5" fill="#FFFFFF">STOP</text>\n        </g>\n      </svg>';
export const art4 =
  '<svg width="350" height="176" viewBox="0 0 350 176" preserveAspectRatio="xMidYMid slice" fill="none">\n        <rect width="350" height="176" fill="#9CCB76"></rect>\n        <circle cx="38" cy="30" r="22" fill="#86B964"></circle><circle cx="60" cy="22" r="14" fill="#86B964"></circle>\n        <circle cx="306" cy="150" r="20" fill="#86B964"></circle><circle cx="40" cy="152" r="16" fill="#86B964"></circle>\n        <rect x="0" y="60" width="350" height="56" fill="#7D8496"></rect>\n        <rect x="147" y="0" width="56" height="176" fill="#7D8496"></rect>\n        <path d="M0 60H147M203 60H350M0 116H147M203 116H350M147 0V60M203 0V60M147 116V176M203 116V176" stroke="#E9EDF5" stroke-width="2"></path>\n        <path d="M0 88H136M214 88H350M175 0V49M175 127V176" stroke="#FFFFFF" stroke-width="2.500" stroke-dasharray="12 10"></path>\n        <g transform="translate(189 150)">\n          <rect x="-11" y="-19" width="22" height="38" rx="7" fill="rgba(10,14,46,0.25)" transform="translate(2 3)"></rect>\n          <rect x="-11" y="-19" width="22" height="38" rx="7" fill="#FFB200"></rect>\n          <rect x="-8" y="-11" width="16" height="9" rx="3" fill="#0A0E2E"></rect>\n          <rect x="-7" y="9" width="14" height="5" rx="2" fill="#0A0E2E" opacity="0.8"></rect>\n        </g>\n        <path d="M189 126V108M183 114l6-7 6 7" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>\n        <g transform="translate(262 74) rotate(90)">\n          <rect x="-11" y="-19" width="22" height="38" rx="7" fill="rgba(10,14,46,0.25)" transform="translate(2 -3)"></rect>\n          <rect x="-11" y="-19" width="22" height="38" rx="7" fill="#F4F6FC"></rect>\n          <rect x="-8" y="-11" width="16" height="9" rx="3" fill="#2E3550"></rect>\n          <rect x="-7" y="9" width="14" height="5" rx="2" fill="#2E3550" opacity="0.8"></rect>\n        </g>\n        <path d="M238 74H220M226 68l-7 6 7 6" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>\n      </svg>';
export const answerMarkArt = (right: boolean) => {
  const path = right ? "M20 6 9 17l-5-5" : "M18 6 6 18M6 6l12 12";
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.200" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"></path></svg>`;
};
export const art6 =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.600" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';
export const art7 =
  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.600" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>';
export const art8 =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';
export const art9 =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0E2E" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"></path></svg>';
export const nextArrowArt = (color: string) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>`;
export const art11 =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB200" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';
export const art12 =
  '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B97A00" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l2 2M9 2h6"></path></svg>';
export const art13 =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.200" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>';
