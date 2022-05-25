/**
 * @param index
 * @param {Person} record
 * @param {Function} setShowModal
 * @returns {JSX.Element}
 * @constructor
 */
import PersonRecordActionsCol from "./PersonRecordActionsCol.js";

function PersonRecordTableRow({ index, record }) {
  return (
    <tr key={index}>
      <td>{record.fullName} </td>
      <td>{record.rfid} </td>
      <td>
        <PersonRecordActionsCol record={record} />
      </td>
    </tr>
  );
}

export default PersonRecordTableRow;
