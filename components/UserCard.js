import { View, Text, TouchableOpacity } from "react-native";

export default function UserCard({ user, isFav, onToggle }) {
  return (
    <View style={{
      padding: 14,
      marginVertical: 6,
      backgroundColor: "#fff",
      borderRadius: 10,
      elevation: 2
    }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.address.city}</Text>

      <TouchableOpacity
        onPress={onToggle}
        style={{
          marginTop: 8,
          padding: 8,
          backgroundColor: isFav ? "gold" : "#ddd",
          borderRadius: 6
        }}>
        <Text>{isFav ? "Remove Favorite" : "Add to Favorite"}</Text>
      </TouchableOpacity>
    </View>
  );
}
