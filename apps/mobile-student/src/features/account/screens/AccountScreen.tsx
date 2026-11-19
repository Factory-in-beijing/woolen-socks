import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useAccountViewModel } from "../hooks/useAccountViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/account.art";
import { CATEGORY_ICONS } from "@/components/categoryIcons";
import { strings } from "../strings";

const s = strings.account;

export function AccountScreen() {
  const router = useRouter();
  const vm = useAccountViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Text style={styles.title}>{s.account}</Text>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/edit-profile")}
          accessibilityRole="link"
          accessibilityLabel="Edit profile"
        >
          <SvgXml xml={art.art1} width={16} height={16} />
          <Text style={styles.label}>{s.edit}</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.box} showsVerticalScrollIndicator={false}>
        <View style={styles.box2}>
          <View style={styles.section}>
            <View style={styles.box3}>
              <Text style={styles.label2}>{s.nb}</Text>
            </View>
            <View style={styles.box4}>
              <Text style={styles.text}>{s.ninoBeridze}</Text>
              <Text style={styles.text2}>{s.n9955551234}</Text>
            </View>
          </View>
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/my-course")}
            accessibilityRole="link"
            accessibilityLabel={`Video course B, B1, purchased. ${vm.pct} complete, now at module ${vm.mNum}: ${vm.lesson}`}
          >
            <SvgXml xml={art.art2} width={350} height={112} style={styles.artBox} />
            <View style={styles.box5}>
              <SvgXml
                xml={art.ringArt(vm.ringDash)}
                width={72}
                height={72}
                style={styles.artBox2}
              />
              <View style={styles.box6}>
                <Text style={styles.label3}>{vm.pct}</Text>
              </View>
            </View>
            <View style={styles.box7}>
              <View style={styles.box8}>
                <SvgXml xml={art.art4} width={10} height={10} />
                <Text style={styles.label4}>{s.purchased}</Text>
              </View>
              <Text style={styles.text4}>
                {s.videoCourse} <Text style={styles.text3}>{s.bB1}</Text>
              </Text>
              <Text style={styles.text5}>{`Now: Module ${vm.mNum} · ${vm.lesson}`}</Text>
            </View>
          </Pressable>
          <View style={styles.section2}>
            <View style={styles.box9}>
              <Text style={styles.heading}>{s.ticketLanguage}</Text>
              <Text style={styles.text6}>{s.n6Languages}</Text>
            </View>
            <View style={styles.box10}>
              <View style={styles.box11}>
                <View style={styles.box12}>
                  <SvgXml xml={art.art5} width={32} height={32} />
                </View>
                <View style={styles.box13}>
                  <Text style={styles.label5}>
                    {s.studyTicketsAndTake} <Text style={styles.text7}>{vm.langName}</Text>
                    {s.text}
                  </Text>
                </View>
              </View>
              <View style={styles.ticketLanguageBox}>
                {vm.langs.map((l) => (
                  <Fragment key={l.code}>
                    <Pressable
                      style={[
                        styles.button,
                        { ...l.border, backgroundColor: l.bg, boxShadow: l.shadow },
                      ]}
                      onPress={l.pick}
                      accessibilityRole="button"
                      accessibilityLabel={l.en}
                    >
                      <Text style={styles.text8}>{l.native}</Text>
                      <Text style={[styles.text9, { color: l.subFg }]}>{l.en}</Text>
                      <View style={[styles.box14, { backgroundColor: l.codeBg }]}>
                        <SvgXml
                          xml={art.art6}
                          width={12}
                          height={12}
                          style={{ display: l.markShow }}
                        />
                        <Text style={[styles.label6, { color: l.codeFg }]}>{l.short}</Text>
                      </View>
                    </Pressable>
                  </Fragment>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box15}>
              <Text style={styles.label7}>{s.preferences}</Text>
            </View>
            <View style={styles.box16}>
              <Pressable style={styles.button2} onPress={vm.openCat} accessibilityRole="button">
                <View style={styles.box12}>
                  <SvgXml xml={art.art7} width={32} height={32} />
                </View>
                <View style={styles.box4}>
                  <Text style={styles.text10}>{s.licenceCategory}</Text>
                </View>
                <Text style={styles.text11}>{vm.catCode}</Text>
                <SvgXml xml={art.art8} width={16} height={16} />
                <View style={styles.box17} />
              </Pressable>

              <Pressable
                style={styles.link3}
                onPress={() => router.push("/notifications2")}
                accessibilityRole="link"
              >
                <View style={styles.box12}>
                  <SvgXml xml={art.art11} width={32} height={32} />
                </View>
                <View style={styles.box4}>
                  <Text style={styles.text12}>{s.reminders}</Text>
                  <Text style={styles.text13}>{s.everyDay}</Text>
                </View>
                <Text style={styles.text14}>{s.n1900}</Text>
                <SvgXml xml={art.art12} width={16} height={16} />
              </Pressable>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box15}>
              <Text style={styles.label7}>{s.help}</Text>
            </View>
            <View style={styles.box16}>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/help")}
                accessibilityRole="link"
              >
                <View style={styles.box12}>
                  <SvgXml xml={art.art13} width={32} height={32} />
                </View>
                <View style={styles.box4}>
                  <Text style={styles.text12}>{s.helpCentre}</Text>
                </View>
                <SvgXml xml={art.art14} width={16} height={16} />
                <View style={styles.box17} />
              </Pressable>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/help#contact")}
                accessibilityRole="link"
              >
                <View style={styles.box12}>
                  <SvgXml xml={art.art15} width={32} height={32} />
                </View>
                <View style={styles.box4}>
                  <Text style={styles.text12}>{s.contactSupport}</Text>
                </View>
                <SvgXml xml={art.art16} width={16} height={16} />
                <View style={styles.box17} />
              </Pressable>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/terms")}
                accessibilityRole="link"
              >
                <View style={styles.box12}>
                  <SvgXml xml={art.art17} width={32} height={32} />
                </View>
                <View style={styles.box4}>
                  <Text style={styles.text12}>{s.termsAndPrivacy}</Text>
                </View>
                <SvgXml xml={art.art18} width={16} height={16} />
              </Pressable>
            </View>
          </View>
          {vm.notConfirm ? (
            <>
              <Pressable style={styles.button3} onPress={vm.logout} accessibilityRole="button">
                <SvgXml xml={art.art19} width={18} height={18} />
                <Text style={styles.label8}>{s.logOut}</Text>
              </Pressable>
            </>
          ) : null}
          {vm.confirm ? (
            <>
              <Pressable
                style={styles.link4}
                onPress={() => router.push("/main")}
                accessibilityRole="link"
              >
                <SvgXml xml={art.art20} width={18} height={18} />
                <Text style={styles.label9}>{s.tapAgainToLog}</Text>
              </Pressable>
            </>
          ) : null}
          <Text style={styles.text15}>{s.drivenetVersion10}</Text>
        </View>
      </ScrollView>
      <View style={styles.box18} />
      <View style={styles.nav}>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
          accessibilityLabel="Home"
        >
          <SvgXml xml={art.art21} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
          accessibilityLabel="My course"
        >
          <SvgXml xml={art.art22} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link6}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art23} width={20} height={20} />
          <Text style={styles.label10}>{s.account}</Text>
        </Pressable>
      </View>
      {vm.catOpen ? (
        <>
          <Pressable
            style={styles.button4}
            onPress={vm.closeSheet}
            accessibilityRole="button"
            accessibilityLabel="Close"
          />
          <ScrollView
            style={styles.licenceCategoryBox}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.licenceCategoryBoxContent}
          >
            <View style={styles.box19} />
            <View style={styles.box20}>
              <Text style={styles.label11}>{s.licenceCategory}</Text>
            </View>
            <View style={styles.box21}>
              <Text style={styles.label12}>{s.ticketsTestsAndYour}</Text>
            </View>
            <View style={styles.box22}>
              {vm.cats.map((c) => (
                <Fragment key={c.code}>
                  <Pressable
                    style={[
                      styles.button5,
                      { ...c.border, backgroundColor: c.bg, boxShadow: c.shadow },
                    ]}
                    onPress={c.pick}
                    accessibilityRole="button"
                    accessibilityLabel={`${c.code} · ${c.name}`}
                  >
                    <SvgXml
                      xml={CATEGORY_ICONS[c.code] ?? ""}
                      width={64}
                      height={40}
                      style={styles.artBox4}
                    />
                    <Text style={styles.text16}>{c.code}</Text>
                    <View style={[styles.box23, { display: c.check }]}>
                      <SvgXml xml={art.art26} width={12} height={12} />
                    </View>
                  </Pressable>
                </Fragment>
              ))}
            </View>
          </ScrollView>
        </>
      ) : null}
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
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
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 26,
    letterSpacing: -0.8,
    lineHeight: 26,
  },
  link: {
    flexDirection: "row",
    height: 44,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 22,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 14,
    textDecorationLine: "none",
  },
  box: {
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 630,
  },
  box2: {
    flexDirection: "column",
    paddingBottom: 16,
    gap: 24,
  },
  section: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  box3: {
    flexDirection: "row",
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#0e1c91",
    borderRadius: 28,
    boxShadow: "0 0 0 4px #FFFFFF, 0 10px 20px -8px rgba(176,122,0,0.5)",
  },
  label2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#ffb200",
    fontSize: 20,
  },
  box4: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 19,
    letterSpacing: -0.4,
    lineHeight: 22.8,
  },
  text2: {
    fontFamily: font.spaceGrotesk[600],
    color: "#6B7396",
    fontSize: 13,
    lineHeight: 13,
  },
  link2: {
    flexDirection: "row",
    position: "relative",
    height: 112,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 16,
    alignItems: "center",
    overflow: "hidden",
    backgroundImage: "linear-gradient(135deg, #1A2CC4 0%, #0E1C91 55%, #091470 100%)",
    borderRadius: 24,
    boxShadow: "0 18px 30px -14px rgba(14,28,145,0.55)",
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box5: {
    position: "relative",
    width: 72,
    height: 72,
    flexShrink: 0,
  },
  artBox2: {
    position: "absolute",
    left: 0,
    top: 0,
    transform: "rotate(-90deg)",
  },
  box6: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    top: 0,
    width: 72,
    height: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  label3: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 18,
    letterSpacing: -0.4,
    textDecorationLine: "none",
  },
  box7: {
    flexDirection: "column",
    position: "relative",
    minWidth: 0,
    gap: 8,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  box8: {
    flexDirection: "row",
    height: 22,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 8,
    gap: 4,
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(62,227,154,0.16)",
    borderWidth: 1,
    borderColor: "rgba(62,227,154,0.35)",
    borderRadius: 11,
  },
  label4: {
    fontFamily: font.manrope[800],
    color: "#7FF0BE",
    fontSize: 11,
    letterSpacing: 0.3,
    textDecorationLine: "none",
  },
  text3: {
    color: "#FFB200",
  },
  text4: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 17,
    letterSpacing: -0.4,
    lineHeight: 18.7,
    textDecorationLine: "none",
  },
  text5: {
    overflow: "hidden",
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    lineHeight: 14.4,
    textDecorationLine: "none",
  },
  section2: {
    flexDirection: "column",
    gap: 12,
  },
  box9: {
    flexDirection: "row",
    height: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 17,
    letterSpacing: -0.4,
  },
  text6: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 12,
  },
  box10: {
    flexDirection: "column",
    padding: 16,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 8px 20px -14px rgba(14,28,145,0.18)",
  },
  box11: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  box12: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundImage: "linear-gradient(145deg, #F4F6FF 0%, #E3E8FF 100%)",
    borderRadius: 14,
    boxShadow: "inset 0 0 0 1px rgba(14,28,145,0.05)",
  },
  box13: {
    minWidth: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text7: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
  },
  label5: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 13,
    lineHeight: 17.55,
  },
  ticketLanguageBox: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  button: {
    flexDirection: "column",
    position: "relative",
    height: 64,
    padding: 12,
    gap: 4,
    justifyContent: "center",
    borderRadius: 16,
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 16.5,
    textAlign: "left",
  },
  text9: {
    fontFamily: font.manrope[700],
    fontSize: 12,
    lineHeight: 12,
    textAlign: "left",
  },
  box14: {
    flexDirection: "row",
    position: "absolute",
    right: 12,
    bottom: 12,
    height: 20,
    minWidth: 20,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  label6: {
    fontFamily: font.spaceGrotesk[700],
    fontSize: 11,
    textAlign: "left",
  },
  box15: {
    flexDirection: "row",
    height: 20,
    margin: 0,
    alignItems: "center",
  },
  label7: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 17,
    letterSpacing: -0.4,
  },
  box16: {
    flexDirection: "column",
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 8px 20px -14px rgba(14,28,145,0.18)",
  },
  button2: {
    flexDirection: "row",
    position: "relative",
    width: "100%",
    minHeight: 64,
    padding: 12,
    gap: 12,
    alignItems: "center",
  },
  text10: {
    fontFamily: font.manrope[700],
    color: "inherit",
    fontSize: 15,
    lineHeight: 18,
    textAlign: "left",
  },
  text11: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 13,
    textAlign: "left",
  },
  box17: {
    position: "absolute",
    left: 64,
    right: 12,
    bottom: 0,
    height: 1,
    backgroundColor: "#EEF0F8",
  },
  link3: {
    flexDirection: "row",
    position: "relative",
    minHeight: 64,
    padding: 12,
    gap: 12,
    alignItems: "center",
  },
  text12: {
    fontFamily: font.manrope[700],
    color: "inherit",
    fontSize: 15,
    lineHeight: 18,
    textDecorationLine: "none",
  },
  text13: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 12,
    textDecorationLine: "none",
  },
  text14: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 13,
    textDecorationLine: "none",
  },
  button3: {
    flexDirection: "row",
    height: 56,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F3D3D4",
    borderRadius: 20,
  },
  label8: {
    fontFamily: font.manrope[800],
    color: "#D92D3A",
    fontSize: 15,
  },
  link4: {
    flexDirection: "row",
    height: 56,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D92D3A",
    borderWidth: 1,
    borderColor: "#F3D3D4",
    borderRadius: 20,
  },
  label9: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 15,
    textDecorationLine: "none",
  },
  text15: {
    fontFamily: font.manrope[700],
    color: "#A2A9C8",
    fontSize: 12,
    textAlign: "center",
  },
  box18: {
    position: "absolute",
    left: 0,
    top: 722,
    right: 0,
    height: 22,
    backgroundImage: "linear-gradient(180deg, rgba(246,247,253,0), #F6F7FD)",
  },
  nav: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 24,
    height: 60,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 6,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 30,
    boxShadow: "0 14px 34px rgba(10,14,46,0.3)",
  },
  link5: {
    flexDirection: "row",
    width: 86,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  link6: {
    flexDirection: "row",
    height: 48,
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
  },
  label10: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    textDecorationLine: "none",
  },
  button4: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    backgroundColor: "rgba(10,14,46,0.45)",
  },
  licenceCategoryBoxContent: {
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 28,
    paddingLeft: 16,
    gap: 4,
  },
  licenceCategoryBox: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: 640,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  box19: {
    width: 40,
    height: 5,
    marginBottom: 8,
    alignSelf: "center",
    flexShrink: 0,
    backgroundColor: "#DDE2FA",
    borderRadius: 3,
  },
  box20: {
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 6,
    flexShrink: 0,
  },
  label11: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 18,
    letterSpacing: -0.4,
  },
  box21: {
    paddingTop: 4,
    paddingRight: 6,
    paddingBottom: 8,
    paddingLeft: 6,
    flexShrink: 0,
  },
  label12: {
    fontFamily: font.manrope[600],
    color: "#566086",
    fontSize: 13,
    lineHeight: 18.2,
  },
  box22: {
    flexDirection: "row",
    marginTop: 0,
    gap: 8,
    flexWrap: "wrap",
    flexShrink: 0,
  },
  button5: {
    flexDirection: "column",
    position: "relative",
    height: 104,
    paddingTop: 12,
    paddingRight: 8,
    paddingBottom: 12,
    paddingLeft: 8,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  artBox4: {
    flexShrink: 0,
  },
  text16: {
    maxWidth: "100%",
    overflow: "hidden",
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 20,
  },
  box23: {
    flexDirection: "row",
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 10,
  },
});
