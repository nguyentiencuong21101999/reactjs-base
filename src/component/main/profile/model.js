/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
  fullName = "";
  email = "";
  phoneNumber = "";
  gender = "";
  dob = "";

  get fullName() { return this.fullName; }
  set fullName(val) { this.fullName = val; }

  get email() { return this.email; }
  set email(val) { this.email = val; }

  get dob() { return this.dob; }
  set dob(val) { this.dob = val; }

  get gender() { return this.gender; }
  set gender(val) { this.gender = val; }

  get phoneNumber() { return this.phoneNumber; }
  set phoneNumber(val) { this.phoneNumber = val; }

}

class ModelRequest extends BaseModel {
  fullName;
  email;
  phoneNumber;
  gender;
  dob;

  constructor() { super() }

  setFullName(val) { this.fullName = val; return this; }
  setEmail(val) { this.email = val; return this; }
  setPhoneNumber(val) { this.phoneNumber = val; return this; }
  setGender(val) { this.gender = val; return this; }
  setDob(val) { this.dob = val; return this; }

}

export { ModelView, ModelRequest }