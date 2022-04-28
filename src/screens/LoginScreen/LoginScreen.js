import React from "react";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import "./LoginScreen.css";

function LoginScreen() {
  return (
    <main className="form-signin">
      <LoginForm />
    </main>
  );
}

export default LoginScreen;