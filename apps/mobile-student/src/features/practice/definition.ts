/**
 * Declarative definition of the quick test (principle 12): rules live here, not in the engine or the screens.
 * Values come from the functions map (STU-13: 30 questions, 5 mistakes, 30 minutes) and the design's
 * "5 passes in a row" goal. The server owns the real definition; a test record stores the version it ran under.
 */
export const quickTestDefinition = {
  version: 1,
  questionCount: 30,
  maxMistakes: 5,
  passesInRowGoal: 5,
  timeLimitMinutes: 30,
} as const;

export const passingScore = quickTestDefinition.questionCount - quickTestDefinition.maxMistakes;
