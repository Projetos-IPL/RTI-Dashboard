import React from "react";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { ENTRANCE_LOG_IMAGES_SCREEN_ROUTE } from "../../../config.js";

function WebcamFeed() {
  return (
    <Card className="shadow-sm">
      <Card.Header>Webcam</Card.Header>
      <Card.Body className="my-3">
        {/*<img
          alt="Feed da Webcam"
          src={API_ROUTES.RPI_URL + "feed"}
          style={{ maxWidth: "100%", border: "1px solid black" }}
        />*/}

        <ButtonGroup>
          <Button variant="danger" size="md">
            <i className="fa-solid fa-video me-2" /> Ao Vivo
          </Button>
          <Button variant="success" size="md">
            <i className="fa-solid fa-camera me-2" /> Capturar Foto
          </Button>
          <a
            className="btn btn-outline-secondary"
            href={ENTRANCE_LOG_IMAGES_SCREEN_ROUTE}
          >
            <i className="fa-solid fa-archive me-2" /> Ver Fotos
          </a>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default WebcamFeed;
