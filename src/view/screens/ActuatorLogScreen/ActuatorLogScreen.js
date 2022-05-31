import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import ActuatorLog from "../../../model/ActuatorLog.js";
import ActuatorLogRecordTable from "../../components/Tables/ActuatorLogRecordTable/ActuatorLogRecordTable.js";
import { ActuatorLogDataProvider } from "./ActuatorLogDataContext.js";
import ActuatorFilterSelect from "./ActuatorFilterSelect.js";

function ActuatorLogScreen() {
  const [loading, setLoading] = useState(true);
  const [outdatedRecords, setOutdatedRecords] = useState(true);
  const [actuatorLogRecords, setActuatorLogRecords] = useState();

  const [filterByActuatorType, setFilterByActuatorType] = useState({
    prevFilter: 0,
    filter: 0,
  });

  // Fetch actuator records
  useEffect(() => {
    // Apenas buscar dados à API se os registos estiverem desatualizados ou se o filtro de actuators alterar
    if (
      !outdatedRecords &&
      filterByActuatorType.prevFilter === filterByActuatorType.filter
    )
      return;
    setLoading(true);

    console.log("Fetching actuator logs...");

    let urlParams = {
      showActuatorName: 1,
    };

    if (filterByActuatorType.filter !== 0) {
      urlParams.actuatorType = filterByActuatorType.filter;
    }

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
        console.log("Actuator logs fetched!");
        setLoading(false);
        setOutdatedRecords(false);
      })
      .catch((err) => {
        handleException(err.message);
      });
  }, [outdatedRecords, filterByActuatorType]);

  return (
    <ActuatorLogDataProvider
      value={{
        outdatedRecords,
        setOutdatedRecords,
      }}
    >
      <main className="container mt-5">
        <Row className="justify-content-between">
          <Col sm={8}>
            <h2 className="float-start">Registos de atuador</h2>
          </Col>
          <Col sm={4}>
            <ActuatorFilterSelect
              setFilter={setFilterByActuatorType}
              filter={filterByActuatorType}
            />
          </Col>
        </Row>
        <div className="mt-5">
          <ActuatorLogRecordTable
            loading={loading}
            actuatorLogRecords={actuatorLogRecords}
          />
        </div>
      </main>
    </ActuatorLogDataProvider>
  );
}

export default ActuatorLogScreen;
