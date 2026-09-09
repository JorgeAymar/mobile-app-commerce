import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { colors } from "../theme";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export function CheckoutScreen({ navigation }: Props) {
  const { subtotal, shipping, total, totalItems, clearCart } = useCart();
  const { registerOrder } = useOrders();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");

  const canConfirm = name.trim().length > 0 && address.trim().length > 0;

  const handleConfirm = () => {
    if (!canConfirm) {
      Alert.alert("Faltan datos", "Completá tu nombre y dirección para continuar.");
      return;
    }
    const orderNumber = `SL-${Math.floor(10000 + Math.random() * 90000)}`;
    registerOrder();
    clearCart();
    navigation.replace("OrderConfirmation", { orderNumber, total });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.field}
          placeholder="Tu nombre"
          placeholderTextColor={colors.textMuted}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Dirección de envío</Text>
        <TextInput
          style={styles.field}
          placeholder="Calle y número"
          placeholderTextColor={colors.textMuted}
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Ciudad</Text>
        <TextInput
          style={styles.field}
          placeholder="Ciudad"
          placeholderTextColor={colors.textMuted}
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Método de pago</Text>
        <View style={styles.payRow}>
          <Pressable
            style={[styles.payOption, paymentMethod === "card" && styles.payOptionActive]}
            onPress={() => setPaymentMethod("card")}
          >
            <Ionicons
              name="card-outline"
              size={16}
              color={paymentMethod === "card" ? colors.accent : colors.textMuted}
            />
            <Text
              style={[
                styles.payOptionText,
                paymentMethod === "card" && styles.payOptionTextActive,
              ]}
            >
              Tarjeta
            </Text>
          </Pressable>
          <Pressable
            style={[styles.payOption, paymentMethod === "cash" && styles.payOptionActive]}
            onPress={() => setPaymentMethod("cash")}
          >
            <Ionicons
              name="cash-outline"
              size={16}
              color={paymentMethod === "cash" ? colors.accent : colors.textMuted}
            />
            <Text
              style={[
                styles.payOptionText,
                paymentMethod === "cash" && styles.payOptionTextActive,
              ]}
            >
              Efectivo
            </Text>
          </Pressable>
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>{totalItems} artículos</Text>
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
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirmar pedido</Text>
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
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    marginTop: 10,
  },
  field: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
  },
  payRow: {
    flexDirection: "row",
    gap: 10,
  },
  payOption: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 12,
  },
  payOptionActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  payOptionText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMuted,
  },
  payOptionTextActive: {
    color: colors.accent,
  },
  summary: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
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
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  confirmButton: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    color: colors.accentContrast,
    fontSize: 15,
    fontWeight: "700",
  },
});
