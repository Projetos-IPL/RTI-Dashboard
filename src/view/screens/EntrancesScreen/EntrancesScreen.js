import React, { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import { Row } from "react-bootstrap";
import EntranceRecordTable from "../../components/Tables/EntranceRecordTable/EntranceRecordTable.js";
import EntranceRecord from "../../../model/EntranceRecord.js";
import { EntrancesDataProvider } from "./EntrancesDataContext.js";

function EntrancesScreen() {
  const [loading, setLoading] = useState(true);
  const [entranceRecords, setEntranceRecords] = useState();
  const [outdatedRecords, setOutdatedRecords] = useState(true);

  // Fetch entrance records
  useEffect(() => {
    if (!outdatedRecords) return;
    setLoading(true);
    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_API_ROUTE, {
      showPersonName: 1,
    })
      .then((res) => {
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
        setOutdatedRecords(false);
      })
      .catch((err) => {
        handleException(err.message);
      });
  }, [outdatedRecords]);

  return (
    <EntrancesDataProvider
      value={{
        outdatedRecords,
        setOutdatedRecords,
      }}
    >
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
    </EntrancesDataProvider>
  );
}

export default EntrancesScreen;
