import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useNotifications2ViewModel } from "../hooks/useNotifications2ViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/notifications2.art";
import {
  DayButtons,
  PresetButtons,
  SegmentButtons,
  TopicCards,
  WheelColumn,
} from "../components/ReminderControls";
import { strings } from "../strings";

const s = strings.notifications2;

export function Notifications2Screen() {
  const router = useRouter();
  const vm = useNotifications2ViewModel();
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
        <Text style={styles.text}>{s.reminders}</Text>
        <View style={styles.box} />
      </View>
      <ScrollView style={styles.box2} showsVerticalScrollIndicator={false}>
        <View style={styles.box3}>
          <View style={styles.section}>
            <View style={styles.box4} />
            <View style={styles.box5} />
            <SvgXml xml={art.art2} width={350} height={296} style={styles.artBox} />
            <View style={styles.box6}>
              <SvgXml xml={art.art3} width={14} height={14} />
              <Text style={styles.label}>{s.dailyReminder}</Text>
            </View>
            <Pressable
              style={styles.button}
              onPress={vm.masterTap}
              accessibilityRole="button"
              accessibilityLabel="Daily reminder"
            >
              <Text style={styles.label2}>{vm.masterLabel}</Text>
              <View
                style={[
                  styles.box7,
                  { backgroundColor: vm.masterTrack, justifyContent: vm.masterJustify },
                ]}
              >
                <View style={[styles.box8, { backgroundColor: vm.masterKnob }]} />
              </View>
            </Pressable>
            <View style={[styles.box9, { opacity: vm.clockOpacity }]}>
              <Text style={styles.text2}>{vm.timeVal}</Text>
              <Text style={styles.text3}>{vm.heroDays}</Text>
            </View>
            <View style={styles.box10} />
            <Pressable
              style={[styles.button2, { opacity: vm.notifOpacity }]}
              onPress={vm.nextMsg}
              accessibilityRole="button"
              accessibilityLabel="Show another reminder message"
            >
              <Image
                source={{ uri: "/_blob/f765e42af9346c7392203a9f2b75f163" }}
                style={styles.image}
                accessibilityLabel=""
              />{" "}
              {/* TODO(img) provide asset */}
              <View style={styles.box11}>
                <View style={styles.box12}>
                  <Text style={styles.text4}>{"\n"}</Text>
                  <Text style={styles.text5}>{s.now}</Text>
                </View>
                <Text style={styles.text6}>{vm.notifTitle}</Text>
                <Text style={styles.text7}>{vm.notifBody}</Text>
              </View>
            </Pressable>
            <View style={styles.box13}>
              <View style={styles.box14}>
                <SvgXml xml={art.art4} width={14} height={14} />
                <Text style={styles.label3}>{s.aNewMessageEvery}</Text>
              </View>
              <Text style={styles.text8}>{vm.msgCount}</Text>
            </View>
          </View>
          <View
            style={[styles.box15, { opacity: vm.dim }]}
            pointerEvents={vm.controlsEnabled ? "auto" : "none"}
          >
            <View style={styles.section2}>
              <View style={styles.box16}>
                <Text style={styles.heading}>{s.time}</Text>
                <Text style={styles.text9}>{s.tapANumberTo}</Text>
              </View>
              <View style={styles.box17}>
                <View style={styles.box18}>
                  <View style={styles.box19} />
                  <WheelColumn label="Hour" cells={vm.hours} />
                  <View style={styles.box20}>
                    <Text style={styles.label7}>{s.text}</Text>
                  </View>
                  <WheelColumn label="Minute" cells={vm.minutes} />
                  <View style={styles.box21} />
                  <View style={styles.box22} />
                  <View style={styles.box23}>
                    <Text style={styles.label8}>{s.hr}</Text>
                  </View>
                  <View style={styles.box24}>
                    <Text style={styles.label8}>{s.min}</Text>
                  </View>
                </View>
                <PresetButtons presets={vm.presets} />
              </View>
            </View>
            <View style={styles.section2}>
              <View style={styles.box16}>
                <Text style={styles.heading}>{s.repeat}</Text>
                <Text style={[styles.text10, { color: vm.daysColor }]}>{vm.daysSummary}</Text>
              </View>
              <View style={styles.box26}>
                <SegmentButtons segments={vm.segments} />
                <DayButtons days={vm.dayCells} />
              </View>
            </View>
            <View style={styles.section2}>
              <View style={styles.box16}>
                <Text style={styles.heading}>{s.remindMeAbout}</Text>
                <Text style={styles.text9}>{vm.topicCount}</Text>
              </View>
              <TopicCards cards={vm.topicCards} />
            </View>
          </View>
          <View style={styles.box33}>
            <SvgXml xml={art.art15} width={14} height={14} />
            <Text style={styles.label11}>{s.oneReminderADay}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.box34} />
      <Pressable
        style={styles.link2}
        onPress={() => router.push("/account")}
        accessibilityRole="link"
      >
        <Text style={styles.label12}>{s.save}</Text>
        <View style={styles.box35}>
          <SvgXml xml={art.art16} width={18} height={18} />
        </View>
      </Pressable>
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
    left: 20,
    top: 114,
    width: 350,
    height: 630,
  },
  box3: {
    flexDirection: "column",
    paddingBottom: 16,
    gap: 32,
  },
  section: {
    position: "relative",
    height: 296,
    flexShrink: 0,
    overflow: "hidden",
    backgroundImage: "radial-gradient(120% 90% at 50% 0%, #FFD266 0%, #FFB200 55%, #F2A100 100%)",
    borderRadius: 32,
    boxShadow: "0 24px 40px -18px rgba(176,122,0,0.6)",
  },
  box4: {
    position: "absolute",
    left: 75,
    top: -24,
    width: 200,
    height: 200,
    borderWidth: 1.5,
    borderColor: "rgba(14,28,145,0.16)",
    borderRadius: 100,
  },
  box5: {
    position: "absolute",
    left: 75,
    top: -24,
    width: 200,
    height: 200,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.55)",
    borderRadius: 100,
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box6: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    top: 20,
    height: 32,
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.32)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 16,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 12,
    letterSpacing: 0.4,
  },
  button: {
    flexDirection: "row",
    position: "absolute",
    top: 20,
    right: 20,
    height: 32,
    paddingTop: 0,
    paddingRight: 3,
    paddingBottom: 0,
    paddingLeft: 12,
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.32)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 16,
  },
  label2: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 12,
  },
  box7: {
    flexDirection: "row",
    width: 44,
    height: 26,
    padding: 3,
    borderRadius: 13,
  },
  box8: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  box9: {
    flexDirection: "column",
    position: "absolute",
    left: 0,
    top: 72,
    right: 0,
    gap: 4,
    alignItems: "center",
  },
  text2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 64,
    letterSpacing: -2.5,
    lineHeight: 64,
  },
  text3: {
    fontFamily: font.manrope[700],
    color: "rgba(10,14,46,0.7)",
    fontSize: 13,
  },
  box10: {
    position: "absolute",
    left: 32,
    top: 184,
    width: 286,
    height: 76,
    backgroundColor: "rgba(14,28,145,0.28)",
    borderRadius: 20,
  },
  button2: {
    flexDirection: "row",
    position: "absolute",
    left: 16,
    top: 172,
    width: 318,
    height: 78,
    padding: 12,
    gap: 12,
    alignItems: "center",
    backgroundImage: "linear-gradient(135deg, #1A2CC4 0%, #0E1C91 60%, #0A1578 100%)",
    borderRadius: 20,
    boxShadow: "0 18px 30px -12px rgba(14,28,145,0.7)",
  },
  image: {
    width: 50,
    height: 44,
    flexShrink: 0,
    borderRadius: 12,
  },
  box11: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  box12: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text4: {
    fontFamily: font.manrope[800],
    color: "rgba(255,255,255,0.62)",
    fontSize: 12,
    letterSpacing: 0.2,
    textAlign: "left",
  },
  text5: {
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    textAlign: "left",
  },
  text6: {
    overflow: "hidden",
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 16.8,
    textAlign: "left",
  },
  text7: {
    overflow: "hidden",
    fontFamily: font.manrope[600],
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    lineHeight: 15.6,
    textAlign: "left",
  },
  box13: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 14,
    justifyContent: "space-between",
    alignItems: "center",
  },
  box14: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  label3: {
    fontFamily: font.manrope[700],
    color: "rgba(10,14,46,0.72)",
    fontSize: 12,
  },
  text8: {
    fontFamily: font.spaceGrotesk[700],
    color: "rgba(10,14,46,0.72)",
    fontSize: 12,
  },
  box15: {
    flexDirection: "column",
    gap: 32,
  },
  section2: {
    flexDirection: "column",
    gap: 12,
  },
  box16: {
    flexDirection: "row",
    height: 20,
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
  text9: {
    fontFamily: font.manrope[700],
    color: "#6B7396",
    fontSize: 13,
  },
  box17: {
    flexDirection: "column",
    padding: 16,
    gap: 16,
    backgroundColor: "#0A0E2E",
    borderRadius: 28,
    boxShadow: "0 20px 34px -20px rgba(10,14,46,0.7)",
  },
  box18: {
    flexDirection: "row",
    position: "relative",
    height: 200,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  box19: {
    position: "absolute",
    left: 0,
    top: 80,
    right: 0,
    height: 40,
    backgroundColor: "rgba(255,178,0,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,178,0,0.38)",
    borderRadius: 16,
  },
  box20: {
    position: "relative",
    paddingBottom: 4,
  },
  label7: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFB200",
    fontSize: 30,
  },
  box21: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    height: 56,
    backgroundImage: "linear-gradient(180deg, #0A0E2E 10%, rgba(10,14,46,0))",
    pointerEvents: "none",
  },
  box22: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
    backgroundImage: "linear-gradient(0deg, #0A0E2E 10%, rgba(10,14,46,0))",
    pointerEvents: "none",
  },
  box23: {
    position: "absolute",
    left: 12,
    top: 93,
  },
  label8: {
    fontFamily: font.manrope[800],
    color: "rgba(255,178,0,0.8)",
    fontSize: 11,
    letterSpacing: 0.6,
  },
  box24: {
    position: "absolute",
    top: 93,
    right: 12,
  },
  text10: {
    fontFamily: font.manrope[700],
    fontSize: 13,
  },
  box26: {
    flexDirection: "column",
    padding: 16,
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 28,
    boxShadow: "0 1px 2px rgba(14,28,145,0.04), 0 12px 28px -18px rgba(14,28,145,0.25)",
  },
  box33: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  label11: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 12,
  },
  box34: {
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
    bottom: 24,
    width: 350,
    height: 60,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 30,
    boxShadow: "0 14px 30px -12px rgba(176,122,0,0.6)",
  },
  label12: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    textDecorationLine: "none",
  },
  box35: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
});
