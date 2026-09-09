import { Ionicons } from "@expo/vector-icons";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { CategoryChips } from "../components/CategoryChips";
import { ProductCard } from "../components/ProductCard";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { colors } from "../theme";
import { Category, RootStackParamList, TabParamList } from "../types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Search">,
  NativeStackScreenProps<RootStackParamList>
>;

export function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "Todos">("Todos");

  const products = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === "Todos" || p.category === category;
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar</Text>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={16} color={colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholder="Buscar auriculares, mochilas…"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <View style={styles.chipsWrapper}>
        <CategoryChips
          categories={CATEGORIES}
          selected={category}
          onSelect={setCategory}
        />
      </View>
      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No encontramos productos para "{query}".</Text>
        </View>
      ) : (
        <FlatList
          style={styles.grid}
          data={products}
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
    marginBottom: 14,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  chipsWrapper: {
    marginBottom: 14,
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
  },
});
