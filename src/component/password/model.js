/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
  tokenId = "";
  password = "";
  token = "";

  get tokenId() { return this.tokenId; }
  set tokenId(val) { this.tokenId = val; }

  get password() { return this.password; }
  set password(val) { this.password = val; }

  get token() { return this.token; }
  set token(val) { this.token = val; }


}

class ModelRequest extends BaseModel {
  tokenId;
  password;
  token;

  constructor() { super() }

  setTokenId(val) { this.tokenId = val; return this; }
  setPassword(val) { this.password = this.hashPassword(val); return this; }
  setToken(val) { this.token = val; return this; }

}

export { ModelView, ModelRequest }