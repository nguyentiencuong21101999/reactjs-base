/**
 * Created By Nguyen Cong Thanh on 07/25/2020 13:46.
 *
 * Copyright intelIn 2020.
 */

import Logger from 'service/logger'
import ResponseCode from 'service/responseCode'
import RouteEnum from 'service/enum/route'
import Auth from 'service/auth'
import AuthEnum from 'service/enum/auth'
import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import Localize from 'service/localize'
import IconLogout from 'assets/images/user/Logout.svg'

const BaseUserComponent = (ChildComponent) => {

  return class extends ChildComponent {

    constructor(props) {
      super(props);

      this.handleRedirectWithState = this.handleRedirectWithState.bind(this)

      this.handleTokenExpired = this.handleTokenExpired.bind(this)
      this.handlePopupPaymentSuccess = this.handlePopupPaymentSuccess.bind(this)

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      try {
        Logger.info(`BaseUserComponent ${ChildComponent.name} execute UNSAFE_componentWillReceiveProps`)
        const { timeout } = this.state
        const { messageCenter } = nextProps.allReducer;
        Logger.debug('BaseUserComponent execute UNSAFE_componentWillReceiveProps new message center', messageCenter)
        // Logger.debug('BaseUserComponent execute UNSAFE_componentWillReceiveProps new message timeout', timeout.key)
        if (this.props.allReducer.messageCenter !== messageCenter) {
          // Logger.info(`BaseUserComponent execute UNSAFE_componentWillReceiveProps process code ${messageCenter.code}`)
          switch (messageCenter.code) {
            case ResponseCode.REQUEST.AUTH_4002:
              this.handleTokenExpired()
              break;
            case ResponseCode.FRONT_END.POPUP_PAYMENT_SUCCESS:
              this.handlePopupPaymentSuccess()
              break;
          }
        }
      } catch (e) {
        Logger.error(`BaseUserComponent ${ChildComponent.name} UNSAFE_componentWillReceiveProps ${e.toString()}`)
      }
    }

    handleRedirectWithState(pathname, state = {}) {
      try {
        Logger.info(`BaseUserComponent ${ChildComponent.name} execute handleRedirectWithState`)
        Logger.debug(`BaseUserComponent ${ChildComponent.name} execute handleRedirectWithState Receive pathname`, pathname)
        Logger.debug(`BaseUserComponent ${ChildComponent.name} execute handleRedirectWithState Receive state`, state)
        const { history } = this.props;
        history.push({
          pathname: pathname,
          state: state
        })
      } catch (e) {
        Logger.error(`BaseUserComponent ${ChildComponent.name} handleRedirectWithState ${e.toString()}`)
      }
    }

    handleTokenExpired() {
      try {
        Logger.info(`BaseUserComponent ${ChildComponent.name} execute handleTokenExpired`)
        const { updateModal } = this.props;
        const dialog = new DialogModel()
        dialog.setView(DialogEnum.VIEW.NOTIFY)
        dialog.setTitle(Localize.getLocalize('LC_NOTI'))
        dialog.setContent(Localize.getLocalize('LC_SESSION_EXPIRE'))
        dialog.setButton(Localize.getLocalize('LC_UNDERSTAND'))
        dialog.setIcon(IconLogout)
        dialog.setHandleConfirm(() => {
          Auth.handleLogout()
          Auth.setRole()
          this.handleRedirectWithState(`${RouteEnum.PAGE.LOGIN}`)
        })
        updateModal(dialog)
      } catch (e) {
        Logger.error(`BaseUserComponent ${ChildComponent.name} handleTokenExpired ${e.toString()}`)
      }
    }

    handlePopupPaymentSuccess() {
      try {
        Logger.info(`BaseUserComponent ${ChildComponent.name} execute handlePopupPaymentSuccess`)
        const { updateModal } = this.props;
        const dialog = new DialogModel()
        dialog.setView(DialogEnum.VIEW.EXPIRED_TOKEN)
        dialog.setTitle(Localize.getLocalize('COMMON_TOKEN_EXPIRED_TITLE'))
        dialog.setContent(Localize.getLocalize('LYT_PAYMENT_SUCCESS_CONTENT_POPUP'))
        dialog.setHandleConfirm(() => {
          Auth.handleLogout()
          Auth.setRole()
          this.handleRedirectWithState(`${RouteEnum.PAGE.LOGIN}`)
        })
        updateModal(dialog)
      } catch (e) {
        Logger.error(`BaseUserComponent ${ChildComponent.name} handlePopupPaymentSuccess ${e.toString()}`)
      }
    }

    render() {
      return (
        super.render()
      )
    }

  }

}

export default BaseUserComponent