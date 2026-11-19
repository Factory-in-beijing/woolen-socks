import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import type { MaterialChipData } from "../domain/materialChip";
import { MaterialChipGrid } from "./MaterialChipGrid";
import { checkWhite, playTriangle } from "./moduleArt";

export type LessonRowData = {
  title: string;
  duration: string;
  status: "watched" | "playing" | "todo";
  /** "Lesson 2 · Watched" */
  subtitle: string;
  isLast: boolean;
  progressPercent: number;
  materials: MaterialChipData[];
  accessibilityLabel: string;
};

const TONE = {
  watched: {
    subtitle: "#12A06A",
    card: "#FFFFFF",
    border: { borderWidth: 1, borderColor: "#E8EBF7" },
    shadow: "0 1px 2px rgba(14,28,145,0.04)",
    icon: "#12A06A",
    dot: "#12A06A",
    rule: "#EEF0F8",
  },
  playing: {
    subtitle: "#8A5B00",
    card: "#FFFBF0",
    border: { borderWidth: 1.5, borderColor: "#FFB200" },
    shadow: "0 10px 24px -8px rgba(255,178,0,0.35)",
    icon: "#FFB200",
    dot: "#FFB200",
    rule: "rgba(255,178,0,0.30)",
  },
  todo: {
    subtitle: "#8A93B8",
    card: "#FFFFFF",
    border: { borderWidth: 1, borderColor: "#E8EBF7" },
    shadow: "0 1px 2px rgba(14,28,145,0.04)",
    icon: "#EEF1FF",
    dot: "#C9CFEA",
    rule: "#EEF0F8",
  },
} as const;

/** Width of the chip area inside a lesson card (350 page width minus rail, gap and card padding). */
const CHIP_AREA_WIDTH = 294;

/** One lesson of an opened module: rail dot, title/duration, progress and its study-material chips. */
export function LessonRow({ lesson }: { lesson: LessonRowData }) {
  const router = useRouter();
  const tone = TONE[lesson.status];
  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <View
          style={[styles.railLine, lesson.isLast ? styles.railLineLast : styles.railLineMiddle]}
        />
        <View style={[styles.railDot, { backgroundColor: tone.dot }]} />
      </View>
      <View
        style={[
          styles.card,
          { backgroundColor: tone.card, ...tone.border, boxShadow: tone.shadow },
        ]}
      >
        <Pressable
          style={styles.header}
          onPress={() => router.push("/lesson-player")}
          accessibilityRole="link"
          accessibilityLabel={lesson.accessibilityLabel}
        >
          <View style={[styles.icon, { backgroundColor: tone.icon }]}>
            <SvgXml
              xml={
                lesson.status === "watched"
                  ? checkWhite
                  : playTriangle(lesson.status === "playing" ? "#0A0E2E" : "#0E1C91")
              }
              width={lesson.status === "watched" ? 18 : 16}
              height={lesson.status === "watched" ? 18 : 16}
            />
          </View>
          <View style={styles.titles}>
            <Text style={[styles.subtitle, { color: tone.subtitle }]}>{lesson.subtitle}</Text>
            <Text style={styles.title}>{lesson.title}</Text>
          </View>
          <Text style={styles.duration}>{lesson.duration}</Text>
        </Pressable>
        {lesson.status === "playing" ? (
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${lesson.progressPercent}%` }]} />
          </View>
        ) : null}
        <View style={styles.materialsHeader}>
          <Text style={styles.materialsLabel}>Study material</Text>
          <View style={[styles.rule, { backgroundColor: tone.rule }]} />
        </View>
        <MaterialChipGrid chips={lesson.materials} width={CHIP_AREA_WIDTH} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 4 },
  rail: { position: "relative", width: 20, flexShrink: 0 },
  railLine: {
    position: "absolute",
    left: 9,
    top: -8,
    width: 2,
    backgroundColor: "#DDE2F5",
    borderRadius: 1,
  },
  railLineMiddle: { bottom: 0 },
  railLineLast: { height: 44 },
  railDot: {
    position: "absolute",
    left: 4,
    top: 32,
    width: 8,
    height: 8,
    borderWidth: 2,
    borderColor: "#F6F7FD",
    borderRadius: 4,
  },
  card: { minWidth: 0, padding: 16, gap: 12, flex: 1, flexDirection: "column", borderRadius: 20 },
  header: { flexDirection: "row", gap: 12, alignItems: "center" },
  icon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderRadius: 14,
  },
  titles: { minWidth: 0, gap: 4, flex: 1 },
  subtitle: {
    fontFamily: font.manrope[800],
    fontSize: 11,
    letterSpacing: 0.4,
    lineHeight: 11,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 18.75,
  },
  duration: {
    alignSelf: "flex-start",
    fontFamily: font.spaceGrotesk[700],
    color: "#8A93B8",
    fontSize: 13,
    lineHeight: 13,
  },
  track: {
    height: 4,
    overflow: "hidden",
    backgroundColor: "rgba(255,178,0,0.22)",
    borderRadius: 2,
  },
  fill: { height: 4, backgroundColor: "#FFB200", borderRadius: 2 },
  materialsHeader: { flexDirection: "row", gap: 8, alignItems: "center" },
  materialsLabel: {
    fontFamily: font.manrope[800],
    color: "#8A93B8",
    fontSize: 11,
    letterSpacing: 0.6,
    lineHeight: 11,
    textTransform: "uppercase",
  },
  rule: { height: 1, flex: 1 },
});
