import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/homeMember.art";
import { strings } from "../strings";

const s = strings.homeMember;

export function HomeMemberScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <View style={styles.box}>
            <Text style={styles.label}>{s.nb}</Text>
          </View>
          <View style={styles.box2}>
            <Text style={styles.text}>{s.goodEvening}</Text>
            <Text style={styles.text2}>{s.nino}</Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/notif-allow")}
          accessibilityRole="link"
          accessibilityLabel="Reminders"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
          <View style={styles.box3} />
        </Pressable>
      </View>
      <View style={styles.section}>
        <SvgXml xml={art.art2} width={350} height={306} style={styles.artBox} />
        <View style={styles.box4}>
          <View style={styles.box5} />
          <Text style={styles.label2}>{s.videoCourse}</Text>
        </View>
        <View style={styles.box6} />
        <View style={styles.box7}>
          <View style={styles.box8}>
            <View style={styles.box9} />
            <View style={styles.box10} />
          </View>
          <View style={styles.box11}>
            <SvgXml xml={art.art3} width={14} height={14} />
          </View>
          <View style={styles.box12}>
            <View style={styles.box13} />
          </View>
        </View>
        <View style={styles.box14}>
          <Text style={styles.label3}>
            {s.theWholeTheory} <Text style={styles.text3}>{s.explainedOnVideo}</Text>
          </Text>
        </View>
        <View style={styles.box15}>
          <Text style={styles.label4}>{s.clearLessonsAtYour}</Text>
        </View>
        <View style={styles.box16}>
          <Pressable
            style={styles.link3}
            onPress={() => router.push("/get-course")}
            accessibilityRole="link"
          >
            <Text style={styles.label5}>{s.getTheCourse}</Text>
            <View style={styles.box17}>
              <SvgXml xml={art.art4} width={18} height={18} />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.box18}>
        <Text style={styles.label6}>{s.theorySpace}</Text>
      </View>
      <Pressable
        style={styles.link4}
        onPress={() => router.push("/tickets")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art5} width={171} height={256} style={styles.artBox} />
        <View style={styles.box19} />
        <SvgXml xml={art.art6} width={146} height={128} style={styles.artBox2} />
        <View style={styles.box20}>
          <Text style={styles.label7}>{s.tickets}</Text>
        </View>
      </Pressable>
      <View style={styles.nav}>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/home-member")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art7} width={20} height={20} />
          <Text style={styles.label8}>{s.home}</Text>
        </Pressable>
        <Pressable
          style={styles.link6}
          onPress={() => router.push("/my-course-member")}
          accessibilityRole="link"
          accessibilityLabel="My course"
        >
          <SvgXml xml={art.art8} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link6}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art9} width={22} height={22} />
        </Pressable>
      </View>
      <Pressable
        style={styles.link7}
        onPress={() => router.push("/road-signs-v3")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art10} width={171} height={124} style={styles.artBox} />
        <View style={styles.box21} />
        <SvgXml xml={art.art11} width={68} height={62} style={styles.artBox3} />
        <View style={styles.box22}>
          <Text style={styles.label9}>{s.roadSigns}</Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.link8}
        onPress={() => router.push("/quick-test")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art12} width={171} height={124} style={styles.artBox} />
        <View style={styles.box23} />
        <SvgXml xml={art.art13} width={60} height={68} style={styles.artBox4} />
        <View style={styles.box22}>
          <Text style={styles.label7}>{s.quickTest}</Text>
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
    gap: 12,
    alignItems: "center",
  },
  box: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E1C91",
    borderRadius: 22,
    boxShadow: "0 0 0 3px #FFFFFF, 0 8px 16px -8px rgba(14,28,145,0.6)",
  },
  label: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFB200",
    fontSize: 15,
    textDecorationLine: "none",
  },
  box2: {
    flexDirection: "column",
    gap: 4,
  },
  text: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    lineHeight: 12,
    textDecorationLine: "none",
  },
  text2: {
    fontFamily: font.manrope[800],
    color: "inherit",
    fontSize: 18,
    letterSpacing: -0.4,
    lineHeight: 18,
    textDecorationLine: "none",
  },
  link2: {
    flexDirection: "row",
    position: "relative",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 22,
  },
  box3: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: "#FFB200",
    borderRadius: 4,
    boxShadow: "0 0 0 2px #FFFFFF",
  },
  section: {
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 306,
    overflow: "hidden",
    backgroundColor: "#0E1C91",
    borderRadius: 28,
    boxShadow: "0 18px 40px rgba(14,28,145,0.26)",
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box4: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 20,
    height: 30,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    borderRadius: 15,
  },
  box5: {
    width: 8,
    height: 8,
    backgroundColor: "#FFB200",
    borderRadius: 4,
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 12,
    letterSpacing: 0.2,
  },
  box6: {
    position: "absolute",
    top: 30,
    right: 44,
    width: 118,
    height: 78,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    transform: "rotate(-8deg)",
  },
  box7: {
    flexDirection: "column",
    position: "absolute",
    top: 20,
    right: 20,
    width: 132,
    height: 88,
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    boxShadow: "0 14px 28px rgba(5,10,60,0.36)",
    transform: "rotate(7deg)",
  },
  box8: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box9: {
    width: 44,
    height: 6,
    backgroundColor: "#DCE1F7",
    borderRadius: 3,
  },
  box10: {
    width: 16,
    height: 6,
    backgroundColor: "#DCE1F7",
    borderRadius: 3,
  },
  box11: {
    flexDirection: "row",
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FFB200",
    borderRadius: 18,
  },
  box12: {
    height: 5,
    overflow: "hidden",
    backgroundColor: "#E4E8F8",
    borderRadius: 3,
  },
  box13: {
    width: "46%",
    height: 5,
    backgroundColor: "#0E1C91",
    borderRadius: 3,
  },
  box14: {
    position: "absolute",
    left: 20,
    top: 124,
    right: 20,
    margin: 0,
  },
  text3: {
    color: "#FFB200",
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 28,
    letterSpacing: -1.1,
    lineHeight: 31.36,
  },
  box15: {
    position: "absolute",
    left: 20,
    top: 191,
    right: 20,
  },
  label4: {
    fontFamily: font.manrope[600],
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    lineHeight: 19.6,
  },
  box16: {
    flexDirection: "row",
    position: "absolute",
    left: 109,
    right: 20,
    bottom: 20,
    width: 221,
    height: 60,
    gap: 12,
    alignItems: "center",
  },
  link3: {
    flexDirection: "row",
    height: 60,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#FFB200",
    borderRadius: 30,
  },
  label5: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    textDecorationLine: "none",
  },
  box17: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
  box18: {
    position: "absolute",
    left: 20,
    top: 444,
    margin: 0,
  },
  label6: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 20,
    letterSpacing: -0.6,
    lineHeight: 24,
  },
  link4: {
    position: "absolute",
    left: 20,
    top: 480,
    width: 171,
    height: 256,
  },
  box19: {
    position: "absolute",
    left: 32,
    top: 139,
    width: 106,
    height: 13,
    backgroundColor: "rgba(14,28,145,0.2)",
    borderRadius: 9999,
  },
  artBox2: {
    position: "absolute",
    left: 11,
    top: 12,
  },
  box20: {
    position: "absolute",
    left: 0,
    top: 214,
    width: 171,
  },
  label7: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 19,
    letterSpacing: -0.4,
    textAlign: "center",
    textDecorationLine: "none",
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
  link6: {
    flexDirection: "row",
    width: 86,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  link7: {
    position: "absolute",
    left: 199,
    top: 612,
    width: 171,
    height: 124,
    margin: 0,
  },
  box21: {
    position: "absolute",
    left: 33,
    top: 63,
    width: 61,
    height: 10,
    backgroundColor: "rgba(5,10,60,0.35)",
    borderRadius: 9999,
  },
  artBox3: {
    position: "absolute",
    left: 31,
    top: -5,
  },
  box22: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 16,
  },
  label9: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 19,
    letterSpacing: -0.4,
    textAlign: "center",
    textDecorationLine: "none",
  },
  link8: {
    position: "absolute",
    left: 199,
    top: 480,
    width: 171,
    height: 124,
    margin: 0,
  },
  box23: {
    position: "absolute",
    left: 30,
    top: 63,
    width: 55,
    height: 10,
    backgroundColor: "rgba(90,60,0,0.28)",
    borderRadius: 9999,
  },
  artBox4: {
    position: "absolute",
    left: 26,
    top: -11,
  },
});
