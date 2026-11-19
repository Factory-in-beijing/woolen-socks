import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { ErrorBoundaryProps } from "expo-router";
import { font } from "@/theme/fonts";
import { reportError } from "@/lib/errorReporting";
import { CtaButton } from "./CtaButton";
import { strings } from "./strings";

/** Last-resort screen for an unexpected render error: report it, show a calm message and offer a retry. */
export function AppErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  useEffect(() => reportError(error), [error]);
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{strings.error.title}</Text>
      <Text style={styles.body}>{strings.error.body}</Text>
      <View style={styles.action}>
        <CtaButton label={strings.error.retry} onPress={retry} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: "center", padding: 24, gap: 12, backgroundColor: "#F6F7FD" },
  title: { fontFamily: font.manrope[800], fontSize: 24, color: "#0A0E2E" },
  body: { fontFamily: font.manrope[600], fontSize: 15, lineHeight: 21, color: "#6B7396" },
  action: { marginTop: 12 },
});
