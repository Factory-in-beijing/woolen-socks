import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/home.art";
import { strings } from "../strings";

const s = strings.home;

export function HomeScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Image
          source={{ uri: "/_blob/44bf482064006efee96105a824cd69b3" }}
          style={styles.image}
          accessibilityLabel="DriveNet"
        />{" "}
        {/* TODO(img) provide asset */}
        <Pressable
          style={styles.link}
          onPress={() => router.push("/log-in")}
          accessibilityRole="link"
        >
          <Text style={styles.label}>{s.logIn}</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <SvgXml xml={art.art1} width={350} height={306} style={styles.artBox} />
        <View style={styles.box}>
          <View style={styles.box2} />
          <Text style={styles.label2}>{s.videoCourse}</Text>
        </View>
        <View style={styles.box3} />
        <View style={styles.box4}>
          <View style={styles.box5}>
            <View style={styles.box6} />
            <View style={styles.box7} />
          </View>
          <View style={styles.box8}>
            <SvgXml xml={art.art2} width={14} height={14} />
          </View>
          <View style={styles.box9}>
            <View style={styles.box10} />
          </View>
        </View>
        <View style={styles.box11}>
          <Text style={styles.label3}>
            {s.theWholeTheory} <Text style={styles.text}>{s.explainedOnVideo}</Text>
          </Text>
        </View>
        <View style={styles.box12}>
          <Text style={styles.label4}>{s.clearLessonsAtYour}</Text>
        </View>
        <View style={styles.box13}>
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/get-course")}
            accessibilityRole="link"
          >
            <Text style={styles.label5}>{s.getTheCourse}</Text>
            <View style={styles.box14}>
              <SvgXml xml={art.art3} width={18} height={18} />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.box15}>
        <Text style={styles.label6}>{s.theorySpace}</Text>
      </View>
      <Pressable
        style={styles.link3}
        onPress={() => router.push("/tickets")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art4} width={171} height={256} style={styles.artBox} />
        <View style={styles.box16} />
        <SvgXml xml={art.art5} width={146} height={128} style={styles.artBox2} />
        <View style={styles.box17}>
          <Text style={styles.label7}>{s.tickets}</Text>
        </View>
      </Pressable>
      <View style={styles.nav}>
        <Pressable
          style={styles.link4}
          onPress={() => router.push("/home")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art6} width={20} height={20} />
          <Text style={styles.label8}>{s.home}</Text>
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/my-course-locked")}
          accessibilityRole="link"
          accessibilityLabel="My course"
        >
          <SvgXml xml={art.art7} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/sign-in")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art8} width={22} height={22} />
        </Pressable>
      </View>
      <Pressable
        style={styles.link6}
        onPress={() => router.push("/road-signs-v3")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art9} width={171} height={124} style={styles.artBox} />
        <View style={styles.box18} />
        <SvgXml xml={art.art10} width={68} height={62} style={styles.artBox3} />
        <View style={styles.box19}>
          <Text style={styles.label9}>{s.roadSigns}</Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.link7}
        onPress={() => router.push("/quick-test")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art11} width={171} height={124} style={styles.artBox} />
        <View style={styles.box20} />
        <SvgXml xml={art.art12} width={60} height={68} style={styles.artBox4} />
        <View style={styles.box19}>
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
    right: 20,
    width: 350,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 44,
    borderRadius: 12,
  },
  link: {
    flexDirection: "row",
    height: 44,
    paddingTop: 0,
    paddingRight: 18,
    paddingBottom: 0,
    paddingLeft: 18,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#0E1C91",
    borderRadius: 22,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 14,
    textDecorationLine: "none",
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
  box: {
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
  box2: {
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
  box3: {
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
  box4: {
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
  box5: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box6: {
    width: 44,
    height: 6,
    backgroundColor: "#DCE1F7",
    borderRadius: 3,
  },
  box7: {
    width: 16,
    height: 6,
    backgroundColor: "#DCE1F7",
    borderRadius: 3,
  },
  box8: {
    flexDirection: "row",
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FFB200",
    borderRadius: 18,
  },
  box9: {
    height: 5,
    overflow: "hidden",
    backgroundColor: "#E4E8F8",
    borderRadius: 3,
  },
  box10: {
    width: "46%",
    height: 5,
    backgroundColor: "#0E1C91",
    borderRadius: 3,
  },
  box11: {
    position: "absolute",
    left: 20,
    top: 124,
    right: 20,
    margin: 0,
  },
  text: {
    color: "#FFB200",
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 28,
    letterSpacing: -1.1,
    lineHeight: 31.36,
  },
  box12: {
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
  box13: {
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
  link2: {
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
  box14: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
  box15: {
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
  link3: {
    position: "absolute",
    left: 20,
    top: 480,
    width: 171,
    height: 256,
  },
  box16: {
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
  box17: {
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
  link4: {
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
  link5: {
    flexDirection: "row",
    width: 86,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  link6: {
    position: "absolute",
    left: 199,
    top: 612,
    width: 171,
    height: 124,
    margin: 0,
  },
  box18: {
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
  box19: {
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
  link7: {
    position: "absolute",
    left: 199,
    top: 480,
    width: 171,
    height: 124,
    margin: 0,
  },
  box20: {
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
