import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { Product } from "../types";
import { colors } from "../theme";
import { ProductTile } from "./ProductTile";
import { StarRating } from "./StarRating";

type Props = {
  product: Product;
  onPress: () => void;
};

export function ProductCard({ product, onPress }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.tileWrapper}>
        <ProductTile product={product} />
        <Pressable
          style={styles.heartButton}
          onPress={(event) => {
            event.stopPropagation();
            toggleFavorite(product);
          }}
          hitSlop={8}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={16}
            color={favorite ? colors.danger : colors.text}
          />
        </Pressable>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.ratingRow}>
          <StarRating rating={product.rating} size={11} />
          <Text style={styles.ratingValue}>{product.rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  tileWrapper: {
    position: "relative",
    width: "100%",
  },
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    paddingTop: 10,
    gap: 3,
  },
  name: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.text,
    lineHeight: 17,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingValue: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: "500",
  },
  price: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: "600",
    marginTop: 2,
  },
});
