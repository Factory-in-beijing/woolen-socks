import { Pressable, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { at } from "@/lib/collections";
import { strings } from "../strings";
import { presetIcons, topicCheck, topicIcons } from "./reminderArt";

type WheelCell = { value: number; label: string; tap: () => void };
type Border = { borderWidth: number; borderColor: string };

// How strongly each of the five wheel positions is shown: faint at the ends, bold in the middle.
const WHEEL_OPACITY = [0.22, 0.45, 1, 0.45, 0.22] as const;
const WHEEL_LABEL = ["far", "near", "center", "near", "far"] as const;

/** One scrolling-wheel column (hours or minutes): the middle value is the selected one. */
export function WheelColumn({ label, cells }: { label: string; cells: WheelCell[] }) {
  return (
    <View style={styles.wheel}>
      {cells.map((cell, i) => (
        <Pressable
          key={cell.value}
          style={[styles.wheelCell, { opacity: WHEEL_OPACITY[i] }]}
          onPress={cell.tap}
          accessibilityRole="button"
          accessibilityLabel={`${label} ${cell.label}`}
        >
          <Text style={wheelLabelStyle(WHEEL_LABEL[i] ?? "far")}>{cell.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const wheelLabelStyle = (kind: "far" | "near" | "center") =>
  kind === "center" ? styles.wheelCenter : kind === "near" ? styles.wheelNear : styles.wheelFar;

type Preset = {
  key: number;
  time: string;
  aria: string;
  bg: string;
  fg: string;
  border: Border;
  icon: string;
  tap: () => void;
};

export function PresetButtons({ presets }: { presets: Preset[] }) {
  return (
    <View style={styles.presetRow}>
      {presets.map((p, i) => (
        <Pressable
          key={p.key}
          style={[styles.preset, { ...p.border, backgroundColor: p.bg }]}
          onPress={p.tap}
          accessibilityRole="button"
          accessibilityLabel={p.aria}
        >
          <SvgXml xml={at(presetIcons, i)(p.icon)} width={14} height={14} />
          <Text style={[styles.presetLabel, { color: p.fg }]}>{p.time}</Text>
        </Pressable>
      ))}
    </View>
  );
}

type Segment = { label: string; bg: string; fg: string; tap: () => void };

/** "Every day / Weekdays / Weekends" quick choices. */
export function SegmentButtons({ segments }: { segments: Segment[] }) {
  return (
    <View style={styles.segments}>
      {segments.map((segment) => (
        <Pressable
          key={segment.label}
          style={[styles.segment, { backgroundColor: segment.bg }]}
          onPress={segment.tap}
          accessibilityRole="button"
        >
          <Text style={[styles.segmentLabel, { color: segment.fg }]}>{segment.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

type DayCell = {
  name: string;
  bg: string;
  fg: string;
  dot: string;
  shadow: string | undefined;
  tap: () => void;
};

/** Seven day buttons, Monday first. */
export function DayButtons({ days }: { days: DayCell[] }) {
  return (
    <View style={styles.days}>
      {days.map((day) => (
        <Pressable
          key={day.name}
          style={[styles.day, { backgroundImage: day.bg, boxShadow: day.shadow }]}
          onPress={day.tap}
          accessibilityRole="button"
          accessibilityLabel={day.name}
        >
          <Text style={[styles.dayLetter, { color: day.fg }]}>{day.name.charAt(0)}</Text>
          <View style={[styles.dayDot, { backgroundColor: day.dot }]} />
        </Pressable>
      ))}
    </View>
  );
}

type TopicCard = {
  topic: "lesson" | "tickets" | "news";
  bg: string;
  border: Border;
  fg: string;
  sub: string;
  tile: string;
  checkBg: string;
  checkBorder: Border;
  checkOpacity: number;
  shadow: string | undefined;
  tap: () => void;
};

const copy = strings.notifications2;
const TOPIC_TEXT = {
  lesson: { title: copy.nextLesson, sub: copy.keepGoing },
  tickets: { title: copy.tickets, sub: copy.practiseAFew },
  news: { title: copy.whatsNew, sub: copy.newVideos },
} as const;

/** Three on/off cards for what the reminders are about. */
export function TopicCards({ cards }: { cards: TopicCard[] }) {
  return (
    <View style={styles.topicRow}>
      {cards.map((card) => (
        <Pressable
          key={card.topic}
          style={[
            styles.topic,
            { ...card.border, backgroundImage: card.bg, boxShadow: card.shadow },
          ]}
          onPress={card.tap}
          accessibilityRole="button"
          accessibilityLabel={TOPIC_TEXT[card.topic].title}
        >
          <View style={[styles.topicTile, { backgroundImage: card.tile }]}>
            <SvgXml xml={topicIcons[card.topic]} width={30} height={30} />
          </View>
          <View style={[styles.topicCheck, { ...card.checkBorder, backgroundColor: card.checkBg }]}>
            <SvgXml
              xml={topicCheck}
              width={12}
              height={12}
              style={{ opacity: card.checkOpacity }}
            />
          </View>
          <View style={styles.topicText}>
            <Text style={[styles.topicTitle, { color: card.fg }]}>
              {TOPIC_TEXT[card.topic].title}
            </Text>
            <Text style={[styles.topicSub, { color: card.sub }]}>{TOPIC_TEXT[card.topic].sub}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wheel: { flexDirection: "column", position: "relative", width: 104 },
  wheelCell: { height: 40, padding: 0, alignItems: "center", justifyContent: "center" },
  wheelFar: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 16,
    letterSpacing: -0.5,
  },
  wheelNear: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 20,
    letterSpacing: -0.5,
  },
  wheelCenter: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFB200",
    fontSize: 34,
    letterSpacing: -0.5,
  },
  presetRow: { flexDirection: "row", gap: 8 },
  preset: {
    flexDirection: "row",
    height: 40,
    padding: 0,
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 20,
  },
  presetLabel: { fontFamily: font.spaceGrotesk[700], fontSize: 13 },
  segments: {
    flexDirection: "row",
    height: 44,
    padding: 4,
    gap: 4,
    backgroundColor: "#F3F5FC",
    borderRadius: 22,
  },
  segment: {
    height: 36,
    padding: 0,
    flex: 1,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentLabel: { fontFamily: font.manrope[800], fontSize: 13 },
  days: { flexDirection: "row", justifyContent: "space-between" },
  day: {
    width: 40,
    height: 64,
    padding: 0,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  dayLetter: { fontFamily: font.manrope[800], fontSize: 14, lineHeight: 14 },
  dayDot: { width: 6, height: 6, borderRadius: 3 },
  topicRow: { flexDirection: "row", gap: 8 },
  topic: {
    position: "relative",
    height: 136,
    minWidth: 0,
    padding: 14,
    justifyContent: "space-between",
    flex: 1,
    borderRadius: 24,
  },
  topicTile: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  topicCheck: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
  },
  topicText: { gap: 4 },
  topicTitle: {
    fontFamily: font.manrope[800],
    fontSize: 14,
    letterSpacing: -0.2,
    lineHeight: 16.8,
  },
  topicSub: { fontFamily: font.manrope[700], fontSize: 11, lineHeight: 13.2 },
});
