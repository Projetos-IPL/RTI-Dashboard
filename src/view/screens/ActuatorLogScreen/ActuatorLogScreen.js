import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import ActuatorLog from "../../../model/ActuatorLog.js";
import ActuatorLogRecordTable from "../../components/Tables/ActuatorLogRecordTable/ActuatorLogRecordTable.js";
import ActuatorFilterSelect from "./ActuatorFilterSelect.js";
import { DATA_ENTITIES } from "../../../DataEntities.js";
import { useRealtime } from "../../../useRealtime.js";

function ActuatorLogScreen() {
  const [loading, setLoading] = useState(true);

  const [actuatorLogRecords, setActuatorLogRecords] = useState([]);

  const [filteredActuatorLogs, setFilteredActuatorLogs] = useState(null);
  const [filterByActuatorType, setFilterByActuatorType] = useState(null);

  // useEffect para filtrar os registos de atuador
  useEffect(() => {
    if (!filterByActuatorType) {
      if (actuatorLogRecords.length !== 0) {
        setFilteredActuatorLogs(actuatorLogRecords);
      }
      return;
    }

    setFilteredActuatorLogs(
      filterLogs(actuatorLogRecords, filterByActuatorType)
    );
  }, [filterByActuatorType]);

  // Fetch actuator records
  useRealtime(DATA_ENTITIES.ACTUATOR_LOGS, () => {
    // Apenas apresentar o spinner quando for o primeiro fetch
    if (actuatorLogRecords.length === 0) {
      setLoading(true);
    }

    console.log("Fetching actuator logs...");

    let urlParams = {
      showActuatorName: 1,
    };

    getDataWithAuthToken(API_ROUTES.ACTUATOR_LOG_API_ROUTE, urlParams)
      .then((res) => {
        let actuatorLogRecords = res.data.map(
          (r) =>
            new ActuatorLog(
              r["actuator_log_id"],
              r["actuator_id"],
              r["actuator_state"],
              r["name"],
              r["timestamp"]
            )
        );
        setActuatorLogRecords(actuatorLogRecords);

        // Para filtrar a lista de registos
        if (filterByActuatorType) {
          setFilteredActuatorLogs(
            filterLogs(actuatorLogRecords, filterByActuatorType)
          );
        }

        console.log("Actuator logs fetched!");
        setLoading(false);
      })
      .catch((err) => {
        handleException(err.message);
      });
  });

  const filterLogs = (logs, filterId) => {
    return logs.filter(
      (record) => record.actuatorId.toString() === filterId.toString()
    );
  };

  return (
    <main className="container mt-5">
      <Row className="justify-content-between">
        <Col md={9} xs={12} className="mb-2">
          <h2 className="float-start">Registos de Atuador</h2>
        </Col>
        <Col md={3} xs={12}>
          <ActuatorFilterSelect setFilter={setFilterByActuatorType} />
        </Col>
      </Row>
      <div className="mt-5">
        <ActuatorLogRecordTable
          loading={loading}
          actuatorLogRecords={
            filteredActuatorLogs ? filteredActuatorLogs : actuatorLogRecords
          }
        />
      </div>
    </main>
  );
}

export default ActuatorLogScreen;
