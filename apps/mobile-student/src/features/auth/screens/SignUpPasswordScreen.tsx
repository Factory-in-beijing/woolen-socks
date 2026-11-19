import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { usePasswordField } from "@/hooks/usePasswordField";
import { PasswordField } from "@/components/PasswordField";
import { PasswordStrength } from "@/components/PasswordStrength";
import { isPasswordAcceptable } from "@/lib/password";
import { SvgXml } from "react-native-svg";
import { CtaButton } from "@/components/CtaButton";
import { StepHeader } from "@/components/StepHeader";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/signUpPassword.art";
import { strings } from "../strings";
import { styles } from "./SignUpPasswordScreen.styles";

const s = strings.signUpPassword;

export function SignUpPasswordScreen() {
  const router = useRouter();
  const pw = usePasswordField();
  const valid = isPasswordAcceptable(pw.value);
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <StepHeader step={3} total={4} onBack={() => router.push("/sign-in-code")} />
      <View style={styles.section}>
        <View style={styles.box5}>
          <Text style={styles.title}>
            {s.createA} <Text style={styles.text}>{s.password}</Text>
          </Text>
          <Text style={styles.text2}>{s.youWillLogIn}</Text>
        </View>
        <View style={styles.box5}>
          <View style={styles.box6}>
            <Text style={styles.text3}>{s.password2}</Text>
          </View>
          <PasswordField field={pw} placeholder={s.newPassword} />
        </View>
        <PasswordStrength password={pw.value} />
      </View>
      <View style={styles.box16}>
        <Text style={styles.text6}>{s.keepItToYourself}</Text>
        {valid ? (
          <>
            <CtaButton label={s.continue} onPress={() => router.push("/sign-in-profile")} />
          </>
        ) : null}
        {!valid ? (
          <>
            <CtaButton label={s.continue} disabled />
          </>
        ) : null}
      </View>
    </ScreenFrame>
  );
}
