import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useQuickTestRunViewModel } from "../hooks/useQuickTestRunViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { CtaButton } from "@/components/CtaButton";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/quickTestRun.art";
import { strings } from "../strings";

const s = strings.quickTestRun;

export function QuickTestRunScreen() {
  const router = useRouter();
  const vm = useQuickTestRunViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <Pressable
        style={styles.button}
        onPress={vm.askQuit}
        accessibilityRole="button"
        accessibilityLabel="Quit test"
      >
        <SvgXml xml={art.art1} width={18} height={18} />
      </Pressable>
      <View style={styles.timeLeftTimeleftBox}>
        <SvgXml xml={art.timerRingArt(vm.timeFraction)} width={30} height={30} />
        <Text style={styles.text}>{vm.timeLeft}</Text>
      </View>
      <View style={styles.questionQnumOf30Box}>
        <Text style={styles.text2}>{vm.qNum}</Text>
        <Text style={styles.text3}>{`/${vm.questionCount}`}</Text>
      </View>
      <View style={styles.questionsBox}>
        {vm.strip.map((d) => (
          <Fragment key={d.key}>
            <Pressable
              style={styles.button2}
              onPress={d.go}
              accessibilityRole="button"
              accessibilityLabel={d.aria}
            >
              <View style={[styles.box, { height: d.h, backgroundColor: d.bg, ...d.border }]} />
            </Pressable>
          </Fragment>
        ))}
      </View>
      <ScrollView
        style={styles.box2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.boxContent}
      >
        <View style={styles.box3}>
          <SvgXml
            xml={art.art3}
            width={350}
            height={176}
            style={[styles.artBox, { display: vm.scene === "stop" ? "flex" : "none" }]}
          />
          <SvgXml
            xml={art.art4}
            width={350}
            height={176}
            style={[styles.artBox, { display: vm.scene === "cross" ? "flex" : "none" }]}
          />
        </View>
        <Text style={styles.title}>{vm.question}</Text>
        <View style={styles.answersBox}>
          {vm.answers.map((a) => (
            <Fragment key={a.key}>
              <Pressable
                style={[
                  styles.button3,
                  { ...a.border, backgroundColor: a.bg, opacity: a.op, boxShadow: a.shadow },
                ]}
                onPress={a.pick}
                accessibilityRole="button"
              >
                <View style={[styles.box4, { backgroundColor: a.badgeBg }]}>
                  <SvgXml
                    xml={art.answerMarkArt(a.isRight)}
                    width={18}
                    height={18}
                    style={{ display: a.markShow }}
                  />
                  <Text style={[styles.label, { color: a.badgeFg }]}>{a.letter}</Text>
                </View>
                <View style={styles.box5}>
                  <Text style={[styles.label2, { fontFamily: a.fontFamily }]}>{a.text}</Text>
                </View>
              </Pressable>
            </Fragment>
          ))}
        </View>
      </ScrollView>
      <View style={styles.box6} />
      <View style={styles.oknCorrectBadnOfBox}>
        <View style={styles.box7}>
          <View style={styles.box8}>
            <SvgXml xml={art.art6} width={14} height={14} />
          </View>
          <View style={styles.box9}>
            <View style={styles.box10}>
              <Text style={styles.text4}>{vm.okN}</Text>
            </View>
            <Text style={styles.text5}>{s.correct}</Text>
          </View>
        </View>
        <View style={[styles.box11, { backgroundColor: vm.badBg, ...vm.badBorder }]}>
          <View style={styles.box12}>
            <SvgXml xml={art.art7} width={13} height={13} />
          </View>
          <View style={styles.box9}>
            <View style={styles.box10}>
              <Text style={styles.text6}>{vm.badN}</Text>
              <Text style={styles.text7}>{`/${vm.maxMist}`}</Text>
            </View>
            <Text style={styles.text8}>{vm.badWord}</Text>
          </View>
        </View>
        <View style={[styles.box11, { backgroundColor: vm.skipBg }]}>
          <View style={[styles.box13, { backgroundColor: vm.skipDot }]}>
            <SvgXml xml={art.art8} width={14} height={14} />
          </View>
          <View style={styles.box9}>
            <View style={styles.box10}>
              <Text style={[styles.text9, { color: vm.skipFg }]}>{vm.skipN}</Text>
            </View>
            <Text style={[styles.text10, { color: vm.skipFg }]}>{s.skipped}</Text>
          </View>
        </View>
      </View>
      <Pressable
        style={[styles.button4, { opacity: vm.prevOp }]}
        onPress={vm.prev}
        accessibilityRole="button"
        accessibilityLabel="Previous question"
      >
        <SvgXml xml={art.art9} width={20} height={20} />
      </Pressable>
      <Pressable
        style={[
          styles.button5,
          { ...vm.nextBorder, backgroundColor: vm.nextBg, boxShadow: vm.nextShadow },
        ]}
        onPress={vm.next}
        accessibilityRole="button"
      >
        <View style={styles.box14}>
          <Text style={styles.text11}>{vm.nextLabel}</Text>
          <View style={[styles.box15, { display: vm.nextSubShow }]}>
            <Text style={styles.label3}>{s.answerItAtThe}</Text>
          </View>
        </View>
        <View style={[styles.box16, { backgroundColor: vm.nextDotBg }]}>
          <SvgXml xml={art.nextArrowArt(vm.nextDotFg)} width={18} height={18} />
        </View>
      </Pressable>
      <Pressable
        style={[styles.link, { display: vm.finishShow }]}
        onPress={() => router.push("/test-result")}
        accessibilityRole="link"
      >
        <Text style={styles.label4}>{s.finishTest}</Text>
        <View style={styles.box17}>
          <SvgXml xml={art.art11} width={18} height={18} />
        </View>
      </Pressable>
      {vm.quitOpen ? (
        <>
          <Pressable
            style={styles.button6}
            onPress={vm.closeQuit}
            accessibilityRole="button"
            accessibilityLabel="Close"
          />
          <View style={styles.quitTestBox}>
            <View style={styles.box18} />
            <View style={styles.box19}>
              <SvgXml xml={art.art12} width={28} height={28} />
            </View>
            <Text style={styles.text12}>{s.leaveTheTest}</Text>
            <Text style={styles.text14}>
              {s.youHaveAnswered}{" "}
              <Text style={styles.text13}>{`${vm.answeredN} of ${vm.questionCount}`}</Text>
              {s.thisAttemptWillNot}
            </Text>
            <Pressable style={styles.button7} onPress={vm.closeQuit} accessibilityRole="button">
              <Text style={styles.label5}>{s.keepGoing}</Text>
            </Pressable>
            <Pressable
              style={styles.link2}
              onPress={() => router.push("/quick-test")}
              accessibilityRole="link"
            >
              <Text style={styles.label6}>{s.leaveTest}</Text>
            </Pressable>
          </View>
        </>
      ) : null}
      {vm.endedOpen ? (
        <>
          <View style={styles.box20} />
          <View style={styles.testOverBox}>
            <View style={styles.box18} />
            <View style={styles.box21}>
              <View style={styles.box22}>
                <SvgXml xml={art.art13} width={18} height={18} />
              </View>
            </View>
            <Text style={styles.text12}>{s.testOver}</Text>
            <Text style={styles.text14}>
              {s.thatWasYour} <Text style={styles.text15}>{`${vm.overLimitOrdinal} mistake`}</Text>
              {s.theExamAllows5.replace("{max}", vm.maxMist)}
            </Text>
            <CtaButton label={s.seeResult} onPress={() => router.push("/test-result-failed")} />
          </View>
        </>
      ) : null}
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  button: {
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
  timeLeftTimeleftBox: {
    flexDirection: "row",
    position: "absolute",
    left: 141,
    top: 54,
    width: 108,
    height: 44,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 7,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
  text: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 18,
    letterSpacing: 0.5,
  },
  questionQnumOf30Box: {
    flexDirection: "row",
    position: "absolute",
    top: 54,
    right: 20,
    height: 44,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 14,
    gap: 4,
    justifyContent: "center",
    alignItems: "baseline",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#0E1C91",
    borderRadius: 22,
  },
  text2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 20,
    letterSpacing: -0.5,
    lineHeight: 41,
  },
  text3: {
    fontFamily: font.spaceGrotesk[700],
    color: "#8A93B8",
    fontSize: 14,
    lineHeight: 41,
  },
  questionsBox: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 108,
    right: 20,
    height: 18,
    gap: 4,
  },
  button2: {
    flexDirection: "row",
    flex: 1,
    height: 18,
    padding: 0,
    alignItems: "center",
  },
  box: {
    width: "100%",
    borderRadius: 3,
  },
  boxContent: {
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    gap: 16,
  },
  box2: {
    position: "absolute",
    left: 0,
    top: 136,
    right: 0,
    height: 538,
  },
  box3: {
    position: "relative",
    height: 176,
    flexShrink: 0,
    overflow: "hidden",
    backgroundColor: "#DCEBFF",
    borderRadius: 20,
    boxShadow: "0 10px 24px rgba(14,28,145,0.08)",
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  title: {
    marginTop: 0,
    marginRight: 2,
    marginBottom: 0,
    marginLeft: 2,
    flexShrink: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 18,
    letterSpacing: -0.3,
    lineHeight: 24.3,
  },
  answersBox: {
    flexDirection: "column",
    gap: 8,
    flexShrink: 0,
  },
  button3: {
    flexDirection: "row",
    minHeight: 58,
    paddingTop: 8,
    paddingRight: 14,
    paddingBottom: 8,
    paddingLeft: 8,
    gap: 12,
    alignItems: "center",
    borderRadius: 20,
  },
  box4: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 14,
  },
  label: {
    fontFamily: font.spaceGrotesk[700],
    fontSize: 15,
    textAlign: "left",
  },
  box5: {
    flexGrow: 1,
  },
  label2: {
    fontFamily: font.manrope[500],
    fontSize: 14,
    lineHeight: 18.9,
    textAlign: "left",
  },
  box6: {
    position: "absolute",
    left: 0,
    top: 652,
    right: 0,
    height: 22,
    backgroundImage: "linear-gradient(180deg, rgba(246,247,253,0), #F6F7FD)",
    pointerEvents: "none",
  },
  oknCorrectBadnOfBox: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 690,
    right: 20,
    gap: 8,
  },
  box7: {
    flexDirection: "row",
    height: 54,
    minWidth: 0,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#E7F6EF",
    borderRadius: 20,
  },
  box8: {
    flexDirection: "row",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#12A06A",
    borderRadius: 15,
  },
  box9: {
    flexDirection: "column",
    minWidth: 0,
    flexShrink: 1,
    gap: 6,
    alignItems: "flex-start",
  },
  box10: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  text4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0B8457",
    fontSize: 20,
    letterSpacing: -0.4,
    lineHeight: 20,
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#3F6B57",
    fontSize: 11,
    lineHeight: 11,
  },
  box11: {
    flexDirection: "row",
    height: 54,
    minWidth: 0,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderRadius: 20,
  },
  box12: {
    flexDirection: "row",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#E5484D",
    borderRadius: 15,
  },
  text6: {
    fontFamily: font.spaceGrotesk[700],
    color: "#D92D3A",
    fontSize: 20,
    letterSpacing: -0.4,
    lineHeight: 20,
  },
  text7: {
    fontFamily: font.spaceGrotesk[700],
    color: "#A3303B",
    fontSize: 12,
    lineHeight: 12,
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "#A3303B",
    fontSize: 11,
    lineHeight: 11,
  },
  box13: {
    flexDirection: "row",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 15,
  },
  text9: {
    fontFamily: font.spaceGrotesk[700],
    fontSize: 20,
    letterSpacing: -0.4,
    lineHeight: 20,
  },
  text10: {
    fontFamily: font.manrope[800],
    fontSize: 11,
    lineHeight: 11,
  },
  button4: {
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
  button5: {
    flexDirection: "row",
    position: "absolute",
    left: 88,
    right: 20,
    bottom: 24,
    height: 60,
    paddingTop: 0,
    paddingRight: 9,
    paddingBottom: 0,
    paddingLeft: 22,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 30,
  },
  box14: {
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-start",
  },
  text11: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
  },
  box15: {
    flexDirection: "row",
  },
  label3: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 11,
  },
  box16: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
  },
  link: {
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
  label4: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    textDecorationLine: "none",
  },
  box17: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
  button6: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    backgroundColor: "rgba(10,14,46,0.45)",
  },
  quitTestBox: {
    flexDirection: "column",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 30,
    paddingLeft: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  box18: {
    width: 40,
    height: 5,
    backgroundColor: "#DDE2FA",
    borderRadius: 3,
  },
  box19: {
    flexDirection: "row",
    width: 64,
    height: 64,
    marginTop: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF4D6",
    borderRadius: 20,
  },
  text12: {
    marginTop: 16,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 20,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  text13: {
    color: "#0A0E2E",
  },
  text14: {
    maxWidth: 300,
    marginTop: 8,
    fontFamily: font.manrope[600],
    color: "#566086",
    fontSize: 13,
    lineHeight: 18.85,
    textAlign: "center",
  },
  button7: {
    width: "100%",
    height: 60,
    marginTop: 22,
    backgroundColor: "#0E1C91",
    borderRadius: 30,
  },
  label5: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  link2: {
    flexDirection: "row",
    width: "100%",
    height: 48,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  label6: {
    fontFamily: font.manrope[800],
    color: "#D92D3A",
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "none",
  },
  box20: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10,14,46,0.45)",
  },
  testOverBox: {
    flexDirection: "column",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 24,
    paddingLeft: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  box21: {
    flexDirection: "row",
    width: 64,
    height: 64,
    marginTop: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE8EA",
    borderRadius: 20,
  },
  box22: {
    flexDirection: "row",
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D92D3A",
    borderRadius: 18,
  },
  text15: {
    color: "#D92D3A",
  },
});
