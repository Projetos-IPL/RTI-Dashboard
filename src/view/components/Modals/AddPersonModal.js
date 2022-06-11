import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_ROUTES } from "../../../config.js";
import { postDataWithAuthToken } from "../../../utils/requests.js";
import { toast } from "react-toastify";
import { TOAST_SUCCESS_CONFIG } from "../../../utils/toastConfigs.js";
import { handleException } from "../../../utils/handleException.js";
import PersonFormModal from "./PersonFormModal.js";

/**
 * @param {boolean} showModal
 * @param {Function} setShowModal
 * @returns {JSX.Element}
 */
function AddPersonModal({ showModal, setShowModal }) {
  // Função para fechar o modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Função para tratar a submissão do formulário
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    // Submeter dados para a API
    postDataWithAuthToken(API_ROUTES.PEOPLE_API_ROUTE, {
      rfid: values.rfid,
      first_name: values.firstName,
      last_name: values.lastName,
    })
      .then((res) => {
        // Apresentar feedback
        if (res.ok) {
          toast.success(res.data, TOAST_SUCCESS_CONFIG);
          handleClose();
        } else {
          handleException(new Error(res.data.message));
        }
      })
      .catch((err) => {
        // Tratar exceção e fechar modal
        handleException(err);
        handleClose();
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <PersonFormModal
      showModal={showModal}
      setShowModal={setShowModal}
      handleSubmit={handleSubmit}
    />
  );
}

export default AddPersonModal;
