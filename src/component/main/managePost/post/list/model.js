/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

class ModelView {
  orderBy = 'desc';
  status;
  createdAt;
  title;
  audience

  get orderBy() { return this.orderBy; }
  set orderBy(val) { this.orderBy = val; }

  get status() { return this.status; }
  set status(val) { this.status = val; }

  get createdAt() { return this.createdAt; }
  set createdAt(val) { this.createdAt = val; }

  get title() { return this.title; }
  set title(val) { this.title = val; }

  get audience() { return this.audience; }
  set audience(val) { this.audience = val; }

}

class ModelRequest {
  // orderBy;
  // type;

  // setorderBy(val) { this.orderBy = val; return this; }
  // setType(val) { this.type = val; return this; }

}

export { ModelView, ModelRequest }