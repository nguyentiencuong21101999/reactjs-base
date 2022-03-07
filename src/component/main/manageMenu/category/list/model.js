/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

class ModelView {
  order = 'createdAt';
  by = 'desc'
  filter;
  filterValue;
  search;
  searchValue;
  createdAt;
  title;
  status;
  menuCategoryType;

  get order() { return this.order; }
  set order(val) { this.order = val; }

  get filter() { return this.filter; }
  set filter(val) { this.filter = val; }

  get filterValue() { return this.filterValue; }
  set filterValue(val) { this.filterValue = val; }

  get search() { return this.search; }
  set search(val) { this.search = val; }

  get searchValue() { return this.searchValue; }
  set searchValue(val) { this.searchValue = val; }

  get status() { return this.status; }
  set status(val) { this.status = val; }

  get createdAt() { return this.createdAt; }
  set createdAt(val) { this.createdAt = val; }

  get title() { return this.title; }
  set title(val) { this.title = val; }


  get menuCategoryType() { return this.menuCategoryType; }
  set menuCategoryType(val) { this.menuCategoryType = val; }
}

class ModelRequest {
  // orderBy;
  // type;

  // setorderBy(val) { this.orderBy = val; return this; }
  // setType(val) { this.type = val; return this; }

}

export { ModelView, ModelRequest }