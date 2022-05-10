import React from "react";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import "./LoginScreen.css";
import request from "../../utils/utils.js";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

function LoginScreen() {
  const formSubmitDataHandler = (formData) => {
    request("POST", "auth.php", formData, null)
      .then((res) => {
        localStorage.setItem("auth", JSON.stringify(res));

        toast.success(`Bem-vindo, ${res.username}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <main className="form-signin">
      <LoginForm onLoginFormSubmit={formSubmitDataHandler} />
      <ToastContainer />
    </main>
  );
}

export default LoginScreen;
