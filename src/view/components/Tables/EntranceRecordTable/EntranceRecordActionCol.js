import { Button } from "react-bootstrap";
import React, { useState } from "react";
import EntranceImageModal from "../../Modals/EntranceImageModal.js";

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
