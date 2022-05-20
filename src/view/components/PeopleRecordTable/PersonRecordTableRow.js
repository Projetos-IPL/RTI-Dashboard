/**
 *
 * @param index
 * @param {Person} record
 * @returns {JSX.Element}
 * @constructor
 */
function PersonRecordTableRow({ index, record }) {
  return (
    <tr key={index}>
      <td>{record.fullName} </td>
      <td>{record.rfid} </td>
      <td>Actions</td>
    </tr>
  );
}

export default PersonRecordTableRow;
