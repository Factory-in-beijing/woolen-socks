// Icons of the study-material chips (a ticket for exam tickets, one sign for each of the 8 road-sign groups).
export const TICKET_TOPIC_ICON =
  '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><g transform="rotate(-10 20 20)"><path d="M6 12a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3v4a4 4 0 0 0 0 8v4a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-4a4 4 0 0 0 0-8z" fill="#0E1C91"></path><path d="M14 11v18" stroke="#FFB200" stroke-width="2" stroke-dasharray="2.500 2.500" stroke-linecap="round"></path><rect x="18" y="14" width="11" height="3.500" rx="1.750" fill="#FFFFFF"></rect><rect x="18" y="20.500" width="7" height="3.500" rx="1.750" fill="rgba(255,255,255,0.45)"></rect></g></svg>';

/** Index 0 is road-sign group 1. */
export const ROAD_SIGN_GROUP_ICONS = [
  '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 7 34 31H6z" fill="#FFFFFF" stroke="#0E1C91" stroke-width="3" stroke-linejoin="round"></path><path d="M16 26c0-4 8-3 8-8" stroke="#0E1C91" stroke-width="2.600" stroke-linecap="round"></path></svg>',
  '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="9" y="9" width="22" height="22" rx="3" transform="rotate(45 20 20)" fill="#FFFFFF" stroke="#0E1C91" stroke-width="3"></rect><rect x="15" y="15" width="10" height="10" rx="1.500" transform="rotate(45 20 20)" fill="#0E1C91"></rect></svg>',
  '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="13" fill="#FFFFFF" stroke="#0E1C91" stroke-width="3.400"></circle><path d="M11.500 28.500 28.500 11.500" stroke="#0E1C91" stroke-width="3" stroke-linecap="round"></path></svg>',
  '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" fill="#0E1C91"></circle><path d="M20 28V13M14 18.500l6-6 6 6" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="6" width="28" height="28" rx="7" fill="#0E1C91"></rect><path d="M20 28V12M14 17l6-6 6 6" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 28h18" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-dasharray="3 3"></path></svg>',
  '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="6" width="28" height="28" rx="7" fill="#0E1C91"></rect><rect x="11" y="11" width="18" height="18" rx="4" fill="#FFFFFF"></rect><path d="M20 15v10M15 20h10" stroke="#0E1C91" stroke-width="3" stroke-linecap="round"></path></svg>',
  '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="6" width="28" height="28" rx="7" fill="#0E1C91"></rect><circle cx="20" cy="13.500" r="2.200" fill="#FFFFFF"></circle><path d="M20 19v9" stroke="#FFFFFF" stroke-width="3.400" stroke-linecap="round"></path></svg>',
  '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="5" y="11" width="30" height="18" rx="4" fill="#FFFFFF" stroke="#0E1C91" stroke-width="2.800"></rect><path d="M11 17.500h18M11 23h11" stroke="#0E1C91" stroke-width="2.600" stroke-linecap="round"></path></svg>',
];

/** The small arrow after the chip's subtitle; takes the subtitle color. */
export const chipArrow = (color: string) =>
  `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.800" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>`;
