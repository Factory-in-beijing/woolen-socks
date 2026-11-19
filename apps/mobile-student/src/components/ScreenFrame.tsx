import type { ReactNode } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

/** Design artboard size (portrait phone). Landscape screens pass their own size. */
const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

type ScreenFrameProps = {
  /** Page background; also fills any space around the frame on devices with another aspect ratio. */
  background: string;
  width?: number;
  height?: number;
  children: ReactNode;
};

/**
 * Lays a screen out on the design's fixed artboard and scales it to fit the device.
 * On a 390x844 screen it is pixel-exact; on other sizes proportions are preserved.
 */
export function ScreenFrame({
  background,
  width = DESIGN_WIDTH,
  height = DESIGN_HEIGHT,
  children,
}: ScreenFrameProps) {
  const window = useWindowDimensions();
  const scale = Math.min(window.width / width, window.height / height);
  return (
    <View style={[styles.outer, { backgroundColor: background }]}>
      <View style={{ width, height, transform: [{ scale }] }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, alignItems: "center", justifyContent: "center", overflow: "hidden" },
});
