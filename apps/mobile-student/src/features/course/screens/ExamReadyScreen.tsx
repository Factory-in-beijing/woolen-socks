import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useExamReadyViewModel } from "../hooks/useExamReadyViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/examReady.art";
import { strings } from "../strings";

const s = strings.examReady;

export function ExamReadyScreen() {
  const router = useRouter();
  const vm = useExamReadyViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
          accessibilityLabel="Back to Home"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.examReadiness}</Text>
        <View style={styles.box} />
      </View>
      <ScrollView style={styles.box2} showsVerticalScrollIndicator={false}>
        <View style={styles.box3}>
          <View style={styles.section}>
            <SvgXml xml={art.art2} width={350} height={260} style={styles.artBox} />
            <View style={styles.box4}>
              <View style={styles.box5}>
                <SvgXml xml={art.art3} width={128} height={128} style={styles.artBox2} />
                <View style={styles.box6}>
                  <Text style={styles.text2}>{s.n41}</Text>
                  <Text style={styles.text3}>{s.ready}</Text>
                </View>
              </View>
              <View style={styles.box7}>
                <View style={styles.box8}>
                  <SvgXml xml={art.art4} width={13} height={13} />
                  <Text style={styles.label}>{s.n5PtsThisWeek}</Text>
                </View>
                <Text style={styles.text5}>
                  {s.keep} <Text style={styles.text4}>{s.going}</Text>
                </Text>
                <Text style={styles.text6}>{s.readyAt85And}</Text>
              </View>
            </View>
            <View style={styles.box9}>
              <View style={styles.box10}>
                <View style={styles.box11} />
                <Text style={styles.text7}>{s.starting}</Text>
              </View>
              <View style={styles.box12}>
                <View style={styles.box13} />
                <Text style={styles.text8}>{s.learning}</Text>
              </View>
              <View style={styles.box14}>
                <View style={styles.box15} />
                <Text style={styles.text7}>{s.almost}</Text>
              </View>
              <View style={styles.box16}>
                <View style={styles.box15} />
                <Text style={styles.text7}>{s.ready2}</Text>
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box17}>
              <Text style={styles.heading}>{s.whatMakesYourScore}</Text>
            </View>
            <View style={styles.box18}>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/my-course")}
                accessibilityRole="link"
              >
                <View style={styles.box19}>
                  <View style={styles.box20}>
                    <SvgXml xml={art.art5} width={29} height={29} />
                  </View>
                  <Text style={styles.text9}>{s.n15}</Text>
                </View>
                <View style={styles.box21}>
                  <Text style={styles.text10}>{s.n31}</Text>
                  <Text style={styles.text11}>{s.lessons}</Text>
                  <Text style={styles.text12}>{s.n11Of36Videos}</Text>
                </View>
                <View style={styles.box22}>
                  <View style={styles.box23} />
                </View>
              </Pressable>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/tickets")}
                accessibilityRole="link"
              >
                <View style={styles.box19}>
                  <View style={styles.box20}>
                    <SvgXml xml={art.art6} width={29} height={29} />
                  </View>
                  <Text style={styles.text9}>{s.n45}</Text>
                </View>
                <View style={styles.box21}>
                  <Text style={styles.text10}>{s.n34}</Text>
                  <Text style={styles.text11}>{s.tickets}</Text>
                  <Text style={styles.text12}>{s.n312Of921Mastered}</Text>
                </View>
                <View style={styles.box22}>
                  <View style={styles.box24} />
                </View>
              </Pressable>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/road-signs-v3")}
                accessibilityRole="link"
              >
                <View style={styles.box19}>
                  <View style={styles.box20}>
                    <SvgXml xml={art.art7} width={29} height={29} />
                  </View>
                  <Text style={styles.text9}>{s.n15}</Text>
                </View>
                <View style={styles.box21}>
                  <Text style={styles.text10}>{s.n41}</Text>
                  <Text style={styles.text11}>{s.signs}</Text>
                  <Text style={styles.text12}>{s.n96Of237Mastered}</Text>
                </View>
                <View style={styles.box22}>
                  <View style={styles.box25} />
                </View>
              </Pressable>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/quick-test")}
                accessibilityRole="link"
              >
                <View style={styles.box19}>
                  <View style={styles.box20}>
                    <SvgXml xml={art.art8} width={29} height={29} />
                  </View>
                  <Text style={styles.text9}>{s.n25}</Text>
                </View>
                <View style={styles.box21}>
                  <Text style={styles.text10}>{s.n60}</Text>
                  <Text style={styles.text11}>{s.tests}</Text>
                  <Text style={styles.text12}>{s.n3Of5Passed}</Text>
                </View>
                <View style={styles.box22}>
                  <View style={styles.box26} />
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.section3}>
            <View style={styles.box27}>
              <View style={styles.box21}>
                <Text style={styles.heading}>{s.thisWeek}</Text>
                <Text style={styles.text13}>{s.questionsAnswered}</Text>
              </View>
              <View style={styles.box28}>
                <Text style={styles.text14}>{vm.selVal}</Text>
                <Text style={styles.text13}>{vm.selLabel}</Text>
              </View>
            </View>
            <View style={styles.box29}>
              {vm.bars.map((b, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={styles.button}
                    onPress={b.pick}
                    accessibilityRole="button"
                    accessibilityLabel={b.aria}
                  >
                    <View style={[styles.box30, { height: b.h, backgroundColor: b.bg }]} />
                    <Text style={[styles.text15, { color: b.fg }]}>{b.d}</Text>
                  </Pressable>
                </Fragment>
              ))}
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box17}>
              <Text style={styles.heading}>{s.focusOnThese}</Text>
              <Text style={styles.text16}>{s.weakestTopics}</Text>
            </View>
            <View style={styles.box31}>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/mistakes")}
                accessibilityRole="link"
              >
                <View style={styles.box32}>
                  <View style={styles.box33}>
                    <Text style={styles.label2}>{s.n412}</Text>
                  </View>
                </View>
                <View style={styles.box34}>
                  <Text style={styles.text17}>{s.intersections}</Text>
                  <Text style={styles.text18}>{s.n14TicketsToFix}</Text>
                </View>
                <View style={styles.box35}>
                  <Text style={styles.label3}>{s.practise}</Text>
                  <SvgXml xml={art.art9} width={14} height={14} />
                </View>
                <View style={styles.box36} />
              </Pressable>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/mistakes")}
                accessibilityRole="link"
              >
                <View style={styles.box37}>
                  <View style={styles.box33}>
                    <Text style={styles.label2}>{s.n55}</Text>
                  </View>
                </View>
                <View style={styles.box34}>
                  <Text style={styles.text17}>{s.speed}</Text>
                  <Text style={styles.text18}>{s.n6TicketsToFix}</Text>
                </View>
                <View style={styles.box35}>
                  <Text style={styles.label3}>{s.practise}</Text>
                  <SvgXml xml={art.art10} width={14} height={14} />
                </View>
                <View style={styles.box36} />
              </Pressable>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/mistakes")}
                accessibilityRole="link"
              >
                <View style={styles.box38}>
                  <View style={styles.box33}>
                    <Text style={styles.label2}>{s.n62}</Text>
                  </View>
                </View>
                <View style={styles.box34}>
                  <Text style={styles.text17}>{s.warningSigns}</Text>
                  <Text style={styles.text18}>{s.n5SignsToFix}</Text>
                </View>
                <View style={styles.box35}>
                  <Text style={styles.label3}>{s.practise}</Text>
                  <SvgXml xml={art.art11} width={14} height={14} />
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.box39}>
            <SvgXml xml={art.art12} width={14} height={14} />
            <Text style={styles.label4}>{s.lessons15Tickets45}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box40} />
      <Pressable
        style={styles.link4}
        onPress={() => router.push("/quick-test")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art13} width={20} height={20} />
        <View style={styles.box41}>
          <Text style={styles.label5}>{s.takeAPracticeTest}</Text>
        </View>
        <View style={styles.box42}>
          <SvgXml xml={art.art14} width={18} height={18} />
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
    left: 0,
    top: 114,
    width: 390,
    height: 630,
  },
  box3: {
    flexDirection: "column",
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 24,
    paddingLeft: 20,
    gap: 24,
  },
  section: {
    flexDirection: "column",
    position: "relative",
    padding: 20,
    gap: 20,
    overflow: "hidden",
    backgroundImage: "radial-gradient(120% 90% at 50% 0%, #2638DA 0%, #0E1C91 55%, #08106A 100%)",
    borderRadius: 28,
    boxShadow: "0 20px 34px -18px rgba(14,28,145,0.6)",
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box4: {
    flexDirection: "row",
    position: "relative",
    gap: 20,
    alignItems: "center",
  },
  box5: {
    position: "relative",
    width: 128,
    height: 128,
    flexShrink: 0,
  },
  artBox2: {
    transform: "rotate(-90deg)",
  },
  box6: {
    flexDirection: "column",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  text2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 36,
    letterSpacing: -1.4,
    lineHeight: 36,
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
    lineHeight: 11,
  },
  box7: {
    flexDirection: "column",
    flexShrink: 1,
    gap: 8,
    alignItems: "flex-start",
  },
  box8: {
    flexDirection: "row",
    height: 26,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 4,
    alignItems: "center",
    backgroundColor: "rgba(18,160,106,0.22)",
    borderRadius: 13,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#7BE3B6",
    fontSize: 12,
  },
  text4: {
    color: "#FFB200",
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 20,
    letterSpacing: -0.6,
    lineHeight: 23,
  },
  text6: {
    fontFamily: font.manrope[600],
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    lineHeight: 18.2,
  },
  box9: {
    flexDirection: "row",
    position: "relative",
    gap: 4,
  },
  box10: {
    flexDirection: "column",
    gap: 8,
    flexGrow: 40,
    flexShrink: 1,
    flexBasis: 0,
  },
  box11: {
    height: 6,
    backgroundColor: "rgba(255,178,0,0.55)",
    borderRadius: 3,
  },
  text7: {
    fontFamily: font.manrope[800],
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
  },
  box12: {
    flexDirection: "column",
    gap: 8,
    flexGrow: 20,
    flexShrink: 1,
    flexBasis: 0,
  },
  box13: {
    height: 6,
    backgroundImage: "linear-gradient(90deg, #FFD266, #FFB200)",
    borderRadius: 3,
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 11,
  },
  box14: {
    flexDirection: "column",
    gap: 8,
    flexGrow: 25,
    flexShrink: 1,
    flexBasis: 0,
  },
  box15: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 3,
  },
  box16: {
    flexDirection: "column",
    gap: 8,
    flexGrow: 15,
    flexShrink: 1,
    flexBasis: 0,
  },
  section2: {
    flexDirection: "column",
    gap: 12,
  },
  box17: {
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
  box18: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  link2: {
    flexDirection: "column",
    width: 171,
    paddingTop: 14,
    paddingRight: 12,
    paddingBottom: 14,
    paddingLeft: 12,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 22,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box19: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box20: {
    flexDirection: "row",
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundImage: "linear-gradient(145deg, #F4F6FF 0%, #E3E8FF 100%)",
    borderRadius: 12,
    boxShadow: "inset 0 0 0 1px rgba(14,28,145,0.05)",
  },
  text9: {
    fontFamily: font.manrope[800],
    color: "#8A93B8",
    fontSize: 11,
    textDecorationLine: "none",
  },
  box21: {
    flexDirection: "column",
    gap: 4,
  },
  text10: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 24,
    letterSpacing: -0.8,
    lineHeight: 24,
    textDecorationLine: "none",
  },
  text11: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 13,
    lineHeight: 13,
    textDecorationLine: "none",
  },
  text12: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 11,
    lineHeight: 13.2,
    textDecorationLine: "none",
  },
  box22: {
    height: 6,
    overflow: "hidden",
    backgroundColor: "#EEF0F8",
    borderRadius: 3,
  },
  box23: {
    width: "31%",
    height: 6,
    backgroundColor: "#D92D3A",
    borderRadius: 3,
  },
  box24: {
    width: "34%",
    height: 6,
    backgroundColor: "#D92D3A",
    borderRadius: 3,
  },
  box25: {
    width: "41%",
    height: 6,
    backgroundColor: "#FFB200",
    borderRadius: 3,
  },
  box26: {
    width: "60%",
    height: 6,
    backgroundColor: "#FFB200",
    borderRadius: 3,
  },
  section3: {
    flexDirection: "column",
    padding: 16,
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box27: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  text13: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 12,
  },
  box28: {
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-end",
  },
  text14: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 22,
    letterSpacing: -0.6,
    lineHeight: 22,
  },
  box29: {
    flexDirection: "row",
    height: 120,
    gap: 8,
    alignItems: "flex-end",
  },
  button: {
    flexDirection: "column",
    height: 120,
    padding: 0,
    gap: 8,
    justifyContent: "flex-end",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  box30: {
    width: "100%",
    minHeight: 4,
    borderRadius: 10,
  },
  text15: {
    fontFamily: font.manrope[800],
    fontSize: 11,
    lineHeight: 11,
  },
  text16: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 13,
  },
  box31: {
    flexDirection: "column",
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  link3: {
    flexDirection: "row",
    position: "relative",
    minHeight: 68,
    padding: 12,
    gap: 12,
    alignItems: "center",
  },
  box32: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundImage: "conic-gradient(#D92D3A 0 41%, #F3E3E2 41% 100%)",
    borderRadius: 22,
  },
  box33: {
    flexDirection: "row",
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
  },
  label2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 12,
    textDecorationLine: "none",
  },
  box34: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text17: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    lineHeight: 18,
    textDecorationLine: "none",
  },
  text18: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 14.4,
    textDecorationLine: "none",
  },
  box35: {
    flexDirection: "row",
    height: 32,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 4,
    alignItems: "center",
    backgroundColor: "#0E1C91",
    borderRadius: 16,
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 12,
    textDecorationLine: "none",
  },
  box36: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 0,
    height: 1,
    backgroundColor: "#EEF0F8",
  },
  box37: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundImage: "conic-gradient(#D92D3A 0 55%, #F3E3E2 55% 100%)",
    borderRadius: 22,
  },
  box38: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundImage: "conic-gradient(#D92D3A 0 62%, #F3E3E2 62% 100%)",
    borderRadius: 22,
  },
  box39: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  label4: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 12,
    textAlign: "center",
  },
  box40: {
    position: "absolute",
    left: 0,
    top: 724,
    right: 0,
    height: 20,
    backgroundImage: "linear-gradient(180deg, rgba(246,247,253,0), #F6F7FD)",
  },
  link4: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 760,
    width: 350,
    height: 60,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 20,
    gap: 10,
    alignItems: "center",
    backgroundImage: "radial-gradient(120% 140% at 0% 0%, #2638DA 0%, #0E1C91 60%, #08106A 100%)",
    borderRadius: 30,
    boxShadow: "0 14px 24px -14px rgba(14,28,145,0.7)",
  },
  box41: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  label5: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
    letterSpacing: -0.2,
    textDecorationLine: "none",
  },
  box42: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 22,
  },
});
