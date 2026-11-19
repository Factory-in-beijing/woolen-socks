import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/lessonComplete.art";
import { strings } from "../strings";

const s = strings.lessonComplete;

export function LessonCompleteScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
          accessibilityLabel="Close and go to My course"
        >
          <SvgXml xml={art.art1} width={18} height={18} />
        </Pressable>
        <Text style={styles.text}>{s.module3Lesson2}</Text>
        <View style={styles.box} />
      </View>
      <SvgXml xml={art.art2} width={390} height={300} style={styles.artBox} />
      <View style={styles.box2}>
        <SvgXml xml={art.art3} width={38} height={38} />
      </View>
      <View style={styles.section}>
        <View style={styles.box3}>
          <Text style={styles.text2}>{s.lessonComplete}</Text>
          <Text style={styles.title}>{s.extraLightSections}</Text>
        </View>
        <View style={styles.box4}>
          <View style={styles.box5}>
            <Text style={styles.text3}>{s.trafficLightsIntersections}</Text>
            <Text style={styles.text6}>
              <Text style={styles.text4}>{s.n2}</Text>
              <Text style={styles.text5}>{s.n5}</Text>
            </Text>
          </View>
          <View style={styles.n2Of5LessonsBox}>
            <View style={styles.box6} />
            <View style={styles.box6} />
            <View style={styles.box7} />
            <View style={styles.box7} />
            <View style={styles.box7} />
          </View>
        </View>
        <View style={styles.box8}>
          <Text style={styles.text7}>{s.lockItInPractise}</Text>
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/tickets")}
            accessibilityRole="link"
            accessibilityLabel="Practise Traffic light signals, 54 tickets"
          >
            <SvgXml xml={art.art4} width={40} height={40} style={styles.artBox2} />
            <View style={styles.box9}>
              <Text style={styles.text8}>{s.trafficLightSignals}</Text>
              <Text style={styles.text9}>{s.n54Tickets}</Text>
            </View>
            <View style={styles.box10}>
              <Text style={styles.label}>{s.practise}</Text>
              <SvgXml xml={art.art5} width={14} height={14} />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.box11}>
        <Pressable
          style={styles.link3}
          onPress={() => router.push("/lesson-player")}
          accessibilityRole="link"
        >
          <View style={styles.box12}>
            <Text style={styles.text10}>{s.nextLesson1205}</Text>
            <Text style={styles.text11}>{s.controlledIntersections}</Text>
          </View>
          <View style={styles.box13}>
            <SvgXml xml={art.art6} width={18} height={18} />
          </View>
        </Pressable>
        <Pressable
          style={styles.link4}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
        >
          <Text style={styles.label2}>{s.backToMyCourse}</Text>
        </Pressable>
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
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
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
    backgroundColor: "#0E1C91",
    borderRadius: 40,
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
  text2: {
    fontFamily: font.manrope[800],
    color: "#B07A00",
    fontSize: 12,
    letterSpacing: 0.8,
    textAlign: "center",
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 28,
    letterSpacing: -1,
    lineHeight: 31.36,
    textAlign: "center",
  },
  box4: {
    flexDirection: "column",
    padding: 16,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box5: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 13,
    lineHeight: 16.9,
  },
  text4: {
    color: "#0E1C91",
  },
  text5: {
    color: "#A2A9C8",
  },
  text6: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 13,
  },
  n2Of5LessonsBox: {
    flexDirection: "row",
    gap: 4,
  },
  box6: {
    height: 8,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#0E1C91",
    borderRadius: 4,
  },
  box7: {
    height: 8,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#E3E7F5",
    borderRadius: 4,
  },
  box8: {
    flexDirection: "column",
    gap: 12,
  },
  text7: {
    fontFamily: font.manrope[800],
    color: "#8A93B8",
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  link2: {
    flexDirection: "row",
    height: 76,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 20,
    boxShadow: "0 12px 24px -14px rgba(176,122,0,0.7)",
  },
  artBox2: {
    flexShrink: 0,
  },
  box9: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 18,
    textDecorationLine: "none",
  },
  text9: {
    fontFamily: font.manrope[700],
    color: "rgba(10,14,46,0.72)",
    fontSize: 12,
    lineHeight: 12,
    textDecorationLine: "none",
  },
  box10: {
    flexDirection: "row",
    height: 36,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 14,
    gap: 6,
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 18,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#FFB200",
    fontSize: 13,
    textDecorationLine: "none",
  },
  box11: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
    gap: 8,
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
    backgroundColor: "#0A0E2E",
    borderRadius: 30,
    boxShadow: "0 14px 34px rgba(10,14,46,0.3)",
  },
  box12: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
  },
  text10: {
    fontFamily: font.manrope[800],
    color: "#FFB200",
    fontSize: 11,
    letterSpacing: 0.6,
    lineHeight: 11,
    textTransform: "uppercase",
    textDecorationLine: "none",
  },
  text11: {
    overflow: "hidden",
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 16.5,
    textDecorationLine: "none",
  },
  box13: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFB200",
    borderRadius: 22,
  },
  link4: {
    flexDirection: "row",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 15,
    textDecorationLine: "none",
  },
});
