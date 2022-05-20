import { getUsernameFromStorage } from "../../../utils/utils.js";
import DashboardStatsBoard from "../../components/DashboardStatsBoard/DashboardStatsBoard.js";
import LastEntranceRecordCard from "../../components/LastEntranceRecordCard/LastEntranceRecordCard.js";
import React, { useEffect, useState } from "react";
import PeopleRecordTable from "../../components/PeopleRecordTable/PeopleRecordTable.js";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import Person from "../../../model/Person.js";
import { handleException } from "../../../utils/handleException.js";

// TODO Desenvolver
function PeopleScreen() {
  const [loading, setLoading] = useState(true);
  const [peopleRecords, setPeopleRecords] = useState();

  useEffect(() => {
    setLoading(true);
    getDataWithAuthToken(API_ROUTES.PEOPLE_API_ROUTE)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data = data.map(
          (record) =>
            new Person(record.rfid, record.first_name, record.last_name)
        );
        setPeopleRecords(data);
      })
      .catch((err) => handleException(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <div className="container mt-5">
        <h2>Pessoas</h2>

        <div className="row align-items-center" style={{ marginTop: "6rem" }}>
          <div className="col-md-8">
            <h4>
              <i className="fa-solid fa-clock-rotate-left me-2" /> Últimos 5
              Movimentos
            </h4>
            <PeopleRecordTable
              loading={loading}
              peopleRecords={peopleRecords}
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

export default PeopleScreen;
