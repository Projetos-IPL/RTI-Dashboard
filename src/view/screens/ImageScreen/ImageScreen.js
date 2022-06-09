import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import { ClipLoader } from "react-spinners";

function ImageScreen() {
  const [loading, setLoading] = useState(true);
  const [outdatedRecords, setOutdatedRecords] = useState(true);
  const [entranceLogImages, setEntranceLogImages] = useState([]);
  const [imageGridSize, setImageGridSize] = useState(3);
  const [imageGridButtonText, setImageGridButtonText] =
    useState("Imagens Maiores");
  const [imageGridButtonIcon, setImageGridButtonIcon] = useState("maximize");

  // Fetch imagens dos registos de movimento
  useEffect(() => {
    if (!outdatedRecords) return;

    setLoading(true);

    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_IMAGES_API_ROUTE)
      .then((res) => {
        setEntranceLogImages(res.data);
        console.log("Movement images fetched!");
        setLoading(false);
        setOutdatedRecords(false);
      })
      .catch((err) => {
        handleException(err.message);
      });
  }, [outdatedRecords]);

  const handleImageSizeToggle = () => {
    if (imageGridSize === 4) {
      setImageGridSize(3);
      setImageGridButtonText("Imagens Maiores");
      setImageGridButtonIcon("maximize");
    } else {
      setImageGridSize(4);
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
