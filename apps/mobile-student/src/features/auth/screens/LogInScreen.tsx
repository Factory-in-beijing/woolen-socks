import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { usePasswordField } from "@/hooks/usePasswordField";
import { PasswordField } from "@/components/PasswordField";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { CtaButton } from "@/components/CtaButton";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/logIn.art";
import { strings } from "../strings";

const s = strings.logIn;

export function LogInScreen() {
  const router = useRouter();
  const pw = usePasswordField();
  const valid = pw.value.length > 0;
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/main")}
          accessibilityRole="link"
          accessibilityLabel="Back to Welcome"
        >
          <SvgXml xml={art.art2} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}></Text>
        <View style={styles.box} />
      </View>
      <View style={styles.section}>
        <View style={styles.box2}>
          <Text style={styles.title}>
            {s.welcome} <Text style={styles.text2}>{s.back}</Text>
          </Text>
          <Text style={styles.text3}>{s.logInWithYour}</Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.text4}>{s.phoneNumber}</Text>
          <View style={styles.box3}>
            <View style={styles.box4}>
              <View style={styles.box5}>
                <Text style={styles.label}>{s.ge}</Text>
              </View>
              <Text style={styles.label2}>{s.n995}</Text>
            </View>
            <Text style={styles.text5}>{s.n555123456}</Text>
          </View>
        </View>
        <View style={styles.box2}>
          <View style={styles.box6}>
            <Text style={styles.text4}>{s.password}</Text>
            <Text style={styles.text6} onPress={() => router.push("/forgot-password")}>
              {s.forgotPassword}
            </Text>
          </View>
          <PasswordField field={pw} placeholder={s.password} />
        </View>
      </View>
      <View style={styles.box8}>
        <Text style={styles.text8}>
          {s.noAccountYet}{" "}
          <Text style={styles.text7} onPress={() => router.push("/sign-in")}>
            {s.createOne}
          </Text>
        </Text>
        {valid ? (
          <>
            <CtaButton label={s.logIn} onPress={() => router.push("/home-signed-in")} />
          </>
        ) : null}
        {!valid ? (
          <>
            <CtaButton label={s.logIn} disabled />
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
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    borderRadius: 22,
  },
  text: {
    fontFamily: font.manrope[500],
    color: "#0A0E2E",
  },
  box: {
    width: 44,
    height: 44,
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
  box2: {
    flexDirection: "column",
    gap: 8,
  },
  text2: {
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
  text3: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 14,
    lineHeight: 20.3,
  },
  text4: {
    fontFamily: font.manrope[800],
    color: "#566086",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  box3: {
    flexDirection: "row",
    height: 60,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE2F5",
    borderRadius: 18,
  },
  box4: {
    flexDirection: "row",
    height: 28,
    paddingRight: 12,
    gap: 8,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#E2E6F6",
  },
  box5: {
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
  text5: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 18,
    letterSpacing: 0.5,
  },
  box6: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  text6: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 12,
    textDecorationLine: "none",
  },
  box8: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
    gap: 16,
  },
  text7: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    textDecorationLine: "none",
  },
  text8: {
    fontFamily: font.manrope[600],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 17.4,
    textAlign: "center",
  },
});
