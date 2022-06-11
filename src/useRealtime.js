import React, { useContext, useEffect } from "react";
import { GlobalDataStateEvent } from "./GlobalDataStateEvent.js";

/**
 * Custom hook para executar uma função quando o estado uma ou várias entidades é alterado
 * @param dataEntities Entidades a ser verificadas, se forem alteraras a callback é executada
 * @param callback Função a ser executada quando a entidade foi atualizada
 */
export function useRealtime(dataEntities: Array | string, callback: function) {
  const { dataStateEvent } = useContext(GlobalDataStateEvent);

  if (typeof dataEntities === "string") {
    dataEntities = [dataEntities];
  }

  // Chamar a callback ao inicializar
  useEffect(() => {
    callback();
  }, []);

  // Chamar a callback quando é acionado um evento de alteração de dados, apenas se a entidade
  // alterado for uma das enviadas para o useRealtime hook
  useEffect(() => {
    for (let i = 0; i < dataEntities.length; i++) {
      if (dataStateEvent.dataEntity === dataEntities[i]) {
        callback();
        break;
      }
    }
  }, [dataStateEvent]);
}
