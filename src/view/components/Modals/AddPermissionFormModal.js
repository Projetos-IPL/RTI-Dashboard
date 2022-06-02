import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Form,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from "formik";
import Person from "../../../model/Person.js";
import {
  getDataWithAuthToken,
  postDataWithAuthToken,
} from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";
import { toast } from "react-toastify";
import { TOAST_SUCCESS_CONFIG } from "../../../utils/toastConfigs.js";
import PermissionsDataContext from "../../screens/PermissionsScreen/PermissionsDataContext.js";
import { AddPermissionFormSchema } from "../../../model/Permission.js";

/**
 * @param showModal
 * @param setShowModal
 * @param record
 * @returns {JSX.Element}
 * @constructor
 */
function AddPermissionFormModal({ showModal, setShowModal }) {
  const [peopleRecords, setPeopleRecords] = useState([]);
  const { setOutdatedRecords } = useContext(PermissionsDataContext);

  useEffect(() => {
    getDataWithAuthToken(API_ROUTES.PEOPLE_API_ROUTE)
      .then((res) => {
        let records = res.data.map(
          (record) =>
            new Person(record.rfid, record.first_name, record.last_name)
        );
        setPeopleRecords(records);
      })
      .catch((err) => handleException(err));
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleAddPermissionFormSubmit = (values, { setSubmitting }) => {
    console.log("e");
    setSubmitting(true);
    postDataWithAuthToken(API_ROUTES.PERMISSIONS_API_ROUTE, {
      rfid: values.rfid,
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
    <Modal show={showModal} onHide={handleClose}>
      <ModalHeader>
        <ModalTitle>Adicionar Permissão</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            rfid: "",
          }}
          validationSchema={AddPermissionFormSchema}
          onSubmit={handleAddPermissionFormSubmit}
        >
          {({
            isSubmitting,
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group controlId="validationPerson">
                    <Form.Label>Pessoa</Form.Label>
                    <Form.Select
                      name="rfid"
                      isValid={touched.rfid && !errors.rfid}
                      isInvalid={errors.rfid}
                      onChange={handleChange}
                      value={values.rfid}
                    >
                      <option value="">&#160;</option>
                      {peopleRecords.length !== 0 &&
                        peopleRecords.map((person, index) => (
                          <option value={person.rfid} key={index}>
                            {person.fullName + " (" + person.rfid + ")"}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="Invalid">
                      {errors.rfid}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <ModalFooter>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button variant="dark" type="submit" disabled={isSubmitting}>
                    Confirmar
                  </Button>
                </ModalFooter>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
}

export default AddPermissionFormModal;
