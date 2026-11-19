import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useSignGroupViewModel } from "../hooks/useSignGroupViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/signGroup.art";
import { strings } from "../strings";

const s = strings.signGroup;

// Sign cards sit in two columns of the 350px list with an 8px gap.
const CARD_WIDTH = (350 - 8) / 2;

export function SignGroupScreen({ groupId }: { groupId: number }) {
  const router = useRouter();
  const vm = useSignGroupViewModel(groupId);
  return (
    <ScreenFrame background="#F6F7FD">
      <Pressable
        style={styles.link}
        onPress={() => router.push("/road-signs-v3")}
        accessibilityRole="link"
        accessibilityLabel="Back to sign groups"
      >
        <SvgXml xml={art.art1} width={20} height={20} />
      </Pressable>
      <View style={styles.box}>
        <Text style={styles.text}>{s.roadSignsGroup2}</Text>
        <Text style={styles.title}>{vm.title}</Text>
      </View>
      <View style={styles.learnednOfTotalnLearnedBox}>
        <SvgXml xml={art.learnedRingArt(vm.learnedFraction)} width={28} height={28} />
        <View style={styles.box2}>
          <Text style={styles.text2}>{vm.learnedN}</Text>
          <Text style={styles.text3}>{`/${vm.totalN}`}</Text>
        </View>
      </View>
      <View style={styles.filterSignsBox}>
        {vm.tabs.map((t) => (
          <Fragment key={t.key}>
            <Pressable
              style={[styles.button, { backgroundColor: t.bg, boxShadow: t.shadow }]}
              onPress={t.pick}
              accessibilityRole="button"
            >
              <Text style={[styles.text4, { color: t.fg }]}>{t.label}</Text>
              <Text style={[styles.text5, { color: t.numFg }]}>{t.n}</Text>
            </Pressable>
          </Fragment>
        ))}
      </View>
      <ScrollView style={styles.box3} showsVerticalScrollIndicator={false}>
        <View style={styles.box4}>
          {vm.grid.map((entry) => (
            <Fragment key={entry.key}>
              <Pressable
                style={styles.button2}
                onPress={entry.open}
                accessibilityRole="button"
                accessibilityLabel={entry.aria}
              >
                <View style={styles.box5}>
                  <SvgXml xml={entry.svg} width="100%" height={76} />
                  <View style={[styles.box6, { display: entry.done ? "flex" : "none" }]}>
                    <SvgXml xml={art.art3} width={12} height={12} />
                  </View>
                </View>
                <View style={styles.box7}>
                  <Text style={styles.text6}>{entry.code}</Text>
                  <View style={styles.box8}>
                    <Text style={styles.label}>{entry.name}</Text>
                  </View>
                </View>
              </Pressable>
            </Fragment>
          ))}
        </View>
        {vm.emptyShow ? (
          <>
            <View style={styles.box9}>
              <Text style={styles.text7}>{vm.emptyTitle}</Text>
              <Text style={styles.text8}>{vm.emptySub}</Text>
            </View>
          </>
        ) : null}
      </ScrollView>
      <View style={styles.box10} />
      <Pressable
        style={styles.link2}
        onPress={() => router.push("/sign-quiz2")}
        accessibilityRole="link"
      >
        <View style={styles.box11}>
          <Text style={styles.text9}>{s.quizThisGroup}</Text>
          <Text style={styles.text10}>{vm.ctaSub}</Text>
        </View>
        <View style={styles.box12}>
          <SvgXml xml={art.art4} width={18} height={18} />
        </View>
      </Pressable>
      {vm.detail ? (
        <>
          <View style={styles.section}>
            <Pressable
              style={styles.button3}
              onPress={vm.detail.close}
              accessibilityRole="button"
              accessibilityLabel="Back to the list"
            >
              <SvgXml xml={art.art5} width={20} height={20} />
            </Pressable>
            <View style={styles.box13}>
              <Text style={styles.label2}>{vm.title}</Text>
            </View>
            <View style={styles.box14}>
              <View style={styles.box15}>
                <Text style={styles.text2}>{vm.detail.position}</Text>
                <Text style={styles.text3}>{`/${vm.detail.count}`}</Text>
              </View>
            </View>
            <View style={styles.box16}>
              <SvgXml
                xml={vm.detail.svg}
                width="100%"
                height={200}
                style={styles.image2}
                accessibilityLabel={`Road sign ${vm.detail.code}, ${vm.detail.name}`}
              />
              <Pressable
                style={[
                  styles.button4,
                  { ...vm.detail.saveBorder, backgroundColor: vm.detail.saveBg },
                ]}
                onPress={vm.detail.toggleSave}
                accessibilityRole="button"
                accessibilityLabel={vm.detail.saveLabel}
              >
                <SvgXml xml={art.saveArt(vm.detail.saved)} width={15} height={15} />
                <Text style={[styles.text4, { color: "#0A0E2E" }]}>{vm.detail.saveLabel}</Text>
              </Pressable>
            </View>
            <ScrollView style={styles.box17} showsVerticalScrollIndicator={false}>
              <View style={styles.box18}>
                <View style={styles.box19}>
                  <View style={styles.box20}>
                    <View style={styles.box21}>
                      <Text style={styles.label3}>{vm.detail.code}</Text>
                    </View>
                    <View style={[styles.box22, { display: vm.detail.done ? "flex" : "none" }]}>
                      <View style={styles.box23}>
                        <SvgXml xml={art.art7} width={12} height={12} />
                      </View>
                      <Text style={styles.label4}>{s.learned}</Text>
                    </View>
                  </View>
                  <Text style={styles.heading}>{vm.detail.name}</Text>
                </View>
                <View style={styles.box24}>
                  <View style={styles.box20}>
                    <View style={styles.box25} />
                    <Text style={styles.label5}>{s.whatItMeans}</Text>
                  </View>
                  <Text style={styles.paragraph}>{vm.detail.description}</Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.box10} />
            <Pressable
              style={[styles.button5, { opacity: vm.detail.prevOp }]}
              onPress={vm.detail.prev}
              accessibilityRole="button"
              accessibilityLabel="Previous sign"
            >
              <SvgXml xml={art.art8} width={20} height={20} />
            </Pressable>
            <Pressable
              style={[
                styles.button6,
                {
                  ...vm.detail.learnedBorder,
                  backgroundColor: vm.detail.learnedBg,
                  boxShadow: vm.detail.learnedShadow,
                },
              ]}
              onPress={vm.detail.toggleLearned}
              accessibilityRole="button"
            >
              <View
                style={[
                  styles.box26,
                  { backgroundColor: vm.detail.dotBg, boxShadow: vm.detail.dotRing },
                ]}
              >
                <SvgXml xml={art.learnedDotArt()} width={12} height={12} />
              </View>
              <Text style={styles.label2}>{vm.detail.learnedLabel}</Text>
            </Pressable>
            <Pressable
              style={[styles.button7, { opacity: vm.detail.nextOp }]}
              onPress={vm.detail.next}
              accessibilityRole="button"
              accessibilityLabel="Next sign"
            >
              <SvgXml xml={art.art10} width={20} height={20} />
            </Pressable>
          </View>
        </>
      ) : null}
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
    flexDirection: "column",
    position: "absolute",
    left: 76,
    top: 54,
    right: 128,
    height: 44,
    minWidth: 0,
    gap: 4,
    justifyContent: "center",
  },
  text: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 12,
    lineHeight: 16,
  },
  title: {
    margin: 0,
    overflow: "hidden",
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 20,
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  learnednOfTotalnLearnedBox: {
    flexDirection: "row",
    position: "absolute",
    top: 54,
    right: 20,
    height: 44,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 8,
    gap: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 22,
  },
  box2: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  text2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 16,
    lineHeight: 16,
  },
  text3: {
    fontFamily: font.spaceGrotesk[700],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 12,
  },
  filterSignsBox: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 44,
    padding: 4,
    gap: 4,
    flexWrap: "wrap",
    backgroundColor: "#EAEDF8",
    borderRadius: 22,
  },
  button: {
    flexDirection: "row",
    flex: 1,
    height: 36,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  text4: {
    fontFamily: font.manrope[800],
    fontSize: 13,
  },
  text5: {
    fontFamily: font.spaceGrotesk[700],
    fontSize: 12,
  },
  box3: {
    position: "absolute",
    left: 20,
    top: 174,
    width: 350,
    height: 570,
  },
  box4: {
    flexDirection: "row",
    paddingBottom: 16,
    gap: 8,
    flexWrap: "wrap",
  },
  button2: {
    flexDirection: "column",
    width: CARD_WIDTH,
    height: 210,
    padding: 16,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 8px 20px rgba(14,28,145,0.04)",
  },
  box5: {
    flexDirection: "row",
    position: "relative",
    width: "100%",
    height: 92,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#F6F7FD",
    borderRadius: 14,
  },
  image: {
    maxWidth: "100%",
    maxHeight: 76,
  },
  box6: {
    flexDirection: "row",
    position: "absolute",
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 11,
    boxShadow: "0 0 0 2px #FFFFFF",
  },
  box7: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
  },
  text6: {
    fontFamily: font.spaceGrotesk[700],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "left",
  },
  box8: {
    height: 54,
    overflow: "hidden",
  },
  label: {
    fontFamily: font.manrope[700],
    color: "inherit",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "left",
  },
  box9: {
    flexDirection: "column",
    height: 210,
    padding: 24,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D5DAEE",
    borderRadius: 20,
  },
  text7: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    textAlign: "center",
  },
  text8: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 13,
    textAlign: "center",
  },
  box10: {
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
  box11: {
    flexDirection: "column",
    gap: 4,
  },
  text9: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    letterSpacing: -0.3,
    lineHeight: 16,
    textDecorationLine: "none",
  },
  text10: {
    fontFamily: font.manrope[700],
    color: "#5A4300",
    fontSize: 12,
    lineHeight: 12,
    textDecorationLine: "none",
  },
  box12: {
    flexDirection: "row",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 24,
  },
  section: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#F6F7FD",
  },
  button3: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 54,
    width: 44,
    height: 44,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 22,
  },
  box13: {
    flexDirection: "row",
    position: "absolute",
    left: 76,
    top: 54,
    right: 76,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
  },
  box14: {
    flexDirection: "row",
    position: "absolute",
    top: 54,
    right: 20,
    height: 44,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 22,
  },
  box15: {
    flexDirection: "row",
    gap: 2,
    alignItems: "baseline",
  },
  box16: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 248,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "radial-gradient(120% 90% at 50% 40%, #FFFFFF 0%, #FFFFFF 55%, #EEF1FB 100%)",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 28,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px rgba(14,28,145,0.06)",
  },
  image2: {
    filter: "drop-shadow(0 6px 10px rgba(10,14,46,0.12))",
  },
  button4: {
    flexDirection: "row",
    position: "absolute",
    top: 12,
    right: 12,
    height: 36,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 6,
    alignItems: "center",
    borderRadius: 18,
    boxShadow: "0 6px 14px rgba(14,28,145,0.08)",
  },
  box17: {
    position: "absolute",
    left: 20,
    top: 386,
    width: 350,
    height: 358,
  },
  box18: {
    flexDirection: "column",
    paddingBottom: 16,
    gap: 16,
  },
  box19: {
    flexDirection: "column",
    gap: 12,
  },
  box20: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  box21: {
    flexDirection: "row",
    height: 28,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    alignItems: "center",
    backgroundColor: "#E6E9FB",
    borderRadius: 14,
  },
  label3: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 14,
  },
  box22: {
    flexDirection: "row",
    height: 28,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 4,
    gap: 8,
    alignItems: "center",
    backgroundColor: "#FFF4D6",
    borderRadius: 14,
  },
  box23: {
    flexDirection: "row",
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 10,
  },
  label4: {
    fontFamily: font.manrope[800],
    color: "#8A5B00",
    fontSize: 12,
  },
  heading: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 22,
    letterSpacing: -0.2,
    lineHeight: 28.6,
  },
  box24: {
    flexDirection: "column",
    padding: 16,
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
  },
  box25: {
    width: 6,
    height: 6,
    backgroundColor: "#E5484D",
    borderRadius: 3,
  },
  label5: {
    fontFamily: font.manrope[800],
    color: "#566086",
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  paragraph: {
    margin: 0,
    fontFamily: font.manrope[500],
    color: "#2A3158",
    fontSize: 15,
    lineHeight: 24.75,
  },
  button5: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 60,
    height: 60,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E6F6",
    borderRadius: 30,
  },
  button6: {
    flexDirection: "row",
    position: "absolute",
    left: 88,
    right: 88,
    bottom: 24,
    height: 60,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  box26: {
    flexDirection: "row",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 12,
  },
  button7: {
    flexDirection: "row",
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 60,
    height: 60,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 30,
  },
});
