import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useEditProfileViewModel } from "../hooks/useEditProfileViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/editProfile.art";
import { strings } from "../strings";

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

const styles = StyleSheet.create({
  artBox: {
    position: "absolute",
  },
  header: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 54,
    width: 350,
    height: 44,
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 22,
  },
  text: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 17,
    letterSpacing: -0.3,
  },
  box: {
    width: 44,
    height: 44,
  },
  box2: {
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 630,
  },
  box3: {
    flexDirection: "column",
    paddingBottom: 16,
    gap: 24,
  },
  section: {
    flexDirection: "column",
    paddingTop: 8,
    gap: 12,
    alignItems: "center",
  },
  box4: {
    position: "relative",
    width: 96,
    height: 96,
  },
  box5: {
    flexDirection: "row",
    width: 96,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E1C91",
    borderRadius: 48,
    boxShadow: "0 0 0 6px #FFFFFF, 0 16px 28px -12px rgba(14,28,145,0.5)",
  },
  label: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFB200",
    fontSize: 32,
  },
  button: {
    flexDirection: "row",
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 36,
    height: 36,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderWidth: 3,
    borderColor: "#F6F7FD",
    borderRadius: 18,
  },
  text2: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 13,
  },
  section2: {
    flexDirection: "column",
    gap: 16,
  },
  box6: {
    flexDirection: "column",
    gap: 8,
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#566086",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  box7: {
    flexDirection: "row",
    height: 60,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#0E1C91",
    borderRadius: 18,
    boxShadow: "0 0 0 4px rgba(14,28,145,0.08)",
  },
  text4: {
    fontFamily: font.manrope[700],
    color: "#0A0E2E",
    fontSize: 17,
  },
  box8: {
    width: 2,
    height: 22,
    backgroundColor: "#0E1C91",
    borderRadius: 1,
  },
  box9: {
    flexDirection: "row",
    height: 60,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 18,
  },
  box10: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  label2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 17,
  },
  box11: {
    flexDirection: "row",
    height: 24,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 6,
    gap: 4,
    alignItems: "center",
    backgroundColor: "#E7F6EF",
    borderRadius: 12,
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#12A06A",
    fontSize: 11,
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 13,
    textDecorationLine: "none",
  },
  artBox2: {
    flexShrink: 0,
  },
  label4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 20,
    letterSpacing: 3,
  },
  box12: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  text6: {
    fontFamily: font.manrope[700],
    color: "#A2A9C8",
    fontSize: 11,
  },
  text7: {
    fontFamily: font.manrope[600],
    color: "#A2A9C8",
    fontSize: 16,
  },
  box13: {
    flexDirection: "row",
    minHeight: 60,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#F3F5FC",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 18,
  },
  box14: {
    flexDirection: "row",
    height: 28,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 4,
    gap: 8,
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 14,
  },
  box15: {
    flexDirection: "row",
    width: 30,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  label5: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 13,
  },
  box16: {
    minWidth: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  label6: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 16.2,
  },
  button2: {
    flexDirection: "row",
    height: 44,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 8,
    alignItems: "center",
    alignSelf: "center",
  },
  label7: {
    fontFamily: font.manrope[800],
    color: "#D92D3A",
    fontSize: 14,
  },
  box17: {
    position: "absolute",
    left: 0,
    top: 722,
    right: 0,
    height: 22,
    backgroundImage: "linear-gradient(180deg, rgba(246,247,253,0), #F6F7FD)",
  },
  link2: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
    height: 60,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 30,
    boxShadow: "0 14px 30px -12px rgba(176,122,0,0.6)",
  },
  label8: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    textDecorationLine: "none",
  },
  box18: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
  box19: {
    flexDirection: "row",
    position: "absolute",
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button3: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    backgroundColor: "rgba(10,14,46,0.55)",
  },
  section3: {
    flexDirection: "column",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 390,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 24,
    paddingLeft: 20,
    gap: 24,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: "0 -16px 40px rgba(5,10,60,0.3)",
  },
  box20: {
    width: 40,
    height: 5,
    backgroundColor: "#DDE2F5",
    borderRadius: 3,
  },
  box21: {
    flexDirection: "row",
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDECEC",
    borderRadius: 32,
  },
  box22: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 22,
    letterSpacing: -0.6,
    textAlign: "center",
  },
  text9: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  box23: {
    flexDirection: "column",
    width: "100%",
    gap: 8,
  },
  link3: {
    flexDirection: "row",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D92D3A",
    borderRadius: 28,
  },
  label9: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
    textDecorationLine: "none",
  },
  button4: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 28,
  },
  label10: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
  },
});
