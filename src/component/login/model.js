/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
  username = "";
  password = "";

  get username() { return this.username; }
  set username(val) { this.username = val; }

  get password() { return this.password; }
  set password(val) { this.password = val; }

}

class ModelRequest extends BaseModel {
  username;
  password;

  constructor() { super() }

  setUsername(val) { this.username = val; return this; }
  setPassword(val) { this.password = this.hashPassword(val); return this; }

}

export { ModelView, ModelRequest }