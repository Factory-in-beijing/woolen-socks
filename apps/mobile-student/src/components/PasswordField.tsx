import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import type { PasswordFieldState } from "@/features/auth/hooks/usePasswordField";

const LOCK =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A93B8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const EYE_PATH =
  "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6";
const EYE_OFF_PATH =
  "M3 3l18 18M10.6 6.1A9.8 9.8 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.6 6.6C3.7 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2";

const eyeIcon = (path: string) =>
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E1C91" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>`;

type PasswordFieldProps = { field: PasswordFieldState; placeholder: string };

/** Password input with a lock icon, a focus ring and a show/hide button. */
export function PasswordField({ field, placeholder }: PasswordFieldProps) {
  const { revealed } = field;
  return (
    <View style={[styles.box, field.focused ? styles.boxFocused : styles.boxIdle]}>
      <SvgXml xml={LOCK} width={20} height={20} style={styles.lock} />
      <TextInput
        style={[styles.input, revealed ? styles.inputRevealed : styles.inputMasked]}
        placeholder={placeholder}
        placeholderTextColor="#A2A9C8"
        value={field.value}
        onChangeText={field.setValue}
        onFocus={() => field.setFocused(true)}
        onBlur={() => field.setFocused(false)}
        secureTextEntry={!revealed}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={revealed ? "Hide password" : "Show password"}
        onPress={field.toggleReveal}
        style={styles.eye}
      >
        <SvgXml xml={eyeIcon(revealed ? EYE_OFF_PATH : EYE_PATH)} width={20} height={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    height: 60,
    paddingRight: 8,
    paddingLeft: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
  },
  boxIdle: { borderWidth: 1, borderColor: "#DDE2F5" },
  boxFocused: {
    borderWidth: 1.5,
    borderColor: "#0E1C91",
    boxShadow: "0 0 0 4px rgba(14,28,145,0.08)",
  },
  lock: { flexShrink: 0 },
  input: {
    height: 44,
    minWidth: 0,
    padding: 0,
    flex: 1,
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
  },
  inputMasked: { fontSize: 20, letterSpacing: 3 },
  inputRevealed: { fontSize: 17, letterSpacing: 0.2 },
  eye: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    backgroundColor: "#F3F5FC",
    borderRadius: 14,
  },
});
