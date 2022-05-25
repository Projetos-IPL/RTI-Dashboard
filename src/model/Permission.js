import * as Yup from "yup";

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

export const AddPermissionFormSchema = Yup.object().shape({
  rfid: Yup.string()
    .min(5, "O rfid tem de ter no mínimo 5 carateres.")
    .max(20, "O rfid não pode ter mais do que 20 carateres.")
    .required("rfid tem de ser preenchido."),
});

export default Permission;
