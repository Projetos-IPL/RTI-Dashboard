import {
  Card,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import { ClipLoader } from "react-spinners";

function EntranceImageModal({ showModal, handleClose, entranceRecord }) {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");

  // Obter imagem
  useEffect(() => {
    if (!showModal) {
      return;
    }

    setLoading(true);
    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_IMAGES_API_ROUTE, {
      entrance_log_id: entranceRecord.entranceLogId,
    })
      .then((r) => {
        if (r.data.length !== 0) {
          setImage(r.data[0].image);
        }
      })
      .catch((err) => handleException(err))
      .finally(() => setLoading(false));
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <ModalHeader closeButton>
        <ModalTitle>
          Movimento #{entranceRecord.entranceLogId}
          <span className="fw-normal">
            {" - "}({entranceRecord.formattedTimestamp})
          </span>
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        {!loading &&
          (image.length === 0 && !loading ? (
            <Container
              className="p-4"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <i className="fa-solid fa-eye-slash fa-2x mb-4" />
              <h4 className={"fw-normal"}>Não foi capturada uma imagem </h4>
            </Container>
          ) : (
            <img
              src={"data:image/jpeg;charset=utf-8;base64," + image}
              width="100%"
            />
          ))}
        <ClipLoader loading={loading} css="display: block; margin: 0 auto;" />
      </ModalBody>
    </Modal>
  );
}

export default EntranceImageModal;
