import React, { useContext } from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  FormLabel,
  FormControl,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_ROUTES } from "../../../config.js";
import { postDataWithAuthToken } from "../../../utils/requests.js";
import { toast } from "react-toastify";
import { TOAST_SUCCESS_CONFIG } from "../../../utils/toastConfigs.js";
import { handleException } from "../../../utils/handleException.js";
import PeopleDataContext from "../../screens/PeopleScreen/PeopleDataContext.js";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import PersonFormModal from "./PersonFormModal.js";

/**
 * @param {boolean} showModal
 * @param {Function} setShowModal
 * @returns {JSX.Element}
 */
function AddPersonModal({ showModal, setShowModal }) {
  const { setOutdatedRecords } = useContext(PeopleDataContext);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    postDataWithAuthToken(API_ROUTES.PEOPLE_API_ROUTE, {
      rfid: values.rfid,
      first_name: values.firstName,
      last_name: values.lastName,
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
      handleSubmit={handleSubmit}
    />
  );
}

export default AddPersonModal;
