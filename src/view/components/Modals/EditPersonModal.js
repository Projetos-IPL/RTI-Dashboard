import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_ROUTES } from "../../../config.js";
import { putRequestWithAuthToken } from "../../../utils/requests.js";
import { toast } from "react-toastify";
import { TOAST_SUCCESS_CONFIG } from "../../../utils/toastConfigs.js";
import { handleException } from "../../../utils/handleException.js";
import PersonFormModal from "./PersonFormModal.js";

/**
 * @param {boolean} showModal
 * @param {Person} record
 * @param {Function} setShowModal
 * @returns {JSX.Element}
 */
function EditPersonModal({ showModal, record, setShowModal }) {
  // Função para fechar o modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Função para tratar a submissão do formulário de editar pessoa
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    // Submeter dados para a API
    putRequestWithAuthToken(API_ROUTES.PEOPLE_API_ROUTE, {
      rfid: record.rfid,
      newRfid: values.rfid,
    })
      .then((res) => {
        // Apresentar feeback
        if (res.ok) {
          toast.success(res.data, TOAST_SUCCESS_CONFIG);
          handleClose();
        } else {
          handleException(new Error(res.data.message));
        }
      })
      .catch((err) => {
        handleException(err);
        handleClose();
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <PersonFormModal
      showModal={showModal}
      setShowModal={setShowModal}
      record={record}
      editMode={true}
      handleSubmit={handleSubmit}
    />
  );
}

export default EditPersonModal;
