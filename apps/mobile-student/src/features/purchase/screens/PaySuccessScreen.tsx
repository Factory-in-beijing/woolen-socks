import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { formatGel } from "@/lib/money";
import { useCourseOffer } from "@/data/courseOffer";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/paySuccess.art";
import { strings } from "../strings";

const s = strings.paySuccess;

export function PaySuccessScreen() {
  const offer = useCourseOffer();
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <SvgXml xml={art.art1} width={390} height={420} style={styles.artBox} />
      <View style={styles.box}>
        <SvgXml xml={art.art2} width={44} height={44} />
      </View>
      <View style={styles.section}>
        <View style={styles.box2}>
          <Text style={styles.title}>{s.youreIn}</Text>
          <Text style={styles.text}>
            {s.theFullVideoCourse}
            {"\n"}
            {s.yourFirstLessonIs}
          </Text>
        </View>
        <View style={styles.box3}>
          <View style={styles.box4}>
            <Text style={styles.text2}>{s.course}</Text>
            <Text style={styles.text3}>{s.videoCourseBB1}</Text>
          </View>
          <View style={styles.box5}>
            <Text style={styles.text2}>{s.paidWith}</Text>
            <Text style={styles.text3}>{s.applePay}</Text>
          </View>
          <View style={styles.box5}>
            <Text style={styles.text2}>{s.date}</Text>
            <Text style={styles.text3}>{s.n15Nov2026}</Text>
          </View>
          <View style={styles.box6}>
            <Text style={styles.text4}>{s.totalPaid}</Text>
            <Text style={styles.text5}>{formatGel(offer.price)}</Text>
          </View>
        </View>
        <View style={styles.box7}>
          <SvgXml xml={art.art3} width={14} height={14} />
          <Text style={styles.label}>{s.receiptSentBySms}</Text>
        </View>
      </View>
      <View style={styles.box8}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/notif-allow-pay")}
          accessibilityRole="link"
        >
          <Text style={styles.label2}>{s.startTheCourse}</Text>
          <View style={styles.box9}>
            <SvgXml xml={art.art4} width={18} height={18} />
          </View>
        </Pressable>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
        >
          <Text style={styles.label3}>{s.backToHome}</Text>
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
  box: {
    flexDirection: "row",
    position: "absolute",
    left: 147,
    top: 148,
    width: 96,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e1c91",
    borderRadius: 48,
  },
  section: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    top: 340,
    width: 350,
    gap: 24,
    alignItems: "center",
  },
  box2: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 30,
    letterSpacing: -1.1,
    lineHeight: 33,
    textAlign: "center",
  },
  text: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 15,
    lineHeight: 21.75,
    textAlign: "center",
  },
  box3: {
    flexDirection: "column",
    width: "100%",
    paddingTop: 4,
    paddingRight: 16,
    paddingBottom: 4,
    paddingLeft: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box4: {
    flexDirection: "row",
    paddingTop: 12,
    paddingRight: 0,
    paddingBottom: 12,
    paddingLeft: 0,
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text2: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 13,
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    textAlign: "right",
  },
  box5: {
    flexDirection: "row",
    paddingTop: 12,
    paddingRight: 0,
    paddingBottom: 12,
    paddingLeft: 0,
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEF0F8",
  },
  box6: {
    flexDirection: "row",
    paddingTop: 12,
    paddingRight: 0,
    paddingBottom: 12,
    paddingLeft: 0,
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#DDE2F5",
  },
  text4: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 13,
  },
  text5: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 20,
    letterSpacing: -0.4,
  },
  box7: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  label: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 12,
  },
  box8: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
    gap: 8,
  },
  link: {
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
  box9: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
  link2: {
    flexDirection: "row",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 15,
    textDecorationLine: "none",
  },
});
