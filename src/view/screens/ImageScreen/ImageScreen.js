import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import { ClipLoader } from "react-spinners";
import { DATA_ENTITIES } from "../../../DataEntities.js";
import { useRealtime } from "../../../useRealtime.js";

function ImageScreen() {
  const [loading, setLoading] = useState(true);
  const [entranceLogImages, setEntranceLogImages] = useState([]);
  const [imageGridSize, setImageGridSize] = useState(3);
  const [imageGridButtonText, setImageGridButtonText] =
    useState("Imagens Maiores");
  const [imageGridButtonIcon, setImageGridButtonIcon] = useState("maximize");

  /* Atualizar as imagens dos registos de entrada em tempo real, quando o dashboard recebe notificação
  de que as imagens dos registos de entrada foram atualizados */
  useRealtime(DATA_ENTITIES.ENTRANCE_LOG_IMAGES, () => {
    // Apenas apresentar o spinner quando for o primeiro fetch
    if (entranceLogImages.length === 0) {
      setLoading(true);
    }

    console.log("Fetching entrance log images...");

    // Buscar imagens à API
    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_IMAGES_API_ROUTE)
      .then((res) => {
        setEntranceLogImages(res.data);
        console.log("Entrance log images fetched!");
      })
      .catch((err) => {
        handleException(err.message);
      })
      .finally(() => setLoading(false));
  });

  const handleImageSizeToggle = () => {
    if (imageGridSize === 6) {
      setImageGridSize(3);
      setImageGridButtonText("Imagens Maiores");
      setImageGridButtonIcon("maximize");
    } else {
      setImageGridSize(6);
      setImageGridButtonText("Imagens Menores");
      setImageGridButtonIcon("minimize");
    }
  };

  return (
    <main className="container mt-5">
      <Row className="justify-content-between">
        <Col md="9">
          <h2 className="float-start">Imagens de Movimentos</h2>
        </Col>
        <Col md="3">
          <Button
            variant="dark"
            onClick={handleImageSizeToggle}
            className="float-end"
          >
            <i className={`fas fa-${imageGridButtonIcon} me-3`} />
            {imageGridButtonText}
          </Button>
        </Col>
      </Row>

      <div className="mt-5">
        <Row>
          {entranceLogImages.map((e, index) => {
            return (
              <Col md={imageGridSize} key={index}>
                <Card className="mb-4">
                  <Card.Img
                    src={"data:image/jpeg;charset=utf-8;base64," + e.image}
                  />

                  <Card.Body className="p-4">
                    <Card.Title className="m-0">
                      <i className="fas fa-camera fa-lg me-2" /> Movimento
                      <span className="fw-normal"> #{e.entrance_log_id}</span>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
      <ClipLoader loading={loading} css="display: block; margin: 0 auto;" />
    </main>
  );
}

export default ImageScreen;
