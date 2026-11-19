import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSignInGate } from "../hooks/useSignInGate";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/myCourseMember.art";
import { strings } from "../strings";

const s = strings.myCourseMember;

export function MyCourseMemberScreen() {
  const router = useRouter();
  const vm = useSignInGate();
  return (
    <ScreenFrame background="#F6F7FD">
      <SvgXml xml={art.art1} width={0} height={0} style={styles.artBox} />
      <View style={styles.header}>
        <Text style={styles.title}>{s.myCourse}</Text>
        <View style={styles.box}>
          <View style={styles.box2}>
            <SvgXml xml={art.art2} width={30} height={19} />
          </View>
          <Text style={styles.text}>{s.bB1}</Text>
        </View>
      </View>
      <ScrollView style={styles.box3} showsVerticalScrollIndicator={false}>
        <View style={styles.box4}>
          <View style={styles.section}>
            <SvgXml xml={art.art3} width={350} height={252} style={styles.artBox2} />
            <View style={styles.box5}>
              <View style={styles.box6} />
              <Text style={styles.label}>{s.videoCourse}</Text>
            </View>
            <View style={styles.box7}>
              <View style={styles.box8}>
                <Text style={styles.text3}>
                  {s.unlockTheWhole}
                  {"\n"}
                  <Text style={styles.text2}>{s.theoryOnVideo}</Text>
                </Text>
                <Text style={styles.text4}>{s.n36Videos9Modules}</Text>
              </View>
              <Pressable
                style={styles.link}
                onPress={() => router.push("/get-course")}
                accessibilityRole="link"
              >
                <Text style={styles.label2}>{s.getTheCourse}</Text>
                <View style={styles.box9}>
                  <SvgXml xml={art.art4} width={16} height={16} />
                </View>
              </Pressable>
            </View>
          </View>
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/lesson-free")}
            accessibilityRole="link"
            accessibilityLabel="Watch lesson 1 free"
          >
            <View style={styles.box10}>
              <SvgXml xml={art.art5} width={96} height={72} style={styles.artBox2} />
              <View style={styles.box11}>
                <SvgXml xml={art.art6} width={14} height={14} />
              </View>
            </View>
            <View style={styles.box12}>
              <View style={styles.box13}>
                <Text style={styles.label3}>{s.freeLesson}</Text>
              </View>
              <Text style={styles.text5}>{s.tryTheFirstLesson}</Text>
              <Text style={styles.text6}>{s.n1120DutiesOf}</Text>
            </View>
            <SvgXml xml={art.art7} width={16} height={16} style={styles.artBox3} />
          </Pressable>
          <View style={styles.section2}>
            <View style={styles.box14}>
              <Text style={styles.heading}>{s.whatsInside}</Text>
              <View style={styles.box15}>
                <SvgXml xml={art.art8} width={12} height={12} />
                <Text style={styles.label4}>{s.unlocksWithTheCourse}</Text>
              </View>
            </View>
            <View style={styles.box16}>
              <View style={styles.box17} />
              <View style={styles.box18}>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/get-course")}
                  accessibilityRole="link"
                  accessibilityLabel="Module 1: Convention & administrative law, 2 videos, 52 tickets"
                >
                  <View style={styles.box19}>
                    <Text style={styles.label5}>{s.n1}</Text>
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.conventionAdministrativeLaw}</Text>
                    <View style={styles.box21}>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art9} width={11} height={11} />
                        <Text style={styles.label6}>{s.n2Videos}</Text>
                      </View>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art10} width={12} height={12} />
                        <Text style={styles.label6}>{s.n52Tickets}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/get-course")}
                  accessibilityRole="link"
                  accessibilityLabel="Module 2: Complete road signs, 8 videos, 204 tickets"
                >
                  <View style={styles.box19}>
                    <Text style={styles.label5}>{s.n2}</Text>
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.completeRoadSigns}</Text>
                    <View style={styles.box21}>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art11} width={11} height={11} />
                        <Text style={styles.label6}>{s.n8Videos}</Text>
                      </View>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art12} width={12} height={12} />
                        <Text style={styles.label6}>{s.n204Tickets}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/get-course")}
                  accessibilityRole="link"
                  accessibilityLabel="Module 3: Traffic lights & intersections, 5 videos, 99 tickets"
                >
                  <View style={styles.box19}>
                    <Text style={styles.label5}>{s.n3}</Text>
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.trafficLightsIntersections}</Text>
                    <View style={styles.box21}>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art13} width={11} height={11} />
                        <Text style={styles.label6}>{s.n5Videos}</Text>
                      </View>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art14} width={12} height={12} />
                        <Text style={styles.label6}>{s.n99Tickets}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/get-course")}
                  accessibilityRole="link"
                  accessibilityLabel="Module 4: Controller & special signals, 3 videos, 57 tickets"
                >
                  <View style={styles.box19}>
                    <Text style={styles.label5}>{s.n4}</Text>
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.controllerSpecialSignals}</Text>
                    <View style={styles.box21}>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art15} width={11} height={11} />
                        <Text style={styles.label6}>{s.n3Videos}</Text>
                      </View>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art16} width={12} height={12} />
                        <Text style={styles.label6}>{s.n57Tickets}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/get-course")}
                  accessibilityRole="link"
                  accessibilityLabel="Module 5: Lights, hazards & malfunctions, 4 videos, 55 tickets"
                >
                  <View style={styles.box19}>
                    <Text style={styles.label5}>{s.n5}</Text>
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.lightsHazardsMalfunctions}</Text>
                    <View style={styles.box21}>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art17} width={11} height={11} />
                        <Text style={styles.label6}>{s.n4Videos}</Text>
                      </View>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art18} width={12} height={12} />
                        <Text style={styles.label6}>{s.n55Tickets}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/get-course")}
                  accessibilityRole="link"
                  accessibilityLabel="Module 6: Manoeuvres, overtaking & parking, 5 videos, 151 tickets"
                >
                  <View style={styles.box19}>
                    <Text style={styles.label5}>{s.n6}</Text>
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.manoeuvresOvertakingParking}</Text>
                    <View style={styles.box21}>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art19} width={11} height={11} />
                        <Text style={styles.label6}>{s.n5Videos}</Text>
                      </View>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art20} width={12} height={12} />
                        <Text style={styles.label6}>{s.n151Tickets}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/get-course")}
                  accessibilityRole="link"
                  accessibilityLabel="Module 7: Speed & special zones, 4 videos, 114 tickets"
                >
                  <View style={styles.box19}>
                    <Text style={styles.label5}>{s.n7}</Text>
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.speedSpecialZones}</Text>
                    <View style={styles.box21}>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art21} width={11} height={11} />
                        <Text style={styles.label6}>{s.n4Videos}</Text>
                      </View>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art22} width={12} height={12} />
                        <Text style={styles.label6}>{s.n114Tickets}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/get-course")}
                  accessibilityRole="link"
                  accessibilityLabel="Module 8: Safety, distance & eco-driving, 4 videos, 146 tickets"
                >
                  <View style={styles.box19}>
                    <Text style={styles.label5}>{s.n8}</Text>
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.safetyDistanceEcoDriving}</Text>
                    <View style={styles.box21}>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art23} width={11} height={11} />
                        <Text style={styles.label6}>{s.n4Videos}</Text>
                      </View>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art24} width={12} height={12} />
                        <Text style={styles.label6}>{s.n146Tickets}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/get-course")}
                  accessibilityRole="link"
                  accessibilityLabel="Module 9: First aid, 1 videos, 43 tickets"
                >
                  <View style={styles.box19}>
                    <Text style={styles.label5}>{s.n9}</Text>
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.firstAid}</Text>
                    <View style={styles.box21}>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art25} width={11} height={11} />
                        <Text style={styles.label6}>{s.n1Video}</Text>
                      </View>
                      <View style={styles.box22}>
                        <SvgXml xml={art.art26} width={12} height={12} />
                        <Text style={styles.label6}>{s.n43Tickets}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
                <View style={styles.box23}>
                  <View style={styles.box24}>
                    <SvgXml xml={art.art27} width={18} height={18} />
                  </View>
                  <View style={styles.box25}>
                    <Text style={styles.text8}>{s.readyForExam}</Text>
                    <Text style={styles.text9}>{s.all921TicketsCovered}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box26} />
      <View style={styles.nav}>
        <Pressable
          style={styles.link4}
          onPress={() => router.push("/home-member")}
          accessibilityRole="link"
          accessibilityLabel="Home"
        >
          <SvgXml xml={art.art28} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/my-course-member")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art29} width={20} height={20} />
          <Text style={styles.label7}>{s.myCourse}</Text>
        </Pressable>
        <Pressable
          style={styles.link4}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art30} width={22} height={22} />
        </Pressable>
      </View>
      {vm.gate ? (
        <>
          <View style={styles.box27}>
            <Pressable
              style={styles.button}
              onPress={vm.closeGate}
              accessibilityRole="button"
              accessibilityLabel="Close"
            />
            <View style={styles.signInToWatchBox}>
              <View style={styles.box28} />
              <View style={styles.box29}>
                <SvgXml xml={art.art31} width={64} height={64} />
              </View>
              <View style={styles.box8}>
                <Text style={styles.text11}>
                  {s.createA} <Text style={styles.text10}>{s.free}</Text> {s.account}
                </Text>
                <Text style={styles.text12}>{s.yourPhoneNumberAnd}</Text>
              </View>
              <Pressable
                style={styles.link6}
                onPress={() => router.push("/sign-in")}
                accessibilityRole="link"
              >
                <Text style={styles.text13}>{s.continueWithPhone}</Text>
                <View style={styles.box30}>
                  <SvgXml xml={art.art32} width={18} height={18} />
                </View>
              </Pressable>
              <Pressable style={styles.button2} onPress={vm.closeGate} accessibilityRole="button">
                <Text style={styles.label8}>{s.notNow}</Text>
              </Pressable>
            </View>
          </View>
        </>
      ) : null}
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
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 26,
    letterSpacing: -0.8,
    lineHeight: 26,
  },
  box: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    right: 0,
    height: 44,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 7,
    margin: 0,
    gap: 8,
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
  box2: {
    flexDirection: "row",
    width: 36,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
  },
  text: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 14,
  },
  box3: {
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 630,
  },
  box4: {
    flexDirection: "column",
    paddingBottom: 16,
    gap: 24,
  },
  section: {
    flexDirection: "column",
    position: "relative",
    height: 252,
    padding: 20,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundImage: "linear-gradient(135deg, #1A2CC4 0%, #0E1C91 55%, #091470 100%)",
    borderRadius: 28,
    boxShadow: "0 22px 32px -14px rgba(14,28,145,0.45)",
  },
  artBox2: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box5: {
    flexDirection: "row",
    position: "relative",
    height: 28,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 8,
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    borderRadius: 14,
  },
  box6: {
    width: 8,
    height: 8,
    backgroundColor: "#FFB200",
    borderRadius: 4,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 12,
  },
  box7: {
    flexDirection: "column",
    position: "relative",
    gap: 16,
  },
  box8: {
    flexDirection: "column",
    gap: 8,
  },
  text2: {
    color: "#FFB200",
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 24,
    letterSpacing: -0.8,
    lineHeight: 27.6,
  },
  text4: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.78)",
    fontSize: 13,
  },
  link: {
    flexDirection: "row",
    height: 52,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 20,
    gap: 12,
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFB200",
    borderRadius: 26,
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    textDecorationLine: "none",
  },
  box9: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 20,
  },
  link2: {
    flexDirection: "row",
    position: "relative",
    padding: 12,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box10: {
    position: "relative",
    width: 96,
    height: 72,
    flexShrink: 0,
    overflow: "hidden",
    backgroundImage: "linear-gradient(180deg, #1A2CC4 0%, #0E1C91 60%, #060B4A 100%)",
    borderRadius: 16,
  },
  box11: {
    flexDirection: "row",
    position: "absolute",
    left: 30,
    top: 18,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 18,
    boxShadow: "0 0 0 5px rgba(255,255,255,0.14)",
  },
  box12: {
    flexDirection: "column",
    minWidth: 0,
    gap: 6,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  box13: {
    flexDirection: "row",
    height: 22,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 8,
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFF3D6",
    borderRadius: 11,
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#8A5A00",
    fontSize: 10,
    letterSpacing: 0.6,
    textDecorationLine: "none",
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "inherit",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 18,
    textDecorationLine: "none",
  },
  text6: {
    overflow: "hidden",
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 14.4,
    textDecorationLine: "none",
  },
  artBox3: {
    flexShrink: 0,
  },
  section2: {
    flexDirection: "column",
    gap: 12,
  },
  box14: {
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
  box15: {
    flexDirection: "row",
    height: 28,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 6,
    alignItems: "center",
    backgroundColor: "#EEF1FF",
    borderRadius: 14,
  },
  label4: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 12,
  },
  box16: {
    position: "relative",
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 20,
    paddingLeft: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 28,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box17: {
    position: "absolute",
    left: 35,
    top: 40,
    bottom: 40,
    width: 0,
    borderLeftWidth: 2,
    borderLeftColor: "#C9D1F6",
  },
  box18: {
    flexDirection: "column",
    position: "relative",
    gap: 20,
  },
  link3: {
    flexDirection: "row",
    position: "relative",
    gap: 16,
  },
  box19: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#DDE2F5",
    borderRadius: 20,
  },
  label5: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 14,
    textDecorationLine: "none",
  },
  box20: {
    flexDirection: "column",
    minWidth: 0,
    paddingTop: 2,
    gap: 8,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text7: {
    fontFamily: font.manrope[800],
    color: "inherit",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 18.75,
    textDecorationLine: "none",
  },
  box21: {
    flexDirection: "row",
    gap: 6,
  },
  box22: {
    flexDirection: "row",
    height: 22,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 8,
    gap: 4,
    alignItems: "center",
    backgroundColor: "#F3F5FC",
    borderRadius: 11,
  },
  label6: {
    fontFamily: font.manrope[800],
    color: "#6B7396",
    fontSize: 11,
    textDecorationLine: "none",
  },
  box23: {
    flexDirection: "row",
    position: "relative",
    gap: 16,
    alignItems: "center",
  },
  box24: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFB200",
    borderRadius: 20,
    boxShadow: "0 0 0 6px rgba(255,178,0,0.18)",
  },
  box25: {
    flexDirection: "column",
    gap: 4,
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  text9: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    lineHeight: 12,
  },
  box26: {
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
  link4: {
    flexDirection: "row",
    width: 86,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  link5: {
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
  label7: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    textDecorationLine: "none",
  },
  box27: {
    position: "absolute",
    zIndex: 20,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    backgroundColor: "rgba(10,14,46,0.45)",
  },
  signInToWatchBox: {
    flexDirection: "column",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 32,
    paddingLeft: 20,
    gap: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  box28: {
    width: 40,
    height: 5,
    backgroundColor: "#E2E6F6",
    borderRadius: 3,
  },
  box29: {
    flexDirection: "row",
    width: 88,
    height: 88,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(145deg, #F4F6FF 0%, #E3E8FF 100%)",
    borderRadius: 28,
  },
  text10: {
    color: "#0E1C91",
  },
  text11: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 22,
    letterSpacing: -0.6,
    lineHeight: 26.4,
    textAlign: "center",
  },
  text12: {
    fontFamily: font.manrope[600],
    color: "#566086",
    fontSize: 14,
    lineHeight: 20.3,
    textAlign: "center",
  },
  link6: {
    flexDirection: "row",
    width: "100%",
    height: 56,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundImage: "radial-gradient(120% 140% at 0% 0%, #2638DA 0%, #0E1C91 60%, #08106A 100%)",
    borderRadius: 28,
    boxShadow: "0 14px 24px -14px rgba(14,28,145,0.6)",
  },
  text13: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "none",
  },
  box30: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 20,
  },
  button2: {
    height: 40,
  },
  label8: {
    fontFamily: font.manrope[800],
    color: "#566086",
    fontSize: 14,
    textAlign: "center",
  },
});
