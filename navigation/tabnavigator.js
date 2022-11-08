import React from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, SarchScreen } from "../screens";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Explore") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Applied") {
            iconName = focused ? "search" : "search-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#6B6F6E",
        tabBarStyle: {
          backgroundColor: "#000",
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Explore" component={HomeScreen} />
      <Tab.Screen name="Applied" component={SarchScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
