import React, { useState } from "react";
import { getDataWithAuthToken } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import Permission from "../../../model/Permission.js";
import { handleException } from "../../../utils/handleException.js";
import { Button, Col, Row } from "react-bootstrap";
import PermissionRecordTable from "../../components/Tables/PermissionRecordTable/PermissionRecordTable.js";
import AddPermissionFormModal from "../../components/Modals/AddPermissionFormModal.js";
import { DATA_ENTITIES } from "../../../DataEntities.js";
import { useRealtime } from "../../../useRealtime.js";

function PermissionsScreen() {
  const [loading, setLoading] = useState(true);
  const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);
  const [permissionRecords, setPermissionRecords] = useState([]);

  // Atualizar os dados das permissões assim que houver uma atualização do estado global da entidade
  useRealtime(DATA_ENTITIES.PERMISSIONS, () => {
    // Apenas apresentar o spinner quando for o primeiro fetch
    if (permissionRecords.length === 0) {
      setLoading(true);
    }

    // Buscar dados À API
    getDataWithAuthToken(API_ROUTES.PERMISSIONS_API_ROUTE)
      .then((res) => {
        // Converter resultados para objetos das classe Permission
        let records = res.data.map(
          (record) => new Permission(record.permission_id, record.rfid)
        );
        // Armazenar objetos no state
        setPermissionRecords(records);
      })
      .catch((err) => handleException(err))
      .finally(() => setLoading(false));
  });

  // Handler para ativar o modal de adicioanr permissão
  const addPermissionBtnClickHandler = (e) => {
    e.preventDefault();
    setShowAddPermissionModal(true);
  };

  return (
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
      <AddPermissionFormModal
        showModal={showAddPermissionModal}
        setShowModal={setShowAddPermissionModal}
      />
    </main>
  );
}

export default PermissionsScreen;
