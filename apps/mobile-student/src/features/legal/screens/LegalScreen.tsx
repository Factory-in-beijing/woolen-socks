import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useLegalViewModel } from "../hooks/useLegalViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/legal.art";
import { strings } from "../strings";

const s = strings.legal;

type LegalScreenProps = {
  /** Where the back button leads (sign-in flow or Account). */
  backRoute: string;
  backLabel: string;
};

export function LegalScreen({ backRoute, backLabel }: LegalScreenProps) {
  const router = useRouter();
  const vm = useLegalViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push(backRoute)}
          accessibilityRole="link"
          accessibilityLabel={backLabel}
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.termsAndPrivacy}</Text>
        <View style={styles.box} />
      </View>
      <ScrollView style={styles.box2} showsVerticalScrollIndicator={false}>
        <View style={styles.box3}>
          <View
            style={[
              styles.section,
              { backgroundImage: vm.hero.backgroundImage, boxShadow: vm.hero.boxShadow },
            ]}
          >
            <SvgXml
              xml={art.heroArt(vm.hero.blob)}
              width={350}
              height={110}
              style={styles.artBox}
            />
            <View style={styles.box4}>
              <SvgXml xml={art.art3} width={34} height={34} />
            </View>
            <View style={styles.box5}>
              <Text style={[styles.text2, { color: vm.hero.foreground }]}>{vm.hero.title}</Text>
              <Text style={[styles.text3, { color: vm.hero.foreground }]}>
                {s.plainWordsUpdatedDate}
              </Text>
            </View>
          </View>
          <View style={styles.box6}>
            <View style={[styles.box7, { left: vm.pillLeft }]} />
            <Pressable style={styles.button} onPress={vm.showTerms} accessibilityRole="button">
              <SvgXml xml={art.art4} width={16} height={16} />
              <Text style={[styles.label, { color: vm.termsColor }]}>{s.termsOfUse}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={vm.showPrivacy} accessibilityRole="button">
              <SvgXml xml={art.art5} width={16} height={16} />
              <Text style={[styles.label2, { color: vm.privacyColor }]}>{s.privacy}</Text>
            </Pressable>
          </View>
          {vm.tab === "terms" ? (
            <>
              <View style={styles.box8}>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art6} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.whatYouBuy}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n01}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.accessToTheDrivenet}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art7} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.priceAndPayment}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n02}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.n79PaidOnceBy}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art8} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.refunds}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n03}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.changedYourMindWithin}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art9} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.yourAccount}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n04}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.oneAccountPerPhone}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art10} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.courseContent}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n05}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.lessonsAndMaterialsBelong}</Text>
                </View>
              </View>
            </>
          ) : null}
          {vm.tab === "privacy" ? (
            <>
              <View style={styles.box8}>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art11} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.whatWeCollect}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n01}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.yourNamePhoneNumber}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art12} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.payments}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n02}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.cardPaymentsAreProcessed}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art13} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.whyWeUseIt}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n03}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.toSignYouIn}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art14} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.whoSeesIt}</Text>
                    </View>
                    <View style={styles.box12}>
                      <Text style={styles.label4}>{s.toFillIn}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n04}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.onlyDrivenetAndThe}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art15} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.yourChoices}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n05}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.changeOrDeleteYour}</Text>
                </View>
              </View>
            </>
          ) : null}
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/help")}
            accessibilityRole="link"
          >
            <View style={styles.box10}>
              <SvgXml xml={art.art16} width={32} height={32} />
            </View>
            <View style={styles.box13}>
              <Text style={styles.text5}>{s.somethingUnclear}</Text>
              <Text style={styles.text6}>{s.askUsWeAnswer}</Text>
            </View>
            <View style={styles.box14}>
              <SvgXml xml={art.art17} width={16} height={16} />
            </View>
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
    height: 730,
  },
  box3: {
    flexDirection: "column",
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 40,
    paddingLeft: 20,
    gap: 16,
  },
  section: {
    flexDirection: "row",
    position: "relative",
    padding: 20,
    gap: 16,
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 28,
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box4: {
    flexDirection: "row",
    position: "relative",
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 18,
  },
  box5: {
    flexDirection: "column",
    position: "relative",
    gap: 6,
  },
  text2: {
    fontFamily: font.manrope[800],
    fontSize: 20,
    letterSpacing: -0.6,
    lineHeight: 23,
  },
  text3: {
    opacity: 0.75,
    fontFamily: font.manrope[700],
    fontSize: 12,
    lineHeight: 15.6,
  },
  box6: {
    flexDirection: "row",
    position: "relative",
    height: 52,
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 26,
  },
  box7: {
    position: "absolute",
    top: 4,
    width: 170,
    height: 42,
    backgroundColor: "#0A0E2E",
    borderRadius: 21,
  },
  button: {
    flexDirection: "row",
    position: "relative",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  label: {
    fontFamily: font.manrope[800],
    fontSize: 14,
  },
  label2: {
    fontFamily: font.manrope[800],
    fontSize: 14,
  },
  box8: {
    flexDirection: "column",
    gap: 12,
  },
  section2: {
    flexDirection: "column",
    padding: 16,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box9: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  box10: {
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
  box11: {
    minWidth: 0,
    margin: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    letterSpacing: -0.3,
    lineHeight: 20,
  },
  text4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#B4BBD8",
    fontSize: 13,
  },
  paragraph: {
    margin: 0,
    fontFamily: font.manrope[600],
    color: "#3A4270",
    fontSize: 14,
    lineHeight: 21.7,
  },
  box12: {
    flexDirection: "row",
    height: 22,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 8,
    alignItems: "center",
    backgroundColor: "#FFF6DE",
    borderRadius: 11,
  },
  label4: {
    fontFamily: font.manrope[800],
    color: "#8A5A00",
    fontSize: 11,
  },
  link2: {
    flexDirection: "row",
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
  },
  box13: {
    flexDirection: "column",
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    textDecorationLine: "none",
  },
  text6: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    textDecorationLine: "none",
  },
  box14: {
    flexDirection: "row",
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 18,
  },
});
