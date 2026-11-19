import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useTicketsViewModel } from "../hooks/useTicketsViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/tickets.art";
import { CATEGORY_ICONS } from "../art/categoryIcons";
import { TOPIC_ICONS } from "../art/topicIcons";
import { strings } from "../strings";

const s = strings.tickets;

// Topic cards sit in two columns of the 350px list with an 8px gap; module headings span both.
const TOPIC_CARD_WIDTH = (350 - 8) / 2;

export function TicketsScreen() {
  const router = useRouter();
  const vm = useTicketsViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <ScrollView style={styles.box} showsVerticalScrollIndicator={false}>
        <View style={styles.box2}>
          <Pressable
            style={styles.link}
            onPress={() => router.push("/home-signed-in")}
            accessibilityRole="link"
            accessibilityLabel="Back"
          >
            <SvgXml xml={art.art2} width={20} height={20} />
          </Pressable>
          <View style={styles.box3}>
            <Text style={styles.label}>{s.tickets}</Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={vm.toggleMenu}
            accessibilityRole="button"
            accessibilityLabel="Licence category"
          >
            <View style={styles.box4}>
              <SvgXml xml={CATEGORY_ICONS[vm.cur.code] ?? ""} width={30} height={19} />
            </View>
            <Text style={styles.label2}>{vm.cur.code}</Text>
            <SvgXml xml={art.art4} width={14} height={14} />
          </Pressable>
          <SvgXml
            xml={art.orderHeroArt(vm.roadOp)}
            width={350}
            height={192}
            style={styles.artBox2}
          />
          <View style={styles.box5}>
            <View style={styles.box6} />
            <Text style={styles.label3}>{vm.cur.name}</Text>
          </View>
          <View style={styles.box7}>
            <Text style={styles.text}>{vm.curTotal}</Text>
            <Text style={styles.text2}>{s.tickets2}</Text>
          </View>
          <View style={styles.box8}>
            <View style={styles.box9}>
              <View style={styles.box10} />
              <Text style={styles.text3}>{`${vm.stOk} correct`}</Text>
            </View>
            <View style={styles.box9}>
              <View style={styles.box11} />
              <Text style={styles.text3}>{`${vm.stBad} wrong`}</Text>
            </View>
            <View style={styles.box9}>
              <View style={styles.box6} />
              <Text style={styles.text3}>{`${vm.stLeft} left`}</Text>
            </View>
          </View>
          <View style={styles.box12} />
          <SvgXml xml={art.art6} width={96} height={96} style={styles.artBox3} />
          <View style={styles.box13}>
            <Text style={styles.label4}>{vm.cur.code}</Text>
          </View>
          <View style={styles.box14}>
            <Pressable style={styles.button2} onPress={vm.openGrid} accessibilityRole="button">
              <View style={styles.box15}>
                <SvgXml xml={art.art7} width={15} height={15} />
              </View>
              <View style={styles.box16}>
                <Text style={styles.text4}>{s.inOrder}</Text>
                <View style={styles.box17}>
                  <Text style={styles.text5}>{vm.orderSub}</Text>
                  <View style={styles.box18}>
                    <View style={[styles.box19, { width: vm.orderPct }]} />
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable
              style={styles.link2}
              onPress={() => router.push("/mistakes")}
              accessibilityRole="link"
            >
              <View style={styles.box20}>
                <SvgXml xml={art.art8} width={15} height={15} />
              </View>
              <View style={styles.box21}>
                <Text style={styles.text4}>{s.mistakes}</Text>
                <Text style={styles.text6}>{vm.mistSub}</Text>
              </View>
              <View style={[styles.stbadMistakesBox, { opacity: vm.badgeOp }]}>
                <Text style={styles.label5}>{vm.stBad}</Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.link3}
              onPress={() => router.push("/saved")}
              accessibilityRole="link"
            >
              <View style={styles.box22}>
                <SvgXml xml={art.art9} width={14} height={14} />
              </View>
              <View style={styles.box21}>
                <Text style={styles.text4}>{s.saved}</Text>
                <Text style={styles.text7}>{s.n3Tickets}</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.box23}>
            <Text style={styles.heading}>{s.byTopic}</Text>
            <View style={styles.sortTopicsBox}>
              <Pressable
                style={[styles.button3, { backgroundColor: vm.modBg, boxShadow: vm.modShadow }]}
                onPress={vm.sortMod}
                accessibilityRole="button"
              >
                <SvgXml xml={art.art10} width={13} height={13} />
                <Text style={[styles.label6, { color: vm.modFg }]}>{s.modules}</Text>
              </Pressable>
              <Pressable
                style={[styles.button3, { backgroundColor: vm.numBg, boxShadow: vm.numShadow }]}
                onPress={vm.sortNum}
                accessibilityRole="button"
              >
                <SvgXml xml={art.art11} width={13} height={13} />
                <Text style={[styles.label6, { color: vm.numFg }]}>{s.n0132}</Text>
              </Pressable>
            </View>
            <Pressable style={styles.button4} onPress={vm.askReset} accessibilityRole="button">
              <SvgXml xml={art.art12} width={12} height={12} />
              <Text style={styles.text8}>{s.reset}</Text>
            </Pressable>
          </View>
          <View style={styles.box24}>
            {vm.items.map((it, index) => (
              <Fragment key={index}>
                {it.kind === "module" ? (
                  <>
                    <View style={styles.box25}>
                      <View style={styles.box26}>
                        <Text style={styles.label7}>{it.n}</Text>
                      </View>
                      <View style={styles.box27}>
                        <Text style={styles.text9}>{it.name}</Text>
                        <View style={styles.box9}>
                          <Text style={styles.label8}>{it.count}</Text>
                        </View>
                      </View>
                    </View>
                  </>
                ) : null}
                {it.kind === "topic" ? (
                  <>
                    <Pressable
                      style={[styles.button5, { ...it.border, boxShadow: it.shadow }]}
                      onPress={it.toggle}
                      accessibilityRole="button"
                    >
                      <SvgXml
                        xml={art.ticketRowBackground(it.tint)}
                        width="100%"
                        height={112}
                        style={styles.artBox4}
                      />
                      <View style={[styles.box28, { backgroundColor: it.shade }]} />
                      <SvgXml
                        xml={TOPIC_ICONS[it.topic - 1] ?? ""}
                        width={70}
                        height={70}
                        style={styles.artBox5}
                      />
                      <View
                        style={[styles.box29, { ...it.checkBorder, backgroundColor: it.checkBg }]}
                      >
                        <SvgXml
                          xml={art.art15}
                          width={14}
                          height={14}
                          style={{ opacity: it.checkOpacity }}
                        />
                      </View>
                      <View style={styles.box30}>
                        <Text style={[styles.label9, { color: it.numFg }]}>{it.num}</Text>
                      </View>
                      <View style={styles.box31}>
                        <Text style={styles.label10}>{it.title}</Text>
                      </View>
                      <View style={styles.box32}>
                        <View style={styles.box33}>
                          <Text style={styles.text10}>{it.meta}</Text>
                          <Text style={[styles.text11, { color: it.pctFg }]}>{it.pctShort}</Text>
                        </View>
                        <View style={styles.box34}>
                          <View
                            style={[styles.box35, { width: it.barW, backgroundColor: it.bar }]}
                          />
                        </View>
                      </View>
                    </Pressable>
                  </>
                ) : null}
              </Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.box36} />
      <Pressable
        style={[styles.link4, { backgroundColor: vm.ctaBg, boxShadow: vm.ctaShadow }]}
        onPress={() => router.push("/ticket")}
        accessibilityRole="link"
      >
        <View style={styles.box21}>
          <Text style={[styles.text12, { color: vm.ctaFg }]}>{s.startPractising}</Text>
          <Text style={[styles.text13, { color: vm.ctaFg }]}>{vm.summary}</Text>
        </View>
        <View style={styles.box37}>
          <SvgXml xml={art.art16} width={18} height={18} />
        </View>
      </Pressable>
      {vm.menuOpen ? (
        <>
          <Pressable
            style={styles.button6}
            onPress={vm.toggleMenu}
            accessibilityRole="button"
            accessibilityLabel="Close"
          />
          <ScrollView
            style={styles.chooseLicenceCategoryBox}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.chooseLicenceCategoryBoxContent}
          >
            <View style={styles.box38} />
            <View style={styles.box39}>
              <Text style={styles.label11}>{s.licenceCategory}</Text>
            </View>
            <View style={styles.box40}>
              {vm.cats.map((c, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={[
                      styles.button7,
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
                      style={styles.artBox6}
                    />
                    <Text style={styles.text14}>{c.code}</Text>
                    <View style={[styles.box41, { display: c.check }]}>
                      <SvgXml xml={art.art19} width={12} height={12} />
                    </View>
                  </Pressable>
                </Fragment>
              ))}
            </View>
          </ScrollView>
        </>
      ) : null}
      {vm.gridOpen ? (
        <>
          <Pressable
            style={styles.button6}
            onPress={vm.closeAll}
            accessibilityRole="button"
            accessibilityLabel="Close"
          />
          <View style={styles.inOrderBox}>
            <View style={styles.box42} />
            <View style={styles.box43}>
              <Text style={styles.text15}>{s.inOrder}</Text>
              <Pressable
                style={styles.button8}
                onPress={vm.closeAll}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <SvgXml xml={art.art20} width={16} height={16} />
              </Pressable>
            </View>
            <View style={styles.box44}>
              <View style={styles.box45} />
              <View style={styles.box46}>
                <Text style={styles.label12}>{vm.hereKicker}</Text>
              </View>
              <View style={styles.box47}>
                <Text style={styles.text16}>{`#${vm.nextN}`}</Text>
                <Text style={styles.text17}>{`of ${vm.curTotal}`}</Text>
              </View>
              <View style={styles.box48}>
                <SvgXml
                  xml={TOPIC_ICONS[vm.hereTopicIndex] ?? ""}
                  width={22}
                  height={22}
                  style={styles.artBox6}
                />
                <Text style={styles.text18}>{vm.hereTopic}</Text>
              </View>
              <Pressable
                style={styles.link5}
                onPress={() => router.push("/ticket")}
                accessibilityRole="link"
              >
                <Text style={styles.text19}>{vm.contLabel}</Text>
                <View style={styles.box49}>
                  <SvgXml xml={art.art22} width={16} height={16} />
                </View>
              </Pressable>
            </View>
            <View style={[styles.box50, { display: vm.recentDisplay }]}>
              <Text style={styles.text20}>{s.goBackToRecent}</Text>
              <View style={styles.box51}>
                {vm.recent.map((r, index) => (
                  <Fragment key={index}>
                    <Pressable
                      style={styles.link6}
                      onPress={() => router.push("/ticket")}
                      accessibilityRole="link"
                      accessibilityLabel={r.aria}
                    >
                      <Text style={styles.label13}>{r.n}</Text>
                      <View style={[styles.box52, { backgroundColor: r.bg }]}>
                        <SvgXml xml={art.recentMark(r.wrong)} width={9} height={9} />
                      </View>
                    </Pressable>
                  </Fragment>
                ))}
              </View>
            </View>
            <View style={styles.box53}>
              <View style={styles.box54}>
                <SvgXml xml={art.art24} width={16} height={16} />
                <TextInput
                  style={styles.input}
                  placeholder={s.jumpToTicket1}
                  placeholderTextColor="#A2A9C8"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <Pressable
                style={styles.link7}
                onPress={() => router.push("/ticket")}
                accessibilityRole="link"
              >
                <Text style={styles.label14}>{s.go}</Text>
              </Pressable>
            </View>
          </View>
        </>
      ) : null}
      {vm.resetOpen ? (
        <>
          <Pressable
            style={styles.button6}
            onPress={vm.closeAll}
            accessibilityRole="button"
            accessibilityLabel="Close"
          />
          <View style={styles.resetProgressBox}>
            <View style={styles.box55} />
            <View style={styles.box56}>
              <SvgXml xml={art.art25} width={28} height={28} />
            </View>
            <Text style={styles.text21}>{s.startOver}</Text>
            <Text style={styles.text24}>
              {`This clears your ${vm.cur.code} answers:`}{" "}
              <Text style={styles.text22}>{`${vm.stOk} correct`}</Text> {s.and}{" "}
              <Text style={styles.text23}>{`${vm.stBad} wrong`}</Text>
              {s.yourMistakesListEmpties}
            </Text>
            <Pressable style={styles.button9} onPress={vm.doReset} accessibilityRole="button">
              <Text style={styles.label15}>{s.resetProgress}</Text>
            </Pressable>
            <Pressable style={styles.button10} onPress={vm.closeAll} accessibilityRole="button">
              <Text style={styles.label16}>{s.cancel}</Text>
            </Pressable>
          </View>
        </>
      ) : null}
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 390,
    height: 844,
  },
  box2: {
    position: "relative",
    width: 390,
    minHeight: 844,
    paddingBottom: 116,
  },
  artBox: {
    position: "absolute",
  },
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
  box3: {
    position: "absolute",
    left: 76,
    top: 60,
    margin: 0,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 26,
    letterSpacing: -0.9,
    lineHeight: 32,
  },
  button: {
    flexDirection: "row",
    position: "absolute",
    top: 54,
    right: 20,
    height: 44,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 7,
    gap: 6,
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
  box4: {
    flexDirection: "row",
    width: 36,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 14,
  },
  artBox2: {
    position: "absolute",
    left: 20,
    top: 114,
  },
  box5: {
    flexDirection: "row",
    position: "absolute",
    left: 40,
    top: 154,
    height: 24,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 12,
  },
  box6: {
    width: 7,
    height: 7,
    backgroundColor: "#FFB200",
    borderRadius: 3.5,
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 11,
  },
  box7: {
    flexDirection: "row",
    position: "absolute",
    left: 40,
    top: 197,
    gap: 8,
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
    fontFamily: font.manrope[800],
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
  },
  box8: {
    flexDirection: "row",
    position: "absolute",
    top: 280,
    right: 40,
    gap: 16,
    alignItems: "center",
  },
  box9: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  box10: {
    width: 7,
    height: 7,
    backgroundColor: "#FFFFFF",
    borderRadius: 3.5,
  },
  text3: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.82)",
    fontSize: 11,
  },
  box11: {
    width: 7,
    height: 7,
    backgroundColor: "#FF6B78",
    borderRadius: 3.5,
  },
  box12: {
    position: "absolute",
    left: 274,
    top: 208,
    width: 68,
    height: 8,
    backgroundColor: "rgba(0,0,0,0.28)",
    borderRadius: 9999,
  },
  artBox3: {
    position: "absolute",
    left: 260,
    top: 114,
  },
  box13: {
    flexDirection: "row",
    position: "absolute",
    left: 289,
    top: 134,
    width: 39,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    transform: "rotate(0deg)",
  },
  label4: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 8,
  },
  box14: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 330,
    width: 350,
    gap: 8,
  },
  button2: {
    flexDirection: "column",
    position: "relative",
    height: 88,
    minWidth: 0,
    paddingTop: 9,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    justifyContent: "space-between",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 20,
    boxShadow: "0 10px 24px rgba(14,28,145,0.07)",
  },
  box15: {
    flexDirection: "row",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E1C91",
    borderRadius: 10,
  },
  box16: {
    flexDirection: "column",
    width: "100%",
    gap: 4,
  },
  text4: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    letterSpacing: -0.2,
    lineHeight: 15.4,
    textAlign: "left",
    textDecorationLine: "none",
  },
  box17: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  text5: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 11,
    lineHeight: 12.1,
    textAlign: "left",
    textDecorationLine: "none",
  },
  box18: {
    height: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "#E8EBF7",
    borderRadius: 2,
  },
  box19: {
    height: 4,
    backgroundColor: "#0E1C91",
    borderRadius: 2,
  },
  link2: {
    flexDirection: "column",
    position: "relative",
    height: 88,
    minWidth: 0,
    paddingTop: 9,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    justifyContent: "space-between",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#FFF1F2",
    borderWidth: 1.5,
    borderColor: "#FFD5DA",
    borderRadius: 20,
    boxShadow: "0 10px 24px rgba(217,45,58,0.07)",
  },
  box20: {
    flexDirection: "row",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D92D3A",
    borderRadius: 10,
  },
  box21: {
    flexDirection: "column",
    gap: 4,
  },
  text6: {
    fontFamily: font.manrope[700],
    color: "#A3303B",
    fontSize: 11,
    lineHeight: 12.1,
    textAlign: "left",
    textDecorationLine: "none",
  },
  stbadMistakesBox: {
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
  label5: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 13,
    textAlign: "left",
    textDecorationLine: "none",
  },
  link3: {
    flexDirection: "column",
    position: "relative",
    height: 88,
    minWidth: 0,
    paddingTop: 9,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    justifyContent: "space-between",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#FFF6DE",
    borderWidth: 1.5,
    borderColor: "#FFE2A0",
    borderRadius: 20,
    boxShadow: "0 10px 24px rgba(176,122,0,0.08)",
  },
  box22: {
    flexDirection: "row",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 10,
  },
  text7: {
    fontFamily: font.manrope[700],
    color: "#8A5A00",
    fontSize: 11,
    lineHeight: 12.1,
    textAlign: "left",
    textDecorationLine: "none",
  },
  box23: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 430,
    right: 20,
    height: 34,
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
  sortTopicsBox: {
    flexDirection: "row",
    height: 34,
    padding: 3,
    gap: 4,
    backgroundColor: "#E8EBF7",
    borderRadius: 17,
  },
  button3: {
    flexDirection: "row",
    height: 28,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 4,
    alignItems: "center",
    borderRadius: 14,
  },
  label6: {
    fontFamily: font.manrope[800],
    fontSize: 12,
  },
  button4: {
    flexDirection: "row",
    position: "absolute",
    left: 78,
    top: 5,
    width: 66,
    height: 24,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 8,
    gap: 4,
    alignItems: "center",
    backgroundColor: "#0a0e2e",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 12,
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 10,
  },
  box24: {
    flexDirection: "row",
    position: "relative",
    width: 350,
    marginTop: 476,
    marginRight: 20,
    marginBottom: 0,
    marginLeft: 20,
    gap: 8,
    alignContent: "flex-start",
    flexWrap: "wrap",
  },
  box25: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 12,
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: 2,
    gap: 8,
    alignItems: "center",
  },
  box26: {
    flexDirection: "row",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#0E1C91",
    borderRadius: 10,
  },
  label7: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFB200",
    fontSize: 14,
  },
  box27: {
    flexDirection: "column",
    minWidth: 0,
    flexShrink: 1,
    gap: 4,
    flexGrow: 1,
  },
  text9: {
    overflow: "hidden",
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    letterSpacing: -0.2,
  },
  label8: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 11,
  },
  button5: {
    position: "relative",
    width: TOPIC_CARD_WIDTH,
    height: 222,
    padding: 0,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  artBox4: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box28: {
    position: "absolute",
    left: 22,
    top: 88,
    width: 58,
    height: 9,
    borderRadius: 9999,
  },
  artBox5: {
    position: "absolute",
    left: 16,
    top: 16,
  },
  box29: {
    flexDirection: "row",
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
  box30: {
    position: "absolute",
    top: 64,
    right: 14,
  },
  label9: {
    fontFamily: font.spaceGrotesk[700],
    fontSize: 30,
    letterSpacing: -1,
    lineHeight: 30,
    textAlign: "left",
  },
  box31: {
    position: "absolute",
    left: 14,
    top: 122,
    right: 14,
    overflow: "hidden",
  },
  label10: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 14,
    letterSpacing: -0.2,
    lineHeight: 17.08,
    textAlign: "left",
  },
  box32: {
    flexDirection: "column",
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
    gap: 8,
  },
  box33: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text10: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 11,
    textAlign: "left",
  },
  text11: {
    fontFamily: font.manrope[800],
    fontSize: 11,
    textAlign: "left",
  },
  box34: {
    height: 5,
    overflow: "hidden",
    backgroundColor: "#E8EBF7",
    borderRadius: 3,
  },
  box35: {
    height: 5,
    borderRadius: 3,
  },
  box36: {
    position: "absolute",
    left: 0,
    top: 716,
    right: 0,
    bottom: 0,
    backgroundImage: "linear-gradient(180deg, rgba(246,247,253,0) 0%, #F6F7FD 32%)",
  },
  link4: {
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
    borderRadius: 30,
  },
  text12: {
    fontFamily: font.manrope[800],
    fontSize: 17,
    letterSpacing: -0.3,
    textDecorationLine: "none",
  },
  text13: {
    opacity: 0.8,
    fontFamily: font.manrope[700],
    fontSize: 12,
    textDecorationLine: "none",
  },
  box37: {
    flexDirection: "row",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 24,
  },
  button6: {
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
  chooseLicenceCategoryBoxContent: {
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 28,
    paddingLeft: 16,
    gap: 4,
  },
  chooseLicenceCategoryBox: {
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
  box38: {
    width: 40,
    height: 5,
    marginBottom: 8,
    alignSelf: "center",
    backgroundColor: "#DDE2FA",
    borderRadius: 3,
  },
  box39: {
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 6,
    paddingLeft: 6,
  },
  label11: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 18,
    letterSpacing: -0.4,
  },
  box40: {
    flexDirection: "row",
    marginTop: 2,
    gap: 8,
    flexWrap: "wrap",
  },
  button7: {
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
  artBox6: {
    flexShrink: 0,
  },
  text14: {
    maxWidth: "100%",
    overflow: "hidden",
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 15,
    letterSpacing: -0.2,
    lineHeight: 20,
  },
  box41: {
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
  inOrderBox: {
    flexDirection: "column",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 30,
    paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  box42: {
    width: 40,
    height: 5,
    alignSelf: "center",
    backgroundColor: "#DDE2FA",
    borderRadius: 3,
  },
  box43: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text15: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 20,
    letterSpacing: -0.5,
  },
  button8: {
    flexDirection: "row",
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F3FB",
    borderRadius: 18,
  },
  box44: {
    position: "relative",
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 18,
    paddingLeft: 20,
    marginTop: 14,
    overflow: "hidden",
    backgroundImage: "linear-gradient(135deg, #1A2BB0, #0B1679)",
    borderRadius: 28,
  },
  box45: {
    position: "absolute",
    top: -70,
    right: -50,
    width: 200,
    height: 200,
    backgroundImage: "radial-gradient(circle, rgba(255,178,0,0.32), rgba(255,178,0,0))",
    borderRadius: 100,
  },
  box46: {
    position: "relative",
  },
  label12: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
  },
  box47: {
    flexDirection: "row",
    position: "relative",
    marginTop: 4,
    gap: 8,
    alignItems: "baseline",
  },
  text16: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 56,
    letterSpacing: -2.5,
    lineHeight: 56,
  },
  text17: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
  box48: {
    flexDirection: "row",
    position: "relative",
    height: 30,
    maxWidth: "100%",
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 4,
    marginTop: 10,
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 15,
  },
  text18: {
    overflow: "hidden",
    fontFamily: font.manrope[700],
    color: "#FFFFFF",
    fontSize: 12,
  },
  link5: {
    flexDirection: "row",
    position: "relative",
    height: 54,
    paddingTop: 0,
    paddingRight: 7,
    paddingBottom: 0,
    paddingLeft: 22,
    marginTop: 18,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 27,
  },
  text19: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    textDecorationLine: "none",
  },
  box49: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 20,
  },
  box50: {
    marginTop: 20,
    gap: 8,
  },
  text20: {
    fontFamily: font.manrope[800],
    color: "#566086",
    fontSize: 13,
  },
  box51: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  link6: {
    flexDirection: "row",
    position: "relative",
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6FC",
    borderRadius: 14,
  },
  label13: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 13,
    textDecorationLine: "none",
  },
  box52: {
    flexDirection: "row",
    position: "absolute",
    top: -5,
    right: -5,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 9,
  },
  box53: {
    flexDirection: "row",
    marginTop: 20,
    gap: 8,
    alignItems: "center",
  },
  box54: {
    flexDirection: "row",
    height: 50,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 8,
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#F4F6FC",
    borderRadius: 25,
  },
  input: {
    minWidth: 0,
    flexShrink: 1,
    flexGrow: 1,
    fontFamily: font.manrope[700],
    color: "#0A0E2E",
    fontSize: 14,
  },
  link7: {
    flexDirection: "row",
    height: 50,
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 20,
    alignItems: "center",
    backgroundColor: "#0E1C91",
    borderRadius: 25,
  },
  label14: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 14,
    textDecorationLine: "none",
  },
  resetProgressBox: {
    flexDirection: "column",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 30,
    paddingLeft: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  box55: {
    width: 40,
    height: 5,
    backgroundColor: "#DDE2FA",
    borderRadius: 3,
  },
  box56: {
    flexDirection: "row",
    width: 64,
    height: 64,
    marginTop: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE8EA",
    borderRadius: 20,
  },
  text21: {
    marginTop: 16,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 20,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  text22: {
    color: "#0A0E2E",
  },
  text23: {
    color: "#D92D3A",
  },
  text24: {
    maxWidth: 300,
    marginTop: 8,
    fontFamily: font.manrope[600],
    color: "#566086",
    fontSize: 13,
    lineHeight: 18.85,
    textAlign: "center",
  },
  button9: {
    width: "100%",
    height: 54,
    marginTop: 22,
    backgroundColor: "#D92D3A",
    borderRadius: 27,
  },
  label15: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  button10: {
    width: "100%",
    height: 50,
    marginTop: 8,
    borderRadius: 25,
  },
  label16: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    textAlign: "center",
  },
});
