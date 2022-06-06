import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import SensorLog from "../../../model/SensorLog.js";
import { handleException } from "../../../utils/handleException.js";
import { ClipLoader } from "react-spinners";
import { TypeOf } from "yup";

/**
 * @param sensorType
 * @returns {JSX.Element}
 * @constructor
 */
function SensorCard({ sensorType, sensorName }) {
  if (typeof sensorType != "number" && typeof sensorType != "string") {
    throw new Error("Prop sensorType must be a number or string!");
  }

  const [latestSensorLogRecord: SensorLog, setLatestSensorLogRecord] = useState(
    new SensorLog(null, null, null, null)
  );

  const [loading: boolean, setLoading] = useState(true);

  // Obter último registo de sensor
  useEffect(() => {
    getDataWithAuthToken(API_ROUTES.SENSOR_LOG_API_ROUTE, {
      sensorType: sensorType,
      latest: 1,
      showSensorName: 1,
    })
      .then((res) => {
        let data = res.data[0];

        // Se não existirem registo não atualizar state
        if (typeof data === "undefined") {
          return;
        }

        let latestLog = new SensorLog(
          data.sensor_log_id,
          data.sensor_id,
          data.name,
          data.value,
          data.timestamp
        );
        setLatestSensorLogRecord(latestLog);
      })
      .catch((err) => handleException(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card>
      <Card.Body>
        <h5>
          <i className="fas fa-circle-info me-2" />
          {sensorName}
        </h5>
        <p>
          Último registo:{" "}
          {latestSensorLogRecord.timestamp
            ? latestSensorLogRecord.formattedTimestamp
            : "N/A"}
        </p>
        <h6>
          Valor:
          <span className="fw-normal ms-1">
            {latestSensorLogRecord.value ? latestSensorLogRecord.value : "N/A"}
          </span>
        </h6>
        <ClipLoader loading={loading} css="display: block; margin: 0 auto;" />
      </Card.Body>

      {console.log(typeof latestSensorLogRecord.formattedTimestamp)}
    </Card>
  );
}

export default SensorCard;
