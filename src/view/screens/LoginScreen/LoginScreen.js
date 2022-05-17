import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginScreen.css";
import { login } from "./actions/login";
import { handleException } from "../../../utils/handleException";
import { APP_ROUTES } from "../../../config";

function LoginScreen() {
  /**
   * Função para tratar a submissão do formulário de login
   * @param formData
   */
  const loginFormSubmitAction = (formData) => {
    // Efetuar login
    login(formData.username, formData.password).then((res) => {
      if (res) {
        // Redirecionar para a página principal
        window.location.href = APP_ROUTES.DASHBOARD_ROUTE;
      } else {
        handleException(new Error("Credenciais inválidas."));
      }
    });
  };

  return (
    <main className="form-signin">
      <i className="fa-solid fa-building-shield login-logo" />
      <h1 className="h3 my-4 fw-normal">Sistema de Segurança</h1>

      <div id="error-banner" role="alert" />
      <LoginForm submitAction={loginFormSubmitAction} />
    </main>
  );
}

export default LoginScreen;
