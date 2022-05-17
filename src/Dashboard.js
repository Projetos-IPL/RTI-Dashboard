/**
 * Componente raiz do Dashboard
 */

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import authUtils from "./utils/authUtils";
import { APP_ROUTES } from "./config";
import MainScreen from "./view/screens/MainScreen/MainScreen";
import { TOAST_SUCCESS_CONFIG } from "./utils/toastConfigs";
import { getUsernameFromStorage } from "./utils/utils";

function Dashboard() {
  let navigate = useNavigate();

  // Validar a sessão a cada refrescamento da aplicação, se a sessão for inválida
  // redirecionar para o ecrã de login
  useEffect(() => {
    authUtils.validateSession().then((res) => {
      console.log(res);
      if (!res) {
        window.location.href = APP_ROUTES.LOGIN_SCREEN_ROUTE;
      }
    });
  });

  // Mostrar mensagem de bem vindo
  useEffect(() => {
    toast.success(
      "Bem vindo, " + getUsernameFromStorage(),
      TOAST_SUCCESS_CONFIG
    );
  }, []);

  return (
    <>
      <Routes>
        <Route path={APP_ROUTES.MAIN_SCREEN_ROUTE} element={<MainScreen />} />
      </Routes>
    </>
  );
}

export default Dashboard;
