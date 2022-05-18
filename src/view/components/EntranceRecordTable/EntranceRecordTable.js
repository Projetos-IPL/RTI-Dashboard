import React from "react";
import EntranceRecordTableRow from "./EntranceRecordTableRow.js";
import LoadingTableRow from "../Loading/LoadingTableRow.js";

/**
 * @param loading
 * @param {Array<EntranceRecord>} entranceRecords
 * @returns {JSX.Element}
 * @constructor
 */
function EntranceRecordTable({ loading, entranceRecords }) {
  console.log("loading: ", loading);

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
        {loading && <LoadingTableRow />}
        {!loading &&
          entranceRecords.map((entranceRecord, index) => {
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
