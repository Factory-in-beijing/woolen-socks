import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useGetCourseViewModel } from "../hooks/useGetCourseViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/getCourse.art";
import { strings } from "../strings";
import { styles } from "./GetCourseScreen.styles";

const s = strings.getCourse;

export function GetCourseScreen() {
  const router = useRouter();
  const vm = useGetCourseViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/home")}
          accessibilityRole="link"
          accessibilityLabel="Back to Home"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.getTheCourse}</Text>
        <View style={styles.box} />
      </View>
      <ScrollView
        style={styles.box2}
        showsVerticalScrollIndicator={false}
        ref={vm.scrollRef}
        onScroll={vm.onScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.box3}>
          <View style={styles.section}>
            <SvgXml xml={art.art2} width={350} height={196} style={styles.artBox} />
            <View style={styles.box4}>
              <View style={styles.box5}>
                <View style={styles.box6} />
                <Text style={styles.label}>{s.categoryBB1}</Text>
              </View>
              <View style={styles.box7}>
                <SvgXml xml={art.art3} width={18} height={18} />
              </View>
            </View>
            <View style={styles.box8}>
              <Text style={styles.text3}>
                {s.theWholeTheory}
                {"\n"}
                <Text style={styles.text2}>{s.explainedOnVideos}</Text>
              </Text>
              <Text style={styles.text4}>{s.clearLessonsAtYour}</Text>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box9}>
              <Text style={styles.label2}>{s.whatYouGet}</Text>
            </View>
            <View style={styles.box10}>
              <View style={styles.box11}>
                <View style={styles.box12}>
                  <Text style={styles.text5}>{s.n36}</Text>
                  <Text style={styles.text6}>{s.videoLessons}</Text>
                </View>
                <View style={styles.box13}>
                  <Text style={styles.text5}>{s.n921}</Text>
                  <Text style={styles.text6}>{s.tickets}</Text>
                </View>
                <View style={styles.box13}>
                  <Text style={styles.text5}>{s.n6}</Text>
                  <Text style={styles.text6}>{s.ticketLanguages}</Text>
                </View>
              </View>
              <View style={styles.box14} />
              <View style={styles.box15}>
                <View style={styles.box16}>
                  <View style={styles.box17}>
                    <SvgXml xml={art.art4} width={12} height={12} />
                  </View>
                  <Text style={styles.text7}>{s.videoLessonsInGeorgian}</Text>
                </View>
                <View style={styles.box16}>
                  <View style={styles.box17}>
                    <SvgXml xml={art.art5} width={12} height={12} />
                  </View>
                  <Text style={styles.text7}>{s.everyLessonIsLinked}</Text>
                </View>
                <View style={styles.box16}>
                  <View style={styles.box17}>
                    <SvgXml xml={art.art6} width={12} height={12} />
                  </View>
                  <Text style={styles.text7}>{s.shortLessons515}</Text>
                </View>
                <View style={styles.box16}>
                  <View style={styles.box17}>
                    <SvgXml xml={art.art7} width={12} height={12} />
                  </View>
                  <Text style={styles.text7}>{s.watchOnPhoneOr}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box9}>
              <Text style={styles.label2}>{s.payment}</Text>
            </View>
            <View style={styles.box18}>
              <View style={styles.box19}>
                <View style={styles.box20}>
                  <Text style={styles.text8}>{s.fullVideoCourse}</Text>
                  <Text style={styles.text9}>{s.oneTimePaymentNo}</Text>
                </View>
                <View style={styles.box21}>
                  <Text style={styles.text10}>{vm.price}</Text>
                </View>
              </View>
              <View style={styles.section2}>
                <Pressable
                  style={styles.link2}
                  onPress={() => router.push("/pay-success")}
                  accessibilityRole="link"
                  accessibilityLabel="Buy with Apple Pay"
                >
                  <SvgXml xml={art.applePayArt} width="100%" height={50} />
                </Pressable>
                <Pressable
                  style={styles.link2}
                  onPress={() => router.push("/pay-success")}
                  accessibilityRole="link"
                  accessibilityLabel="Buy with Google Pay"
                >
                  <SvgXml xml={art.googlePayArt} width="100%" height={50} />
                </Pressable>
                <View style={styles.box16}>
                  <View style={styles.box22} />
                  <Text style={styles.label3}>{s.or}</Text>
                  <View style={styles.box22} />
                </View>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/pay-card")}
                  accessibilityRole="link"
                  accessibilityLabel={`Pay ${vm.price} with a bank card`}
                >
                  <SvgXml xml={art.art8} width={20} height={20} />
                  <Text style={styles.label4}>{s.payWithCard}</Text>
                </Pressable>
              </View>
              <View style={styles.box23}>
                <SvgXml xml={art.art9} width={14} height={14} />
                <Text style={styles.label3}>{s.securePaymentVisaMastercard}</Text>
              </View>
              <Text style={styles.text11}>{s.includes2MonthsOf}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box24} />
      <Pressable
        style={[
          styles.link4,
          {
            opacity: vm.hintOpacity,
            transform: [{ translateX: "-50%" }, { translateY: vm.hintOffsetY }],
          },
        ]}
        onPress={vm.scrollToPayment}
        accessibilityRole="link"
        accessibilityLabel="Scroll down to payment"
        pointerEvents={vm.hintTouchable ? "auto" : "none"}
      >
        <Text style={styles.text13}>
          {s.paymentBelow} <Text style={styles.text12}>{`· ${vm.price}`}</Text>
        </Text>
        <View style={styles.box25}>
          <SvgXml xml={art.art10} width={14} height={14} />
        </View>
      </Pressable>
    </ScreenFrame>
  );
}
