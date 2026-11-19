import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { usePasswordField } from "@/hooks/usePasswordField";
import { PasswordField } from "@/components/PasswordField";
import { PasswordStrength } from "@/components/PasswordStrength";
import { isPasswordAcceptable } from "@/lib/password";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { CtaButton } from "@/components/CtaButton";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/changePassword.art";
import { strings } from "../strings";

const s = strings.changePassword;

export function ChangePasswordScreen() {
  const router = useRouter();
  const current = usePasswordField();
  const next = usePasswordField();
  // The new password has to be acceptable and different from the current one.
  const valid =
    current.value.length > 0 && isPasswordAcceptable(next.value) && next.value !== current.value;
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/edit-profile")}
          accessibilityRole="link"
          accessibilityLabel="Back to Edit profile"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.changePassword}</Text>
        <View style={styles.box} />
      </View>
      <View style={styles.box2}>
        <View style={styles.box3}>
          <View style={styles.box4}>
            <SvgXml xml={art.art2} width={20} height={20} />
          </View>
          <Text style={styles.text2}>{s.otherPhonesThatUse}</Text>
        </View>
        <View style={styles.box5}>
          <View style={styles.box6}>
            <Text style={styles.text3}>{s.currentPassword}</Text>
            <Text style={styles.text4} onPress={() => router.push("/forgot-password")}>
              {s.forgotIt}
            </Text>
          </View>
          <PasswordField field={current} placeholder={s.currentPassword} />
        </View>
        <View style={styles.box5}>
          <View style={styles.box6}>
            <Text style={styles.text3}>{s.newPassword}</Text>
          </View>
          <PasswordField field={next} placeholder={s.newPassword} />
        </View>
        <PasswordStrength password={next.value} />
      </View>
      <View style={styles.box14}>
        {valid ? (
          <>
            <CtaButton label={s.updatePassword} onPress={() => router.push("/edit-profile")} />
          </>
        ) : null}
        {!valid ? (
          <>
            <CtaButton label={s.updatePassword} disabled />
          </>
        ) : null}
      </View>
    </ScreenFrame>
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
  link: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 22,
  },
  text: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 17,
    letterSpacing: -0.3,
  },
  box: {
    width: 44,
    height: 44,
  },
  box2: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    top: 122,
    width: 350,
    gap: 24,
  },
  box3: {
    flexDirection: "row",
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#EEF1FF",
    borderRadius: 20,
  },
  box4: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#0E1C91",
    borderRadius: 12,
  },
  text2: {
    fontFamily: font.manrope[700],
    color: "#3A4266",
    fontSize: 13,
    lineHeight: 18.2,
  },
  box5: {
    flexDirection: "column",
    gap: 8,
  },
  box6: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#566086",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  text4: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 12,
    textDecorationLine: "none",
  },
  box14: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
  },
});
