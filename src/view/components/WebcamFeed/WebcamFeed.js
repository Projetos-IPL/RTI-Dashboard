import React from "react";
import { Button, Card } from "react-bootstrap";
import { API_ROUTES } from "../../../config.js";

function WebcamFeed() {
  return (
    <Card>
      <Card.Header>Webcam</Card.Header>
      <Card.Body>
        <Card.Text>
          <img
            src={API_ROUTES.RPI_URL + "feed"}
            alt="Webcam"
            style={{ maxWidth: "100%" }}
          />

          <Button variant="success" className="mt-4">
            <i className="fa-solid fa-camera me-1" /> Tirar Foto
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WebcamFeed;
