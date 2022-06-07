import React, { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import EntranceRecord from "../../../model/EntranceRecord.js";
import { handleException } from "../../../utils/handleException.js";
import { ClipLoader } from "react-spinners";
import { Col, Container, Row } from "react-bootstrap";

function LastEntranceRecordCard() {
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  const [record, setRecord] = useState(
    new EntranceRecord(null, null, null, null)
  );

  const [entranceRecordImage: string, setEntranceRecordImage] = useState("");

  // Obter último registo de movimento
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

  // Obter imagem do último registo de movimento
  useEffect(() => {
    setImageLoading(true);
    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_IMAGES_API_ROUTE, {
      entrance_log_id: record.entranceLogId,
    })
      .then((r) => {
        if (r.data.length !== 0) {
          setEntranceRecordImage(r.data[0].image);
        }
      })
      .catch((err) => handleException(err))
      .finally(() => setImageLoading(false));
  }, [record]);

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">Último Movimento</div>
      <div className="py-3 card-body">
        {!loading && (
          <div className="py-3 card-body text-center">
            <Row className="text-center">
              <Col md={4}>
                {!imageLoading &&
                  (entranceRecordImage.length === 0 ? (
                    <Container
                      className="p-4"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <i className="fa-solid fa-eye-slash fa-2x" />
                    </Container>
                  ) : (
                    <img
                      src={
                        "data:image/jpeg;charset=utf-8;base64," +
                        entranceRecordImage
                      }
                      width="100%"
                      alt="Imagem do último registo de movimento"
                    />
                  ))}
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
