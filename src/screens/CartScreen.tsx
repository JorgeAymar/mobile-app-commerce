import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ProductTile } from "../components/ProductTile";
import { QuantityStepper } from "../components/QuantityStepper";
import { useCart } from "../context/CartContext";
import { colors } from "../theme";
import { RootStackParamList, TabParamList } from "../types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Cart">,
  NativeStackScreenProps<RootStackParamList>
>;

export function CartScreen({ navigation }: Props) {
  const {
    items,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shipping,
    total,
  } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>Tu carrito</Text>
        <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tu carrito</Text>
        <Pressable onPress={clearCart}>
          <Text style={styles.clear}>Vaciar carrito</Text>
        </Pressable>
      </View>
      <FlatList
        style={styles.grid}
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <ProductTile product={item.product} size={56} />
            <View style={styles.rowInfo}>
              <Text style={styles.name} numberOfLines={2}>
                {item.product.name}
              </Text>
              <View style={styles.rowBottom}>
                <QuantityStepper
                  quantity={item.quantity}
                  onIncrement={() => incrementQuantity(item.product.id)}
                  onDecrement={() => decrementQuantity(item.product.id)}
                />
                <Text style={styles.price}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => removeFromCart(item.product.id)}
              hitSlop={8}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Quitar</Text>
            </Pressable>
          </View>
        )}
      />
      <View style={styles.summary}>
        <View style={styles.summaryLine}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryLine}>
          <Text style={styles.summaryLabel}>Envío</Text>
          <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryLine, styles.totalLine]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <Pressable
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.checkoutButtonText}>Proceder al pago</Text>
        </Pressable>
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
  },
  clear: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 15,
    color: colors.textMuted,
    marginTop: 24,
    textAlign: "center",
  },
  grid: {
    flex: 1,
  },
  list: {
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 14,
    alignItems: "center",
  },
  rowInfo: {
    flex: 1,
    gap: 6,
  },
  rowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.accent,
  },
  removeButton: {
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "600",
  },
  summary: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 14,
    paddingBottom: 20,
    gap: 6,
  },
  summaryLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.textMuted,
  },
  totalLine: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  checkoutButton: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  checkoutButtonText: {
    color: colors.accentContrast,
    fontSize: 15,
    fontWeight: "700",
  },
});
