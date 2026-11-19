import { Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/home.art";
import { strings } from "../strings";
import { styles } from "./HomeScreen.styles";

const s = strings.home;

export function HomeScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Image
          source={{ uri: "/_blob/44bf482064006efee96105a824cd69b3" }}
          style={styles.image}
          accessibilityLabel="DriveNet"
        />{" "}
        {/* TODO(img) provide asset */}
        <Pressable
          style={styles.link}
          onPress={() => router.push("/log-in")}
          accessibilityRole="link"
        >
          <Text style={styles.label}>{s.logIn}</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <SvgXml xml={art.art1} width={350} height={306} style={styles.artBox} />
        <View style={styles.box}>
          <View style={styles.box2} />
          <Text style={styles.label2}>{s.videoCourse}</Text>
        </View>
        <View style={styles.box3} />
        <View style={styles.box4}>
          <View style={styles.box5}>
            <View style={styles.box6} />
            <View style={styles.box7} />
          </View>
          <View style={styles.box8}>
            <SvgXml xml={art.art2} width={14} height={14} />
          </View>
          <View style={styles.box9}>
            <View style={styles.box10} />
          </View>
        </View>
        <View style={styles.box11}>
          <Text style={styles.label3}>
            {s.theWholeTheory} <Text style={styles.text}>{s.explainedOnVideo}</Text>
          </Text>
        </View>
        <View style={styles.box12}>
          <Text style={styles.label4}>{s.clearLessonsAtYour}</Text>
        </View>
        <View style={styles.box13}>
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/get-course")}
            accessibilityRole="link"
          >
            <Text style={styles.label5}>{s.getTheCourse}</Text>
            <View style={styles.box14}>
              <SvgXml xml={art.art3} width={18} height={18} />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.box15}>
        <Text style={styles.label6}>{s.theorySpace}</Text>
      </View>
      <Pressable
        style={styles.link3}
        onPress={() => router.push("/tickets")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art4} width={171} height={256} style={styles.artBox} />
        <View style={styles.box16} />
        <SvgXml xml={art.art5} width={146} height={128} style={styles.artBox2} />
        <View style={styles.box17}>
          <Text style={styles.label7}>{s.tickets}</Text>
        </View>
      </Pressable>
      <View style={styles.nav}>
        <Pressable
          style={styles.link4}
          onPress={() => router.push("/home")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art6} width={20} height={20} />
          <Text style={styles.label8}>{s.home}</Text>
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/my-course-locked")}
          accessibilityRole="link"
          accessibilityLabel="My course"
        >
          <SvgXml xml={art.art7} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/sign-in")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art8} width={22} height={22} />
        </Pressable>
      </View>
      <Pressable
        style={styles.link6}
        onPress={() => router.push("/road-signs-v3")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art9} width={171} height={124} style={styles.artBox} />
        <View style={styles.box18} />
        <SvgXml xml={art.art10} width={68} height={62} style={styles.artBox3} />
        <View style={styles.box19}>
          <Text style={styles.label9}>{s.roadSigns}</Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.link7}
        onPress={() => router.push("/quick-test")}
        accessibilityRole="link"
      >
        <SvgXml xml={art.art11} width={171} height={124} style={styles.artBox} />
        <View style={styles.box20} />
        <SvgXml xml={art.art12} width={60} height={68} style={styles.artBox4} />
        <View style={styles.box19}>
          <Text style={styles.label7}>{s.quickTest}</Text>
        </View>
      </Pressable>
    </ScreenFrame>
  );
}
