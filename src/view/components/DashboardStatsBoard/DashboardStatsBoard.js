// TODO Implementar componente
import React, { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import { ClipLoader } from "react-spinners";

function DashboardStatsBoard() {
  const [loading, setLoading] = useState();

  const [registeredPeople, setRegisteredPeople] = useState(0);
  const [allowedMovements, setAllowedMovements] = useState(0);
  const [blockedMovements, setBlockMovements] = useState(0);

  useEffect(() => {
    // Fetch data
    setLoading(true);
    // Fazer consulta à vista de estatisticas
    getDataWithAuthToken(API_ROUTES.VIEWS_API_ROUTE)
      .then((res) => {
        setRegisteredPeople(res.data[0].people_count);
        setAllowedMovements(res.data[0].successful_entrance_logs);
        setBlockMovements(res.data[0].unsuccessful_entrance_logs);
      })
      .catch((err) => handleException(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="row">
      <div
        className="row text-white justify-content-around"
        style={{ marginTop: "2rem" }}
      >
        <div className="col-md-6 bg-secondary shadow-sm p-2">
          <div className="row p-4 align-items-center">
            <div className="col-md-6 text-center">
              <i className="fas fa-person fa-4x" />
            </div>
            <div className="col-md-6">
              <h2 className="mb-0" id="counter-pessoas">
                {!loading && registeredPeople}
                <ClipLoader loading={loading} color="#ffffff" />
              </h2>
              <h6 className="mb-0">Pessoas Registadas</h6>
            </div>
          </div>
        </div>
        <div className="col-md-6 bg-dark shadow-sm p-2">
          <div className="row p-4 align-items-center">
            <div className="col-md-6 text-center">
              <i className="fas fa-clock-rotate-left fa-4x" />
            </div>
            <div className="col-md-6">
              <h2 className="mb-0" id="counter-movimentosPermitidos">
                {!loading && allowedMovements}
                <ClipLoader loading={loading} color="#ffffff" />
              </h2>
              <h6 className="mb-0">Mov. Permitidos</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row text-white mt-4 justify-content-around">
        <div className="col-md-6 bg-danger shadow-sm p-2">
          <div className="row p-4 align-items-center">
            <div className="col-md-6 text-center">
              <i className="fas fa-ban fa-4x" />
            </div>
            <div className="col-md-6">
              <h2 className="mb-0" id="counter-movimentosNegados">
                {!loading && blockedMovements}
                <ClipLoader loading={loading} color="#ffffff" />
              </h2>
              <h6 className="mb-0">Mov. Negados</h6>
            </div>
          </div>
        </div>
        <div className="col-md-6 bg-success shadow-sm p-2">
          <div className="row p-4 align-items-center">
            <div className="col-md-6 text-center">
              <i className="fas fa-ban fa-4x" />
            </div>
            <div className="col-md-6">
              <h2 className="mb-0" id="counter-movimentosNegados">
                {!loading && blockedMovements}
                <ClipLoader loading={loading} color="#ffffff" />
              </h2>
              <h6 className="mb-0">Mov. Negados</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatsBoard;
