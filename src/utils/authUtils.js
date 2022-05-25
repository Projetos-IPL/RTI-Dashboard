import constants from "./constants";
import { getDataWithAuthToken, postData } from "./requests";
import { AUTH_API_ROUTE } from "../config";
import { handleException } from "./handleException.js";
import {
  redirectToLoginScreen,
  storeLoginTimestampInStorage,
  storeUsernameInStorage,
} from "./utils.js";

/**
 * Função para obter o token de autenticação armazenado no local storage
 * @returns {string | null} Token de autenticação
 */
function getAuthTokenFromStorage() {
  return localStorage.getItem(constants.AUTH_TOKEN_STORAGE_NAME);
}

/**
 * Função para gravar o token de autenticação no local storage
 * @param token Token de autenticação
 */
function storeAuthTokenInStorage(token) {
  localStorage.setItem(constants.AUTH_TOKEN_STORAGE_NAME, token);
}

/**
 * Função para validar a sessão atual
 */
async function validateSession() {
  let validSession;

  const token = getAuthTokenFromStorage();

  if (token === null) {
    validSession = false;
  } else {
    let res = await getDataWithAuthToken(AUTH_API_ROUTE).then((res) => res);

    validSession = res.ok;
  }

  return validSession;
}

/**
 * Função para efetuar o login, o que nesta aplicação significa armazenar o token e informação sobre o utilizador no local storage.
 * @param username
 * @param password
 * @returns {Promise<boolean>}
 */
export async function login(username, password) {
  // Efetuar pedido http ao endpoint de autenticação para obter o token de autenticação
  const res = await postData(AUTH_API_ROUTE, { username, password })
    .then((res) => res)
    .catch((err) => {
      handleException(err.message);
      return null;
    });

  // res == null quando o pedido falha
  if (res == null) {
    return false;
  }

  // Se a resposta for de sucesso, armazenar token, nome de utilizador e timestamp de login na local storage
  if (res.ok) {
    const data = await res.json().then((data) => data);

    // Armazenar token de autenticação
    authUtils.storeAuthTokenInStorage(data.token);

    // Armazenar username
    storeUsernameInStorage(data.username);

    // Armazenar hora de login
    storeLoginTimestampInStorage(data.timestamp);
  }

  return res.ok;
}

// TODO Implementar função logout
function logout() {
  localStorage.clear();
  redirectToLoginScreen();
}

const authUtils = {
  getAuthTokenFromStorage,
  storeAuthTokenInStorage,
  validateSession,
  login,
  logout,
};

export default authUtils;
