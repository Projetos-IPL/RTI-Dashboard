import { Button, Card } from "react-bootstrap";
import React from "react";
import { postDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES, IOT_EVENTS } from "../../../config.js";

// TODO Desenvolver
function IoTActionCard() {
  const handleToggleLights = () => {
    // Adicionar evento de ligar luzes
    // TODO Feedback no toaster
    postDataWithAuthToken(API_ROUTES.EVENTS_API_ROUTE, {
      event_name: IOT_EVENTS.TOGGLE_LIGHTS,
    });
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-dark text-white">Ações</Card.Header>
      <Card.Body className="my-3">
        <Button variant="warning" onClick={handleToggleLights}>
          <i className="fas fa-lightbulb me-2" />
          Alternar Luzes
        </Button>
      </Card.Body>
    </Card>
  );
}

export default IoTActionCard;
