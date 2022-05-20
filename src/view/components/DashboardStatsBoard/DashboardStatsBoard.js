// TODO Implementar componente
import React, { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import constants from "../../../utils/constants.js";
import { ClipLoader } from "react-spinners";

function DashboardStatsBoard() {
  const [registeredPeopleLoading, setRegisteredPeopleLoading] = useState();
  const [movementsLoading, setMovementsLoading] = useState();

  const [registeredPeople, setRegisteredPeople] = useState(0);
  const [allowedMovements, setAllowedMovements] = useState(0);
  const [blockedMovements, setBlockMovements] = useState(0);

  // TODO Desenvolver http requests
  useEffect(() => {
    // Fetch total registered people
    setRegisteredPeopleLoading(true);
    getDataWithAuthToken(API_ROUTES.PEOPLE_API_ROUTE)
      .then((res) => res.json())
      .then((data) => setRegisteredPeople(data.length))
      .catch((err) => handleException(err))
      .finally(() => setRegisteredPeopleLoading(false));

    // Fetch movements
    setMovementsLoading(true);
    getDataWithAuthToken(API_ROUTES.ENTRANCE_LOGS_API_ROUTE)
      .then((res) => res.json())
      .then((data) => {
        // Dividir registos por acesso
        const allowedMovements = [];
        const blockedMovements = [];

        data.forEach((log) =>
          (parseInt(log.access) === constants.ALLOWED_ACCESS_VAL
            ? allowedMovements
            : blockedMovements
          ).push(log)
        );

        setAllowedMovements(allowedMovements.length);
        setBlockMovements(blockedMovements.length);
      })
      .catch((err) => handleException(err))
      .finally(() => setMovementsLoading(false));
  }, []);

  return (
    <div className="row" style={{ marginTop: "4rem" }}>
      <div className="row text-white justify-content-around">
        <div className="col-md-3 me-5 bg-secondary shadow-sm">
          <div className="row p-4 align-items-center">
            <div className="col-md-6 text-center">
              <i className="fas fa-person fa-4x" />
            </div>
            <div className="col-md-6">
              <h2 className="mb-0" id="counter-pessoas">
                {!registeredPeopleLoading && registeredPeople}
                <ClipLoader loading={registeredPeopleLoading} color="#ffffff" />
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
                {!movementsLoading && allowedMovements}
                <ClipLoader loading={movementsLoading} color="#ffffff" />
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
                {!movementsLoading && blockedMovements}
                <ClipLoader loading={movementsLoading} color="#ffffff" />
              </h2>
              <h6 className="mb-0">Movimentos Negados</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatsBoard;
