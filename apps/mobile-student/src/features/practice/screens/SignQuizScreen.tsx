import { Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useSignQuizViewModel } from "../hooks/useSignQuizViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/signQuiz.art";
import { strings } from "../strings";
import { styles } from "./SignQuizScreen.styles";

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
