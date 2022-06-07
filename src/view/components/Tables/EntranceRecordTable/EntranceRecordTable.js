import React from "react";
import EntranceRecordTableRow from "./EntranceRecordTableRow.js";
import RecordTable from "../RecordTable/RecordTable.js";

/** Tabela para registos de movimento
 * @param {boolean} loading
 * @param {Array<EntranceRecord>} entranceRecords
 * @returns {JSX.Element}
 */
function EntranceRecordTable({ loading, entranceRecords }) {
  const tableHeaders = ["#", "Pessoa", "Data/Hora", "Estado", "Imagem"];

  return (
    <RecordTable
      loading={loading}
      headers={tableHeaders}
      records={entranceRecords}
      TableRowComponent={EntranceRecordTableRow}
    />
  );
}

export default EntranceRecordTable;
