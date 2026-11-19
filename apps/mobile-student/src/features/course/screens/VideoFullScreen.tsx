import { Pressable, Text, View } from "react-native";
import { Fragment } from "react";
import { useRef } from "react";
import { useRouter } from "expo-router";
import { useVideoFullViewModel } from "../hooks/useVideoFullViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/videoFull.art";
import { strings } from "../strings";
import { styles } from "./VideoFullScreen.styles";

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
                <Text numberOfLines={1} style={styles.text2}>
                  {s.extraLightSections}
                </Text>
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
                <Text numberOfLines={1} style={styles.text3}>
                  {vm.chTitle}
                </Text>
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
