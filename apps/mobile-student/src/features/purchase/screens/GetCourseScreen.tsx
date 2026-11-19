import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useGetCourseViewModel } from "../hooks/useGetCourseViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/getCourse.art";
import { strings } from "../strings";

const s = strings.getCourse;

export function GetCourseScreen() {
  const router = useRouter();
  const vm = useGetCourseViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/home")}
          accessibilityRole="link"
          accessibilityLabel="Back to Home"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.getTheCourse}</Text>
        <View style={styles.box} />
      </View>
      <ScrollView
        style={styles.box2}
        showsVerticalScrollIndicator={false}
        ref={vm.scrollRef}
        onScroll={vm.onScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.box3}>
          <View style={styles.section}>
            <SvgXml xml={art.art2} width={350} height={196} style={styles.artBox} />
            <View style={styles.box4}>
              <View style={styles.box5}>
                <View style={styles.box6} />
                <Text style={styles.label}>{s.categoryBB1}</Text>
              </View>
              <View style={styles.box7}>
                <SvgXml xml={art.art3} width={18} height={18} />
              </View>
            </View>
            <View style={styles.box8}>
              <Text style={styles.text3}>
                {s.theWholeTheory}
                {"\n"}
                <Text style={styles.text2}>{s.explainedOnVideos}</Text>
              </Text>
              <Text style={styles.text4}>{s.clearLessonsAtYour}</Text>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box9}>
              <Text style={styles.label2}>{s.whatYouGet}</Text>
            </View>
            <View style={styles.box10}>
              <View style={styles.box11}>
                <View style={styles.box12}>
                  <Text style={styles.text5}>{s.n36}</Text>
                  <Text style={styles.text6}>{s.videoLessons}</Text>
                </View>
                <View style={styles.box13}>
                  <Text style={styles.text5}>{s.n921}</Text>
                  <Text style={styles.text6}>{s.tickets}</Text>
                </View>
                <View style={styles.box13}>
                  <Text style={styles.text5}>{s.n6}</Text>
                  <Text style={styles.text6}>{s.ticketLanguages}</Text>
                </View>
              </View>
              <View style={styles.box14} />
              <View style={styles.box15}>
                <View style={styles.box16}>
                  <View style={styles.box17}>
                    <SvgXml xml={art.art4} width={12} height={12} />
                  </View>
                  <Text style={styles.text7}>{s.videoLessonsInGeorgian}</Text>
                </View>
                <View style={styles.box16}>
                  <View style={styles.box17}>
                    <SvgXml xml={art.art5} width={12} height={12} />
                  </View>
                  <Text style={styles.text7}>{s.everyLessonIsLinked}</Text>
                </View>
                <View style={styles.box16}>
                  <View style={styles.box17}>
                    <SvgXml xml={art.art6} width={12} height={12} />
                  </View>
                  <Text style={styles.text7}>{s.shortLessons515}</Text>
                </View>
                <View style={styles.box16}>
                  <View style={styles.box17}>
                    <SvgXml xml={art.art7} width={12} height={12} />
                  </View>
                  <Text style={styles.text7}>{s.watchOnPhoneOr}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box9}>
              <Text style={styles.label2}>{s.payment}</Text>
            </View>
            <View style={styles.box18}>
              <View style={styles.box19}>
                <View style={styles.box20}>
                  <Text style={styles.text8}>{s.fullVideoCourse}</Text>
                  <Text style={styles.text9}>{s.oneTimePaymentNo}</Text>
                </View>
                <View style={styles.box21}>
                  <Text style={styles.text10}>{vm.price}</Text>
                </View>
              </View>
              <View style={styles.section2}>
                <Pressable
                  style={styles.link2}
                  onPress={() => router.push("/pay-success")}
                  accessibilityRole="link"
                  accessibilityLabel="Buy with Apple Pay"
                >
                  <SvgXml xml={art.applePayArt} width="100%" height={50} />
                </Pressable>
                <Pressable
                  style={styles.link2}
                  onPress={() => router.push("/pay-success")}
                  accessibilityRole="link"
                  accessibilityLabel="Buy with Google Pay"
                >
                  <SvgXml xml={art.googlePayArt} width="100%" height={50} />
                </Pressable>
                <View style={styles.box16}>
                  <View style={styles.box22} />
                  <Text style={styles.label3}>{s.or}</Text>
                  <View style={styles.box22} />
                </View>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/pay-card")}
                  accessibilityRole="link"
                  accessibilityLabel={`Pay ${vm.price} with a bank card`}
                >
                  <SvgXml xml={art.art8} width={20} height={20} />
                  <Text style={styles.label4}>{s.payWithCard}</Text>
                </Pressable>
              </View>
              <View style={styles.box23}>
                <SvgXml xml={art.art9} width={14} height={14} />
                <Text style={styles.label3}>{s.securePaymentVisaMastercard}</Text>
              </View>
              <Text style={styles.text11}>{s.includes2MonthsOf}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box24} />
      <Pressable
        style={[
          styles.link4,
          {
            opacity: vm.hintOpacity,
            transform: [{ translateX: "-50%" }, { translateY: vm.hintOffsetY }],
          },
        ]}
        onPress={vm.scrollToPayment}
        accessibilityRole="link"
        accessibilityLabel="Scroll down to payment"
        pointerEvents={vm.hintTouchable ? "auto" : "none"}
      >
        <Text style={styles.text13}>
          {s.paymentBelow} <Text style={styles.text12}>{`· ${vm.price}`}</Text>
        </Text>
        <View style={styles.box25}>
          <SvgXml xml={art.art10} width={14} height={14} />
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
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 630,
  },
  box3: {
    flexDirection: "column",
    paddingBottom: 16,
    gap: 24,
  },
  section: {
    flexDirection: "column",
    position: "relative",
    height: 196,
    padding: 20,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundImage: "linear-gradient(135deg, #1A2CC4 0%, #0E1C91 55%, #091470 100%)",
    borderRadius: 28,
    boxShadow: "0 22px 32px -14px rgba(14,28,145,0.45)",
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box4: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box5: {
    flexDirection: "row",
    height: 28,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    borderRadius: 14,
  },
  box6: {
    width: 8,
    height: 8,
    backgroundColor: "#FFB200",
    borderRadius: 4,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 12,
  },
  box7: {
    flexDirection: "row",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 24,
    boxShadow: "0 0 0 6px rgba(255,255,255,0.12)",
  },
  box8: {
    flexDirection: "column",
    position: "relative",
    gap: 8,
  },
  text2: {
    color: "rgb(255, 178, 0)",
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 26,
    letterSpacing: -0.9,
    lineHeight: 29.12,
  },
  text4: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.78)",
    fontSize: 13,
  },
  section2: {
    flexDirection: "column",
    gap: 12,
  },
  box9: {
    flexDirection: "row",
    height: 20,
    margin: 0,
    alignItems: "center",
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 17,
    letterSpacing: -0.4,
  },
  box10: {
    flexDirection: "column",
    padding: 20,
    gap: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 28,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box11: {
    flexDirection: "row",
  },
  box12: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text5: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 30,
    letterSpacing: -1,
    lineHeight: 30,
  },
  text6: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    lineHeight: 12,
  },
  box13: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderLeftColor: "#EEF0F8",
  },
  box14: {
    height: 1,
    backgroundColor: "#EEF0F8",
  },
  box15: {
    flexDirection: "column",
    gap: 16,
  },
  box16: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  box17: {
    flexDirection: "row",
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFB200",
    borderRadius: 11,
  },
  text7: {
    fontFamily: font.manrope[700],
    color: "#2A3158",
    fontSize: 14,
    lineHeight: 18.9,
  },
  box18: {
    flexDirection: "column",
    gap: 24,
  },
  box19: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 8px 20px -14px rgba(14,28,145,0.18)",
  },
  box20: {
    flexDirection: "column",
    gap: 4,
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    lineHeight: 18,
  },
  text9: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    lineHeight: 15.6,
  },
  box21: {
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-end",
  },
  text10: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 22,
    letterSpacing: -0.6,
    lineHeight: 22,
  },
  link2: {
    borderRadius: 26,
  },
  image: {
    width: "100%",
  },
  box22: {
    height: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#E2E6F4",
  },
  label3: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 12,
  },
  link3: {
    flexDirection: "row",
    height: 52,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E1C91",
    borderRadius: 26,
    boxShadow: "0 12px 24px -12px rgba(14,28,145,0.55)",
  },
  label4: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
    textDecorationLine: "none",
  },
  box23: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text11: {
    marginTop: -16,
    fontFamily: font.manrope[600],
    color: "#A2A9C8",
    fontSize: 11,
    lineHeight: 15.4,
    textAlign: "center",
  },
  box24: {
    position: "absolute",
    left: 0,
    top: 722,
    right: 0,
    height: 22,
    backgroundImage: "linear-gradient(180deg, rgba(246,247,253,0), #F6F7FD)",
  },
  link4: {
    flexDirection: "row",
    position: "absolute",
    left: "50%",
    bottom: 32,
    height: 44,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 20,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
    boxShadow: "0 12px 28px rgba(10,14,46,0.28)",
  },
  text12: {
    fontFamily: font.spaceGrotesk[600],
    color: "rgba(255,255,255,0.6)",
  },
  text13: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 14,
    textDecorationLine: "none",
  },
  box25: {
    flexDirection: "row",
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 14,
  },
});
