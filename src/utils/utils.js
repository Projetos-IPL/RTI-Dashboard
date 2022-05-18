/**
 * Funções de utilidade genéricas
 */

import {
  LOGIN_TIMESTAMP_STORAGE_NAME,
  USERNAME_STORAGE_NAME,
} from "./constants";
import { APP_ROUTES } from "../config.js";

/**
 * Função para definir o username no local storage
 * @param username
 */
export function storeUsernameInStorage(username) {
  localStorage.setItem(USERNAME_STORAGE_NAME, username);
}

/**
 * Função para obter o username do local storage
 * @returns {string} Username
 */
export function getUsernameFromStorage() {
  return localStorage.getItem(USERNAME_STORAGE_NAME);
}

/**
 * Função para definir o login timestamp no local storage
 * @param timestamp
 */
export function storeLoginTimestampInStorage(timestamp) {
  localStorage.setItem(LOGIN_TIMESTAMP_STORAGE_NAME, timestamp);
}

/**
 * Função para obter o login timestamp do local storage
 * @returns {string}
 */
export function getLoginTimestampFromStorage() {
  return localStorage.getItem(LOGIN_TIMESTAMP_STORAGE_NAME);
}

/**
 * Função para redirecionar a aplicação para a página de login
 */
export function redirectToLoginScreen() {
  window.location.href = APP_ROUTES.LOGIN_SCREEN_ROUTE;
}
