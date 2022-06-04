import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import SensorLog from "../../../model/SensorLog.js";
import { handleException } from "../../../utils/handleException.js";
import { ClipLoader } from "react-spinners";
import { TypeOf } from "yup";
import ActuatorLog from "../../../model/ActuatorLog.js";

/**
 * @param actuatorType
 * @returns {JSX.Element}
 * @constructor
 */
function ActuatorCard({ actuatorType }) {
  if (typeof actuatorType != "number" && typeof actuatorType != "string") {
    throw new Error("Prop actuatorType must be a number or string!");
  }

  const [latestActuatorLog: ActuatorLog, setLatestActuatorLog] = useState(
    new ActuatorLog(null, null, null, null)
  );

  const [loading: boolean, setLoading] = useState(true);

  // Obter último registo de sensor
  useEffect(() => {
    getDataWithAuthToken(API_ROUTES.ACTUATOR_LOG_API_ROUTE, {
      actuatorType: actuatorType,
      latest: 1,
      showActuatorName: 1,
    })
      .then((res) => {
        let data = res.data[0];

        // Se não existirem registo não atualizar state
        if (typeof data === "undefined") {
          return;
        }

        let latestLog = new ActuatorLog(
          data.actuator_log_id,
          data.actuator_id,
          data.actuatorState,
          data.name,
          data.timestamp
        );
        setLatestActuatorLog(latestLog);
      })
      .catch((err) => handleException(err))
      .finally(() => setLoading(false));
  }, []);

  // Não renderizar nada se não existir registo
  if (!latestActuatorLog.actuatorId) {
    return <></>;
  } else {
    return (
      <Card style={{ width: "22rem" }}>
        <Card.Body>
          <Card.Title>{latestActuatorLog.actuatorName}</Card.Title>
          <ClipLoader loading={loading} css="display: block; margin: 0 auto;" />
        </Card.Body>
        <Card.Footer>
          Último registo: {latestActuatorLog.formattedTimestamp} -{" "}
          <span
            className={`text-${
              latestActuatorLog.actuatorState ? "success" : "danger"
            }`}
          >
            {latestActuatorLog.actuatorState ? (
              <i className="fas fa-check" />
            ) : (
              <i className="fas fa-ban" />
            )}
          </span>
        </Card.Footer>
      </Card>
    );
  }
}

export default ActuatorCard;
