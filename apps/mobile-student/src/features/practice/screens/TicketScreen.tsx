import { Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useTicketViewModel } from "../hooks/useTicketViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/ticket.art";
import { TOPIC_ICONS } from "../art/topicIcons";
import { SIGN_1_16 } from "../art/signScene";
import { strings } from "../strings";
import { styles, SIGN_HEIGHT, SIGN_WIDTH } from "./TicketScreen.styles";

const s = strings.ticket;

export function TicketScreen() {
  const router = useRouter();
  const vm = useTicketViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      {vm.fresh ? (
        <>
          <Pressable
            style={[styles.button, { opacity: vm.prevOp }]}
            onPress={vm.prev}
            accessibilityRole="button"
            accessibilityLabel="Previous ticket"
          >
            <SvgXml xml={art.art1} width={20} height={20} />
          </Pressable>
        </>
      ) : null}
      <SvgXml xml={art.art2} width={0} height={0} style={styles.artBox} />
      <Pressable
        style={styles.link}
        onPress={() => router.push("/tickets")}
        accessibilityRole="link"
        accessibilityLabel="Close practice"
      >
        <SvgXml xml={art.art3} width={18} height={18} />
      </Pressable>
      <View style={styles.box}>
        <Text style={styles.text2}>
          {vm.pos}
          <Text style={styles.text}>{`/ ${vm.total}`}</Text>
        </Text>
        <Text style={styles.text3}>{vm.session}</Text>
      </View>
      <Pressable
        style={[styles.button2, { backgroundColor: vm.saveBg, ...vm.saveBorder }]}
        onPress={vm.toggleSave}
        accessibilityRole="button"
        accessibilityLabel="Save ticket"
      >
        <SvgXml xml={art.saveArt(vm.saved)} width={18} height={18} />
      </Pressable>
      <View style={styles.posOfTotalTicketsBox}>
        <View style={[styles.box2, { width: vm.donePct as `${number}%` }]} />
        <View style={[styles.box3, { left: vm.donePct as `${number}%` }]} />
      </View>
      <ScrollView
        style={styles.box4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.boxContent}
      >
        <View style={styles.box5}>
          <View style={styles.box6}>
            <Text style={styles.label}>{vm.tNum}</Text>
          </View>
          <View style={styles.box7}>
            <SvgXml
              xml={TOPIC_ICONS[vm.topicIndex] ?? ""}
              width={22}
              height={22}
              style={styles.artBox2}
            />
            <Text numberOfLines={1} style={styles.text4}>
              {vm.tTopic}
            </Text>
          </View>
        </View>
        <View style={[styles.box8, { height: vm.imgH, backgroundColor: vm.imgBg }]}>
          {vm.scene === "cross" ? (
            <>
              <SvgXml xml={art.art6} width={350} height={176} style={styles.artBox3} />
            </>
          ) : null}
          {vm.scene === "left" ? (
            <>
              <SvgXml xml={art.art7} width={350} height={176} style={styles.artBox3} />
            </>
          ) : null}
          {vm.scene === "sign" ? (
            <>
              <SvgXml
                xml={SIGN_1_16}
                width={SIGN_WIDTH}
                height={SIGN_HEIGHT}
                style={styles.signScene}
                accessibilityLabel="Road sign shown in the ticket"
              />
            </>
          ) : null}
        </View>
        <Text style={styles.title}>{vm.tQ}</Text>
        <View style={styles.answersBox}>
          {vm.answers.map((a, index) => (
            <Fragment key={index}>
              <Pressable
                style={[
                  styles.button3,
                  { ...a.border, backgroundColor: a.bg, opacity: a.op, boxShadow: a.shadow },
                ]}
                onPress={a.pick}
                accessibilityRole="button"
              >
                <View style={[styles.box9, { backgroundColor: a.badgeBg }]}>
                  <SvgXml
                    xml={art.answerMarkArt(a.isRight)}
                    width={18}
                    height={18}
                    style={{ display: a.markShow }}
                  />
                  <Text style={[styles.label2, { color: a.badgeFg }]}>{a.letter}</Text>
                </View>
                <View style={styles.box10}>
                  <Text style={[styles.label3, { fontFamily: a.fontFamily }]}>{a.text}</Text>
                </View>
              </Pressable>
            </Fragment>
          ))}
        </View>
      </ScrollView>
      {vm.fresh ? (
        <>
          <Pressable style={styles.button4} onPress={vm.next} accessibilityRole="button">
            <Text style={styles.text5}>{s.skipForNow}</Text>
            <View style={styles.box11}>
              <SvgXml xml={art.art9} width={18} height={18} />
            </View>
          </Pressable>
        </>
      ) : null}
      {vm.answered ? (
        <>
          <View style={[styles.box12, { backgroundColor: vm.panelBg }]}>
            <View style={styles.box13}>
              <View style={[styles.box14, { backgroundColor: vm.verdictFg }]}>
                <SvgXml xml={art.verdictArt(vm.verdictOk)} width={15} height={15} />
              </View>
              <Text style={[styles.text6, { color: vm.verdictFg }]}>{vm.verdict}</Text>
            </View>
            <Text style={styles.text8}>
              {vm.whyA}
              <Text style={styles.text7}>{vm.whyB}</Text>
              {vm.whyC}
            </Text>
            <View style={styles.box15}>
              <Pressable
                style={styles.link2}
                onPress={() => router.push("/lesson-player")}
                accessibilityRole="link"
                accessibilityLabel="Watch the lesson on this rule"
              >
                <View style={styles.box16}>
                  <SvgXml xml={art.art11} width={14} height={14} />
                </View>
                <Text style={styles.label4}>{s.lesson}</Text>
              </Pressable>
              <Pressable style={styles.button5} onPress={vm.next} accessibilityRole="button">
                <Text style={styles.label5}>{s.nextTicket}</Text>
                <View style={styles.box17}>
                  <SvgXml xml={art.art12} width={18} height={18} />
                </View>
              </Pressable>
            </View>
          </View>
        </>
      ) : null}
    </ScreenFrame>
  );
}
