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
class ListTargetComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      ui: {
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
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleSetData = this.handleSetData.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListTargetComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props
      const { menuSettingId } = this.props.ui.detailMenuSetting;
      ui.dataTable = new ModelTable()
        .setOrder("modifiedAt")
        .setBy("desc")
        .setFrom(0)
        .setLimit(0)
        .setBy("desc")
      ui.dataTable.menuSettingId = menuSettingId;
    }
    catch (e) {
      Logger.error(`ListTargetComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListTargetComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListTargetComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListTargetComponent execute handleRequest')
      const { ui, timeout } = this.state
    } catch (e) {
      Logger.error(`ListTargetComponent handleRequest ${e.toString()}`)
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
      Logger.error(`ListTargetComponent handleOnRef ${e.toString()}`)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListTargetComponent execute handleSetData");
      Logger.debug("ListTargetComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;

      //Logger.debug("ListTargetComponent execute handleSetData receive list", ui.list[ui.tab.current]);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListTargetComponent handleSetData ${e.toString()}`);
    }
  }

  handleCreate() {
    try {
      Logger.info("ListTargetComponent execute handleCreate");
      let route = RouteEnum.PAGE.MANAGE_MENU.SETTING.CREATE_TARGET
      const path = route.replace(':id', this.props.ui.detailMenuSetting.menuSettingId)
      const item = this.props.ui.detailMenuSetting
      item.tab = this.props.ui.tab.current
      this.handleRedirectWithState(path, item)
    } catch (e) {
      Logger.error(`ListTargetComponent handleCreate ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleEdit(item) {
    try {
      Logger.info("ListTargetComponent execute handleCreate");
      let route = RouteEnum.PAGE.MANAGE_MENU.SETTING.EDIT_TARGET
      item.menuSettingId = this.props.ui.detailMenuSetting.menuSettingId
      const path = route.replace(':id', this.props.ui.detailMenuSetting.menuSettingId)
      item.tab = this.props.ui.tab.current
      this.handleRedirectWithState(path, item)
    } catch (e) {
      Logger.error(`ListTargetComponent handleCreate ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  render() {
    const { ui, timeout } = this.state
    return (
      <View ui={ui}
        timeout={timeout}
        handleOnRef={this.handleOnRef} handleSetData={this.handleSetData}
        handleCreate={this.handleCreate}
        handleEdit={this.handleEdit}
      />
    )
  }
}

export default BaseComponent(ListTargetComponent)