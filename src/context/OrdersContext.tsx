import React, { createContext, useContext, useState } from "react";

type OrdersContextValue = {
  orderCount: number;
  registerOrder: () => void;
};

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orderCount, setOrderCount] = useState(0);

  const registerOrder = () => setOrderCount((count) => count + 1);

  return (
    <OrdersContext.Provider value={{ orderCount, registerOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}
