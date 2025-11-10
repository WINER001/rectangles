import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { TimeBlock } from "@types";
import { palette, modeColors } from "@theme/colors";

interface TimeGridProps {
  blocks: TimeBlock[];
}

export const TimeGrid: React.FC<TimeGridProps> = ({ blocks }) => {
  return (
    <View style={styles.container}>
      {blocks.map((block) => (
        <View
          key={block.id}
          style={[
            styles.cell,
            block.isActive && styles.activeCell,
            block.isPast && styles.pastCell,
            block.mood && { backgroundColor: modeColors[block.mood] },
            block.mood && styles.moodCell
          ]}
        >
          {block.index % 12 === 0 && <Text style={styles.label}>{block.label}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    backgroundColor: palette.canvas,
    padding: 16,
    borderRadius: 24,
    shadowColor: palette.ink,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  cell: {
    width: "7%",
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  activeCell: {
    borderColor: palette.accent,
    borderWidth: 2
  },
  pastCell: {
    opacity: 0.6
  },
  moodCell: {
    borderColor: "transparent"
  },
  label: {
    position: "absolute",
    top: -18,
    left: 0,
    fontSize: 10,
    color: palette.ink
  }
});
