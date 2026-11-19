import { Pressable, StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";

const ARROW_LEFT =
  '<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';

type StepHeaderProps = {
  /** 1-based current step. */
  step: number;
  total: number;
  onBack: () => void;
  backLabel?: string;
};

/** Header of the blue sign-up / reset screens: round back button and "step N of M" dots. */
export function StepHeader({ step, total, onBack, backLabel = "Back" }: StepHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={backLabel}
        onPress={onBack}
        style={styles.back}
      >
        <SvgXml xml={ARROW_LEFT} width={20} height={20} />
      </Pressable>
      <View accessibilityLabel={`Step ${step} of ${total}`} style={styles.dots}>
        {Array.from({ length: total }, (_, i) => (
          <View
            key={i}
            style={i + 1 < step ? styles.done : i + 1 === step ? styles.current : styles.todo}
          />
        ))}
      </View>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 54,
    width: 350,
    height: 44,
    justifyContent: "space-between",
    alignItems: "center",
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
  },
  dots: {
    flexDirection: "row",
    height: 28,
    paddingHorizontal: 10,
    gap: 6,
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  done: { width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.9)" },
  current: { width: 24, height: 8, borderRadius: 4, backgroundColor: "#FFB200" },
  todo: { width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.3)" },
  spacer: { width: 44, height: 44 },
});
