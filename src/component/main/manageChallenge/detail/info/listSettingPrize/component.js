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
class ListSettingPrizeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      ui: {
        list: null,
        total: null,
        detailChallenge: null
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
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleSetData = this.handleSetData.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListSettingPrizeComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props
      ui.detailChallenge = this.props.ui.detailChallenge
      ui.dataTable = new ModelTable()
      ui.dataTable.challengeId = ui.detailChallenge.challengeId

    }
    catch (e) {
      Logger.error(`ListSettingPrizeComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListSettingPrizeComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListSettingPrizeComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListSettingPrizeComponent execute handleRequest')
      const { ui, timeout } = this.state
    } catch (e) {
      Logger.error(`ListSettingPrizeComponent handleRequest ${e.toString()}`)
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
      Logger.error(`ListSettingPrizeComponent handleOnRef ${e.toString()}`)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListSettingPrizeComponent execute handleSetData");
      Logger.debug("ListSettingPrizeComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data;
      //Logger.debug("ListSettingPrizeComponent execute handleSetData receive list", ui.list[ui.tab.current]);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListSettingPrizeComponent handleSetData ${e.toString()}`);
    }
  }

  handleEdit(row) {
    try {
      Logger.info('InfoAdminComponent execute handleEdit')
      const { ui, timeout } = this.state
      const route = RouteEnum.PAGE.MANAGE_CHALLENGE.EDIT_SETTING_PRIZE
      const path = route.replace(':id', ui.detailChallenge.challengeId)
      this.handleRedirectWithState(path, { ...row, tab: this.props.ui.tab.current })
    } catch (e) {
      Logger.error(`InfoAdminComponent handleEdit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  render() {
    const { ui, timeout } = this.state
    return (
      <View ui={ui}
        timeout={timeout}
        handleOnRef={this.handleOnRef} handleSetData={this.handleSetData}
        handleEdit={this.handleEdit}
      />
    )
  }
}

export default BaseComponent(ListSettingPrizeComponent)