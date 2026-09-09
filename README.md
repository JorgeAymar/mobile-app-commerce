# Sales

A React Native (Expo) ecommerce demo app: browse a product catalog, filter by category, search, save favorites, manage a cart, and check out — all client-side, no backend.

## Features

- Product catalog with categories, ratings, and reviews
- Search and category filtering
- Favorites
- Cart with editable quantities and order summary
- Checkout flow with a mock payment method and order confirmation
- Guest profile screen

## Getting started

```bash
npm install
npm start
```

Then scan the QR code with the **Expo Go** app on your phone (same Wi-Fi network as your computer), or press `i` / `a` / `w` in the terminal to open in an iOS simulator, Android emulator, or the browser.

Other scripts:

```bash
npm run ios      # start and open on iOS simulator
npm run android  # start and open on Android emulator
npm run web      # start and open in the browser
npx tsc --noEmit # type-check the project
```

## Tech stack

- [Expo](https://expo.dev) / React Native + TypeScript
- [React Navigation](https://reactnavigation.org) (bottom tabs + native stack)
- React Context for cart, favorites, and order state (no backend, no persistence)

See [CLAUDE.md](./CLAUDE.md) for a deeper architecture overview.
