import { Button, Card, Col, Row } from "react-bootstrap";
import React from "react";
import { postDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES, IOT_EVENTS } from "../../../config.js";
import { toast } from "react-toastify";
import {
  TOAST_ERROR_CONFIG,
  TOAST_SUCCESS_CONFIG,
} from "../../../utils/toastConfigs.js";

function IoTActionCard() {
  const handleToggleLights = () => {
    // Adicionar evento de alternar as luzes

    postDataWithAuthToken(API_ROUTES.EVENTS_API_ROUTE, {
      event_name: IOT_EVENTS.TOGGLE_LIGHTS,
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
        toast.error(
          "Evento já registado, aguarde por favor.",
          TOAST_ERROR_CONFIG
        );
      });
  };

  const handleOpenDoors = () => {
    // Adicionar evento de abrir as portas

    postDataWithAuthToken(API_ROUTES.EVENTS_API_ROUTE, {
      event_name: IOT_EVENTS.OPEN_DOORS,
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
        toast.error(
          "Evento já registado, aguarde por favor.",
          TOAST_ERROR_CONFIG
        );
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
                <Col>Abrir Portas</Col>
              </Row>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default IoTActionCard;
