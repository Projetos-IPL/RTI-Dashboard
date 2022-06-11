import React from "react";
import RecordTable from "../RecordTable/RecordTable.js";
import PermissionRecordTableRow from "./PermissionRecordTableRow.js";

/** Tabela para registos de permissões
 * @param {boolean} loading
 * @param {Array<Permission>} peopleRecords
 * @returns {JSX.Element}
 */
function PermissionRecordTable({ loading, permissionRecords }) {
  const tableHeaders = ["ID", "RFID", "Ações"];

  return (
    <RecordTable
      loading={loading}
      headers={tableHeaders}
      records={permissionRecords}
      TableRowComponent={PermissionRecordTableRow}
    />
  );
}

export default PermissionRecordTable;
