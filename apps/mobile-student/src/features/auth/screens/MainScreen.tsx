import { Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import logo from "../../../../assets/images/logo-white.png";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/main.art";
import { strings } from "../strings";
import { styles } from "./MainScreen.styles";

const s = strings.main;

export function MainScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={640} style={styles.artBox} />
      <View style={styles.box} />
      <View style={styles.section}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/home")}
          accessibilityRole="link"
        >
          <Text style={styles.label}>{s.getStarted}</Text>
          <SvgXml xml={art.art2} width={18} height={18} />
        </Pressable>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/log-in")}
          accessibilityRole="link"
        >
          <Text style={styles.label2}>{s.alreadyHaveAccount}</Text>
        </Pressable>
        <View style={styles.box2}>
          <Text style={styles.label3}>
            {s.lead}
            <Text style={styles.text}>{s.accent}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.header}>
        <Image source={logo} style={styles.image} accessibilityLabel="DriveNet" />
      </View>
    </ScreenFrame>
  );
}
