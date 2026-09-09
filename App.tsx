import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { CartProvider, useCart } from "./src/context/CartContext";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { OrdersProvider } from "./src/context/OrdersContext";
import { CartScreen } from "./src/screens/CartScreen";
import { CheckoutScreen } from "./src/screens/CheckoutScreen";
import { FavoritesScreen } from "./src/screens/FavoritesScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { OrderConfirmationScreen } from "./src/screens/OrderConfirmationScreen";
import { ProductDetailScreen } from "./src/screens/ProductDetailScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { SearchScreen } from "./src/screens/SearchScreen";
import { colors } from "./src/theme";
import { RootStackParamList, TabParamList } from "./src/types";

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function CartTabIcon({ color, size }: { color: string; size: number }) {
  const { totalItems } = useCart();
  return (
    <Ionicons
      name={totalItems > 0 ? "cart" : "cart-outline"}
      size={size}
      color={color}
    />
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Buscar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Carrito",
          tabBarIcon: ({ color, size }) => (
            <CartTabIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <OrdersProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ title: "Detalle" }}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{ title: "Pago" }}
            />
            <Stack.Screen
              name="OrderConfirmation"
              component={OrderConfirmationScreen}
              options={{ headerShown: false, gestureEnabled: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </CartProvider>
      </OrdersProvider>
    </FavoritesProvider>
  );
}
