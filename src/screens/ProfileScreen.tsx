import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { useOrders } from "../context/OrdersContext";
import { colors } from "../theme";

const MENU_ITEMS: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: "receipt-outline", label: "Mis pedidos" },
  { icon: "location-outline", label: "Direcciones" },
  { icon: "card-outline", label: "Métodos de pago" },
  { icon: "help-circle-outline", label: "Ayuda" },
];

export function ProfileScreen() {
  const { favorites } = useFavorites();
  const { orderCount } = useOrders();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>IN</Text>
        </View>
        <View>
          <Text style={styles.name}>Invitado</Text>
          <Text style={styles.email}>invitado@sales.app</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favoritos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{orderCount}</Text>
          <Text style={styles.statLabel}>Pedidos</Text>
        </View>
      </View>

      <View style={styles.menu}>
        {MENU_ITEMS.map((item) => (
          <Pressable key={item.label} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={18} color={colors.text} />
              <Text style={styles.menuItemLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </Pressable>
        ))}
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
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 20,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.accent,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  email: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    gap: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.accent,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  menu: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuItemLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },
});
