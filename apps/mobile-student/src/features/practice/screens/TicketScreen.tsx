import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { useTicketViewModel } from "../hooks/useTicketViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/ticket.art";
import { TOPIC_ICONS } from "../art/topicIcons";
import { SIGN_1_16 } from "../art/signScene";
import { strings } from "../strings";

const s = strings.ticket;

// The sign artwork is 649 x 576; it is shown 140px tall, centred in the picture area.
const SIGN_HEIGHT = 140;
const SIGN_WIDTH = Math.round((SIGN_HEIGHT * 649) / 576);

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
            <Text style={styles.text4}>{vm.tTopic}</Text>
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

const styles = StyleSheet.create({
  button: {
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
  box: {
    flexDirection: "column",
    position: "absolute",
    left: 76,
    top: 54,
    right: 76,
    height: 44,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#8A93B8",
  },
  text2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 18,
    letterSpacing: -0.4,
  },
  text3: {
    fontFamily: font.manrope[700],
    color: "#566086",
    fontSize: 11,
  },
  button2: {
    flexDirection: "row",
    position: "absolute",
    top: 54,
    right: 20,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
  },
  posOfTotalTicketsBox: {
    position: "absolute",
    left: 20,
    top: 114,
    right: 20,
    height: 6,
    backgroundColor: "#E4E8F8",
    borderRadius: 3,
  },
  box2: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 6,
    backgroundColor: "#0E1C91",
    borderRadius: 3,
  },
  box3: {
    position: "absolute",
    top: "50%",
    width: 14,
    height: 14,
    backgroundColor: "#FFB200",
    borderWidth: 3,
    borderColor: "#F6F7FD",
    borderRadius: 7,
    boxShadow: "0 0 0 1.500px #FFB200",
    transform: "translate(-50%, -50%)",
  },
  boxContent: {
    paddingTop: 0,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    gap: 16,
  },
  box4: {
    position: "absolute",
    left: 0,
    top: 136,
    right: 0,
    height: 608,
  },
  box5: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    flexShrink: 0,
  },
  box6: {
    flexDirection: "row",
    width: 40,
    height: 34,
    paddingTop: 0,
    paddingRight: 11,
    paddingBottom: 0,
    paddingLeft: 11,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#0E1C91",
    borderRadius: 15,
  },
  label: {
    fontFamily: font.spaceGrotesk[700],
    color: "#ffffff",
    fontSize: 15,
  },
  box7: {
    flexDirection: "row",
    width: 256,
    height: 34,
    minWidth: 0,
    flexShrink: 1,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 4,
    gap: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 15,
  },
  artBox2: {
    flexShrink: 0,
  },
  text4: {
    overflow: "hidden",
    fontFamily: font.manrope[700],
    color: "#3A4266",
    fontSize: 12,
  },
  box8: {
    position: "relative",
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: 20,
    boxShadow: "0 10px 24px rgba(14,28,145,0.08)",
  },
  artBox3: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  signScene: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -SIGN_WIDTH / 2,
    marginTop: -SIGN_HEIGHT / 2,
    filter: "drop-shadow(0 6px 10px rgba(10,14,46,0.14))",
  },
  title: {
    marginTop: 0,
    marginRight: 2,
    marginBottom: 0,
    marginLeft: 2,
    flexShrink: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 18,
    letterSpacing: -0.3,
    lineHeight: 24.3,
  },
  answersBox: {
    flexDirection: "column",
    gap: 8,
    flexShrink: 0,
  },
  button3: {
    flexDirection: "row",
    minHeight: 58,
    paddingTop: 8,
    paddingRight: 14,
    paddingBottom: 8,
    paddingLeft: 8,
    gap: 12,
    alignItems: "center",
    borderRadius: 20,
  },
  box9: {
    flexDirection: "row",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 14,
  },
  label2: {
    fontFamily: font.spaceGrotesk[700],
    fontSize: 15,
    textAlign: "left",
  },
  box10: {
    flexGrow: 1,
  },
  label3: {
    fontFamily: font.manrope[500],
    color: "#0A0E2E",
    fontSize: 14,
    lineHeight: 18.9,
    textAlign: "left",
  },
  button4: {
    flexDirection: "row",
    position: "absolute",
    left: 88,
    right: 20,
    bottom: 24,
    height: 60,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffb200",
    borderWidth: 1.5,
    borderColor: "#E2E6F6",
    borderRadius: 30,
  },
  text5: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
  },
  box11: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F3FB",
    borderRadius: 22,
  },
  box12: {
    flexDirection: "column",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 24,
    paddingLeft: 20,
    gap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: "0 -12px 30px rgba(14,28,145,0.1)",
  },
  box13: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  box14: {
    flexDirection: "row",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  text6: {
    fontFamily: font.manrope[800],
    fontSize: 18,
    letterSpacing: -0.4,
  },
  text7: {
    color: "#0A0E2E",
  },
  text8: {
    fontFamily: font.manrope[600],
    color: "#3A4266",
    fontSize: 13,
    lineHeight: 19.5,
  },
  box15: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
    alignItems: "center",
  },
  link2: {
    flexDirection: "row",
    height: 60,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 8,
    gap: 8,
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
  },
  box16: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E1C91",
    borderRadius: 22,
  },
  label4: {
    fontFamily: font.manrope[800],
    color: "#0E1C91",
    fontSize: 13,
    textDecorationLine: "none",
  },
  button5: {
    flexDirection: "row",
    height: 60,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 22,
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#0e1c91",
    borderRadius: 30,
    boxShadow: "0 12px 26px rgba(14,28,145,0.18)",
  },
  label5: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
  },
  box17: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffb200",
    borderRadius: 22,
  },
});
