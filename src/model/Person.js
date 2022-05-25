import * as Yup from "yup";

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

export const personSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Primeiro nome tem de ser preenchido")
    .min(2, "Mínimo de 2 carateres.")
    .max(20, "Máximo de 20 carateres."),
  lastName: Yup.string()
    .required("Último nome tem de ser preenchido")
    .min(2, "Mínimo de 2 carateres.")
    .max(20, "Máximo de 20 carateres."),
  rfid: Yup.string()
    .min(5, "O rfid tem de ter no mínimo 5 carateres.")
    .max(20, "O rfid não pode ter mais do que 20 carateres.")
    .required("rfid tem de ser preenchido."),
});

export default Person;
