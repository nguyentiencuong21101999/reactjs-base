import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import Localize from 'service/localize';
import AdminEnum from 'service/enum/admin'
import RouteEnum from 'service/enum/route'
import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import Auth from 'service/auth'

import View from './view'
import { ModelView, ModelRequest } from './model'

class InfoAdminComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleBanAccountSuccess: this.handleBanAccountSuccess.bind(this),
        handleUnbanAccountSuccess: this.handleUnbanAccountSuccess.bind(this),
        handleUpdateStatusIsUnnecessary: this.handleUpdateStatusIsUnnecessary.bind(this),
        handleAdminResetPasswordSuccess: this.handleAdminResetPasswordSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
        handleAdminIsBan: this.handleAdminIsBan.bind(this),
      },
      ui: {
        data: {},
        profile: {},
      },
      req: {
        current: 0,
        changeStatus: 1,
        resetPassword: 2,
      }
    }

    this.handleResetPassword = this.handleResetPassword.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this)
  }
  handleSystemError() {
    try {
      Logger.info('InfoAdminComponent execute handleSubmit')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`InfoAdminComponent handleSubmit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleAdminIsBan() {
    try {
      Logger.info('InfoAdminComponent execute handleAdminIsBan')
      const { ui, timeout } = this.state
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`InfoAdminComponent handleAdminIsBan ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleBanAccountSuccess() {
    try {
      Logger.info('InfoAdminComponent execute handleBanAccountSuccess')
      const { ui, timeout } = this.state
      const { toast } = this.props;
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ACCOUNT_BLOCK_SUCCESS") })
      timeout.setTimeout(false)
      this.handleOnBack()
    } catch (e) {
      Logger.error(`InfoAdminComponent handleBanAccountSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleUnbanAccountSuccess() {
    try {
      Logger.info('InfoAdminComponent execute handleUnbanAccountSuccess')
      const { ui, timeout } = this.state

      const { toast } = this.props;
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ACCOUNT_UNBLOCK_SUCCESS") })
      timeout.setTimeout(false)
      this.handleOnBack()
    } catch (e) {
      Logger.error(`InfoAdminComponent handleUnbanAccountSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleUpdateStatusIsUnnecessary() {
    try {
      Logger.info('InfoAdminComponent execute handleUpdateStatusIsUnnecessary')
      const { ui, timeout } = this.state
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`InfoAdminComponent handleUpdateStatusIsUnnecessary ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleAdminResetPasswordSuccess() {
    try {
      Logger.info('InfoAdminComponent execute handleAdminResetPasswordSuccess')
      const { ui, timeout } = this.state
      timeout.setTimeout(false)
      const { toast } = this.props;
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_SEND_LINK_RESET_SUCCESS") })
    } catch (e) {
      Logger.error(`InfoAdminComponent handleAdminResetPasswordSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('InfoAdminComponent execute UNSAFE_componentWillMount')
      const { ui } = this.state
      const { location } = this.props
      ui.data = { ...location.state }
      ui.profile = Auth.getPackageProfile()
    }
    catch (e) {
      Logger.error(`InfoAdminComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('InfoAdminComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`InfoAdminComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('InfoAdminComponent execute handleRequest')
      const { ui, timeout, req } = this.state
      let payload = {}
      const userId = ui.data.userId
      switch (req.current) {
        case req.changeStatus:
          const { banAccount, unbanAccount } = this.props
          switch (ui.data.status) {
            case AdminEnum.ADMIN_STATUS.ACTIVE:
              payload = new ModelRequest().setUserId(userId)
              banAccount(timeout.key, payload)
              break;
            case AdminEnum.ADMIN_STATUS.BAN:
              payload = new ModelRequest().setUserId(userId)
              unbanAccount(timeout.key, payload)
              break;
          }
          break;
        case req.resetPassword:
          const { forgot, forgotNotActive } = this.props
          switch (ui.data.tab) {
            case AdminEnum.ADMIN_TEMP_STATUS.ADMIN_CREATED: //active
              payload = new ModelRequest()
                .setUserId(userId)
              forgot(timeout.key, payload)
              break;
              break;
            case AdminEnum.ADMIN_TEMP_STATUS.INIT: //note active
              payload = new ModelRequest()
                .setUserId(userId)
              forgotNotActive(timeout.key, payload)
              break;
              break;

            default:
              break;
          }

      }
    } catch (e) {
      Logger.error(`InfoAdminComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleResetPassword() {
    try {
      Logger.info('InfoAdminComponent execute handleResetPassword')
      const { ui, timeout, req } = this.state
      req.current = req.resetPassword
      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.CONFIRM)
      dialog.setTitle(Localize.getLocalize("LC_RESET_PASS"))
      dialog.setContent(Localize.getLocalize("LC_POPUP_RESET_PASS_CONTENT"))
      dialog.setHandleConfirm(() => {
        timeout.setTimeout()
      })
      updateModal(dialog)

    } catch (e) {
      Logger.error(`InfoAdminComponent handleResetPassword ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleEdit(e) {
    try {
      Logger.info('InfoAdminComponent execute handleEdit')
      const { ui, timeout } = this.state
      const route = RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.EDIT
      const path = route.replace(':id', ui.data.userId)
      this.handleRedirectWithState(path, ui.data)
    } catch (e) {
      Logger.error(`InfoAdminComponent handleEdit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleChangeStatus(status) {
    try {
      Logger.info('InfoAdminComponent execute handleChangeStatus')
      const { ui, timeout, req } = this.state
      const { updateModal } = this.props;
      let message
      switch (ui.data.status) {
        case AdminEnum.ADMIN_STATUS.ACTIVE:
          message = Localize.getLocalize("LC_POPUP_BLOCK_ACCOUNT_CONTENT")
          break;
        case AdminEnum.ADMIN_STATUS.BAN:
          message = Localize.getLocalize("LC_POPUP_UNBLOCK_ACCOUNT_CONTENT")
          break;
      }
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.CONFIRM)
      dialog.setTitle(AdminEnum.ADMIN_STATUS.ACTIVE ? Localize.getLocalize("LC_POPUP_BLOCK_ACCOUNT_TITLE") : Localize.getLocalize("LC_POPUP_UNBLOCK_ACCOUNT_TITLE"))
      dialog.setContent(message)
      dialog.setHandleConfirm(() => {
        req.current = req.changeStatus
        timeout.setTimeout()
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`InfoAdminComponent handleChangeStatus ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }




  handleOnBack() {
    try {
      Logger.info('InfoAdminComponent execute handleOnBack')
      const { ui, timeout } = this.state
      const { tab } = this.props.location.state
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN._, { tab: tab })
    } catch (e) {
      Logger.error(`InfoAdminComponent handleAdminIsBan ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  render() {
    const { ui, timeout } = this.state
    return <View ui={ui} timeout={timeout} handleResetPassword={this.handleResetPassword}
      handleEdit={this.handleEdit} handleChangeStatus={this.handleChangeStatus}
      handleOnBack={this.handleOnBack}
    />
  }
}

export default BaseComponent(InfoAdminComponent)