import { useEffect, useState, useCallback } from "react";
import {
  View, Text, FlatList,
  ActivityIndicator, TextInput, RefreshControl
} from "react-native";
import UserCard from "../components/UserCard";
import { getFavorites, saveFavorites } from "../storage/favorites";
import { sendFavoriteNotification } from "../utils/notify";
import { APIURL as API_URL } from "@env";

export default function UserListScreen() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
      setFiltered(data);
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const fav = await getFavorites();
    setFavorites(fav);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUsers().then(() => setRefreshing(false));
  }, []);

  const handleSearch = (text) => {
    const value = text.toLowerCase();
    setFiltered(
      users.filter(
        u =>
          u.name.toLowerCase().includes(value) ||
          u.email.toLowerCase().includes(value)
      )
    );
  };

  const toggleFavorite = async (user) => {
    let updated;
    const exists = favorites.some(f => f.id === user.id);

    if (exists) updated = favorites.filter(f => f.id !== user.id);
    else {
      updated = [...favorites, user];
      await sendFavoriteNotification(user.name);
    }

    setFavorites(updated);
    saveFavorites(updated);
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error) return <Text style={{ marginTop: 50 }}>{error}</Text>;

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <TextInput
        placeholder="Search by name or email"
        onChangeText={handleSearch}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          marginBottom: 10
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={i => i.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <UserCard
            user={item}
            isFav={favorites.some(f => f.id === item.id)}
            onToggle={() => toggleFavorite(item)}
          />
        )}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>No users found</Text>}
      />
    </View>
  );
}
