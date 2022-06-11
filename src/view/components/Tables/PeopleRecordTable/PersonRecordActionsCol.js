import EditPersonModal from "../../Modals/EditPersonModal.js";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { API_ROUTES } from "../../../../config.js";
import { toast } from "react-toastify";
import { TOAST_SUCCESS_CONFIG } from "../../../../utils/toastConfigs.js";
import { handleException } from "../../../../utils/handleException.js";
import { deleteRequestWithAuthToken } from "../../../../utils/requests.js";

function PersonRecordActionsCol({ record }) {
  const [showEditPersonModal, setShowEditPersonModal] = useState(false);

  // Handler para ativar o modal de editar pessoa
  const editPersonBtnClickHandler = () => {
    setShowEditPersonModal(true);
  };

  // Handler para o botão de apagar pessoa
  const deletePersonBtnClickHandler = () => {
    // Submeter eliminação para a API
    deleteRequestWithAuthToken(API_ROUTES.PEOPLE_API_ROUTE, {
      rfid: record.rfid,
    })
      .then((res) => {
        // Apresentar feedback
        if (res.ok) {
          toast.success(res.data, TOAST_SUCCESS_CONFIG);
        } else {
          handleException(new Error(res.data.message));
        }
      })
      .catch((err) => {
        handleException(err);
      });
  };

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={editPersonBtnClickHandler}
        className="me-2"
      >
        <i className="fas fa-pencil text-white" />
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={deletePersonBtnClickHandler}
        className="me-1"
      >
        <i className="fas fa-trash" />
      </Button>
      <EditPersonModal
        showModal={showEditPersonModal}
        setShowModal={setShowEditPersonModal}
        record={record}
      />
    </>
  );
}

export default PersonRecordActionsCol;
