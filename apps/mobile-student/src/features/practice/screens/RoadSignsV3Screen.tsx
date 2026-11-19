import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/roadSignsV3.art";
import { strings } from "../strings";

const s = strings.roadSignsV3;

export function RoadSignsV3Screen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <Pressable
        style={styles.link}
        onPress={() => router.push("/home-signed-in")}
        accessibilityRole="link"
        accessibilityLabel="Back"
      >
        <SvgXml xml={art.art1} width={20} height={20} />
      </Pressable>
      <View style={styles.box}>
        <Text style={styles.label}>{s.roadSigns}</Text>
      </View>
      <View style={styles.section}>
        <SvgXml xml={art.art2} width={350} height={148} style={styles.artBox} />
        <View style={styles.box2}>
          <Text style={styles.label2}>{s.signsLearned}</Text>
        </View>
        <View style={styles.box3}>
          <Text style={styles.text}>{s.n96}</Text>
          <Text style={styles.text2}>{s.n237}</Text>
        </View>
        <View style={styles.box4}>
          <View style={styles.box5} />
          <Text style={styles.label3}>{s.n41}</Text>
        </View>
        <View style={styles.box6}>
          <View style={styles.box7}>
            <View style={styles.box8} />
          </View>
          <View style={styles.box9}>
            <View style={styles.box10} />
          </View>
          <View style={styles.box11}>
            <View style={styles.box12} />
          </View>
          <View style={styles.box13}>
            <View style={styles.box14} />
          </View>
          <View style={styles.box15}>
            <View style={styles.box16} />
          </View>
          <View style={styles.box17}>
            <View style={styles.box18} />
          </View>
          <View style={styles.box19}>
            <View style={styles.box20} />
          </View>
          <View style={styles.box21}>
            <View style={styles.box22} />
          </View>
        </View>
        <View style={styles.box23}>
          <Text style={styles.text3}>{s.oneBarPerGroup}</Text>
          <Text style={styles.text3}>{s.warningAdditional}</Text>
        </View>
      </View>
      <View style={styles.box24}>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/mistakes")}
          accessibilityRole="link"
        >
          <View style={styles.box25}>
            <SvgXml xml={art.art3} width={17} height={17} />
          </View>
          <View style={styles.box26}>
            <Text style={styles.text4}>{s.mistakes}</Text>
            <Text style={styles.text5}>{s.n12SignsToFix}</Text>
          </View>
          <View style={styles.n12SignMistakesBox}>
            <Text style={styles.label4}>{s.n12}</Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.link3}
          onPress={() => router.push("/saved")}
          accessibilityRole="link"
        >
          <View style={styles.box27}>
            <SvgXml xml={art.art4} width={16} height={16} />
          </View>
          <View style={styles.box26}>
            <Text style={styles.text4}>{s.saved}</Text>
            <Text style={styles.text6}>{s.n2Signs}</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.box28}>
        <Text style={styles.heading}>{s.signGroups}</Text>
        <Text style={styles.text7}>{s.n237Signs}</Text>
      </View>
      <ScrollView style={styles.box29} showsVerticalScrollIndicator={false}>
        <View style={styles.box30}>
          <Pressable
            style={styles.link4}
            onPress={() => router.push("/sign-group")}
            accessibilityRole="link"
            accessibilityLabel="Warning signs, 32 of 42 learned"
          >
            <View style={styles.box31}>
              <View style={styles.box32}>
                <View style={styles.box33}>
                  <SvgXml xml={art.art5} />
                </View>
                <View style={styles.box34}>
                  <SvgXml xml={art.art6} />
                </View>
                <View style={styles.box35}>
                  <SvgXml xml={art.art7} />
                </View>
              </View>
              <Text style={styles.text8}>{s.n01}</Text>
            </View>
            <View style={styles.box36}>
              <View style={styles.box26}>
                <Text style={styles.text9}>{s.warning}</Text>
                <Text style={styles.text10}>{s.n32Of42Learned}</Text>
              </View>
              <View style={styles.box37}>
                <View style={styles.box38} />
              </View>
            </View>
          </Pressable>
          <Pressable
            style={styles.link4}
            onPress={() => router.push("/sign-group2")}
            accessibilityRole="link"
            accessibilityLabel="Priority signs, All learned"
          >
            <View style={styles.box31}>
              <View style={styles.box32}>
                <View style={styles.box33}>
                  <SvgXml xml={art.art8} />
                </View>
                <View style={styles.box34}>
                  <SvgXml xml={art.art9} />
                </View>
                <View style={styles.box35}>
                  <SvgXml xml={art.art10} />
                </View>
              </View>
              <View style={styles.box39}>
                <SvgXml xml={art.art11} width={12} height={12} />
              </View>
            </View>
            <View style={styles.box36}>
              <View style={styles.box26}>
                <Text style={styles.text9}>{s.priority}</Text>
                <Text style={styles.text10}>{s.allLearned}</Text>
              </View>
              <View style={styles.box37}>
                <View style={styles.box40} />
              </View>
            </View>
          </Pressable>
          <Pressable
            style={styles.link4}
            onPress={() => router.push("/sign-group3")}
            accessibilityRole="link"
            accessibilityLabel="Prohibitory signs, 20 of 36 learned"
          >
            <View style={styles.box31}>
              <View style={styles.box32}>
                <View style={styles.box33}>
                  <SvgXml xml={art.art12} />
                </View>
                <View style={styles.box34}>
                  <SvgXml xml={art.art13} />
                </View>
                <View style={styles.box35}>
                  <SvgXml xml={art.art14} />
                </View>
              </View>
              <Text style={styles.text8}>{s.n03}</Text>
            </View>
            <View style={styles.box36}>
              <View style={styles.box26}>
                <Text style={styles.text9}>{s.prohibitory}</Text>
                <Text style={styles.text10}>{s.n20Of36Learned}</Text>
              </View>
              <View style={styles.box37}>
                <View style={styles.box41} />
              </View>
            </View>
          </Pressable>
          <Pressable
            style={styles.link4}
            onPress={() => router.push("/sign-group4")}
            accessibilityRole="link"
            accessibilityLabel="Mandatory signs, 10 of 16 learned"
          >
            <View style={styles.box31}>
              <View style={styles.box32}>
                <View style={styles.box33}>
                  <SvgXml xml={art.art15} />
                </View>
                <View style={styles.box34}>
                  <SvgXml xml={art.art16} />
                </View>
                <View style={styles.box35}>
                  <SvgXml xml={art.art17} />
                </View>
              </View>
              <Text style={styles.text8}>{s.n04}</Text>
            </View>
            <View style={styles.box36}>
              <View style={styles.box26}>
                <Text style={styles.text9}>{s.mandatory}</Text>
                <Text style={styles.text10}>{s.n10Of16Learned}</Text>
              </View>
              <View style={styles.box37}>
                <View style={styles.box42} />
              </View>
            </View>
          </Pressable>
          <Pressable
            style={styles.link4}
            onPress={() => router.push("/sign-group5")}
            accessibilityRole="link"
            accessibilityLabel="Special regulation signs, 12 of 48 learned"
          >
            <View style={styles.box31}>
              <View style={styles.box32}>
                <View style={styles.box33}>
                  <SvgXml xml={art.art18} />
                </View>
                <View style={styles.box34}>
                  <SvgXml xml={art.art19} />
                </View>
                <View style={styles.box35}>
                  <SvgXml xml={art.art20} />
                </View>
              </View>
              <Text style={styles.text8}>{s.n05}</Text>
            </View>
            <View style={styles.box36}>
              <View style={styles.box26}>
                <Text style={styles.text9}>{s.specialRegulation}</Text>
                <Text style={styles.text10}>{s.n12Of48Learned}</Text>
              </View>
              <View style={styles.box37}>
                <View style={styles.box43} />
              </View>
            </View>
          </Pressable>
          <Pressable
            style={styles.link4}
            onPress={() => router.push("/sign-group6")}
            accessibilityRole="link"
            accessibilityLabel="Service signs, 4 of 17 learned"
          >
            <View style={styles.box31}>
              <View style={styles.box32}>
                <View style={styles.box33}>
                  <SvgXml xml={art.art21} />
                </View>
                <View style={styles.box34}>
                  <SvgXml xml={art.art22} />
                </View>
                <View style={styles.box35}>
                  <SvgXml xml={art.art23} />
                </View>
              </View>
              <Text style={styles.text8}>{s.n06}</Text>
            </View>
            <View style={styles.box36}>
              <View style={styles.box26}>
                <Text style={styles.text9}>{s.service}</Text>
                <Text style={styles.text10}>{s.n4Of17Learned}</Text>
              </View>
              <View style={styles.box37}>
                <View style={styles.box44} />
              </View>
            </View>
          </Pressable>
          <Pressable
            style={styles.link4}
            onPress={() => router.push("/sign-group7")}
            accessibilityRole="link"
            accessibilityLabel="Information signs, 8 of 27 learned"
          >
            <View style={styles.box31}>
              <View style={styles.box32}>
                <View style={styles.box33}>
                  <SvgXml xml={art.art24} />
                </View>
                <View style={styles.box34}>
                  <SvgXml xml={art.art25} />
                </View>
                <View style={styles.box35}>
                  <SvgXml xml={art.art26} />
                </View>
              </View>
              <Text style={styles.text8}>{s.n07}</Text>
            </View>
            <View style={styles.box36}>
              <View style={styles.box26}>
                <Text style={styles.text9}>{s.information}</Text>
                <Text style={styles.text10}>{s.n8Of27Learned}</Text>
              </View>
              <View style={styles.box37}>
                <View style={styles.box45} />
              </View>
            </View>
          </Pressable>
          <Pressable
            style={styles.link4}
            onPress={() => router.push("/sign-group8")}
            accessibilityRole="link"
            accessibilityLabel="Additional panels, 4 of 45 learned"
          >
            <View style={styles.box31}>
              <View style={styles.box32}>
                <View style={styles.box33}>
                  <SvgXml xml={art.art27} />
                </View>
                <View style={styles.box34}>
                  <SvgXml xml={art.art28} />
                </View>
                <View style={styles.box35}>
                  <SvgXml xml={art.art29} />
                </View>
              </View>
              <Text style={styles.text8}>{s.n08}</Text>
            </View>
            <View style={styles.box36}>
              <View style={styles.box26}>
                <Text style={styles.text9}>{s.additionalPanels}</Text>
                <Text style={styles.text10}>{s.n4Of45Learned}</Text>
              </View>
              <View style={styles.box37}>
                <View style={styles.box46} />
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.box47} />
      <Pressable
        style={styles.link5}
        onPress={() => router.push("/sign-quiz")}
        accessibilityRole="link"
      >
        <View style={styles.box26}>
          <Text style={styles.text11}>{s.signQuiz}</Text>
          <Text style={styles.text12}>{s.n10SignsARound}</Text>
        </View>
        <View style={styles.box48}>
          <SvgXml xml={art.art30} width={18} height={18} />
        </View>
      </Pressable>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  link: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 54,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 22,
  },
  box: {
    position: "absolute",
    left: 76,
    top: 58,
    margin: 0,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 26,
    letterSpacing: -0.8,
    lineHeight: 36,
  },
  section: {
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 148,
    overflow: "hidden",
    backgroundColor: "#0E1C91",
    borderRadius: 28,
    boxShadow: "0 18px 40px rgba(14,28,145,0.22)",
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box2: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  label2: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
  },
  box3: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 40,
    gap: 4,
    alignItems: "baseline",
  },
  text: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 44,
    letterSpacing: -2,
    lineHeight: 44,
  },
  text2: {
    fontFamily: font.spaceGrotesk[700],
    color: "rgba(255,255,255,0.5)",
    fontSize: 17,
  },
  box4: {
    flexDirection: "row",
    position: "absolute",
    top: 20,
    right: 20,
    height: 28,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
  },
  box5: {
    width: 6,
    height: 6,
    backgroundColor: "#FFB200",
    borderRadius: 3,
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 12,
  },
  box6: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 100,
    right: 20,
    gap: 4,
  },
  box7: {
    height: 6,
    minWidth: 6,
    flexGrow: 42,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 3,
  },
  box8: {
    width: "76%",
    height: 6,
    backgroundColor: "#FFB200",
  },
  box9: {
    height: 6,
    minWidth: 6,
    flexGrow: 6,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 3,
  },
  box10: {
    width: "100%",
    height: 6,
    backgroundColor: "#FFB200",
  },
  box11: {
    height: 6,
    minWidth: 6,
    flexGrow: 36,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 3,
  },
  box12: {
    width: "56%",
    height: 6,
    backgroundColor: "#FFB200",
  },
  box13: {
    height: 6,
    minWidth: 6,
    flexGrow: 16,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 3,
  },
  box14: {
    width: "62%",
    height: 6,
    backgroundColor: "#FFB200",
  },
  box15: {
    height: 6,
    minWidth: 6,
    flexGrow: 48,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 3,
  },
  box16: {
    width: "25%",
    height: 6,
    backgroundColor: "#FFB200",
  },
  box17: {
    height: 6,
    minWidth: 6,
    flexGrow: 17,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 3,
  },
  box18: {
    width: "24%",
    height: 6,
    backgroundColor: "#FFB200",
  },
  box19: {
    height: 6,
    minWidth: 6,
    flexGrow: 27,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 3,
  },
  box20: {
    width: "30%",
    height: 6,
    backgroundColor: "#FFB200",
  },
  box21: {
    height: 6,
    minWidth: 6,
    flexGrow: 45,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 3,
  },
  box22: {
    width: "9%",
    height: 6,
    backgroundColor: "#FFB200",
  },
  box23: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 114,
    right: 20,
    justifyContent: "space-between",
  },
  text3: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
  },
  box24: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 278,
    width: 350,
    gap: 8,
  },
  link2: {
    flexDirection: "row",
    position: "relative",
    height: 64,
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
    backgroundColor: "#FFF1F2",
    borderWidth: 1.5,
    borderColor: "#FFD5DA",
    borderRadius: 20,
    boxShadow: "0 10px 24px rgba(217,45,58,0.07)",
  },
  box25: {
    flexDirection: "row",
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#D92D3A",
    borderRadius: 12,
  },
  box26: {
    flexDirection: "column",
    gap: 4,
  },
  text4: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    letterSpacing: -0.2,
    lineHeight: 15.4,
    textDecorationLine: "none",
  },
  text5: {
    fontFamily: font.manrope[700],
    color: "#A3303B",
    fontSize: 11,
    lineHeight: 12.1,
    textDecorationLine: "none",
  },
  n12SignMistakesBox: {
    flexDirection: "row",
    position: "absolute",
    top: -9,
    right: -5,
    height: 26,
    minWidth: 30,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D92D3A",
    borderWidth: 2.5,
    borderColor: "#F6F7FD",
    borderRadius: 13,
    boxShadow: "0 6px 14px rgba(217,45,58,0.3)",
  },
  label4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 13,
    textDecorationLine: "none",
  },
  link3: {
    flexDirection: "row",
    position: "relative",
    height: 64,
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
    backgroundColor: "#FFF6DE",
    borderWidth: 1.5,
    borderColor: "#FFE2A0",
    borderRadius: 20,
    boxShadow: "0 10px 24px rgba(176,122,0,0.08)",
  },
  box27: {
    flexDirection: "row",
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFB200",
    borderRadius: 12,
  },
  text6: {
    fontFamily: font.manrope[700],
    color: "#8A5A00",
    fontSize: 11,
    lineHeight: 12.1,
    textDecorationLine: "none",
  },
  box28: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 362,
    right: 20,
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
  text7: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 12,
  },
  box29: {
    position: "absolute",
    left: 20,
    top: 394,
    width: 350,
    height: 350,
  },
  box30: {
    flexDirection: "row",
    paddingBottom: 16,
    gap: 8,
    flexWrap: "wrap",
  },
  link4: {
    flexDirection: "column",
    width: 171,
    height: 140,
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 8px 20px rgba(14,28,145,0.04)",
  },
  box31: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  box32: {
    flexDirection: "row",
    alignItems: "center",
  },
  box33: {
    flexDirection: "row",
    position: "relative",
    width: 44,
    height: 44,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F5FB",
    borderRadius: 22,
    boxShadow: "0 0 0 2px #FFFFFF",
  },
  box34: {
    flexDirection: "row",
    position: "relative",
    width: 44,
    height: 44,
    zIndex: 2,
    marginLeft: -10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F5FB",
    borderRadius: 22,
    boxShadow: "0 0 0 2px #FFFFFF",
  },
  box35: {
    flexDirection: "row",
    position: "relative",
    width: 44,
    height: 44,
    zIndex: 1,
    marginLeft: -10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F5FB",
    borderRadius: 22,
    boxShadow: "0 0 0 2px #FFFFFF",
  },
  text8: {
    fontFamily: font.spaceGrotesk[700],
    color: "#A3AACB",
    fontSize: 12,
    textDecorationLine: "none",
  },
  box36: {
    flexDirection: "column",
    gap: 8,
  },
  text9: {
    overflow: "hidden",
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.3,
    lineHeight: 18,
    textDecorationLine: "none",
  },
  text10: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 12,
    textDecorationLine: "none",
  },
  box37: {
    height: 4,
    backgroundColor: "#EEF0F8",
    borderRadius: 2,
  },
  box38: {
    width: "76%",
    height: 4,
    backgroundColor: "#0E1C91",
    borderRadius: 2,
  },
  box39: {
    flexDirection: "row",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 12,
  },
  box40: {
    width: "100%",
    height: 4,
    backgroundColor: "#FFB200",
    borderRadius: 2,
  },
  box41: {
    width: "56%",
    height: 4,
    backgroundColor: "#0E1C91",
    borderRadius: 2,
  },
  box42: {
    width: "62%",
    height: 4,
    backgroundColor: "#0E1C91",
    borderRadius: 2,
  },
  box43: {
    width: "25%",
    height: 4,
    backgroundColor: "#0E1C91",
    borderRadius: 2,
  },
  box44: {
    width: "24%",
    height: 4,
    backgroundColor: "#0E1C91",
    borderRadius: 2,
  },
  box45: {
    width: "30%",
    height: 4,
    backgroundColor: "#0E1C91",
    borderRadius: 2,
  },
  box46: {
    width: "9%",
    height: 4,
    backgroundColor: "#0E1C91",
    borderRadius: 2,
  },
  box47: {
    position: "absolute",
    left: 0,
    top: 722,
    right: 0,
    height: 22,
    backgroundImage: "linear-gradient(180deg, rgba(246,247,253,0), #F6F7FD)",
  },
  link5: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 24,
    height: 60,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 30,
    boxShadow: "0 14px 30px rgba(14,28,145,0.18)",
  },
  text11: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    letterSpacing: -0.3,
    lineHeight: 16,
    textDecorationLine: "none",
  },
  text12: {
    fontFamily: font.manrope[700],
    color: "#5A4300",
    fontSize: 12,
    lineHeight: 12,
    textDecorationLine: "none",
  },
  box48: {
    flexDirection: "row",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 24,
  },
});
