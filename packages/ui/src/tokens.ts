/** Design tokens shared by web and mobile (packages/ui). Values mirror tokens.css. */
export const color = {
  primary: "#2A2AB0",
  primaryContrast: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceMuted: "#F3F4F8",
  text: "#14142B",
  textMuted: "#5B5B76",
  border: "#D9DBE6",
  success: "#0F766E",
  danger: "#B42318",
} as const;

export const font = {
  family: "'Noto Sans Georgian', system-ui, sans-serif",
} as const;

export const radius = { sm: 6, md: 10, lg: 16 } as const;
export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 } as const;
