import { Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useSignGroupViewModel } from "../hooks/useSignGroupViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/signGroup.art";
import { strings } from "../strings";
import { styles } from "./SignGroupScreen.styles";

const s = strings.signGroup;

export function SignGroupScreen({ groupId }: { groupId: number }) {
  const router = useRouter();
  const vm = useSignGroupViewModel(groupId);
  return (
    <ScreenFrame background="#F6F7FD">
      <Pressable
        style={styles.link}
        onPress={() => router.push("/road-signs-v3")}
        accessibilityRole="link"
        accessibilityLabel="Back to sign groups"
      >
        <SvgXml xml={art.art1} width={20} height={20} />
      </Pressable>
      <View style={styles.box}>
        <Text style={styles.text}>{s.roadSignsGroup2}</Text>
        <Text numberOfLines={1} style={styles.title}>
          {vm.title}
        </Text>
      </View>
      <View style={styles.learnednOfTotalnLearnedBox}>
        <SvgXml xml={art.learnedRingArt(vm.learnedFraction)} width={28} height={28} />
        <View style={styles.box2}>
          <Text style={styles.text2}>{vm.learnedN}</Text>
          <Text style={styles.text3}>{`/${vm.totalN}`}</Text>
        </View>
      </View>
      <View style={styles.filterSignsBox}>
        {vm.tabs.map((t) => (
          <Fragment key={t.key}>
            <Pressable
              style={[styles.button, { backgroundColor: t.bg, boxShadow: t.shadow }]}
              onPress={t.pick}
              accessibilityRole="button"
            >
              <Text style={[styles.text4, { color: t.fg }]}>{t.label}</Text>
              <Text style={[styles.text5, { color: t.numFg }]}>{t.n}</Text>
            </Pressable>
          </Fragment>
        ))}
      </View>
      <ScrollView style={styles.box3} showsVerticalScrollIndicator={false}>
        <View style={styles.box4}>
          {vm.grid.map((entry) => (
            <Fragment key={entry.key}>
              <Pressable
                style={styles.button2}
                onPress={entry.open}
                accessibilityRole="button"
                accessibilityLabel={entry.aria}
              >
                <View style={styles.box5}>
                  <SvgXml xml={entry.svg} width="100%" height={76} />
                  <View style={[styles.box6, { display: entry.done ? "flex" : "none" }]}>
                    <SvgXml xml={art.art3} width={12} height={12} />
                  </View>
                </View>
                <View style={styles.box7}>
                  <Text style={styles.text6}>{entry.code}</Text>
                  <View style={styles.box8}>
                    <Text numberOfLines={3} style={styles.label}>
                      {entry.name}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </Fragment>
          ))}
        </View>
        {vm.emptyShow ? (
          <>
            <View style={styles.box9}>
              <Text style={styles.text7}>{vm.emptyTitle}</Text>
              <Text style={styles.text8}>{vm.emptySub}</Text>
            </View>
          </>
        ) : null}
      </ScrollView>
      <View style={styles.box10} />
      <Pressable
        style={styles.link2}
        onPress={() => router.push("/sign-quiz2")}
        accessibilityRole="link"
      >
        <View style={styles.box11}>
          <Text style={styles.text9}>{s.quizThisGroup}</Text>
          <Text style={styles.text10}>{vm.ctaSub}</Text>
        </View>
        <View style={styles.box12}>
          <SvgXml xml={art.art4} width={18} height={18} />
        </View>
      </Pressable>
      {vm.detail ? (
        <>
          <View style={styles.section}>
            <Pressable
              style={styles.button3}
              onPress={vm.detail.close}
              accessibilityRole="button"
              accessibilityLabel="Back to the list"
            >
              <SvgXml xml={art.art5} width={20} height={20} />
            </Pressable>
            <View style={styles.box13}>
              <Text numberOfLines={1} style={styles.label2}>
                {vm.title}
              </Text>
            </View>
            <View style={styles.box14}>
              <View style={styles.box15}>
                <Text style={styles.text2}>{vm.detail.position}</Text>
                <Text style={styles.text3}>{`/${vm.detail.count}`}</Text>
              </View>
            </View>
            <View style={styles.box16}>
              <SvgXml
                xml={vm.detail.svg}
                width="100%"
                height={200}
                style={styles.image2}
                accessibilityLabel={`Road sign ${vm.detail.code}, ${vm.detail.name}`}
              />
              <Pressable
                style={[
                  styles.button4,
                  { ...vm.detail.saveBorder, backgroundColor: vm.detail.saveBg },
                ]}
                onPress={vm.detail.toggleSave}
                accessibilityRole="button"
                accessibilityLabel={vm.detail.saveLabel}
              >
                <SvgXml xml={art.saveArt(vm.detail.saved)} width={15} height={15} />
                <Text style={[styles.text4, { color: "#0A0E2E" }]}>{vm.detail.saveLabel}</Text>
              </Pressable>
            </View>
            <ScrollView style={styles.box17} showsVerticalScrollIndicator={false}>
              <View style={styles.box18}>
                <View style={styles.box19}>
                  <View style={styles.box20}>
                    <View style={styles.box21}>
                      <Text style={styles.label3}>{vm.detail.code}</Text>
                    </View>
                    <View style={[styles.box22, { display: vm.detail.done ? "flex" : "none" }]}>
                      <View style={styles.box23}>
                        <SvgXml xml={art.art7} width={12} height={12} />
                      </View>
                      <Text style={styles.label4}>{s.learned}</Text>
                    </View>
                  </View>
                  <Text style={styles.heading}>{vm.detail.name}</Text>
                </View>
                <View style={styles.box24}>
                  <View style={styles.box20}>
                    <View style={styles.box25} />
                    <Text style={styles.label5}>{s.whatItMeans}</Text>
                  </View>
                  <Text style={styles.paragraph}>{vm.detail.description}</Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.box10} />
            <Pressable
              style={[styles.button5, { opacity: vm.detail.prevOp }]}
              onPress={vm.detail.prev}
              accessibilityRole="button"
              accessibilityLabel="Previous sign"
            >
              <SvgXml xml={art.art8} width={20} height={20} />
            </Pressable>
            <Pressable
              style={[
                styles.button6,
                {
                  ...vm.detail.learnedBorder,
                  backgroundColor: vm.detail.learnedBg,
                  boxShadow: vm.detail.learnedShadow,
                },
              ]}
              onPress={vm.detail.toggleLearned}
              accessibilityRole="button"
            >
              <View
                style={[
                  styles.box26,
                  { backgroundColor: vm.detail.dotBg, boxShadow: vm.detail.dotRing },
                ]}
              >
                <SvgXml xml={art.learnedDotArt()} width={12} height={12} />
              </View>
              <Text style={styles.label2}>{vm.detail.learnedLabel}</Text>
            </Pressable>
            <Pressable
              style={[styles.button7, { opacity: vm.detail.nextOp }]}
              onPress={vm.detail.next}
              accessibilityRole="button"
              accessibilityLabel="Next sign"
            >
              <SvgXml xml={art.art10} width={20} height={20} />
            </Pressable>
          </View>
        </>
      ) : null}
    </ScreenFrame>
  );
}
