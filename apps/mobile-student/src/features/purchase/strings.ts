/** English UI texts of the purchase feature. Moves into packages/i18n (with `ka`) when the shared architecture lands. */
export const strings = {
  payFailed: {
    paymentDidntGoThrough: "Payment didn't go through",
    commonReasons: "Common reasons",
    notEnoughMoneyOn: "Not enough money on the card",
    theSmsCodeExpired: "The SMS code expired or was wrong",
    theConnectionDropped: "The connection dropped",
    tryAgain: "Try again",
    otherPayment: "Other payment",
    getHelp: "Get help",
  },
  paySuccess: {
    youreIn: "You're in!",
    theFullVideoCourse: "The full video course is unlocked.",
    yourFirstLessonIs: "Your first lesson is ready.",
    course: "Course",
    videoCourseBB1: "Video course · B, B1",
    paidWith: "Paid with",
    applePay: "Apple Pay",
    date: "Date",
    n15Nov2026: "15 Nov 2026",
    totalPaid: "Total paid",
    n79: "₾79",
    receiptSentBySms: "Receipt sent by SMS",
    startTheCourse: "Start the course",
    backToHome: "Back to Home",
  },
} as const;
