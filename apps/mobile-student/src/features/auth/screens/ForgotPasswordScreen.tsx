import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { StepHeader } from "@/components/StepHeader";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/forgotPassword.art";
import { strings } from "../strings";

const s = strings.forgotPassword;

export function ForgotPasswordScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <StepHeader step={1} total={3} onBack={() => router.push("/log-in")} />
      <View style={styles.section}>
        <View style={styles.box4}>
          <Text style={styles.title}>
            {s.resetYour} <Text style={styles.text}>{s.password}</Text>
          </Text>
          <Text style={styles.text2}>{s.wellTextA6}</Text>
        </View>
        <View style={styles.box4}>
          <Text style={styles.text3}>{s.phoneNumber}</Text>
          <View style={styles.box5}>
            <View style={styles.box6}>
              <View style={styles.box7}>
                <Text style={styles.label}>{s.ge}</Text>
              </View>
              <Text style={styles.label2}>{s.n995}</Text>
            </View>
            <Text style={styles.text4}>{s.n555123456}</Text>
            <View style={styles.box8} />
          </View>
        </View>
      </View>
      <View style={styles.box9}>
        <Text style={styles.text6}>
          {s.rememberedIt}{" "}
          <Text style={styles.text5} onPress={() => router.push("/log-in")}>
            {s.logIn}
          </Text>
        </Text>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/reset-code")}
          accessibilityRole="link"
        >
          <Text style={styles.label3}>{s.sendCode}</Text>
          <View style={styles.box10}>
            <SvgXml xml={art.art3} width={18} height={18} />
          </View>
        </Pressable>
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
  link: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    borderRadius: 22,
  },
  box: {
    width: 24,
    height: 8,
    backgroundColor: "#FFB200",
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
  box4: {
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
  text3: {
    fontFamily: font.manrope[800],
    color: "#566086",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  box5: {
    flexDirection: "row",
    height: 60,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#0E1C91",
    borderRadius: 18,
    boxShadow: "0 0 0 4px rgba(14,28,145,0.08)",
  },
  box6: {
    flexDirection: "row",
    height: 28,
    paddingRight: 12,
    gap: 8,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#E2E6F6",
  },
  box7: {
    flexDirection: "row",
    height: 20,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 6,
    alignItems: "center",
    backgroundColor: "#EEF1FF",
    borderRadius: 6,
  },
  label: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 11,
  },
  label2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 16,
  },
  text4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 18,
    letterSpacing: 0.5,
  },
  box8: {
    width: 2,
    height: 22,
    backgroundColor: "#0E1C91",
    borderRadius: 1,
  },
  box9: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
    gap: 16,
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    textDecorationLine: "none",
  },
  text6: {
    fontFamily: font.manrope[600],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 17.4,
    textAlign: "center",
  },
  link2: {
    flexDirection: "row",
    height: 60,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 30,
    boxShadow: "0 14px 30px -12px rgba(176,122,0,0.6)",
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    textDecorationLine: "none",
  },
  box10: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
});
