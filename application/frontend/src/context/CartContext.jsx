import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as cartApi from '../api/cartApi.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!token) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const data = await cartApi.getCart(token);
      setCart(data);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Reload the cart whenever auth state changes - fetch it on login,
  // drop it from memory on logout (the server-side cart is untouched;
  // it's still there next time this user logs in).
  useEffect(() => {
    if (isAuthenticated) {
      refresh();
    } else {
      setCart(null);
    }
  }, [isAuthenticated, refresh]);

  const addItem = useCallback(async (productId, quantity) => {
    await cartApi.addToCart(token, productId, quantity);
    await refresh();
  }, [token, refresh]);

  const updateItem = useCallback(async (productId, quantity) => {
    await cartApi.updateCartItem(token, productId, quantity);
    await refresh();
  }, [token, refresh]);

  const removeItem = useCallback(async (productId) => {
    await cartApi.removeCartItem(token, productId);
    await refresh();
  }, [token, refresh]);

  const clear = useCallback(async () => {
    await cartApi.clearCart(token);
    await refresh();
  }, [token, refresh]);

  const itemCount = useMemo(
    () => (cart?.items ?? []).reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const value = useMemo(() => ({
    cart,
    loading,
    itemCount,
    refresh,
    addItem,
    updateItem,
    removeItem,
    clear,
  }), [cart, loading, itemCount, refresh, addItem, updateItem, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
