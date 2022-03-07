import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import ModelTable from 'core/table/model'
import ChallengeEnum from 'service/enum/challenge'
import SearchEnum from 'service/enum/search'
import RouteEnum from 'service/enum/route'
import Localize from "service/localize";
import Helper from 'service/helper'
import { ModelView } from './model'
import HelperService from 'service/helper'
class ListMemberComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      ui: {
        listOrderBy: [{
          text: SearchEnum.FILTER_MEMBER_PARSE[SearchEnum.FILTER_MEMBER.DESC],
          value: SearchEnum.FILTER_MEMBER.DESC
        },
        {
          text: SearchEnum.FILTER_MEMBER_PARSE[SearchEnum.FILTER_MEMBER.ASC],
          value: SearchEnum.FILTER_MEMBER.ASC
        }
        ],
        defaultOrderBy: {},
        listSearch: [
          {
            text: Localize.getLocalize("LC_FULLNAME"),
            value: 'userInfo.fullName'
          },
          {
            text: Localize.getLocalize("LC_PHONE"),
            value: 'userInfo.phoneNumber'
          },
          {
            text: Localize.getLocalize("LC_EMAIL"),
            value: 'userInfo.email'
          },
          {
            text: Localize.getLocalize("LC_ID_ACCOUNT"),
            value: 'userInfo.userId'
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
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListMemberComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state

      ui.defaultOrderBy = ui.listOrderBy[0]
      ui.defaultSearch = ui.listSearch[0]
      ui.searchInput = ui.defaultSearch.value

      ui.dataTable = new ModelTable()
        .setWhat('userPromotion')
        .setOrder("point")
        .setBy("desc")
      data['search'] = "userInfo.fullName"
      data['filterValue'] = undefined
    }
    catch (e) {
      Logger.error(`ListMemberComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListMemberComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListMemberComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListMemberComponent execute handleRequest')
      const { ui, timeout } = this.state
      // const { getListAdmin } = this.props
      // const payload = ui.dataTable.setField(['status'])
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
      Logger.error(`ListMemberComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListMemberComponent execute handleOnChangeTableValue");
      Logger.debug("ListMemberComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state
      ui.list = null
      ui.resetPage = false
      ui.dataTable.limit = query.limit
      ui.dataTable.from = query.from
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListMemberComponent handleOnChangeTableValue ${e.toString()}`);
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
      Logger.error(`ListMemberComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('ListMemberComponent execute handleOnChange')
      Logger.debug('ListMemberComponent execute handleOnChange receive name', name)
      Logger.debug('ListMemberComponent execute handleOnChange receive value', value)
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
      Logger.error(`ListMemberComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearch(event, value) {
    try {
      Logger.info('ListMemberComponent execute handleOnChangeSearch')
      Logger.debug('ListMemberComponent execute handleOnChangeSearch receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      ui.searchInput = value
      this.handleOnChange('search', value)
      this.handleOnChangeSearchValue(value, "")  // set default

      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListMemberComponent handleOnChangeSearch ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info('ListMemberComponent execute handleOnChangeSearchValue')
      Logger.debug('ListMemberComponent execute handleOnChangeSearchValue receive value', value)
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
      Logger.error(`ListMemberComponent handleOnChangeSearchValue ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }


  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info('ListMemberComponent execute handleOnChangeOrderBy')
      Logger.debug('ListMemberComponent execute handleOnChangeOrderBy receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleOnChange('by', value)
      ui.defaultOrderBy = ui.listOrderBy.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListMemberComponent handleOnChangeOrderBy ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListMemberComponent execute handleSetData");
      Logger.debug("ListMemberComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;

      Logger.debug("ListMemberComponent execute handleSetData receive list", ui.list);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListMemberComponent handleSetData ${e.toString()}`);
    }
  }

  handleSubmitSearch(event) {
    try {
      Logger.info("ListMemberComponent execute handleSubmitSearch");
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
      Logger.debug("ListMemberComponent execute handleSubmitSearch data", data);
      Logger.debug("ListMemberComponent execute handleSubmitSearch dataTable", ui.dataTable);
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListMemberComponent handleSubmitSearch ${e.toString()}`);
    }
  }

  handleCreate(event) {
    try {
      Logger.info('ListMemberComponent execute handleCreate')
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_LOYALTY.REWARD.CREATE)
    } catch (e) {
      Logger.error(`ListMemberComponent handleCreate ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleRedirectDetail(item) {
    try {
      Logger.info('ListMemberComponent execute handleRedirectDetail')
      Logger.debug('ListMemberComponent execute handleRedirectDetail recieve item', item)
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_LOYALTY.MEMBER.DETAIL
      const path = route.replace(':id', item.userId)
      this.handleRedirectWithState(path, item)
    } catch (e) {
      Logger.error(`ListMemberComponent handleRedirectDetail ${e.toString()}`)
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

export default BaseComponent(ListMemberComponent)