import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import type { ReviewRow as ReviewRowData } from "../hooks/useReviewListViewModel";
import * as reviewArt from "../art/reviewRow.art";
import { cardEdge, styles } from "./ReviewRow.styles";

type ReviewRowProps = {
  item: ReviewRowData;
  showWrong: boolean;
  showSaved: boolean;
  /** Position in the list: the rows together look like one rounded card. */
  position: "first" | "middle" | "last" | "only";
};

/** One entry of the Mistakes / Saved list. Memoised so a long list only re-renders rows that changed. */
export const ReviewRow = memo(function ReviewRow({
  item,
  showWrong,
  showSaved,
  position,
}: ReviewRowProps) {
  const router = useRouter();
  return (
    <View style={cardEdge[position]}>
      <Pressable
        style={styles.row}
        onPress={() => router.push(item.route)}
        accessibilityRole="link"
      >
        <View style={styles.thumb}>
          {item.kind === "sign" ? <SvgXml xml={reviewArt.art7} width={56} height={56} /> : null}
          {item.kind === "road" ? <SvgXml xml={reviewArt.art8} width={56} height={56} /> : null}
          {item.kind === "speed" ? <SvgXml xml={reviewArt.art9} width={56} height={56} /> : null}
          {item.kind === "light" ? <SvgXml xml={reviewArt.art10} width={56} height={56} /> : null}
          {item.kind === "img" ? (
            <View style={styles.imageThumb}>
              <SvgXml xml={item.svg} width="100%" height="100%" />
            </View>
          ) : null}
        </View>
        <View style={styles.body}>
          <View style={styles.meta}>
            <View style={[styles.tag, { backgroundColor: item.tagBg }]}>
              <Text style={[styles.tagLabel, { color: item.tagFg }]}>{item.tag}</Text>
            </View>
            <Text style={styles.head}>{item.head}</Text>
            <Text numberOfLines={1} style={styles.topic}>
              {item.topic}
            </Text>
          </View>
          <View style={styles.questionWrap}>
            <Text numberOfLines={2} style={styles.question}>
              {item.question}
            </Text>
          </View>
        </View>
        <View style={styles.trailing}>
          {showWrong ? (
            <View style={styles.wrongBadge}>
              <Text style={styles.wrongLabel}>{`${item.wrong}× wrong`}</Text>
            </View>
          ) : null}
          {showSaved ? <SvgXml xml={reviewArt.art11} width={18} height={18} /> : null}
          <SvgXml xml={reviewArt.art12} width={16} height={16} />
        </View>
        <View style={[styles.divider, { backgroundColor: item.lineColor }]} />
      </Pressable>
    </View>
  );
});
