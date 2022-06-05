import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { API_ROUTES } from "../../../config.js";

function WebcamFeed() {
  return (
    <Card>
      <Card.Header>Webcam</Card.Header>
      <Card.Body>
        <img
          alt="Feed da Webcam"
          src={API_ROUTES.RPI_URL + "feed"}
          style={{ maxWidth: "100%", border: "1px solid black" }}
        />

        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Button variant="outline-success" size="sm">
              <i className="fa-solid fa-camera me-2" /> Capturar Foto
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button variant="outline-secondary" size="sm">
              <i className="fa-solid fa-archive me-2" /> Ver Fotos
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default WebcamFeed;
