import { Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { CHECK_BADGE, MODULE_ICONS, chevronDown } from "./moduleArt";
import { at } from "@/lib/collections";

export type ModuleCardData = {
  index: number; // 0-based
  title: string;
  /** "Module 03 · In progress" */
  overline: string;
  overlineColor: string;
  meta: string;
  done: boolean;
  current: boolean;
  videosDone: number;
  videosTotal: number;
  progressPercent: number;
  expanded: boolean;
  accessibilityLabel: string;
  card: {
    backgroundColor: string;
    border: Pick<ViewStyle, "borderWidth" | "borderColor">;
    boxShadow: string;
  };
  tileBackground: string;
};

type ModuleCardProps = { module: ModuleCardData; onToggle: () => void };

/** Collapsible module header: illustration, progress and an expand chevron. */
export function ModuleCard({ module: m, onToggle }: ModuleCardProps) {
  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: m.card.backgroundColor, ...m.card.border, boxShadow: m.card.boxShadow },
      ]}
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityState={{ expanded: m.expanded }}
      accessibilityLabel={m.accessibilityLabel}
    >
      <View style={[styles.tile, { backgroundImage: m.tileBackground }]}>
        <SvgXml xml={MODULE_ICONS[m.index] ?? at(MODULE_ICONS, 0)} width={38} height={38} />
        {m.done ? (
          <View style={styles.badge}>
            <SvgXml xml={CHECK_BADGE} width={10} height={10} />
          </View>
        ) : null}
      </View>
      <View style={styles.text}>
        <Text style={[styles.overline, { color: m.overlineColor }]}>{m.overline}</Text>
        <Text style={styles.title}>{m.title}</Text>
        {m.current ? (
          <View style={styles.progressRow}>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${m.progressPercent}%` }]} />
            </View>
            <Text style={styles.count}>{`${m.videosDone}/${m.videosTotal}`}</Text>
          </View>
        ) : (
          <Text style={styles.meta}>{m.meta}</Text>
        )}
      </View>
      <View style={[styles.chevron, { backgroundColor: m.expanded ? "#0E1C91" : "#F1F3FB" }]}>
        <SvgXml
          xml={chevronDown(m.expanded ? "#FFFFFF" : "#566086")}
          width={16}
          height={16}
          style={{ transform: [{ rotate: m.expanded ? "180deg" : "0deg" }] }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "100%",
    minHeight: 80,
    paddingVertical: 12,
    paddingRight: 16,
    paddingLeft: 12,
    gap: 12,
    alignItems: "center",
    borderRadius: 20,
  },
  tile: {
    position: "relative",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderRadius: 16,
  },
  badge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#12A06A",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 10,
  },
  text: { minWidth: 0, gap: 4, flex: 1 },
  overline: {
    fontFamily: font.manrope[800],
    fontSize: 11,
    letterSpacing: 0.6,
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
  meta: { fontFamily: font.manrope[700], color: "#6B7396", fontSize: 12, lineHeight: 12 },
  progressRow: { flexDirection: "row", marginTop: 4, gap: 8, alignItems: "center" },
  track: { height: 4, flex: 1, overflow: "hidden", backgroundColor: "#EEF1FF", borderRadius: 2 },
  fill: { height: 4, backgroundColor: "#FFB200", borderRadius: 2 },
  count: { fontFamily: font.spaceGrotesk[700], color: "#0E1C91", fontSize: 12, lineHeight: 12 },
  chevron: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderRadius: 16,
  },
});
