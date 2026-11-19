import { Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useAccountViewModel } from "../hooks/useAccountViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/account.art";
import { CATEGORY_ICONS } from "@/components/categoryIcons";
import { strings } from "../strings";
import { styles } from "./AccountScreen.styles";

const s = strings.account;

export function AccountScreen() {
  const router = useRouter();
  const vm = useAccountViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Text style={styles.title}>{s.account}</Text>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/edit-profile")}
          accessibilityRole="link"
          accessibilityLabel="Edit profile"
        >
          <SvgXml xml={art.art1} width={16} height={16} />
          <Text style={styles.label}>{s.edit}</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.box} showsVerticalScrollIndicator={false}>
        <View style={styles.box2}>
          <View style={styles.section}>
            <View style={styles.box3}>
              <Text style={styles.label2}>{s.nb}</Text>
            </View>
            <View style={styles.box4}>
              <Text style={styles.text}>{s.ninoBeridze}</Text>
              <Text style={styles.text2}>{s.n9955551234}</Text>
            </View>
          </View>
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/my-course")}
            accessibilityRole="link"
            accessibilityLabel={`Video course B, B1, purchased. ${vm.pct} complete, now at module ${vm.mNum}: ${vm.lesson}`}
          >
            <SvgXml xml={art.art2} width={350} height={112} style={styles.artBox} />
            <View style={styles.box5}>
              <SvgXml
                xml={art.ringArt(vm.ringDash)}
                width={72}
                height={72}
                style={styles.artBox2}
              />
              <View style={styles.box6}>
                <Text style={styles.label3}>{vm.pct}</Text>
              </View>
            </View>
            <View style={styles.box7}>
              <View style={styles.box8}>
                <SvgXml xml={art.art4} width={10} height={10} />
                <Text style={styles.label4}>{s.purchased}</Text>
              </View>
              <Text style={styles.text4}>
                {s.videoCourse} <Text style={styles.text3}>{s.bB1}</Text>
              </Text>
              <Text style={styles.text5}>{`Now: Module ${vm.mNum} · ${vm.lesson}`}</Text>
            </View>
          </Pressable>
          <View style={styles.section2}>
            <View style={styles.box9}>
              <Text style={styles.heading}>{s.ticketLanguage}</Text>
              <Text style={styles.text6}>{s.n6Languages}</Text>
            </View>
            <View style={styles.box10}>
              <View style={styles.box11}>
                <View style={styles.box12}>
                  <SvgXml xml={art.art5} width={32} height={32} />
                </View>
                <View style={styles.box13}>
                  <Text style={styles.label5}>
                    {s.studyTicketsAndTake} <Text style={styles.text7}>{vm.langName}</Text>
                    {s.text}
                  </Text>
                </View>
              </View>
              <View style={styles.ticketLanguageBox}>
                {vm.langs.map((l) => (
                  <Fragment key={l.code}>
                    <Pressable
                      style={[
                        styles.button,
                        { ...l.border, backgroundColor: l.bg, boxShadow: l.shadow },
                      ]}
                      onPress={l.pick}
                      accessibilityRole="button"
                      accessibilityLabel={l.en}
                    >
                      <Text style={styles.text8}>{l.native}</Text>
                      <Text style={[styles.text9, { color: l.subFg }]}>{l.en}</Text>
                      <View style={[styles.box14, { backgroundColor: l.codeBg }]}>
                        <SvgXml
                          xml={art.art6}
                          width={12}
                          height={12}
                          style={{ display: l.markShow }}
                        />
                        <Text style={[styles.label6, { color: l.codeFg }]}>{l.short}</Text>
                      </View>
                    </Pressable>
                  </Fragment>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box15}>
              <Text style={styles.label7}>{s.preferences}</Text>
            </View>
            <View style={styles.box16}>
              <Pressable style={styles.button2} onPress={vm.openCat} accessibilityRole="button">
                <View style={styles.box12}>
                  <SvgXml xml={art.art7} width={32} height={32} />
                </View>
                <View style={styles.box4}>
                  <Text style={styles.text10}>{s.licenceCategory}</Text>
                </View>
                <Text style={styles.text11}>{vm.catCode}</Text>
                <SvgXml xml={art.art8} width={16} height={16} />
                <View style={styles.box17} />
              </Pressable>

              <Pressable
                style={styles.link3}
                onPress={() => router.push("/notifications2")}
                accessibilityRole="link"
              >
                <View style={styles.box12}>
                  <SvgXml xml={art.art11} width={32} height={32} />
                </View>
                <View style={styles.box4}>
                  <Text style={styles.text12}>{s.reminders}</Text>
                  <Text style={styles.text13}>{s.everyDay}</Text>
                </View>
                <Text style={styles.text14}>{s.n1900}</Text>
                <SvgXml xml={art.art12} width={16} height={16} />
              </Pressable>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box15}>
              <Text style={styles.label7}>{s.help}</Text>
            </View>
            <View style={styles.box16}>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/help")}
                accessibilityRole="link"
              >
                <View style={styles.box12}>
                  <SvgXml xml={art.art13} width={32} height={32} />
                </View>
                <View style={styles.box4}>
                  <Text style={styles.text12}>{s.helpCentre}</Text>
                </View>
                <SvgXml xml={art.art14} width={16} height={16} />
                <View style={styles.box17} />
              </Pressable>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/help#contact")}
                accessibilityRole="link"
              >
                <View style={styles.box12}>
                  <SvgXml xml={art.art15} width={32} height={32} />
                </View>
                <View style={styles.box4}>
                  <Text style={styles.text12}>{s.contactSupport}</Text>
                </View>
                <SvgXml xml={art.art16} width={16} height={16} />
                <View style={styles.box17} />
              </Pressable>
              <Pressable
                style={styles.link3}
                onPress={() => router.push("/terms")}
                accessibilityRole="link"
              >
                <View style={styles.box12}>
                  <SvgXml xml={art.art17} width={32} height={32} />
                </View>
                <View style={styles.box4}>
                  <Text style={styles.text12}>{s.termsAndPrivacy}</Text>
                </View>
                <SvgXml xml={art.art18} width={16} height={16} />
              </Pressable>
            </View>
          </View>
          {vm.notConfirm ? (
            <>
              <Pressable style={styles.button3} onPress={vm.logout} accessibilityRole="button">
                <SvgXml xml={art.art19} width={18} height={18} />
                <Text style={styles.label8}>{s.logOut}</Text>
              </Pressable>
            </>
          ) : null}
          {vm.confirm ? (
            <>
              <Pressable
                style={styles.link4}
                onPress={() => router.push("/main")}
                accessibilityRole="link"
              >
                <SvgXml xml={art.art20} width={18} height={18} />
                <Text style={styles.label9}>{s.tapAgainToLog}</Text>
              </Pressable>
            </>
          ) : null}
          <Text style={styles.text15}>{s.drivenetVersion10}</Text>
        </View>
      </ScrollView>
      <View style={styles.box18} />
      <View style={styles.nav}>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
          accessibilityLabel="Home"
        >
          <SvgXml xml={art.art21} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
          accessibilityLabel="My course"
        >
          <SvgXml xml={art.art22} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link6}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art23} width={20} height={20} />
          <Text style={styles.label10}>{s.account}</Text>
        </Pressable>
      </View>
      {vm.catOpen ? (
        <>
          <Pressable
            style={styles.button4}
            onPress={vm.closeSheet}
            accessibilityRole="button"
            accessibilityLabel="Close"
          />
          <ScrollView
            style={styles.licenceCategoryBox}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.licenceCategoryBoxContent}
          >
            <View style={styles.box19} />
            <View style={styles.box20}>
              <Text style={styles.label11}>{s.licenceCategory}</Text>
            </View>
            <View style={styles.box21}>
              <Text style={styles.label12}>{s.ticketsTestsAndYour}</Text>
            </View>
            <View style={styles.box22}>
              {vm.cats.map((c) => (
                <Fragment key={c.code}>
                  <Pressable
                    style={[
                      styles.button5,
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
                      style={styles.artBox4}
                    />
                    <Text style={styles.text16}>{c.code}</Text>
                    <View style={[styles.box23, { display: c.check }]}>
                      <SvgXml xml={art.art26} width={12} height={12} />
                    </View>
                  </Pressable>
                </Fragment>
              ))}
            </View>
          </ScrollView>
        </>
      ) : null}
    </ScreenFrame>
  );
}
