import EditPersonModal from "../../Modals/EditPersonModal.js";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { API_ROUTES } from "../../../../config.js";
import { toast } from "react-toastify";
import { TOAST_SUCCESS_CONFIG } from "../../../../utils/toastConfigs.js";
import { handleException } from "../../../../utils/handleException.js";
import PeopleDataContext from "../../../screens/PeopleScreen/PeopleDataContext.js";
import { deleteRequestWithAuthToken } from "../../../../utils/requests.js";

function PersonRecordActionsCol({ record }) {
  const [showEditPersonModal, setShowEditPersonModal] = useState(false);

  const { setOutdatedRecords } = useContext(PeopleDataContext);

  const editPersonBtnClickHandler = () => {
    setShowEditPersonModal(true);
  };

  const deletePersonBtnClickHandler = () => {
    deleteRequestWithAuthToken(API_ROUTES.PEOPLE_API_ROUTE, {
      rfid: record.rfid,
    })
      .then((res) => {
        if (res.ok) {
          toast.success(res.data, TOAST_SUCCESS_CONFIG);
          setOutdatedRecords(true);
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
        variant="warning"
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
