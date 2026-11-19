/**
 * SAMPLE exam-ticket catalogue copied from the design. The real catalogue (about 1,800 tickets) is loaded from the
 * database page by page; screens read it only through the hooks in features/practice/hooks.
 */

export const sampleTopicTitles = [
  "Driver, Passenger & Pedestrian, Signs, Convention",
  "Vehicle Malfunctions & Driving Conditions",
  "Warning Signs",
  "Priority Signs",
  "Prohibitory Signs",
  "Mandatory Signs",
  "Information & Guide Signs",
  "Service Signs",
  "Additional Information Plates",
  "Traffic Light Signals",
  "Traffic Controller Signals",
  "Special Flashing & Sound Signals",
  "Hazard Warning Lights & Triangle",
  "Headlights, Lamps & Horn Usage",
  "Driving, Manoeuvring & Carriageway",
  "Overtaking & Passing Oncoming Traffic",
  "Speed Limits & Speed Selection",
  "Braking Distance & Safe Following Distance",
  "Stopping & Parking Rules",
  "Driving Through Intersections",
  "Railway Crossings",
  "Driving on Motorways (Highways)",
  "Residential Zones & Public Transit Priority",
  "Towing Motor Vehicles",
  "Learner Driver Rules",
  "Carrying Passengers & Cargo",
  "Bicycles, Mopeds & Livestock on Roads",
  "Road Markings (Horizontal & Vertical)",
  "First Aid & Emergency Response",
  "Traffic Safety & Defensive Driving",
  "Administrative Law, Fines & Penalties",
  "Eco-Driving & Environmental Rules",
];

/** Tickets per topic for the student's licence category (B, B1) and across all categories. */
export const sampleTopicTicketCounts = {
  b: [
    45, 7, 32, 18, 48, 22, 30, 20, 19, 54, 36, 21, 13, 35, 56, 54, 18, 17, 41, 45, 22, 15, 9, 20, 3,
    14, 13, 15, 43, 78, 7, 51,
  ],
  all: [
    81, 28, 45, 35, 58, 30, 36, 26, 25, 86, 56, 31, 29, 69, 91, 71, 58, 33, 70, 124, 42, 34, 29, 53,
    46, 46, 59, 35, 127, 162, 44, 51,
  ],
};

/** Course modules and the topics they cover (topic numbers are 1-based). */
export const sampleTicketModules = [
  { name: "Convention & administrative law", topics: [1, 31] },
  { name: "Complete road signs", topics: [3, 4, 5, 6, 7, 8, 9, 28] },
  { name: "Traffic lights & intersections", topics: [10, 20] },
  { name: "Controller & special signals", topics: [11, 12] },
  { name: "Lights, hazards & malfunctions", topics: [14, 2, 13] },
  { name: "Manoeuvres, overtaking & parking", topics: [15, 16, 19] },
  { name: "Speed & special zones", topics: [17, 21, 22, 23, 24, 25, 26, 27] },
  { name: "Safety, distance & eco-driving", topics: [30, 18, 32] },
  { name: "First aid", topics: [29] },
];

/** Licence categories; `tickets` is the number of tickets in the category. */
export const sampleLicenceCategories = [
  { code: "All", name: "All categories", tickets: 1810 },
  { code: "A, A1", name: "Motorcycles", tickets: 939 },
  { code: "B, B1", name: "Cars & quadricycles", tickets: 921 },
  { code: "C", name: "Heavy trucks \u00b7 over 3.5 t", tickets: 1283 },
  { code: "C1", name: "Medium trucks \u00b7 3.5\u20137.5 t", tickets: 1177 },
  { code: "D", name: "Buses \u00b7 over 8 passengers", tickets: 1313 },
  { code: "D1", name: "Minibuses \u00b7 9\u201316 passengers", tickets: 1205 },
  { code: "T, S", name: "Agricultural & special", tickets: 607 },
  { code: "Tram", name: "Tram", tickets: 495 },
  { code: "B+C1", name: "Military B + C1", tickets: 1452 },
  { code: "AM", name: "Mopeds & light quads", tickets: 338 },
];

/** Index of the category the student is studying (B, B1). */
export const SAMPLE_STUDENT_CATEGORY = 2;
/** SAMPLE: tickets before this number are answered, in order. */
export const SAMPLE_NEXT_TICKET = 361;
/** SAMPLE: videos per course module, shown on the module headers of the tickets list. */
export const sampleVideosPerModule = [2, 8, 5, 3, 4, 5, 4, 4, 1];
