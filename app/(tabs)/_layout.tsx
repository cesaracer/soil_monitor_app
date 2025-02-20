import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <FontAwesome name="leaf" color="green" size={20} />,
        }}
      />
      <Tabs.Screen
        name="month"
        options={{
          title: "Month",
          tabBarIcon: () => <FontAwesome name="calendar" size={20} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => <FontAwesome name="gears" size={20} />,
        }}
      />
    </Tabs>
  );
}
