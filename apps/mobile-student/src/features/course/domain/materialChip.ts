/** A "study material" shortcut shown under a lesson: exam tickets of a topic or one road-sign group. */
export type MaterialChipData =
  | { kind: "topic"; topic: number; label: string; sub: string }
  | { kind: "group"; group: number; label: string; sub: string };

export function materialChipRoute(chip: MaterialChipData): string {
  if (chip.kind === "topic") return "/tickets";
  return chip.group === 1 ? "/sign-group" : `/sign-group${chip.group}`;
}

export function materialChipLabel(chip: MaterialChipData): string {
  return chip.kind === "topic"
    ? `Exam tickets, topic ${chip.topic}: ${chip.label}, ${chip.sub}`
    : `Road signs, group ${chip.group}: ${chip.label}, ${chip.sub}`;
}
