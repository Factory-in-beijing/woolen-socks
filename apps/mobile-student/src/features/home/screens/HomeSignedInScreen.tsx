import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/homeSignedIn.art";
import { strings } from "../strings";
import { styles } from "./HomeSignedInScreen.styles";

const s = strings.homeSignedIn;

export function HomeSignedInScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <View style={styles.box}>
            <Text style={styles.label}>{s.nb}</Text>
          </View>
          <View style={styles.box2}>
            <Text style={styles.text}>{s.goodEvening}</Text>
            <Text style={styles.text2}>{s.nino}</Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/notifications2")}
          accessibilityRole="link"
          accessibilityLabel="Reminders"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
          <View style={styles.box3} />
        </Pressable>
      </View>
      <Pressable
        style={styles.link3}
        onPress={() => router.push("/lesson-player")}
        accessibilityRole="link"
        accessibilityLabel="Continue watching: Extra light sections"
      >
        <SvgXml xml={art.art2} width={350} height={220} style={styles.artBox} />
        <View style={styles.box4}>
          <View style={styles.box5}>
            <View style={styles.box6} />
            <Text style={styles.label2}>{s.continueWatching}</Text>
          </View>
          <Text style={styles.text3}>{s.course31}</Text>
        </View>
        <View style={styles.box7}>
          <View style={styles.box8}>
            <Text style={styles.text4}>{s.module3Lesson2}</Text>
            <Text style={styles.text5}>
              {s.extraLight}
              {"\n"}
              {s.sections}
            </Text>
            <View style={styles.box9}>
              <View style={styles.box10}>
                <View style={styles.box11} />
              </View>
              <Text style={styles.text6}>{s.n522Left}</Text>
            </View>
          </View>
          <View style={styles.box12}>
            <SvgXml xml={art.art3} width={24} height={24} />
          </View>
        </View>
      </Pressable>
      <Pressable
        style={styles.link4}
        onPress={() => router.push("/exam-ready")}
        accessibilityRole="link"
        accessibilityLabel="Exam readiness 41 percent, up 5 points this week"
      >
        <View style={styles.box13} />
        <View style={styles.box14}>
          <SvgXml xml={art.art4} width={56} height={56} style={styles.artBox2} />
          <View style={styles.box15}>
            <Text style={styles.label3}>{s.n41}</Text>
            <Text style={styles.text7}>{s.text}</Text>
          </View>
        </View>
        <View style={styles.box16}>
          <Text style={styles.text8}>{s.examReadiness}</Text>
          <Text style={styles.text9}>{s.lessonsTicketsSignsTests}</Text>
        </View>
        <View style={styles.box17}>
          <SvgXml xml={art.art5} width={12} height={12} />
          <Text style={styles.label4}>{s.n5}</Text>
        </View>
      </Pressable>
      <View style={styles.box18}>
        <Text style={styles.label5}>{s.theorySpace}</Text>
      </View>
      <Pressable
        style={styles.link5}
        onPress={() => router.push("/tickets")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art6} width={171} height={256} style={styles.artBox} />
        <View style={styles.box19} />
        <SvgXml xml={art.art7} width={146} height={128} style={styles.artBox3} />
        <View style={styles.box20}>
          <Text style={styles.label6}>{s.tickets}</Text>
        </View>
      </Pressable>
      <View style={styles.nav}>
        <Pressable
          style={styles.link6}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art8} width={20} height={20} />
          <Text style={styles.label7}>{s.home}</Text>
        </Pressable>
        <Pressable
          style={styles.link7}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
          accessibilityLabel="My course"
        >
          <SvgXml xml={art.art9} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link7}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art10} width={22} height={22} />
        </Pressable>
      </View>
      <Pressable
        style={styles.link8}
        onPress={() => router.push("/road-signs-v3")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art11} width={171} height={124} style={styles.artBox} />
        <View style={styles.box21} />
        <SvgXml xml={art.art12} width={68} height={62} style={styles.artBox4} />
        <View style={styles.box22}>
          <Text style={styles.label8}>{s.roadSigns}</Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.link9}
        onPress={() => router.push("/quick-test")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art13} width={171} height={124} style={styles.artBox} />
        <View style={styles.box23} />
        <SvgXml xml={art.art14} width={60} height={68} style={styles.artBox5} />
        <View style={styles.box22}>
          <Text style={styles.label6}>{s.quickTest}</Text>
        </View>
      </Pressable>
    </ScreenFrame>
  );
}
