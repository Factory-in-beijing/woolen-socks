import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/myCourseExpired.art";
import { strings } from "../strings";
import { styles } from "./MyCourseExpiredScreen.styles";

const s = strings.myCourseExpired;

export function MyCourseExpiredScreen() {
  const router = useRouter();
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
          <View style={styles.section}>
            <SvgXml xml={art.art3} width={350} height={300} style={styles.artBox2} />
            <View style={styles.box5}>
              <View style={styles.box6} />
              <Text style={styles.label}>{s.videoCourse}</Text>
            </View>
            <View style={styles.box7}>
              <View style={styles.box8}>
                <Text style={styles.text3}>
                  {s.yourVideoAccess}
                  {"\n"}
                  <Text style={styles.text2}>{s.hasEnded}</Text>
                </Text>
                <Text style={styles.text4}>{s.yourProgressIsSaved}</Text>
              </View>
              <Pressable
                style={styles.link}
                onPress={() => router.push("/get-course")}
                accessibilityRole="link"
              >
                <Text style={styles.label2}>{s.renewAccess}</Text>
                <View style={styles.box9}>
                  <SvgXml xml={art.art4} width={16} height={16} />
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box10}>
              <Text style={styles.heading}>{s.yourProgress}</Text>
              <View style={styles.box11}>
                <SvgXml xml={art.art5} width={12} height={12} />
                <Text style={styles.label3}>{s.saved}</Text>
              </View>
            </View>
            <View style={styles.box12}>
              <View style={styles.box13}>
                <SvgXml xml={art.art6} width={76} height={76} style={styles.artBox3} />
                <View style={styles.box14}>
                  <Text style={styles.label4}>{s.n31}</Text>
                </View>
              </View>
              <View style={styles.box15}>
                <Text style={styles.text5}>{s.n11Of36Lessons}</Text>
                <Text style={styles.text6}>
                  {s.youStoppedAtModule}
                  {"\n"}
                  {s.extraLightSections}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box10}>
              <Text style={styles.heading}>{s.stillFreeForYou}</Text>
              <Text style={styles.text7}>{s.keepPractising}</Text>
            </View>
            <View style={styles.box16}>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/tickets")}
                accessibilityRole="link"
                accessibilityLabel="Tickets, free, 921 tickets in 6 languages"
              >
                <View style={styles.box17}>
                  <View style={styles.box18}>
                    <SvgXml xml={art.art7} width={10} height={10} />
                    <Text style={styles.label5}>{s.free}</Text>
                  </View>
                </View>
                <View style={styles.box19} />
                <SvgXml xml={art.art8} width={150} height={132} style={styles.artBox4} />
                <View style={styles.box20}>
                  <View style={styles.box21}>
                    <Text style={styles.text8}>{s.tickets}</Text>
                    <Text style={styles.text9}>{s.n921Tickets}</Text>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/quick-test")}
                accessibilityRole="link"
                accessibilityLabel="Quick test, free, exam-style"
              >
                <View style={styles.box22}>
                  <SvgXml xml={art.art9} width={52} height={58} style={styles.artBox5} />
                  <View style={styles.box23}>
                    <SvgXml xml={art.art10} width={10} height={10} />
                    <Text style={styles.label6}>{s.free}</Text>
                  </View>
                </View>
                <View style={styles.box24}>
                  <Text style={styles.text10}>{s.quickTest}</Text>
                  <Text style={styles.text11}>{s.examStyle30Qs}</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.link4}
                onPress={() => router.push("/road-signs-v3")}
                accessibilityRole="link"
                accessibilityLabel="Road signs, free, all groups with quizzes"
              >
                <View style={styles.box22}>
                  <SvgXml xml={art.art11} width={52} height={58} style={styles.artBox5} />
                  <View style={styles.box25}>
                    <SvgXml xml={art.art12} width={10} height={10} />
                    <Text style={styles.label7}>{s.free}</Text>
                  </View>
                </View>
                <View style={styles.box24}>
                  <Text style={styles.text12}>{s.roadSigns}</Text>
                  <Text style={styles.text13}>{s.n8GroupsQuizzes}</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box26} />
      <View style={styles.nav}>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
          accessibilityLabel="Home"
        >
          <SvgXml xml={art.art13} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link6}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art14} width={20} height={20} />
          <Text style={styles.label8}>{s.myCourse}</Text>
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art15} width={22} height={22} />
        </Pressable>
      </View>
    </ScreenFrame>
  );
}
