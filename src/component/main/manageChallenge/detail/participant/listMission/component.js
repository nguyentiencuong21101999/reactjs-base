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
import HelperService from 'service/helper'
import DialogModel from 'component/layout/dialog/model'
import DialogEnum from 'service/enum/dialog'
import ChallengeEnum from 'service/enum/challenge'
import Localize from "service/localize";
class ListUserComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      ui: {
        resetPage: true,
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
            text: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS_PARSE[ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.ALL],
            value: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.ALL
          },
          {
            text: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS_PARSE[ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.UNDER_REVIEW],
            value: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.UNDER_REVIEW,
          },
          {
            text: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS_PARSE[ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.UNCOMPLETED],
            value: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.UNCOMPLETED
          },
          {
            text: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS_PARSE[ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.COMPLETED],
            value: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.COMPLETED,
          },

        ],
        defaultStatus: {},
        listSearch: [
          {
            text: Localize.getLocalize("LC_MISSION"),
            value: 'challengeMission.missionTitle'
          }
        ],
        defaultSearch: {},
        searchInput: null,
        searchValue: "",
        resetPage: false,

        list: null,
        total: 0,
        detailParticipant: null,
        dataTable: null,
        index: 0


      },
      func: {
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
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleSetData = this.handleSetData.bind(this)
    // this.handleOnCheck = this.handleOnCheck.bind(this)
    this.handleUpdateMissionResult = this.handleUpdateMissionResult.bind(this)
    this.handleUpdateUserChallengeMissionSuccess = this.handleUpdateUserChallengeMissionSuccess.bind(this)
    this.handleOnChangeOrderBy = this.handleOnChangeOrderBy.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnChangeStatus = this.handleOnChangeStatus.bind(this)
    this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this)
    this.handleOnChangeSearchValue = this.handleOnChangeSearchValue.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
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
      Logger.info('ListUserComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props
      ui.detailParticipant = { ...location.state }
      ui.dataTable = new ModelTable()
        .setWhat('challengeMission')
        .setOrder("challengeId")
        .setBy("asc")
      ui.dataTable.challengeId = ui.detailParticipant.challengeId
      ui.dataTable.userId = ui.detailParticipant.userId

      ui.defaultOrderBy = ui.listOrderBy[0]
      ui.defaultStatus = ui.listStatus[0]
      ui.defaultSearch = ui.listSearch[0]
      ui.searchInput = ui.defaultSearch.value

      data['search'] = "challengeMission.missionTitle"
      data['filterValue'] = undefined

    }
    catch (e) {
      Logger.error(`ListUserComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListUserComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListUserComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListUserComponent execute handleRequest')
      const { ui, timeout } = this.state
      // const { getList } = this.props
      // const payload = ui.dataTable[ui.tab.current].setField(['status'])
      //                     .setValue(['null'])
      //                     .setOrderBy("desc")
      // getList(timeout.key, payload)
    } catch (e) {
      Logger.error(`ListUserComponent handleRequest ${e.toString()}`)
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
      Logger.error(`ListUserComponent handleOnRef ${e.toString()}`)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListUserComponent execute handleSetData");
      Logger.debug("ListUserComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;
      //Logger.debug("ListUserComponent execute handleSetData receive list", ui.list[ui.tab.current]);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListUserComponent handleSetData ${e.toString()}`);
    }
  }



  // handleOnCheck(valid, row) {
  //   try {
  //     Logger.info('ListUserComponent execute handleOnCheck')
  //     Logger.debug('ListUserComponent execute handleOnCheck receive', value)
  //     const { ui, timeout } = this.state

  //   } catch (e) {
  //     Logger.error(`ListUserComponent handleOnCheck ${e.toString()}`)
  //     this.state.timeout.setTimeout(false)
  //   }
  // }
  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListPostComponent execute handleOnChangeTableValue");
      Logger.debug("ListPostComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state
      ui.list = null
      ui.dataTable.limit = query.limit
      ui.dataTable.from = query.from
      ui.resetPage = false
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListPostComponent handleOnChangeTableValue ${e.toString()}`);
    }
  }
  handleUpdateMissionResult(index, row) {
    try {

      Logger.info('ListUserComponent execute HandleUpdateMissionResult')
      const { updateModal, handleUpdateChallengeMissionSuccess } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.UPDATE_USER_CHALLENGE_MISSION)
      dialog.setContent({ challengeId: row.challengeId, missionId: row.missionId, userId: row.userId })
      dialog.setHandleConfirm((status, response) => {
        this.handleUpdateUserChallengeMissionSuccess(index, status)
        handleUpdateChallengeMissionSuccess(response.result)
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`ListUserComponent handleOnCheck ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleUpdateUserChallengeMissionSuccess(index, status) {
    try {
      Logger.info('ListUserComponent execute handleCloseUpdateChallengePostResult')
      const { ui } = this.state
      ui.list[index].status = status
      this.setState({ ui });
    } catch (e) {
      Logger.error(`ListUserComponent handleCloseUpdateChallengePostResult ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleOnChange(name, value) {
    try {
      Logger.info('listParticipantComponent execute handleOnChange')
      Logger.debug('listParticipantComponent execute handleOnChange receive name', name)
      Logger.debug('listParticipantComponent execute handleOnChange receive value', value)
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
      Logger.error(`listParticipantComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeOrderBy(event, value) {
    try {
      Logger.info('listParticipantComponent execute handleOnChangeOrderBy')
      Logger.debug('listParticipantComponent execute handleOnChangeOrderBy receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleOnChange('by', value)
      ui.defaultOrderBy = ui.listOrderBy.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`listParticipantComponent handleOnChangeOrderBy ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeStatus(event, value) {
    try {
      Logger.info('listParticipantComponent execute handleOnChangeStatus')
      Logger.debug('listParticipantComponent execute handleOnChangeStatus receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      if (value === ChallengeEnum.USER_CHALLENGE_STATUS.ALL) {
        this.handleOnChange('filter', undefined)
        this.handleOnChange('filterValue', undefined)
      } else {
        this.handleOnChange('filter', 'userChallengeMission.status')
        this.handleOnChange('filterValue', value)
      }

      ui.defaultStatus = ui.listStatus.find(item => item.value === value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`listParticipantComponent handleOnChangeStatus ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeSearch(event, value) {
    try {
      Logger.info('listParticipantComponent execute handleOnChangeSearch')
      Logger.debug('listParticipantComponent execute handleOnChangeSearch receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      ui.searchInput = value
      this.handleOnChange('search', value)
      this.handleOnChangeSearchValue(value, "")  // set default

      this.setState({ ui })
    } catch (e) {
      Logger.error(`listParticipantComponent handleOnChangeSearch ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeSearchValue(name, value) {
    try {
      Logger.info('listParticipantComponent execute handleOnChangeSearchValue')
      Logger.debug('listParticipantComponent execute handleOnChangeSearchValue receive value', value)
      // if(event){
      //   event.preventDefault()
      // }
      const { ui, data } = this.state
      ui.searchValue = !Helper.isEmpty(value) ? value : ""
      let temp = !Helper.isEmpty(value) ? value : undefined
      this.handleOnChange('searchValue', temp)
    } catch (e) {
      Logger.error(`listParticipantComponent handleOnChangeSearchValue ${e.toString()}`)
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
        // handleOnCheck={this.handleOnCheck}
        handleOnChangeTableValue={this.handleOnChangeTableValue}
        handleUpdateMissionResult={this.handleUpdateMissionResult}
        handleOnChangeOrderBy={this.handleOnChangeOrderBy}
        handleOnChangeStatus={this.handleOnChangeStatus}
        handleOnChangeSearch={this.handleOnChangeSearch}
        handleOnChangeSearchValue={this.handleOnChangeSearchValue}
        handleSubmitSearch={this.handleSubmitSearch}

      />
    )
  }
}

export default BaseComponent(ListUserComponent)