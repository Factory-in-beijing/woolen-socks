import { Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useTestResultViewModel, type TestOutcome } from "../hooks/useTestResultViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/testResult.art";
import { strings } from "../strings";
import { styles } from "./TestResultScreen.styles";

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
                  <Text numberOfLines={2} style={styles.label5}>
                    {m.q}
                  </Text>
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
