import React, { useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { API_ROUTES, APP_ROUTES, IOT_ROUTES } from "../../../config.js";
import { useNavigate } from "react-router-dom";
import PhotoModal from "../Modals/PhotoModal.js";
import { getData, postData } from "../../../utils/requests.js";
import { handleException } from "../../../utils/handleException.js";

function WebcamFeed() {
  const [showStream: boolean, setShowStreaming] = useState(false);
  const [showPictureModal: boolean, setShowPictureModal] = useState(false);
  const [loading: boolean, setLoading] = useState(false);
  const [picture: string, setPicture] = useState("");

  const navigate = useNavigate();

  const toggleStream = () => {
    setShowStreaming(!showStream);
  };

  const toggleModal = (state: boolean) => {
    setShowPictureModal(state);
  };

  const takePicture = () => {
    if (showStream) {
      setShowStreaming(false);
    }

    setShowPictureModal(true);
    setLoading(true);
    getData(IOT_ROUTES.TAKE_PICTURE)
      .then((r) => setPicture(r.data.image))
      .catch((err) => handleException(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Card className="shadow-sm">
        <Card.Header className="bg-dark text-white">Webcam</Card.Header>
        <Card.Body className="my-3">
          {showStream && (
            <img
              alt="Feed da Webcam"
              src={IOT_ROUTES.STREAMING_URL}
              style={{ maxWidth: "100%", border: "1px solid black" }}
              className="mb-4"
            />
          )}

          <ButtonGroup>
            <Button variant="danger" size="md" onClick={toggleStream}>
              <i className="fa-solid fa-video me-2" /> Ao Vivo
            </Button>
            <Button variant="success" size="md" onClick={takePicture}>
              <i className="fa-solid fa-camera me-2" /> Capturar Foto
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                navigate(APP_ROUTES.ENTRANCE_LOG_IMAGES_SCREEN_ROUTE)
              }
            >
              <i className="fa-solid fa-archive me-2" /> Ver Fotos
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
      <PhotoModal
        showModal={showPictureModal}
        loading={loading}
        handleClose={() => toggleModal(false)}
        image={picture}
      />
    </>
  );
}

export default WebcamFeed;
