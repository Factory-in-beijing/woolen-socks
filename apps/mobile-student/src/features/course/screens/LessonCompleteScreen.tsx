import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/lessonComplete.art";
import { strings } from "../strings";
import { styles } from "./LessonCompleteScreen.styles";

const s = strings.lessonComplete;

export function LessonCompleteScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
          accessibilityLabel="Close and go to My course"
        >
          <SvgXml xml={art.art1} width={18} height={18} />
        </Pressable>
        <Text style={styles.text}>{s.module3Lesson2}</Text>
        <View style={styles.box} />
      </View>
      <SvgXml xml={art.art2} width={390} height={300} style={styles.artBox} />
      <View style={styles.box2}>
        <SvgXml xml={art.art3} width={38} height={38} />
      </View>
      <View style={styles.section}>
        <View style={styles.box3}>
          <Text style={styles.text2}>{s.lessonComplete}</Text>
          <Text style={styles.title}>{s.extraLightSections}</Text>
        </View>
        <View style={styles.box4}>
          <View style={styles.box5}>
            <Text style={styles.text3}>{s.trafficLightsIntersections}</Text>
            <Text style={styles.text6}>
              <Text style={styles.text4}>{s.n2}</Text>
              <Text style={styles.text5}>{s.n5}</Text>
            </Text>
          </View>
          <View style={styles.n2Of5LessonsBox}>
            <View style={styles.box6} />
            <View style={styles.box6} />
            <View style={styles.box7} />
            <View style={styles.box7} />
            <View style={styles.box7} />
          </View>
        </View>
        <View style={styles.box8}>
          <Text style={styles.text7}>{s.lockItInPractise}</Text>
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/tickets")}
            accessibilityRole="link"
            accessibilityLabel="Practise Traffic light signals, 54 tickets"
          >
            <SvgXml xml={art.art4} width={40} height={40} style={styles.artBox2} />
            <View style={styles.box9}>
              <Text style={styles.text8}>{s.trafficLightSignals}</Text>
              <Text style={styles.text9}>{s.n54Tickets}</Text>
            </View>
            <View style={styles.box10}>
              <Text style={styles.label}>{s.practise}</Text>
              <SvgXml xml={art.art5} width={14} height={14} />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.box11}>
        <Pressable
          style={styles.link3}
          onPress={() => router.push("/lesson-player")}
          accessibilityRole="link"
        >
          <View style={styles.box12}>
            <Text style={styles.text10}>{s.nextLesson1205}</Text>
            <Text numberOfLines={1} style={styles.text11}>
              {s.controlledIntersections}
            </Text>
          </View>
          <View style={styles.box13}>
            <SvgXml xml={art.art6} width={18} height={18} />
          </View>
        </Pressable>
        <Pressable
          style={styles.link4}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
        >
          <Text style={styles.label2}>{s.backToMyCourse}</Text>
        </Pressable>
      </View>
    </ScreenFrame>
  );
}
