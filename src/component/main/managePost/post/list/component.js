import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import ModelTable from 'core/table/model'
import PostEnum from 'service/enum/post'
import SearchEnum from 'service/enum/search'
import RouteEnum from 'service/enum/route'

import Helper from 'service/helper'
import { ModelView } from './model'
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
        listStatus: {},
        defaultStatus: {},
        listSearch: {},
        defaultSearch: {},
        dataTable: {},
        searchInput: {},
        list: {},
        searchValue: {},

        tab: {
          current: 2,
          user: 1,
          admin: 2,
        },
        total: {},
        dateFilter: null
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
      const { state } = this.props.location
      ui.tab.current = Helper.isExistedTab(state, ui.tab.current)

      ui.defaultOrderBy = {
        [ui.tab.user]: {},
        [ui.tab.admin]: {},
      }
      ui.listStatus = {
        [ui.tab.user]: [
          {
            text: PostEnum.SOCIAL_POST_STATUS_PARSE[PostEnum.SOCIAL_POST_STATUS.ALL],
            value: PostEnum.SOCIAL_POST_STATUS.ALL
          },
          {
            text: PostEnum.SOCIAL_POST_STATUS_PARSE[PostEnum.SOCIAL_POST_STATUS.CREATED_BY_USER],
            value: PostEnum.SOCIAL_POST_STATUS.CREATED_BY_USER,
          },
          {
            text: PostEnum.SOCIAL_POST_STATUS_PARSE[PostEnum.SOCIAL_POST_STATUS.DELETED_BY_USER],
            value: PostEnum.SOCIAL_POST_STATUS.DELETED_BY_USER,
          },
          {
            text: PostEnum.SOCIAL_POST_STATUS_PARSE[PostEnum.SOCIAL_POST_STATUS.DELETED_BY_ADMIN],
            value: PostEnum.SOCIAL_POST_STATUS.DELETED_BY_ADMIN,
          },
        ],
        [ui.tab.admin]: [
          {
            text: PostEnum.SOCIAL_POST_STATUS_PARSE[PostEnum.SOCIAL_POST_STATUS.ALL],
            value: PostEnum.SOCIAL_POST_STATUS.ALL
          },
          {
            text: PostEnum.SOCIAL_POST_STATUS_PARSE[PostEnum.SOCIAL_POST_STATUS.CREATED_BY_ADMIN],
            value: PostEnum.SOCIAL_POST_STATUS.CREATED_BY_ADMIN,
          },
          {
            text: PostEnum.SOCIAL_POST_STATUS_PARSE[PostEnum.SOCIAL_POST_STATUS.UPDATED_BY_ADMIN],
            value: PostEnum.SOCIAL_POST_STATUS.UPDATED_BY_ADMIN,
          },
          {
            text: PostEnum.SOCIAL_POST_STATUS_PARSE[PostEnum.SOCIAL_POST_STATUS.ACCEPTED_BY_ADMIN],
            value: PostEnum.SOCIAL_POST_STATUS.ACCEPTED_BY_ADMIN,
          }
        ],
      }
      ui.defaultStatus = {
        [ui.tab.user]: {},
        [ui.tab.admin]: {},
      }
      ui.listSearch = {
        [ui.tab.user]: [
          {
            text: Localize.getLocalize("LC_CONTENT"),
            value: 'title'
          },
          {
            text: Localize.getLocalize("LC_TIME"),
            value: 'createdAt'
          }
        ],
        [ui.tab.admin]: [
          {
            text: Localize.getLocalize("LC_TITLE"),
            value: 'title'
          },
          {
            text: Localize.getLocalize("LC_TIME"),
            value: 'createdAt'
          }
        ],
      }
      ui.defaultSearch = {
        [ui.tab.user]: {},
        [ui.tab.admin]: {},
      }
      ui.dataTable = {
        [ui.tab.user]: null,
        [ui.tab.admin]: null,
      }
      ui.searchInput = {
        [ui.tab.user]: null,
        [ui.tab.admin]: null,
      }
      ui.list = {
        [ui.tab.user]: null,
        [ui.tab.admin]: null,
      }
      ui.searchValue = {
        [ui.tab.user]: "",
        [ui.tab.admin]: "",
      }
      ui.total = {
        [ui.tab.user]: 0,
        [ui.tab.admin]: 0,
      }

      Object.keys(ui.defaultOrderBy).forEach(key => {
        ui.defaultOrderBy[key] = ui.listOrderBy[0]
      })
      Object.keys(ui.defaultStatus).forEach(key => {
        ui.defaultStatus[key] = ui.listStatus[key][0]
      })
      Object.keys(ui.defaultSearch).forEach(key => {
        ui.defaultSearch[key] = ui.listSearch[key][0]
      })
      Object.keys(ui.searchInput).forEach(key => {
        ui.searchInput[key] = ui.defaultSearch[key].value
      })

      Object.keys(ui.dataTable).forEach(key => {
        ui.dataTable[key] = new ModelTable()
          .setOrderBy("desc")
      })
      ui.dataTable[ui.tab.admin] = ui.dataTable[ui.tab.admin].setField(["status"])
      ui.dataTable[ui.tab.admin] = ui.dataTable[ui.tab.admin].setValue([PostEnum.SOCIAL_POST_STATUS.ALL])
      //user filter => set field and value for user
      ui.dataTable[ui.tab.user] = ui.dataTable[ui.tab.user].setField(["status"])
      ui.dataTable[ui.tab.user] = ui.dataTable[ui.tab.user].setValue([PostEnum.SOCIAL_POST_STATUS.ALL])
      data['status'] = PostEnum.SOCIAL_POST_STATUS.ALL
      data['audience'] = PostEnum.SOCIAL_POST_SELECT_AUDIENCE.ALL
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
      // const { getListAdmin } = this.props
      // const payload = ui.dataTable[ui.tab.current].setField(['status'])
      //                     .setValue(['null'])
      //                     .setOrderBy("desc")
      // switch(ui.tab.current){
      //   case `${ui.tab.user}`:              
      //       getListUser(timeout.key, payload)
      //     break;
      //   case `${ui.tab.admin}`:        
      //       getListAdmin(timeout.key, payload)
      //     break;
      // }
    } catch (e) {
      Logger.error(`ListPostComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListPostComponent execute handleOnChangeTableValue");
      Logger.debug("ListPostComponent execute handleOnChangeTableValue receive query", query);
      const { ui, data } = this.state
      ui.list[ui.tab.current] = null
      ui.resetPage = false
      const searchRequest = this.handleSearchRequest()
      ui.dataTable[ui.tab.current] = query.setField(searchRequest.field)
        .setValue(searchRequest.value)
        .setOrderBy("desc")
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
        case 'orderBy':
          data[name] = value
          break;
        case 'status':
        case 'audience':
          data[name] = value
          break;
        case 'searchValue':
          let temp = { ...data }
          delete temp['orderBy']
          delete temp['audience']
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
      ui.searchInput[ui.tab.current] = value
      this.handleOnChangeSearchValue(value, '')
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
      const { ui } = this.state
      ui.searchValue[ui.tab.current] = !Helper.isEmpty(value) ? value : ""
      let temp = !Helper.isEmpty(value) ? value : undefined
      if (name === 'createdAt') {
        ui.dateFilter = temp
      }
      this.handleOnChange('searchValue', temp)
    } catch (e) {
      Logger.error(`ListPostComponent handleOnChangeSearchValue ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
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
      switch (ui.tab.current) {
        case ui.tab.user:
          this.handleOnChange('status', value)
          break;
        case ui.tab.admin:
          this.handleOnChange('status', value)
          break;
      }
      ui.defaultStatus[ui.tab.current] = ui.listStatus[ui.tab.current].find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListPostComponent handleOnChangeStatus ${e.toString()}`)
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
      this.handleOnChange('orderBy', value)
      ui.defaultOrderBy[ui.tab.current] = ui.listOrderBy.find(item => item.value === value)
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
      ui.list[ui.tab.current] = data.list;
      ui.total[ui.tab.current] = data.total;
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
      ui.list[ui.tab.current] = null
      ui.resetPage = true

      const searchRequest = this.handleSearchRequest()
      ui.dataTable[ui.tab.current] = ui.dataTable[ui.tab.current].setField(searchRequest.field)
        .setValue(searchRequest.value)
        .setOrderBy(data.orderBy)
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
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_POST.POST.CREATE, { tab: ui.tab.current })
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
      let route = RouteEnum.PAGE.MANAGE_POST.POST.DETAIL
      const path = route.replace(':id', item.postId)
      item.tab = ui.tab.current
      this.handleRedirectWithState(path, item)
    } catch (e) {
      Logger.error(`ListPostComponent handleRedirectDetail ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleChangeTab(event, value) {
    try {
      Logger.info('ListPostComponent execute handleChangeTab')
      Logger.debug('ListPostComponent execute handleChangeTab recieve value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui, data } = this.state
      switch (value) {
        case `${ui.tab.user}`:
          ui.tab.current = ui.tab.user;
          break;
        case `${ui.tab.admin}`:
          ui.tab.current = ui.tab.admin;
          break;
      }
      let temp = { ...data }
      delete temp['orderBy']
      delete temp['audience']
      delete temp['status']
      Object.keys(temp).forEach(key => {
        data[key] = undefined
      })
      ui.searchInput[ui.tab.current] = ui.listSearch[ui.tab.current][0].value
      ui.searchValue[ui.tab.current] = ''
      this.setState({ ui })
      this.handleSubmitSearch(event)
    } catch (e) {
      Logger.error(`ListPostComponent handleChangeTab ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  };


  handleSearchRequest() {
    try {
      Logger.info('ListPostComponent execute handleSearchRequest')
      const { ui, data } = this.state
      Logger.debug('ListPostComponent execute handleSearchRequest receive', data)

      let temp = { ...data }
      delete temp['orderBy']
      let field = [], value = []
      Object.keys(temp).forEach(
        key => {
          switch (ui.tab.current) {
            case ui.tab.user:
              if (key !== 'audience') {
                if (!Helper.isEmpty(temp[key])) {
                  value.push(temp[key])
                  field.push(key)
                }
              }
              break;
            case ui.tab.admin:
              if (key !== 'audience') {
                if (!Helper.isEmpty(temp[key])) {
                  value.push(temp[key])
                  field.push(key)
                }
              }
              break;
            default:
              break;
          }

        }
      )
      return { field, value }
    } catch (e) {
      Logger.error(`ListPostComponent handleSearchRequest ${e.toString()}`)
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

export default BaseComponent(ListPostComponent)