/**
 * Funções de utilidade genéricas
 */

import {
  LOGIN_TIMESTAMP_STORAGE_NAME,
  USERNAME_STORAGE_NAME,
} from "./constants";

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
