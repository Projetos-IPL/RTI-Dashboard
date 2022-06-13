import { Button, Card, Col, Row } from "react-bootstrap";
import React from "react";
import { postDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES, IOT_EVENTS } from "../../../config.js";
import { toast } from "react-toastify";
import { TOAST_SUCCESS_CONFIG } from "../../../utils/toastConfigs.js";
import { handleException } from "../../../utils/handleException.js";

function IoTActionCard() {
  const handleToggleLights = () => {
    // Adicionar evento de alternar as luzes

    postDataWithAuthToken(API_ROUTES.EVENTS_API_ROUTE, {
      event_name: IOT_EVENTS.TOGGLE_LIGHTS,
      action: IOT_EVENTS.EQ_ADD_ACTION,
    })
      .then((res) => {
        if (res.ok) {
          toast.success(
            "Evento adicionado: alternar luzes",
            TOAST_SUCCESS_CONFIG
          );
        }
      })
      .catch((e) => {
        if (e.message.includes("Duplicate")) {
          e.message = "Evento de alternar luzes pendente.";
        }
        handleException(e);
      });
  };

  const handleOpenDoors = () => {
    // Adicionar evento de abrir as portas

    postDataWithAuthToken(API_ROUTES.EVENTS_API_ROUTE, {
      event_name: IOT_EVENTS.OPEN_DOORS,
      action: IOT_EVENTS.EQ_ADD_ACTION,
    })
      .then((res) => {
        if (res.ok) {
          toast.success(
            "Evento adicionado: abrir portas",
            TOAST_SUCCESS_CONFIG
          );
        }
      })
      .catch((e) => {
        if (e.message.includes("Duplicate")) {
          e.message = "Evento de abrir portas pendente.";
        }
        handleException(e);
      });
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-dark text-white">Ações</Card.Header>
      <Card.Body className="my-2">
        <Row>
          <Col sm={12} md={6}>
            <Button
              variant="warning"
              onClick={handleToggleLights}
              className="w-100 mb-2 mb-md-0 p-2"
            >
              <Row>
                <Col>
                  <i className="fas fa-lightbulb fa-xl me-2 my-3" />
                </Col>
              </Row>
              <Row>
                <Col>Alternar Luzes</Col>
              </Row>
            </Button>
          </Col>
          <Col sm={12} md={6}>
            <Button
              variant="dark"
              onClick={handleOpenDoors}
              className="w-100 p-2"
            >
              <Row>
                <Col>
                  <i className="fas fa-door-open fa-xl me-2 my-3" />
                </Col>
              </Row>
              <Row>
                <Col>Alternar porta Portas</Col>
              </Row>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default IoTActionCard;
