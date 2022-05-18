import React from "react";
import EntranceRecordTableRow from "./EntranceRecordTableRow.js";

/**
 * @param {Array<EntranceRecord>} entranceRecords
 * @returns {JSX.Element}
 * @constructor
 */
function EntranceRecordTable({ entranceRecords }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Pessoa</th>
          <th scope="col">Data/Hora</th>
          <th scope="col">Estado</th>
        </tr>
      </thead>
      <tbody id="ultimosMovimentos-table">
        {entranceRecords.map((entranceRecord, index) => {
          return (
            <EntranceRecordTableRow
              key={index + 1}
              index={index + 1}
              entranceRecord={entranceRecord}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default EntranceRecordTable;
