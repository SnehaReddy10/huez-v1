import { CART, TOKEN } from './constants';

export function setToken(token: string) {
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function logout() {
  clearCart();
  localStorage.removeItem(TOKEN);
}

export function getCart() {
  return localStorage.getItem(CART);
}

export function setCart(cart: string) {
  localStorage.setItem(CART, cart);
}

export function clearCart() {
  localStorage.removeItem(CART);
}
