import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { formatGel } from "@/lib/money";
import { useCourseOffer } from "@/data/courseOffer";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/paySuccess.art";
import { strings } from "../strings";
import { styles } from "./PaySuccessScreen.styles";

const s = strings.paySuccess;

export function PaySuccessScreen() {
  const offer = useCourseOffer();
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <SvgXml xml={art.art1} width={390} height={420} style={styles.artBox} />
      <View style={styles.box}>
        <SvgXml xml={art.art2} width={44} height={44} />
      </View>
      <View style={styles.section}>
        <View style={styles.box2}>
          <Text style={styles.title}>{s.youreIn}</Text>
          <Text style={styles.text}>
            {s.theFullVideoCourse}
            {"\n"}
            {s.yourFirstLessonIs}
          </Text>
        </View>
        <View style={styles.box3}>
          <View style={styles.box4}>
            <Text style={styles.text2}>{s.course}</Text>
            <Text style={styles.text3}>{s.videoCourseBB1}</Text>
          </View>
          <View style={styles.box5}>
            <Text style={styles.text2}>{s.paidWith}</Text>
            <Text style={styles.text3}>{s.applePay}</Text>
          </View>
          <View style={styles.box5}>
            <Text style={styles.text2}>{s.date}</Text>
            <Text style={styles.text3}>{s.n15Nov2026}</Text>
          </View>
          <View style={styles.box6}>
            <Text style={styles.text4}>{s.totalPaid}</Text>
            <Text style={styles.text5}>{formatGel(offer.price)}</Text>
          </View>
        </View>
        <View style={styles.box7}>
          <SvgXml xml={art.art3} width={14} height={14} />
          <Text style={styles.label}>{s.receiptSentBySms}</Text>
        </View>
      </View>
      <View style={styles.box8}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/notif-allow-pay")}
          accessibilityRole="link"
        >
          <Text style={styles.label2}>{s.startTheCourse}</Text>
          <View style={styles.box9}>
            <SvgXml xml={art.art4} width={18} height={18} />
          </View>
        </Pressable>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
        >
          <Text style={styles.label3}>{s.backToHome}</Text>
        </Pressable>
      </View>
    </ScreenFrame>
  );
}
