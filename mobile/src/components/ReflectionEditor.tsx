import React, { useState } from "react";
import { View, Text, TextInput, Switch, StyleSheet } from "react-native";

import { HandDrawnButton } from "./HandDrawnButton";
import { palette } from "@theme/colors";

interface ReflectionEditorProps {
  onSubmit: (payload: { reflection: string; share: boolean }) => void;
  loading?: boolean;
}

export const ReflectionEditor: React.FC<ReflectionEditorProps> = ({ onSubmit, loading }) => {
  const [reflection, setReflection] = useState("");
  const [share, setShare] = useState(true);

  const submit = () => {
    if (!reflection.trim()) {
      return;
    }
    onSubmit({ reflection: reflection.trim(), share });
    setReflection("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>记录你的感受：</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="今天的心路历程、身体状态、灵感火花..."
        placeholderTextColor="#B8B1A6"
        value={reflection}
        onChangeText={setReflection}
      />
      <View style={styles.shareRow}>
        <Text style={styles.shareLabel}>愿意分享至酒楼社区</Text>
        <Switch value={share} onValueChange={setShare} thumbColor="#FFFFFF" trackColor={{ true: palette.accent, false: "#D8CDC0" }} />
      </View>
      <HandDrawnButton
        label={loading ? "上传中..." : "保存感受"}
        onPress={submit}
        style={{ opacity: loading ? 0.6 : 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.canvas,
    borderRadius: 24,
    padding: 16,
    gap: 12
  },
  title: {
    fontSize: 18,
    color: palette.ink
  },
  input: {
    minHeight: 120,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 12,
    textAlignVertical: "top",
    backgroundColor: "#FFFFFF",
    color: palette.ink
  },
  shareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  shareLabel: {
    color: palette.ink
  }
});
