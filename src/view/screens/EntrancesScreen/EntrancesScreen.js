import React, { useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import { Row } from "react-bootstrap";
import EntranceRecordTable from "../../components/Tables/EntranceRecordTable/EntranceRecordTable.js";
import EntranceRecord from "../../../model/EntranceRecord.js";
import { DATA_ENTITIES } from "../../../DataEntities.js";
import { useRealtime } from "../../../useRealtime.js";

function EntrancesScreen() {
  const [loading, setLoading] = useState(true);
  const [entranceRecords, setEntranceRecords] = useState([]);

  /* Atualizar os registos de entrada em tempo real, quando o dashboard recebe notificação
  de que os registos de entrada foram atualizados */
  useRealtime(DATA_ENTITIES.ENTRANCE_LOGS, () => {
    // Apenas apresentar o spinner quando for o primeiro fetch
    if (entranceRecords.length === 0) {
      setLoading(true);
    }

    console.log("Fetching entrance logs...");

    // Buscar dados à API
    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_API_ROUTE, {
      showPersonName: 1,
    })
      .then((res) => {
        // Converter dados da resposta para objetos da classe EntranceRecord
        let entranceRecordsArr = res.data.map(
          (r) =>
            new EntranceRecord(
              r["entrance_log_id"],
              r["rfid"],
              r["person_name"],
              r["timestamp"],
              r["access"] === "1"
            )
        );
        setEntranceRecords(entranceRecordsArr);
        setLoading(false);
        console.log("Entrance logs fetched!");
      })
      .catch((err) => {
        handleException(err.message);
      });
  });

  return (
    <main className="container mt-5">
      <Row>
        <h2 className="float-start">Movimentos</h2>
      </Row>
      <div className="mt-5">
        <EntranceRecordTable
          loading={loading}
          entranceRecords={entranceRecords}
        />
      </div>
    </main>
  );
}

export default EntrancesScreen;
