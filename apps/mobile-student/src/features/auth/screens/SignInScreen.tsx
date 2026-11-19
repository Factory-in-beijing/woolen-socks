import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/signIn.art";
import { strings } from "../strings";
import { styles } from "./SignInScreen.styles";

const s = strings.signIn;

export function SignInScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/home")}
          accessibilityRole="link"
          accessibilityLabel="Back to Home"
        >
          <SvgXml xml={art.art2} width={20} height={20} />
        </Pressable>
        <View style={styles.step1Of4Box}>
          <View style={styles.box} />
          <View style={styles.box2} />
          <View style={styles.box2} />
          <View style={styles.box2} />
        </View>
        <View style={styles.box3} />
      </View>
      <View style={styles.section}>
        <View style={styles.box4}>
          <Text style={styles.title}>
            {s.createYour} <Text style={styles.text}>{s.account}</Text>
          </Text>
          <Text style={styles.text2}>{s.wellTextYouA}</Text>
        </View>
        <View style={styles.box4}>
          <Text style={styles.text3}>{s.phoneNumber}</Text>
          <View style={styles.box5}>
            <View style={styles.box6}>
              <View style={styles.box7}>
                <Text style={styles.label}>{s.ge}</Text>
              </View>
              <Text style={styles.label2}>{s.n995}</Text>
            </View>
            <Text style={styles.text4}>{s.n555123456}</Text>
            <View style={styles.box8} />
          </View>
        </View>
      </View>
      <View style={styles.box9}>
        <Text style={styles.text6}>
          {s.alreadyHaveAnAccount}{" "}
          <Text style={styles.text5} onPress={() => router.push("/log-in")}>
            {s.logIn}
          </Text>
        </Text>
        <Text style={styles.text7}>
          {s.byContinuingYouAgree}{" "}
          <Text style={styles.text5} onPress={() => router.push("/terms-sign-in")}>
            {s.terms}
          </Text>{" "}
          {s.and}{" "}
          <Text style={styles.text5} onPress={() => router.push("/terms-sign-in")}>
            {s.privacyPolicy}
          </Text>
          {s.text}
        </Text>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/sign-in-code")}
          accessibilityRole="link"
        >
          <Text style={styles.label3}>{s.sendCode}</Text>
          <View style={styles.box10}>
            <SvgXml xml={art.art3} width={18} height={18} />
          </View>
        </Pressable>
      </View>
    </ScreenFrame>
  );
}
