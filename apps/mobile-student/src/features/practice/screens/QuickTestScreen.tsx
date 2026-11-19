import { Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useQuickTestViewModel } from "../hooks/useQuickTestViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/quickTest.art";
import { quickTestDefinition } from "../definition";
import { strings } from "../strings";
import { styles } from "./QuickTestScreen.styles";

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
