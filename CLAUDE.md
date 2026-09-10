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

**Catalog**: `src/data/products.ts` is the single source of truth for all products (`PRODUCTS` array) and the category list (`CATEGORIES`). Every product carries a real photo URL (`image`, hot-linked from Unsplash/LoremFlickr — verify a replacement image actually shows the right subject before using it: several keyword-based search URLs from stock-photo services return unrelated photos that still load successfully, e.g. a "bath,towel" LoremFlickr search returned a photo of a cat) plus an `icon`/`iconColor` pair used only as a fallback. `ProductTile` renders the photo and swaps to the icon automatically via the `Image` `onError` handler if the URL ever breaks — don't remove this fallback when touching product images.

**Reused UI pieces** (`src/components/`): `ProductCard` (grid tile used on Home/Search/Favorites — wrapped in `React.memo` since up to 20 can be on screen at once), `ProductTile` (the photo/icon square itself — pass no `size` prop to have it fill its parent at a 1:1 aspect ratio, as the grid cards *and* `ProductDetailScreen`'s full-width hero do; pass a fixed `size` only where the tile is genuinely fixed-size, like the cart-row thumbnails), `CategoryChips`, `StarRating`, `QuantityStepper`. Design tokens (colors only, no spacing scale) live in `src/theme.ts`; `src/utils/format.ts` has the one `formatPrice` helper — use it instead of a fresh `` `$${x.toFixed(2)}` `` at a new call site.

**Gotchas already fixed once in this codebase — watch for regressions:**
1. A `Pressable` nested inside another `Pressable` (the favorite-heart button on `ProductCard`, the quantity +/- buttons on `QuantityStepper`, the "Quitar" button on a cart row) must call `event.stopPropagation()` in its own `onPress`, or the tap bubbles to the outer `Pressable` too — on React Native Web this fires *both* handlers (e.g. toggling a favorite also navigates to the product).
2. Every vertical `FlatList`/`ScrollView` must get an explicit `style={{ flex: 1 }}` (not just `contentContainerStyle`). Without it the list renders fine on web but silently fails to scroll on a real device/simulator, because it has no bounded height to measure against. This only applies to the *scrolling* axis's bound — a horizontal `ScrollView` (like `CategoryChips`) scrolls fine without it, since its width already comes from the normal (non-scrolling) layout flow of its parent.
3. Any state-mutating `onPress` that navigates away or is easy to double-tap (checkout confirmation, add-to-cart) needs a re-entrancy guard — see `CheckoutScreen`'s `submitting` state and `ProductDetailScreen`'s `lastAddRef` cooldown. Without one, a fast double-tap runs the handler twice (e.g. incrementing `OrdersContext.orderCount` by 2 for one real order).
