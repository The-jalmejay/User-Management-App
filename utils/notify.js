import * as Notifications from "expo-notifications";

Notifications.scheduleNotificationAsync({
  content: {
    title: "Test Notification",
    body: "Local notifications are working ",
  },
  trigger: null,
});
