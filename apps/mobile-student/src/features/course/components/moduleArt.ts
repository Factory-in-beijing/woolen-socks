// Illustrations of the nine course modules (index 0 is module 1).
export const MODULE_ICONS = [
  '<svg width="38" height="38" viewBox="0 0 40 40"><rect x="18.500" y="7" width="3" height="25" rx="1.500" fill="#0E1C91"></rect><rect x="11" y="32" width="18" height="4" rx="2" fill="#0E1C91"></rect><rect x="6" y="10" width="28" height="3" rx="1.500" fill="#0E1C91"></rect><path d="M7.500 12 3.500 21M7.500 12l4 9M32.500 12l-4 9M32.500 12l4 9" stroke="#3A4BD6" stroke-width="1.600" stroke-linecap="round"></path><path d="M2.500 21a5 5 0 0 0 10 0z" fill="#FFB200"></path><path d="M27.500 21a5 5 0 0 0 10 0z" fill="#FFB200"></path><circle cx="20" cy="7.500" r="3" fill="#FFB200"></circle></svg>',
  '<svg width="38" height="38" viewBox="0 0 40 40"><path d="M20 3.500 36.500 20 20 36.500 3.500 20z" fill="#FFFFFF" stroke="#DCE2FB" stroke-width="2" stroke-linejoin="round"></path><path d="M20 11 29 20 20 29 11 20z" fill="#FFB200"></path></svg>',
  '<svg width="38" height="38" viewBox="0 0 40 40"><rect x="12" y="2.500" width="16" height="35" rx="6" fill="#0E1C91"></rect><circle cx="20" cy="10" r="4" fill="#3A4BD6"></circle><circle cx="20" cy="20" r="4" fill="#FFB200"></circle><circle cx="20" cy="30" r="4" fill="#3A4BD6"></circle></svg>',
  '<svg width="38" height="38" viewBox="0 0 40 40"><g transform="rotate(35 20 20)"><rect x="16.500" y="3" width="7" height="34" rx="3.500" fill="#FFFFFF" stroke="#DCE2FB" stroke-width="1.600"></rect><rect x="16.500" y="11" width="7" height="4.500" fill="#0E1C91"></rect><rect x="16.500" y="20" width="7" height="4.500" fill="#0E1C91"></rect><rect x="16.500" y="29" width="7" height="4.500" fill="#0E1C91"></rect><circle cx="20" cy="5" r="3.500" fill="#FFB200"></circle></g></svg>',
  '<svg width="38" height="38" viewBox="0 0 40 40"><path d="M20 9h-2a11 11 0 0 0 0 22h2z" fill="#0E1C91"></path><rect x="19" y="9" width="4" height="22" rx="2" fill="#3A4BD6"></rect><rect x="25" y="10" width="12" height="3.400" rx="1.700" fill="#FFB200"></rect><rect x="25" y="18.300" width="12" height="3.400" rx="1.700" fill="#FFB200"></rect><rect x="25" y="26.600" width="12" height="3.400" rx="1.700" fill="#FFB200"></rect></svg>',
  '<svg width="38" height="38" viewBox="0 0 40 40"><path d="M11 35V22a9 9 0 0 1 9-9h6" fill="none" stroke="#0E1C91" stroke-width="5.500" stroke-linecap="round"></path><path d="M25 4.500 36 13l-11 8.500z" fill="#FFB200"></path></svg>',
  '<svg width="38" height="38" viewBox="0 0 40 40"><path d="M3 29a17 17 0 0 1 34 0z" fill="#FFFFFF" stroke="#DCE2FB" stroke-width="2" stroke-linejoin="round"></path><path d="M8 29a12 12 0 0 1 3.500-8.500" stroke="#3A4BD6" stroke-width="3" stroke-linecap="round" fill="none"></path><path d="M20 29 29 17" stroke="#0E1C91" stroke-width="3.600" stroke-linecap="round"></path><circle cx="20" cy="29" r="4" fill="#FFB200"></circle></svg>',
  '<svg width="38" height="38" viewBox="0 0 40 40"><path d="M20 3 6 8.500v10c0 9 6 15 14 18.500 8-3.500 14-9.500 14-18.500v-10z" fill="#0E1C91"></path><path d="M20 3v34c8-3.500 14-9.500 14-18.500v-10z" fill="#3A4BD6"></path><path d="m13.500 20 4.500 4.500 8.500-9" fill="none" stroke="#FFB200" stroke-width="3.600" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  '<svg width="38" height="38" viewBox="0 0 40 40"><path d="M15 11V8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3" fill="none" stroke="#3A4BD6" stroke-width="3"></path><rect x="4" y="10" width="32" height="25" rx="6" fill="#0E1C91"></rect><rect x="17.500" y="15" width="5" height="15" rx="1.500" fill="#FFB200"></rect><rect x="12.500" y="20" width="15" height="5" rx="1.500" fill="#FFB200"></rect></svg>',
];

export const CHECK_BADGE =
  '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';
export const checkWhite =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';

export const chevronDown = (color: string) =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>`;

export const playTriangle = (color: string) =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="${color}"><path d="M8 5.500v13l11-6.500z"></path></svg>`;
