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
import * as art from "../art/newPassword.art";
import { strings } from "../strings";
import { styles } from "./NewPasswordScreen.styles";

const s = strings.newPassword;

export function NewPasswordScreen() {
  const router = useRouter();
  const pw = usePasswordField();
  const valid = isPasswordAcceptable(pw.value);
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <StepHeader step={3} total={3} onBack={() => router.push("/reset-code")} />
      <View style={styles.section}>
        <View style={styles.box4}>
          <Text style={styles.title}>
            {s.setANew} <Text style={styles.text}>{s.password}</Text>
          </Text>
          <Text style={styles.text2}>{s.yourOldPasswordStops}</Text>
        </View>
        <View style={styles.box4}>
          <View style={styles.box5}>
            <Text style={styles.text3}>{s.newPassword}</Text>
          </View>
          <PasswordField field={pw} placeholder={s.newPassword} />
        </View>
        <PasswordStrength password={pw.value} />
      </View>
      <View style={styles.box15}>
        <Text style={styles.text6}>{s.youWillBeLogged}</Text>
        {valid ? (
          <>
            <CtaButton label={s.saveAndLogIn} onPress={() => router.push("/home-signed-in")} />
          </>
        ) : null}
        {!valid ? (
          <>
            <CtaButton label={s.saveAndLogIn} disabled />
          </>
        ) : null}
      </View>
    </ScreenFrame>
  );
}
