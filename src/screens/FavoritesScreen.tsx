import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { useFavorites } from "../context/FavoritesContext";
import { colors } from "../theme";
import { RootStackParamList, TabParamList } from "../types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Favorites">,
  NativeStackScreenProps<RootStackParamList>
>;

export function FavoritesScreen({ navigation }: Props) {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Todavía no agregaste productos a favoritos.{"\n"}Toca el corazón en cualquier producto.
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.grid}
          data={favorites}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate("ProductDetail", { productId: item.id })
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
  },
  grid: {
    flex: 1,
  },
  row: {
    gap: 18,
  },
  list: {
    gap: 24,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
});
