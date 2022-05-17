import { AUTH_TOKEN_HEADER_NAME } from "./constants";
import authUtils from "./authUtils";

/**
 * Função para efetuar um pedido http
 * @param {String} url URL
 * @param {String} method Método HTTP
 * @param {Object | null }headers Cabeçalhos
 * @param {Object | null} data Dados
 * @returns {Promise<Response<any, Record<string, any>, number>>}
 */
export async function request(url = "", method = "", headers = {}, data = {}) {
  let init = {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  if (data) {
    init.body = JSON.stringify(data);
  }

  return await fetch(url, init);
}

/**
 * Função para efetuar um pedido http post
 * @param {String} url URL
 * @param {Object | null}data Dados
 * @returns {Promise<Response<*, Record<string, *>, number>>}
 */
export async function postData(url = "", data = {}) {
  return request(url, "POST", null, data);
}

/**
 * Função para efetuar um pedido http post com o token de autenticação no cabeçalho
 * @param {String} url URL
 * @param {Object | null}data Dados
 * @returns {Promise<Response<*, Record<string, *>, number>>}
 */
export async function postDataWithAuthToken(url = "", data = {}) {
  return request(
    url,
    "POST",
    { [AUTH_TOKEN_HEADER_NAME]: authUtils.getAuthTokenFromStorage() },
    data
  );
}

/**
 * Função para efetuar um pedido http get
 * @param url URL
 * @returns {Promise<Response<*, Record<string, *>, number>>}
 */
export async function getData(url = "") {
  return request(url, "GET", null, null);
}

/**
 * Função para efetuar um pedido http get com o token de autenticação no cabeçalho
 * @param url URL
 * @returns {Promise<Response<*, Record<string, *>, number>>}
 */
export async function getDataWithAuthToken(url = "") {
  return request(
    url,
    "GET",
    { [AUTH_TOKEN_HEADER_NAME]: authUtils.getAuthTokenFromStorage() },
    null
  );
}

const requests = {
  request,
  postData,
  postDataWithAuthToken,
  getData,
  getDataWithAuthToken,
};

export default requests;
