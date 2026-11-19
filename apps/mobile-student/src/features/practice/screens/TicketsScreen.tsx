import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useTicketsViewModel } from "../hooks/useTicketsViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/tickets.art";
import { CATEGORY_ICONS } from "@/components/categoryIcons";
import { TOPIC_ICONS } from "../art/topicIcons";
import { strings } from "../strings";
import { styles } from "./TicketsScreen.styles";

const s = strings.tickets;

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
                        <Text numberOfLines={1} style={styles.text9}>
                          {it.name}
                        </Text>
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
                        <Text numberOfLines={3} style={styles.label10}>
                          {it.title}
                        </Text>
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
                <Text numberOfLines={1} style={styles.text18}>
                  {vm.hereTopic}
                </Text>
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
