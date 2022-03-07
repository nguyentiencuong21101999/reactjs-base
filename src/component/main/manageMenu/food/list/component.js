import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import ModelTable from 'core/table/model'
import SearchEnum from 'service/enum/search'
import RouteEnum from 'service/enum/route'

import Helper from 'service/helper'
import { ModelView } from './model'
import HelperService from 'service/helper'
import MenuEnum from 'service/enum/menu'
import Localize from 'service/localize'
class ListFoodComponent extends Component {
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
        listStatus: [
          {
            text: MenuEnum.FOOD_PARSE[MenuEnum.FOOD.ALL],
            value: MenuEnum.FOOD.ALL
          },
          {
            text: MenuEnum.FOOD_PARSE[MenuEnum.FOOD.BREAKFAST],
            value: MenuEnum.FOOD.BREAKFAST
          },
          {
            text: MenuEnum.FOOD_PARSE[MenuEnum.FOOD.LUNCH],
            value: MenuEnum.FOOD.LUNCH
          },
          {
            text: MenuEnum.FOOD_PARSE[MenuEnum.FOOD.DINNER],
            value: MenuEnum.FOOD.DINNER
          },
          {
            text: MenuEnum.FOOD_PARSE[MenuEnum.FOOD.FIRST_SNACK],
            value: MenuEnum.FOOD.FIRST_SNACK
          },
          {
            text: MenuEnum.FOOD_PARSE[MenuEnum.FOOD.SECOND_SNACK],
            value: MenuEnum.FOOD.SECOND_SNACK
          },

        ],
        defaultStatus: {},
        listSearch: [
          {
            text: Localize.getLocalize("LC_FOOD_NAME"),
            value: 'food.foodName'
          }
        ],
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

  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListFoodComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state

      ui.defaultOrderBy = ui.listOrderBy[0]
      ui.defaultSearch = ui.listSearch[0]
      ui.defaultStatus = ui.listStatus[0]
      ui.searchInput = ui.defaultSearch.value

      ui.dataTable = new ModelTable()
        .setOrder("modifiedAt")
        .setBy("desc")
      data['search'] = "food.foodName"
      data['filterValue'] = undefined

    }
    catch (e) {
      Logger.error(`ListFoodComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListFoodComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListFoodComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListFoodComponent execute handleRequest')
      const { ui, timeout } = this.state
    } catch (e) {
      Logger.error(`ListFoodComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListFoodComponent execute handleOnChangeTableValue");
      Logger.debug("ListFoodComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state
      ui.list = null
      ui.resetPage = false
      ui.dataTable.limit = query.limit
      ui.dataTable.from = query.from
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListFoodComponent handleOnChangeTableValue ${e.toString()}`);
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
      Logger.error(`ListFoodComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('ListFoodComponent execute handleOnChange')
      Logger.debug('ListFoodComponent execute handleOnChange receive name', name)
      Logger.debug('ListFoodComponent execute handleOnChange receive value', value)
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
      }
    } catch (e) {
      Logger.error(`ListFoodComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearch(event, value) {
    try {
      Logger.info('ListFoodComponent execute handleOnChangeSearch')
      Logger.debug('ListFoodComponent execute handleOnChangeSearch receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      ui.searchInput = value
      this.handleOnChange('search', value)
      this.handleOnChangeSearchValue(value, "")  // set default

      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListFoodComponent handleOnChangeSearch ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info('ListFoodComponent execute handleOnChangeSearchValue')
      Logger.debug('ListFoodComponent execute handleOnChangeSearchValue receive value', value)
      // if(event){
      //   event.preventDefault()
      // }

      const { ui, data } = this.state
      ui.searchValue = !Helper.isEmpty(value) ? value : ""
      let temp = !Helper.isEmpty(value) ? value : undefined
      if (!HelperService.isEmpty(temp) && data['search'] == 'challenge.createdAt') {
        temp = HelperService.getYearMonthDateYue(new Date(temp))
      }
      this.handleOnChange('searchValue', temp)
    } catch (e) {
      Logger.error(`ListFoodComponent handleOnChangeSearchValue ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info('ListFoodComponent execute handleOnChangeOrderBy')
      Logger.debug('ListFoodComponent execute handleOnChangeOrderBy receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleOnChange('by', value)
      ui.defaultOrderBy = ui.listOrderBy.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListFoodComponent handleOnChangeOrderBy ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListFoodComponent execute handleSetData");
      Logger.debug("ListFoodComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;
      Logger.debug("ListFoodComponent execute handleSetData receive list", ui.list);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListFoodComponent handleSetData ${e.toString()}`);
    }
  }

  handleSubmitSearch(event) {
    try {
      Logger.info("ListFoodComponent execute handleSubmitSearch");
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
      Logger.debug("ListFoodComponent execute handleSubmitSearch data", data);
      Logger.debug("ListFoodComponent execute handleSubmitSearch dataTable", ui.dataTable);
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListFoodComponent handleSubmitSearch ${e.toString()}`);
    }
  }

  handleCreate(event) {
    try {
      Logger.info('ListFoodComponent execute handleCreate')
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_MENU.FOOD.CREATE)
    } catch (e) {
      Logger.error(`ListFoodComponent handleCreate ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeStatus(event, value) {
    try {
      Logger.info('ListFoodComponent execute handleOnChangeStatus')
      Logger.debug('ListFoodComponent execute handleOnChangeStatus receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      if (value === MenuEnum.FOOD.ALL) {
        this.handleOnChange('filter', undefined)
        this.handleOnChange('filterValue', undefined)
      } else {
        this.handleOnChange('filter', 'food.suitableFor')
        this.handleOnChange('filterValue', value)
      }

      ui.defaultStatus = ui.listStatus.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListFoodComponent handleOnChangeStatus ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleRedirectDetail(item) {
    try {
      Logger.info('ListFoodComponent execute handleRedirectDetail')
      Logger.debug('ListFoodComponent execute handleRedirectDetail recieve item', item)
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_MENU.FOOD.DETAIL
      const path = route.replace(':id', item.foodId)
      this.handleRedirectWithState(path, item)
    } catch (e) {
      Logger.error(`ListFoodComponent handleRedirectDetail ${e.toString()}`)
      const { ui, timeout } = this.state;
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

export default BaseComponent(ListFoodComponent)