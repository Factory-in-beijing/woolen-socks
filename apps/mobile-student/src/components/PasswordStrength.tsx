import { StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { checkPassword, scorePassword } from "@/lib/password";

const CHECK =
  '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

const EMPTY = "#E8EBF7";
const TONES = ["#E5484D", "#E5484D", "#F5A524", "#12A06A"] as const;
const LABELS = ["Too weak", "Weak", "Good", "Strong"] as const;

type PasswordStrengthProps = { password: string };

/** Three-segment strength meter and the two rule checkmarks shown under a new password. */
export function PasswordStrength({ password }: PasswordStrengthProps) {
  const checks = checkPassword(password);
  const score = scorePassword(password);
  const tone = TONES[score];
  const empty = password === "";
  const rules = [
    { text: "At least 8 characters", ok: checks.long },
    { text: "A letter and a number", ok: checks.mixed },
  ];
  return (
    <View style={styles.wrap}>
      <View style={styles.meterRow}>
        <View style={styles.bars}>
          {[1, 2, 3].map((n) => (
            <View
              key={n}
              style={[styles.bar, { backgroundColor: !empty && score >= n ? tone : EMPTY }]}
            />
          ))}
        </View>
        <Text style={[styles.label, { color: tone }]}>{empty ? "" : LABELS[score]}</Text>
      </View>
      <View style={styles.rules}>
        {rules.map((rule) => (
          <View key={rule.text} style={styles.rule}>
            <View style={[styles.tick, { backgroundColor: rule.ok ? "#12A06A" : EMPTY }]}>
              {rule.ok ? <SvgXml xml={CHECK} width={11} height={11} /> : null}
            </View>
            <Text style={[styles.ruleText, { color: rule.ok ? "#0A0E2E" : "#8A93B8" }]}>
              {rule.text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  meterRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  bars: { flexDirection: "row", flex: 1, gap: 6 },
  bar: { flex: 1, height: 6, borderRadius: 3 },
  label: { minWidth: 52, fontFamily: font.manrope[800], fontSize: 12, textAlign: "right" },
  rules: { gap: 8 },
  rule: { flexDirection: "row", alignItems: "center", gap: 8 },
  tick: { width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  ruleText: { fontFamily: font.manrope[700], fontSize: 13 },
});
