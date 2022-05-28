/**
 * @param index
 * @param {ActuatorLog} record
 * @returns {JSX.Element}
 * @constructor
 */
function ActuatorLogRecordTableRow({ index, record }) {
  return (
    <tr key={index}>
      <td>{index}</td>
      <td>{record.actuatorName}</td>
      <td>{record.formattedTimestamp}</td>
    </tr>
  );
}

export default ActuatorLogRecordTableRow;
