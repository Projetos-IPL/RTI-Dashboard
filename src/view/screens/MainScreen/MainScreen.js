import React, { useState, useEffect } from "react";
import EntranceRecordTable from "../../components/Tables/EntranceRecordTable/EntranceRecordTable.js";
import EntranceRecord from "../../../model/EntranceRecord.js";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import LastEntranceRecordCard from "../../components/LastEntranceRecordCard/LastEntranceRecordCard.js";
import DashboardStatsBoard from "../../components/DashboardStatsBoard/DashboardStatsBoard.js";
import { Col, Container, Row } from "react-bootstrap";
import WebcamFeed from "../../components/WebcamFeed/WebcamFeed.js";
import SensorCard from "../../components/SensorCard/SensorCard.js";
import ActuatorCard from "../../components/ActuatorCard/ActuatorCard.js";

import "./MainScreen.css";
import IoTActionCard from "../../components/IoTActionCard/IoTActionCard.js";
import { useRealtime } from "../../../useRealtime.js";
import { DATA_ENTITIES } from "../../../DataEntities.js";

function MainScreen() {
  const [entranceRecordsLoading: boolean, setEntranceRecordsLoading] =
    useState(true);

  const [entranceRecords: Array<EntranceRecord>, setEntranceRecords] = useState(
    new Array(new EntranceRecord(null, null, null, null))
  );

  const [sensorTypes: Array<Object>, setSensorTypes] = useState([]);
  const [actuatorTypes: Array<Object>, setActuatorTypes] = useState([]);

  // Obter últimos registos de entrada em tempo real
  useRealtime(DATA_ENTITIES.ENTRANCE_LOGS, () => {
    // Apenas apresentar o spinner de carregamento se for a primeira busca de dados
    if (entranceRecords.length === 0) {
      setEntranceRecordsLoading(true);
    }

    console.log("Fetching entrance logs...");

    // Buscar dados à API
    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_API_ROUTE, {
      showPersonName: 1,
      latest: 10,
    })
      .then((res) => {
        // Converter dados da resposta para objetos da classe EntranceRecord
        let entranceRecordsArr = res.data.map(
          (r) =>
            new EntranceRecord(
              r["entrance_log_id"],
              r["rfid"],
              r["person_name"],
              r["timestamp"],
              r["access"].toString() === "1"
            )
        );
        setEntranceRecords(entranceRecordsArr);
        setEntranceRecordsLoading(false);
        console.log("Entrance logs fetched!");
      })
      .catch((err) => {
        handleException(err.message);
      });
  });

  // Buscar tipos de sensor
  useEffect(() => {
    getDataWithAuthToken(API_ROUTES.SENSOR_TYPES_API_ROUTE)
      .then((res) => setSensorTypes(res.data))
      .catch((err) => handleException(err));
  }, []);

  // Buscar tipos de atuador
  useEffect(() => {
    getDataWithAuthToken(API_ROUTES.ACTUATOR_TYPES_API_ROUTE)
      .then((res) => setActuatorTypes(res.data))
      .catch((err) => handleException(err));
  }, []);

  return (
    <main>
      <Container className="mt-5">
        <h2>Dashboard</h2>

        <Row>
          <Col md={8} sm={12}>
            <DashboardStatsBoard />

            <div className="my-5" />

            <div className="my-4">
              <h4>
                <i className="fa-solid fa-clock-rotate-left me-3" />
                Últimos 10 Movimentos
              </h4>
              <EntranceRecordTable
                loading={entranceRecordsLoading}
                entranceRecords={entranceRecords}
              />
            </div>
          </Col>

          <Col md={4}>
            <LastEntranceRecordCard />

            <div className="my-4" />

            <WebcamFeed />

            <div className="my-4" />

            <IoTActionCard />
          </Col>
        </Row>

        <Row className="my-4">
          <h4 className="mb-4">
            <i className="fa-solid fa-cloud me-3" />
            Estado dos Sensores
          </h4>

          {sensorTypes.map((sensorType, index) => (
            <Col md="4" className="mb-3" key={index}>
              <SensorCard
                sensorType={sensorType.sensor_id}
                sensorName={sensorType.name}
              />
            </Col>
          ))}
        </Row>

        <Row className="my-4">
          <h4 className="mb-4">
            <i className="fa-solid fa-satellite-dish me-3" />
            Estado dos Atuadores
          </h4>

          {actuatorTypes.map((actuatorType, index) => (
            <Col md="4" className="mb-3" key={index}>
              <ActuatorCard
                actuatorType={actuatorType.actuator_id}
                actuatorName={actuatorType.name}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default MainScreen;
