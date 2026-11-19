import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useOfflineViewModel } from "../hooks/useOfflineViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/offline.art";
import { strings } from "../strings";
import { styles } from "./OfflineScreen.styles";

const s = strings.offline;

export function OfflineScreen() {
  const router = useRouter();
  const vm = useOfflineViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/home")}
          accessibilityRole="link"
          accessibilityLabel="Back"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <View style={styles.box}>
          <Text style={styles.label}>{s.myCourse}</Text>
        </View>
        <View style={styles.box2} />
      </View>
      <View style={styles.box3}>
        <View style={styles.box4}>
          <View style={styles.box5} />
          <View style={styles.box6} />
          <View style={styles.box7}>
            <SvgXml xml={art.art2} width={100} height={100} />
          </View>
          <View style={styles.box8}>
            <SvgXml xml={art.art3} width={44} height={44} />
          </View>
          <View style={styles.box9}>
            <SvgXml xml={art.art4} width={44} height={44} />
          </View>
        </View>
        <View style={styles.box10}>
          <Text style={styles.title}>{s.youreOffline}</Text>
          <Text style={styles.text}>{s.videosNeedTheInternet}</Text>
        </View>
      </View>
      <View style={styles.box11}>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/tickets")}
          accessibilityRole="link"
        >
          <View style={styles.box12}>
            <View style={styles.box13}>
              <SvgXml xml={art.art5} width={32} height={32} />
            </View>
            <View style={styles.box14}>
              <Text style={styles.label2}>{s.worksOffline}</Text>
            </View>
          </View>
          <View style={styles.box15}>
            <Text style={styles.text2}>{s.tickets}</Text>
            <Text style={styles.text3}>{s.keepPractising}</Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/road-signs-v3")}
          accessibilityRole="link"
        >
          <View style={styles.box12}>
            <View style={styles.box13}>
              <SvgXml xml={art.art6} width={32} height={32} />
            </View>
            <View style={styles.box14}>
              <Text style={styles.label2}>{s.worksOffline}</Text>
            </View>
          </View>
          <View style={styles.box15}>
            <Text style={styles.text2}>{s.roadSigns}</Text>
            <Text style={styles.text3}>{s.learnAndQuiz}</Text>
          </View>
        </Pressable>
      </View>
      <Pressable style={styles.button} onPress={vm.retry} accessibilityRole="button">
        <Text style={styles.text4}>{vm.retryLabel}</Text>
        <View style={styles.box16}>
          <View style={styles.box17}>
            <SvgXml xml={art.art7} width={18} height={18} />
          </View>
        </View>
      </Pressable>
      {vm.failed ? (
        <>
          <View style={styles.box18}>
            <Text style={styles.label3}>{s.stillNoConnectionCheck}</Text>
          </View>
        </>
      ) : null}
    </ScreenFrame>
  );
}
