export type Category = "Electrónica" | "Deporte" | "Hogar" | "Accesorios";

export type IconName =
  | "headset"
  | "watch"
  | "briefcase"
  | "walk"
  | "bulb"
  | "volume-high"
  | "fitness"
  | "home"
  | "card"
  | "bicycle"
  | "keypad-outline"
  | "camera-outline"
  | "battery-charging-outline"
  | "barbell-outline"
  | "body-outline"
  | "water-outline"
  | "flame-outline"
  | "leaf-outline"
  | "glasses-outline"
  | "shirt-outline";

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  icon: IconName;
  image: string;
  tileColor: string;
  iconColor: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  ProductDetail: { productId: string };
  Checkout: undefined;
  OrderConfirmation: { orderNumber: string; total: number };
};
