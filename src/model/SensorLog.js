class SensorLog {
  constructor(sensorLogId, sensorId, sensorName, value, timestamp) {
    this._sensorLogId = sensorLogId;
    this._sensorId = sensorId;
    this._sensorName = sensorName;
    this._value = value;
    this._timestamp = timestamp;
  }

  get sensorLogId() {
    return this._sensorLogId;
  }

  get sensorId() {
    return this._sensorId;
  }

  get sensorName() {
    return this._sensorName;
  }

  get value() {
    return this._value;
  }

  get timestamp() {
    return this._timestamp;
  }

  get formattedTimestamp() {
    return new Date(this._timestamp * 1000).toLocaleString("pt-PT");
  }
}

export default SensorLog;
