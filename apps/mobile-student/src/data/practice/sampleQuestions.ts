/** SAMPLE exam questions copied from the design. Real tickets come from the database through the API. */
export type TicketScene = "cross" | "left" | "sign";

export type SampleTicket = {
  num: string;
  topic: string;
  /** 1-based topic number (selects the topic icon). */
  topicNumber: number;
  scene: TicketScene;
  imageBackground: string;
  question: string;
  answers: [string, string, string];
  /** Index of the correct answer. */
  right: number;
  /** Explanation in three parts: plain, emphasised, plain. */
  why: [string, string, string];
};

export const sampleTickets: SampleTicket[] = [
  {
    num: "#594",
    topic: "Driving Through Intersections",
    topicNumber: 20,
    scene: "cross",
    imageBackground: "#8FBF6A",
    question:
      "You reach a crossroads of two equal roads with no signs or traffic lights. Who must give way?",
    answers: [
      "The grey car gives way to you",
      "You give way to the grey car on your right",
      "Whoever enters the crossroads first goes first",
    ],
    right: 1,
    why: [
      "On equal roads the ",
      "right-hand rule",
      " applies: give way to any vehicle coming from your right. The grey car is on your right, so it goes first.",
    ],
  },
  {
    num: "#61",
    topic: "Warning Signs",
    topicNumber: 3,
    scene: "sign",
    imageBackground: "#EEF1FF",
    question: "What does this sign warn you about?",
    answers: [
      "A slippery road section",
      "An uneven road with waves and potholes",
      "Gravel that can fly out from under wheels",
    ],
    right: 0,
    why: [
      "Sign 1.16 marks a section where ",
      "grip is reduced",
      ". Slow down before it and avoid sharp braking or steering.",
    ],
  },
  {
    num: "#601",
    topic: "Driving Through Intersections",
    topicNumber: 20,
    scene: "left",
    imageBackground: "#8FBF6A",
    question:
      "The light is green and you are turning left. A grey car comes straight towards you. Who goes first?",
    answers: [
      "You do, because you entered the crossroads first",
      "The grey car going straight",
      "Whoever flashes the headlights first",
    ],
    right: 1,
    why: [
      "When you turn left on green, ",
      "give way to oncoming traffic",
      " going straight or turning right. Wait in the crossroads, then turn.",
    ],
  },
];

/** SAMPLE practice session: 77 questions, the student is on question 8 with 1–7 already answered (question 6 wrong). */
export const sampleSession = {
  total: 77,
  first: 8,
  label: "Practice · 2 topics",
  wrongPosition: 6,
};
