import { Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useVideoErrorViewModel } from "../hooks/useVideoErrorViewModel";
import { MaterialChipGrid } from "../components/MaterialChipGrid";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/videoError.art";
import { strings } from "../strings";
import { styles } from "./VideoErrorScreen.styles";

const s = strings.videoError;

export function VideoErrorScreen() {
  const router = useRouter();
  const vm = useVideoErrorViewModel();
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
              <View style={styles.box6}>
                <SvgXml xml={art.art3} width={24} height={24} />
              </View>
            </View>
            <View style={styles.box7}>
              <Text style={styles.text3}>{vm.errTitle}</Text>
              <Text style={styles.text4}>{s.yourPlaceIsSaved}</Text>
            </View>
            <View style={styles.box8}>
              <Pressable style={styles.button} onPress={vm.retry} accessibilityRole="button">
                <Text style={styles.label}>{vm.retryLabel}</Text>
              </Pressable>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/help#contact")}
                accessibilityRole="link"
              >
                <Text style={styles.label2}>{s.reportIt}</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box9}>
              <Text style={styles.text5}>{`Lesson ${vm.lNum} · ${vm.lenLabel}`}</Text>
              <Text style={styles.title}>{vm.lTitle}</Text>
            </View>
            <View style={styles.section2}>
              <View style={styles.box10}>
                <Text style={styles.text6}>{s.studyMaterial}</Text>
                <View style={styles.box11} />
              </View>
              <MaterialChipGrid chips={vm.materials} width={350} />
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box19}>
              <Text style={styles.heading}>{s.inThisLesson}</Text>
              <Text style={styles.text8}>{s.tapToJump}</Text>
            </View>
            <View style={styles.box20}>
              {vm.points.map((p, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={[styles.button2, { backgroundColor: p.bg }]}
                    onPress={p.seek}
                    accessibilityRole="button"
                    accessibilityLabel={p.aria}
                  >
                    <View style={[styles.box21, { backgroundColor: p.dotBg }]}>
                      <Text style={[styles.label4, { color: p.dotFg }]}>{p.num}</Text>
                    </View>
                    <View style={styles.box22}>
                      <Text style={styles.label5}>{p.text}</Text>
                    </View>
                    <Text style={[styles.label4, { color: p.timeFg }]}>{p.time}</Text>
                  </Pressable>
                </Fragment>
              ))}
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box19}>
              <Text style={styles.heading}>{s.upNext}</Text>
              <Text style={styles.text8}>{`Module ${vm.mNum}`}</Text>
            </View>
            <View style={styles.box9}>
              {vm.next.map((n, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={styles.link4}
                    onPress={() => router.push("/lesson-player")}
                    accessibilityRole="link"
                    accessibilityLabel={n.aria}
                  >
                    <View style={styles.box23}>
                      <SvgXml xml={art.art67} width={16} height={16} />
                    </View>
                    <View style={styles.box15}>
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
      <View style={styles.box24} />
      <Pressable
        style={styles.link5}
        onPress={() => router.push("/lesson-complete")}
        accessibilityRole="link"
        accessibilityLabel={`Next lesson: ${vm.nextTitle}`}
      >
        <View style={styles.box25}>
          <Text style={styles.text12}>{s.nextLesson}</Text>
          <Text numberOfLines={1} style={styles.text13}>
            {vm.nextTitle}
          </Text>
        </View>
        <View style={styles.box26}>
          <SvgXml xml={art.art68} width={18} height={18} />
        </View>
      </Pressable>
    </ScreenFrame>
  );
}
