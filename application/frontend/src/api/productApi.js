import { apiFetch } from './client.js';

export function getProducts() {
  return apiFetch('/products');
}

export function getProduct(id) {
  return apiFetch(`/products/${id}`);
}

// Admin-only. The backend enforces the ADMIN role check server-side;
// the token is required just to reach the endpoint at all.
export function createProduct(token, product) {
  return apiFetch('/products', {
    method: 'POST',
    token,
    body: product,
  });
}

export function updateProduct(token, id, product) {
  return apiFetch(`/products/${id}`, {
    method: 'PUT',
    token,
    body: product,
  });
}

export function deleteProduct(token, id) {
  return apiFetch(`/products/${id}`, {
    method: 'DELETE',
    token,
  });
}
