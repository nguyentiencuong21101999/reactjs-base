/**
 * Created By Nguyen Cong Thanh on 08/28/2020 09:37.
 *
 * Copyright intelIn 2020.
 */

class AuthModel {

  token;
  expireAt;

  setToken(token) { this.token = token; return this; }
  setExpireAt(expireAt) { this.expireAt = expireAt; return this; }
  getExpireAt() { return this.expireAt; }

}

const PAYMENT_WITH_TOKEN_STATUS = {
  PROCESSING: 0,
  COMPLETE: 1,
}

class PaymentWithTokenModel {

  origin;
  token;
  status;

  setOrigin(origin) { this.origin = origin; return this; }
  setToken(token) { this.token = token; return this; }
  setStatus(status) { this.status = status; return this; }

}

export { AuthModel, PAYMENT_WITH_TOKEN_STATUS, PaymentWithTokenModel } 