import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/myCourseExpired.art";
import { strings } from "../strings";

const s = strings.myCourseExpired;

export function MyCourseExpiredScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <SvgXml xml={art.art1} width={0} height={0} style={styles.artBox} />
      <View style={styles.header}>
        <Text style={styles.title}>{s.myCourse}</Text>
        <View style={styles.box}>
          <View style={styles.box2}>
            <SvgXml xml={art.art2} width={30} height={19} />
          </View>
          <Text style={styles.text}>{s.bB1}</Text>
        </View>
      </View>
      <ScrollView style={styles.box3} showsVerticalScrollIndicator={false}>
        <View style={styles.box4}>
          <View style={styles.section}>
            <SvgXml xml={art.art3} width={350} height={300} style={styles.artBox2} />
            <View style={styles.box5}>
              <View style={styles.box6} />
              <Text style={styles.label}>{s.videoCourse}</Text>
            </View>
            <View style={styles.box7}>
              <View style={styles.box8}>
                <Text style={styles.text3}>
                  {s.yourVideoAccess}
                  {"\n"}
                  <Text style={styles.text2}>{s.hasEnded}</Text>
                </Text>
                <Text style={styles.text4}>{s.yourProgressIsSaved}</Text>
              </View>
              <Pressable
                style={styles.link}
                onPress={() => router.push("/get-course")}
                accessibilityRole="link"
              >
                <Text style={styles.label2}>{s.renewAccess}</Text>
                <View style={styles.box9}>
                  <SvgXml xml={art.art4} width={16} height={16} />
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box10}>
              <Text style={styles.heading}>{s.yourProgress}</Text>
              <View style={styles.box11}>
                <SvgXml xml={art.art5} width={12} height={12} />
                <Text style={styles.label3}>{s.saved}</Text>
              </View>
            </View>
            <View style={styles.box12}>
              <View style={styles.box13}>
                <SvgXml xml={art.art6} width={76} height={76} style={styles.artBox3} />
                <View style={styles.box14}>
                  <Text style={styles.label4}>{s.n31}</Text>
                </View>
              </View>
              <View style={styles.box15}>
                <Text style={styles.text5}>{s.n11Of36Lessons}</Text>
                <Text style={styles.text6}>
                  {s.youStoppedAtModule}
                  {"\n"}
                  {s.extraLightSections}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box10}>
              <Text style={styles.heading}>{s.stillFreeForYou}</Text>
              <Text style={styles.text7}>{s.keepPractising}</Text>
            </View>
            <View style={styles.box16}>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/tickets")}
                accessibilityRole="link"
                accessibilityLabel="Tickets, free, 921 tickets in 6 languages"
              >
                <View style={styles.box17}>
                  <View style={styles.box18}>
                    <SvgXml xml={art.art7} width={10} height={10} />
                    <Text style={styles.label5}>{s.free}</Text>
                  </View>
                </View>
                <View style={styles.box19} />
                <SvgXml xml={art.art8} width={150} height={132} style={styles.artBox4} />
                <View style={styles.box20}>
                  <View style={styles.box21}>
                    <Text style={styles.text8}>{s.tickets}</Text>
                    <Text style={styles.text9}>{s.n921Tickets}</Text>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/quick-test")}
                accessibilityRole="link"
                accessibilityLabel="Quick test, free, exam-style"
              >
                <View style={styles.box22}>
                  <SvgXml xml={art.art9} width={52} height={58} style={styles.artBox5} />
                  <View style={styles.box23}>
                    <SvgXml xml={art.art10} width={10} height={10} />
                    <Text style={styles.label6}>{s.free}</Text>
                  </View>
                </View>
                <View style={styles.box24}>
                  <Text style={styles.text10}>{s.quickTest}</Text>
                  <Text style={styles.text11}>{s.examStyle30Qs}</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.link4}
                onPress={() => router.push("/road-signs-v3")}
                accessibilityRole="link"
                accessibilityLabel="Road signs, free, all groups with quizzes"
              >
                <View style={styles.box22}>
                  <SvgXml xml={art.art11} width={52} height={58} style={styles.artBox5} />
                  <View style={styles.box25}>
                    <SvgXml xml={art.art12} width={10} height={10} />
                    <Text style={styles.label7}>{s.free}</Text>
                  </View>
                </View>
                <View style={styles.box24}>
                  <Text style={styles.text12}>{s.roadSigns}</Text>
                  <Text style={styles.text13}>{s.n8GroupsQuizzes}</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box26} />
      <View style={styles.nav}>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
          accessibilityLabel="Home"
        >
          <SvgXml xml={art.art13} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link6}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art14} width={20} height={20} />
          <Text style={styles.label8}>{s.myCourse}</Text>
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art15} width={22} height={22} />
        </Pressable>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  artBox: {
    position: "absolute",
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
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 26,
    letterSpacing: -0.8,
    lineHeight: 26,
  },
  box: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    right: 0,
    height: 44,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 7,
    margin: 0,
    gap: 8,
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
  box2: {
    flexDirection: "row",
    width: 36,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
  },
  text: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 14,
  },
  box3: {
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 630,
  },
  box4: {
    flexDirection: "column",
    paddingBottom: 16,
    gap: 32,
  },
  section: {
    flexDirection: "column",
    position: "relative",
    height: 300,
    padding: 20,
    justifyContent: "space-between",
    flexShrink: 0,
    overflow: "hidden",
    backgroundImage: "radial-gradient(120% 90% at 50% 0%, #2638DA 0%, #0E1C91 55%, #08106A 100%)",
    borderRadius: 32,
    boxShadow: "0 24px 40px -18px rgba(14,28,145,0.55)",
  },
  artBox2: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box5: {
    flexDirection: "row",
    position: "relative",
    height: 28,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 8,
    alignItems: "center",
    alignSelf: "flex-start",
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
    flexDirection: "column",
    position: "relative",
    gap: 16,
  },
  box8: {
    flexDirection: "column",
    gap: 8,
  },
  text2: {
    color: "#FFB200",
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 26,
    letterSpacing: -0.9,
    lineHeight: 29.12,
  },
  text4: {
    fontFamily: font.manrope[600],
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    lineHeight: 20.3,
  },
  link: {
    flexDirection: "row",
    height: 56,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 22,
    gap: 12,
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFB200",
    borderRadius: 28,
    boxShadow: "0 14px 26px -14px rgba(0,0,0,0.5)",
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
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
  section2: {
    flexDirection: "column",
    gap: 12,
  },
  box10: {
    flexDirection: "row",
    height: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 17,
    letterSpacing: -0.4,
  },
  box11: {
    flexDirection: "row",
    height: 24,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 6,
    alignItems: "center",
    backgroundColor: "#EEF1FF",
    borderRadius: 12,
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 11,
  },
  box12: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box13: {
    position: "relative",
    width: 76,
    height: 76,
    flexShrink: 0,
  },
  artBox3: {
    transform: "rotate(-90deg)",
  },
  box14: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  label4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 17,
  },
  box15: {
    flexDirection: "column",
    minWidth: 0,
    gap: 8,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    lineHeight: 18.75,
  },
  text6: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    lineHeight: 16.2,
  },
  text7: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 13,
  },
  box16: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  link2: {
    flexDirection: "column",
    position: "relative",
    width: 169,
    height: 256,
    padding: 14,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#DDE2FA",
    borderRadius: 24,
  },
  box17: {
    position: "relative",
    alignSelf: "flex-start",
  },
  box18: {
    flexDirection: "row",
    height: 24,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 4,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  label5: {
    fontFamily: font.manrope[800],
    color: "#12A06A",
    fontSize: 11,
    letterSpacing: 0.3,
    textDecorationLine: "none",
  },
  box19: {
    position: "absolute",
    left: 34,
    top: 166,
    width: 100,
    height: 12,
    backgroundColor: "rgba(14,28,145,0.18)",
    borderRadius: 9999,
  },
  artBox4: {
    position: "absolute",
    left: 10,
    top: 40,
  },
  box20: {
    flexDirection: "column",
    position: "relative",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  box21: {
    flexDirection: "column",
    gap: 4,
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 19,
    letterSpacing: -0.5,
    lineHeight: 19,
    textDecorationLine: "none",
  },
  text9: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 12,
    lineHeight: 14.4,
    textDecorationLine: "none",
  },
  link3: {
    flexDirection: "column",
    position: "relative",
    width: 169,
    height: 122,
    padding: 14,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#FFB200",
    borderRadius: 24,
    boxShadow: "0 14px 24px -16px rgba(176,122,0,0.8)",
  },
  box22: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  artBox5: {
    flexShrink: 0,
  },
  box23: {
    flexDirection: "row",
    height: 24,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 4,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 12,
  },
  label6: {
    fontFamily: font.manrope[800],
    color: "#0A7A50",
    fontSize: 11,
    letterSpacing: 0.3,
    textDecorationLine: "none",
  },
  box24: {
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
  },
  text10: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    letterSpacing: -0.3,
    lineHeight: 16,
    textDecorationLine: "none",
  },
  text11: {
    fontFamily: font.manrope[700],
    color: "rgba(10,14,46,0.7)",
    fontSize: 11,
    lineHeight: 13.2,
    textDecorationLine: "none",
  },
  link4: {
    flexDirection: "column",
    position: "relative",
    width: 169,
    height: 122,
    padding: 14,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundImage: "linear-gradient(160deg, #1A2CC4 0%, #0E1C91 70%)",
    borderRadius: 24,
    boxShadow: "0 14px 24px -16px rgba(14,28,145,0.9)",
  },
  box25: {
    flexDirection: "row",
    height: 24,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 4,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 12,
  },
  label7: {
    fontFamily: font.manrope[800],
    color: "#7CE3B4",
    fontSize: 11,
    letterSpacing: 0.3,
    textDecorationLine: "none",
  },
  text12: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
    letterSpacing: -0.3,
    lineHeight: 16,
    textDecorationLine: "none",
  },
  text13: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.72)",
    fontSize: 11,
    lineHeight: 13.2,
    textDecorationLine: "none",
  },
  box26: {
    position: "absolute",
    left: 0,
    top: 722,
    right: 0,
    height: 22,
    backgroundImage: "linear-gradient(180deg, rgba(246,247,253,0), #F6F7FD)",
  },
  nav: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 24,
    height: 60,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 6,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 30,
    boxShadow: "0 14px 34px rgba(10,14,46,0.3)",
  },
  link5: {
    flexDirection: "row",
    width: 86,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  link6: {
    flexDirection: "row",
    height: 48,
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
  },
  label8: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    textDecorationLine: "none",
  },
});
