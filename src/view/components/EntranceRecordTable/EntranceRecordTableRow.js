import EntranceRecordAccessCol from "./EntranceRecordAccessCol.js";

function EntranceRecordTableRow({ index, entranceRecord }) {
  return (
    <tr>
      <td>{index}</td>
      <td>{entranceRecord.personName + "(" + entranceRecord.rfid + ")"} </td>
      <td>{entranceRecord.formattedTimestamp}</td>
      <td>
        <EntranceRecordAccessCol entranceRecord={entranceRecord} />
      </td>
    </tr>
  );
}

export default EntranceRecordTableRow;
