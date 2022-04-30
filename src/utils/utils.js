function request(method, route, data, token) {
  return new Promise((resolve, reject) => {
    let url = `https://rti-api.afonsosantos.me/api/${route}`;

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

export default request;
