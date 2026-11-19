import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useNotifAllowViewModel } from "../hooks/useNotifAllowViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/notifAllow.art";
import { strings } from "../strings";

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

const styles = StyleSheet.create({
  section: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 390,
    height: 400,
    overflow: "hidden",
    backgroundImage: "linear-gradient(160deg, #FFD266 0%, #FFB200 55%, #F2A100 100%)",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box: {
    position: "absolute",
    left: 0,
    top: 100,
    right: 0,
  },
  label: {
    fontFamily: font.manrope[800],
    color: "rgba(10,14,46,0.7)",
    fontSize: 14,
    textAlign: "center",
  },
  box2: {
    position: "absolute",
    left: 0,
    top: 118,
    right: 0,
  },
  label2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 56,
    letterSpacing: -2,
    lineHeight: 64,
    textAlign: "center",
  },
  box3: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  box4: {
    flexDirection: "row",
    position: "absolute",
    left: "50%",
    top: 196,
    width: 310,
    zIndex: 3,
    padding: 12,
    marginLeft: -155,
    gap: 12,
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    boxShadow: "0 18px 34px -18px rgba(10,14,46,0.45)",
    opacity: 1.0,
    transform: "scale(1)",
  },
  image: {
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: 10,
  },
  box5: {
    flexDirection: "column",
    minWidth: 0,
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  box6: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  text: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 13,
  },
  text2: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 11,
  },
  text3: {
    fontFamily: font.manrope[600],
    color: "#3A4270",
    fontSize: 13,
    lineHeight: 17.55,
  },
  box7: {
    flexDirection: "row",
    position: "absolute",
    left: "50%",
    top: 290,
    width: 310,
    zIndex: 3,
    padding: 12,
    marginLeft: -155,
    gap: 12,
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    boxShadow: "0 18px 34px -18px rgba(10,14,46,0.45)",
    opacity: 1.0,
    transform: "scale(1)",
  },
  box8: {
    position: "absolute",
    left: "50%",
    top: 300,
    width: 290,
    height: 80,
    zIndex: 2,
    marginLeft: -145,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
  },
  box9: {
    position: "absolute",
    left: "50%",
    top: 310,
    width: 266,
    height: 80,
    zIndex: 1,
    marginLeft: -133,
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 20,
  },
  link: {
    flexDirection: "row",
    position: "absolute",
    top: 54,
    right: 20,
    width: 44,
    height: 44,
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 22,
  },
  box10: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    top: 424,
    width: 350,
    gap: 24,
  },
  box11: {
    flexDirection: "column",
    gap: 8,
  },
  text4: {
    color: "#0E1C91",
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 28,
    letterSpacing: -0.9,
    lineHeight: 30.8,
  },
  text5: {
    fontFamily: font.manrope[600],
    color: "#566086",
    fontSize: 15,
    lineHeight: 21.75,
  },
  box12: {
    flexDirection: "column",
    gap: 12,
  },
  box13: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  box14: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundImage: "linear-gradient(145deg, #F4F6FF 0%, #E3E8FF 100%)",
    borderRadius: 16,
    boxShadow: "inset 0 0 0 1px rgba(14,28,145,0.05)",
  },
  box15: {
    flexDirection: "column",
    gap: 4,
  },
  text6: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 15,
    lineHeight: 18,
  },
  text7: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 13,
    lineHeight: 16.9,
  },
  box16: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    top: 704,
    width: 350,
    gap: 8,
  },
  button: {
    flexDirection: "row",
    height: 60,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "radial-gradient(120% 140% at 0% 0%, #2638DA 0%, #0E1C91 60%, #08106A 100%)",
    borderRadius: 30,
    boxShadow: "0 14px 24px -14px rgba(14,28,145,0.7)",
  },
  label3: {
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 16,
  },
  link2: {
    flexDirection: "row",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  label4: {
    fontFamily: font.manrope[800],
    color: "#566086",
    fontSize: 14,
    textDecorationLine: "none",
  },
  box17: {
    flexDirection: "row",
    position: "absolute",
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(10,14,46,0.4)",
  },
  allowNotificationsBox: {
    width: 270,
    overflow: "hidden",
    backgroundColor: "rgba(242,242,247,0.97)",
    borderRadius: 16,
  },
  box18: {
    flexDirection: "column",
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    gap: 4,
  },
  text8: {
    fontFamily: font.manrope[600],
    color: "#000000",
    fontSize: 17,
    lineHeight: 22.1,
    textAlign: "center",
  },
  text9: {
    fontFamily: font.manrope[500],
    color: "#000000",
    fontSize: 13,
    lineHeight: 17.55,
    textAlign: "center",
  },
  box19: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(60,60,67,0.36)",
  },
  link3: {
    flexDirection: "row",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderRightWidth: 0.5,
    borderRightColor: "rgba(60,60,67,0.36)",
  },
  label5: {
    fontFamily: font.manrope[500],
    color: "#007AFF",
    fontSize: 17,
    textAlign: "center",
    textDecorationLine: "none",
  },
  link4: {
    flexDirection: "row",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  label6: {
    fontFamily: font.manrope[600],
    color: "#007AFF",
    fontSize: 17,
    textAlign: "center",
    textDecorationLine: "none",
  },
});
