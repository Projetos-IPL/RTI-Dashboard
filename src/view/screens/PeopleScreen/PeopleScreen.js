import React, { useState } from "react";
import PeopleRecordTable from "../../components/Tables/PeopleRecordTable/PeopleRecordTable.js";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import Person from "../../../model/Person.js";
import { handleException } from "../../../utils/handleException.js";
import AddPersonModal from "../../components/Modals/AddPersonModal.js";
import { Button, Col, Row } from "react-bootstrap";
import { useRealtime } from "../../../useRealtime.js";
import { DATA_ENTITIES } from "../../../DataEntities.js";

function PeopleScreen() {
  const [loading, setLoading] = useState(true);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [peopleRecords, setPeopleRecords] = useState([]);

  /* Atualizar as pessoas em tempo real, quando o dashboard receber notificação de que a entidade
  pessoa foi atualizada. */
  useRealtime(DATA_ENTITIES.PEOPLE, () => {
    // Apenas apresentar o spinner quando for o primeiro fetch
    if (peopleRecords.length === 0) {
      setLoading(true);
    }
    setLoading(true);

    // Buscar dados à API
    getDataWithAuthToken(API_ROUTES.PEOPLE_API_ROUTE)
      .then((res) => {
        // Converter dados da resposta para objetos da classe Person
        let records = res.data.map(
          (record) =>
            new Person(record.rfid, record.first_name, record.last_name)
        );
        setPeopleRecords(records);
      })
      .catch((err) => handleException(err))
      .finally(() => setLoading(false));
  });

  // Handler para ativar o modal das pessoas
  const addPersonButtonClickHandler = (e) => {
    e.preventDefault();
    setShowAddPersonModal(true);
  };

  return (
    <main className="container mt-5">
      <Row>
        <Col xs={3}>
          <h2 className="float-start">Pessoas</h2>
        </Col>
        <Col xs={9}>
          <Button
            onClick={addPersonButtonClickHandler}
            variant="dark"
            className="float-end"
          >
            <i className="fas fa-plus me-3" />
            Adicionar
          </Button>
        </Col>
      </Row>
      <div className="mt-5">
        <PeopleRecordTable loading={loading} peopleRecords={peopleRecords} />
      </div>
      <AddPersonModal
        showModal={showAddPersonModal}
        setShowModal={setShowAddPersonModal}
      />
    </main>
  );
}

export default PeopleScreen;
