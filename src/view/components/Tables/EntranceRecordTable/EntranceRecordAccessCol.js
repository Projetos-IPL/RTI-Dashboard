/**
 * @param {EntranceRecord} entranceRecord
 * @returns {JSX.Element}
 * @constructor
 */
function EntranceRecordAccessCol({ entranceRecord }) {
  return (
    <span className={`text-${entranceRecord.access ? "success" : "danger"}`}>
      <i className={`fas fa-${entranceRecord.access ? "check" : "ban"} me-2`} />
      {entranceRecord.access ? "Permitido" : "Negado"}
    </span>
  );
}

export default EntranceRecordAccessCol;
