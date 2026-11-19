import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useLessonFreeViewModel } from "../hooks/useLessonFreeViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/lessonFree.art";
import { strings } from "../strings";

const s = strings.lessonFree;

export function LessonFreeScreen() {
  const router = useRouter();
  const vm = useLessonFreeViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/my-course-member")}
          accessibilityRole="link"
          accessibilityLabel="Back to My course"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <View style={styles.box}>
          <Text style={styles.text}>{s.module1Lesson1}</Text>
          <Text style={styles.text2}>{s.conventionAdministrativeLaw}</Text>
        </View>
        <View style={styles.box2} />
      </View>
      <ScrollView style={styles.box3} showsVerticalScrollIndicator={false}>
        <View style={styles.box4}>
          <View style={styles.box5}>
            <View style={styles.section}>
              <SvgXml xml={art.art2} width={350} height={197} style={styles.artBox} />
              <View style={styles.box6}>
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
              <View style={styles.box7}>
                <View style={styles.lessonPositionBox}>
                  <View style={styles.box8} />
                  <View style={[styles.box9, { width: `${vm.percent}%` }]} />
                  <View style={[styles.box10, { left: `${vm.percent}%`, marginLeft: -6 }]} />
                </View>
                <View style={styles.box11}>
                  <Text style={styles.text4}>
                    {vm.tLabel} <Text style={styles.text3}>{`/ ${vm.lenLabel}`}</Text>
                  </Text>
                  <View style={styles.box12}>
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
            <View style={styles.box13}>
              <SvgXml xml={art.art8} width={12} height={12} />
              <Text style={styles.label2}>{s.freeLesson}</Text>
            </View>
          </View>
          <View style={styles.section2}>
            <Text style={styles.title}>{s.dutiesOfDriversPassengers}</Text>
          </View>
          <View style={styles.section3}>
            <View style={styles.box14}>
              <Text style={styles.label3}>{s.inThisLesson}</Text>
            </View>
            <View style={styles.box15}>
              <View style={styles.box16}>
                <View style={styles.box17}>
                  <Text style={styles.label4}>{s.n1}</Text>
                </View>
                <View style={styles.box18}>
                  <Text style={styles.label5}>{s.whoCountsAsA}</Text>
                </View>
                <Text style={styles.text5}>{s.n000}</Text>
                <View style={styles.box19} />
              </View>
              <View style={styles.box16}>
                <View style={styles.box17}>
                  <Text style={styles.label4}>{s.n2}</Text>
                </View>
                <View style={styles.box18}>
                  <Text style={styles.label5}>{s.whatEveryDriverMust}</Text>
                </View>
                <Text style={styles.text5}>{s.n340}</Text>
                <View style={styles.box19} />
              </View>
              <View style={styles.box16}>
                <View style={styles.box17}>
                  <Text style={styles.label4}>{s.n3}</Text>
                </View>
                <View style={styles.box18}>
                  <Text style={styles.label5}>{s.whenAPassengerIs}</Text>
                </View>
                <Text style={styles.text5}>{s.n715}</Text>
              </View>
            </View>
          </View>
          <View style={styles.section4}>
            <View style={styles.section2}>
              <Text style={styles.text7}>
                {s.likedThisLesson}
                {"\n"}
                <Text style={styles.text6}>{s.n35MoreAreWaiting}</Text>
              </Text>
              <Text style={styles.text8}>{s.theWholeTheoryExplained}</Text>
            </View>
            <View style={styles.n1Of36LessonsBox}>
              <View style={styles.box20} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
            </View>
            <Pressable
              style={styles.link3}
              onPress={() => router.push("/get-course")}
              accessibilityRole="link"
            >
              <Text style={styles.label6}>{s.getTheCourse}</Text>
              <View style={styles.box22}>
                <SvgXml xml={art.art9} width={16} height={16} />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box23} />
      <Pressable
        style={styles.link4}
        onPress={() => router.push("/get-course")}
        accessibilityRole="link"
      >
        <View style={styles.box24}>
          <Text style={styles.text9}>{s.nextLesson905}</Text>
          <Text style={styles.text10}>{s.finesPointsAndThe}</Text>
        </View>
        <View style={styles.box25}>
          <SvgXml xml={art.art10} width={18} height={18} />
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
  box5: {
    position: "relative",
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
  box6: {
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
  box7: {
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
  box8: {
    height: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "rgba(255,255,255,0.24)",
    borderRadius: 2,
  },
  box9: {
    position: "absolute",
    left: 0,
    height: 4,
    backgroundColor: "#FFB200",
    borderRadius: 2,
  },
  box10: {
    position: "absolute",
    width: 12,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
  },
  box11: {
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
  box12: {
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
  box13: {
    flexDirection: "row",
    position: "absolute",
    left: 16,
    top: 16,
    height: 28,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 6,
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 14,
    boxShadow: "0 8px 16px -8px rgba(0,0,0,0.5)",
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 11,
    letterSpacing: 0.6,
  },
  section2: {
    flexDirection: "column",
    gap: 8,
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 22,
    letterSpacing: -0.6,
    lineHeight: 26.4,
  },
  section3: {
    flexDirection: "column",
    gap: 12,
  },
  box14: {
    flexDirection: "row",
    height: 20,
    margin: 0,
    alignItems: "center",
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 17,
    letterSpacing: -0.4,
  },
  box15: {
    flexDirection: "column",
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box16: {
    flexDirection: "row",
    position: "relative",
    minHeight: 56,
    padding: 12,
    gap: 12,
    alignItems: "center",
  },
  box17: {
    flexDirection: "row",
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#EEF1FF",
    borderRadius: 16,
  },
  label4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 13,
  },
  box18: {
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
  },
  text5: {
    fontFamily: font.spaceGrotesk[700],
    color: "#8A93B8",
    fontSize: 12,
  },
  box19: {
    position: "absolute",
    left: 56,
    right: 12,
    bottom: 0,
    height: 1,
    backgroundColor: "#EEF0F8",
  },
  section4: {
    flexDirection: "column",
    position: "relative",
    padding: 20,
    gap: 16,
    overflow: "hidden",
    backgroundImage: "radial-gradient(120% 90% at 50% 0%, #2638DA 0%, #0E1C91 55%, #08106A 100%)",
    borderRadius: 28,
    boxShadow: "0 24px 40px -18px rgba(14,28,145,0.55)",
  },
  text6: {
    color: "#FFB200",
  },
  text7: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 22,
    letterSpacing: -0.7,
    lineHeight: 25.3,
  },
  text8: {
    fontFamily: font.manrope[600],
    color: "rgba(255,255,255,0.78)",
    fontSize: 13,
    lineHeight: 18.85,
  },
  n1Of36LessonsBox: {
    rowGap: 8,
    justifyContent: "space-between",
  },
  box20: {
    width: 18,
    height: 18,
    backgroundColor: "#FFB200",
    borderRadius: 6,
    boxShadow: "0 0 0 3px rgba(255,178,0,0.3)",
  },
  box21: {
    width: 18,
    height: 18,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 6,
  },
  link3: {
    flexDirection: "row",
    height: 56,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 22,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 28,
  },
  label6: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    textDecorationLine: "none",
  },
  box22: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
  box23: {
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
  box24: {
    flexDirection: "column",
    minWidth: 0,
    flexShrink: 1,
    gap: 4,
  },
  text9: {
    fontFamily: font.manrope[800],
    color: "#FFB200",
    fontSize: 11,
    letterSpacing: 0.6,
    lineHeight: 11,
    textTransform: "uppercase",
    textDecorationLine: "none",
  },
  text10: {
    overflow: "hidden",
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 16.5,
    textDecorationLine: "none",
  },
  box25: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 22,
  },
});
