/**
 * Efetua um pedido HTTP a um recurso.
 * @param method Método HTTP a utilizar no pedido
 * @param url URL do recurso
 * @param data Dados a enviar no pedido
 * @param token Token de autenticação a enviar no pedido
 * @returns {Promise<unknown>}
 */

function request(method, url, data, token) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-type", "application/json");

    if (token) {
      xhr.setRequestHeader("x-auth-token", token);
    }

    if (data) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        if (xhr.getResponseHeader("content-type").includes("json")) {
          return resolve(JSON.parse(xhr.response));
        } else {
          return resolve(xhr.response);
        }
      } else if (xhr.readyState === 4) {
        if (xhr.getResponseHeader("content-type").includes("json")) {
          return reject(JSON.parse(xhr.response));
        } else {
          return reject(xhr.response);
        }
      }
    };
  });
}
