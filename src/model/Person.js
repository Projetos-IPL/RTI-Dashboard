class Person {
  /**
   * @param rfid Rfid da pessoa
   * @param firstName Primeiro Nome
   * @param lastName Último Nome
   */
  constructor(rfid, firstName, lastName) {
    this._rfid = rfid;
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get rfid() {
    return this._rfid;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get fullName() {
    return this._firstName + " " + this._lastName;
  }
}

export default Person;
