import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import ModelTable from 'core/table/model'
import CategoryEnum from 'service/enum/category'
import SearchEnum from 'service/enum/search'
import RouteEnum from 'service/enum/route'
import Helper from 'service/helper'
import { ModelView } from './model'
import HelperService from 'service/helper'
import Localize from "service/localize";
class ListPostComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      ui: {
        listOrderBy: [{
          text: SearchEnum.FILTER_PARSE[SearchEnum.FILTER.DESC],
          value: SearchEnum.FILTER.DESC
        },
        {
          text: SearchEnum.FILTER_PARSE[SearchEnum.FILTER.ASC],
          value: SearchEnum.FILTER.ASC
        }
        ],
        defaultOrderBy: {},
        listSearch: [
          {
            text: Localize.getLocalize("LC_CATEGORY_NAME"),
            value: 'category.name'
          },
        ],
        listStatus: [
          {
            text: CategoryEnum.STATUS_PARSE[CategoryEnum.STATUS.ALL],
            value: CategoryEnum.STATUS.ALL
          },
          {
            text: CategoryEnum.STATUS_PARSE[CategoryEnum.STATUS.NEW],
            value: CategoryEnum.STATUS.NEW,
          },
          {
            text: CategoryEnum.STATUS_PARSE[CategoryEnum.STATUS.APPLIED],
            value: CategoryEnum.STATUS.APPLIED,
          }
        ],
        defaultStatus: {},
        defaultSearch: {},
        resetPage: true,
        dataTable: null,
        searchInput: null,
        list: null,
        searchValue: "",
        tab: {
          current: 1,
          user: 1,
          admin: 2,
        },
        total: 3,
      },
      func: {
        handleSystemError: this.handleSystemError.bind(this),
      },
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        type: React.createRef(),
        filter: React.createRef(),
        search: React.createRef(),
      }
    }

    this.handleOnChangeTableValue = this.handleOnChangeTableValue.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this)
    this.handleOnChangeSearchValue = this.handleOnChangeSearchValue.bind(this)
    this.handleOnChangeOrderBy = this.handleOnChangeOrderBy.bind(this)
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleSetData = this.handleSetData.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleRedirectDetail = this.handleRedirectDetail.bind(this)
    this.handleOnChangeStatus = this.handleOnChangeStatus.bind(this)
  }
  handleSystemError() {
    try {
      Logger.info('EditPostComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditPostComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListPostComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state

      ui.defaultOrderBy = ui.listOrderBy[0]
      ui.defaultSearch = ui.listSearch[0]
      ui.defaultStatus = ui.listStatus[0]
      ui.searchInput = ui.defaultSearch.value

      ui.dataTable = new ModelTable()
        .setWhat('category')
        .setOrder("createdAt")
        .setBy("desc")
      data['search'] = "category.name"
      data['filterValue'] = undefined
    }
    catch (e) {
      Logger.error(`ListPostComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListPostComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListPostComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListPostComponent execute handleRequest')
      const { ui, timeout } = this.state
    } catch (e) {
      Logger.error(`ListPostComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListPostComponent execute handleOnChangeTableValue");
      Logger.debug("ListPostComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state
      ui.list = null
      ui.resetPage = false
      ui.dataTable.limit = query.limit
      ui.dataTable.from = query.from
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListPostComponent handleOnChangeTableValue ${e.toString()}`);
    }
  }

  handleOnRef(name, element) {
    try {
      const { ref } = this.state
      ref[name] = element
      if (name === 'username') {
        ref[name].focus()
      }
    } catch (e) {
      Logger.error(`ListPostComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('ListPostComponent execute handleOnChange')
      Logger.debug('ListPostComponent execute handleOnChange receive name', name)
      Logger.debug('ListPostComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      switch (name) {
        case 'by':
        case 'filter':
        case 'filterValue':
          data[name] = value
          break;
        case 'search':
        case 'searchValue':
          data[name] = value
          break;
          break;
      }
    } catch (e) {
      Logger.error(`ListPostComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearch(event, value) {
    try {
      Logger.info('ListPostComponent execute handleOnChangeSearch')
      Logger.debug('ListPostComponent execute handleOnChangeSearch receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      ui.searchInput = value
      this.handleOnChange('search', value)
      this.handleOnChangeSearchValue(value, "")  // set default

      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListPostComponent handleOnChangeSearch ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info('ListPostComponent execute handleOnChangeSearchValue')
      Logger.debug('ListPostComponent execute handleOnChangeSearchValue receive value', value)
      // if(event){
      //   event.preventDefault()
      // }

      const { ui, data } = this.state
      ui.searchValue = !Helper.isEmpty(value) ? value : ""
      let temp = !Helper.isEmpty(value) ? value : undefined
      this.handleOnChange('searchValue', temp)
    } catch (e) {
      Logger.error(`ListPostComponent handleOnChangeSearchValue ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }


  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info('ListPostComponent execute handleOnChangeOrderBy')
      Logger.debug('ListPostComponent execute handleOnChangeOrderBy receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleOnChange('by', value)
      ui.defaultOrderBy = ui.listOrderBy.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListPostComponent handleOnChangeOrderBy ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListPostComponent execute handleSetData");
      Logger.debug("ListPostComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;

      Logger.debug("ListPostComponent execute handleSetData receive list", ui.list);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListPostComponent handleSetData ${e.toString()}`);
    }
  }
  handleSubmitSearch(event) {
    try {
      Logger.info("ListPostComponent execute handleSubmitSearch");
      if (event) {
        event.preventDefault()
      }
      const { ui, timeout, data } = this.state;
      ui.list = null
      ui.resetPage = true
      let temp = { ...data }
      if (HelperService.isEmpty(temp['searchValue'])) {
        temp['search'] = undefined
        temp['searchValue'] = undefined
      }
      ui.dataTable = ui.dataTable.setFilter(temp.filter)
        .setFilterValue(temp.filterValue)
        .setSearch(temp.search)
        .setSearchValue(temp.searchValue)
        .setBy(temp.by)
        .setFrom(0)
      Logger.debug("ListPostComponent execute handleSubmitSearch data", data);
      Logger.debug("ListPostComponent execute handleSubmitSearch dataTable", ui.dataTable);
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListPostComponent handleSubmitSearch ${e.toString()}`);
    }
  }

  handleCreate(event) {
    try {
      Logger.info('ListPostComponent execute handleCreate')
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_POST.CATEGORY.CREATE)
    } catch (e) {
      Logger.error(`ListPostComponent handleCreate ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleRedirectDetail(item) {
    try {
      Logger.info('ListPostComponent execute handleRedirectDetail')
      Logger.debug('ListPostComponent execute handleRedirectDetail recieve item', item)
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_POST.CATEGORY.DETAIL
      const path = route.replace(':id', item.categoryId)
      this.handleRedirectWithState(path, item)
    } catch (e) {
      Logger.error(`ListPostComponent handleRedirectDetail ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }


  handleOnChangeStatus(event, value) {
    try {
      Logger.info('ListPostComponent execute handleOnChangeStatus')
      Logger.debug('ListPostComponent execute handleOnChangeStatus receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      if (value === CategoryEnum.STATUS.ALL) {
        this.handleOnChange('filter', undefined)
        this.handleOnChange('filterValue', undefined)
      } else {
        this.handleOnChange('filter', 'category.status')
        this.handleOnChange('filterValue', value)
      }

      ui.defaultStatus = ui.listStatus.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListPostComponent handleOnChangeStatus ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  render() {
    const { ui, timeout } = this.state
    return (
      <View ui={ui} handleOnChangeTableValue={this.handleOnChangeTableValue}
        timeout={timeout} handleOnChangeSearch={this.handleOnChangeSearch}
        handleOnChangeOrderBy={this.handleOnChangeOrderBy}
        handleOnChangeSearchValue={this.handleOnChangeSearchValue}
        handleOnRef={this.handleOnRef} handleSetData={this.handleSetData}
        handleSubmitSearch={this.handleSubmitSearch} handleCreate={this.handleCreate}
        handleRedirectDetail={this.handleRedirectDetail}
        handleOnChangeStatus={this.handleOnChangeStatus}
      />

    )
  }
}

export default BaseComponent(ListPostComponent)