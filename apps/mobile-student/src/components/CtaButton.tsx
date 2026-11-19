import { Pressable, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";

const ARROW_RIGHT =
  '<svg viewBox="0 0 24 24" fill="none" stroke="#FFB200" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const ARROW_RIGHT_DISABLED = ARROW_RIGHT.replace("#FFB200", "#8A93B8");

type CtaButtonProps = {
  label: string;
  onPress?: () => void;
  /** Greyed-out, not pressable (e.g. a form that is not valid yet). */
  disabled?: boolean;
};

/** Primary yellow call-to-action: label on the left, arrow in a dark circle on the right. */
export function CtaButton({ label, onPress, disabled = false }: CtaButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled ? styles.buttonDisabled : styles.buttonEnabled]}
    >
      <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
      <View style={[styles.circle, disabled && styles.circleDisabled]}>
        <SvgXml xml={disabled ? ARROW_RIGHT_DISABLED : ARROW_RIGHT} width={18} height={18} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    height: 60,
    paddingRight: 8,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 30,
  },
  buttonEnabled: { backgroundColor: "#FFB200", boxShadow: "0 14px 30px -12px rgba(176,122,0,0.6)" },
  buttonDisabled: { backgroundColor: "#E8EBF7" },
  label: { fontFamily: font.manrope[800], color: "#0A0E2E", fontSize: 16 },
  labelDisabled: { color: "#8A93B8" },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0A0E2E",
  },
  circleDisabled: { backgroundColor: "#D5DAEE" },
});
