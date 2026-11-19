import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useHelpViewModel } from "../hooks/useHelpViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/help.art";
import { strings } from "../strings";

const s = strings.help;

export function HelpScreen() {
  const router = useRouter();
  const vm = useHelpViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Back to Account"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.help}</Text>
        <View style={styles.box} />
      </View>
      <ScrollView style={styles.box2} showsVerticalScrollIndicator={false}>
        <View style={styles.box3}>
          <View style={styles.section}>
            <SvgXml xml={art.art2} width={350} height={160} style={styles.artBox} />
            <View style={styles.box4}>
              <Text style={styles.text3}>
                {s.howCanWe} <Text style={styles.text2}>{s.help2}</Text>
              </Text>
              <Text style={styles.text4}>{s.answersToTheQuestions}</Text>
            </View>
            <View style={styles.box5}>
              <SvgXml xml={art.art3} width={18} height={18} />
              <TextInput
                style={styles.input}
                placeholder={s.searchEGLanguage}
                placeholderTextColor="#A2A9C8"
                value={vm.q}
                onChangeText={vm.setQ}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box6}>
              <Text style={styles.label}>{s.talkToAPerson}</Text>
            </View>
            <View style={styles.box7}>
              <View style={styles.box8} />
              <View style={styles.box9}>
                <View style={styles.box10}>
                  <View style={styles.box11}>
                    <Text style={styles.label2}>{s.n}</Text>
                  </View>
                  <View style={styles.box12}>
                    <Text style={styles.label3}>{s.g}</Text>
                  </View>
                  <View style={styles.box13}>
                    <Text style={styles.label2}>{s.l}</Text>
                  </View>
                  <View style={styles.box14} />
                </View>
                <View style={styles.box15}>
                  <Text style={styles.text5}>{s.ourTeamIsOnline}</Text>
                  <Text style={styles.text6}>{s.everyDay0900}</Text>
                </View>
              </View>
              <Pressable
                style={styles.button}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="Start a chat"
              >
                <SvgXml xml={art.art4} width={20} height={20} />
                <View style={styles.box16}>
                  <Text style={styles.label4}>{s.startAChat}</Text>
                </View>
                <View style={styles.box17}>
                  <SvgXml xml={art.art5} width={18} height={18} />
                </View>
              </Pressable>
              <View style={styles.box18}>
                <Pressable
                  style={styles.button2}
                  onPress={() => {}}
                  accessibilityRole="button"
                  accessibilityLabel="Call us, 09:00 \u2013 18:00"
                >
                  <View style={styles.box19}>
                    <SvgXml xml={art.art6} width={29} height={29} />
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.callUs}</Text>
                    <Text style={styles.text8}>{s.n09001800}</Text>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.button2}
                  onPress={() => {}}
                  accessibilityRole="button"
                  accessibilityLabel="Email, Within a day"
                >
                  <View style={styles.box19}>
                    <SvgXml xml={art.art7} width={29} height={29} />
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.email}</Text>
                    <Text style={styles.text8}>{s.withinADay}</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box21}>
              <Text style={styles.heading}>{s.questions}</Text>
              <Text style={styles.text9}>{vm.countLabel}</Text>
            </View>
            <ScrollView
              style={styles.box22}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.boxContent}
            >
              {vm.chips.map((c, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={[styles.button3, { ...c.border, backgroundColor: c.bg }]}
                    onPress={c.pick}
                    accessibilityRole="button"
                  >
                    <Text style={[styles.label5, { color: c.fg }]}>{c.label}</Text>
                  </Pressable>
                </Fragment>
              ))}
            </ScrollView>
            <View style={styles.box23}>
              {vm.rows.map((it) => (
                <Fragment key={it.key}>
                  <View style={styles.box24}>
                    <Pressable
                      style={styles.button4}
                      onPress={it.toggle}
                      accessibilityRole="button"
                    >
                      <View style={styles.box25}>
                        <Text style={styles.label6}>{it.q}</Text>
                      </View>
                      <View
                        style={[
                          styles.box26,
                          { backgroundColor: it.iconBg, transform: [{ rotate: it.rot }] },
                        ]}
                      >
                        <SvgXml xml={art.toggleArt(it.iconFg)} width={14} height={14} />
                      </View>
                    </Pressable>
                    {it.isOpen ? (
                      <>
                        <View style={styles.box27}>
                          <Text style={styles.label7}>{it.a}</Text>
                        </View>
                      </>
                    ) : null}
                    <View style={[styles.box28, { backgroundColor: it.line }]} />
                  </View>
                </Fragment>
              ))}
              {vm.noRows ? (
                <>
                  <View style={styles.box29}>
                    <Text style={styles.text10}>{s.noAnswerYet}</Text>
                    <Text style={styles.text11}>{s.writeToUsIn}</Text>
                  </View>
                </>
              ) : null}
            </View>
          </View>
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/terms")}
            accessibilityRole="link"
          >
            <SvgXml xml={art.art9} width={16} height={16} />
            <Text style={styles.label8}>{s.termsAndPrivacy}</Text>
          </Pressable>
        </View>
      </ScrollView>
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
    left: 0,
    top: 114,
    width: 390,
    height: 710,
  },
  box3: {
    flexDirection: "column",
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 32,
    paddingLeft: 20,
    gap: 24,
  },
  section: {
    flexDirection: "column",
    position: "relative",
    padding: 20,
    gap: 16,
    overflow: "hidden",
    backgroundImage: "radial-gradient(120% 90% at 50% 0%, #2638DA 0%, #0E1C91 55%, #08106A 100%)",
    borderRadius: 28,
    boxShadow: "0 20px 34px -18px rgba(14,28,145,0.6)",
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box4: {
    flexDirection: "column",
    position: "relative",
    gap: 6,
  },
  text2: {
    color: "#FFB200",
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 24,
    letterSpacing: -0.8,
    lineHeight: 26.4,
  },
  text4: {
    fontFamily: font.manrope[600],
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
  },
  box5: {
    flexDirection: "row",
    position: "relative",
    height: 52,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 10,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    borderRadius: 26,
  },
  input: {
    minWidth: 0,
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    fontFamily: font.manrope[600],
    color: "#FFFFFF",
    fontSize: 15,
  },
  section2: {
    flexDirection: "column",
    gap: 12,
  },
  box6: {
    height: 20,
    margin: 0,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 17,
    letterSpacing: -0.4,
    lineHeight: 20,
  },
  box7: {
    flexDirection: "column",
    position: "relative",
    padding: 16,
    gap: 16,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 28,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 18px 36px -22px rgba(14,28,145,0.35)",
  },
  box8: {
    position: "absolute",
    top: -60,
    right: -40,
    width: 180,
    height: 180,
    backgroundImage: "radial-gradient(circle, rgba(255,178,0,0.16), rgba(255,178,0,0) 70%)",
    borderRadius: 90,
  },
  box9: {
    flexDirection: "row",
    position: "relative",
    gap: 12,
    alignItems: "center",
  },
  box10: {
    flexDirection: "row",
    position: "relative",
  },
  box11: {
    flexDirection: "row",
    position: "relative",
    width: 40,
    height: 40,
    zIndex: 3,
    marginLeft: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(135deg, #2638DA, #0E1C91)",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: 20,
  },
  label2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 14,
  },
  box12: {
    flexDirection: "row",
    position: "relative",
    width: 40,
    height: 40,
    zIndex: 2,
    marginLeft: -12,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(135deg, #FFD266, #FFB200)",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: 20,
  },
  label3: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 14,
  },
  box13: {
    flexDirection: "row",
    position: "relative",
    width: 40,
    height: 40,
    zIndex: 1,
    marginLeft: -12,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(135deg, #5B6BFF, #2638DA)",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: 20,
  },
  box14: {
    position: "absolute",
    right: -1,
    bottom: 1,
    width: 12,
    height: 12,
    zIndex: 4,
    backgroundColor: "#12A06A",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 6,
  },
  box15: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  text6: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    lineHeight: 14.4,
  },
  button: {
    flexDirection: "row",
    position: "relative",
    height: 56,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 20,
    gap: 10,
    alignItems: "center",
    backgroundImage: "radial-gradient(120% 140% at 0% 0%, #2638DA 0%, #0E1C91 60%, #08106A 100%)",
    borderRadius: 28,
    boxShadow: "0 14px 24px -14px rgba(14,28,145,0.7)",
  },
  box16: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  label4: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
    letterSpacing: -0.2,
    textAlign: "left",
  },
  box17: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 20,
  },
  box18: {
    flexDirection: "row",
    position: "relative",
    gap: 8,
  },
  button2: {
    flexDirection: "row",
    height: 60,
    minWidth: 0,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 10,
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#F6F7FD",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
  },
  box19: {
    flexDirection: "row",
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundImage: "linear-gradient(145deg, #F4F6FF 0%, #E3E8FF 100%)",
    borderRadius: 12,
    boxShadow: "inset 0 0 0 1px rgba(14,28,145,0.05)",
  },
  box20: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
  },
  text7: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    lineHeight: 14,
    textAlign: "left",
  },
  text8: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 11,
    lineHeight: 11,
    textAlign: "left",
  },
  box21: {
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
  text9: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 13,
  },
  boxContent: {
    flexDirection: "row",
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 20,
    gap: 8,
  },
  box22: {
    marginTop: 0,
    marginRight: -20,
    marginBottom: 0,
    marginLeft: -20,
  },
  button3: {
    height: 36,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 14,
    flexShrink: 0,
    borderRadius: 18,
  },
  label5: {
    fontFamily: font.manrope[800],
    fontSize: 13,
  },
  box23: {
    flexDirection: "column",
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box24: {
    flexDirection: "column",
    position: "relative",
  },
  button4: {
    flexDirection: "row",
    minHeight: 60,
    padding: 12,
    gap: 12,
    alignItems: "center",
  },
  box25: {
    minWidth: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  label6: {
    fontFamily: font.manrope[700],
    color: "inherit",
    fontSize: 15,
    lineHeight: 19.5,
    textAlign: "left",
  },
  box26: {
    flexDirection: "row",
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 14,
  },
  box27: {
    paddingTop: 12,
    paddingRight: 14,
    paddingBottom: 12,
    paddingLeft: 14,
    marginTop: 0,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    backgroundColor: "#F3F5FC",
    borderRadius: 16,
  },
  label7: {
    fontFamily: font.manrope[600],
    color: "#3A4270",
    fontSize: 14,
    lineHeight: 21,
  },
  box28: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 0,
    height: 1,
  },
  box29: {
    flexDirection: "column",
    paddingTop: 28,
    paddingRight: 16,
    paddingBottom: 28,
    paddingLeft: 16,
    gap: 8,
    alignItems: "center",
  },
  text10: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    textAlign: "center",
  },
  text11: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 13,
    lineHeight: 18.2,
    textAlign: "center",
  },
  link2: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    alignSelf: "center",
  },
  label8: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 13,
    textDecorationLine: "none",
  },
});
