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
  title;
  content;
  channel;

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

  get title() { return this.title; }
  set title(val) { this.title = val; }

  get content() { return this.content; }
  set content(val) { this.content = val; }

  get channel() { return this.channel; }
  set channel(val) { this.channel = val; }


}

class ModelRequest {
  // orderBy;
  // type;

  // setorderBy(val) { this.orderBy = val; return this; }
  // setType(val) { this.type = val; return this; }

}

export { ModelView, ModelRequest }