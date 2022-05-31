/**
 * @param index
 * @param {ActuatorLog} record
 * @returns {JSX.Element}
 * @constructor
 */
function ActuatorLogRecordTableRow({ index, record }) {
  return (
    <tr key={index}>
      <td>{record.actuatorLogId}</td>
      <td>{record.actuatorName}</td>
      <td>{record.actuatorState}</td>
      <td>{record.formattedTimestamp}</td>
    </tr>
  );
}

export default ActuatorLogRecordTableRow;
