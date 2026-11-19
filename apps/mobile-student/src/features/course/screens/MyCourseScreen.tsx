import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useMyCourseViewModel } from "../hooks/useMyCourseViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { MaterialChipGrid } from "../components/MaterialChipGrid";
import { ModuleCard } from "../components/ModuleCard";
import { LessonRow } from "../components/LessonRow";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/myCourse.art";
import { strings } from "../strings";

const s = strings.myCourse;

export function MyCourseScreen() {
  const router = useRouter();
  const vm = useMyCourseViewModel();
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
          <View style={styles.box5}>
            <Pressable
              style={styles.link}
              onPress={() => router.push("/lesson-player")}
              accessibilityRole="link"
              accessibilityLabel={`Continue watching: ${vm.current.title}, ${vm.current.left} left`}
            >
              <SvgXml xml={art.art3} width={350} height={252} style={styles.artBox2} />
              <View style={styles.box6}>
                <View style={styles.box7} />
                <Text style={styles.label}>{vm.current.line}</Text>
              </View>
              <View style={styles.box8}>
                <SvgXml xml={art.art4} width={24} height={24} />
              </View>
              <View style={styles.box9}>
                <View style={styles.box10}>
                  <Text style={styles.text2}>{s.continueWatching}</Text>
                  <Text style={styles.text3}>{vm.current.title}</Text>
                </View>
                <View style={styles.box11}>
                  <View style={styles.box12}>
                    <View style={[styles.box13, { width: `${vm.current.percent}%` }]} />
                  </View>
                  <Text style={styles.text4}>{`${vm.current.left} left`}</Text>
                </View>
              </View>
            </Pressable>
            <View style={styles.box5}>
              <View style={styles.box14}>
                <Text style={styles.text5}>{s.studyMaterial}</Text>
                <View style={styles.box15} />
              </View>
              <MaterialChipGrid chips={vm.materials} width={350} />
            </View>
          </View>
          <View style={styles.section}>
            <SvgXml xml={art.art68} width={350} height={160} style={styles.artBox2} />
            <View style={styles.box23}>
              <View style={styles.box24}>
                <Text style={styles.text7}>{s.courseProgress}</Text>
                <View style={styles.box25}>
                  <Text style={styles.text8}>{`${vm.ringPercent}%`}</Text>
                  <Text style={styles.text9}>{s.complete}</Text>
                </View>
              </View>
            </View>
            <View style={styles.box26}>
              {vm.segments.map((segment, index) => (
                <View key={index} style={[styles.box27, { flexGrow: segment.lessons }]}>
                  <View
                    style={[
                      styles.box28,
                      { width: `${segment.percent}%`, backgroundColor: segment.color },
                    ]}
                  />
                </View>
              ))}
            </View>
            <View style={styles.box29}>
              {vm.stats.map((t, index) => (
                <Fragment key={index}>
                  <View
                    style={[styles.tAriaBox, index > 0 && styles.statDivider]}
                    accessibilityLabel={t.accessibilityLabel}
                  >
                    <Text style={styles.text12}>
                      <Text style={styles.text10}>{t.n}</Text>
                      <Text style={styles.text11}>{t.of}</Text>
                    </Text>
                    <Text style={styles.text7}>{t.label}</Text>
                  </View>
                </Fragment>
              ))}
            </View>
          </View>
          <View style={styles.box5}>
            <View style={styles.box30}>
              <Text style={styles.heading}>{s.modules}</Text>
              <Text style={styles.text13}>{s.n9Modules36Videos}</Text>
            </View>
            <View style={styles.box24}>
              {vm.rows.map((row) =>
                row.kind === "module" ? (
                  <ModuleCard key={row.key} module={row.module} onToggle={row.toggle} />
                ) : (
                  <LessonRow key={row.key} lesson={row.lesson} />
                ),
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box46} />
      <View style={styles.nav}>
        <Pressable
          style={styles.link3}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
          accessibilityLabel="Home"
        >
          <SvgXml xml={art.art145} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link4}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art146} width={20} height={20} />
          <Text style={styles.label4}>{s.myCourse}</Text>
        </Pressable>
        <Pressable
          style={styles.link3}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art147} width={22} height={22} />
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
    gap: 24,
  },
  box5: {
    flexDirection: "column",
    gap: 12,
  },
  link: {
    position: "relative",
    height: 252,
    overflow: "hidden",
    backgroundColor: "#060B4A",
    borderRadius: 28,
    boxShadow: "0 22px 32px -14px rgba(14,28,145,0.45)",
  },
  artBox2: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box6: {
    flexDirection: "row",
    position: "absolute",
    left: 16,
    top: 16,
    height: 28,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 14,
  },
  box7: {
    width: 8,
    height: 8,
    backgroundColor: "#FFB200",
    borderRadius: 4,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 12,
    textDecorationLine: "none",
  },
  box8: {
    flexDirection: "row",
    position: "absolute",
    left: 143,
    top: 52,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 32,
    boxShadow: "0 0 0 8px rgba(255,255,255,0.12)",
  },
  box9: {
    flexDirection: "column",
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    padding: 16,
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
  },
  box10: {
    flexDirection: "column",
    gap: 4,
  },
  text2: {
    fontFamily: font.manrope[800],
    color: "#FFB200",
    fontSize: 12,
    letterSpacing: 0.6,
    lineHeight: 12,
    textTransform: "uppercase",
    textDecorationLine: "none",
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 19,
    letterSpacing: -0.4,
    lineHeight: 22.8,
    textDecorationLine: "none",
  },
  box11: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  box12: {
    height: 6,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 3,
  },
  box13: {
    height: 6,
    backgroundColor: "#FFB200",
    borderRadius: 3,
  },
  text4: {
    fontFamily: font.spaceGrotesk[700],
    color: "rgba(255,255,255,0.86)",
    fontSize: 13,
    textDecorationLine: "none",
  },
  box14: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#8A93B8",
    fontSize: 11,
    letterSpacing: 0.6,
    lineHeight: 11,
    textTransform: "uppercase",
  },
  box15: {
    height: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#E2E6F4",
  },
  section: {
    flexDirection: "column",
    position: "relative",
    height: 160,
    padding: 16,
    gap: 16,
  },
  box23: {
    flexDirection: "row",
    position: "relative",
    gap: 12,
  },
  box24: {
    flexDirection: "column",
    gap: 8,
  },
  text7: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    lineHeight: 12,
  },
  box25: {
    flexDirection: "row",
    gap: 8,
    alignItems: "baseline",
  },
  text8: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 32,
    letterSpacing: -1.2,
    lineHeight: 32,
  },
  text9: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 13,
    lineHeight: 13,
  },
  box26: {
    flexDirection: "row",
    position: "relative",
    gap: 4,
  },
  box27: {
    height: 8,
    overflow: "hidden",
    backgroundColor: "#EEF1FF",
    borderRadius: 4,
  },
  box28: {
    height: 8,
    borderRadius: 4,
  },
  box29: {
    flexDirection: "row",
    position: "relative",
  },
  tAriaBox: {
    flexDirection: "column",
    flex: 1,
    gap: 6,
  },
  statDivider: {
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: "#EEF0F8",
  },
  text10: {
    color: "#0A0E2E",
  },
  text11: {
    color: "#A2A9C8",
  },
  text12: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 16,
    lineHeight: 16,
  },
  box30: {
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
  text13: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 12,
  },
  box46: {
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
  link3: {
    flexDirection: "row",
    width: 86,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
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
  label4: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    textDecorationLine: "none",
  },
});
