import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

type Props = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function QuantityStepper({ quantity, onIncrement, onDecrement }: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onDecrement} hitSlop={8}>
        <Text style={styles.buttonText}>−</Text>
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable style={styles.button} onPress={onIncrement} hitSlop={8}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.surface2,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  button: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  quantity: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    minWidth: 16,
    textAlign: "center",
  },
});
