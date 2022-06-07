// Configurações

// API
export const LOCAL_URL = "http://localhost:81/api";
export const PROD_URL = "https://rti-api.afonsosantos.me/api";
export const API_URL = process.env.NODE_ENV === "dev" ? LOCAL_URL : PROD_URL;
export const AUTH_API_ROUTE = API_URL + "/auth.php";
export const ENTRANCE_LOGS_API_ROUTE = API_URL + "/movimentos.php";
export const PEOPLE_API_ROUTE = API_URL + "/pessoas.php";
export const PERMISSIONS_API_ROUTE = API_URL + "/permissoes.php";
export const SENSOR_LOG_API_ROUTE = API_URL + "/registosDeSensor.php";
export const ACTUATOR_LOG_API_ROUTE = API_URL + "/registosDeAtuador.php";
export const VIEWS_API_ROUTE = API_URL + "/views.php";
export const SENSOR_TYPES_API_ROUTE = API_URL + "/sensorTypes.php";
export const ACTUATOR_TYPES_API_ROUTE = API_URL + "/actuatorTypes.php";
export const ENTRANCE_LOGS_IMAGES_API_ROUTE = API_URL + "/imagensMovimento.php";

export const API_ROUTES = {
  AUTH_API_ROUTE,
  ENTRANCE_LOGS_API_ROUTE,
  PEOPLE_API_ROUTE,
  PERMISSIONS_API_ROUTE,
  SENSOR_LOG_API_ROUTE,
  ACTUATOR_LOG_API_ROUTE,
  VIEWS_API_ROUTE,
  SENSOR_TYPES_API_ROUTE,
  ACTUATOR_TYPES_API_ROUTE,
  ENTRANCE_LOGS_IMAGES_API_ROUTE,
};

// Aplicação
export const DASHBOARD_ROUTE = "/";
export const LOGIN_SCREEN_ROUTE = "/login";
export const MAIN_SCREEN_ROUTE = "/";
export const PEOPLE_SCREEN_ROUTE = "/pessoas";
export const PERMISSIONS_SCREEN_ROUTE = "/permissoes";
export const ENTRANCES_SCREEN_ROUTE = "/movimentos";
export const SENSOR_LOG_SCREEN_ROUTE = "/registosDeSensor";
export const ACTUATOR_LOG_SCREEN_ROUTE = "/registosDeAtuador";
export const ENTRANCE_LOG_IMAGES_SCREEN_ROUTE = "/imagensDeMovimento";

export const APP_ROUTES = {
  DASHBOARD_ROUTE,
  LOGIN_SCREEN_ROUTE,
  MAIN_SCREEN_ROUTE,
  PEOPLE_SCREEN_ROUTE,
  PERMISSIONS_SCREEN_ROUTE,
  ENTRANCES_SCREEN_ROUTE,
  SENSOR_LOG_SCREEN_ROUTE,
  ACTUATOR_LOG_SCREEN_ROUTE,
  ENTRANCE_LOG_IMAGES_SCREEN_ROUTE,
};

// IoT
export const RPI_URL = "http://10.20.229.193:8080";
export const STREAMING_URL = RPI_URL + "/feed";
export const TAKE_PICTURE = RPI_URL + "/photo";

export const IOT_ROUTES = {
  RPI_URL,
  STREAMING_URL,
  TAKE_PICTURE,
};
