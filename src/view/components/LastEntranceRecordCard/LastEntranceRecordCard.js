import { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import EntranceRecord from "../../../model/EntranceRecord.js";
import { handleException } from "../../../utils/handleException.js";
import { ClipLoader } from "react-spinners";
import { Col, Row } from "react-bootstrap";

function LastEntranceRecordCard() {
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState(
    new EntranceRecord(null, null, null, null)
  );

  useEffect(() => {
    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_API_ROUTE, {
      latest: 1,
      showPersonName: 1,
    })
      .then((res) => {
        setRecord(
          new EntranceRecord(
            res.data[0].entrance_log_id,
            res.data[0].rfid,
            res.data[0].person_name,
            res.data[0].timestamp,
            res.data[0].access === "1"
          )
        );
        setLoading(false);
      })
      .catch((err) => handleException(err));
  }, []);

  return (
    <div className="card">
      <div className="card-header">Último Movimento</div>
      <div className="py-3 card-body">
        {!loading && (
          <div className="py-3 card-body text-center">
            <Row>
              <Col md={4}>
                <img
                  src="https://randomuser.me/api/portraits/women/79.jpg"
                  alt="Imagem"
                />
              </Col>
              <Col md={8}>
                <h4 className="card-title">{record.personName}</h4>
                <small className="text-muted">
                  {record.formattedTimestamp}
                </small>
                <h4 className="mt-3">
                  <span
                    className={`badge bg-${
                      record.access ? "success" : "danger"
                    }`}
                  >
                    <i
                      className={`fas me-2 fa-${
                        record.access ? "check" : "ban"
                      }`}
                    />
                    <span>{record.access ? "Permitido" : "Negado"}</span>
                  </span>
                </h4>
              </Col>
            </Row>
          </div>
        )}
        <ClipLoader loading={loading} css="display: block; margin: 0 auto;" />
      </div>
    </div>
  );
}

export default LastEntranceRecordCard;
