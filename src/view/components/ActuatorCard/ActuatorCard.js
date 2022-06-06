import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import { ClipLoader } from "react-spinners";
import ActuatorLog from "../../../model/ActuatorLog.js";

/**
 * @param actuatorType
 * @returns {JSX.Element}
 * @constructor
 */
function ActuatorCard({ actuatorType, actuatorName }) {
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

  return (
    <Card>
      <Card.Body>
        <h5>
          <i className="fas fa-circle-info me-2" />
          {actuatorName}
        </h5>
        <p>
          Último registo:{" "}
          {latestActuatorLog.timestamp
            ? latestActuatorLog.formattedTimestamp
            : "N/A"}
        </p>

        <ClipLoader loading={loading} css="display: block; margin: 0 auto;" />

        <h6>
          Estado:
          {latestActuatorLog.actuatorState === null ? (
            <span className="fw-normal ms-1">N/A</span>
          ) : (
            <span
              className={`ms-1 text-${
                latestActuatorLog.actuatorState ? "success" : "danger"
              }`}
            >
              {latestActuatorLog.actuatorState ? (
                <i className="fas fa-check" />
              ) : (
                <i className="fas fa-ban" />
              )}
            </span>
          )}
        </h6>
      </Card.Body>
    </Card>
  );
}

export default ActuatorCard;
