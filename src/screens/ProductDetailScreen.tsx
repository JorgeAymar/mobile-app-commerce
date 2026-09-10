import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { QuantityStepper } from "../components/QuantityStepper";
import { ProductTile } from "../components/ProductTile";
import { StarRating } from "../components/StarRating";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { PRODUCTS } from "../data/products";
import { colors } from "../theme";
import { RootStackParamList } from "../types";
import { formatPrice } from "../utils/format";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

const ADD_TO_CART_COOLDOWN_MS = 800;

export function ProductDetailScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const product = useMemo(() => PRODUCTS.find((p) => p.id === productId), [productId]);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const lastAddRef = useRef(0);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Producto no encontrado.</Text>
      </View>
    );
  }

  const favorite = isFavorite(product.id);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrapper}>
          <ProductTile product={product} />
        </View>
        <View style={styles.headerRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{product.category}</Text>
          </View>
          <Pressable onPress={() => toggleFavorite(product)} hitSlop={8}>
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={24}
              color={favorite ? colors.danger : colors.text}
            />
          </Pressable>
        </View>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.ratingRow}>
          <StarRating rating={product.rating} size={15} />
          <Text style={styles.ratingText}>
            {product.rating.toFixed(1)} · {product.reviewCount} reseñas
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <QuantityStepper
            quantity={quantity}
            onIncrement={() => setQuantity((q) => q + 1)}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
          />
        </View>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.reviewsTitle}>Reseñas</Text>
        {product.reviews.map((review) => (
          <View key={review.id} style={styles.review}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {review.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </Text>
            </View>
            <View style={styles.reviewBody}>
              <Text style={styles.reviewName}>{review.name}</Text>
              <StarRating rating={review.rating} size={11} />
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Pressable
          style={styles.addButton}
          onPress={() => {
            const now = Date.now();
            if (now - lastAddRef.current < ADD_TO_CART_COOLDOWN_MS) return;
            lastAddRef.current = now;
            addToCart(product, quantity);
            Alert.alert("Agregado", `${product.name} fue agregado al carrito.`);
          }}
        >
          <Text style={styles.addButtonText}>
            Agregar al carrito · {formatPrice(product.price * quantity)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 12,
    gap: 10,
  },
  heroWrapper: {
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: colors.accentSoft,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.accent,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 21,
    marginTop: 4,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginTop: 8,
  },
  review: {
    flexDirection: "row",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
  },
  reviewBody: {
    flex: 1,
    gap: 3,
  },
  reviewName: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  reviewComment: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  addButton: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: colors.accentContrast,
    fontSize: 15,
    fontWeight: "700",
  },
});
