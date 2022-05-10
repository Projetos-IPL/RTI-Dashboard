import React, { useState } from "react";

function LoginForm({ onLoginFormSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassowrdChange = (e) => {
    setPassword(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    onLoginFormSubmit(loginData);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <i className="fa-solid fa-building-shield login-logo"></i>
      <h1 className="h3 my-4 fw-normal">Sistema de Segurança</h1>

      <div className="form-floating mb-2">
        <input
          className="form-control"
          id="username-input"
          placeholder="Utilizador"
          type="text"
          value={username}
          onChange={onChangeUsernameChange}
        />
        <label htmlFor="username-input">Utilizador</label>
      </div>
      <div className="form-floating">
        <input
          className="form-control"
          id="password-input"
          placeholder="Palavra-Passe"
          type="password"
          value={password}
          onChange={onChangePassowrdChange}
        />
        <label htmlFor="password-input">Palavra-Passe</label>
      </div>
      <button
        className="w-100 btn btn-lg btn-dark mt-4"
        id="submit-input"
        type="submit"
      >
        {"Entrar"}
        <i
          className="fa-solid fa-spinner fa-spin-pulse"
          id="loading-spinner"
        ></i>
      </button>
      <p className="mt-5 mb-3 text-muted">
        &copy; 2022 - Afonso Santos, Iúri Raimundo
      </p>
    </form>
  );
}

export default LoginForm;
