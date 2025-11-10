import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";

import { palette } from "@theme/colors";
import { HandDrawnButton } from "./HandDrawnButton";

interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AIChatPanelProps {
  placeholder: string;
  onSend: (message: string) => Promise<string>;
}

export const AIChatPanel: React.FC<AIChatPanelProps> = ({ placeholder, onSend }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);

  const send = async () => {
    if (!input.trim()) {
      return;
    }
    const userMessage: AIMessage = { id: `user-${Date.now()}`, role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const reply = await onSend(userMessage.content);
      setMessages((prev) => [
        ...prev,
        { id: `assistant-${Date.now()}`, role: "assistant", content: reply }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        style={styles.chatList}
        renderItem={({ item }) => (
          <View style={[styles.message, item.role === "assistant" && styles.assistantMessage]}>
            <Text style={styles.messageRole}>{item.role === "assistant" ? "酒楼AI" : "你"}</Text>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>等待你的想法...</Text>}
      />
      <View style={styles.composer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#B8B1A6"
          value={input}
          onChangeText={setInput}
          style={styles.input}
          multiline
        />
        <HandDrawnButton
          label={loading ? "生成中..." : "请教AI"}
          onPress={send}
          variant="secondary"
          style={{ opacity: loading ? 0.6 : 1 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    backgroundColor: palette.canvas,
    borderRadius: 24
  },
  chatList: {
    maxHeight: 220
  },
  message: {
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    shadowColor: palette.ink,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  assistantMessage: {
    backgroundColor: "#F6EFE2"
  },
  messageRole: {
    fontSize: 12,
    color: "#978D7F",
    marginBottom: 4
  },
  messageText: {
    fontSize: 14,
    color: palette.ink,
    lineHeight: 20
  },
  empty: {
    color: "#B8B1A6",
    fontSize: 14
  },
  composer: {
    gap: 12
  },
  input: {
    minHeight: 60,
    maxHeight: 140,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 12,
    color: palette.ink,
    backgroundColor: "#FFFFFF"
  }
});
