import React, { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { handleException } from "../../../utils/handleException";
import { APP_ROUTES } from "../../../config";
import authUtils from "../../../utils/authUtils.js";
import { Row, Col } from "react-bootstrap";
import "./LoginScreen.css";

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
    <div className="bg-light">
      <Row>
        <Col className="bg-dark text-light text-center p-5">
          <i className="fa-solid fa-building-shield fa-4x mb-4" />
          <h2 className="fw-normal">Sistema de Segurança</h2>
          <small>UC de Redes e Tecnologias da Internet - 2022</small>
        </Col>
      </Row>

      <Row>
        <Col
          sm={12}
          style={{ maxWidth: "330px" }}
          className="mt-5 p-4 m-auto vh-100"
        >
          <div id="error-banner" role="alert"></div>
          <LoginForm submitAction={loginFormSubmitAction} loading={loading} />
        </Col>
      </Row>
    </div>
  );
}

export default LoginScreen;
