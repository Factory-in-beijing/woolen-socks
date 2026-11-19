import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import {
  materialChipLabel,
  materialChipRoute,
  type MaterialChipData,
} from "../domain/materialChip";
import { ROAD_SIGN_GROUP_ICONS, TICKET_TOPIC_ICON, chipArrow } from "./materialChipIcons";

const GAP = 8;
const WIDE_HEIGHT = 72;
const TALL_HEIGHT = 104;
const SUBTITLE_COLOR = "rgba(10,14,46,0.72)";

const iconFor = (chip: MaterialChipData) =>
  chip.kind === "topic"
    ? TICKET_TOPIC_ICON
    : (ROAD_SIGN_GROUP_ICONS[chip.group - 1] ?? TICKET_TOPIC_ICON);

type MaterialChipGridProps = {
  chips: MaterialChipData[];
  /** Width in px of the area the chips are laid out in (350 on the page, 294 inside a lesson row). */
  width: number;
};

/** One chip fills the row; two or three share two columns of tall cards. */
export function MaterialChipGrid({ chips, width }: MaterialChipGridProps) {
  const router = useRouter();
  const wide = chips.length === 1;
  const chipWidth = wide ? width : (width - GAP) / 2;
  return (
    <View style={styles.grid}>
      {chips.map((chip) => (
        <Pressable
          key={`${chip.kind}-${chip.kind === "topic" ? chip.topic : chip.group}`}
          style={[styles.chip, { width: chipWidth, height: wide ? WIDE_HEIGHT : TALL_HEIGHT }]}
          onPress={() => router.push(materialChipRoute(chip))}
          accessibilityRole="link"
          accessibilityLabel={materialChipLabel(chip)}
        >
          <View style={wide ? styles.wideContent : styles.tallContent}>
            <View style={styles.icon}>
              <SvgXml xml={iconFor(chip)} width={40} height={40} />
            </View>
            <View style={wide ? styles.wideText : styles.tallText}>
              <Text style={styles.label}>{chip.label}</Text>
              <View style={styles.subRow}>
                <Text style={styles.sub}>{chip.sub}</Text>
                <SvgXml xml={chipArrow(SUBTITLE_COLOR)} width={12} height={12} />
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: GAP },
  chip: { position: "relative", backgroundColor: "#FFB200", borderRadius: 18 },
  wideContent: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  tallContent: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
    justifyContent: "space-between",
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    filter: "drop-shadow(0 4px 5px rgba(120,72,0,0.35))",
  },
  wideText: { minWidth: 0, gap: 4, flex: 1 },
  tallText: { gap: 4 },
  label: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 13,
    letterSpacing: -0.1,
    lineHeight: 15.6,
  },
  subRow: { flexDirection: "row", gap: 4, alignItems: "center" },
  sub: { fontFamily: font.manrope[700], fontSize: 11, lineHeight: 11, color: SUBTITLE_COLOR },
});
