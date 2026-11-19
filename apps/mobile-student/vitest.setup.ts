import { vi } from "vitest";

// Hooks read font names for styles only; the real module loads font files that Node cannot import.
vi.mock("@/theme/fonts", () => {
  const family = new Proxy({}, { get: (_target, weight) => `font-${String(weight)}` });
  return { font: { manrope: family, spaceGrotesk: family }, fontAssets: {} };
});
