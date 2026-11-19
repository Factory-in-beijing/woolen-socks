import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { usePayCardViewModel } from "../hooks/usePayCardViewModel";
import { SvgXml } from "react-native-svg";
import { font } from "@/theme/fonts";
import { formatGel } from "@/lib/money";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/payCard.art";
import { strings } from "../strings";

const s = strings.payCard;

export function PayCardScreen() {
  const router = useRouter();
  const vm = usePayCardViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push("/get-course")}
          accessibilityRole="link"
          accessibilityLabel="Back to Get the course"
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.addACard}</Text>
        <View style={styles.box} />
      </View>
      <View style={styles.section}>
        <SvgXml xml={art.art2} width={350} height={200} style={styles.artBox} />
        <View style={styles.box2} />
        <View style={styles.box3}>
          <SvgXml xml={art.art3} width={40} height={30} />
          <SvgXml xml={art.art4} width={24} height={24} />
        </View>
        <View style={[styles.numariaBox, { backgroundColor: vm.pvNumBg }]}>
          {vm.slots.map((entry, index) => (
            <Fragment key={index}>
              <View style={[styles.box4, { marginRight: entry.gap }]}>
                {entry.filled ? (
                  <>
                    <Text style={styles.text2}>{entry.ch}</Text>
                  </>
                ) : null}
                {entry.empty ? (
                  <>
                    <Text style={styles.text3}>{s.text}</Text>
                  </>
                ) : null}
              </View>
            </Fragment>
          ))}
        </View>
        <View style={styles.box5}>
          <View style={styles.box6}>
            <View style={[styles.box7, { backgroundColor: vm.pvNameBg }]}>
              <Text style={styles.text4}>{s.cardHolder}</Text>
              <Text style={[styles.text5, { opacity: vm.pvNameOpacity }]}>{vm.pvName}</Text>
            </View>
            <View style={[styles.box8, { backgroundColor: vm.pvExpBg }]}>
              <Text style={styles.text4}>{s.expires}</Text>
              <Text style={[styles.text6, { opacity: vm.pvExpOpacity }]}>{vm.pvExp}</Text>
            </View>
          </View>
          <SvgXml xml={art.art5} width={52} height={17} style={{ display: vm.cVisa }} />
          <SvgXml xml={art.art6} width={38} height={24} style={{ display: vm.cMc }} />
          <SvgXml xml={art.art7} width={24} height={24} style={{ display: vm.cGen }} />
        </View>
      </View>
      <View style={styles.section2}>
        <View style={[styles.box9, { ...vm.numBorder, boxShadow: vm.numRing }]}>
          <View style={styles.box10}>
            <Text style={[styles.text7, { color: vm.numLabel }]}>{s.cardNumber}</Text>
            <TextInput
              style={styles.input}
              placeholder={s.n0000000000000000}
              placeholderTextColor="#A2A9C8"
              value={vm.numVal}
              onChangeText={vm.numSet}
              keyboardType="number-pad"
              onFocus={vm.numFocus}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <SvgXml xml={art.art8} width={44} height={14} style={{ display: vm.fVisa }} />
          <SvgXml xml={art.art9} width={34} height={21} style={{ display: vm.fMc }} />
          <SvgXml xml={art.art10} width={24} height={24} style={{ display: vm.fGen }} />
        </View>
        <View style={styles.box11}>
          <View style={[styles.box12, { ...vm.expBorder, boxShadow: vm.expRing }]}>
            <View style={styles.box10}>
              <Text style={[styles.text7, { color: vm.expLabel }]}>{s.expiry}</Text>
              <TextInput
                style={styles.input}
                placeholder={s.mmYy}
                placeholderTextColor="#A2A9C8"
                value={vm.expVal}
                onChangeText={vm.expSet}
                keyboardType="number-pad"
                onFocus={vm.expFocus}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={[styles.box12, { ...vm.cvcBorder, boxShadow: vm.cvcRing }]}>
            <View style={styles.box10}>
              <Text style={[styles.text7, { color: vm.cvcLabel }]}>{s.cvc}</Text>
              <TextInput
                style={styles.input}
                placeholder={s.text2}
                placeholderTextColor="#A2A9C8"
                value={vm.cvcVal}
                onChangeText={vm.cvcSet}
                keyboardType="number-pad"
                onFocus={vm.cvcFocus}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <SvgXml xml={art.art11} width={28} height={20} />
          </View>
        </View>
        <View style={[styles.box9, { ...vm.nameBorder, boxShadow: vm.nameRing }]}>
          <View style={styles.box10}>
            <Text style={[styles.text7, { color: vm.nameLabel }]}>{s.nameOnCard}</Text>
            <TextInput
              style={styles.input2}
              placeholder={s.asWrittenOnThe}
              placeholderTextColor="#A2A9C8"
              value={vm.nameVal}
              onChangeText={vm.nameSet}
              onFocus={vm.nameFocus}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={vm.saveTap}
          accessibilityRole="button"
          accessibilityLabel="Save card for next time"
        >
          <View style={styles.box13}>
            <Text style={styles.text8}>{s.saveCardForNext}</Text>
            <Text style={styles.text9}>{s.payInOneTap}</Text>
          </View>
          <View
            style={[
              styles.box14,
              { backgroundColor: vm.saveTrack, justifyContent: vm.saveJustify },
            ]}
          >
            <View style={styles.box15} />
          </View>
        </Pressable>
      </View>
      <View style={styles.box16}>
        <View style={styles.box17}>
          <SvgXml xml={art.art12} width={14} height={14} />
          <Text style={styles.label}>{s.encryptedConfirmedByYour}</Text>
        </View>
        <Pressable
          style={[styles.link2, { opacity: vm.payOpacity }]}
          onPress={() => router.push("/pay-success")}
          disabled={!vm.complete}
          accessibilityRole="link"
        >
          <Text style={styles.text11}>
            {s.pay} <Text style={styles.text10}>{formatGel(vm.price)}</Text>
          </Text>
          <View style={styles.box18}>
            <SvgXml xml={art.art13} width={18} height={18} />
          </View>
        </Pressable>
      </View>
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
  section: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    top: 114,
    width: 350,
    height: 200,
    padding: 20,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundImage: "linear-gradient(135deg, #2638DA 0%, #0E1C91 55%, #08106A 100%)",
    borderRadius: 24,
  },
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box2: {
    position: "absolute",
    left: 0,
    top: -40,
    width: 60,
    height: 300,
    backgroundImage:
      "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.14), rgba(255,255,255,0))",
  },
  box3: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numariaBox: {
    flexDirection: "row",
    position: "relative",
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    marginLeft: -8,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  box4: {
    width: 14,
  },
  text2: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 22,
    letterSpacing: 1,
    lineHeight: 26.4,
    textAlign: "center",
  },
  text3: {
    opacity: 0.35,
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 22,
    letterSpacing: 1,
    lineHeight: 26.4,
    textAlign: "center",
  },
  box5: {
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  box6: {
    flexDirection: "row",
    minWidth: 0,
    flexShrink: 1,
    gap: 24,
  },
  box7: {
    flexDirection: "column",
    maxWidth: 170,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    marginTop: -4,
    marginRight: -8,
    marginBottom: -4,
    marginLeft: -8,
    gap: 4,
    borderRadius: 10,
  },
  text4: {
    fontFamily: font.manrope[800],
    color: "rgba(255,255,255,0.6)",
    fontSize: 9,
    letterSpacing: 1,
  },
  text5: {
    overflow: "hidden",
    fontFamily: font.manrope[800],
    color: "#FFFFFF",
    fontSize: 13,
    letterSpacing: 0.6,
  },
  box8: {
    flexDirection: "column",
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    marginTop: -4,
    marginRight: -8,
    marginBottom: -4,
    marginLeft: -8,
    gap: 4,
    borderRadius: 10,
  },
  text6: {
    fontFamily: font.spaceGrotesk[700],
    color: "#FFFFFF",
    fontSize: 13,
  },
  section2: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    top: 338,
    width: 350,
    gap: 12,
  },
  box9: {
    flexDirection: "row",
    position: "relative",
    height: 60,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
  },
  box10: {
    flexDirection: "column",
    minWidth: 0,
    gap: 6,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text7: {
    fontFamily: font.manrope[800],
    fontSize: 11,
    letterSpacing: 0.3,
    lineHeight: 11,
  },
  input: {
    width: "100%",
    height: 22,
    minWidth: 0,
    padding: 0,
    margin: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    fontFamily: font.spaceGrotesk[700],
    color: "#0A0E2E",
    fontSize: 17,
    letterSpacing: 0.5,
  },
  box11: {
    flexDirection: "row",
    gap: 12,
  },
  box12: {
    flexDirection: "row",
    position: "relative",
    height: 60,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    gap: 12,
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
  },
  input2: {
    width: "100%",
    height: 22,
    minWidth: 0,
    padding: 0,
    margin: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    fontFamily: font.manrope[700],
    color: "#0A0E2E",
    fontSize: 16,
    textTransform: "uppercase",
  },
  button: {
    flexDirection: "row",
    height: 48,
    paddingTop: 0,
    paddingRight: 4,
    paddingBottom: 0,
    paddingLeft: 4,
    gap: 12,
    alignItems: "center",
  },
  box13: {
    flexDirection: "column",
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text8: {
    fontFamily: font.manrope[800],
    color: "inherit",
    fontSize: 14,
    lineHeight: 16.8,
    textAlign: "left",
  },
  text9: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 14.4,
    textAlign: "left",
  },
  box14: {
    flexDirection: "row",
    width: 48,
    height: 28,
    padding: 3,
    flexShrink: 0,
    borderRadius: 14,
  },
  box15: {
    width: 22,
    height: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 11,
    boxShadow: "0 1px 3px rgba(10,14,46,0.3)",
  },
  box16: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
    gap: 12,
  },
  box17: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: font.manrope[700],
    color: "#8A93B8",
    fontSize: 12,
  },
  link2: {
    flexDirection: "row",
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
  text10: {
    fontFamily: font.spaceGrotesk[700],
  },
  text11: {
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 16,
    textDecorationLine: "none",
  },
  box18: {
    flexDirection: "row",
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E2E",
    borderRadius: 22,
  },
});
