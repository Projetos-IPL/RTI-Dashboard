import { Form } from "react-bootstrap";
import React, { createRef, useEffect, useState } from "react";
import { getData } from "../../../utils/requests.js";
import { API_ROUTES } from "../../../config.js";
import { handleException } from "../../../utils/handleException.js";

function SensorFilterSelect({ filter, setFilter }) {
  const [sensors, setSensors] = useState();

  // Fetch sensorTypes
  useEffect(() => {
    getData(API_ROUTES.SENSOR_TYPES_API_ROUTE)
      .then((res) => {
        if (res.ok) {
          setSensors(res.data);
        } else {
          handleException(new Error(res.data.message));
        }
      })
      .catch((err) => handleException(err));
  }, []);

  const sensorFilterSelectRef = createRef();

  const handleSensorFilterChange = () => {
    setFilter({
      prevFilter: filter,
      filter: parseInt(sensorFilterSelectRef.current.value),
    });
  };

  return (
    <Form.Select
      ref={sensorFilterSelectRef}
      onChange={handleSensorFilterChange}
    >
      <option value={0} />
      {sensors &&
        sensors.map((sensor, index) => {
          return (
            <option key={index} value={sensor.sensor_id}>
              {sensor.name}
            </option>
          );
        })}
    </Form.Select>
  );
}

export default SensorFilterSelect;
