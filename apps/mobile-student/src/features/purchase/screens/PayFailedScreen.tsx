import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/payFailed.art";
import { strings } from "../strings";
import { styles } from "./PayFailedScreen.styles";

const s = strings.payFailed;

export function PayFailedScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/get-course")}
          accessibilityRole="link"
          accessibilityLabel="Close"
        >
          <SvgXml xml={art.art1} width={18} height={18} />
        </Pressable>
        <Text style={styles.text}></Text>
        <View style={styles.box} />
      </View>
      <SvgXml xml={art.art2} width={390} height={300} style={styles.artBox} />
      <View style={styles.box2}>
        <SvgXml xml={art.art3} width={36} height={36} />
      </View>
      <View style={styles.section}>
        <View style={styles.box3}>
          <Text style={styles.title}>{s.paymentDidntGoThrough}</Text>
        </View>
        <View style={styles.box4}>
          <Text style={styles.text2}>{s.commonReasons}</Text>
          <View style={styles.box5}>
            <View style={styles.box6}>
              <View style={styles.box7}>
                <SvgXml xml={art.art4} width={29} height={29} />
              </View>
              <Text style={styles.text3}>{s.notEnoughMoneyOn}</Text>
              <View style={styles.box8} />
            </View>
            <View style={styles.box6}>
              <View style={styles.box7}>
                <SvgXml xml={art.art5} width={29} height={29} />
              </View>
              <Text style={styles.text3}>{s.theSmsCodeExpired}</Text>
              <View style={styles.box8} />
            </View>
            <View style={styles.box6}>
              <View style={styles.box7}>
                <SvgXml xml={art.art6} width={29} height={29} />
              </View>
              <Text style={styles.text3}>{s.theConnectionDropped}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.box9}>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/pay-card")}
          accessibilityRole="link"
        >
          <Text style={styles.label}>{s.tryAgain}</Text>
          <View style={styles.box10}>
            <SvgXml xml={art.art7} width={18} height={18} />
          </View>
        </Pressable>
        <View style={styles.box11}>
          <Pressable
            style={styles.link3}
            onPress={() => router.push("/get-course")}
            accessibilityRole="link"
          >
            <Text style={styles.label2}>{s.otherPayment}</Text>
          </Pressable>
          <Pressable
            style={styles.link3}
            onPress={() => router.push("/help")}
            accessibilityRole="link"
          >
            <Text style={styles.label3}>{s.getHelp}</Text>
          </Pressable>
        </View>
      </View>
    </ScreenFrame>
  );
}
