import constants from "./constants";
import { getData, getDataWithAuthToken } from "./requests";
import { API_URL, AUTH_API_ROUTE } from "../config";

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
    let res = await getDataWithAuthToken(API_URL + AUTH_API_ROUTE).then(
      (res) => res
    );

    validSession = res.ok;
  }

  return validSession;
}

const authUtils = {
  getAuthTokenFromStorage,
  storeAuthTokenInStorage,
  validateSession: validateSession,
};

export default authUtils;
