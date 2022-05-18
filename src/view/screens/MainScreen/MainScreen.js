import React, { useState, useEffect } from "react";
import "./MainScreen.css";
import EntranceRecordTable from "../../components/EntranceRecordTable/EntranceRecordTable.js";
import EntranceRecord from "../../../model/EntranceRecord.js";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import { getUsernameFromStorage } from "../../../utils/utils.js";
import LastEntranceRecordCard from "../../components/LastEntranceRecordCard/LastEntranceRecordCard.js";

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
        console.log(data);
        setEntranceRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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

        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="row text-white justify-content-around">
            <div className="col-md-3 me-5 bg-secondary shadow-sm">
              <div className="row p-4 align-items-center">
                <div className="col-md-6 text-center">
                  <i className="fas fa-person fa-4x" />
                </div>
                <div className="col-md-6">
                  <h2 className="mb-0" id="counter-pessoas">
                    --
                  </h2>
                  <h6 className="mb-0">Pessoas Registadas</h6>
                </div>
              </div>
            </div>
            <div className="col-md-3 me-5 bg-dark shadow-sm">
              <div className="row p-4 align-items-center">
                <div className="col-md-6 text-center">
                  <i className="fas fa-clock-rotate-left fa-4x" />
                </div>
                <div className="col-md-6">
                  <h2 className="mb-0" id="counter-movimentosPermitidos">
                    --
                  </h2>
                  <h6 className="mb-0">Movimentos Permitidos</h6>
                </div>
              </div>
            </div>
            <div className="col-md-3 bg-danger shadow-sm">
              <div className="row p-4 align-items-center">
                <div className="col-md-6 text-center">
                  <i className="fas fa-ban fa-4x" />
                </div>
                <div className="col-md-6">
                  <h2 className="mb-0" id="counter-movimentosNegados">
                    --
                  </h2>
                  <h6 className="mb-0">Movimentos Negados</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

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
