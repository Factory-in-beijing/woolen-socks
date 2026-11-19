import { Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import logo from "../../../../assets/images/logo-white.png";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/splash2.art";
import { strings } from "../strings";
import { styles } from "./Splash2Screen.styles";

const s = strings.splash2;

export function Splash2Screen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#0A1478">
      <View style={styles.box}>
        <View style={styles.box2} />
        <View style={styles.box3} />
        <View style={styles.box4} />
      </View>
      <SvgXml xml={art.art1} width={390} height={844} style={styles.artBox} />

      <Pressable
        style={styles.link}
        onPress={() => router.push("/main")}
        accessibilityRole="link"
        accessibilityLabel="DriveNet \u2014 tap to continue"
      >
        <SvgXml xml={art.art2} width={390} height={844} style={styles.artBox2} />
        <Text style={styles.text}></Text>
        <View style={styles.box5} />
        <View style={styles.box6}>
          <View style={styles.box7}>
            <Image source={logo} style={styles.image} accessibilityLabel="DriveNet" />
            <View style={styles.box8} />
          </View>
        </View>
        <View style={styles.box9}>
          <Text style={styles.label}>
            {s.learnItPassIt} <Text style={styles.text2}>{s.drive}</Text>
          </Text>
        </View>
        <View style={styles.box10}>
          <View style={styles.box11}>
            <SvgXml xml={art.art3} width={44} height={44} />
          </View>
        </View>
        <View style={styles.box12}>
          <View style={styles.box11}>
            <SvgXml xml={art.art4} width={44} height={44} />
          </View>
        </View>
        <View style={styles.box13}>
          <View style={styles.box11}>
            <SvgXml xml={art.art5} width={44} height={44} />
          </View>
        </View>
        <View style={styles.box14}>
          <View style={styles.box15} />
          <View style={styles.box15} />
          <View style={styles.box15} />
        </View>
      </Pressable>
    </ScreenFrame>
  );
}
