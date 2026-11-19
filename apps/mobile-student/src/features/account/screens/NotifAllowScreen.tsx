import { Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useNotifAllowViewModel } from "../hooks/useNotifAllowViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/notifAllow.art";
import { strings } from "../strings";
import { styles } from "./NotifAllowScreen.styles";

const s = strings.notifAllow;

export function NotifAllowScreen() {
  const router = useRouter();
  const vm = useNotifAllowViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.section}>
        <SvgXml xml={art.art1} width={390} height={400} style={styles.artBox} />
        <View style={styles.box}>
          <Text style={styles.label}>{s.monday16November}</Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.label2}>{s.n1900}</Text>
        </View>
        <View style={styles.box3}>
          <View style={styles.box4}>
            <Image
              source={{ uri: "/_blob/f765e42af9346c7392203a9f2b75f163" }}
              style={styles.image}
              accessibilityLabel=""
            />{" "}
            {/* TODO(img) provide asset */}
            <View style={styles.box5}>
              <View style={styles.box6}>
                <Text style={styles.text}>{s.timeToStudyNino}</Text>
                <Text style={styles.text2}>{s.now}</Text>
              </View>
              <Text style={styles.text3}>{s.controlledIntersectionsIsUp}</Text>
            </View>
          </View>
          <View style={styles.box7}>
            <Image
              source={{ uri: "/_blob/f765e42af9346c7392203a9f2b75f163" }}
              style={styles.image}
              accessibilityLabel=""
            />{" "}
            {/* TODO(img) provide asset */}
            <View style={styles.box5}>
              <View style={styles.box6}>
                <Text style={styles.text}>{s.n48TicketsToFix}</Text>
                <Text style={styles.text2}>{s.n2hAgo}</Text>
              </View>
              <Text style={styles.text3}>{s.theyAreWaitingIn}</Text>
            </View>
          </View>
          <View style={styles.box8} />
          <View style={styles.box9} />
        </View>
      </View>
      <Pressable
        style={styles.link}
        onPress={() => router.push("/account")}
        accessibilityRole="link"
        accessibilityLabel="Close"
      >
        <SvgXml xml={art.art2} width={18} height={18} />
      </Pressable>
      <View style={styles.box10}>
        <View style={styles.box11}>
          <Text style={styles.title}>
            {s.studyALittle} <Text style={styles.text4}>{s.everyDay}</Text>
          </Text>
          <Text style={styles.text5}>{s.shortRemindersHelpYou}</Text>
        </View>
        <View style={styles.box12}>
          <View style={styles.box13}>
            <View style={styles.box14}>
              <SvgXml xml={art.art3} width={35} height={35} />
            </View>
            <View style={styles.box15}>
              <Text style={styles.text6}>{s.atTheTimeYou}</Text>
              <Text style={styles.text7}>{s.pickTheHourAnd}</Text>
            </View>
          </View>
          <View style={styles.box13}>
            <View style={styles.box14}>
              <SvgXml xml={art.art4} width={35} height={35} />
            </View>
            <View style={styles.box15}>
              <Text style={styles.text6}>{s.yourNextLesson}</Text>
              <Text style={styles.text7}>{s.pickUpExactlyWhere}</Text>
            </View>
          </View>
          <View style={styles.box13}>
            <View style={styles.box14}>
              <SvgXml xml={art.art5} width={35} height={35} />
            </View>
            <View style={styles.box15}>
              <Text style={styles.text6}>{s.ticketsToFix}</Text>
              <Text style={styles.text7}>{s.aNudgeWhenMistakes}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.box16}>
        <Pressable style={styles.button} onPress={vm.ask} accessibilityRole="button">
          <SvgXml xml={art.art6} width={19} height={19} />
          <Text style={styles.label3}>{s.allowNotifications}</Text>
        </Pressable>
        <Pressable
          style={styles.link2}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
        >
          <Text style={styles.label4}>{s.notNow}</Text>
        </Pressable>
      </View>
      {vm.asking ? (
        <>
          <View style={styles.box17}>
            <View style={styles.allowNotificationsBox}>
              <View style={styles.box18}>
                <Text style={styles.text8}>{s.drivenetWouldLikeTo}</Text>
                <Text style={styles.text9}>{s.notificationsMayIncludeAlert}</Text>
              </View>
              <View style={styles.box19}>
                <Pressable
                  style={styles.link3}
                  onPress={() => router.push("/account")}
                  accessibilityRole="link"
                >
                  <Text style={styles.label5}>{s.dontAllow}</Text>
                </Pressable>
                <Pressable
                  style={styles.link4}
                  onPress={() => router.push("/notifications2")}
                  accessibilityRole="link"
                >
                  <Text style={styles.label6}>{s.allow}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </ScreenFrame>
  );
}
