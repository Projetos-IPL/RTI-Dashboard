import React, { useState } from "react";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { APP_ROUTES, IOT_ROUTES } from "../../../config.js";
import { useNavigate } from "react-router-dom";
import PhotoModal from "../Modals/PhotoModal.js";
import { getData } from "../../../utils/requests.js";
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
        <Card.Body className="my-2">
          {showStream && (
            <img
              alt="Feed da Webcam"
              src={IOT_ROUTES.STREAMING_URL}
              style={{ maxWidth: "100%" }}
              className="mb-4"
            />
          )}

          <div className="d-grid gap-3">
            <ButtonGroup>
              <Button variant="danger" onClick={toggleStream} className="p-2">
                <Row>
                  <Col>
                    <i className="fas fa-video fa-xl me-2 my-3" />
                  </Col>
                </Row>
                <Row>
                  <Col>Streaming</Col>
                </Row>
              </Button>
              <Button variant="success" onClick={takePicture} className="p-2">
                <Row>
                  <Col>
                    <i className="fas fa-camera fa-xl me-2 my-3" />
                  </Col>
                </Row>
                <Row>
                  <Col>Capturar Foto</Col>
                </Row>
              </Button>
            </ButtonGroup>
            <Button
              variant="secondary"
              onClick={() =>
                navigate(APP_ROUTES.ENTRANCE_LOG_IMAGES_SCREEN_ROUTE)
              }
              className="p-2"
            >
              <i className="fa-solid fa-archive fa-lg me-2" />
              Ver Fotos
            </Button>
          </div>
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
