import { toast } from "react-toastify";
import { TOAST_ERROR_CONFIG } from "./toastConfigs";

/**
 * Função para tratar erros na aplicação de forma genérica
 * @param e
 */
export function handleException(e) {
  console.log(e);
  // Apresentar notificação do erro
  toast.error(e.message, TOAST_ERROR_CONFIG);
}
