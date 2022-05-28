/**
 * @param index
 * @param {SensorLog} record
 * @returns {JSX.Element}
 * @constructor
 */
function SensorLogRecordTableRow({ index, record }) {
  return (
    <tr key={index}>
      <td>{record.sensorLogId}</td>
      <td>{record.sensorName}</td>
      <td>{record.value}</td>
      <td>{record.formattedTimestamp}</td>
    </tr>
  );
}

export default SensorLogRecordTableRow;
