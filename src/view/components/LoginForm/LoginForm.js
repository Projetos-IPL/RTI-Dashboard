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
    <React.Fragment>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="username-input" className="mb-2">
            Utilizador
          </label>
          <input
            ref={username}
            className="form-control"
            id="username-input"
            placeholder="Utilizador"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password-input" className="mb-2">
            Palavra-Passe
          </label>
          <input
            ref={password}
            className="form-control"
            id="password-input"
            placeholder="Palavra-Passe"
            type="password"
          />
        </div>

        <BarLoader
          loading={loading}
          css="display: block; margin: 1.5rem auto 0; width: available;"
        />

        <button
          onClick={submitButtonClickHandler}
          id="submit-input"
          type="submit"
          className="w-100 btn btn-dark mt-5 shadow-sm"
        >
          {"Entrar"}
        </button>
      </form>
    </React.Fragment>
  );
}

export default LoginForm;
