import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../theme";

type Props = {
  rating: number;
  size?: number;
};

export function StarRating({ rating, size = 13 }: Props) {
  const rounded = Math.round(rating);
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons
          key={i}
          name={i <= rounded ? "star" : "star-outline"}
          size={size}
          color={colors.gold}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 1,
  },
});
