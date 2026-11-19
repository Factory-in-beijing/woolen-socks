import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { StepHeader } from "@/components/StepHeader";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/forgotPassword.art";
import { strings } from "../strings";
import { styles } from "./ForgotPasswordScreen.styles";

const s = strings.forgotPassword;

export function ForgotPasswordScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <StepHeader step={1} total={3} onBack={() => router.push("/log-in")} />
      <View style={styles.section}>
        <View style={styles.box4}>
          <Text style={styles.title}>
            {s.resetYour} <Text style={styles.text}>{s.password}</Text>
          </Text>
          <Text style={styles.text2}>{s.wellTextA6}</Text>
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
          {s.rememberedIt}{" "}
          <Text style={styles.text5} onPress={() => router.push("/log-in")}>
            {s.logIn}
          </Text>
        </Text>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/reset-code")}
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
