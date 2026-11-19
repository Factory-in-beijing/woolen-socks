import type { Tetri } from "@/lib/money";

/** The course offer shown on the Get the course screen. SAMPLE value: the real price comes from the server. */
export type CourseOffer = { price: Tetri };

export const sampleCourseOffer: CourseOffer = { price: 7900 };

/** Single read point for the offer; the backend call replaces the fixture here. */
export function useCourseOffer(): CourseOffer {
  return sampleCourseOffer;
}
