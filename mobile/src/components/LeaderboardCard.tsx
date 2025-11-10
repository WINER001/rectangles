import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { palette } from "@theme/colors";

interface LeaderboardCardProps {
  title: string;
  items: { label: string; value: string }[];
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ title, items }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {items.map((item, index) => (
      <View key={item.label} style={styles.row}>
        <Text style={styles.rank}>{index + 1}.</Text>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.canvas,
    borderRadius: 24,
    padding: 16,
    gap: 8
  },
  title: {
    fontSize: 16,
    color: palette.ink,
    marginBottom: 4
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  rank: {
    fontSize: 14,
    color: palette.highlight
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: palette.ink
  },
  value: {
    fontSize: 14,
    color: "#867A6D"
  }
});
