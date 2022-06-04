import React, { useState, useEffect } from "react";
import EntranceRecordTable from "../../components/Tables/EntranceRecordTable/EntranceRecordTable.js";
import EntranceRecord from "../../../model/EntranceRecord.js";
import { getData, getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import { getUsernameFromStorage } from "../../../utils/utils.js";
import LastEntranceRecordCard from "../../components/LastEntranceRecordCard/LastEntranceRecordCard.js";
import DashboardStatsBoard from "../../components/DashboardStatsBoard/DashboardStatsBoard.js";
import { Card, Col, Container, Row } from "react-bootstrap";
import WebcamFeed from "../../components/WebcamFeed/WebcamFeed.js";
import SensorCard from "../../components/SensorCard/SensorCard.js";
import { act } from "react-dom/test-utils";
import ActuatorCard from "../../components/ActuatorCard/ActuatorCard.js";

function MainScreen() {
  const [entranceRecordsLoading: boolean, setEntranceRecordsLoading] =
    useState(true);

  const [outdatedEntranceRecords: boolean, setOutdatedEntranceRecords] =
    useState(true);

  const [entranceRecords: Array<EntranceRecord>, setEntranceRecords] = useState(
    new Array(new EntranceRecord(null, null, null, null))
  );

  const [sensorTypes: Array<Object>, setSensorTypes] = useState([]);
  const [actuatorTypes: Array<Object>, setActuatorTypes] = useState([]);

  // Fetch entrance records
  useEffect(() => {
    if (!outdatedEntranceRecords) return;
    setEntranceRecordsLoading(true);
    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_API_ROUTE, {
      showPersonName: 1,
      latest: 5,
    })
      .then((res) => {
        let entranceRecordsArr = res.data.map(
          (r) =>
            new EntranceRecord(
              r["entrance_log_id"],
              r["rfid"],
              r["person_name"],
              r["timestamp"],
              r["access"] === "1"
            )
        );
        setEntranceRecords(entranceRecordsArr);
        setEntranceRecordsLoading(false);
        setOutdatedEntranceRecords(false);
      })
      .catch((err) => {
        handleException(err.message);
      });
  }, [outdatedEntranceRecords]);

  // Fetch sensor types
  useEffect(() => {
    getDataWithAuthToken(API_ROUTES.SENSOR_TYPES_API_ROUTE)
      .then((res) => setSensorTypes(res.data))
      .catch((err) => handleException(err));
  }, []);

  // Fetch actuator types
  useEffect(() => {
    getDataWithAuthToken(API_ROUTES.ACTUATOR_TYPES_API_ROUTE)
      .then((res) => setActuatorTypes(res.data))
      .catch((err) => handleException(err));
  }, []);

  return (
    <main>
      <Container className="mt-5">
        <h2 className="fw-light">Dashboard</h2>
        <h5 className="text-muted fw-light">
          Bem-vindo, {getUsernameFromStorage()}
        </h5>

        <Row>
          <Col md={8}>
            <DashboardStatsBoard />

            <div className="my-5" />

            <h4>
              <i className="fa-solid fa-clock-rotate-left me-2" />
              Últimos 5 Movimentos
            </h4>
            <EntranceRecordTable
              loading={entranceRecordsLoading}
              entranceRecords={entranceRecords}
            />
          </Col>

          <Col md={4}>
            <LastEntranceRecordCard />
            <div className="my-5" />
            <WebcamFeed />
          </Col>
        </Row>

        <Card className="mb-3 mt-3">
          <Card.Header>
            <h4>
              <i className="fa-solid fa-cloud me-2" />
              Últimas leituras dos sensores
            </h4>
          </Card.Header>
          <Card.Body
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "left",
              justifyContent: "space-between",
              gap: "50px",
            }}
          >
            {sensorTypes.map((sensorType, index) => (
              <SensorCard sensorType={sensorType.sensor_id} key={index} />
            ))}
          </Card.Body>
        </Card>

        <Row>
          <h4>
            <i className="fa-solid fa-satellite-dish me-2" />
            Estado dos atuadores
          </h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "left",
            }}
          >
            {actuatorTypes.map((actuatorType, index) => (
              <ActuatorCard
                actuatorType={actuatorType.actuator_id}
                key={index}
              />
            ))}
          </div>
        </Row>
      </Container>
    </main>
  );
}

export default MainScreen;
