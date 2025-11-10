import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";

import { ModeSelector } from "@components/ModeSelector";
import { HandDrawnButton } from "@components/HandDrawnButton";
import { AIChatPanel } from "@components/AIChatPanel";
import { ReflectionEditor } from "@components/ReflectionEditor";
import { useWorkflowStore } from "@hooks/useWorkflowStore";
import { api } from "@services/api";
import { askWorkflowAssistant } from "@services/ai";
import { palette, modeColors } from "@theme/colors";
import { theme } from "@theme/index";

export const WorkflowScreen: React.FC = () => {
  const mode = useWorkflowStore((state) => state.mode);
  const switchMode = useWorkflowStore((state) => state.switchMode);
  const startSession = useWorkflowStore((state) => state.startSession);
  const completeSession = useWorkflowStore((state) => state.completeSession);
  const sessions = useWorkflowStore((state) => state.sessions);

  const activeSession = useMemo(() => [...sessions].reverse().find((session) => !session.endedAt), [sessions]);

  const reflectionMutation = useMutation({
    mutationFn: api.publishReflection,
    onSuccess: () => {
      Alert.alert("记录成功", "你的心得已存入酒楼账本。");
    },
    onError: () => {
      Alert.alert("网络异常", "暂时无法上传，请稍后再试或保留在本地。");
    }
  });

  const handleComplete = async ({ reflection, share }: { reflection: string; share: boolean }) => {
    if (!activeSession) {
      return;
    }
    const payload = {
      sessionId: activeSession.id,
      reflection,
      share
    };

    completeSession({ id: activeSession.id, reflection });
    await reflectionMutation.mutateAsync(payload);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24, gap: 24 }}>
      <View style={[styles.header, { borderColor: modeColors[mode] }]}>
        <Text style={styles.title}>当前模式：{mode === "thinking" ? "思考" : mode === "fasting" ? "斋戒" : "等待"}</Text>
        <ModeSelector mode={mode} onSelect={switchMode} />
        <View style={styles.actions}>
          <HandDrawnButton
            label={activeSession ? "进行中..." : "开启此模式"}
            onPress={() => startSession(mode)}
            style={{ backgroundColor: modeColors[mode], opacity: activeSession ? 0.6 : 1 }}
          />
          {activeSession && (
            <HandDrawnButton
              label="结束并记录"
              onPress={() => handleComplete({ reflection: "待补充", share: false })}
              variant="secondary"
            />
          )}
        </View>
      </View>

      <AIChatPanel
        placeholder="向AI描述你当前的困惑或目标..."
        onSend={(message) => askWorkflowAssistant(message, mode)}
      />

      {activeSession && (
        <ReflectionEditor
          loading={reflectionMutation.isLoading}
          onSubmit={handleComplete}
        />
      )}
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
    gap: 16,
    borderWidth: 2,
    borderStyle: "dashed"
  },
  title: {
    fontSize: 22,
    fontFamily: theme.fonts.display,
    color: palette.ink
  },
  actions: {
    flexDirection: "row",
    gap: 12
  }
});
