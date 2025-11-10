import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { HandDrawnButton } from "@components/HandDrawnButton";
import { api } from "@services/api";
import { palette } from "@theme/colors";

export const BountyBoardScreen: React.FC = () => {
  const { data: bounties } = useQuery({
    queryKey: ["bounties"],
    queryFn: api.getBounties,
    initialData: []
  });

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ padding: 24, gap: 16 }}
      data={bounties}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.requester}>来自 {item.requester}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>赏金 ¥{item.reward}</Text>
            <Text style={styles.metaText}>截止 {item.expiresAt}</Text>
            <Text style={styles.metaText}>状态 {item.status}</Text>
          </View>
          <HandDrawnButton label="接下" onPress={() => {}} />
        </View>
      )}
      ListEmptyComponent={<Text style={styles.empty}>暂无悬赏，等你来发布。</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background
  },
  card: {
    backgroundColor: palette.canvas,
    borderRadius: 24,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: palette.border
  },
  title: {
    fontSize: 18,
    color: palette.ink
  },
  requester: {
    fontSize: 12,
    color: "#8E8578"
  },
  description: {
    fontSize: 14,
    color: palette.ink,
    lineHeight: 20
  },
  meta: {
    flexDirection: "row",
    gap: 12
  },
  metaText: {
    fontSize: 12,
    color: "#6F675A"
  },
  empty: {
    color: "#B8B1A6",
    textAlign: "center",
    marginTop: 80
  }
});
