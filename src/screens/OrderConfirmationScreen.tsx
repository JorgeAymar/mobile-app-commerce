import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "OrderConfirmation">;

export function OrderConfirmationScreen({ route, navigation }: Props) {
  const { orderNumber, total } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="checkmark" size={40} color={colors.accentContrast} />
      </View>
      <Text style={styles.title}>¡Pedido confirmado!</Text>
      <Text style={styles.subtitle}>
        Te enviamos los detalles de tu compra por correo.
      </Text>
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Número de pedido</Text>
          <Text style={styles.cardValue}>{orderNumber}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Total pagado</Text>
          <Text style={styles.cardValue}>${total.toFixed(2)}</Text>
        </View>
      </View>
      <Pressable
        style={styles.homeButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.homeButtonText}>Volver al inicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    gap: 10,
    marginBottom: 24,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  homeButton: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  homeButtonText: {
    color: colors.accentContrast,
    fontSize: 15,
    fontWeight: "700",
  },
});
