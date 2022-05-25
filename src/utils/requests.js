import { AUTH_TOKEN_HEADER_NAME } from "./constants";
import authUtils from "./authUtils";

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

  return await fetch(url, init).then(async (res) => {
    let data = await res.json().then((data) => data);

    if (res.ok) {
      return {
        statusCode: res.status,
        ok: res.ok,
        data,
      };
    } else {
      throw new Error(data.message);
    }
  });
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
 * @param url
 * @param data
 * @returns {Promise<{data: Object | Array : Object, ok: boolean, statusCode: int}>}
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
 * Função para efetuar pedidos PUT com o token de autenticação nos http headers.
 * @param url
 * @param body
 * @returns {Promise<{data: Object | Array : Object, ok: boolean, statusCode: int}>}
 */
export async function putRequestWithAuthToken(url, body) {
  return request(
    url,
    null,
    "PUT",
    { [AUTH_TOKEN_HEADER_NAME]: authUtils.getAuthTokenFromStorage() },
    body
  );
}

/**
 * Função para efetuar pedidos DELETE com o token de autenticação nos http headers.
 * @param url
 * @param body
 * @returns {Promise<{data: Object | Array : Object, ok: boolean, statusCode: int}>}
 */
export async function deleteRequestWithAuthToken(url, body) {
  return request(
    url,
    null,
    "DELETE",
    { [AUTH_TOKEN_HEADER_NAME]: authUtils.getAuthTokenFromStorage() },
    body
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
  deleteRequestWithAuthToken,
};

export default requests;
