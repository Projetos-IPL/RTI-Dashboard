import React, { createRef } from "react";
import { BarLoader } from "react-spinners";

function LoginForm({ loading, submitAction }) {
  const username = createRef();
  const password = createRef();

  const submitButtonClickHandler = (e) => {
    e.preventDefault();

    const formData = {
      username: username.current.value,
      password: password.current.value,
    };

    submitAction(formData);
  };

  return (
    <form>
      <div className="form-floating mb-2">
        <input
          ref={username}
          className="form-control"
          id="username-input"
          placeholder="Utilizador"
          type="text"
        />
        <label htmlFor="username-input">Utilizador</label>
      </div>
      <div className="form-floating">
        <input
          ref={password}
          className="form-control"
          id="password-input"
          placeholder="Palavra-Passe"
          type="password"
        />
        <label htmlFor="password-input">Palavra-Passe</label>
      </div>
      <button
        onClick={submitButtonClickHandler}
        id="submit-input"
        type="submit"
        className="w-100 btn btn-lg btn-dark mt-4"
      >
        {"Entrar"}
      </button>
      <BarLoader
        loading={loading}
        css="display: block; margin: 0 auto; margin-top: 1.5rem; width: available;"
      />
      <p className="mt-5 mb-3 text-muted">
        &copy; 2022 - Afonso Santos, Iúri Raimundo
      </p>
    </form>
  );
}

export default LoginForm;
