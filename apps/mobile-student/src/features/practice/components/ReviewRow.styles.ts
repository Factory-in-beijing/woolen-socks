import { StyleSheet } from "react-native";
import { font } from "@/theme/fonts";

const CARD_BORDER = "#E8EBF7";
const CARD_RADIUS = 24;
const SIDE = {
  marginHorizontal: 20,
  paddingHorizontal: 4,
  backgroundColor: "#FFFFFF",
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderColor: CARD_BORDER,
} as const;

/** The list rows are drawn as slices of one white rounded card (first/last rows carry the top/bottom edge). */
export const cardEdge = StyleSheet.create({
  first: {
    ...SIDE,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopLeftRadius: CARD_RADIUS,
    borderTopRightRadius: CARD_RADIUS,
  },
  middle: { ...SIDE },
  last: {
    ...SIDE,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomLeftRadius: CARD_RADIUS,
    borderBottomRightRadius: CARD_RADIUS,
  },
  only: {
    ...SIDE,
    paddingVertical: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: CARD_RADIUS,
  },
});

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    position: "relative",
    minHeight: 84,
    padding: 12,
    gap: 12,
    alignItems: "center",
  },
  thumb: {
    width: 56,
    height: 56,
    flexShrink: 0,
  },
  imageThumb: {
    flexDirection: "row",
    width: 56,
    height: 56,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EBF7",
    borderRadius: 16,
  },
  body: {
    flexDirection: "column",
    minWidth: 0,
    gap: 6,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  tag: {
    flexDirection: "row",
    height: 20,
    paddingTop: 0,
    paddingRight: 7,
    paddingBottom: 0,
    paddingLeft: 7,
    alignItems: "center",
    borderRadius: 10,
  },
  tagLabel: {
    fontFamily: font.manrope[800],
    fontSize: 10,
    letterSpacing: 0.4,
    textDecorationLine: "none",
  },
  head: {
    fontFamily: font.spaceGrotesk[700],
    color: "#0E1C91",
    fontSize: 12,
    textDecorationLine: "none",
  },
  topic: {
    overflow: "hidden",
    fontFamily: font.manrope[800],
    color: "#8A93B8",
    fontSize: 11,
    textDecorationLine: "none",
  },
  questionWrap: {
    overflow: "hidden",
  },
  question: {
    fontFamily: font.manrope[700],
    color: "inherit",
    fontSize: 14,
    lineHeight: 18.2,
    textDecorationLine: "none",
  },
  trailing: {
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-end",
    flexShrink: 0,
  },
  wrongBadge: {
    flexDirection: "row",
    height: 22,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 8,
    alignItems: "center",
    backgroundColor: "#FFF3D6",
    borderRadius: 11,
  },
  wrongLabel: {
    fontFamily: font.spaceGrotesk[700],
    color: "#8A5A00",
    fontSize: 11,
    textDecorationLine: "none",
  },
  divider: {
    position: "absolute",
    left: 80,
    right: 12,
    bottom: 0,
    height: 1,
  },
  meta: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
