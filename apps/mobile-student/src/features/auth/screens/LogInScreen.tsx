import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { usePasswordField } from "@/hooks/usePasswordField";
import { PasswordField } from "@/components/PasswordField";
import { SvgXml } from "react-native-svg";
import { CtaButton } from "@/components/CtaButton";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/logIn.art";
import { strings } from "../strings";
import { styles } from "./LogInScreen.styles";

const s = strings.logIn;

export function LogInScreen() {
  const router = useRouter();
  const pw = usePasswordField();
  const valid = pw.value.length > 0;
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/main")}
          accessibilityRole="link"
          accessibilityLabel="Back to Welcome"
        >
          <SvgXml xml={art.art2} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}></Text>
        <View style={styles.box} />
      </View>
      <View style={styles.section}>
        <View style={styles.box2}>
          <Text style={styles.title}>
            {s.welcome} <Text style={styles.text2}>{s.back}</Text>
          </Text>
          <Text style={styles.text3}>{s.logInWithYour}</Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.text4}>{s.phoneNumber}</Text>
          <View style={styles.box3}>
            <View style={styles.box4}>
              <View style={styles.box5}>
                <Text style={styles.label}>{s.ge}</Text>
              </View>
              <Text style={styles.label2}>{s.n995}</Text>
            </View>
            <Text style={styles.text5}>{s.n555123456}</Text>
          </View>
        </View>
        <View style={styles.box2}>
          <View style={styles.box6}>
            <Text style={styles.text4}>{s.password}</Text>
            <Text style={styles.text6} onPress={() => router.push("/forgot-password")}>
              {s.forgotPassword}
            </Text>
          </View>
          <PasswordField field={pw} placeholder={s.password} />
        </View>
      </View>
      <View style={styles.box8}>
        <Text style={styles.text8}>
          {s.noAccountYet}{" "}
          <Text style={styles.text7} onPress={() => router.push("/sign-in")}>
            {s.createOne}
          </Text>
        </Text>
        {valid ? (
          <>
            <CtaButton label={s.logIn} onPress={() => router.push("/home-signed-in")} />
          </>
        ) : null}
        {!valid ? (
          <>
            <CtaButton label={s.logIn} disabled />
          </>
        ) : null}
      </View>
    </ScreenFrame>
  );
}
