import { useEffect } from "react";
import { View } from "react-native";
import * as Notifications from "expo-notifications";
import UserListScreen from "./screens/UserListScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowAlert: false,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowList: true
  }),
});


export default function App() {
  const requestPermission = async () => {
    await Notifications.requestPermissionsAsync();
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <UserListScreen />
    </View>
  );
}
