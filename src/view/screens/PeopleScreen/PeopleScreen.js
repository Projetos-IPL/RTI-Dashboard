import React, { useEffect, useState } from "react";
import PeopleRecordTable from "../../components/Tables/PeopleRecordTable/PeopleRecordTable.js";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import Person from "../../../model/Person.js";
import { handleException } from "../../../utils/handleException.js";
import { PeopleDataProvider } from "./PeopleDataContext.js";
import AddPersonModal from "../../components/Modals/AddPersonModal.js";
import { Button, Col, Row } from "react-bootstrap";

function PeopleScreen() {
  const [loading, setLoading] = useState(true);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [peopleRecords, setPeopleRecords] = useState();
  const [outdatedRecords, setOutdatedRecords] = useState(true);

  // Fetch people data
  useEffect(() => {
    if (!outdatedRecords) return;
    setLoading(true);
    getDataWithAuthToken(API_ROUTES.PEOPLE_API_ROUTE)
      .then((res) => {
        let records = res.data.map(
          (record) =>
            new Person(record.rfid, record.first_name, record.last_name)
        );
        setPeopleRecords(records);
        setOutdatedRecords(false);
      })
      .catch((err) => handleException(err))
      .finally(() => setLoading(false));
  }, [outdatedRecords]);

  const addPersonButtonClickHandler = (e) => {
    e.preventDefault();
    setShowAddPersonModal(true);
  };

  return (
    <PeopleDataProvider
      value={{
        peopleRecords,
        setOutdatedRecords,
      }}
    >
      <main className="container mt-5">
        <Row>
          <Col>
            <h2 className="float-start">Pessoas</h2>
          </Col>
          <Col>
            <Button
              onClick={addPersonButtonClickHandler}
              variant="dark"
              className="float-end"
            >
              <i className="fas fa-user me-3" />
              Adicionar Pessoa
            </Button>
          </Col>
        </Row>
        <div className="mt-5">
          <PeopleRecordTable loading={loading} peopleRecords={peopleRecords} />
        </div>
      </main>
      <AddPersonModal
        showModal={showAddPersonModal}
        setShowModal={setShowAddPersonModal}
      />
    </PeopleDataProvider>
  );
}

export default PeopleScreen;
