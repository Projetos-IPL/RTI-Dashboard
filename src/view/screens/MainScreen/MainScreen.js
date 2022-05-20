import React, { useState, useEffect } from "react";
import EntranceRecordTable from "../../components/EntranceRecordTable/EntranceRecordTable.js";
import EntranceRecord from "../../../model/EntranceRecord.js";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import { getUsernameFromStorage } from "../../../utils/utils.js";
import LastEntranceRecordCard from "../../components/LastEntranceRecordCard/LastEntranceRecordCard.js";
import DashboardStatsBoard from "../../components/DashboardStatsBoard/DashboardStatsBoard.js";

function MainScreen() {
  const [loading, setLoading] = useState(true);

  const [entranceRecords, setEntranceRecords] = useState(
    new Array(new EntranceRecord(null, null, null, null))
  );

  useEffect(() => {
    setLoading(true);
    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_API_ROUTE, {
      showPersonName: 1,
      latest: 5,
    })
      .then((res) => res.json())
      .then((data) => {
        data = data.map(
          (r) =>
            new EntranceRecord(
              r["rfid"],
              r["person_name"],
              r["timestamp"],
              r["access"] === "1"
            )
        );
        setEntranceRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        handleException(err.message);
      });
  }, []);

  return (
    <main>
      <div className="container mt-5">
        <h2>Dashboard</h2>
        <h5 className="text-muted fw-light fst-italic">
          Bem-vindo, {getUsernameFromStorage()}
        </h5>

        <DashboardStatsBoard />

        <div className="row align-items-center" style={{ marginTop: "6rem" }}>
          <div className="col-md-8">
            <h4>
              <i className="fa-solid fa-clock-rotate-left me-2" /> Últimos 5
              Movimentos
            </h4>
            <EntranceRecordTable
              loading={loading}
              entranceRecords={entranceRecords}
            />
          </div>
          <div className="col-md-4">
            <LastEntranceRecordCard />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
