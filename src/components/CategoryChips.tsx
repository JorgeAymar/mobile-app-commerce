import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Category } from "../types";
import { colors } from "../theme";

type Props = {
  categories: Category[];
  selected: Category | "Todos";
  onSelect: (category: Category | "Todos") => void;
};

export function CategoryChips({ categories, selected, onSelect }: Props) {
  const options: (Category | "Todos")[] = ["Todos", ...categories];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {options.map((option) => {
          const isActive = option === selected;
          return (
            <Pressable
              key={option}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onSelect(option)}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <LinearGradient
        colors={[`${colors.bg}00`, colors.bg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.fade}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  container: {
    gap: 8,
    paddingVertical: 2,
    paddingRight: 28,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  chipActive: {
    backgroundColor: colors.text,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textMuted,
  },
  chipTextActive: {
    color: colors.accentContrast,
  },
  fade: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 32,
  },
});
