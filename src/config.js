// Configurações

// API
export const LOCAL_URL = "http://localhost:81/api";
export const PROD_URL = "https://rti-api.afonsosantos.me/api";
export const API_URL = PROD_URL;
export const AUTH_API_ROUTE = API_URL + "/auth.php";
export const ENTRANCE_LOGS_API_ROUTE = API_URL + "/movimentos.php";
export const PEOPLE_API_ROUTE = API_URL + "/pessoas.php";
export const SENSOR_LOG_API_ROUTE = API_URL + "/registoDeSensor.php";

export const API_ROUTES = {
  AUTH_API_ROUTE,
  ENTRANCE_LOGS_API_ROUTE,
  PEOPLE_API_ROUTE,
  SENSOR_LOG_API_ROUTE,
};

// Aplicação
export const DASHBOARD_ROUTE = "*";
export const LOGIN_SCREEN_ROUTE = "/login";
export const MAIN_SCREEN_ROUTE = "/";
export const PEOPLE_SCREEN_ROUTE = "/pessoas";

export const APP_ROUTES = {
  DASHBOARD_ROUTE,
  LOGIN_SCREEN_ROUTE,
  MAIN_SCREEN_ROUTE,
  PEOPLE_SCREEN_ROUTE,
};
