import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useVideoErrorViewModel } from "../hooks/useVideoErrorViewModel";
import { MaterialChipGrid } from "../components/MaterialChipGrid";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/videoError.art";
import { strings } from "../strings";

const s = strings.videoError;

export function VideoErrorScreen() {
  const router = useRouter();
  const vm = useVideoErrorViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
          accessibilityLabel="Back to My course"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <View style={styles.box}>
          <Text style={styles.text}>{`Module ${vm.mNum} · Lesson ${vm.lNum} of ${vm.lOf}`}</Text>
          <Text style={styles.text2}>{vm.mTitle}</Text>
        </View>
        <View style={styles.box2} />
      </View>
      <ScrollView style={styles.box3} showsVerticalScrollIndicator={false}>
        <View style={styles.box4}>
          <View style={styles.section}>
            <SvgXml xml={art.art2} width={350} height={197} style={styles.artBox} />
            <View style={styles.box5}>
              <View style={styles.box6}>
                <SvgXml xml={art.art3} width={24} height={24} />
              </View>
            </View>
            <View style={styles.box7}>
              <Text style={styles.text3}>{vm.errTitle}</Text>
              <Text style={styles.text4}>{s.yourPlaceIsSaved}</Text>
            </View>
            <View style={styles.box8}>
              <Pressable style={styles.button} onPress={vm.retry} accessibilityRole="button">
                <Text style={styles.label}>{vm.retryLabel}</Text>
              </Pressable>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/help#contact")}
                accessibilityRole="link"
              >
                <Text style={styles.label2}>{s.reportIt}</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box9}>
              <Text style={styles.text5}>{`Lesson ${vm.lNum} · ${vm.lenLabel}`}</Text>
              <Text style={styles.title}>{vm.lTitle}</Text>
            </View>
            <View style={styles.section2}>
              <View style={styles.box10}>
                <Text style={styles.text6}>{s.studyMaterial}</Text>
                <View style={styles.box11} />
              </View>
              <MaterialChipGrid chips={vm.materials} width={350} />
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box19}>
              <Text style={styles.heading}>{s.inThisLesson}</Text>
              <Text style={styles.text8}>{s.tapToJump}</Text>
            </View>
            <View style={styles.box20}>
              {vm.points.map((p, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={[styles.button2, { backgroundColor: p.bg }]}
                    onPress={p.seek}
                    accessibilityRole="button"
                    accessibilityLabel={p.aria}
                  >
                    <View style={[styles.box21, { backgroundColor: p.dotBg }]}>
                      <Text style={[styles.label4, { color: p.dotFg }]}>{p.num}</Text>
                    </View>
                    <View style={styles.box22}>
                      <Text style={styles.label5}>{p.text}</Text>
                    </View>
                    <Text style={[styles.label4, { color: p.timeFg }]}>{p.time}</Text>
                  </Pressable>
                </Fragment>
              ))}
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box19}>
              <Text style={styles.heading}>{s.upNext}</Text>
              <Text style={styles.text8}>{`Module ${vm.mNum}`}</Text>
            </View>
            <View style={styles.box9}>
              {vm.next.map((n, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={styles.link4}
                    onPress={() => router.push("/lesson-player")}
                    accessibilityRole="link"
                    accessibilityLabel={n.aria}
                  >
                    <View style={styles.box23}>
                      <SvgXml xml={art.art67} width={16} height={16} />
                    </View>
                    <View style={styles.box15}>
                      <Text style={styles.text9}>{`Lesson ${n.num}`}</Text>
                      <Text style={styles.text10}>{n.title}</Text>
                    </View>
                    <Text style={styles.text11}>{n.len}</Text>
                  </Pressable>
                </Fragment>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box24} />
      <Pressable
        style={styles.link5}
        onPress={() => router.push("/lesson-complete")}
        accessibilityRole="link"
        accessibilityLabel={`Next lesson: ${vm.nextTitle}`}
      >
        <View style={styles.box25}>
          <Text style={styles.text12}>{s.nextLesson}</Text>
          <Text style={styles.text13}>{vm.nextTitle}</Text>
        </View>
        <View style={styles.box26}>
          <SvgXml xml={art.art68} width={18} height={18} />
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
    gap: 4,
    alignItems: "center",
  },
  text: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    lineHeight: 12,
  },
  text2: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 16.5,
  },
  box2: {
    width: 44,
    height: 44,
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
    gap: 24,
  },
  section: {
    flexDirection: "column",
    position: "relative",
    height: 197,
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundImage: "radial-gradient(120% 120% at 50% 0%, #1A2CC4 0%, #0E1C91 55%, #060B4A 100%)",
    borderRadius: 28,
    boxShadow: "0 22px 32px -14px rgba(14,28,145,0.45)",
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box5: {
    flexDirection: "row",
    position: "relative",
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 18,
  },
  box6: {
    flexDirection: "row",
  },
  box7: {
    flexDirection: "column",
    position: "relative",
    gap: 4,
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 17,
    letterSpacing: -0.3,
    textAlign: "center",
  },
  text4: {
    fontFamily: font.manrope[600],
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    textAlign: "center",
  },
  box8: {
    flexDirection: "row",
    position: "relative",
    gap: 8,
  },
  button: {
    height: 36,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    backgroundColor: "#FFB200",
    borderRadius: 18,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 13,
    textAlign: "center",
  },
  link2: {
    flexDirection: "row",
    height: 36,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    borderRadius: 18,
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 13,
    textAlign: "center",
    textDecorationLine: "none",
  },
  section2: {
    flexDirection: "column",
    gap: 12,
  },
  box9: {
    flexDirection: "column",
    gap: 8,
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#B07A00",
    fontSize: 11,
    letterSpacing: 0.6,
    lineHeight: 11,
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 24,
    letterSpacing: -0.7,
    lineHeight: 27.6,
  },
  box10: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  text6: {
    fontFamily: font.manrope[800],
    color: "#8A93B8",
    fontSize: 11,
    letterSpacing: 0.6,
    lineHeight: 11,
    textTransform: "uppercase",
  },
  box11: {
    height: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#E2E6F4",
  },
  box12: {
    gap: 8,
  },
  link3: {
    flexDirection: "row",
    position: "relative",
  },
  box13: {
    flexDirection: "row",
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    gap: 12,
    alignItems: "center",
  },
  box14: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    filter: "drop-shadow(0 4px 5px rgba(120,72,0,0.35))",
  },
  box15: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text7: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 13,
    letterSpacing: -0.1,
    lineHeight: 15.6,
    textDecorationLine: "none",
  },
  box16: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  label3: {
    fontFamily: font.manrope[700],
    fontSize: 11,
    lineHeight: 11,
    textDecorationLine: "none",
  },
  box17: {
    flexDirection: "row",
    position: "absolute",
    top: 12,
  },
  box18: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    gap: 4,
  },
  box19: {
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
  text8: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 12,
  },
  box20: {
    flexDirection: "column",
    padding: 8,
    gap: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 8px 20px -14px rgba(14,28,145,0.18)",
  },
  button2: {
    flexDirection: "row",
    minHeight: 56,
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 8,
    gap: 12,
    alignItems: "center",
    borderRadius: 14,
  },
  box21: {
    flexDirection: "row",
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 16,
  },
  label4: {
    fontFamily: font.spaceGrotesk[700],
    fontSize: 13,
    textAlign: "left",
  },
  box22: {
    minWidth: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  label5: {
    fontFamily: font.manrope[700],
    color: "#0A0E2E",
    fontSize: 14,
    lineHeight: 18.2,
    textAlign: "left",
  },
  link4: {
    flexDirection: "row",
    minHeight: 72,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 12,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04)",
  },
  box23: {
    flexDirection: "row",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#EEF1FF",
    borderRadius: 14,
  },
  text9: {
    fontFamily: font.manrope[800],
    color: "#8A93B8",
    fontSize: 11,
    letterSpacing: 0.4,
    lineHeight: 11,
    textTransform: "uppercase",
    textDecorationLine: "none",
  },
  text10: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 18.75,
    textDecorationLine: "none",
  },
  text11: {
    fontFamily: font.spaceGrotesk[700],
    color: "#8A93B8",
    fontSize: 13,
    textDecorationLine: "none",
  },
  box24: {
    position: "absolute",
    left: 0,
    top: 722,
    right: 0,
    height: 22,
    backgroundImage: "linear-gradient(180deg, rgba(246,247,253,0), #F6F7FD)",
  },
  link5: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
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
  box25: {
    flexDirection: "column",
    minWidth: 0,
    flexShrink: 1,
    gap: 4,
  },
  text12: {
    fontFamily: font.manrope[800],
    color: "#FFB200",
    fontSize: 11,
    letterSpacing: 0.6,
    lineHeight: 11,
    textTransform: "uppercase",
    textDecorationLine: "none",
  },
  text13: {
    overflow: "hidden",
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 16.5,
    textDecorationLine: "none",
  },
  box26: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFB200",
    borderRadius: 22,
  },
});
