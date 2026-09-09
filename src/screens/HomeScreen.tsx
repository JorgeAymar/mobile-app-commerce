import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CategoryChips } from "../components/CategoryChips";
import { ProductCard } from "../components/ProductCard";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { colors } from "../theme";
import { Category, RootStackParamList, TabParamList } from "../types";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({ navigation }: Props) {
  const [category, setCategory] = useState<Category | "Todos">("Todos");

  const products = useMemo(
    () =>
      category === "Todos"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === category),
    [category]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          Sale<Text style={styles.logoAccent}>s</Text>.
        </Text>
        <Text style={styles.tagline}>Todo lo que buscas, en un solo lugar</Text>
      </View>
      <View style={styles.chipsWrapper}>
        <CategoryChips
          categories={CATEGORIES}
          selected={category}
          onSelect={setCategory}
        />
      </View>
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
  header: {
    marginBottom: 14,
  },
  logo: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
  },
  logoAccent: {
    color: colors.accent,
  },
  tagline: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
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
});
