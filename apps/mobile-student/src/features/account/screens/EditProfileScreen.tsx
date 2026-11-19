import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useEditProfileViewModel } from "../hooks/useEditProfileViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/editProfile.art";
import { strings } from "../strings";
import { styles } from "./EditProfileScreen.styles";

const s = strings.editProfile;

export function EditProfileScreen() {
  const router = useRouter();
  const vm = useEditProfileViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <SvgXml xml={art.art1} width={0} height={0} style={styles.artBox} />
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Back to Account"
        >
          <SvgXml xml={art.art2} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.editProfile}</Text>
        <View style={styles.box} />
      </View>
      <ScrollView style={styles.box2} showsVerticalScrollIndicator={false}>
        <View style={styles.box3}>
          <View style={styles.section}>
            <View style={styles.box4}>
              <View style={styles.box5}>
                <Text style={styles.label}>{s.nb}</Text>
              </View>
              <Pressable
                style={styles.button}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="Change photo"
              >
                <SvgXml xml={art.art3} width={16} height={16} />
              </Pressable>
            </View>
            <Text style={styles.text2}>{s.addAPhotoOptional}</Text>
          </View>
          <View style={styles.section2}>
            <View style={styles.box6}>
              <Text style={styles.text3}>{s.firstAndLastName}</Text>
              <View style={styles.box7}>
                <Text style={styles.text4}>{s.ninoBeridze}</Text>
                <View style={styles.box8} />
              </View>
            </View>
            <View style={styles.box6}>
              <Text style={styles.text3}>{s.phoneNumber}</Text>
              <View style={styles.box9}>
                <View style={styles.box10}>
                  <Text style={styles.label2}>{s.n9955551234}</Text>
                </View>
                <View style={styles.box11}>
                  <SvgXml xml={art.art4} width={10} height={10} />
                  <Text style={styles.label3}>{s.verified}</Text>
                </View>
                <Text style={styles.text5} onPress={() => router.push("/sign-in")}>
                  {s.change}
                </Text>
              </View>
            </View>
            <View style={styles.box6}>
              <Text style={styles.text3}>{s.password}</Text>
              <View style={styles.box9}>
                <SvgXml xml={art.art5} width={20} height={20} style={styles.artBox2} />
                <View style={styles.box10}>
                  <Text style={styles.label4}>{s.text}</Text>
                </View>
                <Text style={styles.text5} onPress={() => router.push("/change-password")}>
                  {s.change}
                </Text>
              </View>
            </View>
            <View style={styles.box6}>
              <View style={styles.box12}>
                <Text style={styles.text3}>{s.email}</Text>
                <Text style={styles.text6}>{s.optionalForReceipts}</Text>
              </View>
              <View style={styles.box9}>
                <Text style={styles.text7}>{s.nameExampleCom}</Text>
              </View>
            </View>
            <View style={styles.box6}>
              <Text style={styles.text3}>{s.licenceCategory}</Text>
              <View style={styles.box13}>
                <View style={styles.box14}>
                  <View style={styles.box15}>
                    <SvgXml xml={art.art6} width={26} height={16} />
                  </View>
                  <Text style={styles.label5}>{s.bB1}</Text>
                </View>
                <View style={styles.box16}>
                  <Text style={styles.label6}>{s.moreCategoriesComingSoon}</Text>
                </View>
              </View>
            </View>
          </View>
          <Pressable style={styles.button2} onPress={vm.openDel} accessibilityRole="button">
            <SvgXml xml={art.art7} width={16} height={16} />
            <Text style={styles.label7}>{s.deleteAccount}</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.box17} />
      <Pressable
        style={styles.link2}
        onPress={() => router.push("/account")}
        accessibilityRole="link"
      >
        <Text style={styles.label8}>{s.saveChanges}</Text>
        <View style={styles.box18}>
          <SvgXml xml={art.art8} width={18} height={18} />
        </View>
      </Pressable>
      <View style={[styles.box19, { display: vm.delShow }]}>
        <Pressable
          style={styles.button3}
          onPress={vm.closeDel}
          accessibilityRole="button"
          accessibilityLabel="Close"
        />
        <View style={styles.section3}>
          <View style={styles.box20} />
          <View style={styles.box21}>
            <SvgXml xml={art.art9} width={28} height={28} />
          </View>
          <View style={styles.box22}>
            <Text style={styles.text8}>{s.deleteYourAccount}</Text>
            <Text style={styles.text9}>{s.yourProfileAndProgress}</Text>
          </View>
          <View style={styles.box23}>
            <Pressable
              style={styles.link3}
              onPress={() => router.push("/main")}
              accessibilityRole="link"
            >
              <Text style={styles.label9}>{s.deleteAccount}</Text>
            </Pressable>
            <Pressable style={styles.button4} onPress={vm.closeDel} accessibilityRole="button">
              <Text style={styles.label10}>{s.cancel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenFrame>
  );
}
