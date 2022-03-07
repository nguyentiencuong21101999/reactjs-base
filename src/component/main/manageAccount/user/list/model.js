/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

 class ModelView {
  orderBy = 'desc';
  status;
  createdAt;
  username;
  phoneNumber;
  fullName;

  get orderBy() { return this.orderBy; }
  set orderBy(val) { this.orderBy = val; }

  get status() { return this.status; }
  set status(val) { this.status = val; }

  get createdAt() { return this.createdAt; }
  set createdAt(val) { this.createdAt = val; }

  get username() { return this.username; }
  set username(val) { this.username = val; }

  get phoneNumber() { return this.phoneNumber; }
  set phoneNumber(val) { this.phoneNumber = val; }

  get fullName() { return this.fullName; }
  set fullName(val) { this.fullName = val; }

}

class ModelRequest {
  // orderBy;
  // type;

  // setOrderBy(val) { this.orderBy = val; return this; }
  // setType(val) { this.type = val; return this; }

}

export { ModelView, ModelRequest }