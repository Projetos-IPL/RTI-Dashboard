import React from "react";
import { Button, Card } from "react-bootstrap";

function WebcamFeed() {
  return (
    <Card>
      <Card.Header>Webcam</Card.Header>
      <Card.Body>
        <Card.Text>
          <img
            src="http://10.20.228.61:8080/"
            alt="Webcam"
            style={{ maxWidth: "100%" }}
          />

          <Button variant="success" className="mt-4">
            <i className="fa-solid fa-camera me-1"></i> Tirar Foto
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WebcamFeed;
