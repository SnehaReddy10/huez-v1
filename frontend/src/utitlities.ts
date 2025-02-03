import { TOKEN } from './constants';

export function setToken(token: string) {
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function logout() {
  localStorage.removeItem(TOKEN);
}
