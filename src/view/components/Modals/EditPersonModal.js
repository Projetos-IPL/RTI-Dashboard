import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_ROUTES } from "../../../config.js";
import { putRequestWithAuthToken } from "../../../utils/requests.js";
import { toast } from "react-toastify";
import { TOAST_SUCCESS_CONFIG } from "../../../utils/toastConfigs.js";
import { handleException } from "../../../utils/handleException.js";
import PeopleDataContext from "../../screens/PeopleScreen/PeopleDataContext.js";
import PersonFormModal from "./PersonFormModal.js";

/**
 * @param {boolean} showModal
 * @param {Person} record
 * @param {Function} setShowModal
 * @returns {JSX.Element}
 */
function EditPersonModal({ showModal, record, setShowModal }) {
  const { setOutdatedRecords } = useContext(PeopleDataContext);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    putRequestWithAuthToken(API_ROUTES.PEOPLE_API_ROUTE, {
      rfid: record.rfid,
      newRfid: values.rfid,
    })
      .then((res) => {
        if (res.ok) {
          toast.success(res.data, TOAST_SUCCESS_CONFIG);
          setOutdatedRecords(true);
          handleClose();
        } else {
          handleException(new Error(res.data.message));
        }
      })
      .catch((err) => {
        handleException(err);
        handleClose();
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <PersonFormModal
      showModal={showModal}
      setShowModal={setShowModal}
      record={record}
      editMode={true}
      handleSubmit={handleSubmit}
    />
  );
}

export default EditPersonModal;
