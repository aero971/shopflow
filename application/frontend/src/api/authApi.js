import { apiFetch } from './client.js';

export function register({ name, email, password, address }) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: { name, email, password, address },
  });
}

export function login({ email, password }) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}
