import type { MaterialChipRef } from "@/features/course/domain/courseTypes";

/**
 * SAMPLE course content copied from the design. The real catalogue is loaded from the database through the API,
 * paginated; screens read it only through the hooks in features/course/hooks.
 */

export const sampleTicketTopics = [
  { id: 1, title: "Driver, passenger & pedestrian", tickets: 45 },
  { id: 2, title: "Malfunctions & conditions", tickets: 7 },
  { id: 3, title: "Warning signs", tickets: 32 },
  { id: 4, title: "Priority signs", tickets: 18 },
  { id: 5, title: "Prohibitory signs", tickets: 48 },
  { id: 6, title: "Mandatory signs", tickets: 22 },
  { id: 7, title: "Information signs", tickets: 30 },
  { id: 8, title: "Service signs", tickets: 20 },
  { id: 9, title: "Additional plates", tickets: 19 },
  { id: 10, title: "Traffic light signals", tickets: 54 },
  { id: 11, title: "Controller signals", tickets: 36 },
  { id: 12, title: "Special signals", tickets: 21 },
  { id: 13, title: "Hazard lights", tickets: 13 },
  { id: 14, title: "Lights & horn", tickets: 35 },
  { id: 15, title: "Manoeuvring", tickets: 56 },
  { id: 16, title: "Overtaking", tickets: 54 },
  { id: 17, title: "Speed", tickets: 18 },
  { id: 18, title: "Braking distance", tickets: 17 },
  { id: 19, title: "Stopping & parking", tickets: 41 },
  { id: 20, title: "Intersections", tickets: 45 },
  { id: 21, title: "Railway crossings", tickets: 22 },
  { id: 22, title: "Motorways", tickets: 15 },
  { id: 23, title: "Residential zones", tickets: 9 },
  { id: 24, title: "Towing", tickets: 20 },
  { id: 25, title: "Learner driving", tickets: 3 },
  { id: 26, title: "Passengers & cargo", tickets: 14 },
  { id: 27, title: "Bicycles & mopeds", tickets: 13 },
  { id: 28, title: "Road markings", tickets: 15 },
  { id: 29, title: "First aid", tickets: 43 },
  { id: 30, title: "Traffic safety", tickets: 78 },
  { id: 31, title: "Administrative law", tickets: 7 },
  { id: 32, title: "Eco-driving", tickets: 51 },
];

export const sampleSignGroups = [
  { id: 1, title: "Warning", signs: 42 },
  { id: 2, title: "Priority", signs: 6 },
  { id: 3, title: "Prohibitory", signs: 36 },
  { id: 4, title: "Mandatory", signs: 16 },
  { id: 5, title: "Special regulation", signs: 48 },
  { id: 6, title: "Service", signs: 17 },
  { id: 7, title: "Information", signs: 27 },
  { id: 8, title: "Additional panels", signs: 45 },
];

export const sampleModules = [
  {
    title: "Convention & administrative law",
    tickets: 52,
    lessons: [
      {
        title: "Duties of drivers, passengers and pedestrians",
        duration: "11:20",
        materials: [{ kind: "topic", id: 1 }],
      },
      {
        title: "Fines, points and the law",
        duration: "9:05",
        materials: [{ kind: "topic", id: 31 }],
      },
    ],
  },
  {
    title: "Complete road signs",
    tickets: 204,
    lessons: [
      {
        title: "Warning signs",
        duration: "12:10",
        materials: [
          { kind: "group", id: 1 },
          { kind: "topic", id: 3 },
        ],
      },
      {
        title: "Priority signs",
        duration: "7:45",
        materials: [
          { kind: "group", id: 2 },
          { kind: "topic", id: 4 },
        ],
      },
      {
        title: "Prohibitory signs",
        duration: "14:30",
        materials: [
          { kind: "group", id: 3 },
          { kind: "topic", id: 5 },
        ],
      },
      {
        title: "Mandatory signs",
        duration: "8:15",
        materials: [
          { kind: "group", id: 4 },
          { kind: "topic", id: 6 },
        ],
      },
      {
        title: "Information signs",
        duration: "10:40",
        materials: [
          { kind: "group", id: 5 },
          { kind: "group", id: 7 },
          { kind: "topic", id: 7 },
        ],
      },
      {
        title: "Service signs",
        duration: "5:20",
        materials: [
          { kind: "group", id: 6 },
          { kind: "topic", id: 8 },
        ],
      },
      {
        title: "Additional panels",
        duration: "7:05",
        materials: [
          { kind: "group", id: 8 },
          { kind: "topic", id: 9 },
        ],
      },
      { title: "Road markings", duration: "9:50", materials: [{ kind: "topic", id: 28 }] },
    ],
  },
  {
    title: "Traffic lights & intersections",
    tickets: 99,
    lessons: [
      { title: "Traffic light signals", duration: "10:25", materials: [{ kind: "topic", id: 10 }] },
      { title: "Extra light sections", duration: "8:40", materials: [{ kind: "topic", id: 10 }] },
      {
        title: "Controlled intersections",
        duration: "12:05",
        materials: [{ kind: "topic", id: 20 }],
      },
      {
        title: "Uncontrolled intersections",
        duration: "11:30",
        materials: [
          { kind: "topic", id: 20 },
          { kind: "group", id: 2 },
        ],
      },
      { title: "Order of passing", duration: "9:15", materials: [{ kind: "topic", id: 20 }] },
    ],
  },
  {
    title: "Controller & special signals",
    tickets: 57,
    lessons: [
      {
        title: "The three controller gestures",
        duration: "9:30",
        materials: [{ kind: "topic", id: 11 }],
      },
      { title: "Reading the controller", duration: "7:50", materials: [{ kind: "topic", id: 11 }] },
      {
        title: "Blue and red flashing lights",
        duration: "6:40",
        materials: [{ kind: "topic", id: 12 }],
      },
    ],
  },
  {
    title: "Lights, hazards & malfunctions",
    tickets: 55,
    lessons: [
      { title: "Headlights and lamps", duration: "9:10", materials: [{ kind: "topic", id: 14 }] },
      { title: "Using the horn", duration: "4:35", materials: [{ kind: "topic", id: 14 }] },
      { title: "Vehicle malfunctions", duration: "6:20", materials: [{ kind: "topic", id: 2 }] },
      {
        title: "Hazard lights and triangle",
        duration: "5:45",
        materials: [{ kind: "topic", id: 13 }],
      },
    ],
  },
  {
    title: "Manoeuvres, overtaking & parking",
    tickets: 151,
    lessons: [
      { title: "Lanes and turning", duration: "11:40", materials: [{ kind: "topic", id: 15 }] },
      { title: "U-turns and reversing", duration: "8:25", materials: [{ kind: "topic", id: 15 }] },
      { title: "Overtaking rules", duration: "12:15", materials: [{ kind: "topic", id: 16 }] },
      {
        title: "Passing oncoming traffic",
        duration: "7:30",
        materials: [{ kind: "topic", id: 16 }],
      },
      { title: "Stopping and parking", duration: "13:05", materials: [{ kind: "topic", id: 19 }] },
    ],
  },
  {
    title: "Speed & special zones",
    tickets: 114,
    lessons: [
      { title: "Speed limits", duration: "8:50", materials: [{ kind: "topic", id: 17 }] },
      {
        title: "Railway crossings and motorways",
        duration: "11:15",
        materials: [
          { kind: "topic", id: 21 },
          { kind: "topic", id: 22 },
        ],
      },
      {
        title: "Residential zones and towing",
        duration: "9:40",
        materials: [
          { kind: "topic", id: 23 },
          { kind: "topic", id: 24 },
        ],
      },
      {
        title: "Learners, cargo and bicycles",
        duration: "8:05",
        materials: [
          { kind: "topic", id: 25 },
          { kind: "topic", id: 26 },
          { kind: "topic", id: 27 },
        ],
      },
    ],
  },
  {
    title: "Safety, distance & eco-driving",
    tickets: 146,
    lessons: [
      { title: "Traffic safety", duration: "12:30", materials: [{ kind: "topic", id: 30 }] },
      { title: "Braking distance", duration: "7:15", materials: [{ kind: "topic", id: 18 }] },
      {
        title: "Safe following distance",
        duration: "6:50",
        materials: [{ kind: "topic", id: 18 }],
      },
      { title: "Eco-driving", duration: "8:20", materials: [{ kind: "topic", id: 32 }] },
    ],
  },
  {
    title: "First aid",
    tickets: 43,
    lessons: [
      { title: "First aid at a crash", duration: "14:45", materials: [{ kind: "topic", id: 29 }] },
    ],
  },
] satisfies Array<{
  title: string;
  tickets: number;
  lessons: Array<{ title: string; duration: string; materials: MaterialChipRef[] }>;
}>;
