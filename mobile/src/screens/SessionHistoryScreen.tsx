import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import dayjs from "dayjs";

import { useWorkflowStore } from "@hooks/useWorkflowStore";
import { palette, modeColors } from "@theme/colors";

export const SessionHistoryScreen: React.FC = () => {
  const archive = useWorkflowStore((state) => state.archive);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ padding: 24, gap: 16 }}
        data={archive}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderColor: modeColors[item.mode] }]}>
            <Text style={styles.mode}>
              {item.mode === "thinking" ? "思考" : item.mode === "fasting" ? "斋戒" : "等待"}
            </Text>
            <Text style={styles.time}>
              {dayjs(item.startedAt).format("HH:mm")} - {item.endedAt ? dayjs(item.endedAt).format("HH:mm") : "进行中"}
            </Text>
            {item.reflection && <Text style={styles.reflection}>{item.reflection}</Text>}
            {item.aiSummary && <Text style={styles.summary}>AI 摘要：{item.aiSummary}</Text>}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>还没有冒泡的记录，去开启一个新流程吧。</Text>}
      />
    </View>
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
    borderWidth: 2,
    borderStyle: "dashed",
    gap: 8
  },
  mode: {
    fontSize: 16,
    color: palette.ink
  },
  time: {
    fontSize: 12,
    color: "#8E8578"
  },
  reflection: {
    fontSize: 14,
    color: palette.ink,
    lineHeight: 20
  },
  summary: {
    fontSize: 12,
    color: "#6F675A"
  },
  empty: {
    color: "#B8B1A6",
    textAlign: "center"
  }
});
