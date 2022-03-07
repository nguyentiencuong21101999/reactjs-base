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
import RewardEnum from 'service/enum/reward'
import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import Localize from 'service/localize'
class ListSettingComponent extends Component {
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
            text: Localize.getLocalize("LC_MENU_NAME"),
            value: 'menuSetting.menuSettingName'
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
        total: null,
        isChangeSearch: false
      },
      func: {
        handleSystemError: this.handleSystemError.bind(this),
      },
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        type: React.createRef(),
        filter: React.createRef(),
        search: React.createRef()
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
  }

  handleSystemError() {
    try {
      Logger.info('LoadingListPostComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`LoadingListPostComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListSettingComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state

      ui.defaultOrderBy = ui.listOrderBy[0]
      ui.defaultSearch = ui.listSearch[0]
      ui.searchInput = ui.defaultSearch.value

      ui.dataTable = new ModelTable()
        .setOrder("modifiedAt")
        .setBy("desc")
      data['search'] = "menuSetting.menuSettingName"
      data['filterValue'] = undefined

    }
    catch (e) {
      Logger.error(`ListSettingComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListSettingComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListSettingComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListSettingComponent execute handleRequest')
      const { ui, timeout } = this.state
    } catch (e) {
      Logger.error(`ListSettingComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListSettingComponent execute handleOnChangeTableValue");
      Logger.debug("ListSettingComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state
      ui.list = null
      ui.resetPage = false
      ui.dataTable.limit = query.limit
      ui.dataTable.from = query.from
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListSettingComponent handleOnChangeTableValue ${e.toString()}`);
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
      Logger.error(`ListSettingComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('ListSettingComponent execute handleOnChange')
      Logger.debug('ListSettingComponent execute handleOnChange receive name', name)
      Logger.debug('ListSettingComponent execute handleOnChange receive value', value)
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
      Logger.error(`ListSettingComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearch(event, value) {
    try {
      Logger.info('ListSettingComponent execute handleOnChangeSearch')
      Logger.debug('ListSettingComponent execute handleOnChangeSearch receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      ui.searchInput = value
      this.handleOnChange('search', value)
      this.handleOnChangeSearchValue(value, "")  // set default

      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListSettingComponent handleOnChangeSearch ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info('ListSettingComponent execute handleOnChangeSearchValue')
      Logger.debug('ListSettingComponent execute handleOnChangeSearchValue receive value', value)
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
      Logger.error(`ListSettingComponent handleOnChangeSearchValue ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info('ListSettingComponent execute handleOnChangeOrderBy')
      Logger.debug('ListSettingComponent execute handleOnChangeOrderBy receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleOnChange('by', value)
      ui.defaultOrderBy = ui.listOrderBy.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListSettingComponent handleOnChangeOrderBy ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListSettingComponent execute handleSetData");
      Logger.debug("ListSettingComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;
      Logger.debug("ListSettingComponent execute handleSetData receive list", ui.list);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListSettingComponent handleSetData ${e.toString()}`);
    }
  }

  handleSubmitSearch(event) {
    try {
      Logger.info("ListSettingComponent execute handleSubmitSearch");
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
      Logger.debug("ListSettingComponent execute handleSubmitSearch data", data);
      Logger.debug("ListSettingComponent execute handleSubmitSearch dataTable", ui.dataTable);
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListSettingComponent handleSubmitSearch ${e.toString()}`);
    }
  }

  handleCreate(event) {
    try {
      Logger.info('ListSettingComponent execute handleCreate')
      if (event) {
        event.preventDefault()
      }
      const { ui, timeout, data } = this.state
      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.CREATE_SETTING_MENU)
      dialog.setHandleConfirm(() => {
        ui.list = null
        ui.resetPage = true
        ui.searchValue = ""
        ui.isChangeSearch = !ui.isChangeSearch
        data['searchValue'] = undefined

        ui.dataTable = new ModelTable()
          .setOrder("modifiedAt")
          .setBy("desc")
        this.setState({ ui })
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`ListSettingComponent handleCreate ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleRedirectDetail(item) {
    try {
      Logger.info('ListSettingComponent execute handleRedirectDetail')
      Logger.debug('ListSettingComponent execute handleRedirectDetail recieve item', item)
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_MENU.SETTING.DETAIL
      const path = route.replace(':id', item.menuSettingId)
      this.handleRedirectWithState(path, item)
    } catch (e) {
      Logger.error(`ListSettingComponent handleRedirectDetail ${e.toString()}`)
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
        handleRedirectDetail={this.handleRedirectDetail} />
    )
  }
}

export default BaseComponent(ListSettingComponent)