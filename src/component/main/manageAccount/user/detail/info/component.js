import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import Helper from 'service/helper'
import UserEnum from 'service/enum/user'
import RouteEnum from 'service/enum/route'
import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'

import View from './view'
import { ModelView, ModelRequest } from './model'
import Localize from 'service/localize'

class InfoUserComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleBanAccountSuccess: this.handleBanAccountSuccess.bind(this),
        handleUnbanAccountSuccess: this.handleUnbanAccountSuccess.bind(this),
        handleUpdateStatusIsUnnecessary: this.handleUpdateStatusIsUnnecessary.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
      },
      ui: {
        data: {},
      },
      req: {
        current: 0,
        changeStatus: 1,
      }
    }

    this.handleEdit = this.handleEdit.bind(this)
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this)
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
  handleBanAccountSuccess() {
    try {
      Logger.info('InfoUserComponent execute handleBanAccountSuccess')
      const { ui, timeout } = this.state
      const { toast } = this.props;
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ACCOUNT_BLOCK_SUCCESS") })
      this.handleOnBack()
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`InfoUserComponent handleBanAccountSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleUnbanAccountSuccess() {
    try {
      Logger.info('InfoUserComponent execute handleUnbanAccountSuccess')
      const { ui, timeout } = this.state
      const { toast } = this.props;
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ACCOUNT_BLOCK_SUCCESS") })
      this.handleOnBack()
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`InfoUserComponent handleUnbanAccountSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info('InfoUserComponent execute UNSAFE_componentWillMount')
      const { ui } = this.state
      const { location } = this.props
      ui.data = { ...location.state }
    }
    catch (e) {
      Logger.error(`InfoUserComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('InfoUserComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`InfoUserComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('InfoUserComponent execute handleRequest')
      const { ui, timeout, req } = this.state
      let payload = {}
      switch (req.current) {
        case req.changeStatus:
          const { banAccount, unbanAccount } = this.props
          const userId = ui.data.userId
          const userType = ui.data.userType
          switch (ui.data.status) {
            case UserEnum.USER_STATUS.ACTIVE:
              payload = new ModelRequest().setUserId(userId)
                .setUserType(userType)
              banAccount(timeout.key, payload)
              break;
            case UserEnum.USER_STATUS.LOCKED_BY_ADMIN:
              payload = new ModelRequest().setUserId(userId)
                .setUserType(userType)
              unbanAccount(timeout.key, payload)
              break;
          }
          break;
      }
    } catch (e) {
      Logger.error(`InfoUserComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleEdit() {
    try {
      Logger.info('InfoUserComponent execute handleEdit')
      const { ui, timeout } = this.state
      const route = RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.EDIT
      const path = route.replace(':id', ui.data.userId)
      this.handleRedirectWithState(path, ui.data)
    } catch (e) {
      Logger.error(`InfoUserComponent handleEdit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleChangeStatus(status) {
    try {
      Logger.info('InfoUserComponent execute handleChangeStatus')
      const { ui, timeout, req } = this.state
      const { updateModal } = this.props;
      let message
      switch (ui.data.status) {
        case UserEnum.USER_STATUS.ACTIVE:
          message = Localize.getLocalize("LC_POPUP_BLOCK_ACCOUNT_CONTENT")
          break;
        case UserEnum.USER_STATUS.LOCKED_BY_ADMIN:
          message = Localize.getLocalize("LC_POPUP_UNBLOCK_ACCOUNT_CONTENT")
          break;
      }
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.CONFIRM)
      dialog.setTitle(UserEnum.USER_STATUS.ACTIVE ? Localize.getLocalize("LC_POPUP_BLOCK_ACCOUNT_TITLE") : Localize.getLocalize("LC_POPUP_UNBLOCK_ACCOUNT_TITLE"))
      dialog.setContent(message)
      dialog.setHandleConfirm(() => {
        req.current = req.changeStatus
        timeout.setTimeout()
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`InfoUserComponent handleChangeStatus ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }



  handleUpdateStatusIsUnnecessary() {
    try {
      Logger.info('InfoUserComponent execute handleUpdateStatusIsUnnecessary')
      const { ui, timeout } = this.state
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`InfoUserComponent handleUpdateStatusIsUnnecessary ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleOnBack() {
    try {
      Logger.info('InfoAdminComponent execute handleOnBack')
      const { ui, timeout } = this.state
      const { tab } = this.props.location.state
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_ACCOUNT.USER._, { tab: tab })
    } catch (e) {
      Logger.error(`InfoAdminComponent handleAdminIsBan ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }




  render() {
    const { ui, timeout } = this.state
    return <View ui={ui} timeout={timeout} handleEdit={this.handleEdit} handleChangeStatus={this.handleChangeStatus}
      handleOnBack={this.handleOnBack}
    />
  }
}

export default BaseComponent(InfoUserComponent)