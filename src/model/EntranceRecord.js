class EntranceRecord {
  /**
   * @param entranceLogId Id
   * @param rfid Rfid da pessoa
   * @param personName Nome da pessoa
   * @param timestamp Timestamp do registo de entrada
   * @param access Resultado da tentativa de entrada,
   */
  constructor(entranceLogId, rfid, personName, timestamp, access) {
    this._entranceLogId = entranceLogId;
    this._rfid = rfid;
    this._personName = personName;
    this._timestamp = timestamp;
    this._access = access;
  }

  get entranceLogId() {
    return this._entranceLogId;
  }

  get rfid() {
    return this._rfid;
  }

  get personName() {
    return this._personName;
  }

  get timestamp() {
    return this._timestamp;
  }

  get formattedTimestamp() {
    return new Date(this._timestamp * 1000).toLocaleString("pt-PT");
  }

  get access() {
    return this._access;
  }
}

export default EntranceRecord;
