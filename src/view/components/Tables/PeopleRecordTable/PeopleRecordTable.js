import React from "react";
import RecordTable from "../RecordTable/RecordTable.js";
import PersonRecordTableRow from "./PersonRecordTableRow.js";

/** Tabela para registos de pessoas
 * @param {boolean} loading
 * @param {Array<Person>} peopleRecords
 * @returns {JSX.Element}
 */
function PeopleRecordTable({ loading, peopleRecords }) {
  const tableHeaders = ["Nome", "RFID", "Ações"];

  return (
    <RecordTable
      loading={loading}
      headers={tableHeaders}
      records={peopleRecords}
      TableRowComponent={PersonRecordTableRow}
    />
  );
}

export default PeopleRecordTable;
