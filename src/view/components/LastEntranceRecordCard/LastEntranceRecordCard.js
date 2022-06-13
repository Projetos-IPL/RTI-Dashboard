import React, { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import EntranceRecord from "../../../model/EntranceRecord.js";
import { handleException } from "../../../utils/handleException.js";
import { ClipLoader } from "react-spinners";
import { Card, Row } from "react-bootstrap";
import { DATA_ENTITIES } from "../../../DataEntities.js";
import { useRealtime } from "../../../useRealtime.js";

function LastEntranceRecordCard() {
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  const [record, setRecord] = useState(
    new EntranceRecord(null, null, null, null)
  );

  const [entranceRecordImage: string, setEntranceRecordImage] = useState("");

  // Obter último registo de movimento
  useRealtime(DATA_ENTITIES.ENTRANCE_LOGS, () => {
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
  });

  // Obter imagem do último registo de movimento
  useRealtime(DATA_ENTITIES.ENTRANCE_LOG_IMAGES, () => {
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
  });

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-dark text-white">Último Movimento</Card.Header>
      <Card.Body className="py-3 card-body my-2">
        {!loading && (
          <Row className="text-center">
            <h4>{record.personName}</h4>
            <small className="text-muted">{record.formattedTimestamp}</small>
            <h4 className="mt-3">
              <span
                className={`badge bg-${record.access ? "success" : "danger"}`}
              >
                <i
                  className={`fas me-2 fa-${record.access ? "check" : "ban"}`}
                />
                <span className="fw-normal">
                  {record.access ? "Permitido" : "Negado"}
                </span>
              </span>
            </h4>
          </Row>
        )}

        <ClipLoader loading={loading} css="display: block; margin: 0 auto;" />
      </Card.Body>
      <Card.Footer className="p-3">
        {!imageLoading &&
          (entranceRecordImage.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <i className="fa-solid fa-eye-slash fa-3x p-3" />
              <h5>Sem foto registada!</h5>
            </div>
          ) : (
            <img
              style={{
                maxWidth: "100%",
              }}
              src={
                "data:image/jpeg;charset=utf-8;base64," + entranceRecordImage
              }
              alt="Imagem do último registo de movimento"
            />
          ))}
      </Card.Footer>
    </Card>
  );
}

export default LastEntranceRecordCard;
