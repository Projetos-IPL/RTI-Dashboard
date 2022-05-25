import React, { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import Permission from "../../../model/Permission.js";
import { handleException } from "../../../utils/handleException.js";
import { PermissionsDataContext } from "./PermissionsDataContext.js";
import AddPersonModal from "../../components/Modals/AddPersonModal.js";
import { Button, Col, Row } from "react-bootstrap";
import PermissionRecordTable from "../../components/Tables/PermissionRecordTable/PermissionRecordTable.js";

// TODO Desenvolver
function PermissionsScreen() {
  const [loading, setLoading] = useState(true);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [permissionRecords, setPermissionRecords] = useState();
  const [outdatedRecords, setOutdatedRecords] = useState(true);

  // Fetch people data
  useEffect(() => {
    if (!outdatedRecords) return;
    setLoading(true);
    getDataWithAuthToken(API_ROUTES.PERMISSIONS_API_ROUTE)
      .then((res) => {
        let records = res.data.map(
          (record) => new Permission(record.permission_id, record.rfid)
        );
        setPermissionRecords(records);
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
    <PermissionsDataContext
      value={{
        outdatedRecords,
        setOutdatedRecords,
      }}
    >
      <main className="container mt-5">
        <Row>
          <Col>
            <h2 className="float-start">Pessoas</h2>
          </Col>
          <Col>
            <Button variant="dark" className="float-end">
              <i
                onClick={addPersonButtonClickHandler}
                className="fas fa-user me-2"
              />
              Adicionar Pessoa
            </Button>
          </Col>
        </Row>
        <div className="mt-5">
          <PermissionRecordTable
            loading={loading}
            permissionRecords={permissionRecords}
          />
        </div>
      </main>
      <AddPersonModal
        showModal={showAddPersonModal}
        setShowModal={setShowAddPersonModal}
      />
    </PermissionsDataContext>
  );
}

export default PermissionsScreen;
