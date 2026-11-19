import { Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useLessonPlayer } from "../hooks/useLessonPlayer";
import { MaterialChipGrid } from "../components/MaterialChipGrid";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/lessonPlayer.art";
import { strings } from "../strings";
import { styles } from "./LessonPlayerScreen.styles";

const s = strings.lessonPlayer;

export function LessonPlayerScreen() {
  const router = useRouter();
  const vm = useLessonPlayer();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
          accessibilityLabel="Back to My course"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <View style={styles.box}>
          <Text style={styles.text}>{`Module ${vm.mNum} · Lesson ${vm.lNum} of ${vm.lOf}`}</Text>
          <Text style={styles.text2}>{vm.mTitle}</Text>
        </View>
        <View style={styles.box2} />
      </View>
      <ScrollView style={styles.box3} showsVerticalScrollIndicator={false}>
        <View style={styles.box4}>
          <View style={styles.section}>
            <SvgXml xml={art.art2} width={350} height={197} style={styles.artBox} />
            <View style={styles.box5}>
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
            <View style={styles.box6}>
              <View style={styles.lessonPositionBox}>
                <View style={styles.box7} />
                <View style={[styles.box8, { width: `${vm.percent}%` }]} />
                <View style={[styles.box9, { left: `${vm.percent}%`, marginLeft: -6 }]} />
              </View>
              <View style={styles.box10}>
                <Text style={styles.text4}>
                  {vm.tLabel} <Text style={styles.text3}>{`/ ${vm.lenLabel}`}</Text>
                </Text>
                <View style={styles.box11}>
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
          <View style={styles.section2}>
            <View style={styles.box12}>
              <Text style={styles.text5}>{`Lesson ${vm.lNum} · ${vm.lenLabel}`}</Text>
              <Text style={styles.title}>{vm.lTitle}</Text>
            </View>
            <View style={styles.section2}>
              <View style={styles.box11}>
                <Text style={styles.text6}>{s.studyMaterial}</Text>
                <View style={styles.box13} />
              </View>
              <MaterialChipGrid chips={vm.materials} width={350} />
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box21}>
              <Text style={styles.heading}>{s.inThisLesson}</Text>
              <Text style={styles.text8}>{s.tapToJump}</Text>
            </View>
            <View style={styles.box22}>
              {vm.points.map((p, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={[styles.button4, { backgroundColor: p.bg }]}
                    onPress={p.seek}
                    accessibilityRole="button"
                    accessibilityLabel={p.aria}
                  >
                    <View style={[styles.box23, { backgroundColor: p.dotBg }]}>
                      <Text style={[styles.label3, { color: p.dotFg }]}>{p.num}</Text>
                    </View>
                    <View style={styles.box24}>
                      <Text style={styles.label4}>{p.text}</Text>
                    </View>
                    <Text style={[styles.label3, { color: p.timeFg }]}>{p.time}</Text>
                  </Pressable>
                </Fragment>
              ))}
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box21}>
              <Text style={styles.heading}>{s.upNext}</Text>
              <Text style={styles.text8}>{`Module ${vm.mNum}`}</Text>
            </View>
            <View style={styles.box12}>
              {vm.next.map((n, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={styles.link4}
                    onPress={() => router.push("/lesson-player")}
                    accessibilityRole="link"
                    accessibilityLabel={n.aria}
                  >
                    <View style={styles.box25}>
                      <SvgXml xml={art.art71} width={16} height={16} />
                    </View>
                    <View style={styles.box17}>
                      <Text style={styles.text9}>{`Lesson ${n.num}`}</Text>
                      <Text style={styles.text10}>{n.title}</Text>
                    </View>
                    <Text style={styles.text11}>{n.len}</Text>
                  </Pressable>
                </Fragment>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box26} />
      <Pressable
        style={styles.link5}
        onPress={() => router.push("/lesson-complete")}
        accessibilityRole="link"
        accessibilityLabel={`Next lesson: ${vm.nextTitle}`}
      >
        <View style={styles.box27}>
          <Text style={styles.text12}>{s.nextLesson}</Text>
          <Text numberOfLines={1} style={styles.text13}>
            {vm.nextTitle}
          </Text>
        </View>
        <View style={styles.box28}>
          <SvgXml xml={art.art72} width={18} height={18} />
        </View>
      </Pressable>
    </ScreenFrame>
  );
}
