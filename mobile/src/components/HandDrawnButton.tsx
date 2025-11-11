import React from "react";
import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";

import { palette } from "@theme/colors";
import { theme } from "@theme/index";

interface HandDrawnButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const HandDrawnButton: React.FC<HandDrawnButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  style,
  disabled = false
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[styles.base, styles[variant], disabled && styles.disabled, style]}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    shadowColor: palette.ink,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 2, height: 4 }
  },
  primary: {
    backgroundColor: palette.accent,
    borderColor: palette.ink
  },
  secondary: {
    backgroundColor: palette.canvas,
    borderColor: palette.border
  },
  disabled: {
    opacity: 0.6
  },
  label: {
    color: palette.ink,
    fontSize: 16,
    fontFamily: theme.fonts.display,
    letterSpacing: 0.5
  }
});
