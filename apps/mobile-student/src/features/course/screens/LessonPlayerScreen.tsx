import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useLessonPlayer } from "../hooks/useLessonPlayer";
import { MaterialChipGrid } from "../components/MaterialChipGrid";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/lessonPlayer.art";
import { strings } from "../strings";

const s = strings.lessonPlayer;

export function LessonPlayerScreen() {
  const router = useRouter();
  const vm = useLessonPlayer();
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
              <Pressable
                style={styles.button}
                onPress={vm.back10}
                accessibilityRole="button"
                accessibilityLabel="Back 10 seconds"
              >
                <SvgXml xml={art.art3} width={20} height={20} />
              </Pressable>
              <Pressable
                style={styles.button2}
                onPress={vm.toggle}
                accessibilityRole="button"
                accessibilityLabel={vm.playLabel}
              >
                <SvgXml xml={art.art4} width={24} height={24} style={{ display: vm.playShow }} />
                <SvgXml xml={art.art5} width={24} height={24} style={{ display: vm.pauseShow }} />
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={vm.fwd10}
                accessibilityRole="button"
                accessibilityLabel="Forward 10 seconds"
              >
                <SvgXml xml={art.art6} width={20} height={20} />
              </Pressable>
            </View>
            <View style={styles.box6}>
              <View style={styles.lessonPositionBox}>
                <View style={styles.box7} />
                <View style={[styles.box8, { width: `${vm.percent}%` }]} />
                <View style={[styles.box9, { left: `${vm.percent}%`, marginLeft: -6 }]} />
              </View>
              <View style={styles.box10}>
                <Text style={styles.text4}>
                  {vm.tLabel} <Text style={styles.text3}>{`/ ${vm.lenLabel}`}</Text>
                </Text>
                <View style={styles.box11}>
                  <Pressable
                    style={styles.button3}
                    onPress={vm.speedUp}
                    accessibilityRole="button"
                    accessibilityLabel={`Playback speed ${vm.speed}`}
                  >
                    <Text style={styles.label}>{vm.speed}</Text>
                  </Pressable>
                  <Pressable
                    style={styles.link2}
                    onPress={() => router.push("/video-full")}
                    accessibilityRole="link"
                    accessibilityLabel="Full screen"
                  >
                    <SvgXml xml={art.art7} width={18} height={18} />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box12}>
              <Text style={styles.text5}>{`Lesson ${vm.lNum} · ${vm.lenLabel}`}</Text>
              <Text style={styles.title}>{vm.lTitle}</Text>
            </View>
            <View style={styles.section2}>
              <View style={styles.box11}>
                <Text style={styles.text6}>{s.studyMaterial}</Text>
                <View style={styles.box13} />
              </View>
              <MaterialChipGrid chips={vm.materials} width={350} />
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box21}>
              <Text style={styles.heading}>{s.inThisLesson}</Text>
              <Text style={styles.text8}>{s.tapToJump}</Text>
            </View>
            <View style={styles.box22}>
              {vm.points.map((p, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={[styles.button4, { backgroundColor: p.bg }]}
                    onPress={p.seek}
                    accessibilityRole="button"
                    accessibilityLabel={p.aria}
                  >
                    <View style={[styles.box23, { backgroundColor: p.dotBg }]}>
                      <Text style={[styles.label3, { color: p.dotFg }]}>{p.num}</Text>
                    </View>
                    <View style={styles.box24}>
                      <Text style={styles.label4}>{p.text}</Text>
                    </View>
                    <Text style={[styles.label3, { color: p.timeFg }]}>{p.time}</Text>
                  </Pressable>
                </Fragment>
              ))}
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box21}>
              <Text style={styles.heading}>{s.upNext}</Text>
              <Text style={styles.text8}>{`Module ${vm.mNum}`}</Text>
            </View>
            <View style={styles.box12}>
              {vm.next.map((n, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={styles.link4}
                    onPress={() => router.push("/lesson-player")}
                    accessibilityRole="link"
                    accessibilityLabel={n.aria}
                  >
                    <View style={styles.box25}>
                      <SvgXml xml={art.art71} width={16} height={16} />
                    </View>
                    <View style={styles.box17}>
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
      <View style={styles.box26} />
      <Pressable
        style={styles.link5}
        onPress={() => router.push("/lesson-complete")}
        accessibilityRole="link"
        accessibilityLabel={`Next lesson: ${vm.nextTitle}`}
      >
        <View style={styles.box27}>
          <Text style={styles.text12}>{s.nextLesson}</Text>
          <Text style={styles.text13}>{vm.nextTitle}</Text>
        </View>
        <View style={styles.box28}>
          <SvgXml xml={art.art72} width={18} height={18} />
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
    position: "relative",
    height: 197,
    overflow: "hidden",
    backgroundColor: "#060B4A",
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
    position: "absolute",
    left: 0,
    top: 52,
    right: 0,
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    width: 44,
    height: 44,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    borderRadius: 22,
  },
  button2: {
    flexDirection: "row",
    width: 64,
    height: 64,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 32,
    boxShadow: "0 0 0 8px rgba(255,255,255,0.12)",
  },
  box6: {
    flexDirection: "column",
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 12,
    gap: 8,
  },
  lessonPositionBox: {
    flexDirection: "row",
    position: "relative",
    height: 12,
    alignItems: "center",
  },
  box7: {
    height: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "rgba(255,255,255,0.24)",
    borderRadius: 2,
  },
  box8: {
    position: "absolute",
    left: 0,
    height: 4,
    backgroundColor: "#FFB200",
    borderRadius: 2,
  },
  box9: {
    position: "absolute",
    width: 12,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
  },
  box10: {
    flexDirection: "row",
    height: 28,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text3: {
    color: "rgba(255,255,255,0.5)",
  },
  text4: {
    fontFamily: font.spaceGrotesk[700],
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
  },
  box11: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  button3: {
    height: 28,
    minWidth: 44,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    borderRadius: 14,
  },
  label: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 12,
  },
  link2: {
    flexDirection: "row",
    width: 44,
    height: 44,
    margin: -8,
    justifyContent: "center",
    alignItems: "center",
  },
  section2: {
    flexDirection: "column",
    gap: 12,
  },
  box12: {
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
  text6: {
    fontFamily: font.manrope[800],
    color: "#8A93B8",
    fontSize: 11,
    letterSpacing: 0.6,
    lineHeight: 11,
    textTransform: "uppercase",
  },
  box13: {
    height: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#E2E6F4",
  },
  box17: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  box21: {
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
  box22: {
    flexDirection: "column",
    padding: 8,
    gap: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 8px 20px -14px rgba(14,28,145,0.18)",
  },
  button4: {
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
  box23: {
    flexDirection: "row",
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 16,
  },
  label3: {
    fontFamily: font.spaceGrotesk[700],
    fontSize: 13,
    textAlign: "left",
  },
  box24: {
    minWidth: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  label4: {
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
  box25: {
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
  box26: {
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
  box27: {
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
  box28: {
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
