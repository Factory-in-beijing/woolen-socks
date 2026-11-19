import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useSignQuizViewModel } from "../hooks/useSignQuizViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/signQuiz.art";
import { strings } from "../strings";

const s = strings.signQuiz;

export function SignQuizScreen({ groupId }: { groupId: number }) {
  const router = useRouter();
  const vm = useSignQuizViewModel(groupId);
  return (
    <ScreenFrame background="#F6F7FD">
      <Pressable
        style={styles.link}
        onPress={() => router.push(`/sign-group${groupId === 1 ? "" : groupId}`)}
        accessibilityRole="link"
        accessibilityLabel="Leave the quiz"
      >
        <SvgXml xml={art.art1} width={20} height={20} />
      </Pressable>
      <View style={styles.box}>
        <Text style={styles.text}>{s.signQuiz}</Text>
        <Text style={styles.text2}>{s.prioritySigns}</Text>
      </View>
      <View style={styles.questionQnumOfQtotalBox}>
        <View style={styles.box2}>
          <Text style={styles.text3}>{vm.qNum}</Text>
          <Text style={styles.text4}>{`/${vm.qTotal}`}</Text>
        </View>
      </View>
      <View style={styles.box3}>
        {vm.strip.map((d) => (
          <Fragment key={d.key}>
            <View style={[styles.box4, { backgroundColor: d.bg }]} />
          </Fragment>
        ))}
      </View>
      <View style={styles.box5}>
        <SvgXml
          xml={vm.svg}
          width="100%"
          height={128}
          style={styles.image}
          accessibilityLabel="The road sign you need to name"
        />
      </View>
      <View style={styles.box6}>
        <Text style={styles.title}>{vm.prompt}</Text>
        <View style={[styles.box7, { display: vm.hintShow }]}>
          <SvgXml xml={art.art2} width={14} height={14} />
          <Text style={styles.label}>{s.tapToReadIn}</Text>
        </View>
        <View style={[styles.box8, { display: vm.codeShow }]}>
          <Text style={styles.label2}>{vm.codeLabel}</Text>
        </View>
      </View>
      <ScrollView style={styles.answersBox} showsVerticalScrollIndicator={false}>
        <View style={styles.box9}>
          {vm.answers.map((a) => (
            <Fragment key={a.key}>
              <View
                style={[
                  styles.box10,
                  { ...a.border, backgroundColor: a.bg, opacity: a.op, boxShadow: a.shadow },
                ]}
              >
                <Pressable style={styles.button} onPress={a.pick} accessibilityRole="button">
                  <View style={[styles.box11, { backgroundColor: a.badgeBg }]}>
                    <SvgXml
                      xml={art.answerMarkArt(a.isRight)}
                      width={18}
                      height={18}
                      style={{ display: a.markShow }}
                    />
                    <Text style={[styles.label3, { color: a.badgeFg }]}>{a.letter}</Text>
                  </View>
                  <View style={styles.box12}>
                    <Text style={styles.text5}>{a.name}</Text>
                    <View style={styles.box13}>
                      <Text style={styles.label4} numberOfLines={a.lines}>
                        {a.description}
                      </Text>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  style={[styles.button2, { backgroundColor: a.chevBg }]}
                  onPress={a.toggle}
                  accessibilityRole="button"
                  accessibilityLabel={a.toggleLabel}
                >
                  <SvgXml
                    xml={art.art4}
                    width={18}
                    height={18}
                    style={{ transform: [{ rotate: a.rot }] }}
                  />
                </Pressable>
              </View>
            </Fragment>
          ))}
        </View>
      </ScrollView>
      <View style={styles.box14} />
      <Pressable
        style={[
          styles.button3,
          { ...vm.nextBorder, backgroundColor: vm.nextBg, boxShadow: vm.nextShadow },
        ]}
        onPress={vm.next}
        disabled={!vm.nextEnabled}
        accessibilityRole="button"
      >
        <View style={styles.box15}>
          <Text style={[styles.text6, { color: vm.nextFg }]}>{vm.nextLabel}</Text>
          <Text style={[styles.text7, { color: vm.nextSubFg }]}>{vm.nextSub}</Text>
        </View>
        <View style={[styles.box16, { backgroundColor: vm.nextDotBg }]}>
          <SvgXml xml={art.nextArrowArt(vm.nextDotFg)} width={18} height={18} />
        </View>
      </Pressable>
      {vm.finished ? (
        <>
          <View style={styles.section}>
            <Pressable
              style={styles.link}
              onPress={() => router.push(`/sign-group${groupId === 1 ? "" : groupId}`)}
              accessibilityRole="link"
              accessibilityLabel="Back to the signs"
            >
              <SvgXml xml={art.art6} width={20} height={20} />
            </Pressable>
            <View style={styles.box17}>
              <Text style={styles.label5}>{s.signQuiz}</Text>
            </View>
            <View style={styles.box18}>
              <View style={styles.box19}>
                <SvgXml xml={art.scoreRingArt(vm.scoreFraction)} width={112} height={112} />
                <View style={styles.box20}>
                  <Text style={styles.text8}>{vm.okN}</Text>
                  <Text style={styles.text9}>{`/${vm.qTotal}`}</Text>
                </View>
              </View>
              <View style={styles.box21}>
                <Text style={styles.text10}>{vm.resTitle}</Text>
                <Text style={styles.text11}>{vm.resSub}</Text>
              </View>
            </View>
            <View style={styles.box22}>
              <Text style={styles.heading}>{vm.listTitle}</Text>
              <Text style={styles.text12}>{vm.listCount}</Text>
            </View>
            <ScrollView style={styles.box23} showsVerticalScrollIndicator={false}>
              <View style={styles.box9}>
                {vm.review.map((r) => (
                  <Fragment key={r.key}>
                    <View style={styles.box24}>
                      <View style={styles.box25}>
                        <SvgXml xml={r.svg} width="100%" height="100%" />
                      </View>
                      <View style={styles.box12}>
                        <Text style={styles.text4}>{r.code}</Text>
                        <Text style={styles.text13}>{r.name}</Text>
                        <Text style={styles.text14}>{r.desc}</Text>
                      </View>
                      <View style={[styles.box26, { backgroundColor: r.dot }]}>
                        <SvgXml xml={art.reviewMarkArt(r.ok)} width={12} height={12} />
                      </View>
                    </View>
                  </Fragment>
                ))}
              </View>
            </ScrollView>
            <View style={styles.box14} />
            <Pressable
              style={styles.link2}
              onPress={() => router.push(`/sign-group${groupId === 1 ? "" : groupId}`)}
              accessibilityRole="link"
              accessibilityLabel="Back to the signs"
            >
              <SvgXml xml={art.art9} width={20} height={20} />
            </Pressable>
            <Pressable style={styles.button4} onPress={vm.restart} accessibilityRole="button">
              <Text style={styles.text15}>{vm.restartLabel}</Text>
              <View style={styles.box27}>
                <SvgXml xml={art.art10} width={18} height={18} />
              </View>
            </Pressable>
          </View>
        </>
      ) : null}
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
    flexDirection: "column",
    position: "absolute",
    left: 76,
    top: 54,
    right: 76,
    height: 44,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 15,
  },
  text2: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    lineHeight: 12,
  },
  questionQnumOfQtotalBox: {
    flexDirection: "row",
    position: "absolute",
    top: 54,
    right: 20,
    height: 44,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#0E1C91",
    borderRadius: 22,
  },
  box2: {
    flexDirection: "row",
    gap: 2,
    alignItems: "baseline",
  },
  text3: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 18,
    lineHeight: 18,
  },
  text4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 12,
  },
  box3: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 114,
    right: 20,
    height: 6,
    gap: 4,
    flexWrap: "wrap",
  },
  box4: {
    height: 6,
    borderRadius: 3,
  },
  box5: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 136,
    width: 350,
    height: 168,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "radial-gradient(120% 90% at 50% 40%, #FFFFFF 0%, #FFFFFF 55%, #EEF1FB 100%)",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 28,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px rgba(14,28,145,0.06)",
  },
  image: {
    maxWidth: "100%",
    maxHeight: 128,
    filter: "drop-shadow(0 6px 10px rgba(10,14,46,0.12))",
  },
  box6: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 328,
    right: 20,
    height: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 18,
    letterSpacing: -0.3,
  },
  box7: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  label: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
  },
  box8: {
    flexDirection: "row",
    height: 24,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    alignItems: "center",
    backgroundColor: "#E6E9FB",
    borderRadius: 12,
  },
  label2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 13,
  },
  answersBox: {
    position: "absolute",
    left: 20,
    top: 364,
    width: 350,
    height: 380,
  },
  box9: {
    flexDirection: "column",
    paddingBottom: 16,
    gap: 8,
  },
  box10: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 20,
  },
  button: {
    flexDirection: "row",
    minWidth: 0,
    paddingTop: 16,
    paddingRight: 0,
    paddingBottom: 16,
    paddingLeft: 16,
    gap: 12,
    alignItems: "flex-start",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  box11: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 14,
  },
  label3: {
    fontFamily: font.spaceGrotesk[700],
    fontSize: 15,
    textAlign: "left",
  },
  box12: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "inherit",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 20,
    textAlign: "left",
  },
  box13: {
    overflow: "hidden",
  },
  label4: {
    fontFamily: font.manrope[500],
    color: "#4A5278",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "left",
  },
  button2: {
    flexDirection: "row",
    width: 44,
    height: 44,
    padding: 0,
    marginTop: 14,
    marginRight: 8,
    marginBottom: 0,
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 22,
  },
  box14: {
    position: "absolute",
    left: 0,
    top: 722,
    right: 0,
    height: 22,
    backgroundImage: "linear-gradient(180deg, rgba(246,247,253,0), #F6F7FD)",
  },
  button3: {
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
    borderRadius: 30,
  },
  box15: {
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-start",
  },
  text6: {
    fontFamily: font.manrope[800],
    fontSize: 16,
    letterSpacing: -0.3,
    lineHeight: 16,
  },
  text7: {
    fontFamily: font.manrope[700],
    fontSize: 12,
    lineHeight: 12,
  },
  box16: {
    flexDirection: "row",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  section: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#F6F7FD",
  },
  box17: {
    flexDirection: "row",
    position: "absolute",
    left: 76,
    top: 54,
    right: 76,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  label5: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
  },
  box18: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 176,
    padding: 20,
    gap: 20,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#0E1C91",
    borderRadius: 28,
    boxShadow: "0 18px 40px rgba(14,28,145,0.25)",
  },
  box19: {
    position: "relative",
    width: 112,
    height: 112,
    flexShrink: 0,
  },
  box20: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 38,
    justifyContent: "center",
    alignItems: "baseline",
  },
  text8: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 34,
    letterSpacing: -1,
    lineHeight: 34,
  },
  text9: {
    fontFamily: font.spaceGrotesk[700],
    color: "rgba(255,255,255,0.55)",
    fontSize: 15,
    lineHeight: 15,
  },
  box21: {
    flexDirection: "column",
    minWidth: 0,
    gap: 8,
  },
  text10: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 22,
    letterSpacing: -0.5,
    lineHeight: 25.3,
  },
  text11: {
    fontFamily: font.manrope[600],
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    lineHeight: 18.85,
  },
  box22: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 314,
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
  text12: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 12,
  },
  box23: {
    position: "absolute",
    left: 20,
    top: 346,
    width: 350,
    height: 398,
  },
  box24: {
    flexDirection: "row",
    minHeight: 64,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 8,
    gap: 12,
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
  },
  box25: {
    flexDirection: "row",
    width: 48,
    height: 48,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#F6F7FD",
    borderRadius: 14,
  },
  text13: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    lineHeight: 18.2,
  },
  text14: {
    fontFamily: font.manrope[500],
    color: "#4A5278",
    fontSize: 12,
    lineHeight: 18,
  },
  box26: {
    flexDirection: "row",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 12,
  },
  link2: {
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
  button4: {
    flexDirection: "row",
    position: "absolute",
    left: 88,
    right: 20,
    bottom: 24,
    height: 60,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 30,
    boxShadow: "0 14px 30px rgba(14,28,145,0.18)",
  },
  text15: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    letterSpacing: -0.3,
  },
  box27: {
    flexDirection: "row",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 24,
  },
});
