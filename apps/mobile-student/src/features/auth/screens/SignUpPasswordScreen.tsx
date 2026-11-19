import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { usePasswordField } from "@/hooks/usePasswordField";
import { PasswordField } from "@/components/PasswordField";
import { PasswordStrength } from "@/components/PasswordStrength";
import { isPasswordAcceptable } from "@/lib/password";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { CtaButton } from "@/components/CtaButton";
import { StepHeader } from "@/components/StepHeader";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/signUpPassword.art";
import { strings } from "../strings";

const s = strings.signUpPassword;

export function SignUpPasswordScreen() {
  const router = useRouter();
  const pw = usePasswordField();
  const valid = isPasswordAcceptable(pw.value);
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <StepHeader step={3} total={4} onBack={() => router.push("/sign-in-code")} />
      <View style={styles.section}>
        <View style={styles.box5}>
          <Text style={styles.title}>
            {s.createA} <Text style={styles.text}>{s.password}</Text>
          </Text>
          <Text style={styles.text2}>{s.youWillLogIn}</Text>
        </View>
        <View style={styles.box5}>
          <View style={styles.box6}>
            <Text style={styles.text3}>{s.password2}</Text>
          </View>
          <PasswordField field={pw} placeholder={s.newPassword} />
        </View>
        <PasswordStrength password={pw.value} />
      </View>
      <View style={styles.box16}>
        <Text style={styles.text6}>{s.keepItToYourself}</Text>
        {valid ? (
          <>
            <CtaButton label={s.continue} onPress={() => router.push("/sign-in-profile")} />
          </>
        ) : null}
        {!valid ? (
          <>
            <CtaButton label={s.continue} disabled />
          </>
        ) : null}
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box: {
    width: 8,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 4,
  },
  section: {
    flexDirection: "column",
    position: "absolute",
    left: 0,
    top: 272,
    width: 390,
    height: 572,
    paddingTop: 28,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 20,
    gap: 24,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: "0 -12px 30px rgba(5,10,60,0.25)",
  },
  box5: {
    flexDirection: "column",
    gap: 8,
  },
  text: {
    color: "#0E1C91",
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 26,
    letterSpacing: -0.9,
    lineHeight: 29.9,
  },
  text2: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 14,
    lineHeight: 20.3,
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
  box16: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
    gap: 16,
  },
  text6: {
    fontFamily: font.manrope[600],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 17.4,
    textAlign: "center",
  },
});
