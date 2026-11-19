import { Pressable, Text, TextInput, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import { usePayCardViewModel } from "../hooks/usePayCardViewModel";
import { SvgXml } from "react-native-svg";
import { formatGel } from "@/lib/money";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/payCard.art";
import { strings } from "../strings";
import { styles } from "./PayCardScreen.styles";

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
              <Text numberOfLines={1} style={[styles.text5, { opacity: vm.pvNameOpacity }]}>
                {vm.pvName}
              </Text>
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
              style={[styles.input2, vm.nameVal ? null : styles.placeholderCase]}
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
