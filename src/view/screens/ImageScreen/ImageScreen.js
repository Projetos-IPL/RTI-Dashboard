import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import ActuatorLog from "../../../model/ActuatorLog.js";
import ActuatorLogRecordTable from "../../components/Tables/ActuatorLogRecordTable/ActuatorLogRecordTable.js";

function ImageScreen() {
  const [loading, setLoading] = useState(true);
  const [outdatedRecords, setOutdatedRecords] = useState(true);
  const [entranceLogImages, setEntranceLogImages] = useState([]);

  // Fetch imagens dos registos de movimento
  useEffect(() => {
    if (!outdatedRecords) return;

    setLoading(true);

    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_IMAGES_API_ROUTE)
      .then((res) => {
        setEntranceLogImages(res.data);
        console.log("Actuator logs fetched!");
        setLoading(false);
        setOutdatedRecords(false);
      })
      .catch((err) => {
        handleException(err.message);
      });
  }, [outdatedRecords]);

  return (
    <main className="container mt-5">
      <Row className="justify-content-between">
        <Col sm={9}>
          <h2 className="float-start">Imagens dos registos de movimento</h2>
        </Col>
        <Col sm={3} />
      </Row>
      <div className="mt-5">
        {entranceLogImages.map((e, index) => {
          return (
            <img
              src={"data:image/jpg;base64, " + e.image}
              alt={"Com jeitinho sabes o que é"}
              key={index}
            />
          );
        })}
      </div>
    </main>
  );
}

export default ImageScreen;
