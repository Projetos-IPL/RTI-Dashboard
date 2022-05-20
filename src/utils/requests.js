import { AUTH_TOKEN_HEADER_NAME } from "./constants";
import authUtils from "./authUtils";
import { LOCAL_URL } from "../config.js";

/**
 * Função para efetuar um pedido http
 * @param {String} url URL
 * @param urlParams
 * @param {String} method Método HTTP
 * @param {Object | null }headers Cabeçalhos
 * @param {Object | null} data Dados
 * @returns {Promise<Response<any, Record<string, any>, number>>}
 */
export async function request(
  url = "",
  urlParams = {},
  method = "",
  headers = {},
  data = {}
) {
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

  if (urlParams) {
    url = url + "?" + new URLSearchParams(urlParams);
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
  return request(url, null, "POST", null, data);
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
    null,
    "POST",
    { [AUTH_TOKEN_HEADER_NAME]: authUtils.getAuthTokenFromStorage() },
    data
  );
}

/**
 * Função para efetuar um pedido http get
 * @param url URL
 * @param urlParams
 * @returns {Promise<Response<*, Record<string, *>, number>>}
 */
export async function getData(url = "", urlParams = {}) {
  return request(url, urlParams, "GET", null, null);
}

/**
 * Função para efetuar um pedido http get com o token de autenticação no cabeçalho
 * @param url URL
 * @param urlParams
 * @returns {Promise<Response<*, Record<string, *>, number>>}
 */
export async function getDataWithAuthToken(url = "", urlParams = {}) {
  let headers = {
    [AUTH_TOKEN_HEADER_NAME]: authUtils.getAuthTokenFromStorage(),
  };
  return request(url, urlParams, "GET", headers, null);
}

const requests = {
  request,
  postData,
  postDataWithAuthToken,
  getData,
  getDataWithAuthToken,
};

export default requests;
