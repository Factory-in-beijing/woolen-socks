import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { Fragment } from "react";
import { useRouter } from "expo-router";
import {
  useReviewListViewModel,
  type ReviewRow as ReviewRowData,
} from "../hooks/useReviewListViewModel";
import { SvgXml } from "react-native-svg";
import { ScreenFrame } from "@/components/ScreenFrame";
import * as art from "../art/reviewList.art";
import { ReviewRow } from "../components/ReviewRow";
import { cardEdge } from "../components/ReviewRow.styles";
import { strings } from "../strings";
import { styles } from "./ReviewListScreen.styles";

const s = strings.mistakes;
const saved = strings.saved;

export type ReviewMode = "mistakes" | "saved";

// Mistakes is red/blue, Saved is yellow: the hero gradient, its artwork and the count badge differ.
const THEMES = {
  mistakes: {
    heroArt: art.mistakesHero,
    heroPlayArt: art.mistakesPlay,
    heroGradient: "radial-gradient(120% 90% at 50% 0%, #2638DA 0%, #0E1C91 55%, #08106A 100%)",
    badgeBg: "#D92D3A",
    badgeFg: "#FFFFFF",
    heroShadow: "0 20px 34px -18px rgba(14,28,145,0.6)",
    kickerColor: "rgba(255,255,255,0.72)",
    titleColor: "#FFFFFF",
    hintColor: "rgba(255,255,255,0.72)",
    playBg: "#FFB200",
    playRing: "0 0 0 6px rgba(255,255,255,0.12)",
    title: s.mistakes,
    kicker: s.practiseYourMistakes,
    hint: s.getOneRightTwice,
  },
  saved: {
    heroArt: art.savedHero,
    heroPlayArt: art.savedPlay,
    heroGradient: "radial-gradient(120% 90% at 50% 0%, #FFD266 0%, #FFB200 55%, #F2A100 100%)",
    badgeBg: "#FFB200",
    badgeFg: "#0A0E2E",
    heroShadow: "0 20px 34px -18px rgba(176,122,0,0.65)",
    kickerColor: "rgba(10,14,46,0.7)",
    titleColor: "#0A0E2E",
    hintColor: "rgba(10,14,46,0.7)",
    playBg: "#0E1C91",
    playRing: "0 0 0 6px rgba(255,255,255,0.35)",
    title: saved.saved,
    kicker: saved.practiseWhatYouSaved,
    hint: saved.tapTheBookmarkOn,
  },
} as const;

/** First/last rows carry the card edges; the rows in between are plain slices. */
function rowPosition(index: number, count: number): "first" | "middle" | "last" | "only" {
  if (count === 1) return "only";
  return index === 0 ? "first" : index === count - 1 ? "last" : "middle";
}

export function ReviewListScreen({ mode }: { mode: ReviewMode }) {
  const router = useRouter();
  const vm = useReviewListViewModel(mode);
  const theme = THEMES[mode];
  const renderRow = ({ item, index }: { item: ReviewRowData; index: number }) => (
    <ReviewRow
      item={item}
      showWrong={vm.showWrong}
      showSaved={vm.showSaved}
      position={rowPosition(index, vm.rows.length)}
    />
  );
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
          <Text style={styles.label}>{theme.title}</Text>
          <View style={[styles.box2, { backgroundColor: theme.badgeBg }]}>
            <Text style={[styles.label2, { color: theme.badgeFg }]}>{vm.allN}</Text>
          </View>
        </View>
        <View style={styles.box3} />
      </View>
      <View style={styles.showBox}>
        <Pressable
          style={[styles.button, { backgroundColor: vm.allBg, boxShadow: vm.allShadow }]}
          onPress={vm.allPick}
          accessibilityRole="button"
        >
          <SvgXml xml={art.art2} width={16} height={16} />
          <Text style={[styles.label3, { color: vm.allFg }]}>{s.all}</Text>
          <Text style={[styles.text, { color: vm.allFg }]}>{vm.allN}</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: vm.tBg, boxShadow: vm.tShadow }]}
          onPress={vm.tPick}
          accessibilityRole="button"
        >
          <SvgXml xml={art.art3} width={16} height={16} />
          <Text style={[styles.label3, { color: vm.tFg }]}>{s.tickets}</Text>
          <Text style={[styles.text, { color: vm.tFg }]}>{vm.tN}</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: vm.sBg, boxShadow: vm.sShadow }]}
          onPress={vm.sPick}
          accessibilityRole="button"
        >
          <SvgXml xml={art.art4} width={16} height={16} />
          <Text style={[styles.label3, { color: vm.sFg }]}>{s.signs}</Text>
          <Text style={[styles.text, { color: vm.sFg }]}>{vm.sN}</Text>
        </Pressable>
      </View>
      <FlatList
        style={styles.box4}
        data={vm.rows}
        keyExtractor={(row) => row.key}
        renderItem={renderRow}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Pressable
              style={[
                styles.link2,
                { backgroundImage: theme.heroGradient, boxShadow: theme.heroShadow },
              ]}
              onPress={() => router.push("/quick-test-run")}
              accessibilityRole="link"
            >
              <SvgXml xml={theme.heroArt} width={350} height={120} style={styles.artBox} />
              <View style={styles.box6}>
                <Text style={[styles.text2, { color: theme.kickerColor }]}>{theme.kicker}</Text>
                <Text style={[styles.text3, { color: theme.titleColor }]}>{vm.heroTitle}</Text>
                <Text style={[styles.text4, { color: theme.hintColor }]}>{theme.hint}</Text>
              </View>
              <View
                style={[styles.box7, { backgroundColor: theme.playBg, boxShadow: theme.playRing }]}
              >
                <SvgXml xml={theme.heroPlayArt} width={22} height={22} />
              </View>
            </Pressable>
            {vm.showChips ? (
              <>
                <ScrollView
                  style={styles.box8}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.boxContent}
                >
                  {vm.chips.map((c) => (
                    <Fragment key={c.label}>
                      <Pressable
                        style={[styles.button2, { ...c.border, backgroundColor: c.bg }]}
                        onPress={c.pick}
                        accessibilityRole="button"
                      >
                        <Text style={[styles.label4, { color: c.fg }]}>{c.label}</Text>
                        <Text style={[styles.text5, { color: c.fg }]}>{c.count}</Text>
                      </Pressable>
                    </Fragment>
                  ))}
                </ScrollView>
              </>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          <View style={cardEdge.only}>
            <View style={styles.box18}>
              <SvgXml xml={art.art13} width={40} height={40} />
              <Text style={styles.text8}>{s.nothingHere}</Text>
              <Text style={styles.text9}>{s.nothingInThisGroup}</Text>
            </View>
          </View>
        }
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        windowSize={7}
        removeClippedSubviews
      />
      <View style={styles.box19} />
      <View style={styles.nav}>
        <Pressable
          style={styles.link4}
          onPress={() => router.push("/home-signed-in")}
          accessibilityRole="link"
        >
          <SvgXml xml={art.art14} width={20} height={20} />
          <Text style={styles.label8}>{s.home}</Text>
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/my-course")}
          accessibilityRole="link"
          accessibilityLabel="My course"
        >
          <SvgXml xml={art.art15} width={22} height={22} />
        </Pressable>
        <Pressable
          style={styles.link5}
          onPress={() => router.push("/account")}
          accessibilityRole="link"
          accessibilityLabel="Account"
        >
          <SvgXml xml={art.art16} width={22} height={22} />
        </Pressable>
      </View>
    </ScreenFrame>
  );
}
