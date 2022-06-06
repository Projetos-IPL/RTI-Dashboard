import React, { useEffect, useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import Permission from "../../../model/Permission.js";
import { handleException } from "../../../utils/handleException.js";
import { PermissionsDataProvider } from "./PermissionsDataContext.js";
import { Button, Col, Row } from "react-bootstrap";
import PermissionRecordTable from "../../components/Tables/PermissionRecordTable/PermissionRecordTable.js";
import AddPermissionFormModal from "../../components/Modals/AddPermissionFormModal.js";

function PermissionsScreen() {
  const [loading, setLoading] = useState(true);
  const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);
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

  const addPermissionBtnClickHandler = (e) => {
    e.preventDefault();
    setShowAddPermissionModal(true);
  };

  return (
    <PermissionsDataProvider
      value={{
        outdatedRecords,
        setOutdatedRecords,
      }}
    >
      <main className="container mt-5">
        <Row>
          <Col xs={3}>
            <h2 className="float-start">Permissões</h2>
          </Col>
          <Col xs={9}>
            <Button
              onClick={addPermissionBtnClickHandler}
              variant="dark"
              className="float-end"
            >
              <i className="fas fa-plus me-3" />
              Adicionar
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
      <AddPermissionFormModal
        showModal={showAddPermissionModal}
        setShowModal={setShowAddPermissionModal}
      />
    </PermissionsDataProvider>
  );
}

export default PermissionsScreen;
