import { apiFetch } from './client.js';

export function checkout(token) {
  return apiFetch('/orders/checkout', {
    method: 'POST',
    token,
  });
}

export function getOrders(token) {
  return apiFetch('/orders', { token });
}

export function getOrder(token, id) {
  return apiFetch(`/orders/${id}`, { token });
}

// Admin-only.
export function getAllOrdersAdmin(token) {
  return apiFetch('/admin/orders', { token });
}

export function updateOrderStatusAdmin(token, id, status) {
  return apiFetch(`/admin/orders/${id}/status`, {
    method: 'PUT',
    token,
    body: { status },
  });
}
