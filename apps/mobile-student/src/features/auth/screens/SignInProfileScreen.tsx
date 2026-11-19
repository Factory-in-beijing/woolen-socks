import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSignInProfileViewModel } from "../hooks/useSignInProfileViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/signInProfile.art";
import { strings } from "../strings";

const s = strings.signInProfile;

export function SignInProfileScreen() {
  const router = useRouter();
  const vm = useSignInProfileViewModel();
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/sign-up-password")}
          accessibilityRole="link"
          accessibilityLabel="Previous step"
        >
          <SvgXml xml={art.art2} width={20} height={20} />
        </Pressable>
        <View style={styles.step4Of4Box}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box2} />
        </View>
        <View style={styles.box3} />
      </View>
      <View style={styles.section}>
        <View style={styles.box4}>
          <Text style={styles.title}>{s.almostDone}</Text>
          <Text style={styles.text}>{s.yourNameAndThe}</Text>
        </View>
        <View style={styles.box4}>
          <Text style={styles.text2}>{s.yourFirstAndLast}</Text>
          <View style={styles.box5}>
            <Text style={styles.text3}>{s.ninoBeridze}</Text>
            <View style={styles.box6} />
          </View>
        </View>
        <View style={styles.box4}>
          <View style={styles.box7}>
            <Text style={styles.text2}>{s.ticketLanguage}</Text>
            <Text style={styles.text4}>{s.changeItAnyTime}</Text>
          </View>
          <View style={styles.ticketLanguageBox}>
            {vm.languages.map((language) => (
              <Pressable
                key={language.code}
                style={[styles.button, language.selected ? styles.buttonOn : styles.buttonOff]}
                onPress={language.pick}
                accessibilityRole="button"
                accessibilityLabel={language.english}
                accessibilityState={{ selected: language.selected }}
              >
                <Text style={styles.text5}>{language.native}</Text>
                <View style={[styles.box8, language.selected ? styles.codeOn : styles.codeOff]}>
                  {language.selected ? (
                    <SvgXml xml={art.checkArt("#FFB200")} width={12} height={12} />
                  ) : null}
                  {language.selected ? null : <Text style={styles.label}>{language.short}</Text>}
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.box9}>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/home-member")}
          accessibilityRole="link"
        >
          <Text style={styles.label2}>{s.startLearning}</Text>
          <View style={styles.box10}>
            <SvgXml xml={art.art4} width={18} height={18} />
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
  step4Of4Box: {
    flexDirection: "row",
    height: 28,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 6,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
  },
  box: {
    width: 8,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 4,
  },
  box2: {
    width: 24,
    height: 8,
    backgroundColor: "#FFB200",
    borderRadius: 4,
  },
  box3: {
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
  box4: {
    flexDirection: "column",
    gap: 8,
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0a0e2e",
    fontSize: 26,
    letterSpacing: -0.9,
    lineHeight: 29.9,
  },
  text: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 14,
    lineHeight: 20.3,
  },
  text2: {
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
  text3: {
    fontFamily: font.manrope[700],
    color: "#0A0E2E",
    fontSize: 17,
  },
  box6: {
    width: 2,
    height: 22,
    backgroundColor: "#0E1C91",
    borderRadius: 1,
  },
  box7: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  text4: {
    fontFamily: font.manrope[700],
    color: "#A2A9C8",
    fontSize: 11,
  },
  ticketLanguageBox: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  button: {
    flexDirection: "row",
    position: "relative",
    height: 52,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
    width: 171,
    borderRadius: 16,
    borderWidth: 1,
  },
  buttonOn: {
    backgroundColor: "#FFB200",
    borderColor: "#FFB200",
    boxShadow: "0 10px 18px -10px rgba(176,122,0,0.6)",
  },
  buttonOff: { backgroundColor: "#F3F5FC", borderColor: "transparent" },
  codeOn: { backgroundColor: "#0A0E2E" },
  codeOff: { backgroundColor: "#FFFFFF" },
  text5: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
    textAlign: "left",
  },
  box8: {
    flexDirection: "row",
    height: 20,
    minWidth: 20,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  label: {
    fontFamily: font.spaceGrotesk[700],
    color: "#566086",
    fontSize: 11,
    textAlign: "left",
  },
  box9: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
    gap: 16,
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
  label2: {
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
