import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useNotifications2ViewModel } from "../hooks/useNotifications2ViewModel";
import { SvgXml } from "react-native-svg";
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
import { styles } from "./Notifications2Screen.styles";

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
                <Text numberOfLines={1} style={styles.text6}>
                  {vm.notifTitle}
                </Text>
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
