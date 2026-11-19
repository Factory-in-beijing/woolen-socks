import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/mistakesEmpty.art";
import { strings } from "../strings";

const s = strings.mistakesEmpty;

export function MistakesEmptyScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/tickets")}
          accessibilityRole="link"
          accessibilityLabel="Back"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <View style={styles.box}>
          <Text style={styles.label}>{s.mistakes}</Text>
        </View>
        <View style={styles.box2} />
      </View>
      <View style={styles.box3}>
        <View style={styles.box4}>
          <View style={styles.box5} />
          <View style={styles.box6} />
          <View style={styles.box7}>
            <SvgXml xml={art.art2} width={100} height={100} />
          </View>
          <View style={styles.box8}>
            <SvgXml xml={art.art3} width={44} height={44} />
          </View>
          <View style={styles.box9}>
            <SvgXml xml={art.art4} width={44} height={44} />
          </View>
        </View>
        <View style={styles.box10}>
          <Text style={styles.title}>{s.nothingToFix}</Text>
          <Text style={styles.text}>{s.everyTicketAndSign}</Text>
        </View>
      </View>
      <View style={styles.box11}>
        <Text style={styles.text2}>{s.howItWorks}</Text>
        <View style={styles.box12}>
          <View style={styles.box13}>
            <Text style={styles.label2}>{s.n1}</Text>
          </View>
          <Text style={styles.text3}>{s.answerATicketOr}</Text>
        </View>
        <View style={styles.box12}>
          <View style={styles.box13}>
            <Text style={styles.label2}>{s.n2}</Text>
          </View>
          <Text style={styles.text3}>{s.getItRightTwice}</Text>
        </View>
        <View style={styles.box12}>
          <View style={styles.box13}>
            <Text style={styles.label2}>{s.n3}</Text>
          </View>
          <Text style={styles.text3}>{s.fewerMistakesHigherExam}</Text>
        </View>
      </View>
      <Pressable
        style={styles.link2}
        onPress={() => router.push("/tickets")}
        accessibilityRole="link"
      >
        <Text style={styles.text4}>{s.practiseTickets}</Text>
        <View style={styles.box14}>
          <SvgXml xml={art.art5} width={18} height={18} />
        </View>
      </Pressable>
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
  box: {
    flexDirection: "column",
    width: 73,
    gap: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 17,
    letterSpacing: -0.3,
  },
  box2: {
    width: 44,
    height: 44,
  },
  box3: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    top: 122,
    width: 350,
    gap: 20,
    alignItems: "center",
  },
  box4: {
    position: "relative",
    width: 240,
    height: 200,
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
  },
  box5: {
    position: "absolute",
    left: 30,
    top: 10,
    width: 180,
    height: 180,
    backgroundImage: "linear-gradient(160deg, #FFFFFF 0%, #EEF1FF 100%)",
    borderRadius: 90,
    boxShadow: "inset 0 0 0 1px rgba(14,28,145,0.06)",
  },
  box6: {
    position: "absolute",
    left: 52,
    top: 176,
    width: 136,
    height: 14,
    backgroundColor: "rgba(14,28,145,0.10)",
    borderRadius: 9999,
  },
  box7: {
    flexDirection: "row",
    position: "absolute",
    left: 70,
    top: 40,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  box8: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    top: 28,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    boxShadow: "0 12px 24px -12px rgba(14,28,145,0.35)",
  },
  box9: {
    flexDirection: "row",
    position: "absolute",
    top: 104,
    right: 0,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    boxShadow: "0 12px 24px -12px rgba(14,28,145,0.35)",
  },
  box10: {
    flexDirection: "column",
    gap: 8,
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 26,
    letterSpacing: -0.8,
    lineHeight: 29.9,
    textAlign: "center",
  },
  text: {
    fontFamily: font.manrope[600],
    color: "#566086",
    fontSize: 15,
    lineHeight: 21.75,
    textAlign: "center",
  },
  box11: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    top: 560,
    width: 350,
    padding: 16,
    gap: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  text2: {
    fontFamily: font.manrope[800],
    color: "#8A93B8",
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  box12: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  box13: {
    flexDirection: "row",
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#0E1C91",
    borderRadius: 14,
  },
  label2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFB200",
    fontSize: 13,
  },
  text3: {
    fontFamily: font.manrope[700],
    color: "#3A4270",
    fontSize: 14,
    lineHeight: 18.9,
  },
  link2: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 760,
    width: 350,
    height: 60,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundImage: "radial-gradient(120% 140% at 0% 0%, #2638DA 0%, #0E1C91 60%, #08106A 100%)",
    borderRadius: 30,
    boxShadow: "0 14px 24px -14px rgba(14,28,145,0.6)",
  },
  text4: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
    letterSpacing: -0.2,
    textDecorationLine: "none",
  },
  box14: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 22,
  },
});
