import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { TimeGrid } from "@components/TimeGrid";
import { HandDrawnButton } from "@components/HandDrawnButton";
import { useTimeGrid } from "@hooks/useTimeGrid";
import { useWorkflowStore } from "@hooks/useWorkflowStore";
import { api } from "@services/api";
import { palette } from "@theme/colors";
import { theme } from "@theme/index";

export const TimeGridScreen: React.FC = () => {
  const { data: summary } = useQuery({
    queryKey: ["time-summary"],
    queryFn: api.getTimeSummary,
    initialData: { usedMinutes: 0, remainingMinutes: 1440 }
  });
  const sessions = useWorkflowStore((state) =>
    state.sessions.map((session) => ({
      id: session.id,
      index: Math.floor((new Date(session.startedAt).getHours() * 60 + new Date(session.startedAt).getMinutes()) / 10),
      label: "",
      isPast: false,
      isActive: false,
      mood: session.mode
    }))
  );
  const timeBlocks = useTimeGrid(sessions);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24, gap: 24 }}>
      <View style={styles.header}>
        <Text style={styles.greeting}>欢迎回到时间酒楼</Text>
        <Text style={styles.subtitle}>今日你已烹饪 {Math.floor(summary.usedMinutes / 60)} 小时 {summary.usedMinutes % 60} 分钟。</Text>
        <Text style={styles.subtitle}>剩余 {Math.floor(summary.remainingMinutes / 60)} 小时等你创作。</Text>
      </View>

      <TimeGrid blocks={timeBlocks} />

      <View style={styles.actions}>
        <Text style={styles.sectionTitle}>接下来打算？</Text>
        <HandDrawnButton
          label="进入三态工作流"
          onPress={() => {}}
        />
        <HandDrawnButton
          label="回顾历史反思"
          variant="secondary"
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background
  },
  header: {
    backgroundColor: palette.canvas,
    borderRadius: 24,
    padding: 16,
    gap: 8,
    shadowColor: palette.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 }
  },
  greeting: {
    fontSize: 24,
    fontFamily: theme.fonts.display,
    color: palette.ink
  },
  subtitle: {
    fontSize: 14,
    color: "#6F675A"
  },
  actions: {
    gap: 12
  },
  sectionTitle: {
    fontSize: 18,
    color: palette.ink
  }
});
