/**
 * Componente raiz do Dashboard
 */

import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  APP_ROUTES,
  DATA_ENTITY_STATE_CHANGE_EVENT,
  WEB_SOCKET_SERVER_URL,
} from "./config";
import authUtils from "./utils/authUtils";
import { handleException } from "./utils/handleException.js";

import Navbar from "./view/components/Navbar/Navbar";

import MainScreen from "./view/screens/MainScreen/MainScreen";
import PeopleScreen from "./view/screens/PeopleScreen/PeopleScreen.js";
import PermissionsScreen from "./view/screens/PermissionsScreen/PermissionsScreen.js";
import EntrancesScreen from "./view/screens/EntrancesScreen/EntrancesScreen.js";
import SensorLogScreen from "./view/screens/SensorLogScreen/SensorLogScreen.js";
import ActuatorLogScreen from "./view/screens/ActuatorLogScreen/ActuatorLogScreen.js";
import ImageScreen from "./view/screens/ImageScreen/ImageScreen.js";
import {
  GlobalDataStateEvent,
  GlobalDataStateEventDefault,
} from "./GlobalDataStateEvent.js";
import { toast } from "react-toastify";
import { TOAST_SUCCESS_CONFIG } from "./utils/toastConfigs.js";
import { getUsernameFromStorage } from "./utils/utils.js";

import socketIOClient from "socket.io-client";
import { createDataStateEvent } from "./utils/globalDataStateUtils.js";

function Dashboard() {
  const [dataStateEvent, setDataStateEvent] = useState(
    GlobalDataStateEventDefault.dataStateEvent
  );

  // Inicializar web socket
  useEffect(() => {
    const socket = socketIOClient(WEB_SOCKET_SERVER_URL);

    // Ao receber um evento de atualização de uma entidade atualizar o dataState para forçar a serem
    // recarregados os dados
    socket.on(DATA_ENTITY_STATE_CHANGE_EVENT, (dataEntity) => {
      createDataStateEvent(dataEntity, setDataStateEvent);
      toast.info("Event received, data: " + dataEntity);
    });
  }, []);

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
    <GlobalDataStateEvent.Provider
      value={{ dataStateEvent, setDataStateEvent }}
    >
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
        <Route
          path={APP_ROUTES.ENTRANCES_SCREEN_ROUTE}
          element={<EntrancesScreen />}
        />
        <Route
          path={APP_ROUTES.SENSOR_LOG_SCREEN_ROUTE}
          element={<SensorLogScreen />}
        />
        <Route
          path={APP_ROUTES.ACTUATOR_LOG_SCREEN_ROUTE}
          element={<ActuatorLogScreen />}
        />
        <Route
          path={APP_ROUTES.ENTRANCE_LOG_IMAGES_SCREEN_ROUTE}
          element={<ImageScreen />}
        />
      </Routes>
    </GlobalDataStateEvent.Provider>
  );
}

export default Dashboard;
