import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useLessonFreeViewModel } from "../hooks/useLessonFreeViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/lessonFree.art";
import { strings } from "../strings";
import { styles } from "./LessonFreeScreen.styles";

const s = strings.lessonFree;

export function LessonFreeScreen() {
  const router = useRouter();
  const vm = useLessonFreeViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/my-course-member")}
          accessibilityRole="link"
          accessibilityLabel="Back to My course"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <View style={styles.box}>
          <Text style={styles.text}>{s.module1Lesson1}</Text>
          <Text style={styles.text2}>{s.conventionAdministrativeLaw}</Text>
        </View>
        <View style={styles.box2} />
      </View>
      <ScrollView style={styles.box3} showsVerticalScrollIndicator={false}>
        <View style={styles.box4}>
          <View style={styles.box5}>
            <View style={styles.section}>
              <SvgXml xml={art.art2} width={350} height={197} style={styles.artBox} />
              <View style={styles.box6}>
                <Pressable
                  style={styles.button}
                  onPress={vm.back10}
                  accessibilityRole="button"
                  accessibilityLabel="Back 10 seconds"
                >
                  <SvgXml xml={art.art3} width={20} height={20} />
                </Pressable>
                <Pressable
                  style={styles.button2}
                  onPress={vm.toggle}
                  accessibilityRole="button"
                  accessibilityLabel={vm.playLabel}
                >
                  <SvgXml xml={art.art4} width={24} height={24} style={{ display: vm.playShow }} />
                  <SvgXml xml={art.art5} width={24} height={24} style={{ display: vm.pauseShow }} />
                </Pressable>
                <Pressable
                  style={styles.button}
                  onPress={vm.fwd10}
                  accessibilityRole="button"
                  accessibilityLabel="Forward 10 seconds"
                >
                  <SvgXml xml={art.art6} width={20} height={20} />
                </Pressable>
              </View>
              <View style={styles.box7}>
                <View style={styles.lessonPositionBox}>
                  <View style={styles.box8} />
                  <View style={[styles.box9, { width: `${vm.percent}%` }]} />
                  <View style={[styles.box10, { left: `${vm.percent}%`, marginLeft: -6 }]} />
                </View>
                <View style={styles.box11}>
                  <Text style={styles.text4}>
                    {vm.tLabel} <Text style={styles.text3}>{`/ ${vm.lenLabel}`}</Text>
                  </Text>
                  <View style={styles.box12}>
                    <Pressable
                      style={styles.button3}
                      onPress={vm.speedUp}
                      accessibilityRole="button"
                      accessibilityLabel={`Playback speed ${vm.speed}`}
                    >
                      <Text style={styles.label}>{vm.speed}</Text>
                    </Pressable>
                    <Pressable
                      style={styles.link2}
                      onPress={() => router.push("/video-full")}
                      accessibilityRole="link"
                      accessibilityLabel="Full screen"
                    >
                      <SvgXml xml={art.art7} width={18} height={18} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.box13}>
              <SvgXml xml={art.art8} width={12} height={12} />
              <Text style={styles.label2}>{s.freeLesson}</Text>
            </View>
          </View>
          <View style={styles.section2}>
            <Text style={styles.title}>{s.dutiesOfDriversPassengers}</Text>
          </View>
          <View style={styles.section3}>
            <View style={styles.box14}>
              <Text style={styles.label3}>{s.inThisLesson}</Text>
            </View>
            <View style={styles.box15}>
              <View style={styles.box16}>
                <View style={styles.box17}>
                  <Text style={styles.label4}>{s.n1}</Text>
                </View>
                <View style={styles.box18}>
                  <Text style={styles.label5}>{s.whoCountsAsA}</Text>
                </View>
                <Text style={styles.text5}>{s.n000}</Text>
                <View style={styles.box19} />
              </View>
              <View style={styles.box16}>
                <View style={styles.box17}>
                  <Text style={styles.label4}>{s.n2}</Text>
                </View>
                <View style={styles.box18}>
                  <Text style={styles.label5}>{s.whatEveryDriverMust}</Text>
                </View>
                <Text style={styles.text5}>{s.n340}</Text>
                <View style={styles.box19} />
              </View>
              <View style={styles.box16}>
                <View style={styles.box17}>
                  <Text style={styles.label4}>{s.n3}</Text>
                </View>
                <View style={styles.box18}>
                  <Text style={styles.label5}>{s.whenAPassengerIs}</Text>
                </View>
                <Text style={styles.text5}>{s.n715}</Text>
              </View>
            </View>
          </View>
          <View style={styles.section4}>
            <View style={styles.section2}>
              <Text style={styles.text7}>
                {s.likedThisLesson}
                {"\n"}
                <Text style={styles.text6}>{s.n35MoreAreWaiting}</Text>
              </Text>
              <Text style={styles.text8}>{s.theWholeTheoryExplained}</Text>
            </View>
            <View style={styles.n1Of36LessonsBox}>
              <View style={styles.box20} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
              <View style={styles.box21} />
            </View>
            <Pressable
              style={styles.link3}
              onPress={() => router.push("/get-course")}
              accessibilityRole="link"
            >
              <Text style={styles.label6}>{s.getTheCourse}</Text>
              <View style={styles.box22}>
                <SvgXml xml={art.art9} width={16} height={16} />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box23} />
      <Pressable
        style={styles.link4}
        onPress={() => router.push("/get-course")}
        accessibilityRole="link"
      >
        <View style={styles.box24}>
          <Text style={styles.text9}>{s.nextLesson905}</Text>
          <Text numberOfLines={1} style={styles.text10}>
            {s.finesPointsAndThe}
          </Text>
        </View>
        <View style={styles.box25}>
          <SvgXml xml={art.art10} width={18} height={18} />
        </View>
      </Pressable>
    </ScreenFrame>
  );
}
