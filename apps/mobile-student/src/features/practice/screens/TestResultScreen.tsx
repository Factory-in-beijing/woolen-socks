import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useTestResultViewModel, type TestOutcome } from "../hooks/useTestResultViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/testResult.art";
import { strings } from "../strings";

const s = strings.testResult;

export function TestResultScreen({ outcome = "passed" }: { outcome?: TestOutcome }) {
  const router = useRouter();
  const vm = useTestResultViewModel(outcome);
  return (
    <ScreenFrame background="#F6F7FD">
      <Pressable
        style={styles.link}
        onPress={() => router.push("/quick-test")}
        accessibilityRole="link"
        accessibilityLabel="Close"
      >
        <SvgXml xml={art.art1} width={18} height={18} />
      </Pressable>
      <View style={styles.box}>
        <Text style={styles.label}>{s.testResult}</Text>
      </View>
      <View style={styles.box2}>
        <SvgXml xml={art.art2} width={16} height={16} />
        <Text style={styles.label2}>{vm.time}</Text>
      </View>
      <View style={[styles.section, { backgroundColor: vm.heroBg }]}>
        <SvgXml xml={art.art3} width={350} height={194} style={styles.artBox} />
        <SvgXml
          xml={art.resultRingArt(vm.ringColor, vm.ringFraction)}
          width={104}
          height={104}
          style={styles.artBox2}
        />
        <View style={styles.box3}>
          <Text style={styles.text}>{vm.okN}</Text>
          <Text style={styles.text2}>{s.of30}</Text>
        </View>
        <View style={styles.box4}>
          <View style={[styles.box5, { backgroundColor: vm.chipBg }]}>
            <SvgXml xml={art.resultChipArt(vm.passed)} width={14} height={14} />
            <Text style={[styles.label3, { color: vm.chipFg }]}>{vm.chipLabel}</Text>
          </View>
          <Text style={styles.text3}>{vm.title}</Text>
          <Text style={styles.text4}>{vm.sub}</Text>
        </View>
        <View style={styles.box6}>
          <View style={styles.box7}>
            <Text style={styles.text5}>{vm.streakLabel}</Text>
            <Text style={styles.text6}>{vm.streakHint}</Text>
          </View>
          <View style={styles.box8}>
            {vm.pips.map((p, index) => (
              <Fragment key={index}>
                <View style={[styles.box9, { backgroundColor: p.bg }]} />
              </Fragment>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.box10}>
        <Text style={styles.heading}>{s.mistakesToReview}</Text>
        <Text style={styles.text7}>{s.tapToSeeWhy}</Text>
      </View>
      <ScrollView
        style={styles.box11}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.boxContent}
      >
        {vm.mistakes.map((m) => (
          <Fragment key={m.key}>
            <Pressable
              style={styles.link2}
              onPress={() => router.push("/ticket")}
              accessibilityRole="link"
              accessibilityLabel={m.aria}
            >
              <View style={styles.box12}>
                <Text style={styles.label4}>{m.num}</Text>
              </View>
              <View style={styles.box13}>
                <View style={styles.box14}>
                  <Text style={styles.label5}>{m.q}</Text>
                </View>
                <Text style={styles.text10}>
                  {s.you} <Text style={styles.text8}>{m.yours}</Text> {s.correct}{" "}
                  <Text style={styles.text9}>{m.right}</Text>
                </Text>
              </View>
              <SvgXml xml={art.art6} width={18} height={18} style={styles.artBox3} />
            </Pressable>
          </Fragment>
        ))}
      </ScrollView>
      <View style={styles.box15} />
      <Pressable
        style={styles.link3}
        onPress={() => router.push("/quick-test")}
        accessibilityRole="link"
        accessibilityLabel="Back to Quick test"
      >
        <SvgXml xml={art.art7} width={20} height={20} />
      </Pressable>
      <Pressable
        style={styles.link4}
        onPress={() => router.push("/quick-test-run")}
        accessibilityRole="link"
      >
        <Text style={styles.label6}>{vm.againLabel}</Text>
        <View style={styles.box16}>
          <SvgXml xml={art.art8} width={18} height={18} />
        </View>
      </Pressable>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  link: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 54,
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
    position: "absolute",
    left: 76,
    top: 58,
    margin: 0,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 26,
    letterSpacing: -0.8,
    lineHeight: 36,
  },
  box2: {
    flexDirection: "row",
    position: "absolute",
    top: 54,
    right: 20,
    height: 44,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 22,
  },
  label2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 15,
  },
  section: {
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 194,
    overflow: "hidden",
    borderRadius: 28,
    boxShadow: "0 18px 40px rgba(14,28,145,0.22)",
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  artBox2: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  box3: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    top: 20,
    width: 104,
    height: 104,
    paddingTop: 6,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 30,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  text2: {
    fontFamily: font.spaceGrotesk[700],
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    lineHeight: 12,
  },
  box4: {
    flexDirection: "column",
    position: "absolute",
    left: 136,
    top: 20,
    right: 20,
    gap: 8,
    alignItems: "flex-start",
  },
  box5: {
    flexDirection: "row",
    height: 28,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 8,
    gap: 4,
    alignItems: "center",
    borderRadius: 14,
  },
  label3: {
    fontFamily: font.manrope[800],
    fontSize: 12,
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 22,
    letterSpacing: -0.6,
    lineHeight: 25.3,
  },
  text4: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    lineHeight: 17.55,
  },
  box6: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    gap: 8,
  },
  box7: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 12,
  },
  text6: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
  },
  box8: {
    flexDirection: "row",
    gap: 4,
    flexWrap: "wrap",
  },
  box9: {
    height: 6,
    borderRadius: 3,
  },
  box10: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 332,
    right: 20,
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
  text7: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 12,
  },
  boxContent: {
    gap: 8,
  },
  box11: {
    position: "absolute",
    left: 20,
    top: 364,
    width: 350,
    height: 380,
  },
  link2: {
    flexDirection: "row",
    minHeight: 72,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 8,
    gap: 12,
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
  },
  box12: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFE8EA",
    borderRadius: 14,
  },
  label4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#D92D3A",
    fontSize: 13,
    textDecorationLine: "none",
  },
  box13: {
    flexDirection: "column",
    minWidth: 0,
    flexShrink: 1,
    gap: 4,
    flexGrow: 1,
  },
  box14: {
    overflow: "hidden",
  },
  label5: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    lineHeight: 18.2,
    textDecorationLine: "none",
  },
  text8: {
    color: "#D92D3A",
  },
  text9: {
    color: "#0B8457",
  },
  text10: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 12,
    textDecorationLine: "none",
  },
  artBox3: {
    flexShrink: 0,
  },
  box15: {
    position: "absolute",
    left: 0,
    top: 722,
    right: 0,
    height: 22,
    backgroundImage: "linear-gradient(180deg, rgba(246,247,253,0), #F6F7FD)",
  },
  link3: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 30,
  },
  link4: {
    flexDirection: "row",
    position: "absolute",
    left: 88,
    right: 20,
    bottom: 24,
    height: 60,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 30,
    boxShadow: "0 14px 30px rgba(14,28,145,0.2)",
  },
  label6: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    textDecorationLine: "none",
  },
  box16: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
});
