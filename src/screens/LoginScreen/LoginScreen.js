import React, { useEffect, useState } from "react";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import "./LoginScreen.css";
import request from "../../utils/utils.js";

function LoginScreen() {
  const [loginResult, setLoginResult] = useState({});

  useEffect(() => {
    console.log(loginResult);
  }, [loginResult]);

  const formSubmitDataHandler = (formData) => {
    console.log(formData);

    request("POST", "auth.php", formData, null)
      .then((res) => {
        setLoginResult({
          message: "Login com sucesso",
          type: "success",
        });

        console.log(loginResult);
      })
      .catch((err) => {
        setLoginResult({
          message: err.message,
          type: "danger",
        });
      });
  };

  return (
    <main className="form-signin">
      <LoginForm
        onLoginFormSubmit={formSubmitDataHandler}
        onLoginResult={loginResult}
      />
    </main>
  );
}

export default LoginScreen;
