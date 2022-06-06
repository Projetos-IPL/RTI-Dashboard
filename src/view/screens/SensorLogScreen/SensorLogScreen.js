import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import SensorLog from "../../../model/SensorLog.js";
import SensorLogRecordTable from "../../components/Tables/SensorLogRecordTable/SensorLogRecordTable.js";
import { SensorLogDataProvider } from "./SensorLogDataContext.js";
import SensorFilterSelect from "./SensorFilterSelect.js";

function SensorLogScreen() {
  const [loading, setLoading] = useState(true);
  const [outdatedRecords, setOutdatedRecords] = useState(true);
  const [sensorLogRecords, setSensorLogRecords] = useState();

  const [filterBySensorType, setFilterBySensorType] = useState({
    prevFilter: 0,
    filter: 0,
  });

  // Fetch sensor records
  useEffect(() => {
    // Apenas buscar dados à API se os registos estiverem desatualizados ou se o filtro de sensors alterar
    if (
      !outdatedRecords &&
      filterBySensorType.prevFilter === filterBySensorType.filter
    )
      return;
    setLoading(true);

    console.log("Fetching sensor logs...");

    let urlParams = {
      showSensorName: 1,
    };

    if (filterBySensorType.filter !== 0) {
      urlParams.sensorType = filterBySensorType.filter;
    } else {
      delete urlParams.sensorType;
    }

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
        console.log("Sensor logs fetched!");
        setLoading(false);
        setOutdatedRecords(false);
      })
      .catch((err) => {
        handleException(err.message);
      });
  }, [outdatedRecords, filterBySensorType]);

  return (
    <SensorLogDataProvider
      value={{
        outdatedRecords,
        setOutdatedRecords,
      }}
    >
      <main className="container mt-5">
        <Row className="justify-content-between">
          <Col md={9} xs={12} className="mb-2">
            <h2 className="float-start">Registos de Sensor</h2>
          </Col>
          <Col md={3} xs={12} className="align-middle mb-0">
            <SensorFilterSelect
              setFilter={setFilterBySensorType}
              filter={filterBySensorType}
            />
          </Col>
        </Row>
        <div className="mt-5">
          <SensorLogRecordTable
            loading={loading}
            sensorLogRecords={sensorLogRecords}
          />
        </div>
      </main>
    </SensorLogDataProvider>
  );
}

export default SensorLogScreen;
