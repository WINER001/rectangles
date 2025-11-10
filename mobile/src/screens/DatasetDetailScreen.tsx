import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { HandDrawnButton } from "@components/HandDrawnButton";
import { api } from "@services/api";
import { palette, modeColors } from "@theme/colors";

export const DatasetDetailScreen: React.FC = () => {
  const { data: datasets } = useQuery({
    queryKey: ["datasets"],
    queryFn: api.getDatasets,
    initialData: []
  });

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ padding: 24, gap: 16 }}
      data={datasets}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => (
        <View style={[styles.card, { borderColor: modeColors[item.coverMood] }]}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.owner}>由 {item.owner} 酿制</Text>
          <Text style={styles.synopsis}>{item.synopsis}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>价格 ¥{item.price}</Text>
            <Text style={styles.metaText}>下载 {item.downloads}</Text>
            <Text style={styles.metaText}>评分 {item.rating}</Text>
          </View>
          <HandDrawnButton label="购买 / 收藏" onPress={() => {}} />
        </View>
      )}
      ListEmptyComponent={<Text style={styles.empty}>暂无数据集，快去上传你的灵感记录吧。</Text>}
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
    borderWidth: 2,
    borderStyle: "dashed"
  },
  title: {
    fontSize: 18,
    color: palette.ink
  },
  owner: {
    fontSize: 12,
    color: "#8E8578"
  },
  synopsis: {
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
