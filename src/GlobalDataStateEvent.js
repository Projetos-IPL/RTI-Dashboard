import { createContext } from "react";

export const UPDATED = "UPDATED";
export const OUTDATED = "OUTDATED";

// Estado global default, todas as entidades marcadas como desatualizadas para serem atualizadas
export const GlobalDataStateEventDefault = {
  dataStateEvent: {
    dataEntity: "",
    timestamp: "",
  },
  setDataStateEvent: function () {},
};

/**
 * Estado global da aplicação para ser consumido no Dashboard
 * @type {React.Context<{dataState: {[p: string]: string, '[DE.SENSOR_LOGS]': string, '[DE.PERMISSIONS]': string, '[DE.ENTRANCE_LOGS]': string, '[DE.PEOPLE]': string, '[DE.ACTUATOR_LOGS]': string}, setDataState: setDataState}>}
 */
export const GlobalDataStateEvent = createContext(GlobalDataStateEventDefault);
