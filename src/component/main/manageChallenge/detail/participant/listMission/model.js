/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

class ModelView {
  order = 'joinedAt';
  by = "asc";
  filter;
  filterValue;
  search;
  searchValue;
  
  get orderBy() { return this.orderBy; }
  set orderBy(val) { this.orderBy = val; }
  get by() { return this.by; }
  set by(val) { this.by = val; }

  get filter() { return this.filter; }
  set filter(val) { this.filter = val; }

  get filterValue() { return this.filterValue; }
  set filterValue(val) { this.filterValue = val; }

  get search() { return this.search; }
  set search(val) { this.search = val; }

  get searchValue() { return this.searchValue; }
  set searchValue(val) { this.searchValue = val; }

}

class ModelRequest {
  // orderBy;
  // type;

  // setOrderBy(val) { this.orderBy = val; return this; }
  // setType(val) { this.type = val; return this; }

}

export { ModelView, ModelRequest }