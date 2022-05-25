/**
 * @param index
 * @param {Permission} record
 * @param {Function} setShowModal
 * @returns {JSX.Element}
 * @constructor
 */
import PermissionRecordActionCol from "./PermissionRecordActionCol.js";

function PermissionRecordTableRow({ index, record }) {
  return (
    <tr key={index}>
      <td>{record.permissionId} </td>
      <td>{record.rfid} </td>
      <td>
        <PermissionRecordActionCol record={record} />
      </td>
    </tr>
  );
}

export default PermissionRecordTableRow;
