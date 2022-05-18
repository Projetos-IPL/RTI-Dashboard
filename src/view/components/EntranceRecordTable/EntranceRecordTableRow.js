function EntranceRecordTableRow({ index, entranceRecord }) {
  return (
    <tr>
      <td>{index}</td>
      <td>{entranceRecord.personName}</td>
      <td>{entranceRecord.timestamp}</td>
      <td
        className={
          entranceRecord.access ? "badge bg-success" : "badge bg-success"
        }
      >
        {entranceRecord.access ? "Permitido" : "Negado"}
      </td>
    </tr>
  );
}

export default EntranceRecordTableRow;
