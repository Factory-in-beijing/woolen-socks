import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { CtaButton } from "@/components/CtaButton";
import { strings } from "@/components/strings";
import { font } from "@/theme/fonts";

export default function NotFound() {
  const router = useRouter();
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{strings.notFound.title}</Text>
      <CtaButton label={strings.notFound.home} onPress={() => router.replace("/home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: "center", padding: 24, gap: 24, backgroundColor: "#F6F7FD" },
  title: { fontFamily: font.manrope[800], fontSize: 24, color: "#0A0E2E" },
});
