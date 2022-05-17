import authUtils from "../../../../utils/authUtils";
import { API_URL, AUTH_API_ROUTE } from "../../../../config";
import { postData } from "../../../../utils/requests";
import {
  storeLoginTimestampInStorage,
  storeUsernameInStorage,
} from "../../../../utils/utils";
import { handleException } from "../../../../utils/handleException";

/**
 * Função para efetuar o login, o que nesta aplicação significa armazenar o token e informação sobre o utilizador no local storage.
 * @param username
 * @param password
 * @returns {Promise<boolean>}
 */
export async function login(username, password) {
  // Efetuar pedido http ao endpoint de autenticação para obter o token de autenticação
  const res = await postData(API_URL + AUTH_API_ROUTE, { username, password })
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
