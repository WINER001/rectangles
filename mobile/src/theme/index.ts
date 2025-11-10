import { DefaultTheme } from "@react-navigation/native";

import { palette } from "./colors";

export const theme = {
  colors: palette,
  radius: {
    sm: 8,
    md: 14,
    lg: 24
  },
  spacing: (value: number) => value * 8,
  fonts: {
    display: "Snell Roundhand",
    body: "Helvetica Neue"
  },
  navigation: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: palette.background,
      card: palette.canvas,
      text: palette.ink,
      border: palette.border,
      primary: palette.accent
    }
  }
};
