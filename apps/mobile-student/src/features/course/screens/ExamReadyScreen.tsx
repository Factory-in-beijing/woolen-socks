import { Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useExamReadyViewModel } from "../hooks/useExamReadyViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/examReady.art";
import { strings } from "../strings";
import { styles } from "./ExamReadyScreen.styles";

const s = strings.examReady;

export function ExamReadyScreen() {
  const router = useRouter();
  const vm = useExamReadyViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
          accessibilityLabel="Back to Home"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.examReadiness}</Text>
        <View style={styles.box} />
      </View>
      <ScrollView style={styles.box2} showsVerticalScrollIndicator={false}>
        <View style={styles.box3}>
          <View style={styles.section}>
            <SvgXml xml={art.art2} width={350} height={260} style={styles.artBox} />
            <View style={styles.box4}>
              <View style={styles.box5}>
                <SvgXml xml={art.art3} width={128} height={128} style={styles.artBox2} />
                <View style={styles.box6}>
                  <Text style={styles.text2}>{s.n41}</Text>
                  <Text style={styles.text3}>{s.ready}</Text>
                </View>
              </View>
              <View style={styles.box7}>
                <View style={styles.box8}>
                  <SvgXml xml={art.art4} width={13} height={13} />
                  <Text style={styles.label}>{s.n5PtsThisWeek}</Text>
                </View>
                <Text style={styles.text5}>
                  {s.keep} <Text style={styles.text4}>{s.going}</Text>
                </Text>
                <Text style={styles.text6}>{s.readyAt85And}</Text>
              </View>
            </View>
            <View style={styles.box9}>
              <View style={styles.box10}>
                <View style={styles.box11} />
                <Text style={styles.text7}>{s.starting}</Text>
              </View>
              <View style={styles.box12}>
                <View style={styles.box13} />
                <Text style={styles.text8}>{s.learning}</Text>
              </View>
              <View style={styles.box14}>
                <View style={styles.box15} />
                <Text style={styles.text7}>{s.almost}</Text>
              </View>
              <View style={styles.box16}>
                <View style={styles.box15} />
                <Text style={styles.text7}>{s.ready2}</Text>
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box17}>
              <Text style={styles.heading}>{s.whatMakesYourScore}</Text>
            </View>
            <View style={styles.box18}>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/my-course")}
                accessibilityRole="link"
              >
                <View style={styles.box19}>
                  <View style={styles.box20}>
                    <SvgXml xml={art.art5} width={29} height={29} />
                  </View>
                  <Text style={styles.text9}>{s.n15}</Text>
                </View>
                <View style={styles.box21}>
                  <Text style={styles.text10}>{s.n31}</Text>
                  <Text style={styles.text11}>{s.lessons}</Text>
                  <Text style={styles.text12}>{s.n11Of36Videos}</Text>
                </View>
                <View style={styles.box22}>
                  <View style={styles.box23} />
                </View>
              </Pressable>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/tickets")}
                accessibilityRole="link"
              >
                <View style={styles.box19}>
                  <View style={styles.box20}>
                    <SvgXml xml={art.art6} width={29} height={29} />
                  </View>
                  <Text style={styles.text9}>{s.n45}</Text>
                </View>
                <View style={styles.box21}>
                  <Text style={styles.text10}>{s.n34}</Text>
                  <Text style={styles.text11}>{s.tickets}</Text>
                  <Text style={styles.text12}>{s.n312Of921Mastered}</Text>
                </View>
                <View style={styles.box22}>
                  <View style={styles.box24} />
                </View>
              </Pressable>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/road-signs-v3")}
                accessibilityRole="link"
              >
                <View style={styles.box19}>
                  <View style={styles.box20}>
                    <SvgXml xml={art.art7} width={29} height={29} />
                  </View>
                  <Text style={styles.text9}>{s.n15}</Text>
                </View>
                <View style={styles.box21}>
                  <Text style={styles.text10}>{s.n41}</Text>
                  <Text style={styles.text11}>{s.signs}</Text>
                  <Text style={styles.text12}>{s.n96Of237Mastered}</Text>
                </View>
                <View style={styles.box22}>
                  <View style={styles.box25} />
                </View>
              </Pressable>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/quick-test")}
                accessibilityRole="link"
              >
                <View style={styles.box19}>
                  <View style={styles.box20}>
                    <SvgXml xml={art.art8} width={29} height={29} />
                  </View>
                  <Text style={styles.text9}>{s.n25}</Text>
                </View>
                <View style={styles.box21}>
                  <Text style={styles.text10}>{s.n60}</Text>
                  <Text style={styles.text11}>{s.tests}</Text>
                  <Text style={styles.text12}>{s.n3Of5Passed}</Text>
                </View>
                <View style={styles.box22}>
                  <View style={styles.box26} />
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.section3}>
            <View style={styles.box27}>
              <View style={styles.box21}>
                <Text style={styles.heading}>{s.thisWeek}</Text>
                <Text style={styles.text13}>{s.questionsAnswered}</Text>
              </View>
              <View style={styles.box28}>
                <Text style={styles.text14}>{vm.selVal}</Text>
                <Text style={styles.text13}>{vm.selLabel}</Text>
              </View>
            </View>
            <View style={styles.box29}>
              {vm.bars.map((b, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={styles.button}
                    onPress={b.pick}
                    accessibilityRole="button"
                    accessibilityLabel={b.aria}
                  >
                    <View style={[styles.box30, { height: b.h, backgroundColor: b.bg }]} />
                    <Text style={[styles.text15, { color: b.fg }]}>{b.d}</Text>
                  </Pressable>
                </Fragment>
              ))}
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box17}>
              <Text style={styles.heading}>{s.focusOnThese}</Text>
              <Text style={styles.text16}>{s.weakestTopics}</Text>
            </View>
            <View style={styles.box31}>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/mistakes")}
                accessibilityRole="link"
              >
                <View style={styles.box32}>
                  <View style={styles.box33}>
                    <Text style={styles.label2}>{s.n412}</Text>
                  </View>
                </View>
                <View style={styles.box34}>
                  <Text style={styles.text17}>{s.intersections}</Text>
                  <Text style={styles.text18}>{s.n14TicketsToFix}</Text>
                </View>
                <View style={styles.box35}>
                  <Text style={styles.label3}>{s.practise}</Text>
                  <SvgXml xml={art.art9} width={14} height={14} />
                </View>
                <View style={styles.box36} />
              </Pressable>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/mistakes")}
                accessibilityRole="link"
              >
                <View style={styles.box37}>
                  <View style={styles.box33}>
                    <Text style={styles.label2}>{s.n55}</Text>
                  </View>
                </View>
                <View style={styles.box34}>
                  <Text style={styles.text17}>{s.speed}</Text>
                  <Text style={styles.text18}>{s.n6TicketsToFix}</Text>
                </View>
                <View style={styles.box35}>
                  <Text style={styles.label3}>{s.practise}</Text>
                  <SvgXml xml={art.art10} width={14} height={14} />
                </View>
                <View style={styles.box36} />
              </Pressable>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/mistakes")}
                accessibilityRole="link"
              >
                <View style={styles.box38}>
                  <View style={styles.box33}>
                    <Text style={styles.label2}>{s.n62}</Text>
                  </View>
                </View>
                <View style={styles.box34}>
                  <Text style={styles.text17}>{s.warningSigns}</Text>
                  <Text style={styles.text18}>{s.n5SignsToFix}</Text>
                </View>
                <View style={styles.box35}>
                  <Text style={styles.label3}>{s.practise}</Text>
                  <SvgXml xml={art.art11} width={14} height={14} />
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.box39}>
            <SvgXml xml={art.art12} width={14} height={14} />
            <Text style={styles.label4}>{s.lessons15Tickets45}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box40} />
      <Pressable
        style={styles.link4}
        onPress={() => router.push("/quick-test")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art13} width={20} height={20} />
        <View style={styles.box41}>
          <Text style={styles.label5}>{s.takeAPracticeTest}</Text>
        </View>
        <View style={styles.box42}>
          <SvgXml xml={art.art14} width={18} height={18} />
        </View>
      </Pressable>
    </ScreenFrame>
  );
}
