import { Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useMyCourseViewModel } from "../hooks/useMyCourseViewModel";
import { SvgXml } from "react-native-svg";
import { MaterialChipGrid } from "../components/MaterialChipGrid";
import { ModuleCard } from "../components/ModuleCard";
import { LessonRow } from "../components/LessonRow";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/myCourse.art";
import { strings } from "../strings";
import { styles } from "./MyCourseScreen.styles";

const s = strings.myCourse;

export function MyCourseScreen() {
  const router = useRouter();
  const vm = useMyCourseViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <SvgXml xml={art.art1} width={0} height={0} style={styles.artBox} />
      <View style={styles.header}>
        <Text style={styles.title}>{s.myCourse}</Text>
        <View style={styles.box}>
          <View style={styles.box2}>
            <SvgXml xml={art.art2} width={30} height={19} />
          </View>
          <Text style={styles.text}>{s.bB1}</Text>
        </View>
      </View>
      <ScrollView style={styles.box3} showsVerticalScrollIndicator={false}>
        <View style={styles.box4}>
          <View style={styles.box5}>
            <Pressable
              style={styles.link}
              onPress={() => router.push("/lesson-player")}
              accessibilityRole="link"
              accessibilityLabel={`Continue watching: ${vm.current.title}, ${vm.current.left} left`}
            >
              <SvgXml xml={art.art3} width={350} height={252} style={styles.artBox2} />
              <View style={styles.box6}>
                <View style={styles.box7} />
                <Text style={styles.label}>{vm.current.line}</Text>
              </View>
              <View style={styles.box8}>
                <SvgXml xml={art.art4} width={24} height={24} />
              </View>
              <View style={styles.box9}>
                <View style={styles.box10}>
                  <Text style={styles.text2}>{s.continueWatching}</Text>
                  <Text style={styles.text3}>{vm.current.title}</Text>
                </View>
                <View style={styles.box11}>
                  <View style={styles.box12}>
                    <View style={[styles.box13, { width: `${vm.current.percent}%` }]} />
                  </View>
                  <Text style={styles.text4}>{`${vm.current.left} left`}</Text>
                </View>
              </View>
            </Pressable>
            <View style={styles.box5}>
              <View style={styles.box14}>
                <Text style={styles.text5}>{s.studyMaterial}</Text>
                <View style={styles.box15} />
              </View>
              <MaterialChipGrid chips={vm.materials} width={350} />
            </View>
          </View>
          <View style={styles.section}>
            <SvgXml xml={art.art68} width={350} height={160} style={styles.artBox2} />
            <View style={styles.box23}>
              <View style={styles.box24}>
                <Text style={styles.text7}>{s.courseProgress}</Text>
                <View style={styles.box25}>
                  <Text style={styles.text8}>{`${vm.ringPercent}%`}</Text>
                  <Text style={styles.text9}>{s.complete}</Text>
                </View>
              </View>
            </View>
            <View style={styles.box26}>
              {vm.segments.map((segment, index) => (
                <View key={index} style={[styles.box27, { flexGrow: segment.lessons }]}>
                  <View
                    style={[
                      styles.box28,
                      { width: `${segment.percent}%`, backgroundColor: segment.color },
                    ]}
                  />
                </View>
              ))}
            </View>
            <View style={styles.box29}>
              {vm.stats.map((t, index) => (
                <Fragment key={index}>
                  <View
                    style={[styles.tAriaBox, index > 0 && styles.statDivider]}
                    accessibilityLabel={t.accessibilityLabel}
                  >
                    <Text style={styles.text12}>
                      <Text style={styles.text10}>{t.n}</Text>
                      <Text style={styles.text11}>{t.of}</Text>
                    </Text>
                    <Text style={styles.text7}>{t.label}</Text>
                  </View>
                </Fragment>
              ))}
            </View>
          </View>
          <View style={styles.box5}>
            <View style={styles.box30}>
              <Text style={styles.heading}>{s.modules}</Text>
              <Text style={styles.text13}>{s.n9Modules36Videos}</Text>
            </View>
            <View style={styles.box24}>
              {vm.rows.map((row) =>
                row.kind === "module" ? (
                  <ModuleCard key={row.key} module={row.module} onToggle={row.toggle} />
                ) : (
                  <LessonRow key={row.key} lesson={row.lesson} />
                ),
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box46} />
      <View style={styles.nav}>
        <Pressable
          style={styles.link3}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
          accessibilityLabel="Home"
        >
          <SvgXml xml={art.art145} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link4}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art146} width={20} height={20} />
          <Text style={styles.label4}>{s.myCourse}</Text>
        </Pressable>
        <Pressable
          style={styles.link3}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art147} width={22} height={22} />
        </Pressable>
      </View>
    </ScreenFrame>
  );
}
