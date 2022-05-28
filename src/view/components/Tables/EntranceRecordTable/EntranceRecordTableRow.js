import EntranceRecordAccessCol from "./EntranceRecordAccessCol.js";

function EntranceRecordTableRow({ index, record }) {
  return (
    <tr key={index}>
      <td>{record.entranceLogId}</td>
      <td>{record.personName + " (" + record.rfid + ")"} </td>
      <td>{record.formattedTimestamp}</td>
      <td>
        <EntranceRecordAccessCol entranceRecord={record} />
      </td>
    </tr>
  );
}

export default EntranceRecordTableRow;
