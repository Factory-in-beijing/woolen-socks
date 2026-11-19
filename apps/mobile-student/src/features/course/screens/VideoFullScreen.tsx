import { Pressable, StyleSheet, Text, View } from "react-native";
import { Fragment } from "react";
import { useRef } from "react";
import { useRouter } from "expo-router";
import { useVideoFullViewModel } from "../hooks/useVideoFullViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/videoFull.art";
import { strings } from "../strings";

const s = strings.videoFull;

export function VideoFullScreen() {
  const router = useRouter();
  const vm = useVideoFullViewModel();
  const barWidth = useRef(0);
  return (
    <ScreenFrame background="#060B4A" width={844} height={390}>
      <SvgXml xml={art.art1} width={844} height={390} style={styles.artBox} />
      <Pressable
        style={[styles.button, { backgroundColor: vm.scrim }]}
        onPress={vm.toggleUi}
        accessibilityRole="button"
        accessibilityLabel={vm.uiLabel}
      />
      {vm.ui ? (
        <>
          <View style={styles.box}>
            <View style={styles.box2}>
              <Pressable
                style={styles.link}
                onPress={() => router.push("/lesson-player")}
                accessibilityRole="link"
                accessibilityLabel="Exit full screen"
              >
                <SvgXml xml={art.art2} width={19} height={19} />
              </Pressable>
              <View style={styles.box3}>
                <Text style={styles.text}>{s.lesson2Module3}</Text>
                <Text style={styles.text2}>{s.extraLightSections}</Text>
              </View>
              <Pressable
                style={styles.button2}
                onPress={vm.speedUp}
                accessibilityRole="button"
                accessibilityLabel={`Playback speed ${vm.speed}`}
              >
                <Text style={styles.label}>{vm.speed}</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button3,
                  { borderWidth: 1, borderColor: vm.chBorder, backgroundColor: vm.chBg },
                ]}
                onPress={vm.toggleCh}
                accessibilityRole="button"
              >
                <SvgXml xml={art.art3} width={16} height={16} />
                <Text style={[styles.label2, { color: vm.chFg }]}>{s.chapters}</Text>
              </Pressable>
            </View>
            <View style={[styles.box4, { right: vm.centerRight }]}>
              <Pressable
                style={styles.button4}
                onPress={vm.back10}
                accessibilityRole="button"
                accessibilityLabel="Back 10 seconds"
              >
                <SvgXml xml={art.art4} width={24} height={24} />
              </Pressable>
              <Pressable
                style={styles.button5}
                onPress={vm.toggle}
                accessibilityRole="button"
                accessibilityLabel={vm.playLabel}
              >
                <SvgXml xml={art.art5} width={30} height={30} style={{ display: vm.playShow }} />
                <SvgXml xml={art.art6} width={30} height={30} style={{ display: vm.pauseShow }} />
              </Pressable>
              <Pressable
                style={styles.button4}
                onPress={vm.fwd10}
                accessibilityRole="button"
                accessibilityLabel="Forward 10 seconds"
              >
                <SvgXml xml={art.art7} width={24} height={24} />
              </Pressable>
            </View>
            <View style={[styles.box5, { right: vm.barRight }]}>
              <View style={styles.box6}>
                <View style={styles.box7}>
                  <Text style={styles.label3}>{`${vm.chNum}/${vm.chapters.length}`}</Text>
                </View>
                <Text style={styles.text3}>{vm.chTitle}</Text>
              </View>
              <Pressable
                style={styles.button6}
                onLayout={(event) => {
                  barWidth.current = event.nativeEvent.layout.width;
                }}
                onPress={(event) =>
                  vm.seekFraction(event.nativeEvent.locationX / (barWidth.current || 1))
                }
                accessibilityRole="button"
                accessibilityLabel="Lesson position"
              >
                <View style={styles.box8}>
                  <View style={[styles.box9, { width: `${vm.percent}%` }]} />
                  <View style={styles.box10} />
                  <View style={styles.box11} />
                </View>
                <View style={[styles.box12, { left: `${vm.percent}%`, marginLeft: -8 }]} />
              </Pressable>
              <View style={styles.box13}>
                <Text style={styles.text5}>
                  {vm.tLabel} <Text style={styles.text4}>{`/ ${vm.lenLabel}`}</Text>
                </Text>
                <Pressable
                  style={styles.link2}
                  onPress={() => router.push("/lesson-player")}
                  accessibilityRole="link"
                >
                  <Text style={styles.text6}>{s.next}</Text>
                  <Text style={styles.label4}>{s.controlledIntersections}</Text>
                  <View style={styles.box14}>
                    <SvgXml xml={art.art8} width={13} height={13} />
                  </View>
                </Pressable>
              </View>
            </View>
            {vm.chaptersOpen ? (
              <>
                <View style={styles.chaptersBox}>
                  {vm.chapters.map((c, index) => (
                    <Fragment key={index}>
                      <Pressable
                        style={[styles.button7, { backgroundColor: c.bg }]}
                        onPress={c.go}
                        accessibilityRole="button"
                      >
                        <View style={[styles.box15, { backgroundColor: c.numBg }]}>
                          <Text style={[styles.label5, { color: c.numFg }]}>{c.n}</Text>
                        </View>
                        <View style={styles.box3}>
                          <Text style={styles.text7}>{c.title}</Text>
                          <Text style={styles.text8}>{c.at}</Text>
                        </View>
                      </Pressable>
                    </Fragment>
                  ))}
                </View>
              </>
            ) : null}
          </View>
        </>
      ) : null}
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  button: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
  },
  box: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  box2: {
    flexDirection: "row",
    position: "absolute",
    left: 56,
    top: 20,
    right: 56,
    height: 44,
    gap: 12,
    alignItems: "center",
  },
  link: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: "rgba(10,14,46,0.38)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 22,
  },
  box3: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text: {
    fontFamily: font.manrope[800],
    color: "#FFB200",
    fontSize: 11,
    letterSpacing: 0.5,
    lineHeight: 11,
    textTransform: "uppercase",
  },
  text2: {
    overflow: "hidden",
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
    letterSpacing: -0.3,
    lineHeight: 19.2,
  },
  button2: {
    height: 36,
    minWidth: 56,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 14,
    backgroundColor: "rgba(10,14,46,0.38)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 18,
  },
  label: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 13,
  },
  button3: {
    flexDirection: "row",
    height: 36,
    paddingTop: 0,
    paddingRight: 14,
    paddingBottom: 0,
    paddingLeft: 14,
    gap: 8,
    alignItems: "center",
    borderRadius: 18,
  },
  label2: {
    fontFamily: font.manrope[800],
    fontSize: 13,
  },
  box4: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    top: 155,
    gap: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  button4: {
    flexDirection: "row",
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(10,14,46,0.38)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 28,
  },
  button5: {
    flexDirection: "row",
    width: 80,
    height: 80,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E1C91",
    borderRadius: 40,
    boxShadow: "0 0 0 10px rgba(255,255,255,0.12), 0 18px 30px -12px rgba(0,0,0,0.5)",
  },
  box5: {
    flexDirection: "column",
    position: "absolute",
    left: 56,
    bottom: 20,
    gap: 10,
  },
  box6: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  box7: {
    flexDirection: "row",
    height: 22,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 8,
    alignItems: "center",
    backgroundColor: "rgba(255,178,0,0.18)",
    borderRadius: 11,
  },
  label3: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFB200",
    fontSize: 12,
  },
  text3: {
    overflow: "hidden",
    fontFamily: font.manrope[700],
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
  },
  button6: {
    flexDirection: "row",
    position: "relative",
    height: 20,
    padding: 0,
    alignItems: "center",
  },
  box8: {
    position: "relative",
    height: 6,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.24)",
    borderRadius: 3,
  },
  box9: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 6,
    backgroundColor: "#0e1c91",
  },
  box10: {
    position: "absolute",
    left: "31.73%",
    top: 0,
    width: 3,
    height: 6,
    marginLeft: -1.5,
    backgroundColor: "rgba(10,14,46,0.9)",
  },
  box11: {
    position: "absolute",
    left: "65.38%",
    top: 0,
    width: 3,
    height: 6,
    marginLeft: -1.5,
    backgroundColor: "rgba(10,14,46,0.9)",
  },
  box12: {
    position: "absolute",
    width: 16,
    height: 16,
    backgroundColor: "#ffb200",
    borderRadius: 8,
    boxShadow: "0 0 0 5px rgba(255,178,0,0.35), 0 2px 6px rgba(0,0,0,0.35)",
  },
  box13: {
    flexDirection: "row",
    height: 32,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text4: {
    color: "rgba(255,255,255,0.5)",
  },
  text5: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 14,
  },
  link2: {
    flexDirection: "row",
    height: 32,
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 14,
    gap: 8,
    alignItems: "center",
    backgroundColor: "rgba(10,14,46,0.38)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 16,
  },
  text6: {
    fontFamily: font.manrope[800],
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    textDecorationLine: "none",
  },
  label4: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 12,
    textDecorationLine: "none",
  },
  box14: {
    flexDirection: "row",
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB200",
    borderRadius: 11,
  },
  chaptersBox: {
    flexDirection: "column",
    position: "absolute",
    top: 76,
    right: 56,
    bottom: 20,
    width: 260,
    padding: 8,
    gap: 4,
    backgroundColor: "rgba(10,14,46,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    borderRadius: 24,
  },
  button7: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    alignItems: "flex-start",
    borderRadius: 16,
  },
  box15: {
    flexDirection: "row",
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: 13,
  },
  label5: {
    fontFamily: font.spaceGrotesk[700],
    fontSize: 12,
    textAlign: "left",
  },
  text7: {
    fontFamily: font.manrope[700],
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 16.9,
    textAlign: "left",
  },
  text8: {
    fontFamily: font.spaceGrotesk[700],
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
    textAlign: "left",
  },
});
