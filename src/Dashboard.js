/**
 * Componente raiz do Dashboard
 */

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";

import { APP_ROUTES } from "./config";
import authUtils from "./utils/authUtils";
import { getUsernameFromStorage } from "./utils/utils";
import { TOAST_SUCCESS_CONFIG } from "./utils/toastConfigs";
import { handleException } from "./utils/handleException.js";

import Navbar from "./view/components/Navbar/Navbar";

import MainScreen from "./view/screens/MainScreen/MainScreen";
import PeopleScreen from "./view/screens/PeopleScreen/PeopleScreen.js";
import PermissionsScreen from "./view/screens/PermissionsScreen/PermissionsScreen.js";

function Dashboard() {
  // Validar a sessão a cada refrescamento da aplicação, se a sessão for inválida
  // redirecionar para o ecrã de login
  useEffect(() => {
    authUtils
      .validateSession()
      .then((res) => {
        if (!res) {
          authUtils.logout();
        }
      })
      .catch((err) => {
        handleException(err.message);
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
      <Navbar />
      <Routes>
        <Route path={APP_ROUTES.MAIN_SCREEN_ROUTE} element={<MainScreen />} />
        <Route
          path={APP_ROUTES.PEOPLE_SCREEN_ROUTE}
          element={<PeopleScreen />}
        />
        <Route
          path={APP_ROUTES.PERMISSIONS_SCREEN_ROUTE}
          element={<PermissionsScreen />}
        />
      </Routes>
    </>
  );
}

export default Dashboard;
