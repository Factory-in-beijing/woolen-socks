import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/mistakesEmpty.art";
import { strings } from "../strings";
import { styles } from "./MistakesEmptyScreen.styles";

const s = strings.mistakesEmpty;

export function MistakesEmptyScreen() {
  const router = useRouter();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/tickets")}
          accessibilityRole="link"
          accessibilityLabel="Back"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <View style={styles.box}>
          <Text style={styles.label}>{s.mistakes}</Text>
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
          <Text style={styles.title}>{s.nothingToFix}</Text>
          <Text style={styles.text}>{s.everyTicketAndSign}</Text>
        </View>
      </View>
      <View style={styles.box11}>
        <Text style={styles.text2}>{s.howItWorks}</Text>
        <View style={styles.box12}>
          <View style={styles.box13}>
            <Text style={styles.label2}>{s.n1}</Text>
          </View>
          <Text style={styles.text3}>{s.answerATicketOr}</Text>
        </View>
        <View style={styles.box12}>
          <View style={styles.box13}>
            <Text style={styles.label2}>{s.n2}</Text>
          </View>
          <Text style={styles.text3}>{s.getItRightTwice}</Text>
        </View>
        <View style={styles.box12}>
          <View style={styles.box13}>
            <Text style={styles.label2}>{s.n3}</Text>
          </View>
          <Text style={styles.text3}>{s.fewerMistakesHigherExam}</Text>
        </View>
      </View>
      <Pressable
        style={styles.link2}
        onPress={() => router.push("/tickets")}
        accessibilityRole="link"
      >
        <Text style={styles.text4}>{s.practiseTickets}</Text>
        <View style={styles.box14}>
          <SvgXml xml={art.art5} width={18} height={18} />
        </View>
      </Pressable>
    </ScreenFrame>
  );
}
