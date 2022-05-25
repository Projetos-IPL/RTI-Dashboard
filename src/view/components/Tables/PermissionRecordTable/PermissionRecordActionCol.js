import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { API_ROUTES } from "../../../../config.js";
import { toast } from "react-toastify";
import { TOAST_SUCCESS_CONFIG } from "../../../../utils/toastConfigs.js";
import { handleException } from "../../../../utils/handleException.js";
import { deleteRequestWithAuthToken } from "../../../../utils/requests.js";
import PermissionsDataContext from "../../../screens/PermissionsScreen/PermissionsDataContext.js";

function PermissionRecordActionCol({ record }) {
  const { setOutdatedRecords } = useContext(PermissionsDataContext);

  const deletePermissionClickHandler = () => {
    deleteRequestWithAuthToken(API_ROUTES.PERMISSIONS_API_ROUTE, {
      rfid: record.rfid,
    })
      .then((res) => {
        if (res.ok) {
          toast.success(res.data, TOAST_SUCCESS_CONFIG);
          setOutdatedRecords(true);
        } else {
          handleException(new Error(res.data.message));
        }
      })
      .catch((err) => {
        handleException(err);
      });
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={deletePermissionClickHandler}
        className="me-1"
      >
        <i className="fas fa-trash" />
      </Button>
    </>
  );
}

export default PermissionRecordActionCol;
