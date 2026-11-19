import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSignInGate } from "../hooks/useSignInGate";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/myCourseMember.art";
import { strings } from "../strings";
import { styles } from "./MyCourseMemberScreen.styles";

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
              <Text numberOfLines={1} style={styles.text6}>
                {s.n1120DutiesOf}
              </Text>
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
