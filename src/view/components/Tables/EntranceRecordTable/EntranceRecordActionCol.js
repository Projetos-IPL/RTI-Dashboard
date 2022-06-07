import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import EntranceImageModal from "../../Modals/EntranceImageModal.js";
import { getDataWithAuthToken } from "../../../../utils/requests.js";
import { API_ROUTES } from "../../../../config.js";
import { handleException } from "../../../../utils/handleException.js";

function EntranceRecordActionCol({ record }) {
  const [showEntranceLogImageModal: boolean, setShowEntranceLogImageModal] =
    useState(false);

  const openModal = () => {
    setShowEntranceLogImageModal(true);
  };

  const closeModal = () => {
    setShowEntranceLogImageModal(false);
  };

  return (
    <>
      <Button variant="dark" size="sm" onClick={openModal} className="me-1">
        <i className="fa-solid fa-eye" />
      </Button>
      <EntranceImageModal
        showModal={showEntranceLogImageModal}
        handleClose={closeModal}
        entranceRecord={record}
        record={record}
      />
    </>
  );
}

export default EntranceRecordActionCol;
