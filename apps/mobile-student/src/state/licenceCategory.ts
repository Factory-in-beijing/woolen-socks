import { createSharedValue } from "./createSharedValue";

/** Index into the licence categories of the student's chosen category (2 = "B, B1" in the sample list). */
const licenceCategory = createSharedValue(2);

export const setLicenceCategory = licenceCategory.set;
export const useLicenceCategory = licenceCategory.use;
