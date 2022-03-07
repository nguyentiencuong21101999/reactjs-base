/**
 * Created By Nguyen Cong Thanh on 10/23/2020 10:30.
 *
 * Copyright intelIn 2020.
 */

class Model {

  what;
  from = 0;
  limit = 30;

  status;
  // order = 'createdAt';
  // by = 'asc';
  filter;
  filterValue;
  channel;
  search;
  searchValue;
  fieldDate;
  fromDate;
  toDate;

  field;
  value;
  orderBy;

  order;
  by;

  filterBy;

  setWhat(val) { this.what = val; return this }
  setFrom(val) { this.from = val; return this }
  setLimit(val) { this.limit = val; return this }
  setStatus(val) { this.status = val; return this }

  setFilter(val) { this.filter = val; return this }
  setFilterValue(val) { this.filterValue = val; return this }

  setSearch(val) { this.search = val; return this }
  setSearchValue(val) { this.searchValue = val; return this }
  setChannel(val) { this.channel = val; return this }

  setFieldDate(val) { this.fieldDate = val; return this }
  setFromDate(val) { this.fromDate = val; return this }
  setToDate(val) { this.toDate = val; return this }

  setField(val) { this.field = val; return this }
  setValue(val) { this.value = val; return this }
  setOrderBy(val) { this.orderBy = val; return this }

  setOrder(val) { this.order = val; return this }
  setBy(val) { this.by = val; return this }

  setFilterBy(val) { this.filterBy = val; return this }


}

export default Model