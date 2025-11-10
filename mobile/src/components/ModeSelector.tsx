import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { WorkflowMode } from "@types";
import { modeColors, palette } from "@theme/colors";
import { theme } from "@theme/index";

interface ModeSelectorProps {
  mode: WorkflowMode;
  onSelect: (mode: WorkflowMode) => void;
}

const modes: { key: WorkflowMode; title: string; subtitle: string }[] = [
  { key: "thinking", title: "思考", subtitle: "分析、规划、拆解" },
  { key: "fasting", title: "斋戒", subtitle: "屏蔽干扰、专注执行" },
  { key: "waiting", title: "等待", subtitle: "冥想恢复、缓慢呼吸" }
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onSelect }) => {
  return (
    <View style={styles.container}>
      {modes.map((item) => {
        const isActive = item.key === mode;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.card, isActive && { borderColor: modeColors[item.key], backgroundColor: "#FFFFFFCC" }]}
            onPress={() => onSelect(item.key)}
            activeOpacity={0.85}
          >
            <View style={[styles.avatar, { backgroundColor: modeColors[item.key] }]} />
            <View style={styles.textWrapper}>
              <Text style={[styles.title, isActive && { color: modeColors[item.key] }]}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  card: {
    flex: 1,
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: palette.border,
    padding: 16,
    backgroundColor: palette.canvas,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.ink,
    shadowColor: palette.ink,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4
  },
  textWrapper: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.display,
    color: palette.ink
  },
  subtitle: {
    fontSize: 12,
    color: palette.ink,
    opacity: 0.7,
    marginTop: 4
  }
});
