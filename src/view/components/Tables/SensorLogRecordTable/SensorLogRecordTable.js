import React from "react";
import RecordTable from "../RecordTable/RecordTable.js";
import SensorLogRecordTableRow from "./SensorLogRecordTableRow.js";

/** Tabela para registos de sensor
 * @param {boolean} loading
 * @param {Array<EntranceRecord>} entranceRecords
 * @returns {JSX.Element}
 */
function SensorLogRecordTable({ loading, sensorLogRecords }) {
  const tableHeaders = ["#", "Sensor", "Valor", "Data/Hora"];

  return (
    <RecordTable
      loading={loading}
      headers={tableHeaders}
      records={sensorLogRecords}
      TableRowComponent={SensorLogRecordTableRow}
    />
  );
}

export default SensorLogRecordTable;
