import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useHelpViewModel } from "../hooks/useHelpViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/help.art";
import { strings } from "../strings";
import { styles } from "./HelpScreen.styles";

const s = strings.help;

export function HelpScreen() {
  const router = useRouter();
  const vm = useHelpViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Back to Account"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.help}</Text>
        <View style={styles.box} />
      </View>
      <ScrollView style={styles.box2} showsVerticalScrollIndicator={false}>
        <View style={styles.box3}>
          <View style={styles.section}>
            <SvgXml xml={art.art2} width={350} height={160} style={styles.artBox} />
            <View style={styles.box4}>
              <Text style={styles.text3}>
                {s.howCanWe} <Text style={styles.text2}>{s.help2}</Text>
              </Text>
              <Text style={styles.text4}>{s.answersToTheQuestions}</Text>
            </View>
            <View style={styles.box5}>
              <SvgXml xml={art.art3} width={18} height={18} />
              <TextInput
                style={styles.input}
                placeholder={s.searchEGLanguage}
                placeholderTextColor="#A2A9C8"
                value={vm.q}
                onChangeText={vm.setQ}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box6}>
              <Text style={styles.label}>{s.talkToAPerson}</Text>
            </View>
            <View style={styles.box7}>
              <View style={styles.box8} />
              <View style={styles.box9}>
                <View style={styles.box10}>
                  <View style={styles.box11}>
                    <Text style={styles.label2}>{s.n}</Text>
                  </View>
                  <View style={styles.box12}>
                    <Text style={styles.label3}>{s.g}</Text>
                  </View>
                  <View style={styles.box13}>
                    <Text style={styles.label2}>{s.l}</Text>
                  </View>
                  <View style={styles.box14} />
                </View>
                <View style={styles.box15}>
                  <Text style={styles.text5}>{s.ourTeamIsOnline}</Text>
                  <Text style={styles.text6}>{s.everyDay0900}</Text>
                </View>
              </View>
              <Pressable
                style={styles.button}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="Start a chat"
              >
                <SvgXml xml={art.art4} width={20} height={20} />
                <View style={styles.box16}>
                  <Text style={styles.label4}>{s.startAChat}</Text>
                </View>
                <View style={styles.box17}>
                  <SvgXml xml={art.art5} width={18} height={18} />
                </View>
              </Pressable>
              <View style={styles.box18}>
                <Pressable
                  style={styles.button2}
                  onPress={() => {}}
                  accessibilityRole="button"
                  accessibilityLabel="Call us, 09:00 \u2013 18:00"
                >
                  <View style={styles.box19}>
                    <SvgXml xml={art.art6} width={29} height={29} />
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.callUs}</Text>
                    <Text style={styles.text8}>{s.n09001800}</Text>
                  </View>
                </Pressable>
                <Pressable
                  style={styles.button2}
                  onPress={() => {}}
                  accessibilityRole="button"
                  accessibilityLabel="Email, Within a day"
                >
                  <View style={styles.box19}>
                    <SvgXml xml={art.art7} width={29} height={29} />
                  </View>
                  <View style={styles.box20}>
                    <Text style={styles.text7}>{s.email}</Text>
                    <Text style={styles.text8}>{s.withinADay}</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.box21}>
              <Text style={styles.heading}>{s.questions}</Text>
              <Text style={styles.text9}>{vm.countLabel}</Text>
            </View>
            <ScrollView
              style={styles.box22}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.boxContent}
            >
              {vm.chips.map((c, index) => (
                <Fragment key={index}>
                  <Pressable
                    style={[styles.button3, { ...c.border, backgroundColor: c.bg }]}
                    onPress={c.pick}
                    accessibilityRole="button"
                  >
                    <Text style={[styles.label5, { color: c.fg }]}>{c.label}</Text>
                  </Pressable>
                </Fragment>
              ))}
            </ScrollView>
            <View style={styles.box23}>
              {vm.rows.map((it) => (
                <Fragment key={it.key}>
                  <View style={styles.box24}>
                    <Pressable
                      style={styles.button4}
                      onPress={it.toggle}
                      accessibilityRole="button"
                    >
                      <View style={styles.box25}>
                        <Text style={styles.label6}>{it.q}</Text>
                      </View>
                      <View
                        style={[
                          styles.box26,
                          { backgroundColor: it.iconBg, transform: [{ rotate: it.rot }] },
                        ]}
                      >
                        <SvgXml xml={art.toggleArt(it.iconFg)} width={14} height={14} />
                      </View>
                    </Pressable>
                    {it.isOpen ? (
                      <>
                        <View style={styles.box27}>
                          <Text style={styles.label7}>{it.a}</Text>
                        </View>
                      </>
                    ) : null}
                    <View style={[styles.box28, { backgroundColor: it.line }]} />
                  </View>
                </Fragment>
              ))}
              {vm.noRows ? (
                <>
                  <View style={styles.box29}>
                    <Text style={styles.text10}>{s.noAnswerYet}</Text>
                    <Text style={styles.text11}>{s.writeToUsIn}</Text>
                  </View>
                </>
              ) : null}
            </View>
          </View>
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/terms")}
            accessibilityRole="link"
          >
            <SvgXml xml={art.art9} width={16} height={16} />
            <Text style={styles.label8}>{s.termsAndPrivacy}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenFrame>
  );
}
