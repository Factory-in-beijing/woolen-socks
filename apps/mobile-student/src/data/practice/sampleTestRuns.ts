/** SAMPLE results of the last quick tests (newest first), copied from the design. Real history comes from the API. */
export type TestRun = { score: number; when: string; time: string };

export const sampleTestRuns: TestRun[] = [
  { score: 28, when: "Today", time: "18:42" },
  { score: 27, when: "Yesterday", time: "24:10" },
  { score: 26, when: "12 Nov", time: "16:05" },
  { score: 24, when: "10 Nov", time: "21:37" },
  { score: 29, when: "8 Nov", time: "27:50" },
];
