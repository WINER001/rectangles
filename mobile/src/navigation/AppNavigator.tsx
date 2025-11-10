import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { TimeGridScreen } from "@screens/TimeGridScreen";
import { WorkflowScreen } from "@screens/WorkflowScreen";
import { SessionHistoryScreen } from "@screens/SessionHistoryScreen";
import { InnSquareScreen } from "@screens/InnSquareScreen";
import { DatasetDetailScreen } from "@screens/DatasetDetailScreen";
import { BountyBoardScreen } from "@screens/BountyBoardScreen";
import { ProfileScreen } from "@screens/ProfileScreen";
import { palette } from "@theme/colors";

export type RootTabParamList = {
  时间: undefined;
  工作流: undefined;
  历史: undefined;
  酒楼: undefined;
  数据集: undefined;
  悬赏: undefined;
  我的: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TAB_ICON: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  时间: "grid-outline",
  工作流: "sparkles-outline",
  历史: "book-outline",
  酒楼: "storefront-outline",
  数据集: "albums-outline",
  悬赏: "trophy-outline",
  我的: "person-circle-outline"
};

export const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: palette.accent,
      tabBarInactiveTintColor: "#A99F90",
      tabBarStyle: {
        backgroundColor: palette.canvas,
        borderTopWidth: 0,
        paddingBottom: 6,
        height: 60
      },
      tabBarIcon: ({ color, size }) => <Ionicons name={TAB_ICON[route.name as keyof RootTabParamList]} size={size} color={color} />
    })}
  >
    <Tab.Screen name="时间" component={TimeGridScreen} />
    <Tab.Screen name="工作流" component={WorkflowScreen} />
    <Tab.Screen name="历史" component={SessionHistoryScreen} />
    <Tab.Screen name="酒楼" component={InnSquareScreen} />
    <Tab.Screen name="数据集" component={DatasetDetailScreen} />
    <Tab.Screen name="悬赏" component={BountyBoardScreen} />
    <Tab.Screen name="我的" component={ProfileScreen} />
  </Tab.Navigator>
);
