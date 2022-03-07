/**
 * Created By Nguyen Cong Thanh on 03/02/2020 17:13.
 *
 * Copyright intelIn 2020.
 */

import React, { Component } from 'react'

import Logger from 'service/logger'
import Toast from "core/toast";
import Localize from "service/localize";

class ToastComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ui: {
        response: {}
      }
    }

    this.handleOnClose = this.handleOnClose.bind(this)
    this.handleShowToast = this.handleShowToast.bind(this)
    this.onClickDismiss = this.onClickDismiss.bind(this)
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    try {
      const { ui, timeout } = this.state;
      const response = nextProps.allReducer.notify;
      Logger.debug(`ToastComponent UNSAFE_componentWillReceiveProps Receive response`, response)
      if (this.props.allReducer.notify !== nextProps.allReducer.notify) {
        ui.response = response
        this.setState({ ui: ui }, this.handleShowToast)
      }
    } catch (e) {
      Logger.error(`ToastComponent UNSAFE_componentWillReceiveProps ${e.message.toString()}`)
    }
  }

  handleOnClose() {
    this.props.toast(this.state.ui.response.status, '')
  }

  onClickDismiss(key){
    const { closeSnackbar } = this.props;
    closeSnackbar(key);
  }

  handleShowToast() {
    const { ui } = this.state;
    const { enqueueSnackbar, closeSnackbar } = this.props;
    const message = ui.response.message
    const title = ui.response.title
    const variant = ui.response.status
    enqueueSnackbar(message, {
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top',
      },
      autoHideDuration: 5000,
      content: (key, message) => (
          <div id={key}>
            <Toast color={variant} title={title || Localize.getLocalize('LC_NOTIFICATION_TITLE')} message={message} onClose={(e) => { e.preventDefault(); this.onClickDismiss(key)}}/>
          </div>
      ),
      // persist: true,
    });
  }

  render() {
    return <></>
  }

}

export default ToastComponent
