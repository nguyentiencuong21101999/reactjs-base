import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'

import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import RouteEnum from 'service/enum/route'
import Localize from 'service/localize'
import View from './view'
import { ModelView, ModelRequest } from './model'
import Helper from 'service/helper'
class InfoSettingComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleGetDetailMenuSettingSuccess: this.handleGetDetailMenuSettingSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this)
      },
      ui: {
        postId: {},
        detailMenuSetting: null,
        tab: {
          current: 1,
          settingMenu: 1,
          settingTarget: 2,

        }
      },
      req: {

      },


    }
    this.handleOnBack = this.handleOnBack.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)
  }
  handleSystemError() {
    try {
      Logger.info("InfoFoodComponent execute handleSystemError");
      const { ui, timeout } = this.state;
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`InfoFoodComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleGetDetailMenuSettingSuccess(response) {
    try {
      Logger.info('InfoSettingComponent execute handleGetDetailMenuSettingSuccess')
      const { ui } = this.state
      this.state.timeout.setTimeout(false)
      ui.detailMenuSetting = response
      this.setState({ ui });
    } catch (e) {
      Logger.error(`InfoSettingComponent handleGetDetailMenuSettingSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info('InfoSettingComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props
      const { state } = this.props.location
      ui.tab.current = Helper.isExistedTab(state, ui.tab.current)

      const detailMenuSetting = { ...location.state }
      data['menuSettingId'] = detailMenuSetting.menuSettingId
    }
    catch (e) {
      Logger.error(`InfoSettingComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('InfoSettingComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`InfoSettingComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('InfoSettingComponent execute handleRequest')
      const { ui, timeout, data } = this.state
      const { getDetailMenuSetting } = this.props
      getDetailMenuSetting(timeout.key, data['menuSettingId'])

    } catch (e) {
      Logger.error(`InfoSettingComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }


  handleOnBack() {
    try {
      Logger.info('InfoSettingComponent execute handleOnBack')
      let path = RouteEnum.PAGE.MANAGE_MENU.SETTING._
      this.handleRedirectWithState(path)
    } catch (e) {
      Logger.error(`InfoSettingComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleEdit() {
    try {
      Logger.info('InfoSettingComponent execute handleEdit')
      const { ui, timeout } = this.state
      const { updateModal } = this.props
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.UPDATE_SETTING_MENU);
      dialog.setContent(ui.detailMenuSetting)
      dialog.setHandleConfirm((response) => {
        ui.detailMenuSetting = response
        this.setState({ ui })
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`InfoSettingComponent handleEdit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }


  handleChangeTab(event, value) {
    try {
      Logger.info('InfoSettingComponent execute handleChangeTab')
      Logger.debug('InfoSettingComponent execute handleChangeTab recieve value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui, data } = this.state
      switch (value) {
        case `${ui.tab.settingMenu}`:
          ui.tab.current = ui.tab.settingMenu;
          break;
        case `${ui.tab.settingTarget}`:
          ui.tab.current = ui.tab.settingTarget;
          break;

      }
      this.setState({ ui })
    } catch (e) {
      Logger.error(`InfoSettingComponent handleChangeTab ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  };

  render() {
    const { ui, timeout, data } = this.state
    return ui.detailMenuSetting ? <View ui={ui} data={data} timeout={timeout}
      handleOnBack={this.handleOnBack}
      handleEdit={this.handleEdit}
      handleChangeTab={this.handleChangeTab}
    /> : null
  }
}

export default BaseComponent(InfoSettingComponent)