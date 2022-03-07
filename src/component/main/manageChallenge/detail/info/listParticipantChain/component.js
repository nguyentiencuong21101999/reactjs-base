import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import ModelTable from 'core/table/model'
import UserEnum from 'service/enum/user'
import SearchEnum from 'service/enum/search'
import RouteEnum from 'service/enum/route'

import Helper from 'service/helper'
import { ModelView } from './model'
import ChallengeEnum from 'service/enum/challenge'
import HelperService from 'service/helper'
import Localize from "service/localize";
class listParticipantChainComponent extends Component {
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
        }],
        defaultOrderBy: {},
        listStatus: [
          {
            text: ChallengeEnum.USER_CHALLENGE_STATUS_PARSE[ChallengeEnum.USER_CHALLENGE_STATUS.ALL],
            value: ChallengeEnum.USER_CHALLENGE_STATUS.ALL
          },
          {
            text: ChallengeEnum.USER_CHALLENGE_STATUS_PARSE[ChallengeEnum.USER_CHALLENGE_STATUS.JOINED],
            value: ChallengeEnum.USER_CHALLENGE_STATUS.JOINED,
          },
          {
            text: ChallengeEnum.USER_CHALLENGE_STATUS_PARSE[ChallengeEnum.USER_CHALLENGE_STATUS.UNDER_REVIEW],
            value: ChallengeEnum.USER_CHALLENGE_STATUS.UNDER_REVIEW,
          }
        ],
        defaultStatus: {},
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
        searchInput: null,
        searchValue: "",
        resetPage: true,


        detailChallenge: null,
        dataTable: null,
        list: null,
        total: null
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
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleSetData = this.handleSetData.bind(this)
    this.handleRedirectDetail = this.handleRedirectDetail.bind(this)
    this.handleOnChangeOrderBy = this.handleOnChangeOrderBy.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnChangeStatus = this.handleOnChangeStatus.bind(this)
    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this)
    this.handleOnChangeSearchValue = this.handleOnChangeSearchValue.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('listParticipantChainComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props
      ui.detailChallenge = { ...location.state }
      ui.dataTable = new ModelTable()
        .setWhat('challenge')
        .setOrder("joinedAt")
        .setBy("desc")
      ui.dataTable.challengeId = ui.detailChallenge.challengeId
      //default orderBy
      ui.defaultOrderBy = ui.listOrderBy[0]
      ui.defaultStatus = ui.listStatus[0]
      ui.defaultSearch = ui.listSearch[0]
      ui.searchInput = ui.defaultSearch.value

      data['search'] = "userInfo.fullName"
      data['filterValue'] = undefined
    }
    catch (e) {
      Logger.error(`listParticipantChainComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('listParticipantChainComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`listParticipantChainComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('listParticipantChainComponent execute handleRequest')
      const { ui, timeout } = this.state
    } catch (e) {
      Logger.error(`listParticipantChainComponent handleRequest ${e.toString()}`)
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
      Logger.error(`listParticipantChainComponent handleOnRef ${e.toString()}`)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("listParticipantChainComponent execute handleSetData");
      Logger.debug("listParticipantChainComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;

      //Logger.debug("listParticipantChainComponent execute handleSetData receive list", ui.list[ui.tab.current]);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`listParticipantChainComponent handleSetData ${e.toString()}`);
    }
  }
  handleOnChangeTableValue(query) {
    try {
      Logger.info("listParticipantChainComponent execute handleOnChangeTableValue");
      Logger.debug("listParticipantChainComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state
      ui.resetPage = false;
      ui.list = null
      ui.dataTable.limit = query.limit
      ui.dataTable.from = query.from
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`listParticipantChainComponent handleOnChangeTableValue ${e.toString()}`);
    }
  }
  handleRedirectDetail(item) {
    try {
      Logger.info('listParticipantChainComponent execute handleRedirectDetail')
      Logger.debug('listParticipantChainComponent execute handleRedirectDetail recieve item', item)
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.PARTICIPANT
      const path = route.replace(':id', item.userId)
      const detailParticipant = { ...item }
      detailParticipant.challengeId = ui.detailChallenge.challengeId
      detailParticipant.challengeType = this.props.ui.detailChallenge.challengeType
      detailParticipant.tab = this.props.ui.tab.current
      this.handleRedirectWithState(path, detailParticipant)
    } catch (e) {
      Logger.error(`listParticipantChainComponent handleRedirectDetail ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }


  handleOnChange(name, value) {
    try {
      Logger.info('listParticipantChainComponent execute handleOnChange')
      Logger.debug('listParticipantChainComponent execute handleOnChange receive name', name)
      Logger.debug('listParticipantChainComponent execute handleOnChange receive value', value)
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
      Logger.error(`listParticipantChainComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info('listParticipantChainComponent execute handleOnChangeOrderBy')
      Logger.debug('listParticipantChainComponent execute handleOnChangeOrderBy receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleOnChange('by', value)
      ui.defaultOrderBy = ui.listOrderBy.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`listParticipantChainComponent handleOnChangeOrderBy ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeStatus(event, value) {
    try {
      Logger.info('listParticipantChainComponent execute handleOnChangeStatus')
      Logger.debug('listParticipantChainComponent execute handleOnChangeStatus receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      if (value === ChallengeEnum.USER_CHALLENGE_STATUS.ALL) {
        this.handleOnChange('filter', undefined)
        this.handleOnChange('filterValue', undefined)
      } else {
        this.handleOnChange('filter', 'userChallenge.status')
        this.handleOnChange('filterValue', value)
      }

      ui.defaultStatus = ui.listStatus.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`listParticipantChainComponent handleOnChangeStatus ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeSearch(event, value) {
    try {
      Logger.info('listParticipantChainComponent execute handleOnChangeSearch')
      Logger.debug('listParticipantChainComponent execute handleOnChangeSearch receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      ui.searchInput = value
      this.handleOnChange('search', value)
      this.handleOnChangeSearchValue(value, "")  // set default

      this.setState({ ui })
    } catch (e) {
      Logger.error(`listParticipantChainComponent handleOnChangeSearch ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info('listParticipantChainComponent execute handleOnChangeSearchValue')
      Logger.debug('listParticipantChainComponent execute handleOnChangeSearchValue receive value', value)
      // if(event){
      //   event.preventDefault()
      // }
      const { ui, data } = this.state
      ui.searchValue = !Helper.isEmpty(value) ? value : ""
      let temp = !Helper.isEmpty(value) ? value : undefined
      this.handleOnChange('searchValue', temp)
    } catch (e) {
      Logger.error(`listParticipantChainComponent handleOnChangeSearchValue ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
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

  render() {
    const { ui, timeout } = this.state
    return (
      <View ui={ui}
        timeout={timeout}
        handleOnRef={this.handleOnRef} handleSetData={this.handleSetData}
        handleRedirectDetail={this.handleRedirectDetail}
        handleOnChangeTableValue={this.handleOnChangeTableValue}
        handleOnChangeOrderBy={this.handleOnChangeOrderBy}
        handleOnChangeStatus={this.handleOnChangeStatus}
        handleOnChangeSearch={this.handleOnChangeSearch}
        handleOnChangeSearchValue={this.handleOnChangeSearchValue}
        handleSubmitSearch={this.handleSubmitSearch}
      />
    )
  }
}

export default BaseComponent(listParticipantChainComponent)