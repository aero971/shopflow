import { apiFetch } from './client.js';

export function getCart(token) {
  return apiFetch('/cart', { token });
}

export function addToCart(token, productId, quantity) {
  return apiFetch('/cart/items', {
    method: 'POST',
    token,
    body: { productId, quantity },
  });
}

export function updateCartItem(token, productId, quantity) {
  return apiFetch(`/cart/items/${productId}`, {
    method: 'PUT',
    token,
    body: { quantity },
  });
}

export function removeCartItem(token, productId) {
  return apiFetch(`/cart/items/${productId}`, {
    method: 'DELETE',
    token,
  });
}

export function clearCart(token) {
  return apiFetch('/cart', {
    method: 'DELETE',
    token,
  });
}
