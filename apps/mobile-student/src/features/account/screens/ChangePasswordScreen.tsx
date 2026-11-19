import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { usePasswordField } from "@/hooks/usePasswordField";
import { PasswordField } from "@/components/PasswordField";
import { PasswordStrength } from "@/components/PasswordStrength";
import { isPasswordAcceptable } from "@/lib/password";
import { SvgXml } from "react-native-svg";
import { CtaButton } from "@/components/CtaButton";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/changePassword.art";
import { strings } from "../strings";
import { styles } from "./ChangePasswordScreen.styles";

const s = strings.changePassword;

export function ChangePasswordScreen() {
  const router = useRouter();
  const current = usePasswordField();
  const next = usePasswordField();
  // The new password has to be acceptable and different from the current one.
  const valid =
    current.value.length > 0 && isPasswordAcceptable(next.value) && next.value !== current.value;
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/edit-profile")}
          accessibilityRole="link"
          accessibilityLabel="Back to Edit profile"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.changePassword}</Text>
        <View style={styles.box} />
      </View>
      <View style={styles.box2}>
        <View style={styles.box3}>
          <View style={styles.box4}>
            <SvgXml xml={art.art2} width={20} height={20} />
          </View>
          <Text style={styles.text2}>{s.otherPhonesThatUse}</Text>
        </View>
        <View style={styles.box5}>
          <View style={styles.box6}>
            <Text style={styles.text3}>{s.currentPassword}</Text>
            <Text style={styles.text4} onPress={() => router.push("/forgot-password")}>
              {s.forgotIt}
            </Text>
          </View>
          <PasswordField field={current} placeholder={s.currentPassword} />
        </View>
        <View style={styles.box5}>
          <View style={styles.box6}>
            <Text style={styles.text3}>{s.newPassword}</Text>
          </View>
          <PasswordField field={next} placeholder={s.newPassword} />
        </View>
        <PasswordStrength password={next.value} />
      </View>
      <View style={styles.box14}>
        {valid ? (
          <>
            <CtaButton label={s.updatePassword} onPress={() => router.push("/edit-profile")} />
          </>
        ) : null}
        {!valid ? (
          <>
            <CtaButton label={s.updatePassword} disabled />
          </>
        ) : null}
      </View>
    </ScreenFrame>
  );
}
