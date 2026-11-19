import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/payFailed.art";
import { strings } from "../strings";

const s = strings.payFailed;

export function PayFailedScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/get-course")}
          accessibilityRole="link"
          accessibilityLabel="Close"
        >
          <SvgXml xml={art.art1} width={18} height={18} />
        </Pressable>
        <Text style={styles.text}></Text>
        <View style={styles.box} />
      </View>
      <SvgXml xml={art.art2} width={390} height={300} style={styles.artBox} />
      <View style={styles.box2}>
        <SvgXml xml={art.art3} width={36} height={36} />
      </View>
      <View style={styles.section}>
        <View style={styles.box3}>
          <Text style={styles.title}>{s.paymentDidntGoThrough}</Text>
        </View>
        <View style={styles.box4}>
          <Text style={styles.text2}>{s.commonReasons}</Text>
          <View style={styles.box5}>
            <View style={styles.box6}>
              <View style={styles.box7}>
                <SvgXml xml={art.art4} width={29} height={29} />
              </View>
              <Text style={styles.text3}>{s.notEnoughMoneyOn}</Text>
              <View style={styles.box8} />
            </View>
            <View style={styles.box6}>
              <View style={styles.box7}>
                <SvgXml xml={art.art5} width={29} height={29} />
              </View>
              <Text style={styles.text3}>{s.theSmsCodeExpired}</Text>
              <View style={styles.box8} />
            </View>
            <View style={styles.box6}>
              <View style={styles.box7}>
                <SvgXml xml={art.art6} width={29} height={29} />
              </View>
              <Text style={styles.text3}>{s.theConnectionDropped}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.box9}>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/pay-card")}
          accessibilityRole="link"
        >
          <Text style={styles.label}>{s.tryAgain}</Text>
          <View style={styles.box10}>
            <SvgXml xml={art.art7} width={18} height={18} />
          </View>
        </Pressable>
        <View style={styles.box11}>
          <Pressable
            style={styles.link3}
            onPress={() => router.push("/get-course")}
            accessibilityRole="link"
          >
            <Text style={styles.label2}>{s.otherPayment}</Text>
          </Pressable>
          <Pressable
            style={styles.link3}
            onPress={() => router.push("/help")}
            accessibilityRole="link"
          >
            <Text style={styles.label3}>{s.getHelp}</Text>
          </Pressable>
        </View>
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
  artBox: {
    position: "absolute",
    left: 0,
    top: 80,
  },
  box2: {
    flexDirection: "row",
    position: "absolute",
    left: 155,
    top: 144,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 40,
    boxShadow: "0 16px 28px -14px rgba(176,122,0,0.8)",
  },
  section: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    top: 276,
    width: 350,
    gap: 24,
  },
  box3: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 26,
    letterSpacing: -0.9,
    lineHeight: 29.9,
    textAlign: "center",
  },
  box4: {
    flexDirection: "column",
    gap: 12,
  },
  text2: {
    fontFamily: font.manrope[800],
    color: "#8A93B8",
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  box5: {
    flexDirection: "column",
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box6: {
    flexDirection: "row",
    position: "relative",
    minHeight: 56,
    padding: 12,
    gap: 12,
    alignItems: "center",
  },
  box7: {
    flexDirection: "row",
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundImage: "linear-gradient(145deg, #F4F6FF 0%, #E3E8FF 100%)",
    borderRadius: 12,
    boxShadow: "inset 0 0 0 1px rgba(14,28,145,0.05)",
  },
  text3: {
    fontFamily: font.manrope[700],
    color: "#0A0E2E",
    fontSize: 14,
    lineHeight: 18.2,
  },
  box8: {
    position: "absolute",
    left: 60,
    right: 12,
    bottom: 0,
    height: 1,
    backgroundColor: "#EEF0F8",
  },
  box9: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
    gap: 8,
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
  label: {
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
  box11: {
    flexDirection: "row",
    gap: 8,
  },
  link3: {
    flexDirection: "row",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 24,
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    textDecorationLine: "none",
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 14,
    textDecorationLine: "none",
  },
});
