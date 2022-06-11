import { Form } from "react-bootstrap";
import React, { createRef, useEffect, useState } from "react";
import { getData } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";

function ActuatorFilterSelect({ setFilter }) {
  const [actuators, setActuators] = useState();

  // Fetch actuatorTypes
  useEffect(() => {
    getData(API_ROUTES.ACTUATOR_TYPES_API_ROUTE)
      .then((res) => {
        if (res.ok) {
          setActuators(res.data);
        } else {
          handleException(new Error(res.data.message));
        }
      })
      .catch((err) => handleException(err));
  }, []);

  const actuatorFilterSelectRef = createRef();

  const handleActuatorFilterChange = () => {
    setFilter(actuatorFilterSelectRef.current.value);
  };

  return (
    <Form.Select
      ref={actuatorFilterSelectRef}
      onChange={handleActuatorFilterChange}
    >
      <option value={null} />
      {actuators &&
        actuators.map((actuator, index) => {
          return (
            <option key={index} value={actuator.actuator_id}>
              {actuator.name}
            </option>
          );
        })}
    </Form.Select>
  );
}

export default ActuatorFilterSelect;
