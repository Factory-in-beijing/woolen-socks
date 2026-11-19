import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/roadSignsV3.art";
import { strings } from "../strings";
import { styles } from "./RoadSignsV3Screen.styles";

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
                <Text numberOfLines={1} style={styles.text9}>
                  {s.warning}
                </Text>
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
                <Text numberOfLines={1} style={styles.text9}>
                  {s.priority}
                </Text>
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
                <Text numberOfLines={1} style={styles.text9}>
                  {s.prohibitory}
                </Text>
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
                <Text numberOfLines={1} style={styles.text9}>
                  {s.mandatory}
                </Text>
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
                <Text numberOfLines={1} style={styles.text9}>
                  {s.specialRegulation}
                </Text>
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
                <Text numberOfLines={1} style={styles.text9}>
                  {s.service}
                </Text>
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
                <Text numberOfLines={1} style={styles.text9}>
                  {s.information}
                </Text>
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
                <Text numberOfLines={1} style={styles.text9}>
                  {s.additionalPanels}
                </Text>
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
