import React, { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginScreen.css";
import { handleException } from "../../../utils/handleException";
import { APP_ROUTES } from "../../../config";
import authUtils from "../../../utils/authUtils.js";
import LoadingSpinner from "../../components/Loading/LoadingSpinner.js";
import { RingLoader } from "react-spinners";

function LoginScreen() {
  const [loading, setLoading] = useState(false);

  /**
   * Função para tratar a submissão do formulário de login
   * @param formData
   */
  const loginFormSubmitAction = (formData) => {
    // Efetuar login
    setLoading(true);
    authUtils
      .login(formData.username, formData.password)
      .then((res) => {
        setLoading(false);
        if (res) {
          // Redirecionar para a página principal
          window.location.href = APP_ROUTES.DASHBOARD_ROUTE;
        } else {
          handleException(new Error("Credenciais inválidas."));
        }
      })
      .catch((err) => handleException(err));
  };

  return (
    <main className="form-signin">
      <i className="fa-solid fa-building-shield login-logo" />
      <h1 className="h3 my-4 fw-normal">Sistema de Segurança</h1>

      <div id="error-banner" role="alert" />
      <LoginForm submitAction={loginFormSubmitAction} loading={loading} />
    </main>
  );
}

export default LoginScreen;
