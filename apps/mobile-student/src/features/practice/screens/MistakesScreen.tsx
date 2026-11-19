import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useMistakesViewModel } from "../hooks/useMistakesViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/mistakes.art";
import { strings } from "../strings";

const s = strings.mistakes;

export function MistakesScreen() {
  const router = useRouter();
  const vm = useMistakesViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/tickets")}
          accessibilityRole="link"
          accessibilityLabel="Back"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <View style={styles.box}>
          <Text style={styles.label}>{s.mistakes}</Text>
          <View style={styles.box2}>
            <Text style={styles.label2}>{s.n60}</Text>
          </View>
        </View>
        <View style={styles.box3} />
      </View>
      <View style={styles.showBox}>
        <Pressable
          style={[styles.button, { backgroundColor: vm.allBg, boxShadow: vm.allShadow }]}
          onPress={vm.allPick}
          accessibilityRole="button"
        >
          <SvgXml xml={art.art2} width={16} height={16} />
          <Text style={[styles.label3, { color: vm.allFg }]}>{s.all}</Text>
          <Text style={[styles.text, { color: vm.allFg }]}>{vm.allN}</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: vm.tBg, boxShadow: vm.tShadow }]}
          onPress={vm.tPick}
          accessibilityRole="button"
        >
          <SvgXml xml={art.art3} width={16} height={16} />
          <Text style={[styles.label3, { color: vm.tFg }]}>{s.tickets}</Text>
          <Text style={[styles.text, { color: vm.tFg }]}>{vm.tN}</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: vm.sBg, boxShadow: vm.sShadow }]}
          onPress={vm.sPick}
          accessibilityRole="button"
        >
          <SvgXml xml={art.art4} width={16} height={16} />
          <Text style={[styles.label3, { color: vm.sFg }]}>{s.signs}</Text>
          <Text style={[styles.text, { color: vm.sFg }]}>{vm.sN}</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.box4} showsVerticalScrollIndicator={false}>
        <View style={styles.box5}>
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/quick-test-run")}
            accessibilityRole="link"
          >
            <SvgXml xml={art.art5} width={350} height={120} style={styles.artBox} />
            <View style={styles.box6}>
              <Text style={styles.text2}>{s.practiseYourMistakes}</Text>
              <Text style={styles.text3}>{vm.heroTitle}</Text>
              <Text style={styles.text4}>{s.getOneRightTwice}</Text>
            </View>
            <View style={styles.box7}>
              <SvgXml xml={art.art6} width={22} height={22} />
            </View>
          </Pressable>
          {vm.showChips ? (
            <>
              <ScrollView
                style={styles.box8}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.boxContent}
              >
                {vm.chips.map((c, index) => (
                  <Fragment key={index}>
                    <Pressable
                      style={[styles.button2, { ...c.border, backgroundColor: c.bg }]}
                      onPress={c.pick}
                      accessibilityRole="button"
                    >
                      <Text style={[styles.label4, { color: c.fg }]}>{c.label}</Text>
                      <Text style={[styles.text5, { color: c.fg }]}>{c.count}</Text>
                    </Pressable>
                  </Fragment>
                ))}
              </ScrollView>
            </>
          ) : null}
          <View style={styles.box9}>
            {vm.rows.map((it) => (
              <Fragment key={it.key}>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push(it.route)}
                  accessibilityRole="link"
                >
                  <View style={styles.box10}>
                    {it.kind === "sign" ? (
                      <>
                        <SvgXml xml={art.art7} width={56} height={56} />
                      </>
                    ) : null}
                    {it.kind === "road" ? (
                      <>
                        <SvgXml xml={art.art8} width={56} height={56} />
                      </>
                    ) : null}
                    {it.kind === "speed" ? (
                      <>
                        <SvgXml xml={art.art9} width={56} height={56} />
                      </>
                    ) : null}
                    {it.kind === "light" ? (
                      <>
                        <SvgXml xml={art.art10} width={56} height={56} />
                      </>
                    ) : null}
                    {it.kind === "img" ? (
                      <>
                        <View style={styles.box11}>
                          <SvgXml xml={it.svg} width="100%" height="100%" />
                        </View>
                      </>
                    ) : null}
                  </View>
                  <View style={styles.box12}>
                    <View style={styles.box}>
                      <View style={[styles.box13, { backgroundColor: it.tagBg }]}>
                        <Text style={[styles.label5, { color: it.tagFg }]}>{it.tag}</Text>
                      </View>
                      <Text style={styles.text6}>{it.head}</Text>
                      <Text style={styles.text7}>{it.topic}</Text>
                    </View>
                    <View style={styles.box14}>
                      <Text style={styles.label6}>{it.question}</Text>
                    </View>
                  </View>
                  <View style={styles.box15}>
                    {vm.showWrong ? (
                      <>
                        <View style={styles.box16}>
                          <Text style={styles.label7}>{`${it.wrong}× wrong`}</Text>
                        </View>
                      </>
                    ) : null}
                    {vm.showSaved ? (
                      <>
                        <SvgXml xml={art.art11} width={18} height={18} />
                      </>
                    ) : null}
                    <SvgXml xml={art.art12} width={16} height={16} />
                  </View>
                  <View style={[styles.box17, { backgroundColor: it.lineColor }]} />
                </Pressable>
              </Fragment>
            ))}
            {vm.noRows ? (
              <>
                <View style={styles.box18}>
                  <SvgXml xml={art.art13} width={40} height={40} />
                  <Text style={styles.text8}>{s.nothingHere}</Text>
                  <Text style={styles.text9}>{s.nothingInThisGroup}</Text>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View style={styles.box19} />
      <View style={styles.nav}>
        <Pressable
          style={styles.link4}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art14} width={20} height={20} />
          <Text style={styles.label8}>{s.home}</Text>
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
          accessibilityLabel="My course"
        >
          <SvgXml xml={art.art15} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art16} width={22} height={22} />
        </Pressable>
      </View>
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
  box: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 17,
    letterSpacing: -0.3,
  },
  box2: {
    flexDirection: "row",
    height: 24,
    minWidth: 24,
    paddingTop: 0,
    paddingRight: 7,
    paddingBottom: 0,
    paddingLeft: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D92D3A",
    borderRadius: 12,
  },
  label2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 12,
    letterSpacing: -0.3,
  },
  box3: {
    width: 44,
    height: 44,
  },
  showBox: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 48,
    padding: 4,
    gap: 4,
    backgroundColor: "#E8EBF7",
    borderRadius: 24,
  },
  button: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderRadius: 20,
  },
  label3: {
    fontFamily: font.manrope[800],
    fontSize: 14,
  },
  text: {
    opacity: 0.55,
    fontFamily: font.spaceGrotesk[700],
    fontSize: 12,
  },
  box4: {
    position: "absolute",
    left: 0,
    top: 178,
    width: 390,
    height: 566,
  },
  box5: {
    flexDirection: "column",
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    gap: 20,
  },
  link2: {
    flexDirection: "row",
    position: "relative",
    height: 120,
    padding: 20,
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
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
  box6: {
    flexDirection: "column",
    position: "relative",
    minWidth: 0,
    flexShrink: 1,
    gap: 8,
  },
  text2: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    lineHeight: 12,
    textDecorationLine: "none",
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 22,
    letterSpacing: -0.7,
    lineHeight: 24.2,
    textDecorationLine: "none",
  },
  text4: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    lineHeight: 15.6,
    textDecorationLine: "none",
  },
  box7: {
    flexDirection: "row",
    position: "relative",
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFB200",
    borderRadius: 28,
    boxShadow: "0 0 0 6px rgba(255,255,255,0.12)",
  },
  boxContent: {
    flexDirection: "row",
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 20,
    gap: 8,
  },
  box8: {
    marginTop: 0,
    marginRight: -20,
    marginBottom: 0,
    marginLeft: -20,
  },
  button2: {
    flexDirection: "row",
    height: 36,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 14,
    gap: 6,
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 18,
  },
  label4: {
    fontFamily: font.manrope[800],
    fontSize: 13,
  },
  text5: {
    opacity: 0.6,
    fontFamily: font.spaceGrotesk[700],
    fontSize: 12,
  },
  box9: {
    flexDirection: "column",
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 24,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  link3: {
    flexDirection: "row",
    position: "relative",
    minHeight: 84,
    padding: 12,
    gap: 12,
    alignItems: "center",
  },
  box10: {
    width: 56,
    height: 56,
    flexShrink: 0,
  },
  box11: {
    flexDirection: "row",
    width: 56,
    height: 56,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 16,
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
    height: 20,
    paddingTop: 0,
    paddingRight: 7,
    paddingBottom: 0,
    paddingLeft: 7,
    alignItems: "center",
    borderRadius: 10,
  },
  label5: {
    fontFamily: font.manrope[800],
    fontSize: 10,
    letterSpacing: 0.4,
    textDecorationLine: "none",
  },
  text6: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 12,
    textDecorationLine: "none",
  },
  text7: {
    overflow: "hidden",
    fontFamily: font.manrope[800],
    color: "#8A93B8",
    fontSize: 11,
    textDecorationLine: "none",
  },
  box14: {
    overflow: "hidden",
  },
  label6: {
    fontFamily: font.manrope[700],
    color: "inherit",
    fontSize: 14,
    lineHeight: 18.2,
    textDecorationLine: "none",
  },
  box15: {
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-end",
    flexShrink: 0,
  },
  box16: {
    flexDirection: "row",
    height: 22,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 8,
    alignItems: "center",
    backgroundColor: "#FFF3D6",
    borderRadius: 11,
  },
  label7: {
    fontFamily: font.spaceGrotesk[700],
    color: "#8A5A00",
    fontSize: 11,
    textDecorationLine: "none",
  },
  box17: {
    position: "absolute",
    left: 80,
    right: 12,
    bottom: 0,
    height: 1,
  },
  box18: {
    flexDirection: "column",
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 32,
    paddingLeft: 16,
    gap: 8,
    alignItems: "center",
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    textAlign: "center",
  },
  text9: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 13,
    textAlign: "center",
  },
  box19: {
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
  label8: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    textDecorationLine: "none",
  },
  link5: {
    flexDirection: "row",
    width: 86,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
});
