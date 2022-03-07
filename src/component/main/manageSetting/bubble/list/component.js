import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import ModelTable from 'core/table/model'
import ChallengeEnum from 'service/enum/challenge'
import SearchEnum from 'service/enum/search'

import DialogModel from 'component/layout/dialog/model'
import DialogEnum from 'service/enum/dialog'
import RouteEnum from 'service/enum/route'
import Helper from 'service/helper'
import { ModelView } from './model'
import HelperService from 'service/helper'
import Localize from 'service/localize'

class ListBubbleComponent extends Component {
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
            text: Localize.getLocalize("LC_CONTENT"),
            value: 'bubble.content'
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


    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleSetData = this.handleSetData.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleRedirectDetail = this.handleRedirectDetail.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleOnChangeTableValue = this.handleOnChangeTableValue.bind(this)
    this.handleOnChangeOrderBy = this.handleOnChangeOrderBy.bind(this)
    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this)
    this.handleOnChangeSearchValue = this.handleOnChangeSearchValue.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListBubbleComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state

      ui.defaultOrderBy = ui.listOrderBy[0]
      ui.defaultSearch = ui.listSearch[0]
      ui.searchInput = ui.defaultSearch.value

      ui.dataTable = new ModelTable()
        .setWhat("bubble")
        .setOrder("createdAt")
        .setBy("desc")
      data['search'] = "bubble.content"
      data['filterValue'] = undefined
    }
    catch (e) {
      Logger.error(`ListBubbleComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListBubbleComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListBubbleComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListBubbleComponent execute handleRequest')
      const { ui, timeout } = this.state

    } catch (e) {
      Logger.error(`ListBubbleComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
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
      Logger.error(`ListBubbleComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('ListBubbleComponent execute handleOnChange')
      Logger.debug('ListBubbleComponent execute handleOnChange receive name', name)
      Logger.debug('ListBubbleComponent execute handleOnChange receive value', value)
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
      Logger.error(`ListBubbleComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListBubbleComponent execute handleSetData");
      Logger.debug("ListBubbleComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;
      Logger.debug("ListBubbleComponent execute handleSetData receive list", ui.list);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListBubbleComponent handleSetData ${e.toString()}`);
    }
  }


  handleRedirectDetail(item) {
    try {
      Logger.info('ListBubbleComponent execute handleRedirectDetail')
      Logger.debug('ListBubbleComponent execute handleRedirectDetail recieve item', item)
      const { ui } = this.state
      // let route = RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL
      // const path = route.replace(':id', item.challengeId)
      // this.handleRedirectWithState(path, item)
    } catch (e) {
      Logger.error(`ListBubbleComponent handleRedirectDetail ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListBubbleComponent execute handleOnChangeTableValue");
      Logger.debug("ListBubbleComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state
      ui.list = null
      ui.resetPage = false
      ui.dataTable.limit = query.limit
      ui.dataTable.from = query.from
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListBubbleComponent handleOnChangeTableValue ${e.toString()}`);
    }
  }
  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info('ListBubbleComponent execute handleOnChangeOrderBy')
      Logger.debug('ListBubbleComponent execute handleOnChangeOrderBy receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleOnChange('by', value)
      ui.defaultOrderBy = ui.listOrderBy.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListBubbleComponent handleOnChangeOrderBy ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeSearch(event, value) {
    try {
      Logger.info('ListBubbleComponent execute handleOnChangeSearch')
      Logger.debug('ListBubbleComponent execute handleOnChangeSearch receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      ui.searchInput = value
      this.handleOnChange('search', value)
      this.handleOnChangeSearchValue(value, "")  // set default

      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListBubbleComponent handleOnChangeSearch ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info('ListBubbleComponent execute handleOnChangeSearchValue')
      Logger.debug('ListBubbleComponent execute handleOnChangeSearchValue receive value', value)
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
      Logger.error(`ListBubbleComponent handleOnChangeSearchValue ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleSubmitSearch(event) {
    try {
      Logger.info("ListBubbleComponent execute handleSubmitSearch");
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
      Logger.debug("ListBubbleComponent execute handleSubmitSearch data", data);
      Logger.debug("ListBubbleComponent execute handleSubmitSearch dataTable", ui.dataTable);
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListBubbleComponent handleSubmitSearch ${e.toString()}`);
    }
  }
  handleCreate(event) {
    try {
      Logger.info('ListBubbleComponent execute handleCreate')
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_SETTING.BUBBLE.CREATE)
    } catch (e) {
      Logger.error(`ListBubbleComponent handleCreate ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleEdit(item, index) {
    try {
      Logger.info('ListBubbleComponent execute handleEdit')
      const { ui } = this.state
      const route = RouteEnum.PAGE.MANAGE_SETTING.BUBBLE.EDIT
      const path = route.replace(':id', item.bubbleId)
      this.handleRedirectWithState(path, item)
    } catch (e) {
      Logger.error(`ListBubbleComponent handleEdit ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  render() {
    const { ui, timeout } = this.state
    return (
      <View ui={ui}
        timeout={timeout}
        handleOnRef={this.handleOnRef} handleSetData={this.handleSetData}
        handleCreate={this.handleCreate}
        handleRedirectDetail={this.handleRedirectDetail}
        handleEdit={this.handleEdit}
        handleOnChangeTableValue={this.handleOnChangeTableValue}
        handleOnChangeOrderBy={this.handleOnChangeOrderBy}
        handleOnChangeSearch={this.handleOnChangeSearch}
        handleOnChangeSearchValue={this.handleOnChangeSearchValue}
        handleSubmitSearch={this.handleSubmitSearch}
      />
    )
  }
}

export default BaseComponent(ListBubbleComponent)