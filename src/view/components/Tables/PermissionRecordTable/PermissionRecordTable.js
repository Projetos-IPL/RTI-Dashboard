import React from "react";
import RecordTable from "../RecordTable/RecordTable.js";
import PermissionRecordTableRow from "./PermissionRecordTableRow.js";

/** Tabela para registos de pessoas
 * @param {boolean} loading
 * @param {Array<Permission>} peopleRecords
 * @returns {JSX.Element}
 */
function PeopleRecordTable({ loading, permissionRecords }) {
  const tableHeaders = ["Id", "rfid"];

  return (
    <RecordTable
      loading={loading}
      headers={tableHeaders}
      records={permissionRecords}
      TableRowComponent={PermissionRecordTableRow}
    />
  );
}

export default PeopleRecordTable;
