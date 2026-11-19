import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSignInProfileViewModel } from "../hooks/useSignInProfileViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/signInProfile.art";
import { strings } from "../strings";
import { styles } from "./SignInProfileScreen.styles";

const s = strings.signInProfile;

export function SignInProfileScreen() {
  const router = useRouter();
  const vm = useSignInProfileViewModel();
  return (
    <ScreenFrame background="#0E1C91">
      <SvgXml xml={art.art1} width={390} height={312} style={styles.artBox} />
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/sign-up-password")}
          accessibilityRole="link"
          accessibilityLabel="Previous step"
        >
          <SvgXml xml={art.art2} width={20} height={20} />
        </Pressable>
        <View style={styles.step4Of4Box}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box2} />
        </View>
        <View style={styles.box3} />
      </View>
      <View style={styles.section}>
        <View style={styles.box4}>
          <Text style={styles.title}>{s.almostDone}</Text>
          <Text style={styles.text}>{s.yourNameAndThe}</Text>
        </View>
        <View style={styles.box4}>
          <Text style={styles.text2}>{s.yourFirstAndLast}</Text>
          <View style={styles.box5}>
            <Text style={styles.text3}>{s.ninoBeridze}</Text>
            <View style={styles.box6} />
          </View>
        </View>
        <View style={styles.box4}>
          <View style={styles.box7}>
            <Text style={styles.text2}>{s.ticketLanguage}</Text>
            <Text style={styles.text4}>{s.changeItAnyTime}</Text>
          </View>
          <View style={styles.ticketLanguageBox}>
            {vm.languages.map((language) => (
              <Pressable
                key={language.code}
                style={[styles.button, language.selected ? styles.buttonOn : styles.buttonOff]}
                onPress={language.pick}
                accessibilityRole="button"
                accessibilityLabel={language.english}
                accessibilityState={{ selected: language.selected }}
              >
                <Text style={styles.text5}>{language.native}</Text>
                <View style={[styles.box8, language.selected ? styles.codeOn : styles.codeOff]}>
                  {language.selected ? (
                    <SvgXml xml={art.checkArt("#FFB200")} width={12} height={12} />
                  ) : null}
                  {language.selected ? null : <Text style={styles.label}>{language.short}</Text>}
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.box9}>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/home-member")}
          accessibilityRole="link"
        >
          <Text style={styles.label2}>{s.startLearning}</Text>
          <View style={styles.box10}>
            <SvgXml xml={art.art4} width={18} height={18} />
          </View>
        </Pressable>
      </View>
    </ScreenFrame>
  );
}
