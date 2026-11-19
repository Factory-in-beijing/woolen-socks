import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/homeSignedIn.art";
import { strings } from "../strings";

const s = strings.homeSignedIn;

export function HomeSignedInScreen() {
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
          onPress={() => router.push("/notifications2")}
          accessibilityRole="link"
          accessibilityLabel="Reminders"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
          <View style={styles.box3} />
        </Pressable>
      </View>
      <Pressable
        style={styles.link3}
        onPress={() => router.push("/lesson-player")}
        accessibilityRole="link"
        accessibilityLabel="Continue watching: Extra light sections"
      >
        <SvgXml xml={art.art2} width={350} height={220} style={styles.artBox} />
        <View style={styles.box4}>
          <View style={styles.box5}>
            <View style={styles.box6} />
            <Text style={styles.label2}>{s.continueWatching}</Text>
          </View>
          <Text style={styles.text3}>{s.course31}</Text>
        </View>
        <View style={styles.box7}>
          <View style={styles.box8}>
            <Text style={styles.text4}>{s.module3Lesson2}</Text>
            <Text style={styles.text5}>
              {s.extraLight}
              {"\n"}
              {s.sections}
            </Text>
            <View style={styles.box9}>
              <View style={styles.box10}>
                <View style={styles.box11} />
              </View>
              <Text style={styles.text6}>{s.n522Left}</Text>
            </View>
          </View>
          <View style={styles.box12}>
            <SvgXml xml={art.art3} width={24} height={24} />
          </View>
        </View>
      </Pressable>
      <Pressable
        style={styles.link4}
        onPress={() => router.push("/exam-ready")}
        accessibilityRole="link"
        accessibilityLabel="Exam readiness 41 percent, up 5 points this week"
      >
        <View style={styles.box13} />
        <View style={styles.box14}>
          <SvgXml xml={art.art4} width={56} height={56} style={styles.artBox2} />
          <View style={styles.box15}>
            <Text style={styles.label3}>{s.n41}</Text>
            <Text style={styles.text7}>{s.text}</Text>
          </View>
        </View>
        <View style={styles.box16}>
          <Text style={styles.text8}>{s.examReadiness}</Text>
          <Text style={styles.text9}>{s.lessonsTicketsSignsTests}</Text>
        </View>
        <View style={styles.box17}>
          <SvgXml xml={art.art5} width={12} height={12} />
          <Text style={styles.label4}>{s.n5}</Text>
        </View>
      </Pressable>
      <View style={styles.box18}>
        <Text style={styles.label5}>{s.theorySpace}</Text>
      </View>
      <Pressable
        style={styles.link5}
        onPress={() => router.push("/tickets")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art6} width={171} height={256} style={styles.artBox} />
        <View style={styles.box19} />
        <SvgXml xml={art.art7} width={146} height={128} style={styles.artBox3} />
        <View style={styles.box20}>
          <Text style={styles.label6}>{s.tickets}</Text>
        </View>
      </Pressable>
      <View style={styles.nav}>
        <Pressable
          style={styles.link6}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art8} width={20} height={20} />
          <Text style={styles.label7}>{s.home}</Text>
        </Pressable>
        <Pressable
          style={styles.link7}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
          accessibilityLabel="My course"
        >
          <SvgXml xml={art.art9} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link7}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art10} width={22} height={22} />
        </Pressable>
      </View>
      <Pressable
        style={styles.link8}
        onPress={() => router.push("/road-signs-v3")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art11} width={171} height={124} style={styles.artBox} />
        <View style={styles.box21} />
        <SvgXml xml={art.art12} width={68} height={62} style={styles.artBox4} />
        <View style={styles.box22}>
          <Text style={styles.label8}>{s.roadSigns}</Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.link9}
        onPress={() => router.push("/quick-test")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art13} width={171} height={124} style={styles.artBox} />
        <View style={styles.box23} />
        <SvgXml xml={art.art14} width={60} height={68} style={styles.artBox5} />
        <View style={styles.box22}>
          <Text style={styles.label6}>{s.quickTest}</Text>
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
  link3: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 220,
    padding: 20,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundImage: "radial-gradient(120% 90% at 50% 0%, #2638DA 0%, #0E1C91 55%, #08106A 100%)",
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
  label2: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 12,
    textDecorationLine: "none",
  },
  text3: {
    fontFamily: font.spaceGrotesk[700],
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    textDecorationLine: "none",
  },
  box7: {
    flexDirection: "row",
    position: "relative",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  box8: {
    flexDirection: "column",
    minWidth: 0,
    gap: 8,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text4: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    lineHeight: 12,
    textDecorationLine: "none",
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 24,
    letterSpacing: -0.8,
    lineHeight: 26.88,
    textDecorationLine: "none",
  },
  box9: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  box10: {
    height: 6,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 3,
  },
  box11: {
    width: "38%",
    height: 6,
    backgroundColor: "#FFB200",
    borderRadius: 3,
  },
  text6: {
    fontFamily: font.spaceGrotesk[700],
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    textDecorationLine: "none",
  },
  box12: {
    flexDirection: "row",
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFB200",
    borderRadius: 32,
  },
  link4: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 350,
    width: 350,
    height: 78,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 12,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box13: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    backgroundImage: "radial-gradient(circle, rgba(255,178,0,0.16), rgba(255,178,0,0) 70%)",
    borderRadius: 60,
  },
  box14: {
    position: "relative",
    width: 56,
    height: 56,
    flexShrink: 0,
  },
  artBox2: {
    transform: "rotate(-90deg)",
  },
  box15: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  label3: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 15,
    letterSpacing: -0.3,
    textDecorationLine: "none",
  },
  text7: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 10,
    letterSpacing: -0.3,
    textDecorationLine: "none",
  },
  box16: {
    flexDirection: "column",
    position: "relative",
    minWidth: 0,
    gap: 6,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "inherit",
    fontSize: 15,
    letterSpacing: -0.3,
    lineHeight: 15,
    textDecorationLine: "none",
  },
  text9: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    lineHeight: 14.4,
    textDecorationLine: "none",
  },
  box17: {
    flexDirection: "row",
    position: "relative",
    height: 26,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 8,
    gap: 4,
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#E7F6EF",
    borderRadius: 13,
  },
  label4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#12A06A",
    fontSize: 12,
    textDecorationLine: "none",
  },
  box18: {
    position: "absolute",
    left: 20,
    top: 444,
    margin: 0,
  },
  label5: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 20,
    letterSpacing: -0.6,
    lineHeight: 24,
  },
  link5: {
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
  artBox3: {
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
  label6: {
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
  label7: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    textDecorationLine: "none",
  },
  link7: {
    flexDirection: "row",
    width: 86,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  link8: {
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
  artBox4: {
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
  label8: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 19,
    letterSpacing: -0.4,
    textAlign: "center",
    textDecorationLine: "none",
  },
  link9: {
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
  artBox5: {
    position: "absolute",
    left: 26,
    top: -11,
  },
});
