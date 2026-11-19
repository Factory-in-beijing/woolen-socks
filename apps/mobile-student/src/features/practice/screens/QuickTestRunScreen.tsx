import { Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useQuickTestRunViewModel } from "../hooks/useQuickTestRunViewModel";
import { SvgXml } from "react-native-svg";
import { CtaButton } from "@/components/CtaButton";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/quickTestRun.art";
import { strings } from "../strings";
import { styles } from "./QuickTestRunScreen.styles";

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
