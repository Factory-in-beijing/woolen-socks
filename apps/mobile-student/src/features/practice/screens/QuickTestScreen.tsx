import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useQuickTestViewModel } from "../hooks/useQuickTestViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/quickTest.art";
import { quickTestDefinition } from "../definition";
import { strings } from "../strings";

const s = strings.quickTest;

export function QuickTestScreen() {
  const router = useRouter();
  const vm = useQuickTestViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <SvgXml xml={art.art1} width={0} height={0} style={styles.artBox} />
      <Pressable
        style={styles.link}
        onPress={() => router.push("/home-signed-in")}
        accessibilityRole="link"
        accessibilityLabel="Back"
      >
        <SvgXml xml={art.art2} width={20} height={20} />
      </Pressable>
      <View style={styles.box}>
        <Text style={styles.label}>{s.quickTest}</Text>
      </View>
      <View style={styles.box2}>
        <View style={styles.box3}>
          <SvgXml xml={art.art3} width={30} height={19} />
        </View>
        <Text style={styles.text}>{s.bB1}</Text>
      </View>
      <SvgXml xml={art.art4} width={350} height={250} style={styles.artBox2} />
      <View style={styles.box4} />
      <SvgXml xml={art.art5} width={96} height={108} style={styles.artBox3} />
      <View style={styles.box5}>
        <View style={styles.box6} />
        <Text style={styles.label2}>{s.examSimulation}</Text>
      </View>
      <View style={styles.box7}>
        <Text style={styles.label3}>{s.justLikeTheReal}</Text>
      </View>
      <View style={styles.box8}>
        <View style={styles.box9}>
          <Text style={styles.text2}>{quickTestDefinition.questionCount}</Text>
          <Text style={styles.text3}>{s.questions}</Text>
        </View>
        <View style={styles.box9}>
          <Text style={styles.text2}>
            {quickTestDefinition.timeLimitMinutes}
            <Text style={styles.text4}>{s.min}</Text>
          </Text>
          <Text style={styles.text3}>{s.timeLimit}</Text>
        </View>
        <View style={styles.box10}>
          <Text style={styles.text5}>{quickTestDefinition.maxMistakes}</Text>
          <Text style={styles.text6}>{s.mistakesMax}</Text>
        </View>
      </View>
      <View style={styles.box11}>
        <View style={styles.box12}>
          <SvgXml
            xml={art.readyRingArt(vm.readyFraction)}
            width={64}
            height={64}
            style={styles.artBox4}
          />
          <View style={styles.box13}>
            <Text style={styles.label4}>{vm.readyPct}</Text>
          </View>
        </View>
        <View style={styles.box14}>
          <Text style={styles.text7}>{vm.readyTitle}</Text>
          <Text style={styles.text8}>{vm.readySub}</Text>
          <View style={styles.box15}>
            {vm.streakPips.map((p, index) => (
              <Fragment key={index}>
                <View style={[styles.box16, { backgroundColor: p.bg }]} />
              </Fragment>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.box17}>
        <Text style={styles.heading}>{s.lastTests}</Text>
        <Text style={styles.text9}>{s.tapToReview}</Text>
      </View>
      <ScrollView
        style={styles.box18}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.boxContent}
      >
        {vm.history.map((h) => (
          <Fragment key={h.key}>
            <Pressable
              style={styles.link2}
              onPress={() => router.push("/test-result")}
              accessibilityRole="link"
            >
              <View style={[styles.box19, { backgroundColor: h.badgeBg }]}>
                <SvgXml xml={art.historyMarkArt(h.ok)} width={18} height={18} />
              </View>
              <View style={styles.box14}>
                <Text style={[styles.text10, { color: h.fg }]}>{h.verdict}</Text>
                <Text style={styles.text11}>{`${h.when} · ${h.time}`}</Text>
              </View>
              <Text style={styles.text13}>
                {h.score}
                <Text style={styles.text12}>{`/${quickTestDefinition.questionCount}`}</Text>
              </Text>
            </Pressable>
          </Fragment>
        ))}
      </ScrollView>
      <View style={styles.box20} />
      <Pressable
        style={styles.link3}
        onPress={() => router.push("/quick-test-run")}
        accessibilityRole="link"
      >
        <View style={styles.box21}>
          <Text style={styles.text14}>{s.startTest}</Text>
        </View>
        <View style={styles.box22}>
          <SvgXml xml={art.art8} width={18} height={18} />
        </View>
      </Pressable>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  artBox: {
    position: "absolute",
  },
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
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 7,
    gap: 8,
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
  box3: {
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
  artBox2: {
    position: "absolute",
    left: 20,
    top: 114,
  },
  box4: {
    position: "absolute",
    left: 266,
    top: 220,
    width: 76,
    height: 10,
    backgroundColor: "rgba(90,60,0,0.25)",
    borderRadius: 9999,
  },
  artBox3: {
    position: "absolute",
    left: 256,
    top: 110,
  },
  box5: {
    flexDirection: "row",
    position: "absolute",
    left: 40,
    top: 160,
    height: 24,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(10,14,46,0.1)",
    borderRadius: 12,
  },
  box6: {
    width: 7,
    height: 7,
    backgroundColor: "#0E1C91",
    borderRadius: 3.5,
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 11,
  },
  box7: {
    position: "absolute",
    left: 40,
    top: 194,
    width: 200,
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 24,
    letterSpacing: -0.8,
    lineHeight: 27.6,
  },
  box8: {
    flexDirection: "row",
    position: "absolute",
    left: 40,
    top: 282,
    width: 310,
    gap: 8,
  },
  box9: {
    flexDirection: "column",
    height: 62,
    minWidth: 0,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 20,
  },
  text2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 22,
    letterSpacing: -0.5,
  },
  text3: {
    fontFamily: font.manrope[700],
    color: "#5A4300",
    fontSize: 11,
  },
  text4: {
    fontSize: 13,
  },
  box10: {
    flexDirection: "column",
    height: 62,
    minWidth: 0,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#0A0E2E",
    borderRadius: 20,
  },
  text5: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFB200",
    fontSize: 22,
    letterSpacing: -0.5,
  },
  text6: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
  },
  box11: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 388,
    width: 350,
    padding: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
  },
  box12: {
    position: "relative",
    width: 64,
    height: 64,
    flexShrink: 0,
  },
  artBox4: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box13: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  label4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 18,
  },
  box14: {
    flexDirection: "column",
    minWidth: 0,
    flexShrink: 1,
    gap: 4,
    flexGrow: 1,
  },
  text7: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
  },
  text8: {
    fontFamily: font.manrope[600],
    color: "#566086",
    fontSize: 12,
    lineHeight: 16.8,
  },
  box15: {
    flexDirection: "row",
    marginTop: 4,
    gap: 4,
  },
  box16: {
    height: 5,
    flexGrow: 1,
    borderRadius: 3,
  },
  box17: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 516,
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
  text9: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 12,
  },
  boxContent: {
    gap: 8,
  },
  box18: {
    position: "absolute",
    left: 20,
    top: 548,
    width: 350,
    height: 196,
  },
  link2: {
    flexDirection: "row",
    height: 58,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 8,
    gap: 12,
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
  },
  box19: {
    flexDirection: "row",
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 14,
  },
  text10: {
    fontFamily: font.manrope[800],
    fontSize: 14,
    textDecorationLine: "none",
  },
  text11: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 11,
    textDecorationLine: "none",
  },
  text12: {
    color: "#8A93B8",
    fontSize: 13,
  },
  text13: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 17,
    textDecorationLine: "none",
  },
  box20: {
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
    right: 20,
    bottom: 24,
    height: 60,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0E1C91",
    borderRadius: 30,
    boxShadow: "0 14px 30px rgba(14,28,145,0.3)",
  },
  box21: {
    flexDirection: "column",
    gap: 4,
  },
  text14: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 17,
    letterSpacing: -0.3,
    textDecorationLine: "none",
  },
  box22: {
    flexDirection: "row",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 24,
  },
});
