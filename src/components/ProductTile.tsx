import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Product } from "../types";
import { colors } from "../theme";

type Props = {
  product: Product;
  size?: number;
};

export function ProductTile({ product, size }: Props) {
  const [failed, setFailed] = useState(false);
  const iconSize = (size ?? 160) * 0.34;

  return (
    <View
      style={[
        styles.tile,
        size ? { width: size, height: size } : styles.fill,
      ]}
    >
      {!failed && (
        <Image
          source={{ uri: product.image }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onError={() => setFailed(true)}
        />
      )}
      {failed && <Ionicons name={product.icon as any} size={iconSize} color={product.iconColor} />}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: colors.surface2,
  },
  fill: {
    width: "100%",
    aspectRatio: 1,
  },
});
