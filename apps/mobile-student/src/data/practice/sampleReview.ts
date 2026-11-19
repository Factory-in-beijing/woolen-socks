/** SAMPLE entries of the Mistakes and Saved lists copied from the design. Real lists come from the student's history through the API, paginated. */
export type ReviewKind = "sign" | "road" | "speed" | "light" | "img";

export type ReviewItem = {
  type: "t" | "s"; // ticket or road sign
  head: string;
  topic: string;
  question: string;
  kind: ReviewKind;
  /** How many times the student got it wrong (0 for saved items). */
  wrong: number;
  /** SVG markup of the sign picture (only for kind "img"). */
  svg: string;
};

export type ReviewSample = {
  items: ReviewItem[];
  totals: { all: number; t: number; s: number };
  topics: { t: Record<string, number>; s: Record<string, number> };
};

export const sampleMistakes: ReviewSample = {
  items: [
    {
      type: "t",
      head: "#214",
      topic: "Intersections",
      question: "Who goes first at an intersection without signs or lights?",
      kind: "road",
      wrong: 2,
      svg: "",
    },
    {
      type: "t",
      head: "#87",
      topic: "Signs",
      question: "What does this sign mean?",
      kind: "sign",
      wrong: 3,
      svg: "",
    },
    {
      type: "t",
      head: "#402",
      topic: "Speed",
      question: "What is the speed limit in a residential zone?",
      kind: "speed",
      wrong: 1,
      svg: "",
    },
    {
      type: "t",
      head: "#318",
      topic: "Intersections",
      question: "What does a flashing yellow traffic light mean?",
      kind: "light",
      wrong: 2,
      svg: "",
    },
    {
      type: "t",
      head: "#155",
      topic: "Other",
      question: "When may you overtake a vehicle on the right?",
      kind: "road",
      wrong: 1,
      svg: "",
    },
    {
      type: "s",
      head: "3.27",
      topic: "Prohibitory",
      question: "No stopping",
      kind: "img",
      wrong: 3,
      svg: "<svg viewBox='-3.4 -40.1 615.5 637.6' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1'><defs/><g transform='translate(0,-452.3)'><path style='opacity:1;color:#000000;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1px;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' d='m -65.6,432.2 c 0,16.2 -9.8,29.4 -22.1,29.4 -12.2,0 -22.1,-13.1 -22.1,-29.4 0,-16.2 9.8,-29.4 22.1,-29.4 12.2,0 22.1,13.1 22.1,29.4 z' transform='matrix(13.5,0,0,10.1,1490.3,-3648.6)'/><path transform='matrix(13.5,0,0,10.1,1486.4,-3633.9)' d='m -65.6,432.2 c 0,16.2 -9.8,29.4 -22.1,29.4 -12.2,0 -22.1,-13.1 -22.1,-29.4 0,-16.2 9.8,-29.4 22.1,-29.4 12.2,0 22.1,13.1 22.1,29.4 z' style='color:#000000;fill:none;stroke:#000000;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;opacity:1'/><path style='opacity:1;color:#000000;fill:#ff0000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1px;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' d='M 300 10 C 139.8 10 10 139.8 10 300 C 10 460.1 139.8 590 300 590 C 460.1 590 590 460.1 590 300 C 590 139.8 460.1 10 300 10 z M 300 59.0 C 359.5 59.0 414.0 80.6 456.1 116.4 L 300 272.6 L 143.8 116.4 C 185.9 80.6 240.4 59.0 300 59.0 z M 116.4 143.8 L 272.6 300 L 116.4 456.1 C 80.6 414.0 59.0 359.5 59.0 300 C 59.0 240.4 80.6 185.9 116.4 143.8 z M 483.5 143.8 C 519.3 185.9 540.9 240.4 540.9 300 C 540.9 359.5 519.3 414.0 483.5 456.1 L 327.3 300 L 483.5 143.8 z M 300 327.3 L 456.1 483.5 C 414.0 519.3 359.5 540.9 300 540.9 C 240.4 540.9 185.9 519.3 143.8 483.5 L 300 327.3 z ' transform='translate(0,452.3)'/><path style='opacity:1;color:#000000;fill:#0d69e1;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1px;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' d='M 300 67.7 C 245.9 67.7 196.2 86.1 156.8 117.1 L 300 260.3 L 443.1 117.1 C 403.7 86.1 354.0 67.7 300 67.7 z M 117.1 156.8 C 86.1 196.2 67.7 245.9 67.7 300 C 67.7 354.0 86.1 403.7 117.1 443.1 L 260.3 300 L 117.1 156.8 z M 482.8 156.8 L 339.6 300 L 482.8 443.1 C 513.8 403.7 532.2 354.0 532.2 300 C 532.2 245.9 513.8 196.2 482.8 156.8 z M 300 339.6 L 156.8 482.8 C 196.2 513.8 245.9 532.2 300 532.2 C 354.0 532.2 403.7 513.8 443.1 482.8 L 300 339.6 z ' transform='translate(0,452.3)'/></g></svg>",
    },
    {
      type: "s",
      head: "2.3",
      topic: "Priority",
      question: "Give way",
      kind: "img",
      wrong: 2,
      svg: "<svg viewBox='-7.6 -7.5 649.2 576.3' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1'><defs/><g transform='translate(0,-491.1)'><path d='m 339.5,1046.3 c -21.5,12.4 -49.0,5.0 -61.4,-16.4 L 6.0,558.6 c -12.4,-21.5 -5.0,-49.0 16.4,-61.4 6.8,-3.9 14.6,-6.0 22.5,-6.0 l 544.1,10e-5 c 7.8,0 15.6,2.0 22.5,6.0 21.5,12.4 28.8,39.9 16.4,61.4 L 356.0,1029.8 c -3.9,6.8 -9.6,12.5 -16.4,16.4 z' style='opacity:1;color:#000000;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1px;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate'/><path style='fill:#ff0000;fill-opacity:1;stroke:none;opacity:1' d='m 316.3,1042.3 c -11.8,-0.2 -23.2,-6.5 -29.5,-17.5 L 14.7,553.6 c -9.6,-16.7 -3.9,-38.1 12.8,-47.8 5.3,-3.0 11.3,-4.6 17.5,-4.6 l 544.0,0 c 6.1,0 12.1,1.6 17.5,4.6 16.7,9.6 22.4,31.0 12.8,47.8 l -272.0,471.2 c -3.0,5.3 -7.4,9.7 -12.8,12.8 -5.7,3.3 -12.0,4.8 -18.2,4.6 z m 0.0,-60.2 c 1.9,0.1 3.9,-0.2 5.7,-1.3 1.5,-0.8 2.7,-2.1 3.6,-3.6 l 241.5,-418.3 c 2.7,-4.7 1.1,-10.8 -3.6,-13.6 -1.5,-0.8 -3.2,-1.3 -5,-1.3 l -483.0,0 c -5.5,0 -10,4.4 -10,10 0,1.7 0.4,3.4 1.3,4.9 l 241.5,418.3 c 1.7,2.9 4.7,4.7 7.9,5 z'/><path d='m 1.0,536.1 c 5e-5,7.7 2.0,15.3 5.8,22 L 278.9,1029.3 c 12.1,21.0 39.0,28.2 60.1,16.1 6.6,-3.8 12.2,-9.4 16.1,-16.1 L 627.2,558.1 c 3.8,-6.6 5.8,-14.2 5.8,-22 -7e-5,-24.3 -19.6,-43.9 -44.0,-44 l -544.1,0 c -24.3,10e-5 -44.0,19.6 -44.0,44 z' style='opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-opacity:1;stroke-width:2;stroke-miterlimit:4;stroke-dasharray:none'/></g></svg>",
    },
    {
      type: "s",
      head: "1.24",
      topic: "Warning",
      question: "Children",
      kind: "img",
      wrong: 2,
      svg: "<svg viewBox='-7.6 -7.6 649.2 576.3' xmlns='http://www.w3.org/2000/svg' id='svg2' version='1.1' ><defs id='defs4' /><g id='layer1' transform='translate(0,-491.1)'><path d='m 339.5,497.1 c -21.5,-12.4 -49.0,-5.0 -61.4,16.4 L 6.0,984.8 c -12.4,21.5 -5.0,49.0 16.4,61.4 6.8,3.9 14.6,6.0 22.5,6.0 l 544.1,-10e-5 c 7.8,0 15.6,-2.0 22.5,-6.0 21.5,-12.4 28.8,-39.9 16.4,-61.4 L 356.0,513.6 c -3.9,-6.8 -9.6,-12.5 -16.4,-16.4 z' style='fill:#ffffff;fill-rule:nonzero;stroke:none;stroke-width:1px' id='path6499' /><path id='path6501' style='fill:#000000;stroke:none;stroke-width:4.2' d='m 266.7,805.3 33.8,-58.5 0,0 c 3.1,-5.4 1.2,-12.4 -4.1,-15.5 -5.4,-3.1 -12.4,-1.2 -15.5,4.1 l -49.5,85.7 c -1.8,3.2 -1.8,7.2 0,10.5 l 17.9,31.0 -15.3,8.8 c -1.5,0.9 -2.9,2.2 -3.8,3.8 l -39.7,68.8 c -3.6,6.2 -1.4,14.3 4.8,17.9 6.2,3.6 14.3,1.4 17.9,-4.8 l 35.9,-62.1 38.6,-22.2 0,0 c 5.0,-2.9 6.7,-9.3 3.8,-14.3 l -24.6,-42.7 c -1.8,-3.2 -1.8,-7.2 0,-10.5 z' /><path id='path6503' d='m 290.1,880.6 -22.7,13.1 22.3,38.7 c 1.8,3.2 5.3,5.2 9.1,5.2 l 23.5,0 0,-26.3 -14.4,0 z' style='fill:#000000;fill-rule:nonzero;stroke:none;stroke-width:1px' /><path id='path6505' style='fill:#000000;fill-rule:nonzero;stroke:none;stroke-width:1px' d='m 206.4,871.4 c -5.0,2.9 -11.4,1.1 -14.3,-3.8 l -19.4,-33.7 c -3.1,-5.4 -1.2,-12.4 4.1,-15.5 5.4,-3.1 12.4,-1.2 15.5,4.1 l 13.3,23.0 19.1,-11.0 11.3,19.7 z' /><path style='fill:#000000;stroke:none' d='m 201.6,782.0 c 0,13.7 11.4,24.2 22.3,24.2 16.8,0 23.5,-29.7 23.5,-35.5 0,-11.0 -5.5,-19.9 -17.1,-19.9 -11.9,0 -28.7,15.8 -28.7,31.3 z' id='path6507' /><path id='path6509' style='fill:#000000;fill-rule:nonzero;stroke:none;stroke-width:1px' d='m 338.0,837.2 c -2.4,4.1 -7.7,5.6 -11.9,3.2 l -43.1,-24.8 c -6.2,-3.6 -8.4,-11.6 -4.8,-17.9 3.6,-6.2 11.6,-8.4 17.9,-4.8 l 0,0 29.5,17.0 19.0,-32.9 14.1,24.5 z' /><path id='path6511' d='m 426.2,846.7 -24.3,14.0 27.8,48.2 c 2.4,4.1 7.7,5.6 11.9,3.2 l 56.6,-32.6 -14.0,-24.3 -39.9,23.0 z' style='fill:#000000;fill-rule:nonzero;stroke:none;stroke-width:3.5' /><path id='path6513' d='m 369.3,740.0 c -3.4,0.2 -6.6,2.2 -8.4,5.2 l -9.6,16.6 c -1.8,3.2 -1.8,7.2 0,10.5 l 32.5,56.2 -49.0,28.3 c -3.2,1.8 -5.2,5.3 -5.2,9.1 l 0,83.3 c 0,7.7 6.2,14.0 14.0,14.0 7.7,0 14.0,-6.2 14.0,-14.0 l 0,-73.2 61.6,-35.5 c 8.3,-4.8 11.2,-15.5 6.4,-23.9 l -30.2,-52.2 36.7,0 -14.1,-24.5 -47.8,0 c -0.2,0 -0.4,-0.0 -0.7,0 z' style='fill:#000000;stroke:none;stroke-width:1.3' /><path style='fill:#000000;stroke:none' d='m 316.7,724.2 c 0,18.1 16.7,27.7 25.0,27.7 12.7,0 27.0,-26.8 27.0,-41.7 -0.3,-12.3 -7.4,-20.6 -18.3,-20.6 -14.8,0 -33.8,16.4 -33.8,34.6 z' id='path6515' /><path id='path5791' style='fill:none;stroke:#000000;stroke-width:2' d='m 1.0,1007.3 c 5.7e-5,-7.7 2.0,-15.3 5.8,-21.9 L 278.9,514.1 c 12.1,-21.0 39.0,-28.2 60.1,-16.1 6.6,3.8 12.2,9.4 16.1,16.1 l 272.0,471.2 c 3.8,6.6 5.8,14.2 5.8,21.9 -7e-5,24.3 -19.6,43.9 -44.0,44 l -544.1,0 c -24.3,-10e-5 -44.0,-19.6 -44.0,-44 z' /><path style='fill:#ff0000;stroke:none' d='M 316.3 10 C 304.4 10.2 293.0 16.5 286.7 27.5 L 14.6 498.7 C 5.0 515.4 10.7 536.8 27.5 546.5 C 32.8 549.6 38.8 551.2 45 551.2 L 589.1 551.2 C 595.2 551.2 601.3 549.6 606.6 546.5 C 623.3 536.8 629.1 515.4 619.4 498.7 L 347.3 27.5 C 344.3 22.1 339.8 17.7 334.5 14.6 C 328.8 11.3 322.5 9.8 316.3 10 z M 316.3 70.2 C 318.2 70.1 320.2 70.5 322.0 71.5 C 323.5 72.4 324.8 73.7 325.7 75.2 L 567.2 493.6 C 570.0 498.4 568.4 504.5 563.6 507.2 C 562.1 508.1 560.3 508.6 558.6 508.6 L 75.5 508.6 C 70.0 508.6 65.5 504.1 65.5 498.6 C 65.5 496.8 65.9 495.1 66.8 493.6 L 308.4 75.2 C 310.1 72.2 313.1 70.4 316.3 70.2 z ' transform='translate(0,491.1)' id='path4410' /></g></svg>",
    },
    {
      type: "s",
      head: "3.20",
      topic: "Prohibitory",
      question: "No overtaking",
      kind: "img",
      wrong: 1,
      svg: "<svg viewBox='-3.4 -40.1 615.5 637.6' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1'><defs/><g transform='translate(0,-452.3)'><path style='opacity:1;color:#000000;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1px;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' d='m -65.6,432.2 c 0,16.2 -9.8,29.4 -22.1,29.4 -12.2,0 -22.1,-13.1 -22.1,-29.4 0,-16.2 9.8,-29.4 22.1,-29.4 12.2,0 22.1,13.1 22.1,29.4 z' transform='matrix(13.5,0,0,10.1,1490.3,-3648.6)'/><path transform='matrix(13.5,0,0,10.1,1486.4,-3633.9)' d='m -65.6,432.2 c 0,16.2 -9.8,29.4 -22.1,29.4 -12.2,0 -22.1,-13.1 -22.1,-29.4 0,-16.2 9.8,-29.4 22.1,-29.4 12.2,0 22.1,13.1 22.1,29.4 z' style='color:#000000;fill:none;stroke:#000000;stroke-width:0.1;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate;opacity:1'/><path style='opacity:1;color:#000000;fill:#ff0000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1px;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' d='M 300 10 C 139.8 10 10 139.8 10 300 C 10 460.1 139.8 590 300 590 C 460.1 590 590 460.1 590 300 C 590 139.8 460.1 10 300 10 z M 300 59.0 C 433.0 59.0 540.9 166.9 540.9 300 C 540.9 433.0 433.0 540.9 300 540.9 C 166.9 540.9 59.0 433.0 59.0 300 C 59.0 166.9 166.9 59.0 300 59.0 z ' transform='translate(0,452.3)'/><path style='opacity:1;color:#000000;fill:#ff0000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:3.5;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' d='m 131.8,683.7 c -4.1,0 -8.5,3.1 -9.9,7.0 l -5.0,14.5 -10.4,30.1 c -0.0,0.0 -0.0,0.0 -0.0,0.0 l -2.4,7.0 c -5.9,0 -10.7,4.7 -10.7,10.7 l 0,42.8 c 0,5.9 4.7,10.7 10.7,10.7 l 160.5,0 c 5.9,0 10.7,-4.7 10.7,-10.7 l 0,-42.8 c 0,-5.9 -4.7,-10.7 -10.7,-10.7 l -2.4,-7.0 c -0.0,-0.0 -0.0,-0.0 -0.0,-0.0 l -10.4,-30.1 -5.0,-14.5 c -1.3,-3.9 -5.7,-7.0 -9.9,-7.0 l -52.4,0 -52.4,0 z m 3.2,10.7 49.2,0 49.2,0 c 2.0,0 4.2,1.5 4.9,3.5 l 15.3,44.6 -69.5,0 -69.5,0 15.3,-44.6 c 0.6,-1.9 2.8,-3.5 4.9,-3.5 z'/><path style='opacity:1;color:#000000;fill:#ff0000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1px;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' d='m 104.0,812.1 0,21.4 c 0,8.8 7.1,16.0 16.0,16.0 8.8,0 16.0,-7.1 16.0,-16.0 l 0,-21.4 -32.1,0 z'/><path d='m 232.5,812.1 0,21.4 c 0,8.8 7.1,16.0 16.0,16.0 8.8,0 16.0,-7.1 16.0,-16.0 l 0,-21.4 -32.1,0 z' style='opacity:1;color:#000000;fill:#ff0000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1px;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate'/><path d='m 363.1,683.7 c -4.1,0 -8.5,3.1 -9.9,7.0 l -5.0,14.5 -10.4,30.1 c -0.0,0.0 -0.0,0.0 -0.0,0.0 l -2.4,7.0 c -5.9,0 -10.7,4.7 -10.7,10.7 l 0,42.8 c 0,5.9 4.7,10.7 10.7,10.7 l 160.5,0 c 5.9,0 10.7,-4.7 10.7,-10.7 l 0,-42.8 c 0,-5.9 -4.7,-10.7 -10.7,-10.7 l -2.4,-7.0 c -0.0,-0.0 -0.0,-0.0 -0.0,-0.0 l -10.4,-30.1 -5.0,-14.5 c -1.3,-3.9 -5.7,-7.0 -9.9,-7.0 l -52.4,0 -52.4,0 z m 3.2,10.7 49.2,0 49.2,0 c 2.0,0 4.2,1.5 4.9,3.5 l 15.3,44.6 -69.5,0 -69.5,0 15.3,-44.6 c 0.6,-1.9 2.8,-3.5 4.9,-3.5 z' style='opacity:1;color:#000000;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:3.5;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate'/><path d='m 335.3,812.1 0,21.4 c 0,8.8 7.1,16.0 16.0,16.0 8.8,0 16.0,-7.1 16.0,-16.0 l 0,-21.4 -32.1,0 z' style='opacity:1;color:#000000;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1px;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate'/><path style='opacity:1;color:#000000;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1px;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' d='m 463.8,812.1 0,21.4 c 0,8.8 7.1,16.0 16.0,16.0 8.8,0 16.0,-7.1 16.0,-16.0 l 0,-21.4 -32.1,0 z'/></g></svg>",
    },
  ],
  totals: { all: 60, t: 48, s: 12 },
  topics: {
    t: { All: 48, Signs: 17, Intersections: 14, Speed: 9, Other: 8 },
    s: { All: 12, Warning: 4, Priority: 3, Prohibitory: 5 },
  },
};

export const sampleSaved: ReviewSample = {
  items: [
    {
      type: "t",
      head: "#87",
      topic: "Signs",
      question: "What does this sign mean?",
      kind: "sign",
      wrong: 0,
      svg: "",
    },
    {
      type: "t",
      head: "#533",
      topic: "Other",
      question: "How far from a level crossing may you park?",
      kind: "road",
      wrong: 0,
      svg: "",
    },
    {
      type: "t",
      head: "#318",
      topic: "Intersections",
      question: "What does a flashing yellow traffic light mean?",
      kind: "light",
      wrong: 0,
      svg: "",
    },
    {
      type: "s",
      head: "2.1",
      topic: "Priority",
      question: "Priority road",
      kind: "img",
      wrong: 0,
      svg: "<svg viewBox='-28.5 -30.9 860.2 860.2' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1'><defs/><g transform='translate(0,-241.0)'><rect style='color:#000000;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:3.5;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' width='600' height='600' x='-470.4' y='444.1' rx='45' ry='45' transform='matrix(0.7,-0.7,0.7,0.7,0,0)'/><path style='color:#000000;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:3.5;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' d='m 20.2,621.9 c -13.7,13.7 -13.7,35.7 0,49.4 L 380.9,1032.0 c 13.7,13.7 35.7,13.7 49.4,0 l 360.6,-360.6 c 13.7,-13.7 13.7,-35.7 0,-49.4 L 430.4,261.3 c -13.7,-13.7 -35.7,-13.7 -49.4,0 L 20.2,621.9 z m 7.0,7.0 360.6,-360.6 c 9.7,-9.7 25.5,-9.7 35.3,0 l 360.6,360.6 c 9.7,9.7 9.7,25.5 0,35.3 l -360.6,360.6 c -9.7,9.7 -25.5,9.7 -35.3,0 L 27.3,664.3 c -9.7,-9.7 -9.7,-25.5 0,-35.3 z'/><path style='color:#000000;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:3.5;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' d='m 165.2,614.8 c -17.6,17.6 -17.6,46.0 0,63.6 l 208.5,208.5 c 17.6,17.6 46.0,17.6 63.6,0 l 208.5,-208.5 c 17.6,-17.6 17.6,-46.0 0,-63.6 L 437.4,406.2 c -17.6,-17.6 -46.0,-17.6 -63.6,0 l -208.5,208.5 z m 7.0,7.0 208.5,-208.5 c 13.7,-13.7 35.7,-13.7 49.4,0 l 208.5,208.5 c 13.7,13.7 13.7,35.7 0,49.4 l -208.5,208.5 c -13.7,13.7 -35.7,13.7 -49.4,0 L 172.3,671.4 c -13.7,-13.7 -13.7,-35.7 0,-49.4 z'/><rect y='561.6' x='-352.9' height='365' width='365' style='color:#000000;fill:#ffcc00;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:3.5;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' rx='35' ry='35' transform='matrix(0.7,-0.7,0.7,0.7,0,0)'/><rect ry='44' rx='44' y='445.1' x='-469.4' height='598' width='598' style='color:#000000;fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate' transform='matrix(0.7,-0.7,0.7,0.7,0,0)'/></g></svg>",
    },
    {
      type: "s",
      head: "5.16",
      topic: "Special regulation",
      question: "Bus and/or trolleybus stop",
      kind: "img",
      wrong: 0,
      svg: "<svg viewBox='-9.8 -9.8 619.6 919.6' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'><path fill='#FFFFFF' stroke='#000000' stroke-width='2' d='M45,1h510c24.3,0,44,19.7,44,44v810c0,24.3-19.7,44-44,44 H45c-24.3,0-44-19.7-44-44V45C1,20.7,20.7,1,45,1z'/><path fill='#0D69E1' d='M45,20c-13.9,0-25,11.1-25,25v810c0,13.8,11.1,25,25,25h510c13.8,0,25-11.2,25-25V45 c0-13.9-11.2-25-25-25H45z M101.2,150h397.5c24.9,0,45,20.1,45,45v397.5c0,24.9-20.1,45-45,45H101.2c-24.9,0-45-20.1-45-45V195 C56.2,170.1,76.3,150,101.2,150z'/><path d='M145.3,286.9c-6.7,0-12.9,3.6-16.2,9.4l-32.8,56.8c-1.6,2.9-2.5,6.1-2.5,9.4v31.7v37.1 c0,10.4,8.4,18.8,18.8,18.8h9.4c0-25.9,21-46.9,46.9-46.9c25.9,0,46.9,21,46.9,46.9h150c0-25.9,21-46.9,46.9-46.9 c25.9,0,46.9,21,46.9,46.9h28.1c10.4,0,18.8-8.4,18.8-18.8v-37.1v-31.7c0-2-0.3-4-1-5.9l-18.9-56.8c-2.6-7.7-9.7-12.8-17.8-12.8 H145.3z M147.5,300h11.9h9.4c5.2,0,9.4,4.2,9.4,9.4v37.5c0,5.2-4.2,9.4-9.4,9.4h-9.4h-33.6c-5.2,0-9.4-4.2-9.4-9.4 c0-1.6,0.5-3.3,1.3-4.7l21.6-37.5C141,301.8,144.1,300,147.5,300z M206.2,300h56.2c5.2,0,9.4,4.2,9.4,9.4v37.5 c0,5.2-4.2,9.4-9.4,9.4h-56.2c-5.2,0-9.4-4.2-9.4-9.4v-37.5C196.9,304.2,201.1,300,206.2,300z M300,300h56.2c5.2,0,9.4,4.2,9.4,9.4 v37.5c0,5.2-4.2,9.4-9.4,9.4H300c-5.2,0-9.4-4.2-9.4-9.4v-37.5C290.6,304.2,294.8,300,300,300z M393.8,300h28.1h25.3 c4.2,0,7.8,2.7,9,6.7l11,37.5c1.5,5-1.4,10.2-6.3,11.7c-0.9,0.3-1.8,0.4-2.7,0.4h-36.3h-28.1c-5.2,0-9.4-4.2-9.4-9.4v-37.5 C384.4,304.2,388.6,300,393.8,300z'/><path d='M168.8,412.5c-20.7,0-37.5,16.8-37.5,37.5s16.8,37.5,37.5,37.5 s37.5-16.8,37.5-37.5S189.5,412.5,168.8,412.5z M168.8,431.3c10.4,0,18.8,8.4,18.8,18.8s-8.4,18.8-18.8,18.8S150,460.4,150,450 S158.4,431.3,168.8,431.3z'/><path d='M412.5,412.5c-20.7,0-37.5,16.8-37.5,37.5s16.8,37.5,37.5,37.5 S450,470.7,450,450S433.2,412.5,412.5,412.5z M412.5,431.3c10.4,0,18.8,8.4,18.8,18.8s-8.4,18.8-18.8,18.8s-18.8-8.4-18.8-18.8 S402.1,431.3,412.5,431.3z'/></svg>",
    },
  ],
  totals: { all: 5, t: 3, s: 2 },
  topics: {
    t: { All: 3, Signs: 1, Intersections: 1, Other: 1 },
    s: { All: 2, Priority: 1, "Special regulation": 1 },
  },
};
