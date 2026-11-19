import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/logInCode.art";
import { strings } from "../strings";
import { styles } from "./LogInCodeScreen.styles";

const s = strings.logInCode;

export function LogInCodeScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/log-in")}
          accessibilityRole="link"
          accessibilityLabel="Previous step"
        >
          <SvgXml xml={art.art2} width={20} height={20} />
        </Pressable>
        <View style={styles.step2Of2Box}>
          <View style={styles.box} />
          <View style={styles.box2} />
        </View>
        <View style={styles.box3} />
      </View>
      <View style={styles.section}>
        <View style={styles.box4}>
          <Text style={styles.title}>{s.enterTheCode}</Text>
          <Text style={styles.text3}>
            {s.sentTo} <Text style={styles.text}>{s.n9955551234}</Text> {s.text}{" "}
            <Text style={styles.text2} onPress={() => router.push("/log-in")}>
              {s.change}
            </Text>
          </Text>
        </View>
        <View style={styles.n6DigitCodeBox}>
          <View style={styles.box5}>
            <Text style={styles.label}>{s.n4}</Text>
          </View>
          <View style={styles.box5}>
            <Text style={styles.label}>{s.n8}</Text>
          </View>
          <View style={styles.box5}>
            <Text style={styles.label}>{s.n2}</Text>
          </View>
          <View style={styles.box5}>
            <Text style={styles.label}>{s.n9}</Text>
          </View>
          <View style={styles.box5}>
            <Text style={styles.label}>{s.n1}</Text>
          </View>
          <View style={styles.box5}>
            <Text style={styles.label}>{s.n5}</Text>
          </View>
        </View>
        <View style={styles.box6}>
          <SvgXml xml={art.art3} width={14} height={14} />
          <Text style={styles.label2}>{s.resendIn}</Text>
          <Text style={styles.text4}>{s.n042}</Text>
        </View>
      </View>
      <View style={styles.box7}>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
        >
          <Text style={styles.label3}>{s.verify}</Text>
          <View style={styles.box8}>
            <SvgXml xml={art.art4} width={18} height={18} />
          </View>
        </Pressable>
      </View>
    </ScreenFrame>
  );
}
