import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { HandDrawnButton } from "@components/HandDrawnButton";
import { palette } from "@theme/colors";
import { theme } from "@theme/index";

export const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar} />
        <Text style={styles.name}>时间行者</Text>
        <Text style={styles.meta}>已记录 23 次工作流 · 分享 5 个数据集</Text>
        <HandDrawnButton label="编辑资料" onPress={() => {}} />
        <HandDrawnButton label="同步数据" onPress={() => {}} variant="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    justifyContent: "center",
    padding: 24
  },
  card: {
    backgroundColor: palette.canvas,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    gap: 16,
    borderWidth: 1,
    borderColor: palette.border
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 56,
    backgroundColor: "#DED2C3",
    borderWidth: 2,
    borderColor: palette.ink
  },
  name: {
    fontSize: 22,
    color: palette.ink,
    fontFamily: theme.fonts.display
  },
  meta: {
    fontSize: 14,
    color: "#8E8578",
    textAlign: "center"
  }
});
