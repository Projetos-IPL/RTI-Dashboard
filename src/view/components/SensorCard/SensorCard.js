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
function SensorCard({ sensorType }) {
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

  // Não renderizar nada se não existir registo

  if (!latestSensorLogRecord.sensorId) {
    return <></>;
  } else {
    return (
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title>{latestSensorLogRecord.sensorName}</Card.Title>
          <ClipLoader loading={loading} css="display: block; margin: 0 auto;" />
        </Card.Body>
        <Card.Footer>
          Último registo: {latestSensorLogRecord.formattedTimestamp} -{" "}
          {latestSensorLogRecord.value}
        </Card.Footer>
      </Card>
    );
  }
}

export default SensorCard;
