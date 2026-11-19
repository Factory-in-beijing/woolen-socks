/** Native size of assets/images/logo-white.png. */
const LOGO_WIDTH = 368;
const LOGO_HEIGHT = 97;

/** Explicit logo size for a given width or height (the Image component does not infer it from the aspect ratio on web). */
export const logoSize = {
  atWidth: (width: number) => ({ width, height: (width * LOGO_HEIGHT) / LOGO_WIDTH }),
  atHeight: (height: number) => ({ width: (height * LOGO_WIDTH) / LOGO_HEIGHT, height }),
};
