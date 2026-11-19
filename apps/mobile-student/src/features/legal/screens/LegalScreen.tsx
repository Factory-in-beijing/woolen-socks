import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useLegalViewModel } from "../hooks/useLegalViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/legal.art";
import { strings } from "../strings";
import { styles } from "./LegalScreen.styles";

const s = strings.legal;

type LegalScreenProps = {
  /** Where the back button leads (sign-in flow or Account). */
  backRoute: string;
  backLabel: string;
};

export function LegalScreen({ backRoute, backLabel }: LegalScreenProps) {
  const router = useRouter();
  const vm = useLegalViewModel();
  return (
    <ScreenFrame background="#F6F7FD">
      <View style={styles.header}>
        <Pressable
          style={styles.link}
          onPress={() => router.push(backRoute)}
          accessibilityRole="link"
          accessibilityLabel={backLabel}
        >
          <SvgXml xml={art.art1} width={20} height={20} />
        </Pressable>
        <Text style={styles.text}>{s.termsAndPrivacy}</Text>
        <View style={styles.box} />
      </View>
      <ScrollView style={styles.box2} showsVerticalScrollIndicator={false}>
        <View style={styles.box3}>
          <View
            style={[
              styles.section,
              { backgroundImage: vm.hero.backgroundImage, boxShadow: vm.hero.boxShadow },
            ]}
          >
            <SvgXml
              xml={art.heroArt(vm.hero.blob)}
              width={350}
              height={110}
              style={styles.artBox}
            />
            <View style={styles.box4}>
              <SvgXml xml={art.art3} width={34} height={34} />
            </View>
            <View style={styles.box5}>
              <Text style={[styles.text2, { color: vm.hero.foreground }]}>{vm.hero.title}</Text>
              <Text style={[styles.text3, { color: vm.hero.foreground }]}>
                {s.plainWordsUpdatedDate}
              </Text>
            </View>
          </View>
          <View style={styles.box6}>
            <View style={[styles.box7, { left: vm.pillLeft }]} />
            <Pressable style={styles.button} onPress={vm.showTerms} accessibilityRole="button">
              <SvgXml xml={art.art4} width={16} height={16} />
              <Text style={[styles.label, { color: vm.termsColor }]}>{s.termsOfUse}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={vm.showPrivacy} accessibilityRole="button">
              <SvgXml xml={art.art5} width={16} height={16} />
              <Text style={[styles.label2, { color: vm.privacyColor }]}>{s.privacy}</Text>
            </Pressable>
          </View>
          {vm.tab === "terms" ? (
            <>
              <View style={styles.box8}>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art6} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.whatYouBuy}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n01}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.accessToTheDrivenet}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art7} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.priceAndPayment}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n02}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.n79PaidOnceBy}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art8} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.refunds}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n03}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.changedYourMindWithin}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art9} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.yourAccount}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n04}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.oneAccountPerPhone}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art10} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.courseContent}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n05}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.lessonsAndMaterialsBelong}</Text>
                </View>
              </View>
            </>
          ) : null}
          {vm.tab === "privacy" ? (
            <>
              <View style={styles.box8}>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art11} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.whatWeCollect}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n01}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.yourNamePhoneNumber}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art12} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.payments}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n02}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.cardPaymentsAreProcessed}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art13} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.whyWeUseIt}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n03}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.toSignYouIn}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art14} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.whoSeesIt}</Text>
                    </View>
                    <View style={styles.box12}>
                      <Text style={styles.label4}>{s.toFillIn}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n04}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.onlyDrivenetAndThe}</Text>
                </View>
                <View style={styles.section2}>
                  <View style={styles.box9}>
                    <View style={styles.box10}>
                      <SvgXml xml={art.art15} width={32} height={32} />
                    </View>
                    <View style={styles.box11}>
                      <Text style={styles.label3}>{s.yourChoices}</Text>
                    </View>
                    <Text style={styles.text4}>{s.n05}</Text>
                  </View>
                  <Text style={styles.paragraph}>{s.changeOrDeleteYour}</Text>
                </View>
              </View>
            </>
          ) : null}
          <Pressable
            style={styles.link2}
            onPress={() => router.push("/help")}
            accessibilityRole="link"
          >
            <View style={styles.box10}>
              <SvgXml xml={art.art16} width={32} height={32} />
            </View>
            <View style={styles.box13}>
              <Text style={styles.text5}>{s.somethingUnclear}</Text>
              <Text style={styles.text6}>{s.askUsWeAnswer}</Text>
            </View>
            <View style={styles.box14}>
              <SvgXml xml={art.art17} width={16} height={16} />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenFrame>
  );
}
