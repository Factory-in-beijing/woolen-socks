import { StyleSheet } from "react-native";
import { font } from "@/theme/fonts";

export const styles = StyleSheet.create({
  artBox: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  box: {
    width: 8,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 4,
  },
  section: {
    flexDirection: "column",
    position: "absolute",
    left: 0,
    top: 272,
    width: 390,
    height: 572,
    paddingTop: 28,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 20,
    gap: 24,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: "0 -12px 30px rgba(5,10,60,0.25)",
  },
  box4: {
    flexDirection: "column",
    gap: 8,
  },
  text: {
    color: "#0E1C91",
  },
  title: {
    margin: 0,
    fontFamily: font.manrope[800],
    color: "#0A0E2E",
    fontSize: 26,
    letterSpacing: -0.9,
    lineHeight: 29.9,
  },
  text2: {
    fontFamily: font.manrope[600],
    color: "#6B7396",
    fontSize: 14,
    lineHeight: 20.3,
  },
  box5: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  text3: {
    fontFamily: font.manrope[800],
    color: "#566086",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  box15: {
    flexDirection: "column",
    position: "absolute",
    left: 20,
    bottom: 24,
    width: 350,
    gap: 16,
  },
  text6: {
    fontFamily: font.manrope[600],
    color: "#8A93B8",
    fontSize: 12,
    lineHeight: 17.4,
    textAlign: "center",
  },
});
