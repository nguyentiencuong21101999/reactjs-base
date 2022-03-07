import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import ModelTable from 'core/table/model'
import AdminEnum from 'service/enum/admin'
import SearchEnum from 'service/enum/search'
import RouteEnum from 'service/enum/route'
import AuthService from 'service/auth'
import Localize from 'service/localize';

import Helper from 'service/helper'
import { ModelView } from './model'
class ListAdminComponent extends Component {
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
            text: AdminEnum.ADMIN_STATUS_PARSE[AdminEnum.ADMIN_STATUS.ALL],
            value: AdminEnum.ADMIN_STATUS.ALL
          },
          {
            text: AdminEnum.ADMIN_STATUS_PARSE[AdminEnum.ADMIN_STATUS.ACTIVE],
            value: AdminEnum.ADMIN_STATUS.ACTIVE
          },
          {
            text: AdminEnum.ADMIN_STATUS_PARSE[AdminEnum.ADMIN_STATUS.BAN],
            value: AdminEnum.ADMIN_STATUS.BAN
          }
        ],
        defaultStatus: {},
        listSearch: [
          {
            text: Localize.getLocalize("LC_FULLNAME"),
            value: 'fullName'
          },
          {
            text: Localize.getLocalize("LC_PHONE"),
            value: 'phoneNumber'
          },
          {
            text: Localize.getLocalize("LC_USERNAME"),
            value: 'username'
          },
          {
            text: Localize.getLocalize("LC_EMAIL"),
            value: 'email'
          },
          {
            text: Localize.getLocalize("LC_ID_ACCOUNT"),
            value: 'userId'
          },
        ],
        defaultSearch: {},
        dataTable: {},
        searchInput: {},
        resetPage: true,
        list: {},
        tab: {
          current: AdminEnum.ADMIN_TEMP_STATUS.ADMIN_CREATED,
          active: AdminEnum.ADMIN_TEMP_STATUS.ADMIN_CREATED,
          notActive: AdminEnum.ADMIN_TEMP_STATUS.INIT,
        },
        searchValue: {},
        total: {},
      },
      func: {
        handleGetListAdminSuccess: this.handleGetListAdminSuccess.bind(this),
        handleGetListAdminNotActiveSuccess: this.handleGetListAdminSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this)
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
    this.handleOnChangeStatus = this.handleOnChangeStatus.bind(this)
    this.handleOnChangeOrderBy = this.handleOnChangeOrderBy.bind(this)
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleSetData = this.handleSetData.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleRedirectDetail = this.handleRedirectDetail.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.handleSearchRequest = this.handleSearchRequest.bind(this)
  }
  handleSystemError(response) {
    try {
      Logger.info('ListAdminComponent execute handleAccountDoNotHaveRole')
      Logger.debug('ListAdminComponent execute handleAccountDoNotHaveRole receive response', response)
      const { ref, timeout } = this.state
      const { toast } = this.props
      timeout.setTimeout(false)
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    } catch (e) {
      Logger.error(`ListAdminComponent handleAccountDoNotHaveRole ${e.toString()}`)
    }
  }
  UNSAFE_componentWillMount() {
    try {

      Logger.info('ListAdminComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { state } = this.props.location
      ui.tab.current = Helper.isExistedTab(state, ui.tab.current)

      ui.defaultOrderBy = {
        [ui.tab.active]: {},
        [ui.tab.notActive]: {},
      }
      ui.defaultStatus = {
        [ui.tab.active]: {},
        [ui.tab.notActive]: {},
      }
      ui.defaultSearch = {
        [ui.tab.active]: {},
        [ui.tab.notActive]: {},
      }
      ui.dataTable = {
        [ui.tab.active]: {},
        [ui.tab.notActive]: {},
      }
      ui.searchInput = {
        [ui.tab.active]: null,
        [ui.tab.notActive]: null,
      }
      ui.list = {
        [ui.tab.active]: null,
        [ui.tab.notActive]: null,
      }
      ui.searchValue = {
        [ui.tab.active]: "",
        [ui.tab.notActive]: "",
      }
      ui.total = {
        [ui.tab.active]: 0,
        [ui.tab.notActive]: 0,
      }

      Object.keys(ui.defaultOrderBy).forEach(key => {
        ui.defaultOrderBy[key] = ui.listOrderBy[0]
      })
      Object.keys(ui.defaultStatus).forEach(key => {
        ui.defaultStatus[key] = ui.listStatus[0]
      })
      Object.keys(ui.defaultSearch).forEach(key => {
        ui.defaultSearch[key] = ui.listSearch[0]
      })
      Object.keys(ui.searchInput).forEach(key => {
        ui.searchInput[key] = ui.defaultSearch[key].value
      })

      Object.keys(ui.dataTable).forEach(key => {
        ui.dataTable[key] = new ModelTable()
          .setField(['status'])
          .setOrderBy("desc")
          .setValue([AdminEnum.ADMIN_STATUS.ALL])
      })
      ui.dataTable[ui.tab.notActive] = ui.dataTable[ui.tab.notActive].setField([])
        .setValue([])
      data['status'] = AdminEnum.ADMIN_STATUS.ALL
    }
    catch (e) {
      Logger.error(`ListAdminComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListAdminComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListAdminComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListAdminComponent execute handleRequest')
      const { ui, timeout } = this.state
    } catch (e) {
      Logger.error(`ListAdminComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListAdminComponent execute handleOnChangeTableValue");
      Logger.debug("ListAdminComponent execute handleOnChangeTableValue receive query", query);
      const { ui, data } = this.state
      ui.list[ui.tab.current] = null
      ui.resetPage = false
      const searchRequest = this.handleSearchRequest()
      ui.dataTable[ui.tab.current] = query.
        setField(searchRequest.field)
        .setValue(searchRequest.value)
        .setOrderBy(data['orderBy'])
      if (ui.tab.current === ui.tab.notActive) {
        const temp = [...ui.listSearch]
        delete temp.shift()

        ui.dataTable[ui.tab.notActive] = ui.dataTable[ui.tab.notActive]
          .setField([])
          .setValue([])
      }
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListAdminComponent handleOnChangeTableValue ${e.toString()}`);
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
      Logger.error(`ListAdminComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('ListAdminComponent execute handleOnChange')
      Logger.debug('ListAdminComponent execute handleOnChange receive name', name)
      Logger.debug('ListAdminComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      switch (name) {
        case 'orderBy':
          data[name] = value
          break;
        case 'status':
          data[name] = value
          break;
        case 'searchValue':
          let temp = { ...data }
          delete temp['orderBy']
          delete temp['status']
          Object.keys(temp).forEach(key => {
            temp[key] = undefined
          })
          temp[ui.searchInput[ui.tab.current]] = value
          Object.keys(temp).forEach(
            key => {
              data[key] = temp[key]
            }
          )
          break;
      }
      Logger.debug('ListAdminComponent execute handleOnChange receive data', data)
    } catch (e) {
      Logger.error(`ListAdminComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearch(event, value) {
    try {
      Logger.info('ListAdminComponent execute handleOnChangeSearch')
      Logger.debug('ListAdminComponent execute handleOnChangeSearch receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      ui.searchInput[ui.tab.current] = value
      const now = new Date()
      if (value == 'createdAt') {
        this.handleOnChangeSearchValue('createdAt', now)
      } else {
        this.handleOnChangeSearchValue(value, "")
      }
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListAdminComponent handleOnChangeSearch ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info('ListAdminComponent execute handleOnChangeSearchValue')
      Logger.debug('ListAdminComponent execute handleOnChangeSearchValue receive value', value)
      const { ui } = this.state
      ui.searchValue[ui.tab.current] = !Helper.isEmpty(value) ? value : ""
      let temp = !Helper.isEmpty(value) ? value : null
      this.handleOnChange('searchValue', temp)
    } catch (e) {
      Logger.error(`ListAdminComponent handleOnChangeSearchValue ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeStatus(event, value) {
    try {
      Logger.info('ListAdminComponent execute handleOnChangeStatus')
      Logger.debug('ListAdminComponent execute handleOnChangeStatus receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleOnChange('status', value)
      ui.defaultStatus[ui.tab.current] = ui.listStatus.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListAdminComponent handleOnChangeStatus ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info('ListAdminComponent execute handleOnChangeOrderBy')
      Logger.debug('ListAdminComponent execute handleOnChangeOrderBy receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleOnChange('orderBy', value)
      ui.defaultOrderBy[ui.tab.current] = ui.listOrderBy.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListAdminComponent handleOnChangeOrderBy ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListAdminComponent execute handleSetData");
      Logger.debug("ListAdminComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list[ui.tab.current] = data.list;
      ui.total[ui.tab.current] = data.total;
      Logger.debug("ListAdminComponent execute handleSetData receive list", ui.list[ui.tab.current]);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListAdminComponent handleSetData ${e.toString()}`);
    }
  }

  handleGetListAdminSuccess(response) {
    try {
      Logger.info("ListAdminComponent execute handleGetListAdminSuccess");
      Logger.debug("ListAdminComponent execute handleGetListAdminSuccess receive response", response);
      const { ui, timeout } = this.state;
      this.handleSetData(response)
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListAdminComponent handleGetListAdminSuccess ${e.toString()}`);
    }
  }

  handleSubmitSearch(event) {
    try {
      Logger.info("ListAdminComponent execute handleSubmitSearch");
      if (event) {
        event.preventDefault()
      }
      const { ui, timeout, data } = this.state;
      ui.list[ui.tab.current] = null
      ui.resetPage = true
      Logger.debug('ListUserComponent execute handleSearchRequest receive', data)

      const searchRequest = this.handleSearchRequest()
      ui.dataTable[ui.tab.current] = ui.dataTable[ui.tab.current].setField(searchRequest.field)
        .setValue(searchRequest.value)
        .setOrderBy(data.orderBy)

      Logger.debug("ListAdminComponent execute handleSubmitSearch data", data);
      Logger.debug("ListAdminComponent execute handleSubmitSearch dataTable", ui.dataTable[ui.tab.current]);
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListAdminComponent handleSubmitSearch ${e.toString()}`);
    }
  }

  handleCreate(event) {
    try {
      Logger.info('ListAdminComponent execute handleCreate')
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.CREATE, { tab: ui.tab.current })
    } catch (e) {
      Logger.error(`ListAdminComponent handleCreate ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleRedirectDetail(item) {
    try {
      Logger.info('ListAdminComponent execute handleRedirectDetail')
      Logger.debug('ListAdminComponent execute handleRedirectDetail recieve item', item)
      const { ui } = this.state
      const user = AuthService.getPackageProfile()
      if (item.userId !== user.userId) {
        let route = RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.DETAIL
        const path = route.replace(':id', item.userId)
        item.tab = ui.tab.current
        this.handleRedirectWithState(path, item)
      }
    } catch (e) {
      Logger.error(`ListAdminComponent handleRedirectDetail ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleChangeTab(event, value) {
    try {
      Logger.info('ListAdminComponent execute handleChangeTab')
      Logger.debug('ListAdminComponent execute handleChangeTab recieve value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui, data } = this.state
      switch (value) {
        case `${ui.tab.active}`:
          ui.tab.current = ui.tab.active;
          break;
        case `${ui.tab.notActive}`:
          ui.tab.current = ui.tab.notActive;
          break;
      }
      let temp = { ...data }
      delete temp['orderBy']
      delete temp['status']
      Object.keys(temp).forEach(key => {
        temp[key] = undefined
        data[key] = undefined
      })
      ui.searchInput[ui.tab.current] = ui.listSearch[0].value
      ui.searchValue[ui.tab.current] = ''
      this.setState({ ui })
      this.handleSubmitSearch(event)
    } catch (e) {
      Logger.error(`ListAdminComponent handleChangeTab ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  };



  handleSearchRequest() {
    try {
      Logger.info('ListAdminComponent execute handleSearchRequest')
      const { ui, data } = this.state
      Logger.debug('ListAdminComponent execute handleSearchRequest receive', data)

      let temp = { ...data }
      delete temp['orderBy']
      let field = [], value = []
      Object.keys(temp).forEach(
        key => {
          if (!Helper.isEmpty(temp[key])) {
            field.push(key)
            value.push(temp[key])
          }
        }
      )
      if (ui.tab.current === ui.tab.notActive) {
        var index = field.indexOf('status');
        if (index !== -1) {
          field.splice(index, 1);
          value.splice(index, 1);
        }
      }
      return { field, value }
    } catch (e) {
      Logger.error(`ListAdminComponent handleSearchRequest ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  render() {
    const { ui, timeout } = this.state
    return (
      <View ui={ui} handleOnChangeTableValue={this.handleOnChangeTableValue}
        timeout={timeout} handleOnChangeSearch={this.handleOnChangeSearch}
        handleOnChangeStatus={this.handleOnChangeStatus} handleOnChangeOrderBy={this.handleOnChangeOrderBy}
        handleOnChangeSearchValue={this.handleOnChangeSearchValue}
        handleOnRef={this.handleOnRef} handleSetData={this.handleSetData}
        handleSubmitSearch={this.handleSubmitSearch} handleCreate={this.handleCreate}
        handleRedirectDetail={this.handleRedirectDetail} handleChangeTab={this.handleChangeTab} />
    )
  }
}

export default BaseComponent(ListAdminComponent)