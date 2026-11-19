import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/resetCode.art";
import { strings } from "../strings";

const s = strings.resetCode;

export function ResetCodeScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/forgot-password")}
          accessibilityRole="link"
          accessibilityLabel="Previous step"
        >
          <SvgXml xml={art.art2} width={20} height={20} />
        </Pressable>
        <View style={styles.step2Of3Box}>
          <View style={styles.box} />
          <View style={styles.box2} />
          <View style={styles.box3} />
        </View>
        <View style={styles.box4} />
      </View>
      <View style={styles.section}>
        <View style={styles.box5}>
          <Text style={styles.title}>{s.enterTheCode}</Text>
          <Text style={styles.text3}>
            {s.sentTo} <Text style={styles.text}>{s.n9955551234}</Text> {s.text}{" "}
            <Text style={styles.text2} onPress={() => router.push("/forgot-password")}>
              {s.change}
            </Text>
          </Text>
        </View>
        <View style={styles.n6DigitCodeBox}>
          <View style={styles.box6}>
            <Text style={styles.label}>{s.n4}</Text>
          </View>
          <View style={styles.box6}>
            <Text style={styles.label}>{s.n8}</Text>
          </View>
          <View style={styles.box6}>
            <Text style={styles.label}>{s.n2}</Text>
          </View>
          <View style={styles.box6}>
            <Text style={styles.label}>{s.n9}</Text>
          </View>
          <View style={styles.box6}>
            <Text style={styles.label}>{s.n1}</Text>
          </View>
          <View style={styles.box6}>
            <Text style={styles.label}>{s.n5}</Text>
          </View>
        </View>
        <View style={styles.box7}>
          <SvgXml xml={art.art3} width={14} height={14} />
          <Text style={styles.label2}>{s.resendIn}</Text>
          <Text style={styles.text4}>{s.n042}</Text>
        </View>
      </View>
      <View style={styles.box8}>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/new-password")}
          accessibilityRole="link"
        >
          <Text style={styles.label3}>{s.verify}</Text>
          <View style={styles.box9}>
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
  step2Of3Box: {
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
    width: 8,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
  },
  box4: {
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
  box5: {
    flexDirection: "column",
    gap: 8,
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 26,
    letterSpacing: -0.9,
    lineHeight: 29.9,
  },
  text: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
  },
  text2: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    textDecorationLine: "none",
  },
  text3: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 14,
    lineHeight: 20.3,
  },
  n6DigitCodeBox: {
    flexDirection: "row",
    gap: 8,
  },
  box6: {
    flexDirection: "row",
    height: 60,
    minWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE2F5",
    borderRadius: 16,
  },
  label: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 24,
  },
  box7: {
    flexDirection: "row",
    height: 32,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 8,
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#F3F5FC",
    borderRadius: 16,
  },
  label2: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 13,
  },
  text4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 13,
  },
  box8: {
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
  label3: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    textDecorationLine: "none",
  },
  box9: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
});
