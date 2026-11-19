// Icons of the reminder controls.
/** Morning, midday, evening and night icons of the time presets; take the stroke color. */
export const presetIcons = [
  (color: string) =>
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v7M4.900 10.900l1.400 1.400M2 18h2M20 18h2M17.700 12.300l1.400-1.400M22 22H2M8 6l4-4 4 4M16 18a4 4 0 0 0-8 0"></path></svg>`,
  (color: string) =>
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.900 4.900l1.400 1.400M17.700 17.700l1.400 1.400M2 12h2M20 12h2M6.300 17.700l-1.400 1.400M19.100 4.900l-1.400 1.400"></path></svg>`,
  (color: string) =>
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10V2M4.900 10.900l1.400 1.400M2 18h2M20 18h2M17.700 12.300l1.400-1.400M22 22H2M16 6l-4 4-4-4M16 18a4 4 0 0 0-8 0"></path></svg>`,
  (color: string) =>
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"></path></svg>`,
];

/** Next lesson, tickets and what's-new tile icons. */
export const topicIcons = {
  lesson:
    '<svg width="30" height="30" viewBox="0 0 40 40"><rect x="4" y="9" width="32" height="22" rx="5" fill="#FFFFFF" stroke="#DCE2FB" stroke-width="2"></rect><rect x="8" y="26" width="24" height="2" rx="1" fill="#DCE2FB"></rect><rect x="8" y="26" width="9" height="2" rx="1" fill="#0E1C91"></rect><circle cx="20" cy="18" r="6.500" fill="#FFB200"></circle><path d="M18.300 15.200v5.600l4.600-2.800z" fill="#0E1C91"></path></svg>',
  tickets:
    '<svg width="30" height="30" viewBox="0 0 40 40"><rect x="7" y="9" width="19" height="26" rx="4" fill="#FFB200" transform="rotate(-16 16 22)"></rect><rect x="13" y="6" width="19" height="27" rx="4" fill="#0E1C91"></rect><rect x="16.500" y="11" width="12" height="3" rx="1.500" fill="#3A4BD6"></rect><rect x="16.500" y="17" width="12" height="3.500" rx="1.750" fill="#FFB200"></rect><rect x="16.500" y="24" width="8" height="3" rx="1.500" fill="#3A4BD6"></rect></svg>',
  news: '<svg width="30" height="30" viewBox="0 0 40 40"><path d="M17 4c1 7 4 10 11 11-7 1-10 4-11 11-1-7-4-10-11-11 7-1 10-4 11-11z" fill="#FFB200"></path><path d="M30 22c.6 4 2.400 5.800 6.500 6.500-4.100.6-5.900 2.400-6.500 6.500-.6-4.100-2.400-5.900-6.500-6.500 4.100-.7 5.900-2.500 6.500-6.500z" fill="#0E1C91"></path></svg>',
} as const;

export const topicCheck =
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0E1C91" stroke-width="3.600" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';
