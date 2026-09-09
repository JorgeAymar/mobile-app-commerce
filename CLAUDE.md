# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — start the Expo dev server (scan the QR with Expo Go, or press `i`/`a`/`w`).
- `npm run ios` / `npm run android` / `npm run web` — start the dev server and open directly on that target (`ios`/`android` auto-install Expo Go on a booted simulator/emulator if missing).
- `npx tsc --noEmit` — type-check the project. There is no separate lint or test script configured; type-checking is the only automated check currently in place.

## Architecture

This is an Expo (SDK 57) / React Native + TypeScript app named **Sales**, a single-catalog ecommerce demo with no backend — all data and state live in memory on the client.

**Navigation** (`App.tsx`): a root `@react-navigation/native-stack` holds one bottom-tab navigator (`Home`, `Search`, `Favorites`, `Cart`, `Profile`) plus three screens pushed *over* the tabs: `ProductDetail`, `Checkout`, `OrderConfirmation`. Because these three live on the root stack rather than inside the tab navigator, the bottom tab bar disappears on them — screen params/types for both navigators are declared in `src/types/index.ts` (`TabParamList`, `RootStackParamList`) and screens combine them with `CompositeScreenProps` when they need to navigate to a screen owned by the other navigator.

**State** is three independent React Context providers, nested in `App.tsx` (`FavoritesProvider > OrdersProvider > CartProvider`), each in its own file under `src/context/`:
- `CartContext` — cart items, quantity math, and derived `subtotal`/`shipping`/`total` (flat shipping once cart is non-empty).
- `FavoritesContext` — a simple id-keyed favorites list, toggled from `ProductCard`.
- `OrdersContext` — just a counter (`orderCount`), incremented by `CheckoutScreen` on order confirmation and read by `ProfileScreen`. There is no order history, only the count.

None of this persists — a reload resets cart/favorites/order count to empty.

**Catalog**: `src/data/products.ts` is the single source of truth for all products (`PRODUCTS` array) and the category list (`CATEGORIES`). Every product carries a real photo URL (`image`, hot-linked from Unsplash/LoremFlickr — verify a replacement image actually shows the right subject before using it, several keyword-based search URLs from stock-photo services return unrelated photos that still load successfully) plus an icon/color pair (`icon`, `tileColor`, `iconColor`) used only as a fallback. `ProductTile` renders the photo and swaps to the icon automatically via the `Image` `onError` handler if the URL ever breaks — don't remove this fallback when touching product images.

**Reused UI pieces** (`src/components/`): `ProductCard` (grid tile used on Home/Search/Favorites), `ProductTile` (the photo/icon square itself — pass no `size` prop to have it fill its parent at a 1:1 aspect ratio, as the grid cards do; pass a fixed `size` for the fixed-size use in `ProductDetailScreen`'s hero and cart-row thumbnails), `CategoryChips`, `StarRating`, `QuantityStepper`. Design tokens (colors only, no spacing scale) live in `src/theme.ts`.

**Two gotchas already fixed once in this codebase — watch for regressions:**
1. `ProductCard`'s favorite-heart button is a `Pressable` nested inside the card's own `Pressable`. On React Native Web the press bubbles to the parent (opening the product instead of toggling the favorite) unless the inner handler calls `event.stopPropagation()`.
2. Every `FlatList`/`ScrollView` on a screen must get an explicit `style={{ flex: 1 }}` (not just `contentContainerStyle`). Without it the list renders fine on web but silently fails to scroll on a real device/simulator, because it has no bounded height to measure against.
