class Permission {
  /**
   * @param permissionId
   * @param rfid
   */
  constructor(permissionId, rfid) {
    this._permissionId = permissionId;
    this._rfid = rfid;
  }

  get permissionId() {
    return this._permissionId;
  }

  get rfid() {
    return this._rfid;
  }
}

export default Permission;
