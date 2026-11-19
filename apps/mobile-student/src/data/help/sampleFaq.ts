/**
 * SAMPLE help articles copied from the design. The answers quote course terms (price, access period, refund rules)
 * that are not final; the real FAQ comes from the content database and the real terms from the server.
 */
export type FaqTopic = "Course" | "Payments" | "Tickets" | "Account";
export type FaqEntry = { topic: FaqTopic; question: string; answer: string };

export const faqTopics = ["All", "Course", "Payments", "Tickets", "Account"] as const;

export const sampleFaq: FaqEntry[] = [
  {
    topic: "Course",
    question: "How long do I have access to the course?",
    answer:
      "Two months from the day you buy it. Your progress stays saved after that, and you can renew any time.",
  },
  {
    topic: "Course",
    question: "Which languages is the course in?",
    answer:
      "Video lessons are in Georgian. Tickets and practice tests come in six languages: Georgian, English, Russian, Azerbaijani, Armenian and Turkish.",
  },
  {
    topic: "Course",
    question: "Can I watch on my computer?",
    answer:
      "Yes. Log in on the DriveNet website with the same phone number and password, and continue where you stopped.",
  },
  {
    topic: "Payments",
    question: "How much does the course cost?",
    answer: "₾79, paid once. There is no subscription.",
  },
  {
    topic: "Payments",
    question: "My payment didn't go through",
    answer:
      "Check the card balance and the SMS code from your bank, then try again. If it still fails, write to us and we will sort it out.",
  },
  {
    topic: "Payments",
    question: "Can I get a refund?",
    answer:
      "Yes, within 14 days of payment: in full if you watched 3 lessons or fewer, otherwise for the lessons you have not watched. Write to us in the chat.",
  },
  {
    topic: "Payments",
    question: "Is my card safe?",
    answer:
      "Payments go through Bank of Georgia and your bank confirms them with an SMS code. DriveNet never sees or stores the full card number.",
  },
  {
    topic: "Tickets",
    question: "How do I change the ticket language?",
    answer:
      "Go to Account › Ticket language and pick one of the six languages. Your progress is kept.",
  },
  {
    topic: "Tickets",
    question: "What are Mistakes and Saved?",
    answer:
      "Mistakes collects tickets and signs you answered wrong. Saved keeps the ones you bookmark. Both open from Tickets and Road signs.",
  },
  {
    topic: "Account",
    question: "How do I change my phone number?",
    answer: "Account › Edit profile › Change, then confirm the new number with the SMS code.",
  },
  {
    topic: "Account",
    question: "I forgot my password",
    answer:
      "On the Log in screen tap Forgot password?, confirm your number with the SMS code and set a new one. To change it while logged in: Account › Edit profile › Password.",
  },
  {
    topic: "Account",
    question: "How do I delete my account?",
    answer:
      "Account › Edit profile › Delete account. This removes your progress and course access and cannot be undone.",
  },
];
