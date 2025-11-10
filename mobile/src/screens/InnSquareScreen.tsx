import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { LeaderboardCard } from "@components/LeaderboardCard";
import { HandDrawnButton } from "@components/HandDrawnButton";
import { api } from "@services/api";
import { palette } from "@theme/colors";

export const InnSquareScreen: React.FC = () => {
  const { data: rumors } = useQuery({
    queryKey: ["rumors"],
    queryFn: api.getRumors,
    initialData: []
  });
  const { data: leaderboard } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: api.getLeaderboard,
    initialData: { datasets: [], helpers: [] }
  });

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ padding: 24, gap: 24 }}
      data={rumors}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => (
        <View style={styles.rumorCard}>
          <Text style={styles.rumorAuthor}>{item.author}</Text>
          <Text style={styles.rumorText}>{item.snippet}</Text>
          <Text style={styles.rumorMeta}>传闻热度 {item.likes} · {item.tags.join(" · ")}</Text>
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>酒楼社区</Text>
          <Text style={styles.subtitle}>分享你的灵光乍现，或是接下一份悬赏。</Text>
          <View style={styles.headerActions}>
            <HandDrawnButton label="发布传闻" onPress={() => {}} />
            <HandDrawnButton label="发起悬赏" onPress={() => {}} variant="secondary" />
          </View>
          <View style={styles.leaderboards}>
            <LeaderboardCard
              title="数据集推荐榜"
              items={leaderboard.datasets}
            />
            <LeaderboardCard
              title="助人排行榜"
              items={leaderboard.helpers}
            />
          </View>
        </View>
      }
      ListEmptyComponent={<Text style={styles.empty}>还没有传闻，成为第一位讲述者吧。</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background
  },
  header: {
    gap: 16
  },
  title: {
    fontSize: 28,
    color: palette.ink
  },
  subtitle: {
    fontSize: 14,
    color: "#8E8578"
  },
  headerActions: {
    flexDirection: "row",
    gap: 12
  },
  leaderboards: {
    gap: 12
  },
  rumorCard: {
    backgroundColor: palette.canvas,
    borderRadius: 24,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: palette.border
  },
  rumorAuthor: {
    fontSize: 16,
    color: palette.ink
  },
  rumorText: {
    fontSize: 14,
    color: palette.ink,
    lineHeight: 20
  },
  rumorMeta: {
    fontSize: 12,
    color: "#978D7F"
  },
  empty: {
    color: "#B8B1A6",
    textAlign: "center",
    marginTop: 80
  }
});
