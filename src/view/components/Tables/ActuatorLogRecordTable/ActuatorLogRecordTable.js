import React from "react";
import RecordTable from "../RecordTable/RecordTable.js";
import ActuatorLogRecordTableRow from "./ActuatorLogRecordTableRow.js";

/** Tabela para registos de atuador
 * @param {boolean} loading
 * @param {Array<ActuatorLog>} actuatorLogRecords
 * @returns {JSX.Element}
 */
function ActuatorLogRecordTable({ loading, actuatorLogRecords }) {
  const tableHeaders = ["#", "Atuador", "Estado", "Data/Hora"];

  return (
    <RecordTable
      loading={loading}
      headers={tableHeaders}
      records={actuatorLogRecords}
      TableRowComponent={ActuatorLogRecordTableRow}
    />
  );
}

export default ActuatorLogRecordTable;
