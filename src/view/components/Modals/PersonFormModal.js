import React from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  FormLabel,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Formik } from "formik";
import Person, { personSchema } from "../../../model/Person.js";

/**
 * @param showModal
 * @param setShowModal
 * @param record
 * @param handleSubmit
 * @param {boolean} editMode
 * @returns {JSX.Element}
 * @constructor
 */
function PersonFormModal({
  showModal,
  setShowModal,
  record = new Person("", "", ""),
  handleSubmit,
  editMode = false,
}) {
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static">
      <ModalHeader>
        <ModalTitle>Editar Pessoa</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            firstName: record.firstName,
            lastName: record.lastName,
            rfid: record.rfid,
          }}
          validationSchema={personSchema}
          onSubmit={handleSubmit}
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
                  <Form.Group as={Col} md="6" controlId="validationFirstName">
                    <Form.Label>Primeiro Nome</Form.Label>
                    <Form.Control
                      disabled={editMode}
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      isValid={touched.firstName && !errors.firstName}
                      isInvalid={errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationLastName">
                    <Form.Label>Último Nome</Form.Label>
                    <Form.Control
                      disabled={editMode}
                      name="lastName"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      isValid={touched.lastName && !errors.lastName}
                      isInvalid={errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="validationRfid" className="mb-3">
                      <FormLabel>Etiqueta RFID</FormLabel>
                      <Form.Control
                        name="rfid"
                        type="text"
                        placeholder="Ex: B7 4F 46 01"
                        value={values.rfid}
                        onChange={handleChange}
                        isValid={touched.rfid && !errors.rfid}
                        isInvalid={errors.rfid}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.rfid}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
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

export default PersonFormModal;
