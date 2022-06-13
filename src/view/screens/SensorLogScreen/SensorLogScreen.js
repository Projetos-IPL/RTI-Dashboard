import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import SensorLog from "../../../model/SensorLog.js";
import SensorLogRecordTable from "../../components/Tables/SensorLogRecordTable/SensorLogRecordTable.js";
import SensorFilterSelect from "./SensorFilterSelect.js";
import { DATA_ENTITIES } from "../../../DataEntities.js";
import { useRealtime } from "../../../useRealtime.js";

function SensorLogScreen() {
  const [loading, setLoading] = useState(true);
  const [sensorLogRecords, setSensorLogRecords] = useState([]);

  const [filteredLogRecords, setFilteredLogRecords] = useState(null);
  const [filterBySensorType, setFilterBySensorType] = useState(null);

  // useEffect para filtrar os registos de sensor

  useEffect(() => {
    if (!filterBySensorType) {
      if (sensorLogRecords.length !== 0) {
        setFilteredLogRecords(sensorLogRecords);
      }
      return;
    }

    setFilteredLogRecords(filterLogs(sensorLogRecords, filterBySensorType));
  }, [filterBySensorType]);

  // Fetch sensor records
  useRealtime(DATA_ENTITIES.SENSOR_LOGS, () => {
    // Apenas apresentar o spinner quando for o primeiro fetch
    if (sensorLogRecords.length === 0) {
      setLoading(true);
    }
    console.log("Fetching sensor logs...");

    let urlParams = {
      showSensorName: 1,
    };

    getDataWithAuthToken(API_ROUTES.SENSOR_LOG_API_ROUTE, urlParams)
      .then((res) => {
        let sensorLogRecords = res.data.map(
          (r) =>
            new SensorLog(
              r["sensor_log_id"],
              r["sensor_id"],
              r["name"],
              r["value"],
              r["timestamp"]
            )
        );
        setSensorLogRecords(sensorLogRecords);

        // Para filtrar a lista de registos
        if (filterBySensorType) {
          setFilteredLogRecords(
            filterLogs(sensorLogRecords, filterBySensorType)
          );
        }

        console.log("Sensor logs fetched!");
        setLoading(false);
      })
      .catch((err) => {
        handleException(err.message);
      });
  });

  const filterLogs = (logs, filterId) => {
    return logs.filter(
      (record) => record.sensorId.toString() === filterId.toString()
    );
  };

  return (
    <main className="container mt-5">
      <Row className="justify-content-between">
        <Col md={9} xs={12} className="mb-2">
          <h2 className="float-start">Registos de Sensor</h2>
        </Col>
        <Col md={3} xs={12} className="align-middle mb-0">
          <SensorFilterSelect setFilter={setFilterBySensorType} />
        </Col>
      </Row>
      <div className="mt-5">
        <SensorLogRecordTable
          loading={loading}
          sensorLogRecords={
            filteredLogRecords ? filteredLogRecords : sensorLogRecords
          }
        />
      </div>
    </main>
  );
}

export default SensorLogScreen;
